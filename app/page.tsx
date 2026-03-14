import type { Metadata } from 'next';
import HomeShowcase from '@/components/home/HomeShowcase';
import { editorPicks, toolsData, categoriesData } from '@/lib/content/tools-data';
import { getSponsoredToolsFromList } from '@/lib/monetization/sponsored';
import { getAllTools, getCategories, getTrendingTools } from '@/lib/supabase';
import type { Category, Tool, TrendingTool } from '@/types/tool';

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
  let allTools: Tool[] = [];
  let categories: Category[] = [];

  try {
    const [trendingResult, toolsResult, categoriesResult] = await Promise.all([
      getTrendingTools(6),
      getAllTools(),
      getCategories(),
    ]);

    trending = (trendingResult || []) as TrendingTool[];
    allTools = (toolsResult || []) as Tool[];
    categories = (categoriesResult || []) as Category[];
  } catch {
    // 静默降级到本地数据
  }

  const displayCategories = categories.length > 0 ? categories : categoriesData;
  const displayAllTools = allTools.length > 0 ? allTools : toolsData;
  const displayFeaturedTools = displayAllTools
    .filter((tool) => tool.is_featured ?? tool.isFeatured)
    .slice(0, 8);
  const featuredTools =
    displayFeaturedTools.length > 0 ? displayFeaturedTools : displayAllTools.slice(0, 8);
  const displaySponsoredTools = getSponsoredToolsFromList(displayAllTools, 3);

  return (
    <HomeShowcase
      allTools={displayAllTools}
      featuredTools={featuredTools}
      trendingTools={trending}
      categories={displayCategories}
      editorPicks={editorPicks}
      sponsoredTools={displaySponsoredTools}
    />
  );
}
