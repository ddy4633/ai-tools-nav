import { Metadata } from 'next';
import { getAllTools } from '@/lib/supabase';
import CategoryToolsPage, { filterToolsByKeywords } from '@/components/categories/CategoryToolsPage';

export const metadata: Metadata = {
  title: 'AI Video Tools - generation, editing, and motion workflows',
  description: 'Discover AI video tools for generation, editing, animation, and motion-heavy content workflows.',
  keywords: ['AI video tools', 'video generation AI', 'animation AI', 'motion graphics AI', 'video editing AI'],
};

export const revalidate = 3600;

export default async function VideoCategoryPage() {
  const allTools = await getAllTools();
  const tools = filterToolsByKeywords(allTools, ['视频', 'video', '剪辑', '字幕']);

  return (
    <CategoryToolsPage
      categoryLabel="Video Generation"
      heading="AI video tools"
      description="Includes generators, editors, animation tools, and products for motion-driven content creation."
      tools={tools}
      toolsFilterHref="/tools?category=video"
      toolsFilterLabel="View all AI video tools"
      emptyEmoji="🎬"
      emptyTitle="No AI video tools are indexed yet"
      emptyDescription="Please try again later or explore another category."
    />
  );
}
