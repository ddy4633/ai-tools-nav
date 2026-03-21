'use client';

import Link from 'next/link';
import { useMemo, useState, useTransition, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Compass,
  FolderOpenDot,
  Image as ImageIcon,
  Layers3,
  MoveUpRight,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
} from 'lucide-react';
import NewsletterSection from '@/components/home/NewsletterSection';
import ToolLogo from '@/components/ui/ToolLogo';
import ToolPrimaryCta from '@/components/ui/ToolPrimaryCta';
import type { Category, EditorPick, Tool, TrendingTool } from '@/types/tool';
import { getCategoryLabel, getToolCardSummary, getToolDisplayName, isCjkHeavy } from '@/lib/tool-display';

interface HomeShowcaseProps {
  allTools: Tool[];
  featuredTools: Tool[];
  trendingTools: TrendingTool[];
  categories: Category[];
  editorPicks: EditorPick[];
  sponsoredTools: Tool[];
}

interface CategoryAccent {
  summary: string;
  cue: string;
  gradient: string;
  ring: string;
}

const categoryAccents: Record<string, CategoryAccent> = {
  chatbot: {
    summary: 'Built for research, deep Q&A, and long-thread collaboration.',
    cue: 'Start with the quality of the task, not the fame of the model.',
    gradient: 'from-[#7de2d4]/24 via-transparent to-[#f0c979]/12',
    ring: 'shadow-[0_18px_50px_rgba(125,226,212,0.12)]',
  },
  code: {
    summary: 'Best for high-frequency coding, refactors, and multi-file execution.',
    cue: 'Prioritize repo understanding and task closure, not just autocomplete speed.',
    gradient: 'from-[#8ea2ff]/22 via-transparent to-[#7de2d4]/10',
    ring: 'shadow-[0_18px_50px_rgba(142,162,255,0.12)]',
  },
  image: {
    summary: 'Focus on image quality, style control, and commercial reliability.',
    cue: 'Judge the style ceiling before you judge generation speed.',
    gradient: 'from-[#f09a79]/22 via-transparent to-[#f0c979]/10',
    ring: 'shadow-[0_18px_50px_rgba(240,154,121,0.12)]',
  },
  writing: {
    summary: 'Great for rewriting, synthesis, and editorial production.',
    cue: 'Structure matters more than the ability to continue a sentence.',
    gradient: 'from-[#f0c979]/18 via-transparent to-[#7de2d4]/8',
    ring: 'shadow-[0_18px_50px_rgba(240,201,121,0.12)]',
  },
  productivity: {
    summary: 'Good for meeting capture, automation, and workflow compression.',
    cue: 'The real value is fewer context switches, not more buttons.',
    gradient: 'from-[#7de2d4]/18 via-transparent to-[#8ea2ff]/10',
    ring: 'shadow-[0_18px_50px_rgba(125,226,212,0.1)]',
  },
  video: {
    summary: 'Measure shot consistency, pacing control, and output cost.',
    cue: 'Repeatability matters before cinematic surprise.',
    gradient: 'from-[#f09a79]/20 via-transparent to-[#8ea2ff]/10',
    ring: 'shadow-[0_18px_50px_rgba(240,154,121,0.1)]',
  },
  audio: {
    summary: 'Covers voice, transcription, cleanup, and cloning workflows.',
    cue: 'Audio tools should be usable under pressure, not just technically impressive.',
    gradient: 'from-[#8ea2ff]/18 via-transparent to-[#f0c979]/10',
    ring: 'shadow-[0_18px_50px_rgba(142,162,255,0.1)]',
  },
  design: {
    summary: 'Useful for prototypes, visual exploration, and faster concept loops.',
    cue: 'The best design tools help you decide faster instead of creating more noise.',
    gradient: 'from-[#7de2d4]/20 via-transparent to-[#f09a79]/10',
    ring: 'shadow-[0_18px_50px_rgba(125,226,212,0.1)]',
  },
  knowledge: {
    summary: 'Built for knowledge capture, recall, and reusable research.',
    cue: 'Reusability is the moat, not polish alone.',
    gradient: 'from-[#f0c979]/18 via-transparent to-[#8ea2ff]/8',
    ring: 'shadow-[0_18px_50px_rgba(240,201,121,0.1)]',
  },
  data: {
    summary: 'Useful for analysis, business insight, and decision support.',
    cue: 'Interpretation matters more than chart styling.',
    gradient: 'from-[#8ea2ff]/18 via-transparent to-[#7de2d4]/8',
    ring: 'shadow-[0_18px_50px_rgba(142,162,255,0.1)]',
  },
};

const pricingTone: Record<string, string> = {
  free: 'bg-[#7de2d4]/12 text-[#a6f1e7] border-[#7de2d4]/30',
  paid: 'bg-[#f09a79]/12 text-[#ffd4c1] border-[#f09a79]/30',
  freemium: 'bg-white/6 text-text-secondary border-white/12',
};

const categoryLayouts = [
  'md:col-span-6 md:row-span-2',
  'md:col-span-3 md:row-span-1',
  'md:col-span-3 md:row-span-1',
  'md:col-span-4 md:row-span-1',
  'md:col-span-4 md:row-span-1',
  'md:col-span-4 md:row-span-1',
];

const heroQueries = ['DeepSeek', 'Cursor', 'Midjourney', 'ChatGPT', 'Sora', 'Perplexity'];

export default function HomeShowcase({
  allTools,
  featuredTools,
  trendingTools,
  categories,
  editorPicks,
  sponsoredTools,
}: HomeShowcaseProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const categoryToolMap = useMemo(() => {
    const map = new Map<string, Tool[]>();

    for (const tool of allTools) {
      const key = tool.categorySlug || tool.category_slug;
      if (!key) {
        continue;
      }
      const group = map.get(key) ?? [];
      group.push(tool);
      map.set(key, group);
    }

    return map;
  }, [allTools]);

  const spotlightPick = editorPicks[0];
  const spotlightTool = spotlightPick?.tool ?? featuredTools[0];
  const spotlightDisplayName = spotlightTool ? getToolDisplayName(spotlightTool.name) : '';
  const heroShowcaseTools = featuredTools.slice(0, 8);
  const spotlightFeatures =
    spotlightTool?.features?.filter((item) => !isCjkHeavy(item)).slice(0, 3) ??
    spotlightTool?.alternatives?.map((item) => getToolDisplayName(item)).slice(0, 3) ??
    [];
  const rankedCategories = [...categories]
    .sort((left, right) => right.popularity - left.popularity)
    .slice(0, 6);
  const curatedTools = featuredTools.slice(0, 6);
  const visualWallTools = allTools
    .filter((tool) => Boolean(tool.icon))
    .slice(0, 24);
  const featuredEditorPicks = editorPicks.slice(1, 4);
  const liveBoard = trendingTools.slice(0, 4);
  const toolCount = allTools.length;
  const categoryCount = categories.length;
  const averageRating = Math.max(
    4.6,
    Math.round(
      (featuredTools.reduce((total, tool) => total + (tool.editorRating || 4.4), 0) /
        Math.max(featuredTools.length, 1)) *
        10
    ) / 10
  );
  const sponsorCount = sponsoredTools.length;

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchQuery.trim();

    if (!query) {
      return;
    }

    startTransition(() => {
      router.push(`/tools?search=${encodeURIComponent(query)}`);
    });
  };

  return (
    <div className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[760px] bg-[radial-gradient(circle_at_top_left,rgba(125,226,212,0.18),transparent_38%),radial-gradient(circle_at_78%_12%,rgba(240,154,121,0.18),transparent_34%),radial-gradient(circle_at_52%_42%,rgba(142,162,255,0.12),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-24 h-[520px] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)] opacity-40" />

      <section className="relative border-b border-white/8">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-10 md:pt-14 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_26rem] xl:grid-cols-[minmax(0,1.2fr)_29rem]"
          >
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-text-secondary backdrop-blur">
                <Sparkles className="h-4 w-4 text-accent-yellow" />
                <span>2026 global launch desk</span>
                <span className="text-text-muted">Move from browsing tools to making decisions</span>
              </div>

              <div className="mt-6 max-w-4xl">
                <h1 className="font-display text-5xl leading-[1.03] tracking-tight text-text-primary sm:text-6xl lg:text-7xl">
                  Stop trialing tools one tab at a time.
                  {' '}
                  <span className="block text-gradient-cyber">We screen the field before you click.</span>
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-text-secondary md:text-lg">
                  AI tools are not scarce anymore. Decision quality is. The homepage now runs on three signals:
                  workflow intent, momentum shifts, and editorial judgment across English, German, Japanese, Korean, and selected Chinese contexts.
                </p>
              </div>

              <form
                onSubmit={handleSearch}
                className="mt-8 flex flex-col gap-3 rounded-[30px] border border-white/10 bg-white/6 p-3 shadow-[0_24px_60px_rgba(0,0,0,0.22)] backdrop-blur md:flex-row md:items-center"
              >
                <div className="flex flex-1 items-center gap-3 rounded-[22px] border border-transparent bg-black/10 px-4 py-3">
                  <Search className="h-5 w-5 text-text-muted" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search tools, workflows, or product names"
                    className="min-w-0 flex-1 bg-transparent text-base text-text-primary outline-none placeholder:text-text-muted"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-[22px] border border-accent-cyan/35 bg-accent-cyan/12 px-6 text-sm font-semibold text-text-primary transition hover:bg-accent-cyan/18 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <span>{isPending ? 'Opening…' : 'Start filtering'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="text-sm text-text-muted">Fast starts</span>
                {heroQueries.map((query) => (
                  <button
                    key={query}
                    type="button"
                    onClick={() => startTransition(() => router.push(`/tools?search=${encodeURIComponent(query)}`))}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-text-secondary transition hover:border-accent-cyan/30 hover:text-text-primary"
                  >
                    {query}
                  </button>
                ))}
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <MetricCard value={`${toolCount}+`} label="Curated tools" hint="Covers breakout leaders and serious long-tail picks." />
                <MetricCard value={`${categoryCount}`} label="Workflow categories" hint="Organized by use case before feature jargon." />
                <MetricCard value={`${averageRating.toFixed(1)}`} label="Average editor score" hint="Opinion is allowed here, but the reasoning must be visible." />
                <MetricCard value={`${sponsorCount}`} label="Disclosed paid slots" hint="Commercial placements stay visually separate from editorial picks." />
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-3 text-sm">
                <Link
                  href="/tools"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-text-primary transition hover:border-accent-cyan/30 hover:bg-white/8"
                >
                  Explore the directory
                  <MoveUpRight className="h-4 w-4 text-accent-cyan" />
                </Link>
                <Link
                  href="/trending"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-text-secondary transition hover:text-text-primary"
                >
                  See this week’s movers
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <span className="inline-flex items-center gap-2 text-text-muted">
                  <ShieldCheck className="h-4 w-4 text-accent-yellow" />
                  Editorial and paid surfaces are shown separately
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {spotlightTool ? (
                <motion.article
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.28)]"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,226,212,0.18),transparent_40%),radial-gradient(circle_at_90%_10%,rgba(240,154,121,0.16),transparent_28%)]" />
                  <div className="relative">
                    <div className="flex items-center justify-between gap-4">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-text-secondary">
                        <Star className="h-3.5 w-3.5 text-accent-yellow" />
                        Cover pick
                      </span>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-sm text-text-muted">
                        Editor score {spotlightTool.editorRating?.toFixed(1) ?? '4.6'}
                      </span>
                    </div>

                    <div className="mt-6 flex items-start gap-4">
                      <ToolLogo
                        name={spotlightDisplayName}
                        icon={spotlightTool.icon}
                        size={40}
                        alt={`${spotlightDisplayName} logo`}
                        wrapperClassName="h-16 w-16 rounded-[22px] border border-white/10 bg-black/15"
                        imageClassName="h-10 w-10"
                        textClassName="text-2xl text-accent-cyan"
                      />
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-2xl font-semibold text-text-primary">{spotlightDisplayName}</h2>
                          <span
                            className={`rounded-full border px-2.5 py-1 text-xs ${
                              pricingTone[spotlightTool.pricing_type || spotlightTool.pricingType || 'freemium']
                            }`}
                          >
                            {(spotlightTool.pricing_type || spotlightTool.pricingType || 'freemium').toUpperCase()}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-7 text-text-secondary">
                          {getToolCardSummary(spotlightTool)}
                        </p>
                      </div>
                    </div>

                    <blockquote className="mt-6 border-l border-accent-cyan/30 pl-4 text-base leading-8 text-text-primary/92">
                      “
                      {spotlightPick?.comment && !isCjkHeavy(spotlightPick.comment)
                        ? spotlightPick.comment
                        : 'Every card on the homepage should make a decision easier, not just list another product name.'}
                      ”
                    </blockquote>

                    {spotlightFeatures.length > 0 ? (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {spotlightFeatures.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-text-secondary"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <div className="mt-7 flex flex-wrap items-center gap-3">
                      <ToolPrimaryCta
                        tool={spotlightTool}
                        placement="home_showcase_spotlight_primary_cta"
                        affiliateLabel="Open partner link"
                        websiteLabel="Visit site"
                        className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
                      />
                      <Link
                        href={`/tools/${spotlightTool.id}`}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
                      >
                        Read the full review
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>

                    {spotlightPick ? (
                      <div className="mt-6 border-t border-white/8 pt-4 text-sm text-text-muted">
                        Editorial note from <span className="text-text-primary">{spotlightPick.editor.name}</span>, included to explain why this product earned homepage placement.
                      </div>
                    ) : null}
                  </div>
                </motion.article>
              ) : null}

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-text-muted">Momentum radar</p>
                    <h3 className="mt-2 text-xl font-semibold text-text-primary">The tools most likely to get clicked today</h3>
                  </div>
                  <Link
                    href="/trending"
                    className="inline-flex items-center gap-1 text-sm text-text-secondary transition hover:text-text-primary"
                >
                    View all trending
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="mt-5 space-y-3">
                  {liveBoard.map((tool, index) => (
                    <Link
                      key={tool.id}
                      href={`/tools/${tool.id}`}
                      className="group flex items-center gap-4 rounded-[22px] border border-white/8 bg-black/10 px-4 py-3 transition hover:border-accent-cyan/25 hover:bg-white/6"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold text-text-primary">
                        {(index + 1).toString().padStart(2, '0')}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="truncate text-sm font-semibold text-text-primary">{getToolDisplayName(tool.name)}</span>
                          <span className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-text-muted">
                            {getCategoryLabel(tool.category, tool.categorySlug ?? tool.category_slug)}
                          </span>
                        </div>
                        <p className="mt-1 truncate text-sm text-text-secondary">
                          {!isCjkHeavy(tool.one_liner) && tool.one_liner ? tool.one_liner : getToolCardSummary(tool)}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center justify-end gap-1 text-sm font-semibold text-accent-yellow">
                          <TrendingUp className="h-4 w-4" />
                          {tool.hype_score.toFixed(0)}
                        </div>
                        <div className="text-xs text-text-muted">
                          {tool.metrics?.github?.stars ? `${formatCompactNumber(tool.metrics.github.stars)} stars` : 'Momentum building'}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 rounded-[28px] border border-white/10 bg-white/5 px-5 py-5 backdrop-blur"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-text-muted">Frequently searched starts</p>
                <p className="mt-2 text-sm text-text-secondary">The first screen should already reduce choice fatigue instead of adding more noise.</p>
              </div>
              <Link href="/tools" className="text-sm text-text-secondary transition hover:text-text-primary">
                Open the full directory
              </Link>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {heroShowcaseTools.map((tool) => (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.id}`}
                  className="group flex items-center gap-3 rounded-[20px] border border-white/8 bg-black/10 px-4 py-3 transition hover:border-accent-cyan/28 hover:bg-white/6"
                >
                  <ToolLogo
                    name={getToolDisplayName(tool.name)}
                    icon={tool.icon}
                    size={28}
                    alt={`${getToolDisplayName(tool.name)} logo`}
                    wrapperClassName="h-11 w-11 rounded-2xl border border-white/10 bg-white/5"
                    imageClassName="h-7 w-7"
                    textClassName="text-lg text-accent-cyan"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-text-primary">{getToolDisplayName(tool.name)}</p>
                    <p className="truncate text-xs text-text-muted">{getCategoryLabel(tool.category, tool.categorySlug ?? tool.category_slug)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeading
            eyebrow="Enter by workflow"
            title="Do not start from product names. Start from the job you need done."
            description="Writing, image, coding, research, and ops tools may sound similar, but they win at different moments in the workflow. This section narrows the field first."
            icon={<Compass className="h-5 w-5 text-accent-cyan" />}
          />

          <div className="mt-10 grid auto-rows-[minmax(220px,auto)] gap-4 md:grid-cols-12">
            {rankedCategories.map((category, index) => {
              const accent = categoryAccents[category.slug] ?? {
                summary: 'Organized by workflow so the decision gets smaller, faster.',
                cue: 'Clarify the job first, then compare products.',
                gradient: 'from-white/12 via-transparent to-white/4',
                ring: '',
              };
              const relatedTools = (categoryToolMap.get(category.slug) ?? []).slice(0, 3);

              return (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className={`group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/5 p-5 transition hover:-translate-y-0.5 hover:border-white/16 ${categoryLayouts[index] ?? 'md:col-span-4'} ${accent.ring}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${accent.gradient} opacity-90 transition group-hover:opacity-100`} />
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-text-muted">Scene {String(index + 1).padStart(2, '0')}</p>
                        <h3 className="mt-3 text-2xl font-semibold text-text-primary">{getCategoryLabel(category.name, category.slug)}</h3>
                      </div>
                      <span className="rounded-full border border-white/12 bg-black/10 px-3 py-1 text-sm text-text-secondary">
                        {category.count} tools
                      </span>
                    </div>

                    <p className="mt-5 max-w-lg text-sm leading-7 text-text-secondary">{accent.summary}</p>

                    <div className="mt-6 flex items-center gap-3 text-sm text-text-muted">
                      <span>Momentum {category.popularity}%</span>
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/8">
                        <div className="h-full rounded-full bg-gradient-to-r from-accent-cyan via-accent-yellow to-accent-pink" style={{ width: `${Math.min(category.popularity, 100)}%` }} />
                      </div>
                    </div>

                    <p className="mt-5 text-sm leading-7 text-text-secondary">{accent.cue}</p>

                    <div className="mt-auto pt-6">
                      <div className="flex flex-wrap gap-2">
                        {relatedTools.map((tool) => (
                          <span
                            key={tool.id}
                            className="rounded-full border border-white/12 bg-black/12 px-3 py-1 text-xs text-text-secondary"
                          >
                            {getToolDisplayName(tool.name)}
                          </span>
                        ))}
                      </div>
                      <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-text-primary">
                        Explore this category
                        <ArrowRight className="h-4 w-4 text-accent-cyan transition group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative border-y border-white/8 bg-white/4">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div>
            <SectionHeading
              eyebrow="Editorial notes"
              title="A recommendation only works when the reasoning is visible."
              description="We keep the editor’s point of view, but every call has to land on fit, upside, and who the tool is actually for."
              icon={<Layers3 className="h-5 w-5 text-accent-yellow" />}
            />

            <div className="mt-8 grid gap-4">
              {featuredEditorPicks.map((pick, index) => (
                <article
                  key={pick.id}
                  className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-black/10 p-5 transition hover:border-white/16 hover:bg-white/6"
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-start">
                    <div className="flex min-w-0 flex-1 items-start gap-4">
                      <ToolLogo
                        name={getToolDisplayName(pick.tool.name)}
                        icon={pick.tool.icon}
                        size={30}
                        alt={`${getToolDisplayName(pick.tool.name)} logo`}
                        wrapperClassName="h-12 w-12 rounded-2xl border border-white/10 bg-white/5"
                        imageClassName="h-8 w-8"
                        textClassName="text-xl text-accent-cyan"
                      />
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-semibold text-text-primary">{getToolDisplayName(pick.tool.name)}</h3>
                          <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-text-muted">
                            Editor pick #{index + 2}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-7 text-text-secondary">
                          {getToolCardSummary(pick.tool)}
                        </p>
                        <p className="mt-4 text-base leading-8 text-text-primary/92">
                          “{!isCjkHeavy(pick.comment) ? pick.comment : 'Use this recommendation as a shortcut into the category, not as a blind endorsement.'}”
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 md:flex-col md:items-end">
                      <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-text-secondary">
                        @ {pick.editor.name}
                      </div>
                      <Link
                        href={`/tools/${pick.tool.id}`}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
                      >
                        Open review
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <article className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-text-muted">Homepage principles</p>
              <h3 className="mt-3 text-2xl font-semibold text-text-primary">What changed in this global rebuild</h3>
              <div className="mt-6 space-y-4">
                <MethodItem title="Routes before cards" detail="The first screen now offers search, momentum, a cover pick, and fast starts before the card wall appears." />
                <MethodItem title="Editorial rhythm over template repetition" detail="The layout uses hierarchy, negative space, and cover moments instead of stacking the same neon card pattern forever." />
                <MethodItem title="Global voice with selective local context" detail="English drives the surface layer, while German, Japanese, Korean, and selected Chinese context only appear when they improve a decision." />
              </div>
            </article>

            {sponsoredTools.length > 0 ? (
              <article className="rounded-[30px] border border-[#f0c979]/20 bg-[linear-gradient(180deg,rgba(240,201,121,0.12),rgba(255,255,255,0.02))] p-6">
                <div className="flex items-center gap-2 text-sm text-accent-yellow">
                  <ShieldCheck className="h-4 w-4" />
                  Sponsored placement
                </div>
                <p className="mt-3 text-base leading-8 text-text-secondary">
                  Paid visibility lives in its own lane. A beautiful homepage should never blur the line between editorial judgment and promotion.
                </p>
                <div className="mt-5 space-y-3">
                  {sponsoredTools.slice(0, 2).map((tool) => (
                    <div
                      key={tool.id}
                      className="rounded-[22px] border border-white/10 bg-black/12 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-text-primary">{getToolDisplayName(tool.name)}</p>
                          <p className="mt-1 text-sm leading-7 text-text-secondary">
                            {getToolCardSummary(tool)}
                          </p>
                        </div>
                        <ToolPrimaryCta
                          tool={tool}
                          placement="home_showcase_sponsored_primary_cta"
                          affiliateLabel="Open partner link"
                          websiteLabel="Visit site"
                          className="inline-flex items-center gap-2 rounded-full border border-[#f0c979]/30 px-3 py-1.5 text-xs text-accent-yellow transition hover:bg-[#f0c979]/10"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ) : (
              <article className="rounded-[30px] border border-white/10 bg-black/10 p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-text-muted">Transparency</p>
                <h3 className="mt-3 text-2xl font-semibold text-text-primary">Recommendations and ads should never look interchangeable</h3>
                <p className="mt-4 text-base leading-8 text-text-secondary">
                  As the site sells more placement, the distinction stays explicit: different zones, different copy, and different call-to-action styling.
                </p>
              </article>
            )}
          </div>
        </div>
      </section>

      {visualWallTools.length > 0 ? (
        <section className="relative border-t border-white/8">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <SectionHeading
              eyebrow="Visual navigation wall"
              title="The fastest first impression for mainstream users: icon first, copy second."
              description="A lot of users recognize logos before they remember positioning. This wall lowers the cognitive cost of the first click."
              icon={<ImageIcon className="h-5 w-5 text-accent-cyan" />}
            />

            <div className="mt-10 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {visualWallTools.map((tool) => (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.id}`}
                  className="group rounded-[22px] border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:border-white/16 hover:bg-white/[0.07]"
                >
                  <ToolLogo
                    name={getToolDisplayName(tool.name)}
                    icon={tool.icon}
                    size={40}
                    alt={`${getToolDisplayName(tool.name)} logo`}
                    wrapperClassName="h-14 w-14 rounded-[18px] border border-white/10 bg-black/12"
                    imageClassName="h-10 w-10"
                    textClassName="text-xl text-accent-cyan"
                  />
                  <p className="mt-4 truncate text-sm font-semibold text-text-primary">{getToolDisplayName(tool.name)}</p>
                  <p className="mt-1 truncate text-xs text-text-muted">{getCategoryLabel(tool.category, tool.categorySlug ?? tool.category_slug)}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeading
            eyebrow="Worth trying first"
            title="The card grid belongs at the end of the page, not the beginning."
            description="The cards still matter, but they now answer a more useful sequence: why try it, who it fits, and whether it deserves the next click."
            icon={<FolderOpenDot className="h-5 w-5 text-accent-pink" />}
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {curatedTools.map((tool, index) => (
              <article
                key={tool.id}
                className={`group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/5 p-5 transition hover:-translate-y-0.5 hover:border-white/16 ${
                  index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
                }`}
              >
                <div
                  className={`absolute inset-0 ${
                    index === 0
                      ? 'bg-[radial-gradient(circle_at_top_left,rgba(125,226,212,0.18),transparent_42%),radial-gradient(circle_at_85%_10%,rgba(240,154,121,0.16),transparent_30%)]'
                      : 'bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_38%)]'
                  }`}
                />
                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <ToolLogo
                        name={getToolDisplayName(tool.name)}
                        icon={tool.icon}
                        size={32}
                        alt={`${getToolDisplayName(tool.name)} logo`}
                        wrapperClassName="h-14 w-14 rounded-[22px] border border-white/10 bg-black/12"
                        imageClassName="h-8 w-8"
                        textClassName="text-xl text-accent-cyan"
                      />
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="truncate text-xl font-semibold text-text-primary">{getToolDisplayName(tool.name)}</h3>
                          <span
                            className={`rounded-full border px-2.5 py-1 text-xs ${
                              pricingTone[tool.pricing_type || tool.pricingType || 'freemium']
                            }`}
                          >
                            {(tool.pricing_type || tool.pricingType || 'freemium').toUpperCase()}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-text-muted">{getCategoryLabel(tool.category, tool.categorySlug ?? tool.category_slug)}</p>
                      </div>
                    </div>
                    <div className="rounded-full border border-white/10 px-3 py-1 text-sm text-text-muted">
                      {tool.editorRating?.toFixed(1) ?? '4.5'}
                    </div>
                  </div>

                  <p className={`mt-5 leading-8 text-text-secondary ${index === 0 ? 'text-base' : 'text-sm'}`}>
                    {getToolCardSummary(tool)}
                  </p>

                  {tool.features?.filter((feature) => !isCjkHeavy(feature)).length ? (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {tool.features
                        .filter((feature) => !isCjkHeavy(feature))
                        .slice(0, index === 0 ? 4 : 3)
                        .map((feature) => (
                        <span
                          key={feature}
                          className="rounded-full border border-white/10 bg-black/12 px-3 py-1 text-xs text-text-secondary"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {tool.pros?.filter((item) => !isCjkHeavy(item)).length ? (
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {tool.pros
                        .filter((item) => !isCjkHeavy(item))
                        .slice(0, 2)
                        .map((item) => (
                        <div key={item} className="rounded-[18px] border border-white/8 bg-black/12 px-3 py-3 text-sm text-text-secondary">
                          {item}
                        </div>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
                    <ToolPrimaryCta
                      tool={tool}
                      placement="home_showcase_featured_primary_cta"
                      affiliateLabel="Open partner link"
                      websiteLabel="Visit site"
                      className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
                    />
                    <Link
                      href={`/tools/${tool.id}`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
                    >
                      Open review
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  icon,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <div className="max-w-3xl">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-text-secondary">
        {icon}
        {eyebrow}
      </div>
      <h2 className="mt-5 font-display text-4xl leading-tight text-text-primary md:text-5xl">{title}</h2>
      <p className="mt-4 text-base leading-8 text-text-secondary md:text-lg">{description}</p>
    </div>
  );
}

function MetricCard({ value, label, hint }: { value: string; label: string; hint: string }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 px-4 py-4 backdrop-blur">
      <div className="text-2xl font-semibold text-text-primary">{value}</div>
      <p className="mt-1 text-sm text-text-secondary">{label}</p>
      <p className="mt-2 text-xs leading-6 text-text-muted">{hint}</p>
    </div>
  );
}

function MethodItem({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-[22px] border border-white/8 bg-black/12 p-4">
      <p className="text-sm font-semibold text-text-primary">{title}</p>
      <p className="mt-2 text-sm leading-7 text-text-secondary">{detail}</p>
    </div>
  );
}

function formatCompactNumber(value: number) {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}m`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }
  return `${value}`;
}
