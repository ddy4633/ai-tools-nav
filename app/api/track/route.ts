import { NextResponse } from 'next/server';
import { checkRateLimit, hasValidOrigin } from '@/lib/security/request-guard';

export const dynamic = 'force-dynamic';

const allowedEvents = new Set([
  'outbound_click',
  'internal_cta_click',
  'newsletter_subscribe',
  'tool_submission',
]);

export async function POST(request: Request) {
  try {
    if (!hasValidOrigin(request)) {
      return NextResponse.json({ success: false, message: '请求来源不受信任' }, { status: 403 });
    }

    const rateLimit = checkRateLimit(request, {
      key: 'tracking',
      windowMs: 60 * 1000,
      max: 180,
    });

    if (!rateLimit.ok) {
      return NextResponse.json({ success: false, message: '埋点请求过于频繁' }, { status: 429 });
    }

    const body = await request.json().catch(() => null);

    if (!body || typeof body.name !== 'string') {
      return NextResponse.json({
        success: false,
        message: '缺少事件名称',
      }, { status: 400 });
    }

    if (!allowedEvents.has(body.name)) {
      return NextResponse.json({
        success: false,
        message: '不支持的事件类型',
      }, { status: 400 });
    }

    const payload = JSON.stringify(body);
    if (payload.length > 20_000) {
      return NextResponse.json({
        success: false,
        message: '事件体过大，已拒绝',
      }, { status: 400 });
    }

    const webhookUrl = process.env.ANALYTICS_WEBHOOK_URL;

    if (webhookUrl) {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: payload,
        cache: 'no-store',
      });

      if (!response.ok) {
        return NextResponse.json({
          success: false,
          message: `埋点下游写入失败（${response.status}）`,
        }, { status: 502 });
      }
    } else {
      console.info('[track:event]', body);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : '埋点上报失败',
    }, { status: 500 });
  }
}
