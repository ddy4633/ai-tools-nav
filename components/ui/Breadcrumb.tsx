// components/ui/Breadcrumb.tsx - 面包屑导航组件
'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  // JSON-LD 结构化数据
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '首页',
        item: 'https://ai.poph163.com'
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        item: item.href ? `https://ai.poph163.com${item.href}` : undefined
      }))
    ]
  };

  return (
    <>
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* 面包屑导航 UI */}
      <nav aria-label="面包屑导航" className={`py-4 ${className}`}>
        <ol className="flex items-center flex-wrap gap-2 text-sm">
          <li>
            <Link 
              href="/" 
              className="flex items-center gap-1 text-text-secondary hover:text-accent-warm transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="sr-only">首页</span>
            </Link>
          </li>
          
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-text-muted" />
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-text-secondary hover:text-accent-warm transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-text-primary font-medium" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

// 预设的面包屑配置
export const breadcrumbPresets = {
  tools: { label: '全部工具', href: '/tools' },
  categories: { label: '分类浏览', href: '/categories' },
  about: { label: '关于我们', href: '/about' },
  submit: { label: '提交工具', href: '/submit' },
  blog: { label: '博客', href: '/blog' },
};
