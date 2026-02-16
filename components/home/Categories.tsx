'use client';

import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
  popularity: number;  // 0-100
}

interface CategoriesProps {
  categories?: Category[];
}

const defaultCategories: Category[] = [
  { id: '1', name: 'AI写作', slug: 'writing', count: 120, popularity: 95 },
  { id: '2', name: 'AI图像', slug: 'image', count: 85, popularity: 90 },
  { id: '3', name: 'AI编程', slug: 'code', count: 64, popularity: 85 },
  { id: '4', name: 'AI聊天', slug: 'chatbot', count: 56, popularity: 88 },
  { id: '5', name: 'AI音频', slug: 'audio', count: 42, popularity: 70 },
  { id: '6', name: 'AI视频', slug: 'video', count: 38, popularity: 75 },
  { id: '7', name: '设计助手', slug: 'design', count: 35, popularity: 65 },
  { id: '8', name: '效率工具', slug: 'productivity', count: 48, popularity: 80 },
  { id: '9', name: '知识管理', slug: 'knowledge', count: 28, popularity: 60 },
  { id: '10', name: '数据分析', slug: 'data', count: 32, popularity: 55 },
];

export default function Categories({ categories = [] }: CategoriesProps) {
  const displayCategories = categories.length > 0 ? categories : defaultCategories;
  
  // 根据 popularity 计算字号
  const getFontSize = (popularity: number) => {
    if (popularity >= 90) return 'text-lg';
    if (popularity >= 70) return 'text-base';
    return 'text-sm';
  };

  return (
    <section className="py-16 bg-bg-primary">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-medium text-text-primary mb-8">
          按分类浏览
        </h2>
        
        <div className="flex flex-wrap gap-3">
          {displayCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className={`px-4 py-2 bg-white border border-border-light rounded-lg text-text-secondary hover:text-accent-warm hover:border-accent-warm hover:shadow-soft transition-all ${getFontSize(cat.popularity)}`}
            >
              {cat.name}
              <span className="ml-2 text-xs text-text-muted">({cat.count})</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
