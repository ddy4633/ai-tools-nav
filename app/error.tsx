'use client';

import { useEffect } from 'react';
import { AlertTriangle, ArrowRight, RefreshCw } from 'lucide-react';
import TrackedLink from '@/components/ui/TrackedLink';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Error caught by boundary:', error);
  }, [error]);

  const nextSteps = [
    {
      href: '/tools',
      title: 'Open the directory',
      desc: 'Keep filtering by workflow and category without breaking the decision flow.',
    },
    {
      href: '/blog',
      title: 'Read editorial guidance',
      desc: 'Continue through rankings, comparisons, and guides to recover quickly.',
    },
    {
      href: '/submit',
      title: 'Submit your product',
      desc: 'If you are a product team, the submission and commercial paths are still available.',
    },
  ];

  return (
    <main className="min-h-screen bg-bg-primary">
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_top_left,rgba(125,226,212,0.16),transparent_34%),radial-gradient(circle_at_78%_12%,rgba(240,154,121,0.14),transparent_28%),radial-gradient(circle_at_52%_42%,rgba(142,162,255,0.08),transparent_42%)]" />
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-12 md:pb-20 md:pt-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_24rem]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-text-secondary">
                <span className="h-2 w-2 rounded-full bg-accent-yellow" />
                Loading error
              </div>
              <h1 className="mt-6 font-display text-5xl leading-[1.04] tracking-tight text-text-primary md:text-6xl">
                This page hit a temporary problem.
                {' '}
                <span className="block text-gradient-cyber">Your workflow does not have to stop here.</span>
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-text-secondary md:text-lg">
                This is usually temporary. Retry the current page or use the recovery paths below to keep moving.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={reset}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
                >
                  <RefreshCw className="h-4 w-4" />
                  Retry this page
                </button>
                <TrackedLink
                  href="/"
                  trackingPayload={{ placement: 'error_hero_home', source: 'error_boundary' }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
                >
                  Return home
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
              </div>
            </div>

            <aside className="rounded-[30px] border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <AlertTriangle className="h-4 w-4 text-accent-pink" />
                Error details
              </div>
              <div className="mt-4 rounded-[22px] border border-white/8 bg-black/10 p-4 text-left">
                <p className="text-sm leading-7 text-text-secondary">{error.message || 'Unknown error'}</p>
                {error.digest ? (
                  <p className="mt-2 text-xs text-text-muted">Error ID: {error.digest}</p>
                ) : null}
              </div>
              <p className="mt-3 text-xs leading-6 text-text-muted">
                Saving this error detail helps us investigate and fix the issue later.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {nextSteps.map((item) => (
            <TrackedLink
              key={item.href}
              href={item.href}
              trackingPayload={{ placement: 'error_recovery_grid', source: 'error_boundary' }}
              className="rounded-[28px] border border-white/10 bg-white/5 p-5 transition hover:border-white/16 hover:bg-white/[0.07]"
            >
              <h2 className="text-xl font-semibold text-text-primary">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-text-secondary">{item.desc}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm text-text-primary">
                Open
                <ArrowRight className="h-4 w-4 text-accent-cyan" />
              </span>
            </TrackedLink>
          ))}
        </div>
      </section>
    </main>
  );
}
