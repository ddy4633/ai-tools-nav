import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body.name !== 'string') {
      return NextResponse.json({
        success: false,
        message: '缺少事件名称',
      }, { status: 400 });
    }

    const webhookUrl = process.env.ANALYTICS_WEBHOOK_URL;

    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        cache: 'no-store',
      });
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
