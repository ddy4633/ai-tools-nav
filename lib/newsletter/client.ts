import { trackNewsletterSubscribe } from '@/lib/tracking';

export interface NewsletterSubscribePayload {
  email: string;
  source: string;
  tags?: string[];
  metadata?: Record<string, string>;
  website2?: string;
}

interface NewsletterApiResponse {
  success: boolean;
  message: string;
  data?: {
    provider: string;
  };
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function subscribeToNewsletterApi(payload: NewsletterSubscribePayload): Promise<NewsletterApiResponse> {
  const response = await fetch('/api/newsletter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json() as NewsletterApiResponse;

  if (data.success) {
    trackNewsletterSubscribe({
      source: payload.source,
      provider: data.data?.provider,
    });
  }

  return data;
}
