import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Compass, Mail, ShieldCheck, Target } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import {
  audienceProfiles,
  commercialPackages,
  contentPillars,
  editorialPrinciples,
  growthChannels,
} from '@/lib/content/growth-content';
import { buildMailtoLink, buildSiteUrl, siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn the editorial principles, commercial transparency, and growth model behind AI Tool Atlas.',
  keywords: ['about AI Tool Atlas', 'AI editorial policy', 'AI tool platform', 'commercial transparency'],
  alternates: {
    canonical: buildSiteUrl('/about'),
  },
  openGraph: {
    title: 'About | AI Tool Atlas',
    description: 'Learn the editorial principles, transparency model, and growth strategy behind AI Tool Atlas.',
    type: 'website',
    url: buildSiteUrl('/about'),
  },
};

const aboutVisualLogos = [
  '/tool-icons/chatgpt.svg',
  '/tool-icons/claude.svg',
  '/tool-icons/deepseek.png',
  '/tool-icons/kimi.png',
  '/tool-icons/qwen.svg',
  '/tool-icons/cursor.svg',
  '/tool-icons/windsurf.png',
  '/tool-icons/midjourney.png',
  '/tool-icons/sora.png',
  '/tool-icons/figma-ai.svg',
  '/tool-icons/notion.svg',
  '/tool-icons/perplexity.svg',
];

const ecosystemTools = [
  {
    name: 'ProductoKit Image Kit',
    description: 'Built for teams that need faster sizing, polish, and export control across thumbnails, social posts, and campaign covers.',
    href: 'https://www.productokit.com/image-kit?utm_source=ai-tools-nav&utm_medium=about_page&utm_campaign=ecosystem_links',
  },
  {
    name: 'ProductoKit Text Polisher',
    description: 'Useful for tightening editorial copy, campaign messaging, and landing page language without rewriting from scratch.',
    href: 'https://www.productokit.com/text-polisher?utm_source=ai-tools-nav&utm_medium=about_page&utm_campaign=ecosystem_links',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <PageHero
        eyebrow="About AI Tool Atlas"
        title="We are not trying to build"
        highlight="another site that dumps tool names into a grid."
        description="The goal is to build a discovery layer with judgment. For users, that means less trial-and-error. For AI teams, that means a growth path capable of driving awareness, clicks, and qualified demand."
        metrics={[
          {
            value: 'Editorial-first',
            label: 'Information principle',
            hint: 'We compete on clarity of judgment before we compete on inventory size.',
          },
          {
            value: 'Commercial clarity',
            label: 'Trust principle',
            hint: 'Sponsored placements, partner links, and editorial picks stay visibly separate.',
          },
          {
            value: 'Workflow-driven',
            label: 'Page system',
            hint: 'The homepage, rankings, editorials, and detail pages are all built around real jobs to be done.',
          },
          {
            value: 'Long-term growth',
            label: 'Business goal',
            hint: 'Everything exists to support durable traffic and clearer monetization paths.',
          },
        ]}
        actions={[
          { href: '/tools', label: 'Explore the directory', tone: 'secondary' },
          { href: '/advertise', label: 'View sponsorship packages', tone: 'primary' },
          { href: '/submit', label: 'Submit your product', tone: 'ghost' },
        ]}
        aside={
          <div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <ShieldCheck className="h-4 w-4 text-accent-cyan" />
              The three things we protect most
            </div>
            <div className="mt-5 space-y-3">
              {[
                'Can a visitor narrow the decision space within three minutes?',
                'Does the page clearly explain fit, risk, and why a recommendation exists?',
                'Are monetized placements disclosed cleanly instead of hiding commercial intent?',
              ].map((item) => (
                <div key={item} className="rounded-[22px] border border-white/8 bg-black/10 px-4 py-3 text-sm text-text-secondary">
                  {item}
                </div>
              ))}
            </div>
          </div>
        }
      />

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeading
            eyebrow="Visual Promise"
            title="Our judgment should feel grounded in real products."
            description="Put recognizable tools in front of people first, then explain the recommendation logic and growth model."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {aboutVisualLogos.map((logo) => (
              <div key={logo} className="group relative h-20 overflow-hidden rounded-[18px] border border-white/10 bg-black/15">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,226,212,0.16),transparent_58%),radial-gradient(circle_at_82%_18%,rgba(240,154,121,0.13),transparent_46%)]" />
                <Image
                  src={logo}
                  alt="AI tool logo"
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
          eyebrow="Demand Lens"
          title="We do not serve everyone equally. We serve the audiences most likely to create value."
          description="The point of demand analysis is not to be everything to everyone. It is to know who each page serves and where it should route them next."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {audienceProfiles.map((profile) => (
            <article
              key={profile.title}
              className="rounded-[30px] border border-white/10 bg-white/5 p-6 transition hover:border-white/16"
            >
              <h2 className="text-2xl font-semibold text-text-primary">{profile.title}</h2>
              <p className="mt-4 text-sm leading-7 text-text-secondary">{profile.summary}</p>
              <p className="mt-4 rounded-[22px] border border-white/8 bg-black/10 px-4 py-4 text-sm leading-7 text-text-muted">
                {profile.value}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading
          eyebrow="Editorial Rule"
          title="The rules underneath our copy and content"
          description="Good editorial language is not adjective-heavy. It clarifies fit, use case, risk, and next action."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {editorialPrinciples.map((principle) => (
              <article key={principle.title} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <h2 className="text-lg font-semibold text-text-primary">{principle.title}</h2>
                <p className="mt-3 text-sm leading-7 text-text-secondary">{principle.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Content Engine"
                title="Content architecture should serve traffic, not completeness for its own sake"
                description="Every page type has a job so the site behaves like a growth funnel instead of a disconnected archive."
              />
              <div className="mt-8 space-y-4">
                {contentPillars.map((pillar) => (
                  <div key={pillar.title} className="rounded-[26px] border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center gap-2 text-text-primary">
                      <Target className="h-4 w-4 text-accent-yellow" />
                      <h3 className="text-lg font-semibold">{pillar.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-text-secondary">{pillar.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading
                eyebrow="Growth Loop"
                title="Distribution is not separate from page design"
                description="Pages, editorial content, and channel strategy need to reinforce each other so search, communities, and sponsorship do not drift apart."
              />
              <div className="mt-8 space-y-4">
                {growthChannels.map((channel) => (
                  <div key={channel.title} className="rounded-[26px] border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center gap-2 text-text-primary">
                      <Compass className="h-4 w-4 text-accent-cyan" />
                      <h3 className="text-lg font-semibold">{channel.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-text-secondary">{channel.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeading
            eyebrow="Ecosystem"
            title="The creator tools we use inside the publishing workflow"
            description="This site is a content product too, so image preparation and copy refinement show up as recurring production tasks."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {ecosystemTools.map((tool) => (
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
          <SectionHeading
            eyebrow="Monetization"
            title="The monetization model is already split into executable lanes"
            description="Subscriptions can wait. Affiliate links, paid listings, category spotlights, homepage sponsorships, editorial programs, and advisory work are enough to start monetizing now."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {commercialPackages.slice(0, 6).map((pkg) => (
              <article key={pkg.title} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between gap-4">
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

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] p-8 shadow-[0_28px_70px_rgba(0,0,0,0.25)]">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-text-muted">Contact</p>
                <h2 className="mt-2 text-3xl font-semibold text-text-primary">If this approach makes sense to you, we can scale it together</h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-text-secondary">
                  Whether you want to find tools, submit a product, or buy homepage and category visibility, we prefer long-term partnerships over one-off impressions.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/advertise"
                    className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
                  >
                    View commercial packages
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/submit"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
                  >
                    Submit your product
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-black/12 p-5">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Mail className="h-4 w-4 text-accent-cyan" />
                  Contact
                </div>
                <p className="mt-4 text-2xl font-semibold text-text-primary">{siteConfig.contactEmail}</p>
                <p className="mt-3 text-sm leading-7 text-text-secondary">
                  Share your product, budget, target placements, and launch timing. We will recommend the right commercial route.
                </p>
                <a
                  href={buildMailtoLink()}
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-primary transition hover:border-white/16"
                >
                  Email us
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
