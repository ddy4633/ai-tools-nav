import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getToolById, getAllTools } from '@/lib/supabase';
import { RatingDisplay } from '@/components/ui/star-rating';
import { RatingForm } from '@/components/rating-form';
import Breadcrumb, { breadcrumbPresets } from '@/components/ui/Breadcrumb';
import ToolLogo from '@/components/ui/ToolLogo';
import SponsorBadge from '@/components/ui/SponsorBadge';
import type { Tool } from '@/types/tool';
import { buildSiteUrl } from '@/lib/site';
import ToolPrimaryCta from '@/components/ui/ToolPrimaryCta';
import TrackedExternalLink from '@/components/ui/TrackedExternalLink';
import { resolveToolPrimaryUrl } from '@/lib/tracking';

interface ToolPageProps {
  params: Promise<{ id: string }>;
}

// 生成静态参数
export async function generateStaticParams() {
  const tools = await getAllTools();
  return tools.map((tool) => ({
    id: tool.id,
  }));
}

// 动态生成元数据
export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { id } = await params;
  const tool = await getToolById(id);
  
  if (!tool) {
    return {
      title: '工具未找到 - 好工具',
      description: '抱歉，您查找的工具不存在或已被移除。',
    };
  }
  
  const toolUrl = buildSiteUrl(`/tools/${tool.id}`);

  return {
    title: `${tool.name} - ${tool.category}AI工具`,
    description: `${tool.description}。了解更多关于${tool.name}的功能、定价和用户评价。`,
    keywords: [tool.name, tool.category, 'AI工具', '人工智能', '工具评测'],
    alternates: {
      canonical: toolUrl,
    },
    openGraph: {
      title: `${tool.name} - ${tool.category}`,
      description: tool.description,
      url: toolUrl,
      type: 'article',
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { id } = await params;
  const [tool, allTools] = await Promise.all([
    getToolById(id),
    getAllTools(),
  ]);

  if (!tool) {
    notFound();
  }
  
  const pricingLabels = {
    free: { text: '免费', className: 'bg-accent-cyan/10 text-accent-cyan' },
    paid: { text: '付费', className: 'bg-accent-pink/10 text-accent-pink' },
    freemium: { text: '部分免费', className: 'bg-text-muted/10 text-text-muted' },
  };
  
  const pricingType: keyof typeof pricingLabels = tool.pricing_type ?? tool.pricingType ?? 'freemium';
  const pricing = pricingLabels[pricingType] || pricingLabels.freemium;
  const averageRating = tool.average_rating ?? tool.editorRating ?? 0;
  const ratingCount = tool.rating_count ?? 0;
  const toolUrl = buildSiteUrl(`/tools/${tool.id}`);
  const hasPrimaryCta = Boolean(resolveToolPrimaryUrl(tool));
  const relatedTools = allTools
    .filter((item: Tool) => item.id !== tool.id && item.category === tool.category)
    .slice(0, 3);

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    applicationCategory: tool.category,
    operatingSystem: 'Web',
    url: tool.website || toolUrl,
  };

  if (averageRating && ratingCount) {
    jsonLd.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: averageRating,
      ratingCount,
    };
  }
  
  return (
    <div className="min-h-screen bg-bg-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Breadcrumb
          items={[
            breadcrumbPresets.tools,
            { label: tool.category, href: `/tools?category=${tool.categorySlug || tool.category}` },
            { label: tool.name },
          ]}
        />
        {/* 返回链接 */}
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-cyan transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          返回工具列表
        </Link>
        
        {/* 工具信息卡片 */}
        <div className="bg-bg-card rounded-2xl p-8 shadow-card border border-border-card">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-4">
              <ToolLogo
                name={tool.name}
                icon={tool.icon}
                size={40}
                priority
                wrapperClassName="w-16 h-16 rounded-xl bg-bg-primary border border-border-subtle"
                imageClassName="w-10 h-10"
                textClassName="text-2xl text-accent-cyan"
              />
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">{tool.name}</h1>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${pricing.className}`}>
                    {pricing.text}
                  </span>
                  <span className="text-sm text-text-secondary bg-bg-secondary px-3 py-1 rounded-lg border border-border-subtle">
                    {tool.category}
                  </span>
                  <SponsorBadge tool={tool} />
                </div>
                {/* 评分显示 */}
                <RatingDisplay 
                  averageRating={averageRating} 
                  ratingCount={ratingCount}
                  size="md"
                />
              </div>
            </div>
          </div>
          
          <p className="text-text-secondary text-lg mb-8 leading-relaxed">
            {tool.description}
          </p>

          {tool.priceRange && (
            <div className="mb-8 text-sm text-text-secondary">
              <span className="font-medium text-text-primary">价格区间：</span>
              {tool.priceRange}
            </div>
          )}
          
          {/* 操作按钮 */}
          <div className="flex flex-wrap gap-4">
            <ToolPrimaryCta
              tool={tool}
              placement="tool_detail_primary_cta"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-cyan to-accent-purple text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
            />
            
            {tool.repo_url && (
              <TrackedExternalLink
                href={tool.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                trackingPayload={{
                  placement: 'tool_detail_repo_cta',
                  toolId: tool.id,
                  toolName: tool.name,
                  targetUrl: tool.repo_url,
                  isAffiliate: false,
                }}
                className="inline-flex items-center gap-2 px-6 py-3 border border-border-subtle text-text-secondary font-medium rounded-xl hover:border-accent-cyan hover:text-accent-cyan transition-colors"
              >
                查看源码
              </TrackedExternalLink>
            )}
            
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border-subtle text-text-secondary font-medium rounded-xl hover:border-accent-cyan hover:text-accent-cyan transition-colors"
            >
              查看其他工具
            </Link>
          </div>
        </div>
        
        {tool.reason && (
          <div className="mt-8 bg-bg-card rounded-2xl p-8 shadow-card border border-border-card">
            <h2 className="text-2xl font-bold text-text-primary mb-4">推荐理由</h2>
            <p className="text-text-secondary leading-relaxed">{tool.reason}</p>
          </div>
        )}

        {tool.fullReview && (
          <div className="mt-8 bg-bg-card rounded-2xl p-8 shadow-card border border-border-card">
            <h2 className="text-2xl font-bold text-text-primary mb-4">详细评测</h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              {tool.fullReview
                .split(/\n\s*\n/)
                .map((paragraph, index) => (
                  <p key={index}>{paragraph.trim()}</p>
                ))}
            </div>
          </div>
        )}

        {(tool.features?.length || tool.pros?.length || tool.cons?.length) && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {tool.features?.length ? (
              <div className="bg-bg-card rounded-2xl p-6 shadow-card border border-border-card">
                <h3 className="text-xl font-bold text-text-primary mb-4">核心功能</h3>
                <ul className="space-y-2 text-text-secondary">
                  {tool.features.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {(tool.pros?.length || tool.cons?.length) && (
              <div className="bg-bg-card rounded-2xl p-6 shadow-card border border-border-card">
                <h3 className="text-xl font-bold text-text-primary mb-4">优缺点</h3>
                {tool.pros?.length ? (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-text-primary mb-2">优点</p>
                    <ul className="space-y-1 text-text-secondary">
                      {tool.pros.map((item) => (
                        <li key={`pro-${item}`}>+ {item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {tool.cons?.length ? (
                  <div>
                    <p className="text-sm font-medium text-text-primary mb-2">不足</p>
                    <ul className="space-y-1 text-text-secondary">
                      {tool.cons.map((item) => (
                        <li key={`con-${item}`}>- {item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        )}

        {tool.reviewSources?.length ? (
          <div className="mt-8 bg-bg-card rounded-2xl p-6 shadow-card border border-border-card">
            <h3 className="text-xl font-bold text-text-primary mb-4">站外评价摘要</h3>
            <div className="space-y-4">
              {tool.reviewSources.map((source) => (
                <div
                  key={`${source.source}-${source.url}`}
                  className="rounded-xl border border-border-subtle bg-bg-primary p-4"
                >
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <p className="text-sm font-semibold text-text-primary">{source.source}</p>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-accent-cyan hover:opacity-80 transition-opacity"
                    >
                      查看来源
                    </a>
                  </div>
                  <p className="text-sm text-text-secondary leading-6">{source.summary}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {tool.alternatives?.length ? (
          <div className="mt-8 bg-bg-card rounded-2xl p-6 shadow-card border border-border-card">
            <h3 className="text-xl font-bold text-text-primary mb-4">替代工具</h3>
            <div className="flex flex-wrap gap-2">
              {tool.alternatives.map((alt) => (
                <span
                  key={alt}
                  className="px-3 py-1 text-sm rounded-full bg-bg-secondary text-text-secondary"
                >
                  {alt}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {relatedTools.length ? (
          <div className="mt-8 bg-bg-card rounded-2xl p-6 shadow-card border border-border-card">
            <div className="flex items-center justify-between mb-4 gap-4">
              <div>
                <h3 className="text-xl font-bold text-text-primary">同类推荐</h3>
                <p className="text-sm text-text-secondary mt-1">继续探索同分类下的相关工具</p>
              </div>
              <Link
                href={`/tools?category=${tool.categorySlug || tool.category}`}
                className="text-sm text-accent-cyan hover:opacity-80 transition-opacity"
              >
                查看全部
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedTools.map((relatedTool) => (
                  <Link
                    key={relatedTool.id}
                    href={`/tools/${relatedTool.id}`}
                    className="rounded-xl border border-border-subtle bg-bg-primary p-4 hover:border-accent-cyan/40 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <ToolLogo
                        name={relatedTool.name}
                        icon={relatedTool.icon}
                        size={24}
                        wrapperClassName="w-10 h-10 rounded-lg bg-bg-secondary border border-border-subtle shrink-0"
                        imageClassName="w-6 h-6"
                        textClassName="text-sm text-accent-cyan"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-text-primary truncate">{relatedTool.name}</p>
                        <p className="text-xs text-text-secondary line-clamp-2 mt-1">{relatedTool.description}</p>
                      </div>
                    </div>
                  </Link>
              ))}
            </div>
          </div>
        ) : null}

        {/* 评分区域 */}
        <div className="mt-8 bg-bg-card rounded-2xl p-8 shadow-card border border-border-card">
          <h2 className="text-2xl font-bold text-text-primary mb-6">用户评价</h2>
          <RatingForm toolId={tool.id} />
        </div>
        
        {/* 提示 */}
        <div className="mt-8 p-4 bg-accent-cyan/5 border border-accent-cyan/20 rounded-xl">
          <p className="text-sm text-text-secondary">
            {hasPrimaryCta
              ? '💡 提示：如已配置合作链接，主按钮会优先跳转到合作链接；否则跳转到工具官网。'
              : '💡 提示：当前工具暂未配置外部访问链接，可后续补充官网或合作链接。'}
          </p>
        </div>
      </div>
    </div>
  );
}
