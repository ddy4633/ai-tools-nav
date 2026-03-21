import { NextResponse } from 'next/server';
import { subscribeToNewsletter } from '@/lib/newsletter/provider';
import { checkRateLimit, hasValidOrigin } from '@/lib/security/request-guard';

export const dynamic = 'force-dynamic';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    if (!hasValidOrigin(request)) {
      return NextResponse.json({ success: false, message: 'Untrusted request origin' }, { status: 403 });
    }

    const rateLimit = checkRateLimit(request, {
      key: 'newsletter',
      windowMs: 10 * 60 * 1000,
      max: 12,
    });

    if (!rateLimit.ok) {
      return NextResponse.json({ success: false, message: 'Too many subscription attempts. Please try again later.' }, { status: 429 });
    }

    const rawBody = await request.json().catch((): unknown => ({}));
    const body = rawBody && typeof rawBody === 'object' ? rawBody as Record<string, unknown> : {};
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const source = typeof body.source === 'string' ? body.source.trim() : 'unknown';
    const tags = Array.isArray(body.tags)
      ? body.tags.filter((tag: unknown): tag is string => typeof tag === 'string').slice(0, 10)
      : [];
    const honeypot = typeof body.website2 === 'string' ? body.website2.trim() : '';
    const metadataEntries = body.metadata && typeof body.metadata === 'object'
      ? Object.entries(body.metadata as Record<string, unknown>)
      : [];
    const metadata = Object.fromEntries(
      metadataEntries
        .filter(([key, value]) => typeof key === 'string' && typeof value === 'string')
        .slice(0, 10)
    ) as Record<string, string>;

    if (honeypot) {
      return NextResponse.json({
        success: true,
        message: 'Subscription accepted',
        data: { provider: 'noop' },
      });
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({
        success: false,
        message: 'Enter a valid email address.',
      }, { status: 400 });
    }

    if (email.length > 200) {
      return NextResponse.json({
        success: false,
        message: 'Email address is too long. Please check it and try again.',
      }, { status: 400 });
    }

    if (tags.some((tag) => tag.length > 32)) {
      return NextResponse.json({
        success: false,
        message: 'One or more tags are too long. Please shorten them and try again.',
      }, { status: 400 });
    }

    const result = await subscribeToNewsletter({
      email,
      source,
      tags,
      metadata: Object.keys(metadata).length > 0 ? metadata : undefined,
    });

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
      message: error instanceof Error ? error.message : 'Newsletter subscription failed.',
    }, { status: 500 });
  }
}
