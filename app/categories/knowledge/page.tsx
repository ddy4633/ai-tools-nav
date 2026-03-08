import { Metadata } from 'next';
import { getAllTools } from '@/lib/supabase';
import CategoryToolsPage, { filterToolsByKeywords } from '@/components/categories/CategoryToolsPage';

export const metadata: Metadata = {
  title: '知识 AI工具 - 最好的知识人工智能工具 | AI工具导航',
  description: '发现最好的AI知识工具，包括知识库、笔记增强、文档问答、信息检索、知识管理等各类人工智能知识助手。',
  keywords: ['AI知识', '知识库', '文档问答', '知识管理', '信息检索'],
};

export const revalidate = 3600;

export default async function KnowledgeCategoryPage() {
  const allTools = await getAllTools();
  const tools = filterToolsByKeywords(allTools, ['知识', 'knowledge', '笔记', '文档']);

  return (
    <CategoryToolsPage
      categoryLabel="知识"
      heading="知识 AI工具"
      description="包括知识库、笔记增强、文档问答、信息检索等。这些工具适合团队沉淀知识资产并提高检索效率。"
      tools={tools}
      toolsFilterHref="/tools?category=AI知识"
      toolsFilterLabel="查看全部知识工具"
      emptyEmoji="📚"
      emptyTitle="暂无知识工具数据"
      emptyDescription="请稍后再试或查看其他分类"
    />
  );
}
