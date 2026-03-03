'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Filter, ArrowRight } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  pricing_type: 'free' | 'paid' | 'freemium';
  icon?: string;
}

interface ToolsListProps {
  tools: Tool[];
  searchQuery?: string;
}

const pricingLabels = {
  free: { 
    text: '免费', 
    className: 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/30' 
  },
  paid: { 
    text: '付费', 
    className: 'bg-accent-pink/10 text-accent-pink border-accent-pink/30' 
  },
  freemium: { 
    text: '部分免费', 
    className: 'bg-accent-purple/10 text-accent-purple border-accent-purple/30' 
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }
  }
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
      <div className="bg-bg-card rounded-xl p-6 shadow-card border border-border-card">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* 搜索框 */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索工具..."
              className="w-full pl-10 pr-4 py-3 bg-bg-primary border border-border-subtle rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-cyan/50 focus:shadow-glow-cyan transition-all"
            />
          </div>

          {/* 筛选按钮 */}
          <div className="flex gap-2">
            {(['all', 'free', 'paid', 'freemium'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 text-sm font-mono rounded-lg transition-all ${
                  filter === type
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

      {/* 结果统计 */}
      <div className="flex items-center justify-between">
        <p className="text-text-secondary font-mono">
          共 <span className="text-accent-cyan">{filteredTools.length}</span> 个工具
          {search && ` (搜索 "${search}")`}
        </p>
        {(search || filter !== 'all') && (
          <button
            onClick={() => {
              setSearch('');
              setFilter('all');
            }}
            className="text-sm font-mono text-accent-cyan hover:opacity-80 flex items-center gap-1"
          >
            <Filter className="w-4 h-4" />
            清除筛选
          </button>
        )}
      </div>

      {/* 工具列表 */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} variants={cardVariants} />
        ))}
      </motion.div>

      {/* 空状态 */}
      {filteredTools.length === 0 && (
        <div className="text-center py-16 bg-bg-card rounded-xl shadow-card border border-border-card">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-bg-secondary flex items-center justify-center">
            <Search className="w-8 h-8 text-text-muted" />
          </div>
          <p className="text-text-primary text-lg font-mono mb-2">没有找到匹配的工具</p>
          <p className="text-text-muted text-sm mb-6">试试其他关键词</p>
          <button
            onClick={() => {
              setSearch('');
              setFilter('all');
            }}
            className="px-6 py-2 bg-accent-cyan/10 border border-accent-cyan/50 text-accent-cyan font-mono rounded-lg hover:bg-accent-cyan/20 transition-colors"
          >
            清除筛选
          </button>
        </div>
      )}
    </div>
  );
}

interface ToolCardProps {
  tool: Tool;
  variants: Variants;
}

function ToolCard({ tool, variants }: ToolCardProps) {
  const pricingType = tool.pricing_type || tool.pricingType || 'freemium';
  const pricing = pricingLabels[pricingType] || pricingLabels.freemium;
  
  return (
    <motion.div variants={variants}>
      <Link
        href={`/tools/${tool.id}`}
        className="group block relative h-full"
      >
        {/* 发光边框效果 */}
        <div className="absolute -inset-px bg-gradient-to-r from-accent-cyan/20 via-accent-purple/20 to-accent-pink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-sm" />
        
        <div className="relative h-full bg-bg-card border border-border-card rounded-xl p-6 hover:border-accent-cyan/30 transition-all duration-300">
          {/* 头部：图标 + 名称 */}
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-bg-primary border border-border-subtle flex items-center justify-center flex-shrink-0 overflow-hidden group-hover:border-accent-cyan/50 group-hover:shadow-glow-cyan transition-all">
              {tool.icon ? (
                <img 
                  src={tool.icon} 
                  alt={`${tool.name} logo`} 
                  className="w-8 h-8 object-contain" 
                  loading="lazy"
                  width={32}
                  height={32}
                />
              ) : (
                <span className="text-xl font-mono text-accent-cyan">{tool.name[0]}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-mono font-bold text-text-primary group-hover:text-accent-cyan transition-colors truncate">
                {tool.name}
              </h3>
              <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-mono rounded border ${pricing.className}`}>
                {pricing.text}
              </span>
            </div>
          </div>
          
          {/* 描述 */}
          <p className="text-text-secondary text-sm leading-relaxed mb-4 font-mono line-clamp-2">
            {tool.description}
          </p>
          
          {/* 底部分类 */}
          <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
            <span className="text-xs font-mono text-text-muted">
              // {tool.category}
            </span>
            <span className="text-xs font-mono text-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
              [VIEW]
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
