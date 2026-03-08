import { Metadata } from 'next';
import { getAllTools } from '@/lib/supabase';
import CategoryToolsPage, { filterToolsByKeywords } from '@/components/categories/CategoryToolsPage';

export const metadata: Metadata = {
  title: '聊天机器人 AI工具 - 最好的聊天机器人人工智能工具 | AI工具导航',
  description: '发现最好的AI聊天机器人工具，包括AI对话、智能助手、AI客服、聊天机器人等各类人工智能对话工具。',
  keywords: ['AI聊天', '聊天机器人', 'AI对话', '人工智能聊天', '智能助手'],
};

export const revalidate = 3600;

export default async function ChatbotCategoryPage() {
  const allTools = await getAllTools();
  const tools = filterToolsByKeywords(allTools, ['聊天', 'chat', '对话', '助手']);

  return (
    <CategoryToolsPage
      categoryLabel="聊天机器人"
      heading="聊天机器人 AI工具"
      description="包括AI对话、智能助手、AI客服等。这些工具可以提供智能对话服务，帮助解答问题和完成任务。"
      tools={tools}
      toolsFilterHref="/tools?category=AI聊天"
      toolsFilterLabel="查看全部聊天工具"
      emptyEmoji="🤖"
      emptyTitle="暂无聊天机器人数据"
      emptyDescription="请稍后再试或查看其他分类"
    />
  );
}
