'use client';

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';
import Link, { type LinkProps } from 'next/link';
import { trackInternalCtaClick, type TrackingEventPayload } from '@/lib/tracking';

interface TrackedLinkProps extends LinkProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  children: ReactNode;
  trackingPayload?: TrackingEventPayload;
}

function resolveHrefValue(href: LinkProps['href']) {
  if (typeof href === 'string') {
    return href;
  }

  if (href && typeof href === 'object' && 'pathname' in href) {
    return typeof href.pathname === 'string' ? href.pathname : String(href.pathname);
  }

  return undefined;
}

export default function TrackedLink({
  children,
  trackingPayload,
  onClick,
  href,
  ...props
}: TrackedLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    trackInternalCtaClick({
      ...trackingPayload,
      targetUrl: resolveHrefValue(href),
    });
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
