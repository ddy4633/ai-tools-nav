import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Compass,
  Flame,
  GitFork,
  Github,
  Home,
  Image as ImageIcon,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import ToolLogo from '@/components/ui/ToolLogo';
import ToolPrimaryCta from '@/components/ui/ToolPrimaryCta';
import TrackedExternalLink from '@/components/ui/TrackedExternalLink';
import LocalizedToolName from '@/components/ui/LocalizedToolName';
import { getTrendingTools } from '@/lib/supabase';
import { getCategoryLabel, getInstallMethodLabel, getToolCardSummary, getToolPrimaryName, hasCjk } from '@/lib/tool-display';

export const metadata: Metadata = {
  title: 'Trending AI Tools - momentum, hype, and breakout movers',
  description: 'Track the AI tools with breakout momentum across hype, GitHub growth, and cross-market attention.',
  keywords: ['trending AI tools', 'AI momentum tracker', 'AI breakout products', 'AI launch feed', 'AI tool leaderboard'],
};

export const revalidate = 3600;

const tierStyles: Record<
  string,
  {
    label: string;
    badge: string;
    ring: string;
  }
> = {
  '🔥 BREAKING': {
    label: 'Breakout',
    badge: 'border-[#f09a79]/30 bg-[#f09a79]/12 text-[#ffd4c1]',
    ring: 'from-[#f09a79]/18 via-transparent to-transparent',
  },
  '⚡ TRENDING': {
    label: 'Rising fast',
    badge: 'border-[#f0c979]/30 bg-[#f0c979]/12 text-[#f5ddb1]',
    ring: 'from-[#f0c979]/16 via-transparent to-transparent',
  },
  '🚀 NEW': {
    label: 'New watch',
    badge: 'border-[#7de2d4]/30 bg-[#7de2d4]/12 text-[#a6f1e7]',
    ring: 'from-[#7de2d4]/16 via-transparent to-transparent',
  },
  '💡 WATCH': {
    label: 'Watch list',
    badge: 'border-[#8ea2ff]/28 bg-[#8ea2ff]/12 text-[#d8defe]',
    ring: 'from-[#8ea2ff]/16 via-transparent to-transparent',
  },
};

const rankTone = [
  'border-[#f0c979]/24 bg-[#f0c979]/12 text-[#f5ddb1]',
  'border-[#8ea2ff]/24 bg-[#8ea2ff]/12 text-[#d8defe]',
  'border-[#7de2d4]/24 bg-[#7de2d4]/12 text-[#a6f1e7]',
];

export default async function TrendingPage() {
  const tools = await getTrendingTools(20);
  const heroTools = tools.slice(0, 3);
  const totalStars = tools.reduce((sum, tool) => sum + (tool.metrics?.github?.stars ?? 0), 0);
  const averageHype =
    tools.length > 0
      ? Math.round(tools.reduce((sum, tool) => sum + tool.hype_score, 0) / tools.length)
      : 0;
  const explodingCount = tools.filter((tool) => tool.viral_coefficient >= 2).length;
  const visualGridTools = tools.filter((tool) => Boolean(tool.icon)).slice(0, 18);

  return (
    <div className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_top_left,rgba(240,154,121,0.18),transparent_36%),radial-gradient(circle_at_78%_12%,rgba(125,226,212,0.16),transparent_30%),radial-gradient(circle_at_48%_30%,rgba(142,162,255,0.1),transparent_38%)]" />

      <section className="relative border-b border-white/8">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-10 md:pb-20 md:pt-14">
          <nav className="flex items-center gap-2 text-sm text-text-muted">
            <Link href="/" className="inline-flex items-center gap-1 transition hover:text-text-primary">
              <Home className="h-4 w-4" />
              Home
            </Link>
            <span>/</span>
            <span className="text-text-primary">Trending</span>
          </nav>

          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_26rem]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-secondary backdrop-blur">
                <Flame className="h-4 w-4 text-accent-pink" />
                Trending board
                <span className="text-text-muted">Momentum refreshed hourly</span>
              </div>

              <h1 className="mt-6 font-display text-5xl leading-[1.04] tracking-tight text-text-primary md:text-6xl">
                Hype alone is not the signal.
                {' '}
                <span className="block text-gradient-cyber">Momentum plus fit is what matters.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-text-secondary md:text-lg">
                This board does not stop at discussion volume. It layers GitHub growth, viral lift, and product status so you can see which tools are actually moving, not just getting mentioned.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <MetricCard value={`${tools.length}`} label="Tracked movers" hint="Ranked by hype score, independent from homepage editorial picks." />
                <MetricCard value={`${averageHype}`} label="Average hype score" hint="Higher means stronger recent momentum." />
                <MetricCard value={formatCompactNumber(totalStars)} label="GitHub stars" hint="Counts visible repository data from tools on this board." />
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-text-muted">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/10 px-3 py-1.5">
                  <TrendingUp className="h-4 w-4 text-accent-yellow" />
                  {explodingCount} tools are above a 2.0 viral coefficient
                </span>
                <Link href="/tools" className="inline-flex items-center gap-2 text-text-secondary transition hover:text-text-primary">
                  Keep filtering in the full directory
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <aside className="rounded-[30px] border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Compass className="h-4 w-4 text-accent-cyan" />
                How to read this board
              </div>

              <div className="mt-5 space-y-3">
                {Object.entries(tierStyles).map(([tier, style]) => (
                  <div key={tier} className="rounded-[22px] border border-white/8 bg-black/10 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className={`rounded-full border px-2.5 py-1 text-xs ${style.badge}`}>{style.label}</span>
                      <span className="text-xs text-text-muted">{tier}</span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-text-secondary">
                      {getTierExplanation(tier)}
                    </p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {visualGridTools.length > 0 ? (
        <section className="relative border-t border-white/8">
          <div className="mx-auto max-w-7xl px-6 py-14">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-text-muted">Visual Radar</p>
                <h2 className="mt-2 text-3xl font-semibold text-text-primary">The icon-first radar mainstream users scan first</h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-text-secondary">
                  Many people recognize products by logo before they remember positioning. This matrix lowers the cost of the first click.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-secondary">
                <ImageIcon className="h-4 w-4 text-accent-cyan" />
                {visualGridTools.length} trending icons
              </span>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {visualGridTools.map((tool) => (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.id}`}
                  className="group rounded-[22px] border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:border-white/16 hover:bg-white/[0.07]"
                >
                  <ToolLogo
                    name={getToolPrimaryName(tool.name)}
                    icon={tool.icon}
                    size={38}
                    alt={`${getToolPrimaryName(tool.name)} logo`}
                    wrapperClassName="h-14 w-14 rounded-[18px] border border-white/10 bg-black/12"
                    imageClassName="h-10 w-10"
                    textClassName="text-xl text-accent-cyan"
                  />
                  <p className="mt-4 truncate text-sm font-semibold text-text-primary">
                    <LocalizedToolName name={tool.name} mode="surface" />
                  </p>
                  <p className="mt-1 text-xs text-text-muted">Hype {tool.hype_score.toFixed(0)}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {heroTools.length > 0 ? (
        <section className="relative">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-text-muted">Top 3</p>
                <h2 className="mt-2 text-3xl font-semibold text-text-primary">The three products worth checking first</h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-secondary">
                <Sparkles className="h-4 w-4 text-accent-yellow" />
                Icon coverage includes graceful fallback handling
              </div>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {heroTools.map((tool, index) => {
                const style = tierStyles[tool.tier] ?? tierStyles['💡 WATCH'];
                const detailHref = `/tools/${tool.id}`;
                const displayName = getToolPrimaryName(tool.name);

                return (
                  <article
                    key={tool.id}
                    className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/5 p-5"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${style.ring}`} />
                    <div className="relative flex h-full flex-col">
                      <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <ToolLogo
                            name={displayName}
                            icon={tool.icon}
                            size={34}
                            alt={`${displayName} logo`}
                            wrapperClassName="h-14 w-14 rounded-[22px] border border-white/10 bg-black/12"
                            imageClassName="h-9 w-9"
                            textClassName="text-xl text-accent-cyan"
                          />
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="truncate text-xl font-semibold text-text-primary">
                                <LocalizedToolName name={tool.name} mode="surface" />
                              </h3>
                              <span className={`rounded-full border px-2.5 py-1 text-xs ${style.badge}`}>
                                {style.label}
                              </span>
                            </div>
                            <p className="mt-2 text-sm text-text-muted">{getCategoryLabel(tool.category, tool.categorySlug ?? tool.category_slug)}</p>
                          </div>
                        </div>

                        <div className={`rounded-full border px-3 py-1 text-sm ${rankTone[index] ?? 'border-white/12 bg-white/5 text-text-secondary'}`}>
                          #{index + 1}
                        </div>
                      </div>

                      <p className="mt-5 text-sm leading-8 text-text-secondary">
                        {!hasCjk(tool.one_liner) && tool.one_liner ? tool.one_liner : getToolCardSummary(tool)}
                      </p>

                      <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        <StatPill label="Hype" value={`${tool.hype_score.toFixed(0)}`} />
                        <StatPill label="Viral" value={`${tool.viral_coefficient.toFixed(1)}x`} />
                        <StatPill
                          label="GitHub"
                          value={
                            tool.metrics?.github?.stars
                              ? formatCompactNumber(tool.metrics.github.stars)
                              : 'No public data'
                          }
                        />
                      </div>

                      {tool.install_methods?.length ? (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {tool.install_methods.slice(0, 3).map((item) => (
                            <span
                              key={item}
                              className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs text-text-secondary"
                            >
                              {getInstallMethodLabel(item)}
                            </span>
                          ))}
                        </div>
                      ) : null}

                      <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
                        <ToolPrimaryCta
                          tool={tool}
                          placement="trending_page_top_primary_cta"
                          affiliateLabel="Open partner link"
                          websiteLabel="Visit site"
                          className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
                        />
                        <Link
                          href={detailHref}
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
                        >
                          Open review
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <section className="relative border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-text-muted">Full Ranking</p>
              <h2 className="mt-2 text-3xl font-semibold text-text-primary">Full trending board</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-text-secondary">
              This section is built for side-by-side scanning. Hype, repo signal, and action buttons stay in one lane so comparison stays fast.
            </p>
          </div>

          {tools.length > 0 ? (
            <div className="mt-8 space-y-4">
              {tools.map((tool, index) => {
                const style = tierStyles[tool.tier] ?? tierStyles['💡 WATCH'];
                const detailHref = `/tools/${tool.id}`;
                const github = tool.metrics?.github;
                const displayName = getToolPrimaryName(tool.name);

                return (
                  <article
                    key={tool.id}
                    className="group rounded-[28px] border border-white/10 bg-white/5 p-5 transition hover:border-white/16 hover:bg-white/[0.07]"
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
                      <div className="flex items-start gap-4 lg:flex-[1.2]">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border text-sm font-semibold ${rankTone[index] ?? 'border-white/10 bg-white/5 text-text-secondary'}`}>
                          {`#${index + 1}`}
                        </div>

                        <ToolLogo
                          name={displayName}
                          icon={tool.icon}
                          size={30}
                          alt={`${displayName} logo`}
                          wrapperClassName="h-12 w-12 rounded-2xl border border-white/10 bg-black/12"
                          imageClassName="h-8 w-8"
                          textClassName="text-lg text-accent-cyan"
                        />

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <Link href={detailHref} className="transition hover:text-accent-cyan">
                              <h3 className="truncate text-lg font-semibold text-text-primary">
                                <LocalizedToolName name={tool.name} mode="surface" />
                              </h3>
                            </Link>
                            <span className={`rounded-full border px-2.5 py-1 text-xs ${style.badge}`}>
                              {style.label}
                            </span>
                            <span className="rounded-full border border-white/10 bg-black/10 px-2.5 py-1 text-xs text-text-muted">
                              {getCategoryLabel(tool.category, tool.categorySlug ?? tool.category_slug)}
                            </span>
                          </div>

                          <p className="mt-3 text-sm leading-7 text-text-secondary">
                            {!hasCjk(tool.one_liner) && tool.one_liner ? tool.one_liner : getToolCardSummary(tool)}
                          </p>

                          {tool.install_methods?.length ? (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {tool.install_methods.slice(0, 4).map((item) => (
                                <span
                                  key={item}
                                  className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs text-text-secondary"
                                >
                                  {getInstallMethodLabel(item)}
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2 lg:w-[20rem] lg:grid-cols-1">
                        <div className="rounded-[22px] border border-white/8 bg-black/10 px-4 py-4">
                          <div className="flex items-center justify-between gap-3 text-sm">
                            <span className="text-text-muted">Hype</span>
                            <span className="font-semibold text-text-primary">{tool.hype_score.toFixed(0)}</span>
                          </div>
                          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/8">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-accent-pink via-accent-yellow to-accent-cyan"
                              style={{ width: `${Math.min(tool.hype_score, 100)}%` }}
                            />
                          </div>
                          <p className="mt-3 text-xs text-text-muted">
                            Viral lift {tool.viral_coefficient.toFixed(1)}x
                          </p>
                        </div>

                        <div className="rounded-[22px] border border-white/8 bg-black/10 px-4 py-4">
                          <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
                            {github?.stars ? (
                              tool.repo_url ? (
                                <TrackedExternalLink
                                  href={tool.repo_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  trackingPayload={{
                                    placement: 'trending_page_repo_metric',
                                    toolId: tool.id,
                                    toolName: tool.name,
                                    targetUrl: tool.repo_url,
                                    isAffiliate: false,
                                  }}
                                  className="inline-flex items-center gap-1 transition hover:text-text-primary"
                                >
                                  <Github className="h-4 w-4 text-accent-cyan" />
                                  {formatCompactNumber(github.stars)}
                                </TrackedExternalLink>
                              ) : (
                                <span className="inline-flex items-center gap-1">
                                  <Github className="h-4 w-4 text-accent-cyan" />
                                  {formatCompactNumber(github.stars)}
                                </span>
                              )
                            ) : (
                              <span className="inline-flex items-center gap-1 text-text-muted">
                                <Github className="h-4 w-4" />
                                No public repo
                              </span>
                            )}

                            {github?.forks ? (
                              <span className="inline-flex items-center gap-1">
                                <GitFork className="h-4 w-4 text-accent-yellow" />
                                {formatCompactNumber(github.forks)}
                              </span>
                            ) : null}

                            {github?.stars_per_day ? (
                              <span className="text-accent-pink">+{github.stars_per_day.toFixed(0)}/day</span>
                            ) : null}
                          </div>

                          <div className="mt-4 flex flex-wrap items-center gap-3">
                            <ToolPrimaryCta
                              tool={tool}
                              placement="trending_page_primary_cta"
                              affiliateLabel="Open partner link"
                              websiteLabel="Visit site"
                              className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
                            />
                            <Link
                              href={detailHref}
                              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
                            >
                              Open review
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="mt-8 rounded-[30px] border border-white/10 bg-white/5 px-6 py-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-black/10">
                <TrendingUp className="h-7 w-7 text-accent-cyan" />
              </div>
              <p className="mt-5 text-lg font-semibold text-text-primary">No trending data is available yet</p>
              <p className="mt-2 text-sm text-text-secondary">Open the full directory first. We will backfill momentum data shortly.</p>
              <Link
                href="/tools"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-5 py-2.5 text-sm text-text-primary transition hover:bg-accent-cyan/18"
              >
                Browse the full directory
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
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

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[18px] border border-white/8 bg-black/10 px-3 py-3">
      <p className="text-xs text-text-muted">{label}</p>
      <p className="mt-1 text-sm font-semibold text-text-primary">{value}</p>
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

function getTierExplanation(tier: string) {
  switch (tier) {
    case '🔥 BREAKING':
      return 'Growth is accelerating fast and the discussion curve is steep. These are the tools worth checking immediately.';
    case '⚡ TRENDING':
      return 'Momentum is still climbing and the product has moved beyond “people just started mentioning it.”';
    case '🚀 NEW':
      return 'A newer arrival with early data forming. Good for early observation before the category settles.';
    default:
      return 'Not a short-term explosion, but a tool with steady visibility inside its niche.';
  }
}
