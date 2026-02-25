import { Metadata } from 'next';
import { getAllTools, getCategories } from '@/lib/supabase';
import ToolsClient from './ToolsClient';

export const metadata: Metadata = {
  title: '全部 AI 工具 - 好工具',
  description: '发现 100+ 最好用的 AI 工具，包括 AI 写作、图像生成、代码助手、聊天机器人等。',
};

export const revalidate = 3600;

export default async function ToolsPage() {
  const [tools, categories] = await Promise.all([
    getAllTools(),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            全部 AI 工具
          </h1>
          <p className="text-text-secondary">
            共 {tools.length} 个工具，持续更新中...
          </p>
        </div>

        {/* 客户端组件（搜索+筛选） */}
        <ToolsClient tools={tools} categories={categories} />
      </div>
    </div>
  );
}
