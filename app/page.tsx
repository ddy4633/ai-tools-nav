import type { Metadata } from 'next';
import HomeShowcase from '@/components/home/HomeShowcase';
import { editorPicks, toolsData, categoriesData } from '@/lib/content/tools-data';
import { getSponsoredToolsFromList } from '@/lib/monetization/sponsored';
import { getAllTools, getCategories, getTrendingTools } from '@/lib/supabase';
import type { Category, Tool, TrendingTool } from '@/types/tool';
import { buildSiteUrl, siteConfig } from '@/lib/site';
import { brandConfig } from '@/lib/brand';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `${brandConfig.siteName} - Curated AI Tools for English, German, Japanese, and Korean Markets`,
  description: siteConfig.siteDescription,
  keywords: [
    'AI tools directory',
    'global AI tools',
    'AI launch feed',
    'AI coding tools',
    'AI writing tools',
    'AI video tools',
    'AI design tools',
    'ChatGPT alternatives',
    'Cursor alternatives',
    'AI tool reviews',
  ],
  alternates: {
    canonical: buildSiteUrl('/'),
  },
  openGraph: {
    title: `${brandConfig.siteName} - Curated AI tools and launch-ready discovery`,
    description: siteConfig.ogDescription,
    url: buildSiteUrl('/'),
    siteName: brandConfig.siteName,
    locale: brandConfig.locale,
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
  const displayFeaturedTools = [...displayAllTools]
    .filter((tool) => tool.is_featured ?? tool.isFeatured)
    .sort((left, right) => {
      const leftTime = Date.parse(left.updatedAt ?? left.createdAt ?? '1970-01-01');
      const rightTime = Date.parse(right.updatedAt ?? right.createdAt ?? '1970-01-01');
      return rightTime - leftTime;
    })
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
