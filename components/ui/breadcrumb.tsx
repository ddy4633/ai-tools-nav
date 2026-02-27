'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="面包屑导航" className="py-4">
      <ol className="flex items-center flex-wrap text-sm text-text-muted">
        <li className="flex items-center">
          <Link 
            href="/" 
            className="flex items-center hover:text-accent-warm transition-colors"
            aria-label="首页"
          >
            <Home className="w-4 h-4" />
          </Link>
        </li>
        
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="w-4 h-4 mx-2 text-text-muted/50" />
            {item.href ? (
              <Link 
                href={item.href}
                className="hover:text-accent-warm transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-text-primary font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
