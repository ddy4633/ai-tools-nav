import { Metadata } from 'next';
import { getAllTools } from '@/lib/supabase';
import CategoryToolsPage, { filterToolsByKeywords } from '@/components/categories/CategoryToolsPage';

export const metadata: Metadata = {
  title: '生产力 AI工具 - 最好的生产力人工智能工具 | AI工具导航',
  description: '发现最好的AI生产力工具，包括会议总结、任务管理、自动化办公、工作流增强、协同提效等各类人工智能效率助手。',
  keywords: ['AI生产力', '效率工具', '办公自动化', '任务管理', '工作流'],
};

export const revalidate = 3600;

export default async function ProductivityCategoryPage() {
  const allTools = await getAllTools();
  const tools = filterToolsByKeywords(allTools, ['生产力', 'productivity', '效率', '办公']);

  return (
    <CategoryToolsPage
      categoryLabel="生产力"
      heading="生产力 AI工具"
      description="包括会议总结、自动化办公、工作流增强、协作提效等。这些工具可以帮助团队减少重复劳动，提高日常执行效率。"
      tools={tools}
      toolsFilterHref="/tools?category=AI生产力"
      toolsFilterLabel="查看全部生产力工具"
      emptyEmoji="⚡"
      emptyTitle="暂无生产力工具数据"
      emptyDescription="请稍后再试或查看其他分类"
    />
  );
}
