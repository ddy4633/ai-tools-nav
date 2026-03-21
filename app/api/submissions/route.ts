import { NextResponse } from 'next/server';
import { submitToolSubmission } from '@/lib/submission/provider';
import type { SubmissionPlan, ToolSubmissionInput } from '@/lib/submission/types';
import { checkRateLimit, hasValidOrigin } from '@/lib/security/request-guard';

export const dynamic = 'force-dynamic';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function resolveSubmissionPlan(value: unknown): SubmissionPlan {
  if (value === 'priority' || value === 'sponsored') {
    return value;
  }

  return 'free';
}

export async function POST(request: Request) {
  try {
    if (!hasValidOrigin(request)) {
      return NextResponse.json({ success: false, message: 'Untrusted request origin' }, { status: 403 });
    }

    const rateLimit = checkRateLimit(request, {
      key: 'submissions',
      windowMs: 10 * 60 * 1000,
      max: 8,
    });

    if (!rateLimit.ok) {
      return NextResponse.json({ success: false, message: 'Too many submission attempts. Please try again later.' }, { status: 429 });
    }

    const rawBody = await request.json().catch((): unknown => ({}));
    const body = rawBody && typeof rawBody === 'object' ? rawBody as Record<string, unknown> : {};
    const honeypot = typeof body.website2 === 'string' ? body.website2.trim() : '';

    if (honeypot) {
      return NextResponse.json({
        success: true,
        message: 'Submission accepted and added to the review queue.',
      });
    }

    const payload: ToolSubmissionInput = {
      name: typeof body.name === 'string' ? body.name.trim() : '',
      website: typeof body.website === 'string' ? body.website.trim() : '',
      description: typeof body.description === 'string' ? body.description.trim() : '',
      category: typeof body.category === 'string' ? body.category.trim() : '',
      tags: Array.isArray(body.tags)
        ? body.tags.filter((tag: unknown): tag is string => typeof tag === 'string').slice(0, 5)
        : [],
      reason: typeof body.reason === 'string' ? body.reason.trim() : '',
      submitterName: typeof body.submitterName === 'string' ? body.submitterName.trim() : '',
      submitterEmail: typeof body.submitterEmail === 'string' ? body.submitterEmail.trim() : '',
      companyName: typeof body.companyName === 'string' ? body.companyName.trim() : '',
      submissionType: resolveSubmissionPlan(body.submissionType),
      budgetRange: typeof body.budgetRange === 'string' ? body.budgetRange.trim() : '',
    };

    if (!payload.name || payload.name.length < 2) {
      return NextResponse.json({ success: false, message: 'Enter a valid product name.' }, { status: 400 });
    }

    if (payload.name.length > 120) {
      return NextResponse.json({ success: false, message: 'Product name is too long. Keep it under 120 characters.' }, { status: 400 });
    }

    if (!payload.website || !isValidUrl(payload.website)) {
      return NextResponse.json({ success: false, message: 'Enter a valid product URL.' }, { status: 400 });
    }

    if (payload.website.length > 500) {
      return NextResponse.json({ success: false, message: 'Product URL is too long. Please shorten it and try again.' }, { status: 400 });
    }

    if (!payload.description || payload.description.length < 10) {
      return NextResponse.json({ success: false, message: 'Enter a product summary with at least 10 characters.' }, { status: 400 });
    }

    if (payload.description.length > 2000) {
      return NextResponse.json({ success: false, message: 'Product summary is too long. Keep it under 2000 characters.' }, { status: 400 });
    }

    if (!payload.category) {
      return NextResponse.json({ success: false, message: 'Choose a product category.' }, { status: 400 });
    }

    if (!payload.reason || payload.reason.length < 10) {
      return NextResponse.json({ success: false, message: 'Enter an editorial note with at least 10 characters.' }, { status: 400 });
    }

    if (payload.reason.length > 3000) {
      return NextResponse.json({ success: false, message: 'Editorial note is too long. Keep it under 3000 characters.' }, { status: 400 });
    }

    if (payload.tags && payload.tags.some((tag) => tag.length > 32)) {
      return NextResponse.json({ success: false, message: 'Tags must be 32 characters or fewer.' }, { status: 400 });
    }

    if (!payload.submitterEmail || !isValidEmail(payload.submitterEmail)) {
      return NextResponse.json({ success: false, message: 'Enter a valid contact email.' }, { status: 400 });
    }

    if (payload.submissionType !== 'free' && !payload.budgetRange) {
      return NextResponse.json({ success: false, message: 'Choose a budget range for commercial requests.' }, { status: 400 });
    }

    const result = await submitToolSubmission(payload);

    return NextResponse.json({
      success: result.ok,
      message: result.message,
      data: {
        provider: result.provider,
      },
    }, {
      status: result.ok ? 200 : (result.status ?? 500),
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'Submission failed. Please try again later.',
    }, { status: 500 });
  }
}
