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
      message: 'SUBMISSIONS_WEBHOOK_URL is not configured',
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
      message: `Submission request failed (${response.status})`,
      status: response.status,
    };
  }

  return {
    ok: true,
    provider: 'webhook',
    message: input.submissionType === 'free'
      ? 'Submission received and added to the review queue'
      : 'Commercial inquiry received. We will follow up soon.',
    status: response.status,
  };
}

async function submitByNoop(input: ToolSubmissionInput): Promise<ToolSubmissionResult> {
  if (!isNoopProviderAllowed()) {
    return {
      ok: false,
      provider: 'noop',
      message: 'The submission channel is not configured yet. Please contact the site owner.',
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
    message: input.submissionType === 'free'
      ? 'Submission recorded in demo mode'
      : 'Commercial inquiry recorded in demo mode',
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
