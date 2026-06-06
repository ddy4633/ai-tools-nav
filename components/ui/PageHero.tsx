import Link from 'next/link';
import { ArrowRight, MoveUpRight } from 'lucide-react';
import type { ReactNode } from 'react';

interface PageHeroMetric {
  value: string;
  label: string;
  hint: string;
}

interface PageHeroAction {
  href: string;
  label: string;
  tone?: 'primary' | 'secondary' | 'ghost';
  external?: boolean;
}

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description: string;
  metrics?: PageHeroMetric[];
  actions?: PageHeroAction[];
  aside?: ReactNode;
  children?: ReactNode;
}

const actionToneClasses: Record<NonNullable<PageHeroAction['tone']>, string> = {
  primary: 'border-accent-cyan/35 bg-accent-cyan/15 text-text-primary hover:bg-accent-cyan/22',
  secondary: 'border-white/12 bg-white/6 text-text-primary hover:border-white/18 hover:bg-white/10',
  ghost: 'border-white/10 text-text-secondary hover:bg-white/5 hover:text-text-primary',
};

export default function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  metrics = [],
  actions = [],
  aside,
  children,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(circle_at_12%_14%,rgba(125,226,212,0.18),transparent_34%),radial-gradient(circle_at_78%_8%,rgba(240,154,121,0.18),transparent_30%),radial-gradient(circle_at_48%_42%,rgba(142,162,255,0.1),transparent_42%)]" />
      <div className="pointer-events-none absolute right-[-120px] top-12 h-[420px] w-[420px] rounded-full border border-white/8 opacity-50" />
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-10 md:pb-20 md:pt-14">
        <div className={`grid gap-8 ${aside ? 'lg:grid-cols-[minmax(0,1.08fr)_24rem]' : ''}`}>
          <div>
            {eyebrow ? (
              <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm text-text-secondary shadow-[0_12px_34px_rgba(0,0,0,0.18)] backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-accent-yellow" />
                {eyebrow}
              </div>
            ) : null}

            <h1 className="mt-6 max-w-5xl font-display text-5xl leading-[1.01] tracking-tight text-text-primary md:text-6xl">
              {title}
              {highlight ? <span className="block text-gradient-cyber">{highlight}</span> : null}
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-text-secondary md:text-lg">{description}</p>

            {metrics.length > 0 ? (
              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {metrics.map((metric) => (
                  <div key={`${metric.label}-${metric.value}`} className="rounded-[28px] border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <p className="text-2xl font-semibold text-text-primary">{metric.value}</p>
                    <p className="mt-2 text-sm text-text-secondary">{metric.label}</p>
                    <p className="mt-2 text-xs leading-6 text-text-muted">{metric.hint}</p>
                  </div>
                ))}
              </div>
            ) : null}

            {actions.length > 0 ? (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {actions.map((action) => {
                  const tone = action.tone ?? 'secondary';
                  const icon = action.external ? <MoveUpRight className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />;

                  return (
                    <Link key={`${action.href}-${action.label}`} href={action.href} className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${actionToneClasses[tone]}`}>
                      {action.label}
                      {icon}
                    </Link>
                  );
                })}
              </div>
            ) : null}

            {children ? <div className="mt-8">{children}</div> : null}
          </div>

          {aside ? (
            <aside className="rounded-[34px] border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.1),rgba(255,255,255,0.035))] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur">
              {aside}
            </aside>
          ) : null}
        </div>
      </div>
    </section>
  );
}
