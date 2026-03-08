'use client';

import { useState, useMemo, Suspense, useEffect } from 'react';
import Link from 'next/link';
import ToolLogo from '@/components/ui/ToolLogo';
import { Search, ArrowRight } from 'lucide-react';
import { EnhancedSearch } from '@/components/enhanced-search';
import { ToolCardSkeletonGrid } from '@/components/ui/Skeleton';
import ToolPrimaryCta from '@/components/ui/ToolPrimaryCta';
import SponsorBadge from '@/components/ui/SponsorBadge';
import type { Tool, Category } from '@/types/tool';

interface ToolsClientProps {
  tools: Tool[];
  categories: Category[];
  initialSearch?: string;
  initialCategory?: string;
  initialPricing?: string;
}

const pricingLabels = {
  free: { text: '免费', className: 'bg-accent-cyan/10 text-accent-cyan' },
  paid: { text: '付费', className: 'bg-accent-pink/10 text-accent-pink' },
  freemium: { text: '部分免费', className: 'bg-text-muted/10 text-text-muted' },
};

function resolveInitialCategory(initialCategory: string | undefined, categories: Category[]) {
  if (!initialCategory || initialCategory === 'all') return 'all';
  const bySlug = categories.find((cat) => cat.slug === initialCategory);
  return bySlug ? bySlug.name : initialCategory;
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

  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    setSelectedCategory(resolveInitialCategory(initialCategory, categories));
  }, [initialCategory, categories]);

  useEffect(() => {
    setSelectedPricing(resolveInitialPricing(initialPricing));
  }, [initialPricing]);

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch =
        search === '' ||
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' ||
        tool.category === selectedCategory ||
        tool.categorySlug === selectedCategory ||
        tool.category_slug === selectedCategory;

      const matchesPricing =
        selectedPricing === 'all' ||
        tool.pricing_type === selectedPricing ||
        tool.pricingType === selectedPricing;

      return matchesSearch && matchesCategory && matchesPricing;
    });
  }, [tools, search, selectedCategory, selectedPricing]);

  return (
    <>
      <div className="bg-bg-card rounded-xl p-6 shadow-card border border-border-card mb-8">
        <div className="mb-6">
          <EnhancedSearch
            tools={tools}
            onSearch={setSearch}
            currentQuery={search}
          />
        </div>

        <div className="mb-4">
          <p className="text-sm font-mono text-text-muted mb-2">{'// 分类'}</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 text-sm font-mono rounded-lg transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/50'
                  : 'bg-bg-secondary text-text-secondary border border-border-subtle hover:border-accent-cyan/30 hover:text-accent-cyan'
              }`}
            >
              全部
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-3 py-1.5 text-sm font-mono rounded-lg transition-all duration-300 ${
                  selectedCategory === cat.name
                    ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/50'
                    : 'bg-bg-secondary text-text-secondary border border-border-subtle hover:border-accent-cyan/30 hover:text-accent-cyan'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-mono text-text-muted mb-2">{'// 定价'}</p>
          <div className="flex gap-2">
            {(['all', 'free', 'paid', 'freemium'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedPricing(type)}
                className={`px-3 py-1.5 text-sm font-mono rounded-lg transition-all duration-300 ${
                  selectedPricing === type
                    ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/50'
                    : 'bg-bg-secondary text-text-secondary border border-border-subtle hover:border-accent-cyan/30 hover:text-accent-cyan'
                }`}
              >
                {type === 'all' ? '全部' : pricingLabels[type].text}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <p className="text-text-secondary font-mono">
          {'// 共 '}<span className="text-accent-cyan">{filteredTools.length}</span>{' 个工具'}
        </p>
        {(search || selectedCategory !== 'all' || selectedPricing !== 'all') && (
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('all');
              setSelectedPricing('all');
            }}
            className="text-sm font-mono text-accent-cyan hover:opacity-80 transition-opacity"
          >
            [清除筛选]
          </button>
        )}
      </div>

      <Suspense fallback={<ToolCardSkeletonGrid count={9} />}>
        <ToolsGrid tools={filteredTools} />
      </Suspense>

      {filteredTools.length === 0 && (
        <div className="text-center py-16 bg-bg-card rounded-xl border border-border-card">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-bg-secondary flex items-center justify-center border border-border-subtle">
            <Search className="w-8 h-8 text-text-muted" />
          </div>
          <p className="text-text-primary text-lg font-mono mb-2">没有找到匹配的工具</p>
          <p className="text-text-muted text-sm font-mono mb-6">试试其他关键词，或清除筛选条件</p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('all');
              setSelectedPricing('all');
            }}
            className="px-6 py-2 bg-accent-cyan/10 border border-accent-cyan/50 text-accent-cyan font-mono rounded-lg hover:bg-accent-cyan/20 transition-colors"
          >
            清除所有筛选
          </button>
        </div>
      )}
    </>
  );
}

function ToolsGrid({ tools }: { tools: Tool[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  const pricingType = tool.pricing_type ?? tool.pricingType ?? 'freemium';
  const pricing = pricingLabels[pricingType] || pricingLabels.freemium;
  const detailHref = `/tools/${tool.id}`;

  return (
    <article className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-cyan/30 via-accent-purple/30 to-accent-pink/30 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl blur-sm group-hover:blur-md" />
      <div className="absolute -inset-px bg-gradient-to-r from-accent-cyan/20 via-accent-purple/20 to-accent-pink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />

      <div className="relative bg-bg-card rounded-xl p-6 border border-border-card group-hover:border-accent-cyan/40 transition-all duration-300 h-full group-hover:shadow-[0_0_30px_rgba(0,245,212,0.15)] flex flex-col">
        <Link href={detailHref} className="block flex-1">
          <div className="flex items-start gap-4 mb-4">
            <ToolLogo
              name={tool.name}
              icon={tool.icon}
              size={32}
              alt={`${tool.name} logo`}
              wrapperClassName="w-12 h-12 rounded-lg bg-bg-secondary border border-border-subtle flex-shrink-0 group-hover:border-accent-cyan/50 group-hover:shadow-glow-cyan transition-all duration-300 group-hover:scale-105"
              imageClassName="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
              textClassName="text-xl text-accent-cyan group-hover:text-accent-pink transition-colors"
            />

            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-mono font-bold text-text-primary group-hover:text-accent-cyan transition-colors duration-300 truncate">
                {tool.name}
              </h3>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className={`inline-block px-2 py-0.5 text-xs font-mono rounded border transition-all duration-300 group-hover:shadow-[0_0_10px_rgba(0,245,212,0.2)] ${pricing.className}`}>
                  {pricing.text}
                </span>
                <SponsorBadge tool={tool} />
              </div>
            </div>
          </div>

          <p className="text-text-secondary text-sm leading-relaxed mb-4 font-mono line-clamp-2 group-hover:text-text-primary transition-colors duration-300">
            {tool.reason || tool.description}
          </p>
        </Link>

        <div className="mt-auto pt-4 border-t border-border-subtle group-hover:border-accent-cyan/20 transition-colors duration-300 flex items-center justify-between gap-3">
          <span className="text-xs font-mono text-text-muted group-hover:text-text-secondary transition-colors duration-300">
            {`// ${tool.category}`}
          </span>
          <div className="flex items-center gap-2">
            <ToolPrimaryCta
              tool={tool}
              placement="tools_list_card_primary_cta"
              affiliateLabel="合作链接"
              websiteLabel="官网"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded-lg border border-accent-cyan/40 text-accent-cyan hover:bg-accent-cyan/10 transition-colors"
            />
            <Link
              href={detailHref}
              className="inline-flex items-center gap-1 text-xs font-mono text-accent-cyan hover:opacity-80 transition-opacity"
            >
              [详情]
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
