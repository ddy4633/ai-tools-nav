'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Filter, Star } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  pricing_type: 'free' | 'paid' | 'freemium';
}

interface ToolsListProps {
  tools: Tool[];
  searchQuery?: string;
}

const pricingLabels = {
  free: { text: '免费', className: 'bg-accent-cool/10 text-accent-cool' },
  paid: { text: '付费', className: 'bg-accent-warm/10 text-accent-warm' },
  freemium: { text: '部分免费', className: 'bg-text-muted/10 text-text-muted' },
};

export default function ToolsList({ tools, searchQuery = '' }: ToolsListProps) {
  const [search, setSearch] = useState(searchQuery);
  const [filter, setFilter] = useState<'all' | 'free' | 'paid' | 'freemium'>('all');

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch =
        search === '' ||
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase()) ||
        tool.category.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = filter === 'all' || tool.pricing_type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [tools, search, filter]);

  return (
    <div className="space-y-6">
      {/* 搜索和筛选 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索工具..."
            className="w-full pl-10 pr-4 py-2 border border-border-light rounded-lg focus:outline-none focus:border-accent-warm"
          />
        </div>

        <div className="flex gap-2">
          {(['all', 'free', 'paid', 'freemium'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                filter === type
                  ? 'bg-accent-warm text-white'
                  : 'bg-white border border-border-light text-text-secondary hover:border-accent-warm'
              }`}
            >
              {type === 'all' ? '全部' : pricingLabels[type].text}
            </button>
          ))}
        </div>
      </div>

      {/* 结果统计 */}
      <p className="text-sm text-text-muted">
        共 {filteredTools.length} 个工具
        {search && ` (搜索 "${search}")`}
      </p>

      {/* 工具列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-muted">没有找到匹配的工具</p>
        </div>
      )}
    </div>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  const pricing = pricingLabels[tool.pricing_type];

  return (
    <Link
      href={`/tools/${tool.id}`}
      className="block p-5 bg-white rounded-xl border border-border-light hover:border-accent-warm hover:shadow-hover transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-medium text-text-primary">{tool.name}</h3>
        <span className={`px-2 py-1 text-xs rounded-full ${pricing.className}`}>
          {pricing.text}
        </span>
      </div>

      <p className="text-sm text-text-secondary mb-3 line-clamp-2">
        {tool.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-text-muted">{tool.category}</span>
        <Star className="w-4 h-4 text-border-medium" />
      </div>
    </Link>
  );
}
