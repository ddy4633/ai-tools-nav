import { trackToolSubmission } from '@/lib/tracking';
import type { SubmissionPlan, ToolSubmissionInput } from '@/lib/submission/types';

export type ToolSubmissionPayload = ToolSubmissionInput & {
  website2?: string;
};

interface SubmissionApiResponse {
  success: boolean;
  message: string;
  data?: {
    provider: string;
  };
}

export function validateSubmissionEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isBusinessSubmission(submissionType: SubmissionPlan): boolean {
  return submissionType === 'priority' || submissionType === 'sponsored';
}

export async function submitToolSubmissionApi(payload: ToolSubmissionPayload): Promise<SubmissionApiResponse> {
  const response = await fetch('/api/submissions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json() as SubmissionApiResponse;

  if (data.success) {
    trackToolSubmission({
      source: 'submit_page',
      toolName: payload.name,
      category: payload.category,
      submissionType: payload.submissionType,
      budgetRange: payload.budgetRange,
      provider: data.data?.provider,
      isBusinessSubmission: isBusinessSubmission(payload.submissionType),
    });
  }

  return data;
}
