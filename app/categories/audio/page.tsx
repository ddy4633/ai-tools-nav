import { Metadata } from 'next';
import { getAllTools } from '@/lib/supabase';
import CategoryToolsPage, { filterToolsByKeywords } from '@/components/categories/CategoryToolsPage';

export const metadata: Metadata = {
  title: '音频 AI工具 - 最好的音频人工智能工具 | AI工具导航',
  description: '发现最好的AI音频工具，包括AI音乐生成、语音合成、音频编辑、AI配音等各类人工智能音频处理工具。',
  keywords: ['AI音频', 'AI音乐', '语音合成', 'AI配音', '音频生成'],
};

export const revalidate = 3600;

export default async function AudioCategoryPage() {
  const allTools = await getAllTools();
  const tools = filterToolsByKeywords(allTools, ['音频', 'audio', '音乐', '语音', '配音']);

  return (
    <CategoryToolsPage
      categoryLabel="音频"
      heading="音频 AI工具"
      description="包括 AI 音乐生成、语音合成、音频编辑、AI 配音等。这些工具可以帮助你创作音乐、生成语音和处理音频内容。"
      tools={tools}
      toolsFilterHref="/tools?category=AI音频"
      toolsFilterLabel="查看全部音频工具"
      emptyEmoji="🎵"
      emptyTitle="暂无音频工具数据"
      emptyDescription="请稍后再试或查看其他分类"
    />
  );
}
