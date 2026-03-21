import { Metadata } from 'next';
import { getAllTools } from '@/lib/supabase';
import CategoryToolsPage, { filterToolsByKeywords } from '@/components/categories/CategoryToolsPage';

export const metadata: Metadata = {
  title: 'AI Coding Tools - code generation, refactors, and dev copilots',
  description: 'Discover AI coding tools for generation, autocomplete, refactoring, debugging, and developer workflows.',
  keywords: ['AI coding tools', 'code generation', 'developer copilot', 'AI refactoring', 'coding assistants'],
};

export const revalidate = 3600;

export default async function CodeCategoryPage() {
  const allTools = await getAllTools();
  const tools = filterToolsByKeywords(allTools, ['编程', 'code', 'coding', '开发']);

  return (
    <CategoryToolsPage
      categoryLabel="AI Coding"
      heading="AI coding tools"
      description="Includes coding copilots, refactor assistants, debugging tools, and products built for real development loops."
      tools={tools}
      toolsFilterHref="/tools?category=code"
      toolsFilterLabel="View all AI coding tools"
      emptyEmoji="💻"
      emptyTitle="No AI coding tools are indexed yet"
      emptyDescription="Please try again later or explore another category."
    />
  );
}
