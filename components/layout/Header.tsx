'use client';

import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">AI</span>
            </div>
            <span className="font-bold text-xl text-gray-900">工具导航</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/tools" className="text-gray-600 hover:text-gray-900">全部工具</Link>
            <Link href="/categories" className="text-gray-600 hover:text-gray-900">分类</Link>
            <Link href="/blog" className="text-gray-600 hover:text-gray-900">博客</Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <Link
              href="/tools"
              className="hidden md:flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>搜索</span>
            </Link>
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "关闭菜单" : "打开菜单"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>
        
        {/* 移动端菜单 */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/tools" 
                  className="block text-gray-600 hover:text-gray-900 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  全部工具
                </Link>
              </li>
              <li>
                <Link 
                  href="/categories" 
                  className="block text-gray-600 hover:text-gray-900 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  分类
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className="block text-gray-600 hover:text-gray-900 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  博客
                </Link>
              </li>
              <li className="pt-2 border-t">
                <Link 
                  href="/tools"
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Search className="w-4 h-4" />
                  <span>搜索工具</span>
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
