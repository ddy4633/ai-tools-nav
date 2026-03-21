import { Metadata } from 'next';
import { getAllTools } from '@/lib/supabase';
import CategoryToolsPage, { filterToolsByKeywords } from '@/components/categories/CategoryToolsPage';

export const metadata: Metadata = {
  title: 'Audio and Voice AI Tools - speech, music, and transcription',
  description: 'Discover AI audio tools for voice generation, transcription, editing, music, and spoken workflows.',
  keywords: ['AI audio tools', 'voice AI', 'transcription AI', 'music generation AI', 'speech tools'],
};

export const revalidate = 3600;

export default async function AudioCategoryPage() {
  const allTools = await getAllTools();
  const tools = filterToolsByKeywords(allTools, ['音频', 'audio', '音乐', '语音', '配音']);

  return (
    <CategoryToolsPage
      categoryLabel="Audio & Voice"
      heading="Audio and voice AI tools"
      description="Includes speech, music, transcription, cleanup, and voice-driven workflow tools."
      tools={tools}
      toolsFilterHref="/tools?category=audio"
      toolsFilterLabel="View all audio tools"
      emptyEmoji="🎵"
      emptyTitle="No audio tools are indexed yet"
      emptyDescription="Please try again later or explore another category."
    />
  );
}
