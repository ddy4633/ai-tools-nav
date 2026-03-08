import { Metadata } from 'next';
import { getAllTools } from '@/lib/supabase';
import CategoryToolsPage, { filterToolsByKeywords } from '@/components/categories/CategoryToolsPage';

export const metadata: Metadata = {
  title: '视频 AI工具 - 最好的视频人工智能工具 | AI工具导航',
  description: '发现最好的AI视频工具，包括视频生成、剪辑、口播、数字人、字幕处理等各类人工智能视频助手。',
  keywords: ['AI视频', '视频生成', 'AI剪辑', '数字人', '字幕处理'],
};

export const revalidate = 3600;

export default async function VideoCategoryPage() {
  const allTools = await getAllTools();
  const tools = filterToolsByKeywords(allTools, ['视频', 'video', '剪辑', '字幕']);

  return (
    <CategoryToolsPage
      categoryLabel="视频"
      heading="视频 AI工具"
      description="包括视频生成、剪辑、字幕处理、口播和数字人等。这些工具适合做短视频、品牌宣传和内容生产提效。"
      tools={tools}
      toolsFilterHref="/tools?category=AI视频"
      toolsFilterLabel="查看全部视频工具"
      emptyEmoji="🎬"
      emptyTitle="暂无视频工具数据"
      emptyDescription="请稍后再试或查看其他分类"
    />
  );
}
