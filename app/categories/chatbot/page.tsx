import { Metadata } from 'next';
import { getAllTools } from '@/lib/supabase';
import CategoryToolsPage, { filterToolsByKeywords } from '@/components/categories/CategoryToolsPage';

export const metadata: Metadata = {
  title: 'AI Chat Tools - assistants, copilots, and conversational workflows',
  description: 'Discover AI chat tools for research, assistants, customer support, and conversational workflows.',
  keywords: ['AI chat tools', 'AI assistant', 'conversational AI', 'chatbot tools', 'research assistants'],
};

export const revalidate = 3600;

export default async function ChatbotCategoryPage() {
  const allTools = await getAllTools();
  const tools = filterToolsByKeywords(allTools, ['聊天', 'chat', '对话', '助手']);

  return (
    <CategoryToolsPage
      categoryLabel="AI Chat"
      heading="AI chat tools"
      description="Includes conversational assistants, research copilots, support bots, and long-context chat products."
      tools={tools}
      toolsFilterHref="/tools?category=chatbot"
      toolsFilterLabel="View all AI chat tools"
      emptyEmoji="🤖"
      emptyTitle="No AI chat tools are indexed yet"
      emptyDescription="Please try again later or explore another category."
    />
  );
}
