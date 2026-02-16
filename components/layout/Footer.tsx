import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">AI</span>
              </div>
              <span className="font-bold text-xl text-white">工具导航</span>
            </div>
            <p className="text-sm">发现最好用的 AI 工具，提升工作效率。</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">导航</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tools" className="hover:text-white">全部工具</Link></li>
              <li><Link href="/categories" className="hover:text-white">分类</Link></li>
              <li><Link href="/blog" className="hover:text-white">博客</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">热门分类</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/categories/writing" className="hover:text-white">AI写作</Link></li>
              <li><Link href="/categories/image" className="hover:text-white">AI图像</Link></li>
              <li><Link href="/categories/code" className="hover:text-white">AI编程</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">关于</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white">关于我们</Link></li>
              <li><Link href="/contact" className="hover:text-white">联系我们</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>© 2025 AI工具导航. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  );
}
