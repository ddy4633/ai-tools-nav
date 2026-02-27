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
    <section className="py-24 md:py-32 bg-bg-primary">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl">
          {/* 标题 - 更现代的设计 */}
          <h1 className="text-3xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">
            发现真正好用的
            <span className="text-accent-warm">AI工具</span>
          </h1>
          
          {/* 副标题 - 更人味 */}
          <p className="text-lg text-text-secondary mb-8 leading-relaxed">
            这里收集了我们真正用过、觉得好用的工具。<br className="hidden md:block" />
            没有广告，只有真诚的推荐。
          </p>
          
          {/* 搜索框 - 优化设计 */}
          <form onSubmit={handleSearch} className="relative max-w-lg">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索 AI 工具..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-4 pr-28 bg-white border-2 border-border-light rounded-2xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-warm focus:ring-4 focus:ring-accent-warm/10 transition-all shadow-sm"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-accent-warm text-white font-medium rounded-xl hover:bg-accent-warm-hover active:scale-95 transition-all shadow-md hover:shadow-lg"
              >
                搜索
              </button>
            </div>
          </form>
          
          {/* 快捷标签 */}
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="text-sm text-text-muted">热门搜索:</span>
            {quickTags.map((tag) => (
              <a
                key={tag}
                href={`/tools?search=${encodeURIComponent(tag)}`}
                className="px-3 py-1 text-sm text-text-secondary bg-bg-secondary border border-border-light rounded-full hover:bg-accent-warm hover:text-white hover:border-accent-warm transition-all"
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
