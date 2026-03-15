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
import { getTrendingTools } from '@/lib/supabase';

export const metadata: Metadata = {
  title: '热门 AI工具排行 - 最受欢迎的人工智能工具 | AI工具导航',
  description: '发现最受欢迎的AI工具排行，基于热度、用户评价、社区活跃度等多维度数据，推荐最热门的AI工具。',
  keywords: ['热门AI工具', 'AI工具排行', '最受欢迎AI工具', 'AI工具推荐', '热门人工智能'],
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
    label: '爆发期',
    badge: 'border-[#f09a79]/30 bg-[#f09a79]/12 text-[#ffd4c1]',
    ring: 'from-[#f09a79]/18 via-transparent to-transparent',
  },
  '⚡ TRENDING': {
    label: '热度上升',
    badge: 'border-[#f0c979]/30 bg-[#f0c979]/12 text-[#f5ddb1]',
    ring: 'from-[#f0c979]/16 via-transparent to-transparent',
  },
  '🚀 NEW': {
    label: '新品观察',
    badge: 'border-[#7de2d4]/30 bg-[#7de2d4]/12 text-[#a6f1e7]',
    ring: 'from-[#7de2d4]/16 via-transparent to-transparent',
  },
  '💡 WATCH': {
    label: '持续观察',
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
              首页
            </Link>
            <span>/</span>
            <span className="text-text-primary">热门榜单</span>
          </nav>

          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_26rem]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-secondary backdrop-blur">
                <Flame className="h-4 w-4 text-accent-pink" />
                热门榜单
                <span className="text-text-muted">每小时刷新热度</span>
              </div>

              <h1 className="mt-6 font-display text-5xl leading-[1.04] tracking-tight text-text-primary md:text-6xl">
                热门工具不是
                <span className="block text-gradient-cyber">名字越响越值得用。</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-text-secondary md:text-lg">
                这里不只看讨论量，还把 GitHub 增长、传播系数和产品状态放在一起。你看到的不只是“大家在聊什么”，也是“哪些工具真的在往前冲”。
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <MetricCard value={`${tools.length}`} label="当前入榜工具" hint="按热度分数排序，不混入首页普通推荐。" />
                <MetricCard value={`${averageHype}`} label="平均热度分" hint="越高代表近期增长越明显。" />
                <MetricCard value={formatCompactNumber(totalStars)} label="GitHub 总 Stars" hint="只统计榜单内可获取的仓库数据。" />
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-text-muted">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/10 px-3 py-1.5">
                  <TrendingUp className="h-4 w-4 text-accent-yellow" />
                  {explodingCount} 款工具传播系数超过 2.0
                </span>
                <Link href="/tools" className="inline-flex items-center gap-2 text-text-secondary transition hover:text-text-primary">
                  去完整工具库继续筛选
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <aside className="rounded-[30px] border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Compass className="h-4 w-4 text-accent-cyan" />
                榜单怎么看
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
                <h2 className="mt-2 text-3xl font-semibold text-text-primary">大众用户最先看的图像热度图</h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-text-secondary">
                  不少用户先凭图标识别工具，再决定是否点开详情。这一块直接把热榜工具做成图像矩阵，降低认知门槛。
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-secondary">
                <ImageIcon className="h-4 w-4 text-accent-cyan" />
                {visualGridTools.length} 个热榜图标
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
                    name={tool.name}
                    icon={tool.icon}
                    size={38}
                    alt={`${tool.name} logo`}
                    wrapperClassName="h-14 w-14 rounded-[18px] border border-white/10 bg-black/12"
                    imageClassName="h-10 w-10"
                    textClassName="text-xl text-accent-cyan"
                  />
                  <p className="mt-4 truncate text-sm font-semibold text-text-primary">{tool.name}</p>
                  <p className="mt-1 text-xs text-text-muted">热度分 {tool.hype_score.toFixed(0)}</p>
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
                <h2 className="mt-2 text-3xl font-semibold text-text-primary">本轮最值得先看的三款</h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-secondary">
                <Sparkles className="h-4 w-4 text-accent-yellow" />
                图标已补齐，支持缺图自动回退
              </div>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {heroTools.map((tool, index) => {
                const style = tierStyles[tool.tier] ?? tierStyles['💡 WATCH'];
                const detailHref = `/tools/${tool.id}`;

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
                            name={tool.name}
                            icon={tool.icon}
                            size={34}
                            alt={`${tool.name} logo`}
                            wrapperClassName="h-14 w-14 rounded-[22px] border border-white/10 bg-black/12"
                            imageClassName="h-9 w-9"
                            textClassName="text-xl text-accent-cyan"
                          />
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="truncate text-xl font-semibold text-text-primary">{tool.name}</h3>
                              <span className={`rounded-full border px-2.5 py-1 text-xs ${style.badge}`}>
                                {style.label}
                              </span>
                            </div>
                            <p className="mt-2 text-sm text-text-muted">{tool.category}</p>
                          </div>
                        </div>

                        <div className={`rounded-full border px-3 py-1 text-sm ${rankTone[index] ?? 'border-white/12 bg-white/5 text-text-secondary'}`}>
                          #{index + 1}
                        </div>
                      </div>

                      <p className="mt-5 text-sm leading-8 text-text-secondary">
                        {tool.one_liner || tool.description}
                      </p>

                      <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        <StatPill label="热度分" value={`${tool.hype_score.toFixed(0)}`} />
                        <StatPill label="传播系数" value={`${tool.viral_coefficient.toFixed(1)}x`} />
                        <StatPill
                          label="GitHub"
                          value={
                            tool.metrics?.github?.stars
                              ? formatCompactNumber(tool.metrics.github.stars)
                              : '无公开数据'
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
                              {item}
                            </span>
                          ))}
                        </div>
                      ) : null}

                      <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
                        <ToolPrimaryCta
                          tool={tool}
                          placement="trending_page_top_primary_cta"
                          affiliateLabel="合作链接"
                          websiteLabel="访问官网"
                          className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
                        />
                        <Link
                          href={detailHref}
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
                        >
                          查看详情
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
              <h2 className="mt-2 text-3xl font-semibold text-text-primary">完整热门榜单</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-text-secondary">
              下面这部分更适合做横向比较，所以我把图标、热度、仓库表现和行动按钮放在同一行，避免你来回跳页面找信息。
            </p>
          </div>

          {tools.length > 0 ? (
            <div className="mt-8 space-y-4">
              {tools.map((tool, index) => {
                const style = tierStyles[tool.tier] ?? tierStyles['💡 WATCH'];
                const detailHref = `/tools/${tool.id}`;
                const github = tool.metrics?.github;

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
                          name={tool.name}
                          icon={tool.icon}
                          size={30}
                          alt={`${tool.name} logo`}
                          wrapperClassName="h-12 w-12 rounded-2xl border border-white/10 bg-black/12"
                          imageClassName="h-8 w-8"
                          textClassName="text-lg text-accent-cyan"
                        />

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <Link href={detailHref} className="transition hover:text-accent-cyan">
                              <h3 className="truncate text-lg font-semibold text-text-primary">{tool.name}</h3>
                            </Link>
                            <span className={`rounded-full border px-2.5 py-1 text-xs ${style.badge}`}>
                              {style.label}
                            </span>
                            <span className="rounded-full border border-white/10 bg-black/10 px-2.5 py-1 text-xs text-text-muted">
                              {tool.category}
                            </span>
                          </div>

                          <p className="mt-3 text-sm leading-7 text-text-secondary">
                            {tool.one_liner || tool.description}
                          </p>

                          {tool.install_methods?.length ? (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {tool.install_methods.slice(0, 4).map((item) => (
                                <span
                                  key={item}
                                  className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs text-text-secondary"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2 lg:w-[20rem] lg:grid-cols-1">
                        <div className="rounded-[22px] border border-white/8 bg-black/10 px-4 py-4">
                          <div className="flex items-center justify-between gap-3 text-sm">
                            <span className="text-text-muted">热度分</span>
                            <span className="font-semibold text-text-primary">{tool.hype_score.toFixed(0)}</span>
                          </div>
                          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/8">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-accent-pink via-accent-yellow to-accent-cyan"
                              style={{ width: `${Math.min(tool.hype_score, 100)}%` }}
                            />
                          </div>
                          <p className="mt-3 text-xs text-text-muted">
                            传播系数 {tool.viral_coefficient.toFixed(1)}x
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
                                无公开仓库
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
                              affiliateLabel="合作链接"
                              websiteLabel="访问官网"
                              className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
                            />
                            <Link
                              href={detailHref}
                              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
                            >
                              查看详情
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
              <p className="mt-5 text-lg font-semibold text-text-primary">暂时还没有热榜数据</p>
              <p className="mt-2 text-sm text-text-secondary">你可以先去完整工具库继续浏览，我们稍后会补齐热度数据。</p>
              <Link
                href="/tools"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-5 py-2.5 text-sm text-text-primary transition hover:bg-accent-cyan/18"
              >
                浏览全部工具
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
  if (value >= 10000) {
    return `${(value / 10000).toFixed(1)}w`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }
  return `${value}`;
}

function getTierExplanation(tier: string) {
  switch (tier) {
    case '🔥 BREAKING':
      return '最近增长很猛，讨论度和传播速度都处在高位，适合第一时间关注。';
    case '⚡ TRENDING':
      return '整体热度持续上升，已经跨过“只是有人提起”的阶段。';
    case '🚀 NEW':
      return '属于新进入视野的产品，数据还在形成，适合提前观察。';
    default:
      return '不是短期爆发，但在某个领域里保持稳定可见度。';
  }
}
