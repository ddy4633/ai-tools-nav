import Link from 'next/link';
import { NewsletterForm } from '@/components/newsletter-form';

export default function Footer() {
  return (
    <footer className="bg-text-primary text-text-muted">
      {/* Newsletter Section */}
      <div className="border-b border-text-secondary/20">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-bg-primary mb-2">订阅 AI 工具周报</h3>
              <p className="text-text-muted">
                每周精选最新 AI 工具、行业动态和独家评测，助你保持技术前沿
              </p>
            </div>
            <div>
              <NewsletterForm variant="minimal" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* 品牌 */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg font-bold text-bg-primary mb-4">好工具</h3>
            <p className="text-sm text-text-muted mb-4">
              发现最好用的 AI 工具，基于真实用户评价和热度排行
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/ddy4633/ai-tools-nav"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-bg-primary transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* 导航 */}
          <div>
            <h4 className="text-sm font-semibold text-bg-primary mb-4">导航</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-bg-primary transition-colors">首页</Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-bg-primary transition-colors">全部工具</Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-bg-primary transition-colors">分类浏览</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-bg-primary transition-colors">博客</Link>
              </li>
            </ul>
          </div>

          {/* 资源 */}
          <div>
            <h4 className="text-sm font-semibold text-bg-primary mb-4">资源</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/submit" className="hover:text-bg-primary transition-colors">提交工具</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-bg-primary transition-colors">关于我们</Link>
              </li>
              <li>
                <a
                  href="mailto:hello@ai.poph163.com"
                  className="hover:text-bg-primary transition-colors"
                >联系我们</a>
              </li>
            </ul>
          </div>

          {/* 法律 */}
          <div>
            <h4 className="text-sm font-semibold text-bg-primary mb-4">法律</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-bg-primary transition-colors">隐私政策</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-bg-primary transition-colors">使用条款</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 底部版权 */}
        <div className="pt-8 border-t border-text-secondary/20 text-xs text-center text-text-muted">
          <p>© {new Date().getFullYear()} 好工具. 用心推荐每一款工具。</p>
          <p className="mt-1">Made with ❤️ for AI enthusiasts</p>
        </div>
      </div>
    </footer>
  );
}
