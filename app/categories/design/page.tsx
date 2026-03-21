import { Metadata } from 'next';
import { getAllTools } from '@/lib/supabase';
import CategoryToolsPage, { filterToolsByKeywords } from '@/components/categories/CategoryToolsPage';

export const metadata: Metadata = {
  title: 'AI Design Tools - UI, creative direction, and concept work',
  description: 'Discover AI design tools for UI, prototyping, concept exploration, and visual direction.',
  keywords: ['AI design tools', 'UI design AI', 'prototype AI', 'creative direction AI', 'visual concept AI'],
};

export const revalidate = 3600;

export default async function DesignCategoryPage() {
  const allTools = await getAllTools();
  const tools = filterToolsByKeywords(allTools, ['设计', 'design', 'ui', 'figma']);

  return (
    <CategoryToolsPage
      categoryLabel="Design"
      heading="AI design tools"
      description="Includes UI copilots, prototype builders, creative layout tools, and design acceleration products."
      tools={tools}
      toolsFilterHref="/tools?category=design"
      toolsFilterLabel="View all AI design tools"
      emptyEmoji="🎨"
      emptyTitle="No AI design tools are indexed yet"
      emptyDescription="Please try again later or explore another category."
    />
  );
}
