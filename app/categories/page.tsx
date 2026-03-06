import { Metadata } from 'next';
import { getCategories } from '@/lib/supabase';
import Link from 'next/link';
import Breadcrumb, { breadcrumbPresets } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'AI 工具分类 - 按类别浏览',
  description: '按类别浏览 AI 工具，包括 AI 写作、图像生成、代码助手、聊天机器人等分类。',
  keywords: ['AI工具分类', 'AI写作', 'AI图像', 'AI编程', 'AI聊天', '工具分类'],
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Breadcrumb items={[{ ...breadcrumbPresets.categories, href: undefined }]} />
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-mono font-bold text-text-primary mb-4">
            AI 工具分类
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            按类别浏览 AI 工具，快速找到适合你需求的工具。涵盖写作、图像、编程、聊天等领域。
          </p>
        </div>

        {/* 分类网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/tools?category=${category.slug}`}
              className="group bg-bg-card rounded-xl p-6 shadow-card hover:shadow-hover border border-border-card hover:border-accent-cyan/30 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-mono font-bold text-text-primary group-hover:text-accent-cyan transition-colors">
                  {category.name}
                </h2>
                <span className="text-sm font-mono text-text-muted bg-bg-secondary px-2 py-1 rounded-full border border-border-subtle">
                  {category.count} 个工具
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex-1 bg-bg-secondary rounded-full h-2 overflow-hidden border border-border-subtle">
                  <div
                    className="h-full bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full transition-all"
                    style={{ width: `${Math.min((category.popularity / 100) * 100, 100)}%` }}
                  />
                </div>
                <span className="ml-3 text-sm font-mono text-text-muted">
                  {`// ${category.popularity}`}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* 提示 */}
        <div className="mt-12 text-center">
          <p className="text-text-muted">
            没有找到想要的分类？{' '}
            <a
              href="mailto:hello@ai.poph163.com"
              className="text-accent-cyan hover:text-accent-cyan/80"
            >
              联系我们
            </a>
            {' '}建议新增分类
          </p>
        </div>
      </div>
    </div>
  );
}
