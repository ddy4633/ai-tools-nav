import 'server-only';
import { isNoopProviderAllowed } from '@/lib/security/request-guard';

export type NewsletterProviderName = 'noop' | 'webhook' | 'buttondown';

export interface NewsletterSubscribeInput {
  email: string;
  source?: string;
  tags?: string[];
  metadata?: Record<string, string>;
}

export interface NewsletterSubscribeResult {
  ok: boolean;
  provider: NewsletterProviderName;
  message: string;
  status?: number;
}

function getNewsletterProvider(): NewsletterProviderName {
  const configuredProvider = process.env.NEWSLETTER_PROVIDER?.trim().toLowerCase();

  if (configuredProvider === 'buttondown') {
    return 'buttondown';
  }

  if (configuredProvider === 'webhook') {
    return 'webhook';
  }

  if (process.env.NEWSLETTER_BUTTONDOWN_API_KEY) {
    return 'buttondown';
  }

  if (process.env.NEWSLETTER_WEBHOOK_URL) {
    return 'webhook';
  }

  return 'noop';
}

async function subscribeByWebhook(input: NewsletterSubscribeInput): Promise<NewsletterSubscribeResult> {
  const webhookUrl = process.env.NEWSLETTER_WEBHOOK_URL;

  if (!webhookUrl) {
    return {
      ok: false,
      provider: 'webhook',
      message: '未配置 NEWSLETTER_WEBHOOK_URL',
      status: 500,
    };
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
    cache: 'no-store',
  });

  if (!response.ok) {
    return {
      ok: false,
      provider: 'webhook',
      message: `Webhook 订阅失败（${response.status}）`,
      status: response.status,
    };
  }

  return {
    ok: true,
    provider: 'webhook',
    message: '订阅成功',
    status: response.status,
  };
}

async function subscribeByButtondown(input: NewsletterSubscribeInput): Promise<NewsletterSubscribeResult> {
  const apiKey = process.env.NEWSLETTER_BUTTONDOWN_API_KEY;

  if (!apiKey) {
    return {
      ok: false,
      provider: 'buttondown',
      message: '未配置 NEWSLETTER_BUTTONDOWN_API_KEY',
      status: 500,
    };
  }

  const response = await fetch('https://api.buttondown.email/v1/subscribers', {
    method: 'POST',
    headers: {
      Authorization: `Token ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: input.email,
      tags: input.tags ?? [],
      metadata: input.metadata ?? {},
      notes: input.source ? `source=${input.source}` : undefined,
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    return {
      ok: false,
      provider: 'buttondown',
      message: `Buttondown 订阅失败（${response.status}）`,
      status: response.status,
    };
  }

  return {
    ok: true,
    provider: 'buttondown',
    message: '订阅成功',
    status: response.status,
  };
}

async function subscribeByNoop(input: NewsletterSubscribeInput): Promise<NewsletterSubscribeResult> {
  if (!isNoopProviderAllowed()) {
    return {
      ok: false,
      provider: 'noop',
      message: '订阅通道未配置完成，请联系站点管理员',
      status: 503,
    };
  }

  console.info('[newsletter:no-op]', input);

  return {
    ok: true,
    provider: 'noop',
    message: '订阅请求已记录，待接入真实邮件提供商',
    status: 200,
  };
}

export async function subscribeToNewsletter(input: NewsletterSubscribeInput): Promise<NewsletterSubscribeResult> {
  const provider = getNewsletterProvider();

  switch (provider) {
    case 'buttondown':
      return subscribeByButtondown(input);
    case 'webhook':
      return subscribeByWebhook(input);
    case 'noop':
    default:
      return subscribeByNoop(input);
  }
}
