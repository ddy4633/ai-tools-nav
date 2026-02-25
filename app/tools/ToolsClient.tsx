'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Filter, ArrowRight } from 'lucide-react';

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
        {/* 搜索框 */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索工具名称或描述..."
            className="w-full pl-12 pr-4 py-3 bg-bg-secondary border border-border-light rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-warm transition-colors"
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
        <div className="text-center py-16">
          <p className="text-text-muted text-lg mb-2">没有找到匹配的工具</p>
          <p className="text-text-muted text-sm">试试其他关键词或筛选条件</p>
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
