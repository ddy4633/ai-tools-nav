'use client';

import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-bg-primary/95 backdrop-blur-sm border-b border-border-light">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo - 简化风格 */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-medium text-text-primary">
              好工具
            </span>
            <span className="text-xs text-text-muted bg-border-light px-2 py-0.5 rounded">
              beta
            </span>
          </Link>
          
          {/* 桌面导航 - 简化 */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/tools" 
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              全部工具
            </Link>
            <Link 
              href="/categories" 
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              分类
            </Link>
            <Link 
              href="/about" 
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              关于
            </Link>
          </nav>
          
          {/* 右侧操作 */}
          <div className="flex items-center gap-4">
            <Link
              href="/tools"
              className="hidden md:flex items-center gap-2 text-text-secondary hover:text-accent-warm transition-colors"
            >
              <Search className="w-5 h-5" />
            </Link>
            <button 
              className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "关闭菜单" : "打开菜单"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* 移动端菜单 */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border-light">
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/tools" 
                  className="block text-text-secondary hover:text-text-primary py-2 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  全部工具
                </Link>
              </li>
              <li>
                <Link 
                  href="/categories" 
                  className="block text-text-secondary hover:text-text-primary py-2 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  分类
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="block text-text-secondary hover:text-text-primary py-2 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  关于
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
