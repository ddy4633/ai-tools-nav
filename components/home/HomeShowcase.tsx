'use client';

import Link from 'next/link';
import { useMemo, useState, useTransition, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Compass,
  FolderOpenDot,
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
    summary: '适合做信息检索、深度问答和多轮协作。',
    cue: '从“提问质量”开始，而不是从模型名开始。',
    gradient: 'from-[#7de2d4]/24 via-transparent to-[#f0c979]/12',
    ring: 'shadow-[0_18px_50px_rgba(125,226,212,0.12)]',
  },
  code: {
    summary: '更适合高频编码、重构和自动生成多文件方案。',
    cue: '优先看上下文理解和执行闭环，而不只是补全速度。',
    gradient: 'from-[#8ea2ff]/22 via-transparent to-[#7de2d4]/10',
    ring: 'shadow-[0_18px_50px_rgba(142,162,255,0.12)]',
  },
  image: {
    summary: '聚焦出图质量、风格控制和商业可交付性。',
    cue: '先判断风格上限，再判断出图速度。',
    gradient: 'from-[#f09a79]/22 via-transparent to-[#f0c979]/10',
    ring: 'shadow-[0_18px_50px_rgba(240,154,121,0.12)]',
  },
  writing: {
    summary: '适合长文改写、知识整合和营销内容生产。',
    cue: '写作工具的关键是结构感，不只是会不会续写。',
    gradient: 'from-[#f0c979]/18 via-transparent to-[#7de2d4]/8',
    ring: 'shadow-[0_18px_50px_rgba(240,201,121,0.12)]',
  },
  productivity: {
    summary: '偏向自动整理、会议记录和工作流编排。',
    cue: '效率工具最值钱的是减少切换，而不是新增按钮。',
    gradient: 'from-[#7de2d4]/18 via-transparent to-[#8ea2ff]/10',
    ring: 'shadow-[0_18px_50px_rgba(125,226,212,0.1)]',
  },
  video: {
    summary: '重点看镜头一致性、节奏控制和生成成本。',
    cue: '视频类工具先看可重复性，再看惊艳程度。',
    gradient: 'from-[#f09a79]/20 via-transparent to-[#8ea2ff]/10',
    ring: 'shadow-[0_18px_50px_rgba(240,154,121,0.1)]',
  },
  audio: {
    summary: '覆盖配音、转录、音频增强和语音克隆。',
    cue: '声音类工具要看可用度，不只是“像不像”。',
    gradient: 'from-[#8ea2ff]/18 via-transparent to-[#f0c979]/10',
    ring: 'shadow-[0_18px_50px_rgba(142,162,255,0.1)]',
  },
  design: {
    summary: '更适合原型、视觉探索和设计提案加速。',
    cue: '好的设计工具应该帮你更快做判断，而不是制造更多选择。',
    gradient: 'from-[#7de2d4]/20 via-transparent to-[#f09a79]/10',
    ring: 'shadow-[0_18px_50px_rgba(125,226,212,0.1)]',
  },
  knowledge: {
    summary: '适合做知识沉淀、收藏管理和信息回顾。',
    cue: '知识类工具的护城河是可复用，而不是好不好看。',
    gradient: 'from-[#f0c979]/18 via-transparent to-[#8ea2ff]/8',
    ring: 'shadow-[0_18px_50px_rgba(240,201,121,0.1)]',
  },
  data: {
    summary: '适合表格分析、商业洞察和快速生成结论。',
    cue: '数据工具最关键的是解释能力，而不是图表样式。',
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
  const heroShowcaseTools = featuredTools.slice(0, 8);
  const spotlightFeatures =
    spotlightTool?.features?.slice(0, 3) ??
    spotlightTool?.alternatives?.slice(0, 3) ??
    [];
  const rankedCategories = [...categories]
    .sort((left, right) => right.popularity - left.popularity)
    .slice(0, 6);
  const curatedTools = featuredTools.slice(0, 6);
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
                <span>2026 策展版首页</span>
                <span className="text-text-muted">把“找工具”改成“做判断”</span>
              </div>

              <div className="mt-6 max-w-4xl">
                <h1 className="font-display text-5xl leading-[1.03] tracking-tight text-text-primary sm:text-6xl lg:text-7xl">
                  别再一页页试工具了。
                  <span className="block text-gradient-cyber">我们先替你筛一轮。</span>
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-text-secondary md:text-lg">
                  现在真正稀缺的不是 AI 工具，而是判断力。首页重构后，我们按“任务场景、热度变化、编辑观点”
                  三条线组织内容，让你更快找到能直接上手的产品。
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
                    placeholder="搜索工具、任务场景或产品名"
                    className="min-w-0 flex-1 bg-transparent text-base text-text-primary outline-none placeholder:text-text-muted"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-[22px] border border-accent-cyan/35 bg-accent-cyan/12 px-6 text-sm font-semibold text-text-primary transition hover:bg-accent-cyan/18 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <span>{isPending ? '正在跳转' : '开始筛选'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="text-sm text-text-muted">常见入口</span>
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
                <MetricCard value={`${toolCount}+`} label="已收录工具" hint="覆盖主流 AI 产品与长尾新秀" />
                <MetricCard value={`${categoryCount}`} label="任务分类" hint="从场景而不是功能名出发" />
                <MetricCard value={`${averageRating.toFixed(1)}`} label="平均编辑分" hint="保留主观判断，但写清原因" />
                <MetricCard value={`${sponsorCount}`} label="已披露合作位" hint="赞助位独立标识，不混入编辑推荐" />
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-3 text-sm">
                <Link
                  href="/tools"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-text-primary transition hover:border-accent-cyan/30 hover:bg-white/8"
                >
                  浏览全部工具
                  <MoveUpRight className="h-4 w-4 text-accent-cyan" />
                </Link>
                <Link
                  href="/trending"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-text-secondary transition hover:text-text-primary"
                >
                  查看本周热榜
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <span className="inline-flex items-center gap-2 text-text-muted">
                  <ShieldCheck className="h-4 w-4 text-accent-yellow" />
                  首页同时呈现编辑推荐与商业展示位
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
                        本周封面
                      </span>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-sm text-text-muted">
                        编辑分 {spotlightTool.editorRating?.toFixed(1) ?? '4.6'}
                      </span>
                    </div>

                    <div className="mt-6 flex items-start gap-4">
                      <ToolLogo
                        name={spotlightTool.name}
                        icon={spotlightTool.icon}
                        size={40}
                        alt={`${spotlightTool.name} logo`}
                        wrapperClassName="h-16 w-16 rounded-[22px] border border-white/10 bg-black/15"
                        imageClassName="h-10 w-10"
                        textClassName="text-2xl text-accent-cyan"
                      />
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-2xl font-semibold text-text-primary">{spotlightTool.name}</h2>
                          <span
                            className={`rounded-full border px-2.5 py-1 text-xs ${
                              pricingTone[spotlightTool.pricing_type || spotlightTool.pricingType || 'freemium']
                            }`}
                          >
                            {(spotlightTool.pricing_type || spotlightTool.pricingType || 'freemium').toUpperCase()}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-7 text-text-secondary">
                          {spotlightTool.reason || spotlightTool.description}
                        </p>
                      </div>
                    </div>

                    <blockquote className="mt-6 border-l border-accent-cyan/30 pl-4 text-base leading-8 text-text-primary/92">
                      “
                      {spotlightPick?.comment ||
                        '首页重构后，我们希望每张卡片都有明确判断，不只是列名字和功能。'}
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
                        affiliateLabel="合作链接"
                        websiteLabel="访问官网"
                        className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
                      />
                      <Link
                        href={`/tools/${spotlightTool.id}`}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
                      >
                        看完整评测
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>

                    {spotlightPick ? (
                      <div className="mt-6 border-t border-white/8 pt-4 text-sm text-text-muted">
                        主编观点来自 <span className="text-text-primary">{spotlightPick.editor.name}</span>
                        ，用于解释为什么这款工具值得上首页。
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
                    <p className="text-xs uppercase tracking-[0.24em] text-text-muted">热度雷达</p>
                    <h3 className="mt-2 text-xl font-semibold text-text-primary">今天大家最容易点进去的工具</h3>
                  </div>
                  <Link
                    href="/trending"
                    className="inline-flex items-center gap-1 text-sm text-text-secondary transition hover:text-text-primary"
                  >
                    全部热榜
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
                          <span className="truncate text-sm font-semibold text-text-primary">{tool.name}</span>
                          <span className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-text-muted">
                            {tool.category}
                          </span>
                        </div>
                        <p className="mt-1 truncate text-sm text-text-secondary">
                          {tool.one_liner || tool.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center justify-end gap-1 text-sm font-semibold text-accent-yellow">
                          <TrendingUp className="h-4 w-4" />
                          {tool.hype_score.toFixed(0)}
                        </div>
                        <div className="text-xs text-text-muted">
                          {tool.metrics?.github?.stars ? `${formatCompactNumber(tool.metrics.github.stars)} stars` : '热度上升中'}
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
                <p className="text-xs uppercase tracking-[0.24em] text-text-muted">常被搜索的入口</p>
                <p className="mt-2 text-sm text-text-secondary">我们把常用工具直接铺出来，首页第一屏就能形成判断。</p>
              </div>
              <Link href="/tools" className="text-sm text-text-secondary transition hover:text-text-primary">
                去工具库看全部
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
                    name={tool.name}
                    icon={tool.icon}
                    size={28}
                    alt={`${tool.name} logo`}
                    wrapperClassName="h-11 w-11 rounded-2xl border border-white/10 bg-white/5"
                    imageClassName="h-7 w-7"
                    textClassName="text-lg text-accent-cyan"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-text-primary">{tool.name}</p>
                    <p className="truncate text-xs text-text-muted">{tool.category}</p>
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
            eyebrow="按任务进入"
            title="不要从工具名开始，从你的工作场景开始。"
            description="同样是 AI 写作、AI 图像或 AI 编程，不同工具擅长的环节并不一样。新版首页先帮你缩小问题空间。"
            icon={<Compass className="h-5 w-5 text-accent-cyan" />}
          />

          <div className="mt-10 grid auto-rows-[minmax(220px,auto)] gap-4 md:grid-cols-12">
            {rankedCategories.map((category, index) => {
              const accent = categoryAccents[category.slug] ?? {
                summary: '按使用场景整理工具，降低选择成本。',
                cue: '先想清楚你要完成什么工作。',
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
                        <h3 className="mt-3 text-2xl font-semibold text-text-primary">{category.name}</h3>
                      </div>
                      <span className="rounded-full border border-white/12 bg-black/10 px-3 py-1 text-sm text-text-secondary">
                        {category.count} 款
                      </span>
                    </div>

                    <p className="mt-5 max-w-lg text-sm leading-7 text-text-secondary">{accent.summary}</p>

                    <div className="mt-6 flex items-center gap-3 text-sm text-text-muted">
                      <span>热度 {category.popularity}%</span>
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
                            {tool.name}
                          </span>
                        ))}
                      </div>
                      <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-text-primary">
                        进入这个分类
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
              eyebrow="编辑部速评"
              title="给判断配上理由，才配叫推荐。"
              description="这里保留编辑的主观判断，但每条观点都要落到具体场景、优点和适合人群上。"
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
                        name={pick.tool.name}
                        icon={pick.tool.icon}
                        size={30}
                        alt={`${pick.tool.name} logo`}
                        wrapperClassName="h-12 w-12 rounded-2xl border border-white/10 bg-white/5"
                        imageClassName="h-8 w-8"
                        textClassName="text-xl text-accent-cyan"
                      />
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-semibold text-text-primary">{pick.tool.name}</h3>
                          <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-text-muted">
                            第 {index + 2} 位编辑推荐
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-7 text-text-secondary">
                          {pick.tool.reason || pick.tool.description}
                        </p>
                        <p className="mt-4 text-base leading-8 text-text-primary/92">“{pick.comment}”</p>
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
                        读评测
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
              <p className="text-xs uppercase tracking-[0.24em] text-text-muted">首页原则</p>
              <h3 className="mt-3 text-2xl font-semibold text-text-primary">我们这次具体改了什么</h3>
              <div className="mt-6 space-y-4">
                <MethodItem title="先给路径，再给卡片" detail="首屏直接给搜索、热榜、主编封面和常用入口，避免用户一上来就被重复模块淹没。" />
                <MethodItem title="视觉从“模板感”改成“编辑感”" detail="减少同一种霓虹卡片反复堆叠，改成有主次、有留白、有封面感的结构。" />
                <MethodItem title="中文内容用中文叙事" detail="去掉大量英文终端腔，保留少量技术味标签，但整体变成更适合中文用户的阅读节奏。" />
              </div>
            </article>

            {sponsoredTools.length > 0 ? (
              <article className="rounded-[30px] border border-[#f0c979]/20 bg-[linear-gradient(180deg,rgba(240,201,121,0.12),rgba(255,255,255,0.02))] p-6">
                <div className="flex items-center gap-2 text-sm text-accent-yellow">
                  <ShieldCheck className="h-4 w-4" />
                  合作展示位
                </div>
                <p className="mt-3 text-base leading-8 text-text-secondary">
                  商业展示位会单独出现在这里，不混进编辑推荐。页面的“好看”不应该牺牲信任感。
                </p>
                <div className="mt-5 space-y-3">
                  {sponsoredTools.slice(0, 2).map((tool) => (
                    <div
                      key={tool.id}
                      className="rounded-[22px] border border-white/10 bg-black/12 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-text-primary">{tool.name}</p>
                          <p className="mt-1 text-sm leading-7 text-text-secondary">
                            {tool.reason || tool.description}
                          </p>
                        </div>
                        <ToolPrimaryCta
                          tool={tool}
                          placement="home_showcase_sponsored_primary_cta"
                          affiliateLabel="合作链接"
                          websiteLabel="访问官网"
                          className="inline-flex items-center gap-2 rounded-full border border-[#f0c979]/30 px-3 py-1.5 text-xs text-accent-yellow transition hover:bg-[#f0c979]/10"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ) : (
              <article className="rounded-[30px] border border-white/10 bg-black/10 p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-text-muted">透明性</p>
                <h3 className="mt-3 text-2xl font-semibold text-text-primary">推荐和广告，必须长得不一样</h3>
                <p className="mt-4 text-base leading-8 text-text-secondary">
                  如果未来首页出现商业合作位，我们会保持单独区域、单独文案和单独按钮样式，避免和编辑推荐混淆。
                </p>
              </article>
            )}
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeading
            eyebrow="值得先装"
            title="首页最后一层，才是工具卡片。"
            description="卡片还在，但不再是清一色模板。我们按“值得先试、为什么值得试、适合谁试”来组织每一张。"
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
                        name={tool.name}
                        icon={tool.icon}
                        size={32}
                        alt={`${tool.name} logo`}
                        wrapperClassName="h-14 w-14 rounded-[22px] border border-white/10 bg-black/12"
                        imageClassName="h-8 w-8"
                        textClassName="text-xl text-accent-cyan"
                      />
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="truncate text-xl font-semibold text-text-primary">{tool.name}</h3>
                          <span
                            className={`rounded-full border px-2.5 py-1 text-xs ${
                              pricingTone[tool.pricing_type || tool.pricingType || 'freemium']
                            }`}
                          >
                            {(tool.pricing_type || tool.pricingType || 'freemium').toUpperCase()}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-text-muted">{tool.category}</p>
                      </div>
                    </div>
                    <div className="rounded-full border border-white/10 px-3 py-1 text-sm text-text-muted">
                      {tool.editorRating?.toFixed(1) ?? '4.5'}
                    </div>
                  </div>

                  <p className={`mt-5 leading-8 text-text-secondary ${index === 0 ? 'text-base' : 'text-sm'}`}>
                    {tool.reason || tool.description}
                  </p>

                  {tool.features?.length ? (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {tool.features.slice(0, index === 0 ? 4 : 3).map((feature) => (
                        <span
                          key={feature}
                          className="rounded-full border border-white/10 bg-black/12 px-3 py-1 text-xs text-text-secondary"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {tool.pros?.length ? (
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {tool.pros.slice(0, 2).map((item) => (
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
                      affiliateLabel="合作链接"
                      websiteLabel="访问官网"
                      className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
                    />
                    <Link
                      href={`/tools/${tool.id}`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
                    >
                      查看详情
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
  if (value >= 10000) {
    return `${(value / 10000).toFixed(1)}w`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }
  return `${value}`;
}
