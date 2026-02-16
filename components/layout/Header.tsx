import Link from 'next/link';
import { Search, Menu } from 'lucide-react';

export default function Header() {
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
            <button className="md:hidden">
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
