'use client';

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { trackOutboundClick, type TrackingEventPayload } from '@/lib/tracking';

interface TrackedExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  trackingPayload?: TrackingEventPayload;
}

export default function TrackedExternalLink({
  children,
  trackingPayload,
  onClick,
  href,
  ...props
}: TrackedExternalLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (event.defaultPrevented || !href) {
      return;
    }

    trackOutboundClick({
      ...trackingPayload,
      targetUrl: String(href),
    });
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
