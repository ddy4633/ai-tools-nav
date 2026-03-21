import type { Metadata } from 'next';
import { ArrowRight, Compass, Search, Send, Zap } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import TrackedLink from '@/components/ui/TrackedLink';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you requested does not exist. Continue into the directory, editorials, or product submission flow.',
};

export default function NotFound() {
  const fallbackLinks = [
    {
      href: '/tools',
      title: 'Go back to the directory',
      desc: 'Filter by workflow, category, and pricing to get back into decision mode quickly.',
      icon: Search,
    },
    {
      href: '/blog',
      title: 'Open editorial comparisons',
      desc: 'Continue through rankings, alternatives, and guides to reduce search friction.',
      icon: Compass,
    },
    {
      href: '/submit',
      title: 'Submit your product',
      desc: 'If you are a product team, jump straight into the listing or partnership flow.',
      icon: Send,
    },
  ];

  return (
    <main className="min-h-screen bg-bg-primary">
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[460px] bg-[radial-gradient(circle_at_top_left,rgba(125,226,212,0.16),transparent_34%),radial-gradient(circle_at_78%_12%,rgba(240,154,121,0.14),transparent_28%),radial-gradient(circle_at_52%_42%,rgba(142,162,255,0.08),transparent_42%)]" />
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-12 md:pb-20 md:pt-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.06fr)_24rem]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-text-secondary">
                <span className="h-2 w-2 rounded-full bg-accent-yellow" />
                Page not found / 404
              </div>
              <h1 className="mt-6 font-display text-5xl leading-[1.04] tracking-tight text-text-primary md:text-6xl">
                This link went missing.
                {' '}
                <span className="block text-gradient-cyber">Your next step should not.</span>
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-text-secondary md:text-lg">
                The URL may have moved, been mistyped, or expired. The useful part is what you do next, so the fastest recovery paths are right below.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <TrackedLink
                  href="/tools"
                  trackingPayload={{ placement: 'not_found_hero_tools', source: 'not_found' }}
                  className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
                >
                  Open the directory
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
                <TrackedLink
                  href="/"
                  trackingPayload={{ placement: 'not_found_hero_home', source: 'not_found' }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
                >
                  Return home
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
              </div>
            </div>

            <aside className="rounded-[30px] border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Zap className="h-4 w-4 text-accent-yellow" />
                Quick recovery
              </div>
              <div className="mt-5 space-y-3">
                {[
                  'Start in the directory and search by keyword.',
                  'If you came from an article, the editorial hub is usually the best re-entry point.',
                  'If you are a product team, go directly to submission or sponsorship.',
                ].map((item) => (
                  <div key={item} className="rounded-[22px] border border-white/8 bg-black/10 px-4 py-3 text-sm text-text-secondary">
                    {item}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading
          eyebrow="Recovery Path"
          title="Continue from here without wasting the visit"
          description="Whether you are looking for tools, reading content, or pitching a product, these entry points return you to the main flow."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {fallbackLinks.map((item) => (
            <TrackedLink
              key={item.href}
              href={item.href}
              trackingPayload={{ placement: 'not_found_recovery_grid', source: 'not_found' }}
              className="rounded-[28px] border border-white/10 bg-white/5 p-5 transition hover:border-white/16 hover:bg-white/[0.07]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/10">
                <item.icon className="h-5 w-5 text-accent-cyan" />
              </div>
              <h2 className="mt-5 text-xl font-semibold text-text-primary">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-text-secondary">{item.desc}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm text-text-primary">
                Enter
                <ArrowRight className="h-4 w-4 text-accent-cyan" />
              </span>
            </TrackedLink>
          ))}
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 text-center">
            <h2 className="text-2xl font-semibold text-text-primary">Are you here to promote a product?</h2>
            <p className="mt-3 text-sm leading-7 text-text-secondary">
              If you are a product team, you can submit a listing right now or jump straight to sponsorship packages.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <TrackedLink
                href="/submit"
                trackingPayload={{ placement: 'not_found_submit_cta', source: 'not_found' }}
                className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
              >
                Submit product
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
              <TrackedLink
                href="/advertise"
                trackingPayload={{ placement: 'not_found_advertise_cta', source: 'not_found' }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
              >
                View packages
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
