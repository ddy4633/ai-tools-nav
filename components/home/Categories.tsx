'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Folder } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
  popularity: number;
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section className="py-20 bg-bg-primary relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-10"
        >
          <Folder className="w-6 h-6 text-accent-purple" />
          <h2 className="text-2xl font-mono font-bold text-text-primary">CATEGORIES</h2>
          <span className="text-sm font-mono text-text-muted">// browse_by_tag</span>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap gap-3"
        >
          {displayCategories.map((cat) => (
            <motion.div key={cat.id} variants={tagVariants}>
              <Link
                href={`/categories/${cat.slug}`}
                className="group inline-flex items-center gap-2 px-4 py-2 bg-bg-card border border-border-card rounded-lg font-mono text-text-secondary hover:text-accent-cyan hover:border-accent-cyan/50 hover:shadow-glow-cyan transition-all"
              >
                <span>{cat.name}</span>
                <span className="text-xs text-text-muted group-hover:text-accent-cyan/70">
                  [{cat.count}]
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
