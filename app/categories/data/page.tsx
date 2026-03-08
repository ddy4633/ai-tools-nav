import { Metadata } from 'next';
import { getAllTools } from '@/lib/supabase';
import CategoryToolsPage, { filterToolsByKeywords } from '@/components/categories/CategoryToolsPage';

export const metadata: Metadata = {
  title: '数据 AI工具 - 最好的数据人工智能工具 | AI工具导航',
  description: '发现最好的AI数据工具，包括数据分析、可视化、BI、表格处理、智能洞察等各类人工智能数据助手。',
  keywords: ['AI数据', '数据分析', '数据可视化', 'BI', '智能洞察'],
};

export const revalidate = 3600;

export default async function DataCategoryPage() {
  const allTools = await getAllTools();
  const tools = filterToolsByKeywords(allTools, ['数据', 'data', '分析', '表格']);

  return (
    <CategoryToolsPage
      categoryLabel="数据"
      heading="数据 AI工具"
      description="包括数据分析、表格处理、商业智能、智能洞察等。这些工具可以帮助你更快理解数据并产出可执行结论。"
      tools={tools}
      toolsFilterHref="/tools?category=AI数据"
      toolsFilterLabel="查看全部数据工具"
      emptyEmoji="📊"
      emptyTitle="暂无数据工具数据"
      emptyDescription="请稍后再试或查看其他分类"
    />
  );
}
