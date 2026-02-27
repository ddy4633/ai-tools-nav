import Hero from '@/components/home/Hero';
import TrendingTools from '@/components/home/TrendingTools';
import FeaturedTools from '@/components/home/FeaturedTools';
import EditorPicks from '@/components/home/EditorPicks';
import Categories from '@/components/home/Categories';
import NewsletterSection from '@/components/home/NewsletterSection';
import { getTrendingTools, getFeaturedTools, getCategories } from '@/lib/supabase';
import { editorPicks, toolsData, categoriesData } from '@/lib/content/tools-data';
import type { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: '_TOOLS // Next-Gen AI Tools Directory',
  description: 'Curated collection of the best AI and developer tools. Discover next-generation utilities for coding, design, and productivity.',
  keywords: ['AI tools', 'developer tools', 'productivity', 'code utilities', 'tech stack'],
  alternates: {
    canonical: 'https://ai.poph163.com',
  },
  openGraph: {
    title: '_TOOLS // Next-Gen AI Tools Directory',
    description: 'Curated collection of the best AI and developer tools',
    url: 'https://ai.poph163.com',
    siteName: '_TOOLS',
    locale: 'zh_CN',
    type: 'website',
  },
};

export default async function Home() {
  let trending: any[] = [];
  let tools: any[] = [];
  let categories: any[] = [];

  try {
    const [trendingResult, toolsResult, categoriesResult] = await Promise.all([
      getTrendingTools(5),
      getFeaturedTools(8),
      getCategories(),
    ]);
    trending = trendingResult || [];
    tools = toolsResult || [];
    categories = categoriesResult || [];
  } catch (error) {
    console.error('Failed to fetch data:', error);
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
