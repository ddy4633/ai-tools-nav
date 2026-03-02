import dynamic from 'next/dynamic';
import Hero from '@/components/home/Hero';
import { getTrendingTools, getFeaturedTools, getCategories } from '@/lib/supabase';
import { editorPicks, toolsData, categoriesData } from '@/lib/content/tools-data';
import type { Metadata } from 'next';

import { Tool, Category, TrendingTool } from '@/types/tool';
import { 
  FeaturedToolsSkeleton, 
  TrendingToolsSkeleton,
  CategoriesSkeleton,
  EditorPicksSkeleton,
  NewsletterSkeleton
} from '@/components/ui/Skeleton';

// Dynamic imports for below-the-fold components with proper skeletons
const TrendingTools = dynamic(() => import('@/components/home/TrendingTools'), {
  loading: () => <TrendingToolsSkeleton />,
});
const FeaturedTools = dynamic(() => import('@/components/home/FeaturedTools'), {
  loading: () => <FeaturedToolsSkeleton />,
});
const EditorPicks = dynamic(() => import('@/components/home/EditorPicks'), {
  loading: () => <EditorPicksSkeleton />,
});
const Categories = dynamic(() => import('@/components/home/Categories'), {
  loading: () => <CategoriesSkeleton />,
});
const NewsletterSection = dynamic(() => import('@/components/home/NewsletterSection'), {
  loading: () => <NewsletterSkeleton />,
});

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'AI工具导航 - 精选好用AI工具 | 国内AI工具推荐',
  description: '精选国内外好用的AI工具，包括AI写作、AI绘画、AI编程、AI视频等各类人工智能工具导航，助您提升工作效率。',
  keywords: ['AI工具', 'AI工具导航', 'AI写作', 'AI绘画', 'AI编程', 'ChatGPT', 'DeepSeek', 'Midjourney', '免费AI工具', '国内AI工具'],
  alternates: {
    canonical: 'https://ai.poph163.com',
  },
  openGraph: {
    title: 'AI工具导航 - 精选好用AI工具',
    description: '精选国内外好用的AI工具，包括AI写作、AI绘画、AI编程、AI视频等',
    url: 'https://ai.poph163.com',
    siteName: 'AI工具导航',
    locale: 'zh_CN',
    type: 'website',
  },
};

export default async function Home() {
  let trending: TrendingTool[] = [];
  let tools: Tool[] = [];
  let categories: Category[] = [];

  try {
    const [trendingResult, toolsResult, categoriesResult] = await Promise.all([
      getTrendingTools(5),
      getFeaturedTools(8),
      getCategories(),
    ]);
    trending = (trendingResult || []) as TrendingTool[];
    tools = (toolsResult || []) as Tool[];
    categories = (categoriesResult || []) as Category[];
  } catch {
    // 静默处理错误，使用备用数据
  }

  // 使用本地数据作为备用
  const displayCategories = categories.length > 0 ? categories : categoriesData;
  const displayTools = tools.length > 0 ? tools : toolsData.slice(0, 8);

  return (
    <>
      <Hero />
      <EditorPicks picks={editorPicks} />
      <TrendingTools tools={trending} />
      <FeaturedTools tools={displayTools} />
      <Categories categories={displayCategories} />
      <NewsletterSection />
    </>
  );
}
