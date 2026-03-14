import { Metadata } from 'next';
import { Compass, Layers3, Search, Sparkles } from 'lucide-react';
import { getAllTools, getCategories } from '@/lib/supabase';
import Breadcrumb, { breadcrumbPresets } from '@/components/ui/Breadcrumb';
import PageHero from '@/components/ui/PageHero';
import ToolsClient from './ToolsClient';
import { buildSiteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: '全部 AI 工具 - 发现最好用的 AI 工具导航',
  description: '浏览精选 AI 工具，按分类、价格、任务场景快速筛选，找到真正适合你的 AI 工具。',
  keywords: ['AI工具', 'AI工具导航', '人工智能工具', 'AI写作', 'AI图像', 'AI编程', 'AI聊天'],
  alternates: {
    canonical: buildSiteUrl('/tools'),
  },
  openGraph: {
    title: '全部 AI 工具 - 好工具',
    description: '浏览精选 AI 工具，支持分类筛选和搜索',
    url: buildSiteUrl('/tools'),
    type: 'website',
  },
};

export const revalidate = 3600;

export default async function ToolsPage({
  searchParams,
}: {
  searchParams?: Promise<{ search?: string; category?: string; pricing?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const [tools, categories] = await Promise.all([getAllTools(), getCategories()]);

  const initialSearch = typeof resolvedSearchParams?.search === 'string' ? resolvedSearchParams.search : '';
  const initialCategory = typeof resolvedSearchParams?.category === 'string' ? resolvedSearchParams.category : '';
  const initialPricing = typeof resolvedSearchParams?.pricing === 'string' ? resolvedSearchParams.pricing : '';

  const freeCount = tools.filter((tool) => (tool.pricing_type ?? tool.pricingType) === 'free').length;
  const featuredCount = tools.filter((tool) => tool.is_featured ?? tool.isFeatured).length;
  const sponsoredCount = tools.filter((tool) => tool.is_sponsored ?? tool.isSponsored).length;

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <Breadcrumb items={[{ ...breadcrumbPresets.tools, href: undefined }]} />
      </div>

      <PageHero
        eyebrow="完整工具库"
        title="不是把名字堆满页面。"
        highlight="而是先帮你缩小选择范围。"
        description="这里承接首页、榜单和专题页之后的深度筛选需求。你可以按分类、价格和关键词快速收敛，也可以先看我们挑出来的优先入口，再决定要不要继续深挖。"
        metrics={[
          {
            value: `${tools.length}+`,
            label: '当前可筛选工具',
            hint: '保持更新，但不会为了凑数牺牲信息质量。',
          },
          {
            value: `${categories.length}`,
            label: '一级任务分类',
            hint: '按场景找工具，而不是先背模型名字。',
          },
          {
            value: `${freeCount}`,
            label: '免费工具',
            hint: '适合先试后买，降低第一次决策成本。',
          },
          {
            value: `${featuredCount}/${sponsoredCount}`,
            label: '精选 / 合作位',
            hint: '编辑推荐与商业曝光分开展示，判断更透明。',
          },
        ]}
        actions={[
          { href: '/categories', label: '先按任务找工具', tone: 'secondary' },
          { href: '/trending', label: '查看本周热榜', tone: 'ghost' },
          { href: '/advertise', label: '查看合作方案', tone: 'primary' },
        ]}
        aside={
          <div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Sparkles className="h-4 w-4 text-accent-yellow" />
              这个页面适合谁
            </div>
            <div className="mt-5 space-y-3">
              {[
                {
                  icon: Search,
                  title: '先搜关键词',
                  description: '适合你已经知道目标任务，比如“写周报”“做产品图”“读长文档”。',
                },
                {
                  icon: Layers3,
                  title: '再缩分类和价格',
                  description: '把选择压缩到 5-10 个以内，才值得逐个点详情页。',
                },
                {
                  icon: Compass,
                  title: '最后看编辑判断',
                  description: '重点看推荐理由、替代方案和官网入口，而不是只看工具热度。',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-[22px] border border-white/8 bg-black/10 p-4">
                  <div className="flex items-center gap-2 text-sm text-text-primary">
                    <item.icon className="h-4 w-4 text-accent-cyan" />
                    {item.title}
                  </div>
                  <p className="mt-3 text-sm leading-7 text-text-secondary">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        }
      />

      <div className="mx-auto max-w-7xl px-6 pb-20">
        <ToolsClient
          tools={tools}
          categories={categories}
          initialSearch={initialSearch}
          initialCategory={initialCategory}
          initialPricing={initialPricing}
        />
      </div>
    </div>
  );
}
