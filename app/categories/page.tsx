import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Compass, Layers3, Sparkles } from 'lucide-react';
import { getCategories } from '@/lib/supabase';
import Breadcrumb, { breadcrumbPresets } from '@/components/ui/Breadcrumb';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import { buildSiteUrl } from '@/lib/site';
import { getCategoryLabel } from '@/lib/tool-display';

export const metadata: Metadata = {
  title: 'AI Categories - Browse by Workflow',
  description: 'Browse AI tools by workflow, from writing and image generation to coding, research, and productivity.',
  keywords: ['AI categories', 'AI writing tools', 'AI image tools', 'AI coding tools', 'AI chat tools', 'workflow directory'],
  alternates: {
    canonical: buildSiteUrl('/categories'),
  },
};

export default async function CategoriesPage() {
  const categories = await getCategories();
  const topCategories = [...categories].sort((left, right) => right.popularity - left.popularity).slice(0, 4);

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <Breadcrumb items={[{ ...breadcrumbPresets.categories, href: undefined }]} />
      </div>

      <PageHero
        eyebrow="Workflow Categories"
        title="Do not start with model names."
        highlight="Start with the job you need done."
        description="This page is not a taxonomy for its own sake. It is a shortcut into the right decision lane. Writing, design, coding, video, research, and knowledge work all need different evaluation rules."
        metrics={[
          {
            value: `${categories.length}`,
            label: 'Primary categories',
            hint: 'Covers the most common AI workflows without overwhelming first-time visitors.',
          },
          {
            value: `${categories.reduce((sum, category) => sum + category.count, 0)}+`,
            label: 'Tools across hubs',
            hint: 'Each category opens into deeper detail pages and editorial content.',
          },
          {
            value: `${topCategories[0] ? getCategoryLabel(topCategories[0].name) : 'AI Chat'}`,
            label: 'Most active hub',
            hint: 'High momentum does not mean best fit. It means worth checking first.',
          },
          {
            value: 'Workflow-first',
            label: 'Information model',
            hint: 'We group by real work instead of model branding.',
          },
        ]}
        actions={[
          { href: '/tools', label: 'Open the directory', tone: 'secondary' },
          { href: '/blog', label: 'Read editorials', tone: 'ghost' },
          { href: '/advertise', label: 'Buy category visibility', tone: 'primary' },
        ]}
        aside={
          <div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Compass className="h-4 w-4 text-accent-cyan" />
              How to use category hubs
            </div>
            <div className="mt-5 space-y-3">
              {[
                {
                  icon: Layers3,
                  title: 'Pick the workflow first',
                  description: 'Content teams should start with writing, image, and video. Product and engineering teams should start with coding and data.',
                },
                {
                  icon: Sparkles,
                  title: 'Then read the editorial lens',
                  description: 'Each hub explains what matters in that category so you do not choose on hype and pricing alone.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-[22px] border border-white/8 bg-black/10 p-4">
                  <div className="flex items-center gap-2 text-sm text-text-primary">
                    <item.icon className="h-4 w-4 text-accent-yellow" />
                    {item.title}
                  </div>
                  <p className="mt-3 text-sm leading-7 text-text-secondary">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        }
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading
          eyebrow="Category Matrix"
          title="Pick one lane and narrow the decision space"
          description="Every category hub includes a curated list, editorial reasoning, sponsor surfaces, and deeper next steps."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group rounded-[30px] border border-white/10 bg-white/5 p-5 transition hover:border-white/16 hover:bg-white/[0.07]"
            >
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-[18px] border border-white/10 bg-black/12">
                <Image
                  src={getCategoryIcon(category.slug)}
                  alt={`${getCategoryLabel(category.name)} icon`}
                  width={36}
                  height={36}
                  unoptimized
                  className="object-contain"
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-text-primary transition group-hover:text-accent-cyan">
                    {getCategoryLabel(category.name)}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-text-secondary">
                    {getCategoryDescription(category.slug, getCategoryLabel(category.name))}
                  </p>
                </div>
                <span className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-sm text-text-secondary">
                  {category.count} tools
                </span>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between text-sm text-text-muted">
                  <span>Momentum</span>
                  <span>{category.popularity}</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent-cyan via-accent-yellow to-accent-pink"
                    style={{ width: `${Math.min(category.popularity, 100)}%` }}
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between text-sm">
                <span className="text-text-muted">{getCategoryCue(category.slug)}</span>
                <span className="inline-flex items-center gap-2 text-text-primary">
                  Open hub
                  <ArrowRight className="h-4 w-4 text-accent-cyan" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-[32px] border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-text-muted">Sponsor Ready</p>
              <h2 className="mt-2 text-2xl font-semibold text-text-primary">Category hubs are commercial intent pages</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-text-secondary">
                If you sell a specific workflow capability such as AI writing, AI coding, or AI video, category hubs usually deliver stronger intent than generic reach buys.
              </p>
            </div>
            <Link
              href="/advertise"
              className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
            >
              View category sponsorship options
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function getCategoryDescription(slug: string, name: string) {
  const descriptions: Record<string, string> = {
    chatbot: 'Best for research, Q&A, synthesis, and long-context reading.',
    writing: 'Best for content production, marketing copy, long-form drafting, and rewrites.',
    code: 'Best for coding assistance, prototyping, repository edits, and developer workflows.',
    image: 'Best for visuals, campaign creative, concept art, and social assets.',
    video: 'Best for short-form video, demos, visual storytelling, and motion ideas.',
    audio: 'Best for voice, transcription, speech cleanup, and audio generation.',
    productivity: 'Best for meetings, planning, automation, and team execution.',
    design: 'Best for interface exploration, concepts, and brand expression.',
    knowledge: 'Best for research capture, inspiration management, and personal knowledge systems.',
    data: 'Best for spreadsheet analysis, business insight, and AI-assisted reporting.',
  };

  return descriptions[slug] ?? `A curated entry point for ${name} tools.`;
}

function getCategoryIcon(slug: string) {
  const iconMap: Record<string, string> = {
    chatbot: '/tool-icons/chatgpt.svg',
    writing: '/tool-icons/jasper.svg',
    code: '/tool-icons/cursor.svg',
    image: '/tool-icons/midjourney.png',
    video: '/tool-icons/sora.png',
    audio: '/tool-icons/suno.png',
    productivity: '/tool-icons/notion.svg',
    design: '/tool-icons/figma-ai.svg',
    knowledge: '/tool-icons/obsidian.svg',
    data: '/tool-icons/julius.ico',
  };

  return iconMap[slug] ?? '/tool-icons/chatgpt.svg';
}

function getCategoryCue(slug: string) {
  const cues: Record<string, string> = {
    chatbot: 'Start with reasoning and long-context quality',
    writing: 'Start with control and structure',
    code: 'Start with context handling and execution',
    image: 'Start with style consistency and deliverability',
    video: 'Start with coherence and generation cost',
    audio: 'Start with clarity and usable output',
    productivity: 'Start with how much switching it removes',
    design: 'Start with whether it improves decisions',
    knowledge: 'Start with how reusable captured knowledge becomes',
    data: 'Start with explanations and conclusion quality',
  };

  return cues[slug] ?? 'Start with the editorial rationale';
}
