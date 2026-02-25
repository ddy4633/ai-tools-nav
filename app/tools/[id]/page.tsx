import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { getToolById, getAllTools } from '@/lib/supabase';

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
    };
  }
  
  return {
    title: `${tool.name} - 好工具`,
    description: tool.description,
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { id } = await params;
  const tool = await getToolById(id);
  
  if (!tool) {
    notFound();
  }
  
  const pricingLabels = {
    free: { text: '免费', className: 'bg-accent-cool/10 text-accent-cool' },
    paid: { text: '付费', className: 'bg-accent-warm/10 text-accent-warm' },
    freemium: { text: '部分免费', className: 'bg-text-muted/10 text-text-muted' },
  };
  
  const pricing = pricingLabels[tool.pricing_type];
  
  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* 返回链接 */}
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-warm transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          返回工具列表
        </Link>
        
        {/* 工具信息卡片 */}
        <div className="bg-white rounded-2xl p-8 shadow-soft">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">{tool.name}</h1>
              <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${pricing.className}`}>
                {pricing.text}
              </span>
            </div>
            <span className="text-sm text-text-muted bg-bg-secondary px-3 py-1 rounded-lg">
              {tool.category}
            </span>
          </div>
          
          <p className="text-text-secondary text-lg mb-8 leading-relaxed">
            {tool.description}
          </p>
          
          {/* 操作按钮 */}
          <div className="flex gap-4">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent-warm text-white font-medium rounded-xl hover:bg-accent-warm-hover transition-colors"
            >
              访问官网
              <ExternalLink className="w-4 h-4" />
            </a>
            
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border-light text-text-secondary font-medium rounded-xl hover:border-accent-warm hover:text-accent-warm transition-colors"
            >
              查看其他工具
            </Link>
          </div>
        </div>
        
        {/* 提示 */}
        <div className="mt-8 p-4 bg-accent-warm/5 border border-accent-warm/20 rounded-xl">
          <p className="text-sm text-text-secondary">
            💡 提示：点击"访问官网"按钮可以跳转到工具的官方网站进行试用。
          </p>
        </div>
      </div>
    </div>
  );
}
