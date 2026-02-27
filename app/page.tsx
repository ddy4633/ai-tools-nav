import Hero from '@/components/home/Hero';
import TrendingTools from '@/components/home/TrendingTools';
import FeaturedTools from '@/components/home/FeaturedTools';
import EditorPicks from '@/components/home/EditorPicks';
import Categories from '@/components/home/Categories';
import NewsletterSection from '@/components/home/NewsletterSection';
import { getTrendingTools, getFeaturedTools, getCategories } from '@/lib/supabase';
import { editorPicks, toolsData, categoriesData } from '@/lib/content/tools-data';
import type { Metadata } from 'next';

export const revalidate = 3600; // 每小时重新验证

// 页面SEO优化
export const metadata: Metadata = {
  title: '好工具 - 发现真正好用的AI工具',
  description: '精选AI聊天、AI写作、AI编程、AI图像等领域的高效工具。每个工具都经过真实使用测试，提供详细评测、优缺点分析和价格对比。',
  keywords: ['AI工具', 'AI聊天', 'AI写作', 'AI编程', 'AI图像', '效率工具', '工具推荐', '软件评测'],
  alternates: {
    canonical: 'https://ai.poph163.com',
  },
  openGraph: {
    title: '好工具 - 发现真正好用的AI工具',
    description: '精选AI工具，真实评测，帮你找到最适合的效率工具',
    url: 'https://ai.poph163.com',
    siteName: '好工具',
    locale: 'zh_CN',
    type: 'website',
    images: [{
      url: 'https://ai.poph163.com/og-image.png',
      width: 1200,
      height: 630,
      alt: '好工具 - AI工具导航站',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '好工具 - 发现真正好用的AI工具',
    description: '精选AI工具，真实评测，帮你找到最适合的效率工具',
    images: ['https://ai.poph163.com/og-image.png'],
  },
};

export default async function Home() {
  const [trending, tools, categories] = await Promise.all([
    getTrendingTools(10),  // 获取热度最高的10个
    getFeaturedTools(8),
    getCategories(),
  ]);

  // 使用本地数据作为备用
  const displayCategories = categories?.length > 0 ? categories : categoriesData;

  return (
    <>
      <Hero />
      <EditorPicks picks={editorPicks} />
      <TrendingTools tools={trending} />
      <FeaturedTools tools={tools} />
      <Categories categories={displayCategories} />
      <NewsletterSection />
    </>
  );
}
