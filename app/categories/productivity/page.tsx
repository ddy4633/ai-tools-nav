import { Metadata } from 'next';
import { getAllTools } from '@/lib/supabase';
import CategoryToolsPage, { filterToolsByKeywords } from '@/components/categories/CategoryToolsPage';

export const metadata: Metadata = {
  title: 'AI Productivity Tools - meetings, ops, and workflow compression',
  description: 'Discover AI productivity tools for meetings, operations, automation, and workflow compression.',
  keywords: ['AI productivity tools', 'workflow AI', 'meeting assistant AI', 'automation AI', 'ops tools'],
};

export const revalidate = 3600;

export default async function ProductivityCategoryPage() {
  const allTools = await getAllTools();
  const tools = filterToolsByKeywords(allTools, ['生产力', 'productivity', '效率', '办公']);

  return (
    <CategoryToolsPage
      categoryLabel="Productivity"
      heading="AI productivity tools"
      description="Includes meeting assistants, ops tools, automation layers, and workflow-compression products."
      tools={tools}
      toolsFilterHref="/tools?category=productivity"
      toolsFilterLabel="View all productivity tools"
      emptyEmoji="⚡"
      emptyTitle="No productivity tools are indexed yet"
      emptyDescription="Please try again later or explore another category."
    />
  );
}
