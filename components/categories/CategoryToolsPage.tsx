import Link from 'next/link';
import { ArrowRight, Home } from 'lucide-react';
import type { Tool } from '@/types/tool';
import ToolLogo from '@/components/ui/ToolLogo';
import ToolPrimaryCta from '@/components/ui/ToolPrimaryCta';
import SponsorBadge from '@/components/ui/SponsorBadge';

interface CategoryToolsPageProps {
  categoryLabel: string;
  heading: string;
  description: string;
  tools: Tool[];
  toolsFilterHref: string;
  toolsFilterLabel: string;
  emptyEmoji: string;
  emptyTitle: string;
  emptyDescription: string;
}

const pricingLabels = {
  free: { text: '免费', className: 'bg-accent-cool/10 text-accent-cool' },
  paid: { text: '付费', className: 'bg-accent-warm/10 text-accent-warm' },
  freemium: { text: '部分免费', className: 'bg-text-muted/10 text-text-muted' },
};

export function filterToolsByKeywords(tools: Tool[], keywords: string[]): Tool[] {
  return tools.filter((tool) => {
    const category = tool.category?.toLowerCase() ?? '';
    return keywords.some((keyword) => category.includes(keyword.toLowerCase()));
  });
}

export default function CategoryToolsPage({
  categoryLabel,
  heading,
  description,
  tools,
  toolsFilterHref,
  toolsFilterLabel,
  emptyEmoji,
  emptyTitle,
  emptyDescription,
}: CategoryToolsPageProps) {
  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <nav className="flex items-center gap-2 text-sm text-text-muted mb-8">
          <Link href="/" className="flex items-center gap-1 hover:text-accent-warm transition-colors">
            <Home className="w-4 h-4" />
            首页
          </Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-accent-warm transition-colors">
            分类
          </Link>
          <span>/</span>
          <span className="text-text-primary">{categoryLabel}</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            {heading}
          </h1>
          <p className="text-text-secondary max-w-2xl">
            共 {tools.length} 个工具。{description}
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-soft mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm text-text-muted">筛选：</span>
            <Link
              href={toolsFilterHref}
              className="text-sm px-3 py-1.5 bg-accent-warm/10 text-accent-warm rounded-lg hover:bg-accent-warm hover:text-white transition-colors"
            >
              {toolsFilterLabel}
            </Link>
          </div>
        </div>

        {tools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => {
              const pricing = pricingLabels[tool.pricing_type as keyof typeof pricingLabels] || pricingLabels.freemium;
              const detailHref = `/tools/${tool.id}`;

              return (
                <article
                  key={tool.id}
                  className="group bg-white rounded-xl p-6 shadow-soft hover:shadow-hover border border-transparent hover:border-accent-warm/20 transition-all flex flex-col"
                >
                  <Link href={detailHref} className="block flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <ToolLogo
                        name={tool.name}
                        icon={tool.icon}
                        size={32}
                        alt={`${tool.name} logo`}
                        wrapperClassName="w-12 h-12 rounded-lg bg-bg-primary flex-shrink-0"
                        imageClassName="w-8 h-8"
                        textClassName="text-xl text-accent-warm font-medium"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-text-primary group-hover:text-accent-warm transition-colors truncate">
                          {tool.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className={`inline-block px-2 py-0.5 text-xs rounded ${pricing.className}`}>
                            {pricing.text}
                          </span>
                          <SponsorBadge tool={tool} />
                        </div>
                      </div>
                    </div>
                    <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                      {tool.reason || tool.description}
                    </p>
                  </Link>

                  <div className="mt-auto flex items-center justify-between gap-3 pt-3 border-t border-bg-primary">
                    <span className="text-xs text-text-muted bg-bg-secondary px-2 py-1 rounded">
                      {tool.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <ToolPrimaryCta
                        tool={tool}
                        placement="category_page_primary_cta"
                        affiliateLabel="合作链接"
                        websiteLabel="官网"
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg border border-accent-warm/30 text-accent-warm hover:bg-accent-warm/10 transition-colors"
                      />
                      <Link
                        href={detailHref}
                        className="inline-flex items-center gap-1 text-xs text-accent-warm hover:text-accent-warm-hover transition-colors"
                      >
                        查看详情
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-soft">
            <div className="text-6xl mb-4">{emptyEmoji}</div>
            <p className="text-text-primary text-lg mb-2">{emptyTitle}</p>
            <p className="text-text-muted text-sm mb-6">{emptyDescription}</p>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-2 bg-accent-warm text-white rounded-lg hover:bg-accent-warm-hover transition-colors"
            >
              浏览全部工具
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-accent-warm hover:text-accent-warm-hover transition-colors"
          >
            <Home className="w-4 h-4" />
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
