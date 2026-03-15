import type { Tool } from '@/types/tool';

export type TrackingEventName =
  | 'outbound_click'
  | 'internal_cta_click'
  | 'newsletter_subscribe'
  | 'tool_submission';

export interface TrackingEventPayload {
  placement?: string;
  source?: string;
  toolId?: string;
  toolName?: string;
  targetUrl?: string;
  isAffiliate?: boolean;
  provider?: string;
  [key: string]: unknown;
}

interface TrackingEvent {
  name: TrackingEventName;
  payload: TrackingEventPayload;
  occurredAt: string;
  path?: string;
}

type ToolPrimaryLinkData = Pick<Tool, 'website' | 'affiliate_url' | 'affiliateUrl'>;
type ToolOutboundData = Pick<Tool, 'id' | 'name' | 'website' | 'affiliate_url' | 'affiliateUrl'>;

export function resolveToolPrimaryUrl(tool: ToolPrimaryLinkData): string | null {
  return tool.affiliate_url ?? tool.affiliateUrl ?? tool.website ?? null;
}

export function hasToolAffiliateUrl(tool: Pick<Tool, 'affiliate_url' | 'affiliateUrl'>): boolean {
  return Boolean(tool.affiliate_url ?? tool.affiliateUrl);
}

export function getToolPrimaryCtaLabel(
  tool: Pick<Tool, 'affiliate_url' | 'affiliateUrl'>,
  affiliateLabel = '访问合作链接',
  websiteLabel = '访问官网'
): string {
  return hasToolAffiliateUrl(tool) ? affiliateLabel : websiteLabel;
}

export function buildOutboundClickPayload(tool: ToolOutboundData, placement: string): TrackingEventPayload {
  const targetUrl = resolveToolPrimaryUrl(tool);

  return {
    placement,
    toolId: tool.id,
    toolName: tool.name,
    targetUrl: targetUrl ?? undefined,
    isAffiliate: hasToolAffiliateUrl(tool),
  };
}

export function trackEvent(name: TrackingEventName, payload: TrackingEventPayload): void {
  if (typeof window === 'undefined') {
    return;
  }

  const event: TrackingEvent = {
    name,
    payload,
    occurredAt: new Date().toISOString(),
    path: window.location.pathname,
  };

  const body = JSON.stringify(event);

  try {
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const beacon = new Blob([body], { type: 'application/json' });
      navigator.sendBeacon('/api/track', beacon);
      return;
    }
  } catch {
    // 忽略 beacon 异常，降级到 fetch
  }

  void fetch('/api/track', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
    keepalive: true,
  }).catch(() => undefined);
}

export function trackOutboundClick(payload: TrackingEventPayload): void {
  trackEvent('outbound_click', payload);
}

export function trackInternalCtaClick(payload: TrackingEventPayload): void {
  trackEvent('internal_cta_click', payload);
}

export function trackNewsletterSubscribe(payload: TrackingEventPayload): void {
  trackEvent('newsletter_subscribe', payload);
}

export function trackToolSubmission(payload: TrackingEventPayload): void {
  trackEvent('tool_submission', payload);
}
