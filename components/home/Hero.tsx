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

  return (
    <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          发现最好用的 AI 工具
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
          1000+ AI 工具，涵盖写作、图像、代码、音频等领域
          <br />
          帮你提升 10 倍效率
        </p>
        
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
          <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden">
            <input
              type="text"
              placeholder="搜索 AI 工具..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-6 py-4 text-gray-800 outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 font-medium transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>
        
        <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
          {['ChatGPT', 'Midjourney', 'Claude', 'Notion AI'].map((tag) => (
            <a
              key={tag}
              href={`/tools?search=${tag}`}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-colors"
            >
              {tag}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
