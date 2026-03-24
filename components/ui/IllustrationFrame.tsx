import Image from 'next/image';
import type { ReactNode } from 'react';

interface IllustrationFrameProps {
  src: string;
  alt: string;
  eyebrow?: string;
  title: string;
  description: string;
  chips?: string[];
  children?: ReactNode;
  priority?: boolean;
}

export default function IllustrationFrame({
  src,
  alt,
  eyebrow,
  title,
  description,
  chips = [],
  children,
  priority = false,
}: IllustrationFrameProps) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-black/10 p-4">
      <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#0A1726]">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={900}
          priority={priority}
          className="h-auto w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,226,212,0.16),transparent_30%),radial-gradient(circle_at_88%_16%,rgba(240,154,121,0.14),transparent_24%)]" />
      </div>

      <div className="mt-4">
        {eyebrow ? (
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-text-muted">
            <span className="h-2 w-2 rounded-full bg-accent-cyan" />
            {eyebrow}
          </div>
        ) : null}

        <h3 className="mt-3 text-lg font-semibold text-text-primary">{title}</h3>
        <p className="mt-2 text-sm leading-7 text-text-secondary">{description}</p>

        {chips.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-text-secondary"
              >
                {chip}
              </span>
            ))}
          </div>
        ) : null}

        {children ? <div className="mt-4">{children}</div> : null}
      </div>
    </div>
  );
}
