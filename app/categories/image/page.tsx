import { Metadata } from 'next';
import { getAllTools } from '@/lib/supabase';
import CategoryToolsPage, { filterToolsByKeywords } from '@/components/categories/CategoryToolsPage';

export const metadata: Metadata = {
  title: 'Image and Art AI Tools - generation, editing, and creative visuals',
  description: 'Discover AI image tools for generation, editing, enhancement, and creative visual workflows.',
  keywords: ['AI image tools', 'AI art generators', 'image editing AI', 'creative visuals AI', 'photo enhancement AI'],
};

export const revalidate = 3600;

export default async function ImageCategoryPage() {
  const allTools = await getAllTools();
  const tools = filterToolsByKeywords(allTools, ['图像', 'image', '绘画', '图片']);

  return (
    <CategoryToolsPage
      categoryLabel="Image & Art"
      heading="Image and art AI tools"
      description="Includes image generators, editors, enhancers, and visual creation tools for creative teams."
      tools={tools}
      toolsFilterHref="/tools?category=image"
      toolsFilterLabel="View all image tools"
      emptyEmoji="🖼️"
      emptyTitle="No image tools are indexed yet"
      emptyDescription="Please try again later or explore another category."
    />
  );
}
