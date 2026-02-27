'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Filter, ArrowRight } from 'lucide-react';
import { EnhancedSearch } from '@/components/enhanced-search';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  pricing_type: 'free' | 'paid' | 'freemium';
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ToolsClientProps {
  tools: Tool[];
  categories: Category[];
}

const pricingLabels = {
  free: { text: '免费', className: 'bg-accent-cool/10 text-accent-cool' },
  paid: { text: '付费', className: 'bg-accent-warm/10 text-accent-warm' },
  freemium: { text: '部分免费', className: 'bg-text-muted/10 text-text-muted' },
};

export default function ToolsClient({ tools, categories }: ToolsClientProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPricing, setSelectedPricing] = useState<'all' | 'free' | 'paid' | 'freemium'>('all');

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch =
        search === '' ||
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || tool.category === selectedCategory;

      const matchesPricing =
        selectedPricing === 'all' || tool.pricing_type === selectedPricing;

      return matchesSearch && matchesCategory && matchesPricing;
    });
  }, [tools, search, selectedCategory, selectedPricing]);

  return (
    <>
      {/* 搜索和筛选 */}
      <div className="bg-white rounded-xl p-6 shadow-soft mb-8">
        {/* 增强搜索框 */}
        <div className="mb-6">
          <EnhancedSearch
            tools={tools}
            onSearch={setSearch}
            currentQuery={search}
          />
        </div>

        {/* 分类筛选 */}
        <div className="mb-4">
          <p className="text-sm text-text-muted mb-2">分类</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-accent-warm text-white'
                  : 'bg-bg-secondary text-text-secondary hover:bg-border-light'
              }`}
            >
              全部
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  selectedCategory === cat.name
                    ? 'bg-accent-warm text-white'
                    : 'bg-bg-secondary text-text-secondary hover:bg-border-light'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* 定价筛选 */}
        <div>
          <p className="text-sm text-text-muted mb-2">定价</p>
          <div className="flex gap-2">
            {(['all', 'free', 'paid', 'freemium'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedPricing(type)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  selectedPricing === type
                    ? 'bg-accent-warm text-white'
                    : 'bg-bg-secondary text-text-secondary hover:bg-border-light'
                }`}
              >
                {type === 'all' ? '全部' : pricingLabels[type].text}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 结果统计 */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-text-secondary">
          显示 <span className="font-medium text-text-primary">{filteredTools.length}</span> 个工具
        </p>
        {(search || selectedCategory !== 'all' || selectedPricing !== 'all') && (
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('all');
              setSelectedPricing('all');
            }}
            className="text-sm text-accent-warm hover:text-accent-warm-hover"
          >
            清除筛选
          </button>
        )}
      </div>

      {/* 工具列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl shadow-soft">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-text-primary text-lg mb-2">没有找到匹配的工具</p>
          <p className="text-text-muted text-sm mb-6">试试其他关键词，或清除筛选条件</p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('all');
              setSelectedPricing('all');
            }}
            className="px-6 py-2 bg-accent-warm text-white rounded-lg hover:bg-accent-warm-hover transition-colors"
          >
            清除所有筛选
          </button>
        </div>
      )}
    </>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  const pricing = pricingLabels[tool.pricing_type];

  return (
    <Link
      href={`/tools/${tool.id}`}
      className="group block bg-white rounded-xl p-6 shadow-soft hover:shadow-hover border border-transparent hover:border-accent-warm/20 transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-medium text-text-primary group-hover:text-accent-warm transition-colors">
          {tool.name}
        </h3>
        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${pricing.className}`}>
          {pricing.text}
        </span>
      </div>

      <p className="text-text-secondary text-sm mb-4 line-clamp-2">
        {tool.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-text-muted bg-bg-secondary px-2 py-1 rounded">
          {tool.category}
        </span>
        <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-accent-warm group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
}
