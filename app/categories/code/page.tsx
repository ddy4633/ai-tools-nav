import { Metadata } from 'next';
import { getAllTools } from '@/lib/supabase';
import CategoryToolsPage, { filterToolsByKeywords } from '@/components/categories/CategoryToolsPage';

export const metadata: Metadata = {
  title: '编程 AI工具 - 最好的编程人工智能工具 | AI工具导航',
  description: '发现最好的AI编程工具，包括代码生成、代码补全、Bug 修复、AI IDE、自动化开发等各类人工智能开发助手。',
  keywords: ['AI编程', '代码生成', '代码补全', 'AI IDE', '开发助手'],
};

export const revalidate = 3600;

export default async function CodeCategoryPage() {
  const allTools = await getAllTools();
  const tools = filterToolsByKeywords(allTools, ['编程', 'code', 'coding', '开发']);

  return (
    <CategoryToolsPage
      categoryLabel="编程"
      heading="编程 AI工具"
      description="包括代码生成、代码补全、AI IDE、Bug 修复等。这些工具可以帮助开发者提升编码效率和交付速度。"
      tools={tools}
      toolsFilterHref="/tools?category=AI编程"
      toolsFilterLabel="查看全部编程工具"
      emptyEmoji="💻"
      emptyTitle="暂无编程工具数据"
      emptyDescription="请稍后再试或查看其他分类"
    />
  );
}
