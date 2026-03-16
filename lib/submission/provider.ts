import 'server-only';

import type { ToolSubmissionInput } from '@/lib/submission/types';
import { isNoopProviderAllowed } from '@/lib/security/request-guard';

export type SubmissionProviderName = 'noop' | 'webhook';

export interface ToolSubmissionResult {
  ok: boolean;
  provider: SubmissionProviderName;
  message: string;
  status?: number;
}

function getSubmissionProvider(): SubmissionProviderName {
  const configuredProvider = process.env.SUBMISSIONS_PROVIDER?.trim().toLowerCase();

  if (configuredProvider === 'webhook') {
    return 'webhook';
  }

  if (process.env.SUBMISSIONS_WEBHOOK_URL) {
    return 'webhook';
  }

  return 'noop';
}

async function submitByWebhook(input: ToolSubmissionInput): Promise<ToolSubmissionResult> {
  const webhookUrl = process.env.SUBMISSIONS_WEBHOOK_URL;

  if (!webhookUrl) {
    return {
      ok: false,
      provider: 'webhook',
      message: '未配置 SUBMISSIONS_WEBHOOK_URL',
      status: 500,
    };
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...input,
      submittedAt: new Date().toISOString(),
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    return {
      ok: false,
      provider: 'webhook',
      message: `提交线索失败（${response.status}）`,
      status: response.status,
    };
  }

  return {
    ok: true,
    provider: 'webhook',
    message: input.submissionType === 'free' ? '提交成功，已进入审核队列' : '商务线索已提交，我们会尽快联系您',
    status: response.status,
  };
}

async function submitByNoop(input: ToolSubmissionInput): Promise<ToolSubmissionResult> {
  if (!isNoopProviderAllowed()) {
    return {
      ok: false,
      provider: 'noop',
      message: '线索通道未配置完成，请联系站点管理员',
      status: 503,
    };
  }

  console.info('[submission:no-op]', {
    ...input,
    submittedAt: new Date().toISOString(),
  });

  return {
    ok: true,
    provider: 'noop',
    message: input.submissionType === 'free' ? '提交请求已记录，当前为演示模式' : '商务线索已记录，当前为演示模式',
    status: 200,
  };
}

export async function submitToolSubmission(input: ToolSubmissionInput): Promise<ToolSubmissionResult> {
  const provider = getSubmissionProvider();

  switch (provider) {
    case 'webhook':
      return submitByWebhook(input);
    case 'noop':
    default:
      return submitByNoop(input);
  }
}
