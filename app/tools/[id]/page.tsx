import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { getToolById, getAllTools } from '@/lib/supabase';
import { RatingDisplay } from '@/components/ui/star-rating';
import { RatingForm } from '@/components/rating-form';

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
  
  return {
    title: `${tool.name} - ${tool.category}AI工具`,
    description: `${tool.description}。了解更多关于${tool.name}的功能、定价和用户评价。`,
    keywords: [tool.name, tool.category, 'AI工具', '人工智能', '工具评测'],
    openGraph: {
      title: `${tool.name} - ${tool.category}`,
      description: tool.description,
      type: 'article',
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { id } = await params;
  const tool = await getToolById(id);
  
  if (!tool) {
    notFound();
  }
  
  const pricingLabels = {
    free: { text: '免费', className: 'bg-accent-cyan/10 text-accent-cyan' },
    paid: { text: '付费', className: 'bg-accent-pink/10 text-accent-pink' },
    freemium: { text: '部分免费', className: 'bg-text-muted/10 text-text-muted' },
  };
  
  const pricingType = tool.pricing_type || 'freemium';
  const pricing = pricingLabels[pricingType];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai.poph163.com';
  const toolUrl = `${siteUrl}/tools/${tool.id}`;

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    applicationCategory: tool.category,
    operatingSystem: 'Web',
    url: tool.website || toolUrl,
  };

  if (tool.average_rating && tool.rating_count) {
    jsonLd.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: tool.average_rating,
      ratingCount: tool.rating_count,
    };
  }
  
  return (
    <div className="min-h-screen bg-bg-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-6 py-12">
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
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">{tool.name}</h1>
              <div className="flex items-center gap-3 mb-3">
                <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${pricing.className}`}>
                  {pricing.text}
                </span>
                <span className="text-sm text-text-secondary bg-bg-secondary px-3 py-1 rounded-lg border border-border-subtle">
                  {tool.category}
                </span>
              </div>
              {/* 评分显示 */}
              <RatingDisplay 
                averageRating={tool.average_rating || 0} 
                ratingCount={tool.rating_count || 0}
                size="md"
              />
            </div>
          </div>
          
          <p className="text-text-secondary text-lg mb-8 leading-relaxed">
            {tool.description}
          </p>
          
          {/* 操作按钮 */}
          <div className="flex flex-wrap gap-4">
            <a
              href={tool.website || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-cyan to-accent-purple text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
            >
              访问官网
              <ExternalLink className="w-4 h-4" />
            </a>
            
            {tool.repo_url && (
              <a
                href={tool.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border-subtle text-text-secondary font-medium rounded-xl hover:border-accent-cyan hover:text-accent-cyan transition-colors"
              >
                查看源码
              </a>
            )}
            
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border-subtle text-text-secondary font-medium rounded-xl hover:border-accent-cyan hover:text-accent-cyan transition-colors"
            >
              查看其他工具
            </Link>
          </div>
        </div>
        
        {/* 评分区域 */}
        <div className="mt-8 bg-bg-card rounded-2xl p-8 shadow-card border border-border-card">
          <h2 className="text-2xl font-bold text-text-primary mb-6">用户评价</h2>
          <RatingForm toolId={tool.id} />
        </div>
        
        {/* 提示 */}
        <div className="mt-8 p-4 bg-accent-cyan/5 border border-accent-cyan/20 rounded-xl">
          <p className="text-sm text-text-secondary">
            💡 提示：点击"访问官网"按钮可以跳转到工具的官方网站进行试用。
          </p>
        </div>
      </div>
    </div>
  );
}
