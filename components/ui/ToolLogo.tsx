'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ToolLogoProps {
  name: string;
  icon?: string | null;
  size?: number;
  wrapperClassName?: string;
  imageClassName?: string;
  textClassName?: string;
  alt?: string;
  priority?: boolean;
}

export default function ToolLogo({
  name,
  icon,
  size = 32,
  wrapperClassName = '',
  imageClassName = '',
  textClassName = '',
  alt,
  priority = false,
}: ToolLogoProps) {
  const safeAlt = alt ?? `${name} logo`;
  const [failedIcon, setFailedIcon] = useState<string | null>(null);
  const hasError = !icon || failedIcon === icon;

  return (
    <div
      className={`flex items-center justify-center overflow-hidden ${wrapperClassName}`.trim()}
      aria-label={safeAlt}
    >
      {!hasError && icon ? (
        <Image
          src={icon}
          alt={safeAlt}
          width={size}
          height={size}
          unoptimized
          loading={priority ? 'eager' : 'lazy'}
          onError={() => setFailedIcon(icon)}
          className={`object-contain ${imageClassName}`.trim()}
        />
      ) : (
        <span className={`font-mono ${textClassName}`.trim()}>{name[0]}</span>
      )}
    </div>
  );
}
