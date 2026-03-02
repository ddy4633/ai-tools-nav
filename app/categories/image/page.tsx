import { Metadata } from 'next';
import { getAllTools } from '@/lib/supabase';
import Link from 'next/link';
import { ArrowRight, Home } from 'lucide-react';
import type { Tool } from '@/types/tool';

export const metadata: Metadata = {
  title: '图像 AI工具 - 最好的图像人工智能工具 | AI工具导航',
  description: '发现最好的AI图像工具，包括AI绘画、图像生成、图片编辑、AI绘图等各类人工智能图像处理工具。',
  keywords: ['AI图像', 'AI绘画', 'AI图像生成', '人工智能绘图', 'AI图片编辑'],
};

export const revalidate = 3600;

const pricingLabels = {
  free: { text: '免费', className: 'bg-accent-cool/10 text-accent-cool' },
  paid: { text: '付费', className: 'bg-accent-warm/10 text-accent-warm' },
  freemium: { text: '部分免费', className: 'bg-text-muted/10 text-text-muted' },
};

export default async function ImageCategoryPage() {
  const allTools = await getAllTools();
  const tools = allTools.filter((tool: Tool) => 
    tool.category?.includes('图像') || 
    tool.category?.toLowerCase().includes('image') ||
    tool.category?.includes('绘画') ||
    tool.category?.includes('绘图') ||
    tool.category?.includes('图片')
  );

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* 面包屑导航 */}
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
          <span className="text-text-primary">图像</span>
        </nav>

        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            图像 AI工具
          </h1>
          <p className="text-text-secondary max-w-2xl">
            共 {tools.length} 个AI图像工具，包括AI绘画、图像生成、图片编辑、AI绘图等。
            这些工具可以帮助你创建和编辑高质量的艺术作品和设计图像。
          </p>
        </div>

        {/* 筛选栏 */}
        <div className="bg-white rounded-xl p-4 shadow-soft mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm text-text-muted">筛选：</span>
            <Link 
              href="/tools?category=AI图像" 
              className="text-sm px-3 py-1.5 bg-accent-warm/10 text-accent-warm rounded-lg hover:bg-accent-warm hover:text-white transition-colors"
            >
              查看全部图像工具
            </Link>
          </div>
        </div>

        {/* 工具列表 */}
        {tools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool: Tool) => {
              const pricing = pricingLabels[tool.pricing_type as keyof typeof pricingLabels] || pricingLabels.freemium;
              return (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.id}`}
                  className="group block bg-white rounded-xl p-6 shadow-soft hover:shadow-hover border border-transparent hover:border-accent-warm/20 transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-bg-primary flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {tool.icon ? (
                        <img src={tool.icon} alt={`${tool.name} logo`} className="w-8 h-8 object-contain" loading="lazy" />
                      ) : (
                        <span className="text-xl text-accent-warm font-medium">
                          {tool.name[0]}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-text-primary group-hover:text-accent-warm transition-colors truncate">
                        {tool.name}
                      </h3>
                      <span className={`inline-block px-2 py-0.5 text-xs rounded mt-1 ${pricing.className}`}>
                        {pricing.text}
                      </span>
                    </div>
                  </div>
                  <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                    {tool.reason || tool.description}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-bg-primary">
                    <span className="text-xs text-text-muted bg-bg-secondary px-2 py-1 rounded">
                      {tool.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-accent-warm opacity-0 group-hover:opacity-100 transition-opacity">
                      查看详情
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-soft">
            <div className="text-6xl mb-4">🎨</div>
            <p className="text-text-primary text-lg mb-2">暂无图像工具数据</p>
            <p className="text-text-muted text-sm mb-6">请稍后再试或查看其他分类</p>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-2 bg-accent-warm text-white rounded-lg hover:bg-accent-warm-hover transition-colors"
            >
              浏览全部工具
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* 返回首页 */}
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
