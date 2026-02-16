'use client';

import Link from 'next/link';

interface Tool {
  id: string;
  name: string;
  description: string;
  reason?: string;  // 推荐理由
  category: string;
  pricing_type: 'free' | 'paid' | 'freemium';
  icon?: string;
}

interface FeaturedToolsProps {
  tools: Tool[];
}

const pricingLabels = {
  free: { text: '免费', className: 'bg-accent-cool/10 text-accent-cool' },
  paid: { text: '付费', className: 'bg-accent-warm/10 text-accent-warm' },
  freemium: { text: '部分免费', className: 'bg-text-muted/10 text-text-muted' },
};

export default function FeaturedTools({ tools }: FeaturedToolsProps) {
  return (
    <section className="py-16 bg-bg-secondary">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-medium text-text-primary">热门工具</h2>
          <Link
            href="/tools"
            className="text-sm text-accent-warm hover:text-accent-warm-hover font-medium transition-colors"
          >
            查看全部 →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  const pricing = pricingLabels[tool.pricing_type] || pricingLabels.freemium;
  
  return (
    <Link 
      href={`/tools/${tool.id}`}
      className="group block bg-white rounded-xl border border-border-light p-5 hover:shadow-hover hover:border-border-medium transition-all duration-300"
    >
      {/* 头部：图标 + 名称 */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-lg bg-bg-primary flex items-center justify-center flex-shrink-0 overflow-hidden">
          {tool.icon ? (
            <img src={tool.icon} alt="" className="w-8 h-8 object-contain" />
          ) : (
            <span className="text-xl text-accent-warm font-medium">
              {tool.name[0]}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-text-primary group-hover:text-accent-warm transition-colors">
            {tool.name}
          </h3>
          <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded ${pricing.className}`}>
            {pricing.text}
          </span>
        </div>
      </div>
      
      {/* 推荐理由 */}
      <p className="text-text-secondary text-sm leading-relaxed mb-4">
        {tool.reason || tool.description}
      </p>
      
      {/* 底部分类 */}
      <div className="flex items-center justify-between pt-4 border-t border-bg-primary">
        <span className="text-xs text-text-muted">
          {tool.category}
        </span>
        <span className="text-xs text-accent-warm opacity-0 group-hover:opacity-100 transition-opacity">
          查看详情 →
        </span>
      </div>
    </Link>
  );
}
