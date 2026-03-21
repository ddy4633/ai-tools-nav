import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Clock3, Megaphone } from 'lucide-react';
import SubmitForm from './SubmitForm';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import { commercialPackages, partnershipSteps } from '@/lib/content/growth-content';
import { buildSiteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Submit Your Product',
  description: 'Submit your AI product for a free listing, priority review, or sponsored visibility program built for launches and qualified discovery.',
  keywords: ['submit AI product', 'AI listing request', 'priority review', 'sponsored listing', 'AI tool directory'],
  alternates: {
    canonical: buildSiteUrl('/submit'),
  },
  openGraph: {
    title: 'Submit Your Product | AI Tool Atlas',
    description: 'List your AI product, request priority review, or open a sponsored visibility conversation.',
    url: buildSiteUrl('/submit'),
    type: 'website',
  },
};

const submitVisualLogos = [
  '/tool-icons/chatgpt.svg',
  '/tool-icons/claude.svg',
  '/tool-icons/deepseek.png',
  '/tool-icons/cursor.svg',
  '/tool-icons/windsurf.png',
  '/tool-icons/kimi.png',
  '/tool-icons/qwen.svg',
  '/tool-icons/midjourney.png',
  '/tool-icons/sora.png',
  '/tool-icons/kling.png',
  '/tool-icons/notion-ai.svg',
  '/tool-icons/figma-ai.svg',
];

function CommercialPlans() {
  const plans = [
    {
      icon: CheckCircle2,
      title: 'Free listing',
      desc: 'Best for organic discovery and standard editorial review.',
      meta: 'Standard review',
    },
    {
      icon: Clock3,
      title: 'Priority review',
      desc: 'Best for launch weeks, campaigns, and teams that need fast feedback.',
      meta: '48-hour priority',
    },
    {
      icon: Megaphone,
      title: 'Sponsored programs',
      desc: 'Best for homepage, category, ranking, and editorial visibility packages.',
      meta: 'Commercial inquiry',
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <SectionHeading
        eyebrow="Plan Entry"
        title="Choose the route first, then decide how much speed or reach you need"
        description="A free listing is an editorial entry point. Priority review and sponsorship are growth levers for timing and visibility."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <article key={plan.title} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/10">
                <Icon className="h-5 w-5 text-accent-cyan" />
              </div>
              <h2 className="mt-5 text-xl font-semibold text-text-primary">{plan.title}</h2>
              <p className="mt-3 text-sm leading-7 text-text-secondary">{plan.desc}</p>
              <span className="mt-4 inline-flex rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs text-text-secondary">
                {plan.meta}
              </span>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function PackageOverview() {
  return (
    <section className="border-t border-white/8">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading
          eyebrow="Package Ladder"
          title="This page should hold the full funnel from free listing to paid growth"
          description="The package ladder makes it easy to submit with no budget first and easy to upgrade when launch speed or exposure matters."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {commercialPackages.map((pkg) => (
            <article key={pkg.title} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-text-primary">{pkg.title}</h2>
                <span className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-sm text-text-secondary">
                  {pkg.budget}
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-text-secondary">{pkg.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {pkg.deliverables.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs text-text-secondary"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SubmissionGuide() {
  return (
    <section className="border-t border-white/8">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <SectionHeading
          eyebrow="How It Works"
          title="What happens after you submit"
          description="Clear process language increases completion rate and cuts follow-up back and forth."
          align="center"
        />
        <div className="mt-10 space-y-4">
          {partnershipSteps.map((step, index) => (
            <div key={step} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/10 text-sm font-semibold text-text-primary">
                  {index + 1}
                </span>
                <p className="text-sm leading-7 text-text-secondary">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VisualTrustWall() {
  return (
    <section className="border-t border-white/8">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading
          eyebrow="Visual Trust"
          title="Help teams instantly recognize the kind of products we review"
          description="A visual trust layer lowers review friction and helps commercial buyers understand the quality bar at a glance."
        />

        <div className="mt-10 grid gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {submitVisualLogos.map((logo) => (
            <div key={logo} className="group relative h-20 overflow-hidden rounded-[18px] border border-white/10 bg-black/15">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,226,212,0.16),transparent_58%),radial-gradient(circle_at_82%_18%,rgba(240,154,121,0.13),transparent_46%)]" />
              <Image
                src={logo}
                alt="Example product logo"
                fill
                unoptimized
                className="object-contain p-4 opacity-90 transition group-hover:scale-105 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedLinks() {
  const links = [
    { href: '/advertise', label: 'Commercial packages', desc: 'Review homepage, category, ranking, and editorial inventory' },
    { href: '/tools', label: 'Browse the directory', desc: 'See how products are positioned across the live site' },
    { href: '/blog', label: 'Read editorials', desc: 'Understand how we build high-intent discovery content' },
  ];

  return (
    <section className="border-t border-white/8">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading
          eyebrow="Next Step"
          title="You may want these next"
          align="center"
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-[28px] border border-white/10 bg-white/5 p-5 transition hover:border-white/16 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-semibold text-text-primary">{link.label}</h3>
              <p className="mt-3 text-sm leading-7 text-text-secondary">{link.desc}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm text-text-primary">
                Explore
                <ArrowRight className="h-4 w-4 text-accent-cyan" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function SubmitPage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <PageHero
        eyebrow="Submit / Partner"
        title="This is not a generic intake form."
        highlight="It should be a growth entry point."
        description="Use the free route if you simply want to be listed. Use the paid routes if you need faster review, cleaner launch timing, or higher-intent visibility during a campaign window."
        metrics={[
          {
            value: 'Free listing',
            label: 'Best for editorial inclusion',
            hint: 'Enter the standard queue and become eligible for organic discovery.',
          },
          {
            value: 'Priority review',
            label: 'Best for launch timing',
            hint: 'Ideal for launches, campaigns, and cold-start growth tests.',
          },
          {
            value: 'Sponsored programs',
            label: 'Best for paid visibility',
            hint: 'Mix homepage, category, ranking, and editorial surfaces into one package.',
          },
        ]}
        actions={[
          { href: '/advertise', label: 'View commercial packages', tone: 'primary' },
          { href: '/tools', label: 'Inspect the live directory', tone: 'secondary' },
        ]}
        aside={
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-text-muted">Why This Page Exists</p>
            <h2 className="mt-3 text-2xl font-semibold text-text-primary">One page should explain both the submission path and the paid upgrade path</h2>
            <p className="mt-4 text-sm leading-7 text-text-secondary">
              That keeps organic submitters comfortable while making sure teams with budget can find the right upgrade route immediately.
            </p>
          </div>
        }
      />

      <SubmitForm />
      <CommercialPlans />
      <PackageOverview />
      <SubmissionGuide />
      <VisualTrustWall />
      <RelatedLinks />
    </main>
  );
}
