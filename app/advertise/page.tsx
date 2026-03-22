import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BarChart3, Layers3, Megaphone, Target } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import {
  commercialPackages,
  contentPillars,
  growthChannels,
  partnershipSteps,
} from '@/lib/content/growth-content';
import { buildMailtoLink, buildSiteUrl, siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Advertise - Visibility Packages',
  description: 'Review sponsorship and visibility packages across the homepage, category hubs, rankings, editorial content, and advisory support.',
  keywords: ['advertise AI product', 'AI sponsorship', 'directory promotion', 'category spotlight', 'editorial sponsorship'],
  alternates: {
    canonical: buildSiteUrl('/advertise'),
  },
  openGraph: {
    title: 'Advertise | AI Tool Atlas',
    description: 'Homepage sponsorship, category spotlights, ranking integrations, editorial features, and advisory support.',
    url: buildSiteUrl('/advertise'),
    type: 'website',
  },
};

const adVisualLogos = [
  '/tool-icons/chatgpt.svg',
  '/tool-icons/claude.svg',
  '/tool-icons/deepseek.png',
  '/tool-icons/cursor.svg',
  '/tool-icons/windsurf.png',
  '/tool-icons/perplexity.svg',
  '/tool-icons/midjourney.png',
  '/tool-icons/sora.png',
  '/tool-icons/kling.png',
  '/tool-icons/figma-ai.svg',
  '/tool-icons/notion-ai.svg',
  '/tool-icons/obsidian.svg',
];

const ecosystemCaseTools = [
  {
    name: 'ProductoKit Image Kit',
    description: 'Best for teams producing multi-size ad assets, social covers, and campaign visuals on tight launch timelines.',
    href: 'https://www.productokit.com/image-kit?utm_source=ai-tools-nav&utm_medium=advertise_page&utm_campaign=ecosystem_links',
  },
  {
    name: 'ProductoKit Text Polisher',
    description: 'Useful for campaign copy, partnership pages, and ad landing page refinement when messaging needs to move faster.',
    href: 'https://www.productokit.com/text-polisher?utm_source=ai-tools-nav&utm_medium=advertise_page&utm_campaign=ecosystem_links',
  },
];

export default function AdvertisePage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <PageHero
        eyebrow="Commercial Packages"
        title="Put your product in front of"
        highlight="people already making tool decisions."
        description="We do not sell vague impressions. We sell intent-rich decision moments across the homepage, category comparisons, trend rankings, editorial features, and detail pages."
        metrics={[
          {
            value: 'Homepage + categories + rankings',
            label: 'Core visibility bundle',
            hint: 'Strong for awareness, launch lift, and top-of-funnel growth.',
          },
          {
            value: 'Editorial features',
            label: 'Long-tail traffic layer',
            hint: 'Best for comparison, alternative, tutorial, and pricing-driven demand.',
          },
          {
            value: 'Tracked clicks',
            label: 'Measurement model',
            hint: 'Partner links and page placements can be reviewed through structured click tracking.',
          },
        ]}
        actions={[
          { href: '/submit', label: 'Submit a campaign request', tone: 'primary' },
          { href: '/tools', label: 'Inspect the live directory', tone: 'secondary' },
        ]}
        aside={
          <div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Target className="h-4 w-4 text-accent-cyan" />
              Why teams buy here
            </div>
            <div className="mt-5 space-y-3">
              {[
                'Visitors are already evaluating tools, not casually browsing news.',
                'Different page types can separately handle awareness, click conversion, and lead capture.',
                'Sponsored surfaces stay distinct from editorial ones, which protects trust.',
              ].map((item) => (
                <div key={item} className="rounded-[22px] border border-white/8 bg-black/10 px-4 py-3 text-sm text-text-secondary">
                  {item}
                </div>
              ))}
            </div>
          </div>
        }
      />

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-text-muted">Audience Familiarity</p>
              <h2 className="mt-2 text-2xl font-semibold text-text-primary">Visibility works better when visitors already recognize the ecosystem</h2>
            </div>
            <span className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-sm text-text-secondary">
              12 recognizable brands
            </span>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {adVisualLogos.map((logo) => (
              <div key={logo} className="group relative h-20 overflow-hidden rounded-[18px] border border-white/10 bg-black/15">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,226,212,0.16),transparent_58%),radial-gradient(circle_at_82%_18%,rgba(240,154,121,0.13),transparent_46%)]" />
                <Image
                  src={logo}
                  alt="Recognizable AI tool logo"
                  fill
                  unoptimized
                  className="object-contain p-4 opacity-90 transition group-hover:scale-105 group-hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading
          eyebrow="Offer Menu"
          title="Commercial packages ready to sell now"
          description="To keep operations tight, the monetization layer starts with a focused menu: no subscriptions yet, but plenty of traffic and lead-generation products."
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
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Traffic Slot"
                title="Placements are not one ad slot. They are layers of intent."
              />
              <div className="mt-8 space-y-4">
                {contentPillars.map((pillar) => (
                  <article key={pillar.title} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center gap-2 text-text-primary">
                      <Layers3 className="h-4 w-4 text-accent-yellow" />
                      <h3 className="text-lg font-semibold">{pillar.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-text-secondary">{pillar.detail}</p>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading
                eyebrow="Promotion Plan"
                title="Promotion plans must be designed together with page architecture"
              />
              <div className="mt-8 space-y-4">
                {growthChannels.map((channel) => (
                  <article key={channel.title} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center gap-2 text-text-primary">
                      <Megaphone className="h-4 w-4 text-accent-cyan" />
                      <h3 className="text-lg font-semibold">{channel.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-text-secondary">{channel.summary}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeading
            eyebrow="Execution Flow"
            title="From brief to launch, this is the recommended flow"
            description="This is not heavy process for the sake of process. It keeps launches fast, pages clear, and results reviewable."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {partnershipSteps.map((step, index) => (
              <article key={step} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/10 text-sm font-semibold text-text-primary">
                  {index + 1}
                </div>
                <p className="mt-5 text-sm leading-7 text-text-secondary">{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeading
            eyebrow="Ecosystem Cases"
            title="The production tools partner teams often use alongside campaigns"
            description="These tools are commonly used for asset prep and landing page refinement when growth teams need to ship quickly."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {ecosystemCaseTools.map((tool) => (
              <article key={tool.name} className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold text-text-primary">{tool.name}</h3>
                <p className="mt-3 text-sm leading-7 text-text-secondary">{tool.description}</p>
                <a
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/10 px-4 py-2 text-sm text-text-primary transition hover:border-accent-cyan/30"
                >
                  Open tool
                  <ArrowRight className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] p-8 shadow-[0_28px_70px_rgba(0,0,0,0.25)]">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-text-muted">Business CTA</p>
                <h2 className="mt-2 text-3xl font-semibold text-text-primary">Ready to buy visibility or qualified demand? Start here.</h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-text-secondary">
                  If you already know the goal, submit a campaign request directly. If not, we can recommend the right mix based on your launch stage and budget.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/submit"
                    className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
                  >
                    Submit campaign request
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={buildMailtoLink()}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
                  >
                    Email the team
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-black/12 p-5">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <BarChart3 className="h-4 w-4 text-accent-yellow" />
                  Contact
                </div>
                <p className="mt-4 text-2xl font-semibold text-text-primary">{siteConfig.contactEmail}</p>
                <p className="mt-3 text-sm leading-7 text-text-secondary">
                  Include your product URL, target audience, ideal placements, launch window, and budget range for the fastest reply.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
