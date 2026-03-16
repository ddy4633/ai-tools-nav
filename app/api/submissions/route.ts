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
      return NextResponse.json({ success: false, message: '请求来源不受信任' }, { status: 403 });
    }

    const rateLimit = checkRateLimit(request, {
      key: 'submissions',
      windowMs: 10 * 60 * 1000,
      max: 8,
    });

    if (!rateLimit.ok) {
      return NextResponse.json({ success: false, message: '提交过于频繁，请稍后再试' }, { status: 429 });
    }

    const rawBody = await request.json().catch((): unknown => ({}));
    const body = rawBody && typeof rawBody === 'object' ? rawBody as Record<string, unknown> : {};
    const honeypot = typeof body.website2 === 'string' ? body.website2.trim() : '';

    if (honeypot) {
      return NextResponse.json({
        success: true,
        message: '提交成功，已进入审核队列',
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
      return NextResponse.json({ success: false, message: '请输入有效的工具名称' }, { status: 400 });
    }

    if (payload.name.length > 120) {
      return NextResponse.json({ success: false, message: '工具名称过长，请控制在 120 字内' }, { status: 400 });
    }

    if (!payload.website || !isValidUrl(payload.website)) {
      return NextResponse.json({ success: false, message: '请输入有效的官网链接' }, { status: 400 });
    }

    if (payload.website.length > 500) {
      return NextResponse.json({ success: false, message: '官网链接过长，请精简后重试' }, { status: 400 });
    }

    if (!payload.description || payload.description.length < 10) {
      return NextResponse.json({ success: false, message: '请输入至少 10 个字符的工具简介' }, { status: 400 });
    }

    if (payload.description.length > 2000) {
      return NextResponse.json({ success: false, message: '工具简介过长，请控制在 2000 字内' }, { status: 400 });
    }

    if (!payload.category) {
      return NextResponse.json({ success: false, message: '请选择工具分类' }, { status: 400 });
    }

    if (!payload.reason || payload.reason.length < 10) {
      return NextResponse.json({ success: false, message: '请输入至少 10 个字符的推荐理由' }, { status: 400 });
    }

    if (payload.reason.length > 3000) {
      return NextResponse.json({ success: false, message: '推荐理由过长，请控制在 3000 字内' }, { status: 400 });
    }

    if (payload.tags && payload.tags.some((tag) => tag.length > 32)) {
      return NextResponse.json({ success: false, message: '标签长度不能超过 32 字符' }, { status: 400 });
    }

    if (!payload.submitterEmail || !isValidEmail(payload.submitterEmail)) {
      return NextResponse.json({ success: false, message: '请输入有效的联系邮箱' }, { status: 400 });
    }

    if (payload.submissionType !== 'free' && !payload.budgetRange) {
      return NextResponse.json({ success: false, message: '商务收录请补充预算区间' }, { status: 400 });
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
      message: error instanceof Error ? error.message : '提交失败，请稍后重试',
    }, { status: 500 });
  }
}
