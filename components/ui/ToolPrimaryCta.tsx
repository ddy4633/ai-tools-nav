'use client';

import type { AnchorHTMLAttributes } from 'react';
import { ExternalLink } from 'lucide-react';
import type { Tool } from '@/types/tool';
import {
  buildOutboundClickPayload,
  getToolPrimaryCtaLabel,
  resolveToolPrimaryUrl,
} from '@/lib/tracking';
import TrackedExternalLink from '@/components/ui/TrackedExternalLink';

type ToolPrimaryCtaTool = Pick<Tool, 'id' | 'name' | 'website' | 'affiliate_url' | 'affiliateUrl'>;

interface ToolPrimaryCtaProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children'> {
  tool: ToolPrimaryCtaTool;
  placement: string;
  affiliateLabel?: string;
  websiteLabel?: string;
  showIcon?: boolean;
  iconClassName?: string;
}

export default function ToolPrimaryCta({
  tool,
  placement,
  affiliateLabel = 'Open partner link',
  websiteLabel = 'Visit site',
  showIcon = true,
  iconClassName = 'w-4 h-4',
  target,
  rel,
  ...props
}: ToolPrimaryCtaProps) {
  const href = resolveToolPrimaryUrl(tool);

  if (!href) {
    return null;
  }

  const label = getToolPrimaryCtaLabel(tool, affiliateLabel, websiteLabel);

  return (
    <TrackedExternalLink
      href={href}
      target={target ?? '_blank'}
      rel={rel ?? 'noopener noreferrer'}
      trackingPayload={buildOutboundClickPayload(tool, placement)}
      {...props}
    >
      {label}
      {showIcon ? <ExternalLink className={iconClassName} /> : null}
    </TrackedExternalLink>
  );
}
