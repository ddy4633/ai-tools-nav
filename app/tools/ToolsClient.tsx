'use client';

import { Suspense, useDeferredValue, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, Sparkles } from 'lucide-react';
import { EnhancedSearch } from '@/components/enhanced-search';
import { ToolCardSkeletonGrid } from '@/components/ui/Skeleton';
import ToolLogo from '@/components/ui/ToolLogo';
import ToolPrimaryCta from '@/components/ui/ToolPrimaryCta';
import SponsorBadge from '@/components/ui/SponsorBadge';
import type { Category, Tool } from '@/types/tool';

interface ToolsClientProps {
  tools: Tool[];
  categories: Category[];
  initialSearch?: string;
  initialCategory?: string;
  initialPricing?: string;
}

const pricingLabels = {
  free: { text: '免费', className: 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/30' },
  paid: { text: '付费', className: 'bg-accent-pink/10 text-accent-pink border-accent-pink/30' },
  freemium: { text: '部分免费', className: 'bg-white/6 text-text-secondary border-white/12' },
};

function resolveInitialCategory(initialCategory: string | undefined, categories: Category[]) {
  if (!initialCategory || initialCategory === 'all') {
    return 'all';
  }

  const bySlug = categories.find((cat) => cat.slug === initialCategory);
  if (bySlug) {
    return bySlug.slug;
  }

  const byName = categories.find((cat) => cat.name === initialCategory);
  return byName ? byName.slug : 'all';
}

function resolveInitialPricing(initialPricing: string | undefined) {
  if (initialPricing === 'free' || initialPricing === 'paid' || initialPricing === 'freemium') {
    return initialPricing;
  }

  return 'all';
}

export default function ToolsClient({
  tools,
  categories,
  initialSearch = '',
  initialCategory,
  initialPricing,
}: ToolsClientProps) {
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>(() =>
    resolveInitialCategory(initialCategory, categories)
  );
  const [selectedPricing, setSelectedPricing] = useState<'all' | 'free' | 'paid' | 'freemium'>(() =>
    resolveInitialPricing(initialPricing)
  );
  const [visibleCount, setVisibleCount] = useState(24);
  const deferredSearch = useDeferredValue(search);

  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    setSelectedCategory(resolveInitialCategory(initialCategory, categories));
  }, [initialCategory, categories]);

  useEffect(() => {
    setSelectedPricing(resolveInitialPricing(initialPricing));
  }, [initialPricing]);

  useEffect(() => {
    setVisibleCount(24);
  }, [deferredSearch, selectedCategory, selectedPricing]);

  const featuredShortlist = useMemo(() => {
    return [...tools]
      .filter((tool) => tool.is_featured ?? tool.isFeatured)
      .sort((left, right) => (right.editorRating ?? 0) - (left.editorRating ?? 0))
      .slice(0, 3);
  }, [tools]);

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const query = deferredSearch.trim().toLowerCase();
      const matchesSearch =
        query === '' ||
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        (tool.reason ?? '').toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query);

      const toolCategory = tool.categorySlug ?? tool.category_slug ?? '';
      const matchesCategory = selectedCategory === 'all' || toolCategory === selectedCategory;

      const pricingType = tool.pricing_type ?? tool.pricingType;
      const matchesPricing = selectedPricing === 'all' || pricingType === selectedPricing;

      return matchesSearch && matchesCategory && matchesPricing;
    });
  }, [tools, deferredSearch, selectedCategory, selectedPricing]);

  const visibleTools = filteredTools.slice(0, visibleCount);
  const hasMore = filteredTools.length > visibleCount;
  const freeCount = filteredTools.filter((tool) => (tool.pricing_type ?? tool.pricingType) === 'free').length;

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.22)] backdrop-blur">
          <div className="mb-6">
            <EnhancedSearch tools={tools} onSearch={setSearch} currentQuery={search} />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-text-muted">分类筛选</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <FilterButton
                  active={selectedCategory === 'all'}
                  label="全部"
                  onClick={() => setSelectedCategory('all')}
                />
                {categories.map((category) => (
                  <FilterButton
                    key={category.id}
                    active={selectedCategory === category.slug}
                    label={category.name}
                    onClick={() => setSelectedCategory(category.slug)}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-text-muted">价格筛选</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(['all', 'free', 'paid', 'freemium'] as const).map((type) => (
                  <FilterButton
                    key={type}
                    active={selectedPricing === type}
                    label={type === 'all' ? '全部' : pricingLabels[type].text}
                    onClick={() => setSelectedPricing(type)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <aside className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Sparkles className="h-4 w-4 text-accent-yellow" />
            商业化入口
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-text-primary">如果你是 AI 产品团队</h2>
          <p className="mt-3 text-sm leading-7 text-text-secondary">
            这个页面本身就是高意图流量池。除了免费收录，我们也支持加急评估、分类置顶、首页赞助和专题合作。
          </p>
          <div className="mt-5 space-y-3">
            {[
              '免费收录适合入库和基础曝光',
              '加急评估适合发布周和投放窗口',
              '分类置顶更适合明确垂直需求的客群',
            ].map((item) => (
              <div key={item} className="rounded-[22px] border border-white/8 bg-black/10 px-4 py-3 text-sm text-text-secondary">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
            >
              申请收录
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/advertise"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
            >
              查看合作位
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </aside>
      </div>

      <section className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-text-muted">Editor Shortcut</p>
            <h2 className="mt-2 text-2xl font-semibold text-text-primary">先看这 3 个，能更快进入状态</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-text-secondary">
              我把最适合第一次筛选的三个入口放在前面。它们不一定是最热门，但更容易让你快速判断“这条路值不值得继续走”。
            </p>
          </div>
          <div className="rounded-full border border-white/10 bg-black/10 px-4 py-2 text-sm text-text-secondary">
            当前结果中免费工具 {freeCount} 个
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {featuredShortlist.map((tool) => (
            <article
              key={tool.id}
              className="rounded-[26px] border border-white/10 bg-black/10 p-5 transition hover:border-white/16"
            >
              <div className="flex items-start gap-4">
                <ToolLogo
                  name={tool.name}
                  icon={tool.icon}
                  size={32}
                  alt={`${tool.name} logo`}
                  wrapperClassName="h-14 w-14 rounded-[20px] border border-white/10 bg-bg-secondary"
                  imageClassName="h-8 w-8"
                  textClassName="text-xl text-accent-cyan"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate text-lg font-semibold text-text-primary">{tool.name}</h3>
                    <span
                      className={`rounded-full border px-2.5 py-1 text-xs ${
                        pricingLabels[tool.pricing_type ?? tool.pricingType ?? 'freemium'].className
                      }`}
                    >
                      {pricingLabels[tool.pricing_type ?? tool.pricingType ?? 'freemium'].text}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-text-muted">{tool.category}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-text-secondary">{tool.reason || tool.description}</p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <ToolPrimaryCta
                  tool={tool}
                  placement="tools_page_featured_shortcut_cta"
                  affiliateLabel="合作链接"
                  websiteLabel="访问官网"
                  className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
                />
                <Link
                  href={`/tools/${tool.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
                >
                  看详情
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-text-muted">Filtered Result</p>
          <h2 className="mt-2 text-2xl font-semibold text-text-primary">
            找到 {filteredTools.length} 个可继续判断的工具
          </h2>
          <p className="mt-2 text-sm leading-7 text-text-secondary">
            {(deferredSearch || selectedCategory !== 'all' || selectedPricing !== 'all')
              ? '当前结果已经经过关键词、分类或价格收敛，适合逐个点详情页继续对比。'
              : '下面是完整工具库。建议先搜索任务，再点详情页查看推荐理由与替代方案。'}
          </p>
        </div>
        {(search || selectedCategory !== 'all' || selectedPricing !== 'all') && (
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('all');
              setSelectedPricing('all');
            }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
          >
            清除所有筛选
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>

      <Suspense fallback={<ToolCardSkeletonGrid count={9} />}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </Suspense>

      {filteredTools.length === 0 && (
        <div className="rounded-[32px] border border-white/10 bg-white/5 px-6 py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-black/10">
            <Search className="h-8 w-8 text-text-muted" />
          </div>
          <p className="mt-5 text-lg font-semibold text-text-primary">没有找到匹配的工具</p>
          <p className="mt-2 text-sm text-text-muted">试试更具体的任务词，或者先清除筛选条件。</p>
        </div>
      )}

      {hasMore ? (
        <div className="flex justify-center">
          <button
            onClick={() => setVisibleCount((count) => count + 24)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-text-primary transition hover:border-white/16 hover:bg-white/8"
          >
            继续加载更多工具
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      ) : null}
    </div>
  );
}

function FilterButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-sm transition ${
        active
          ? 'border-accent-cyan/35 bg-accent-cyan/12 text-text-primary'
          : 'border-white/10 bg-black/10 text-text-secondary hover:border-white/16 hover:text-text-primary'
      }`}
    >
      {label}
    </button>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  const pricingType = tool.pricing_type ?? tool.pricingType ?? 'freemium';
  const pricing = pricingLabels[pricingType] ?? pricingLabels.freemium;
  const detailHref = `/tools/${tool.id}`;

  return (
    <article className="group rounded-[28px] border border-white/10 bg-white/5 p-5 transition hover:border-white/16 hover:bg-white/[0.07]">
      <div className="flex items-start gap-4">
        <ToolLogo
          name={tool.name}
          icon={tool.icon}
          size={32}
          alt={`${tool.name} logo`}
          wrapperClassName="h-14 w-14 rounded-[20px] border border-white/10 bg-black/10"
          imageClassName="h-8 w-8"
          textClassName="text-xl text-accent-cyan"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Link href={detailHref} className="transition hover:text-accent-cyan">
              <h3 className="truncate text-lg font-semibold text-text-primary">{tool.name}</h3>
            </Link>
            <span className={`rounded-full border px-2.5 py-1 text-xs ${pricing.className}`}>
              {pricing.text}
            </span>
            <SponsorBadge tool={tool} />
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-text-muted">
            <span className="rounded-full border border-white/10 bg-black/10 px-2.5 py-1">{tool.category}</span>
            {tool.editorRating ? <span>编辑分 {tool.editorRating.toFixed(1)}</span> : null}
            {tool.priceRange ? <span>{tool.priceRange}</span> : null}
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-text-secondary">{tool.reason || tool.description}</p>

      {tool.alternatives?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {tool.alternatives.slice(0, 3).map((alternative) => (
            <span
              key={alternative}
              className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs text-text-secondary"
            >
              可替代 {alternative}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <ToolPrimaryCta
          tool={tool}
          placement="tools_list_card_primary_cta"
          affiliateLabel="合作链接"
          websiteLabel="访问官网"
          className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
        />
        <Link
          href={detailHref}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
        >
          详情与替代方案
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
