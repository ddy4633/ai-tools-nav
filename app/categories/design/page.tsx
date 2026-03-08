import { Metadata } from 'next';
import { getAllTools } from '@/lib/supabase';
import CategoryToolsPage, { filterToolsByKeywords } from '@/components/categories/CategoryToolsPage';

export const metadata: Metadata = {
  title: '设计 AI工具 - 最好的设计人工智能工具 | AI工具导航',
  description: '发现最好的AI设计工具，包括UI 设计、创意生成、版式辅助、品牌设计、设计协作等各类人工智能设计助手。',
  keywords: ['AI设计', 'UI设计', '创意生成', '品牌设计', '设计协作'],
};

export const revalidate = 3600;

export default async function DesignCategoryPage() {
  const allTools = await getAllTools();
  const tools = filterToolsByKeywords(allTools, ['设计', 'design', 'ui', 'figma']);

  return (
    <CategoryToolsPage
      categoryLabel="设计"
      heading="设计 AI工具"
      description="包括 UI 设计、创意生成、品牌视觉、设计协作等。这些工具可以帮助设计师更快完成灵感探索与产出。"
      tools={tools}
      toolsFilterHref="/tools?category=AI设计"
      toolsFilterLabel="查看全部设计工具"
      emptyEmoji="🎨"
      emptyTitle="暂无设计工具数据"
      emptyDescription="请稍后再试或查看其他分类"
    />
  );
}
