'use client';

import { Suspense, useDeferredValue, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, Sparkles } from 'lucide-react';
import { EnhancedSearch } from '@/components/enhanced-search';
import LocalizedToolName from '@/components/ui/LocalizedToolName';
import { ToolCardSkeletonGrid } from '@/components/ui/Skeleton';
import ToolLogo from '@/components/ui/ToolLogo';
import ToolPrimaryCta from '@/components/ui/ToolPrimaryCta';
import SponsorBadge from '@/components/ui/SponsorBadge';
import type { Category, Tool } from '@/types/tool';
import { getCategoryLabel, getPricingLabel, getToolCardSummary, getToolDisplayName, getToolPricingNote, getToolPrimaryName } from '@/lib/tool-display';
import { rankFeaturedTools } from '@/lib/tool-ranking';

interface ToolsClientProps {
  tools: Tool[];
  categories: Category[];
  initialSearch?: string;
  initialCategory?: string;
  initialPricing?: string;
}

const pricingLabels = {
  free: { text: 'Free', className: 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/30' },
  paid: { text: 'Paid', className: 'bg-accent-pink/10 text-accent-pink border-accent-pink/30' },
  freemium: { text: 'Freemium', className: 'bg-white/6 text-text-secondary border-white/12' },
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

  const featuredShortlist = useMemo(() => rankFeaturedTools(tools, 3), [tools]);

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const query = deferredSearch.trim().toLowerCase();
      const matchesSearch =
        query === '' ||
        getToolDisplayName(tool.name).toLowerCase().includes(query) ||
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
              <p className="text-sm uppercase tracking-[0.24em] text-text-muted">Category filter</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <FilterButton
                  active={selectedCategory === 'all'}
                  label="All"
                  onClick={() => setSelectedCategory('all')}
                />
                {categories.map((category) => (
                  <FilterButton
                    key={category.id}
                    active={selectedCategory === category.slug}
                    label={getCategoryLabel(category.name, category.slug)}
                    onClick={() => setSelectedCategory(category.slug)}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-text-muted">Pricing filter</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(['all', 'free', 'paid', 'freemium'] as const).map((type) => (
                  <FilterButton
                    key={type}
                    active={selectedPricing === type}
                    label={type === 'all' ? 'All' : pricingLabels[type].text}
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
            Growth entry
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-text-primary">If you run an AI product team</h2>
          <p className="mt-3 text-sm leading-7 text-text-secondary">
            This page already attracts tool-discovery intent. Beyond free listing, we support priority review, category sponsorship, homepage placement, and editorial campaigns.
          </p>
          <div className="mt-5 space-y-3">
            {[
              'Free listing fits baseline discovery and indexing',
              'Priority review fits launch weeks and campaign windows',
              'Category placement fits teams buying clear vertical intent',
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
              Submit your product
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/advertise"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
            >
              View paid placements
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </aside>
      </div>

      <section className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-text-muted">Editor Shortcut</p>
            <h2 className="mt-2 text-2xl font-semibold text-text-primary">Start with these 3 for a faster first pass</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-text-secondary">
              These are not always the loudest names. They are the easiest entry points when you want to decide whether a workflow is worth exploring further.
            </p>
          </div>
          <div className="rounded-full border border-white/10 bg-black/10 px-4 py-2 text-sm text-text-secondary">
            {freeCount} free tools in this result set
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
                  name={getToolPrimaryName(tool.name)}
                  icon={tool.icon}
                  size={32}
                  alt={`${getToolPrimaryName(tool.name)} logo`}
                  wrapperClassName="h-14 w-14 rounded-[20px] border border-white/10 bg-bg-secondary"
                  imageClassName="h-8 w-8"
                  textClassName="text-xl text-accent-cyan"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate text-lg font-semibold text-text-primary">
                      <LocalizedToolName name={tool.name} mode="surface" />
                    </h3>
                    <span
                      className={`rounded-full border px-2.5 py-1 text-xs ${
                        pricingLabels[tool.pricing_type ?? tool.pricingType ?? 'freemium'].className
                      }`}
                    >
                      {pricingLabels[tool.pricing_type ?? tool.pricingType ?? 'freemium'].text}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-text-muted">{getCategoryLabel(tool.category, tool.categorySlug ?? tool.category_slug)}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-text-secondary">{getToolCardSummary(tool)}</p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <ToolPrimaryCta
                  tool={tool}
                  placement="tools_page_featured_shortcut_cta"
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
            </article>
          ))}
        </div>
      </section>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-text-muted">Filtered Result</p>
          <h2 className="mt-2 text-2xl font-semibold text-text-primary">
            {filteredTools.length} tools ready for the next decision
          </h2>
          <p className="mt-2 text-sm leading-7 text-text-secondary">
            {(deferredSearch || selectedCategory !== 'all' || selectedPricing !== 'all')
              ? 'The list is already narrowed by query, category, or pricing. Now it makes sense to compare product pages one by one.'
              : 'This is the full directory. Search the job first, then open reviews to compare fit, pricing, and alternatives.'}
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
            Clear all filters
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
          <p className="mt-5 text-lg font-semibold text-text-primary">No tools matched this filter set</p>
          <p className="mt-2 text-sm text-text-muted">Try a more specific workflow term, or clear the filters and widen the search.</p>
        </div>
      )}

      {hasMore ? (
        <div className="flex justify-center">
          <button
            onClick={() => setVisibleCount((count) => count + 24)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-text-primary transition hover:border-white/16 hover:bg-white/8"
          >
            Load more tools
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
  const displayName = getToolPrimaryName(tool.name);
  const displayAlternatives = tool.alternatives?.slice(0, 3).map((alternative) => getToolPrimaryName(alternative)) ?? [];

  return (
    <article className="group rounded-[28px] border border-white/10 bg-white/5 p-5 transition hover:border-white/16 hover:bg-white/[0.07]">
      <div className="flex items-start gap-4">
        <ToolLogo
          name={displayName}
          icon={tool.icon}
          size={32}
          alt={`${displayName} logo`}
          wrapperClassName="h-14 w-14 rounded-[20px] border border-white/10 bg-black/10"
          imageClassName="h-8 w-8"
          textClassName="text-xl text-accent-cyan"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Link href={detailHref} className="transition hover:text-accent-cyan">
              <h3 className="truncate text-lg font-semibold text-text-primary">
                <LocalizedToolName name={tool.name} mode="surface" />
              </h3>
            </Link>
            <span className={`rounded-full border px-2.5 py-1 text-xs ${pricing.className}`}>
              {getPricingLabel(tool.pricing_type ?? tool.pricingType)}
            </span>
            <SponsorBadge tool={tool} />
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-text-muted">
            <span className="rounded-full border border-white/10 bg-black/10 px-2.5 py-1">{getCategoryLabel(tool.category, tool.categorySlug ?? tool.category_slug)}</span>
            {tool.editorRating ? <span>Editor score {tool.editorRating.toFixed(1)}</span> : null}
            <span>{getToolPricingNote(tool)}</span>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-text-secondary">{getToolCardSummary(tool)}</p>

      {displayAlternatives.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {displayAlternatives.map((alternative) => (
            <span
              key={alternative}
              className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs text-text-secondary"
            >
              Alternative: <LocalizedToolName name={alternative} mode="surface" />
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <ToolPrimaryCta
          tool={tool}
          placement="tools_list_card_primary_cta"
          affiliateLabel="Open partner link"
          websiteLabel="Visit site"
          className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
        />
        <Link
          href={detailHref}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
        >
          Review and alternatives
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
