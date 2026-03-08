import { Metadata } from 'next';
import { getAllTools } from '@/lib/supabase';
import CategoryToolsPage, { filterToolsByKeywords } from '@/components/categories/CategoryToolsPage';

export const metadata: Metadata = {
  title: '写作 AI工具 - 最好的写作人工智能工具 | AI工具导航',
  description: '发现最好的AI写作工具，包括AI文案生成、内容创作、博客写作、营销文案等各类人工智能写作助手。',
  keywords: ['AI写作', 'AI写作工具', '人工智能写作', 'AI文案生成', 'AI内容创作'],
};

export const revalidate = 3600;

export default async function WritingCategoryPage() {
  const allTools = await getAllTools();
  const tools = filterToolsByKeywords(allTools, ['写作', 'writing', '文案', '内容']);

  return (
    <CategoryToolsPage
      categoryLabel="写作"
      heading="写作 AI工具"
      description="包括文案生成、内容创作、博客写作、营销文案等。这些工具可以帮助你快速生成高质量文字内容，提升写作效率。"
      tools={tools}
      toolsFilterHref="/tools?category=AI写作"
      toolsFilterLabel="查看全部写作工具"
      emptyEmoji="📝"
      emptyTitle="暂无写作工具数据"
      emptyDescription="请稍后再试或查看其他分类"
    />
  );
}
