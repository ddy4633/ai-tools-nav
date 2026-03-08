import { NextResponse } from 'next/server';
import { subscribeToNewsletter } from '@/lib/newsletter/provider';

export const dynamic = 'force-dynamic';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.json().catch((): unknown => ({}));
    const body = rawBody && typeof rawBody === 'object' ? rawBody as Record<string, unknown> : {};
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const source = typeof body.source === 'string' ? body.source.trim() : 'unknown';
    const tags = Array.isArray(body.tags) ? body.tags.filter((tag: unknown): tag is string => typeof tag === 'string') : [];
    const metadata = body.metadata && typeof body.metadata === 'object' ? body.metadata as Record<string, string> : undefined;

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({
        success: false,
        message: '请输入有效的邮箱地址',
      }, { status: 400 });
    }

    const result = await subscribeToNewsletter({
      email,
      source,
      tags,
      metadata,
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
      message: error instanceof Error ? error.message : 'Newsletter 订阅失败',
    }, { status: 500 });
  }
}
