'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/tools?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const quickTags = ['ChatGPT', 'Claude', 'Midjourney', 'Notion'];

  return (
    <section className="py-20 md:py-28 bg-bg-primary">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl">
          {/* 标题 - 手写风格 */}
          <h1 className="text-4xl md:text-5xl font-medium text-text-primary mb-6 leading-tight">
            「好工具，<br />
            值得被看见」
          </h1>
          
          {/* 副标题 - 更人味 */}
          <p className="text-lg text-text-secondary mb-8 leading-relaxed">
            这里收集了我们真正用过、觉得好用的工具。<br className="hidden md:block" />
            没有广告，只有真诚的推荐。
          </p>
          
          {/* 搜索框 - 简化 */}
          <form onSubmit={handleSearch} className="relative max-w-lg">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索工具..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3.5 pr-24 bg-white border border-border-medium rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-warm focus:ring-2 focus:ring-accent-warm/20 transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-accent-warm text-white text-sm rounded-md hover:bg-accent-warm-hover transition-colors"
              >
                搜索
              </button>
            </div>
          </form>
          
          {/* 快捷标签 */}
          <div className="mt-6 flex flex-wrap gap-2">
            {quickTags.map((tag) => (
              <a
                key={tag}
                href={`/tools?search=${encodeURIComponent(tag)}`}
                className="px-3 py-1 text-sm text-text-secondary bg-border-light rounded-full hover:bg-border-medium hover:text-text-primary transition-colors"
              >
                {tag}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
