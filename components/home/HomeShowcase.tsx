'use client';

import Link from 'next/link';
import { useMemo, useState, useTransition, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Compass,
  Layers3,
  LineChart,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
} from 'lucide-react';
import NewsletterSection from '@/components/home/NewsletterSection';
import LocalizedToolName from '@/components/ui/LocalizedToolName';
import ToolLogo from '@/components/ui/ToolLogo';
import ToolPrimaryCta from '@/components/ui/ToolPrimaryCta';
import type { Category, EditorPick, Tool, TrendingTool } from '@/types/tool';
import { getCategoryLabel, getToolCardSummary, getToolPrimaryName, hasCjk } from '@/lib/tool-display';

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
  tone: string;
}

const categoryAccents: Record<string, CategoryAccent> = {
  chatbot: {
    summary: 'Research, synthesis, deep Q&A, and long-context collaboration.',
    cue: 'Judge reasoning quality before model fame.',
    tone: 'from-[#7de2d4]/24 to-[#8ea2ff]/8',
  },
  code: {
    summary: 'Repo-aware coding, refactors, agents, and multi-file execution.',
    cue: 'Prioritize task closure, not autocomplete drama.',
    tone: 'from-[#8ea2ff]/24 to-[#7de2d4]/8',
  },
  image: {
    summary: 'Campaign visuals, style control, product shots, and social assets.',
    cue: 'Style ceiling matters before raw speed.',
    tone: 'from-[#f09a79]/24 to-[#f0c979]/10',
  },
  writing: {
    summary: 'Drafting, rewriting, editorial systems, and content operations.',
    cue: 'Structure is the real multiplier.',
    tone: 'from-[#f0c979]/22 to-[#7de2d4]/8',
  },
  productivity: {
    summary: 'Meeting capture, planning, automation, and workflow compression.',
    cue: 'The best tool removes switching cost.',
    tone: 'from-[#7de2d4]/20 to-[#f09a79]/8',
  },
  video: {
    summary: 'Demos, short-form video, motion ideas, and narrative prototypes.',
    cue: 'Repeatability beats surprise for production use.',
    tone: 'from-[#f09a79]/22 to-[#8ea2ff]/10',
  },
  audio: {
    summary: 'Voice, cleanup, transcription, podcasting, and localization.',
    cue: 'Clarity under pressure is the benchmark.',
    tone: 'from-[#8ea2ff]/20 to-[#f0c979]/10',
  },
  design: {
    summary: 'Interface exploration, brand expression, and concept loops.',
    cue: 'A design tool should help you decide faster.',
    tone: 'from-[#7de2d4]/22 to-[#f09a79]/8',
  },
  knowledge: {
    summary: 'Knowledge capture, memory, research reuse, and retrieval.',
    cue: 'Reusability is stronger than polish alone.',
    tone: 'from-[#f0c979]/20 to-[#8ea2ff]/8',
  },
  data: {
    summary: 'Spreadsheets, analysis, business insight, and decision support.',
    cue: 'The conclusion matters more than chart styling.',
    tone: 'from-[#8ea2ff]/20 to-[#7de2d4]/8',
  },
};

const pricingTone: Record<string, string> = {
  free: 'border-[#7de2d4]/30 bg-[#7de2d4]/12 text-[#a6f1e7]',
  paid: 'border-[#f09a79]/30 bg-[#f09a79]/12 text-[#ffd4c1]',
  freemium: 'border-white/12 bg-white/6 text-text-secondary',
};

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
      if (!key) continue;
      const group = map.get(key) ?? [];
      group.push(tool);
      map.set(key, group);
    }

    return map;
  }, [allTools]);

  const rankedCategories = [...categories]
    .sort((left, right) => right.popularity - left.popularity)
    .slice(0, 6);
  const heroTools = featuredTools.slice(0, 6);
  const heroQueries = heroTools.map((tool) => getToolPrimaryName(tool.name));
  const iconWallTools = allTools.filter((tool) => Boolean(tool.icon)).slice(0, 30);
  const spotlightTool = featuredTools[0] ?? editorPicks[0]?.tool;
  const spotlightPick = editorPicks.find((pick) => pick.tool.id === spotlightTool?.id);
  const editorCards = editorPicks.filter((pick) => pick.tool.id !== spotlightTool?.id).slice(0, 3);
  const trendingBoard = trendingTools.slice(0, 5);
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

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    startTransition(() => router.push(`/tools?search=${encodeURIComponent(query)}`));
  };

  return (
    <div className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[820px] bg-[radial-gradient(circle_at_14%_16%,rgba(125,226,212,0.22),transparent_32%),radial-gradient(circle_at_82%_6%,rgba(240,154,121,0.22),transparent_30%),radial-gradient(circle_at_52%_48%,rgba(142,162,255,0.14),transparent_42%)]" />
      <div className="pointer-events-none absolute left-1/2 top-20 h-[620px] w-[620px] -translate-x-1/2 rounded-full border border-white/8 opacity-40" />

      <section className="relative border-b border-white/8">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-10 md:pb-24 md:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(24rem,0.92fr)]"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm text-text-secondary shadow-[0_14px_40px_rgba(0,0,0,0.18)] backdrop-blur">
                <Sparkles className="h-4 w-4 text-accent-yellow" />
                <span>AI Tool Atlas 2026</span>
                <span className="text-text-muted">Editorial discovery for serious buyers</span>
              </div>

              <h1 className="mt-7 max-w-5xl font-display text-5xl leading-[0.98] tracking-tight text-text-primary sm:text-6xl lg:text-7xl">
                Pick the right AI tool before the tabs pile up.
                <span className="block text-gradient-cyber">Signal, fit, and momentum on one screen.</span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-text-secondary md:text-lg">
                A calmer front page for a noisy market: search by workflow, scan the fastest movers, then open editor-backed cards only when the next click is worth it.
              </p>

              <form
                onSubmit={handleSearch}
                className="mt-9 rounded-[34px] border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] p-2 shadow-[0_28px_90px_rgba(0,0,0,0.26)] backdrop-blur md:flex md:items-center"
              >
                <div className="flex flex-1 items-center gap-3 rounded-[26px] bg-black/10 px-5 py-4">
                  <Search className="h-5 w-5 text-accent-cyan" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search a tool, workflow, or category"
                    className="min-w-0 flex-1 bg-transparent text-base text-text-primary outline-none placeholder:text-text-muted"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isPending}
                  className="mt-2 inline-flex h-14 w-full items-center justify-center gap-2 rounded-[26px] border border-accent-cyan/35 bg-accent-cyan/15 px-6 text-sm font-semibold text-text-primary transition hover:bg-accent-cyan/20 disabled:cursor-not-allowed disabled:opacity-70 md:ml-2 md:mt-0 md:w-auto"
                >
                  {isPending ? 'Opening…' : 'Search atlas'}
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

              <div className="mt-9 grid gap-3 sm:grid-cols-3">
                <MetricCard value={`${toolCount}+`} label="Curated tools" hint="Wide enough to compare, narrow enough to decide." />
                <MetricCard value={`${categoryCount}`} label="Workflow lanes" hint="Organized by jobs instead of vendor noise." />
                <MetricCard value={averageRating.toFixed(1)} label="Editor score" hint="Opinion is useful only when the reason is visible." />
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[42px] bg-[radial-gradient(circle_at_top_left,rgba(125,226,212,0.18),transparent_42%),radial-gradient(circle_at_90%_20%,rgba(240,154,121,0.14),transparent_34%)] blur-2xl" />
              <div className="relative grid gap-4">
                {spotlightTool ? (
                  <article className="overflow-hidden rounded-[36px] border border-white/12 bg-[linear-gradient(160deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] p-6 shadow-[0_32px_100px_rgba(0,0,0,0.28)] backdrop-blur">
                    <div className="flex items-center justify-between gap-4">
                      <span className="inline-flex items-center gap-2 rounded-full border border-[#f0c979]/25 bg-[#f0c979]/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#f5ddb1]">
                        <Star className="h-3.5 w-3.5" />
                        Cover pick
                      </span>
                      <span className="rounded-full border border-white/10 bg-black/12 px-3 py-1 text-sm text-text-secondary">
                        {spotlightTool.editorRating?.toFixed(1) ?? '4.6'} editor score
                      </span>
                    </div>

                    <div className="mt-6 flex items-start gap-4">
                      <ToolLogo
                        name={getToolPrimaryName(spotlightTool.name)}
                        icon={spotlightTool.icon}
                        size={44}
                        alt={`${getToolPrimaryName(spotlightTool.name)} logo`}
                        wrapperClassName="h-16 w-16 rounded-[24px] border border-white/12 bg-black/16"
                        imageClassName="h-11 w-11"
                        textClassName="text-2xl text-accent-cyan"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-2xl font-semibold text-text-primary">
                            <LocalizedToolName name={spotlightTool.name} mode="surface" />
                          </h2>
                          <span className={`rounded-full border px-2.5 py-1 text-xs ${pricingTone[spotlightTool.pricing_type || spotlightTool.pricingType || 'freemium']}`}>
                            {(spotlightTool.pricing_type || spotlightTool.pricingType || 'freemium').toUpperCase()}
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-7 text-text-secondary">{getToolCardSummary(spotlightTool)}</p>
                      </div>
                    </div>

                    <blockquote className="mt-6 rounded-[24px] border border-white/10 bg-black/12 p-4 text-base leading-8 text-text-primary/92">
                      “{spotlightPick?.comment && !hasCjk(spotlightPick.comment)
                        ? spotlightPick.comment
                        : 'A homepage card should make a decision easier, not merely add another product name.'}”
                    </blockquote>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <ToolPrimaryCta
                        tool={spotlightTool}
                        placement="home_redesign_spotlight_primary_cta"
                        affiliateLabel="Open partner link"
                        websiteLabel="Visit site"
                        className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/15 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/20"
                      />
                      <Link href={`/tools/${spotlightTool.id}`} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary">
                        Read review
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                ) : null}

                <div className="grid gap-4 sm:grid-cols-2">
                  <SignalPanel icon={<LineChart className="h-4 w-4" />} title="Momentum desk" value={`${trendingBoard.length || 0} live movers`} detail="Trending tools stay visible without taking over the page." />
                  <SignalPanel icon={<ShieldCheck className="h-4 w-4" />} title="Paid clarity" value={`${sponsoredTools.length} sponsor slots`} detail="Commercial placement is separated from editorial picks." />
                </div>

                {trendingBoard.length > 0 ? (
                  <div className="rounded-[30px] border border-white/10 bg-white/5 p-5 backdrop-blur">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-text-muted">Live radar</p>
                        <h3 className="mt-2 text-xl font-semibold text-text-primary">Most likely to get clicked today</h3>
                      </div>
                      <Link href="/trending" className="text-sm text-text-secondary transition hover:text-text-primary">View board</Link>
                    </div>
                    <div className="mt-5 space-y-3">
                      {trendingBoard.slice(0, 4).map((tool, index) => (
                        <Link key={tool.id} href={`/tools/${tool.id}`} className="group flex items-center gap-3 rounded-[22px] border border-white/8 bg-black/10 px-4 py-3 transition hover:border-accent-cyan/25 hover:bg-white/6">
                          <span className="flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold text-text-primary">{index + 1}</span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-text-primary"><LocalizedToolName name={tool.name} mode="surface" /></p>
                            <p className="truncate text-xs text-text-muted">{getCategoryLabel(tool.category, tool.categorySlug ?? tool.category_slug)}</p>
                          </div>
                          <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent-yellow">
                            <TrendingUp className="h-4 w-4" />
                            {tool.hype_score.toFixed(0)}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {iconWallTools.length > 0 ? (
        <section className="border-b border-white/8 bg-white/[0.025]">
          <div className="mx-auto max-w-7xl px-6 py-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-text-muted">Logo memory wall</p>
                <h2 className="mt-2 text-2xl font-semibold text-text-primary">Users scan logos first, then decide what to read.</h2>
              </div>
              <Link href="/tools" className="inline-flex items-center gap-2 text-sm text-text-secondary transition hover:text-text-primary">
                Open full directory
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-7 grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-10">
              {iconWallTools.map((tool) => (
                <Link key={tool.id} href={`/tools/${tool.id}`} className="group flex aspect-square items-center justify-center rounded-[24px] border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:border-white/16 hover:bg-white/[0.08]">
                  <ToolLogo
                    name={getToolPrimaryName(tool.name)}
                    icon={tool.icon}
                    size={42}
                    alt={`${getToolPrimaryName(tool.name)} logo`}
                    wrapperClassName="h-14 w-14 rounded-[18px] border border-white/10 bg-black/12"
                    imageClassName="h-10 w-10"
                    textClassName="text-xl text-accent-cyan"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeading
            eyebrow="Enter by workflow"
            title="Start from the job. The product list gets smaller after that."
            description="Each lane explains what matters in that workflow, shows real tools, and keeps the next click obvious."
            icon={<Compass className="h-5 w-5 text-accent-cyan" />}
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {rankedCategories.map((category, index) => {
              const accent = categoryAccents[category.slug] ?? {
                summary: 'A practical entry point for this workflow.',
                cue: 'Compare fit before hype.',
                tone: 'from-white/12 to-white/4',
              };
              const relatedTools = (categoryToolMap.get(category.slug) ?? []).slice(0, 3);

              return (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className={`group relative overflow-hidden rounded-[34px] border border-white/10 bg-white/5 p-6 transition hover:-translate-y-0.5 hover:border-white/16 ${index === 0 ? 'lg:col-span-2' : ''}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${accent.tone} opacity-90`} />
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-text-muted">Lane {String(index + 1).padStart(2, '0')}</p>
                        <h3 className="mt-3 text-3xl font-semibold text-text-primary">{getCategoryLabel(category.name, category.slug)}</h3>
                      </div>
                      <span className="rounded-full border border-white/12 bg-black/10 px-3 py-1 text-sm text-text-secondary">{category.count} tools</span>
                    </div>
                    <p className="mt-5 max-w-xl text-sm leading-7 text-text-secondary">{accent.summary}</p>
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
                          <span key={tool.id} className="rounded-full border border-white/12 bg-black/12 px-3 py-1 text-xs text-text-secondary">
                            <LocalizedToolName name={tool.name} mode="surface" />
                          </span>
                        ))}
                      </div>
                      <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-text-primary">
                        Explore this lane
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

      <section className="border-y border-white/8 bg-white/[0.035]">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div>
            <SectionHeading
              eyebrow="Editorial stack"
              title="Recommendations need visible reasoning, not just prettier cards."
              description="The redesign gives every major recommendation a why, a fit signal, and a next step."
              icon={<Layers3 className="h-5 w-5 text-accent-yellow" />}
            />

            <div className="mt-8 grid gap-4">
              {editorCards.map((pick, index) => (
                <article key={pick.id} className="group rounded-[30px] border border-white/10 bg-black/12 p-5 transition hover:border-white/16 hover:bg-white/6">
                  <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                    <div className="flex min-w-0 items-start gap-4">
                      <ToolLogo
                        name={getToolPrimaryName(pick.tool.name)}
                        icon={pick.tool.icon}
                        size={34}
                        alt={`${getToolPrimaryName(pick.tool.name)} logo`}
                        wrapperClassName="h-14 w-14 rounded-[20px] border border-white/10 bg-white/5"
                        imageClassName="h-9 w-9"
                        textClassName="text-xl text-accent-cyan"
                      />
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-semibold text-text-primary"><LocalizedToolName name={pick.tool.name} mode="surface" /></h3>
                          <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-text-muted">Editor pick #{index + 2}</span>
                        </div>
                        <p className="mt-2 text-sm leading-7 text-text-secondary">{getToolCardSummary(pick.tool)}</p>
                        <p className="mt-4 text-base leading-8 text-text-primary/92">“{!hasCjk(pick.comment) ? pick.comment : 'Use this recommendation as a shortcut into the category, not as a blind endorsement.'}”</p>
                      </div>
                    </div>
                    <Link href={`/tools/${pick.tool.id}`} className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary">
                      Open review
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <article className="rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-text-muted">Design rules</p>
              <h3 className="mt-3 text-2xl font-semibold text-text-primary">What changed in this redesign</h3>
              <div className="mt-6 space-y-3">
                <MethodItem title="Decision before directory" detail="Search, signal panels, and cover pick appear before dense card grids." />
                <MethodItem title="Editorial rhythm" detail="Sections alternate between bento panels, logo scanning, and readable recommendation rows." />
                <MethodItem title="Paid separation" detail="Sponsor surfaces keep a distinct lane so trust is not diluted." />
              </div>
            </article>

            <article className="rounded-[34px] border border-[#f0c979]/20 bg-[linear-gradient(180deg,rgba(240,201,121,0.12),rgba(255,255,255,0.02))] p-6">
              <div className="flex items-center gap-2 text-sm text-accent-yellow">
                <ShieldCheck className="h-4 w-4" />
                Disclosure stays visible
              </div>
              <p className="mt-3 text-base leading-8 text-text-secondary">
                Sponsored tools can support the business without looking like editor picks. The UI keeps that distinction visible.
              </p>
              <Link href="/advertise" className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#f0c979]/30 px-4 py-2 text-sm text-accent-yellow transition hover:bg-[#f0c979]/10">
                View paid placements
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeading
            eyebrow="Worth trying first"
            title="Cards now read like product decisions, not inventory boxes."
            description="The final grid keeps the directory useful while preserving hierarchy, context, and clear calls to action."
            icon={<BarChart3 className="h-5 w-5 text-accent-pink" />}
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {heroTools.map((tool, index) => (
              <article key={tool.id} className={`group relative overflow-hidden rounded-[34px] border border-white/10 bg-white/5 p-5 transition hover:-translate-y-0.5 hover:border-white/16 ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,226,212,0.16),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent_46%)]" />
                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-start gap-4">
                      <ToolLogo
                        name={getToolPrimaryName(tool.name)}
                        icon={tool.icon}
                        size={36}
                        alt={`${getToolPrimaryName(tool.name)} logo`}
                        wrapperClassName="h-14 w-14 rounded-[22px] border border-white/10 bg-black/12"
                        imageClassName="h-9 w-9"
                        textClassName="text-xl text-accent-cyan"
                      />
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="truncate text-xl font-semibold text-text-primary"><LocalizedToolName name={tool.name} mode="surface" /></h3>
                          <span className={`rounded-full border px-2.5 py-1 text-xs ${pricingTone[tool.pricing_type || tool.pricingType || 'freemium']}`}>{(tool.pricing_type || tool.pricingType || 'freemium').toUpperCase()}</span>
                        </div>
                        <p className="mt-2 text-sm text-text-muted">{getCategoryLabel(tool.category, tool.categorySlug ?? tool.category_slug)}</p>
                      </div>
                    </div>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-sm text-text-muted">{tool.editorRating?.toFixed(1) ?? '4.5'}</span>
                  </div>

                  <p className={`mt-5 leading-8 text-text-secondary ${index === 0 ? 'text-base' : 'text-sm'}`}>{getToolCardSummary(tool)}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {(tool.features?.filter((feature) => !hasCjk(feature)).slice(0, index === 0 ? 4 : 2) ?? []).map((feature) => (
                      <span key={feature} className="rounded-full border border-white/10 bg-black/12 px-3 py-1 text-xs text-text-secondary">{feature}</span>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
                    <ToolPrimaryCta
                      tool={tool}
                      placement="home_redesign_featured_primary_cta"
                      affiliateLabel="Open partner link"
                      websiteLabel="Visit site"
                      className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/15 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/20"
                    />
                    <Link href={`/tools/${tool.id}`} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary">
                      Review and alternatives
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
    <div className="rounded-[26px] border border-white/10 bg-white/5 p-4 backdrop-blur">
      <p className="text-2xl font-semibold text-text-primary">{value}</p>
      <p className="mt-2 text-sm text-text-secondary">{label}</p>
      <p className="mt-2 text-xs leading-6 text-text-muted">{hint}</p>
    </div>
  );
}

function SignalPanel({ icon, title, value, detail }: { icon: ReactNode; title: string; value: string; detail: string }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur">
      <div className="flex items-center gap-2 text-sm text-text-secondary">
        <span className="text-accent-cyan">{icon}</span>
        {title}
      </div>
      <p className="mt-3 text-2xl font-semibold text-text-primary">{value}</p>
      <p className="mt-2 text-sm leading-7 text-text-muted">{detail}</p>
    </div>
  );
}

function MethodItem({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-[22px] border border-white/8 bg-black/12 p-4">
      <div className="flex items-start gap-3">
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-cyan" />
        <div>
          <p className="text-sm font-semibold text-text-primary">{title}</p>
          <p className="mt-2 text-sm leading-7 text-text-secondary">{detail}</p>
        </div>
      </div>
    </div>
  );
}
