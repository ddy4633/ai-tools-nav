import { Metadata } from 'next';
import { getAllTools } from '@/lib/supabase';
import CategoryToolsPage, { filterToolsByKeywords } from '@/components/categories/CategoryToolsPage';

export const metadata: Metadata = {
  title: 'Research and Knowledge AI Tools - memory, notes, and retrieval',
  description: 'Discover AI knowledge tools for memory systems, documents, retrieval, note-taking, and research.',
  keywords: ['AI knowledge tools', 'research AI', 'note AI', 'retrieval AI', 'memory tools'],
};

export const revalidate = 3600;

export default async function KnowledgeCategoryPage() {
  const allTools = await getAllTools();
  const tools = filterToolsByKeywords(allTools, ['知识', 'knowledge', '笔记', '文档']);

  return (
    <CategoryToolsPage
      categoryLabel="Research & Knowledge"
      heading="Research and knowledge AI tools"
      description="Includes memory systems, document tools, retrieval products, and research assistants."
      tools={tools}
      toolsFilterHref="/tools?category=knowledge"
      toolsFilterLabel="View all research tools"
      emptyEmoji="📚"
      emptyTitle="No research tools are indexed yet"
      emptyDescription="Please try again later or explore another category."
    />
  );
}
