import Link from 'next/link';
import { NewsletterForm } from '@/components/newsletter-form';

export default function Footer() {
  return (
    <footer className="bg-text-primary text-text-muted py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Newsletter Section */}
        <div className="mb-10 pb-10 border-b border-text-secondary/20">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-medium text-bg-primary mb-2">订阅 AI 工具周报</h3>
            <p className="text-sm mb-4">每周精选最新 AI 工具和行业动态</p>
            <NewsletterForm variant="minimal" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* 左侧 */}
          <div>
            <h3 className="text-lg font-medium text-bg-primary mb-2">好工具</h3>
            <p className="text-sm">收集真正好用的工具，真诚推荐。</p>
          </div>
          
          {/* 右侧链接 */}
          <div className="flex items-center gap-6 text-sm">
            <Link href="/about" className="hover:text-bg-primary transition-colors">
              关于我们
            </Link>
            <Link href="/submit" className="hover:text-bg-primary transition-colors">
              提交工具
            </Link>
            <a 
              href="mailto:hello@poph163.com" 
              className="hover:text-bg-primary transition-colors"
            >
              联系我们
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-text-secondary/20 text-xs text-center">
          <p>© 2025 好工具. 用心推荐每一款工具。</p>
        </div>
      </div>
    </footer>
  );
}
