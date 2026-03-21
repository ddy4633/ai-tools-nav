// components/ui/Breadcrumb.tsx - 面包屑导航组件
'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { buildSiteUrl } from '@/lib/site';

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
        name: 'Home',
        item: buildSiteUrl('/')
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        item: item.href ? buildSiteUrl(item.href) : undefined
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
      <nav aria-label="Breadcrumb" className={`py-4 ${className}`}>
        <ol className="flex items-center flex-wrap gap-2 text-sm">
          <li>
            <Link 
              href="/" 
              className="flex items-center gap-1 text-text-secondary hover:text-accent-warm transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="sr-only">Home</span>
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
  tools: { label: 'Tools', href: '/tools' },
  categories: { label: 'Categories', href: '/categories' },
  about: { label: 'About', href: '/about' },
  submit: { label: 'Submit', href: '/submit' },
  blog: { label: 'Editorial', href: '/blog' },
};
