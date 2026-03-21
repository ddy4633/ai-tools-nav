import { Metadata } from 'next';
import { getAllTools } from '@/lib/supabase';
import CategoryToolsPage, { filterToolsByKeywords } from '@/components/categories/CategoryToolsPage';

export const metadata: Metadata = {
  title: 'AI Writing Tools - copy, content, and editorial workflows',
  description: 'Discover AI writing tools for copy generation, rewriting, blog production, and editorial work.',
  keywords: ['AI writing tools', 'AI copywriting', 'content tools', 'editorial AI', 'marketing writing AI'],
};

export const revalidate = 3600;

export default async function WritingCategoryPage() {
  const allTools = await getAllTools();
  const tools = filterToolsByKeywords(allTools, ['写作', 'writing', '文案', '内容']);

  return (
    <CategoryToolsPage
      categoryLabel="AI Writing"
      heading="AI writing tools"
      description="Includes copy generators, rewriting tools, blog assistants, and marketing writing systems."
      tools={tools}
      toolsFilterHref="/tools?category=writing"
      toolsFilterLabel="View all AI writing tools"
      emptyEmoji="📝"
      emptyTitle="No AI writing tools are indexed yet"
      emptyDescription="Please try again later or explore another category."
    />
  );
}
