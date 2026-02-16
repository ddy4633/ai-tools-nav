import Hero from '@/components/home/Hero';
import TrendingTools from '@/components/home/TrendingTools';
import FeaturedTools from '@/components/home/FeaturedTools';
import Categories from '@/components/home/Categories';
import { getTrendingTools, getFeaturedTools, getCategories } from '@/lib/supabase';

export const revalidate = 3600; // 每小时重新验证

export default async function Home() {
  const [trending, tools, categories] = await Promise.all([
    getTrendingTools(10),  // 获取热度最高的10个
    getFeaturedTools(8),
    getCategories(),
  ]);

  return (
    <>
      <Hero />
      <TrendingTools tools={trending} />
      <FeaturedTools tools={tools} />
      <Categories categories={categories} />
    </>
  );
}
