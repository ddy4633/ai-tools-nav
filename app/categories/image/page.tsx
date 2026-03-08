import { Metadata } from 'next';
import { getAllTools } from '@/lib/supabase';
import CategoryToolsPage, { filterToolsByKeywords } from '@/components/categories/CategoryToolsPage';

export const metadata: Metadata = {
  title: '图像 AI工具 - 最好的图像人工智能工具 | AI工具导航',
  description: '发现最好的AI图像工具，包括AI绘画、图片生成、修图、抠图、视觉创作等各类人工智能图像助手。',
  keywords: ['AI图像', 'AI绘画', '图片生成', '修图', '视觉创作'],
};

export const revalidate = 3600;

export default async function ImageCategoryPage() {
  const allTools = await getAllTools();
  const tools = filterToolsByKeywords(allTools, ['图像', 'image', '绘画', '图片']);

  return (
    <CategoryToolsPage
      categoryLabel="图像"
      heading="图像 AI工具"
      description="包括 AI 绘画、图片生成、修图、抠图等。这些工具适合设计师、营销团队和内容创作者快速产出视觉素材。"
      tools={tools}
      toolsFilterHref="/tools?category=AI图像"
      toolsFilterLabel="查看全部图像工具"
      emptyEmoji="🖼️"
      emptyTitle="暂无图像工具数据"
      emptyDescription="请稍后再试或查看其他分类"
    />
  );
}
