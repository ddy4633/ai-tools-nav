'use client';

import Link from 'next/link';
import { 
  PenTool, 
  Image, 
  Code, 
  Music, 
  Video, 
  Bot,
  BarChart,
  Globe,
  type LucideIcon 
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  tool_count: number;
}

interface CategoriesProps {
  categories: Category[];
}

const iconMap: Record<string, LucideIcon> = {
  'writing': PenTool,
  'image': Image,
  'code': Code,
  'audio': Music,
  'video': Video,
  'chatbot': Bot,
  'productivity': BarChart,
  'marketing': Globe,
};

export default function Categories({ categories }: CategoriesProps) {
  // 如果没有数据，使用默认分类
  const displayCategories = categories.length > 0 
    ? categories 
    : [
        { id: '1', name: 'AI写作', slug: 'writing', description: '智能写作助手', icon: 'writing', tool_count: 120 },
        { id: '2', name: 'AI图像', slug: 'image', description: '图像生成与编辑', icon: 'image', tool_count: 85 },
        { id: '3', name: 'AI编程', slug: 'code', description: '代码助手与开发工具', icon: 'code', tool_count: 64 },
        { id: '4', name: 'AI音频', slug: 'audio', description: '语音合成与音乐创作', icon: 'audio', tool_count: 42 },
        { id: '5', name: 'AI视频', slug: 'video', description: '视频生成与剪辑', icon: 'video', tool_count: 38 },
        { id: '6', name: 'AI聊天', slug: 'chatbot', description: '智能对话机器人', icon: 'chatbot', tool_count: 56 },
      ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          按分类浏览
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          探索 20+ 个 AI 工具分类，找到适合你需求的工具
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {displayCategories.map((category) => {
            const IconComponent = iconMap[category.icon] || Bot;
            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group bg-white rounded-xl p-6 text-center border border-gray-100 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 mx-auto mb-4 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors"
                >
                  <IconComponent className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{category.description}</p>
                <span className="text-xs text-gray-400">
                  {category.tool_count} 个工具
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
