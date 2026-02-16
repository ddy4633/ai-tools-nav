import Hero from '@/components/home/Hero';
import FeaturedTools from '@/components/home/FeaturedTools';
import Categories from '@/components/home/Categories';
import { getFeaturedTools, getCategories } from '@/lib/supabase';

export const revalidate = 3600; // 每小时重新验证

export default async function Home() {
  const [tools, categories] = await Promise.all([
    getFeaturedTools(8),
    getCategories(),
  ]);

  return (
    <>
      <Hero />
      <FeaturedTools tools={tools} />
      <Categories categories={categories} />
    </>
  );
}
