import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '页面未找到 - 好工具',
  description: '抱歉，您访问的页面不存在。',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-6xl font-bold text-accent-warm mb-4">404</h1>
        <h2 className="text-2xl font-medium text-text-primary mb-4">
          页面未找到
        </h2>
        <p className="text-text-secondary mb-8">
          抱歉，您访问的页面不存在或已被移除。
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-accent-warm text-white font-medium rounded-xl hover:bg-accent-warm-hover transition-colors"
          >
            返回首页
          </Link>
          <Link
            href="/tools"
            className="px-6 py-3 border border-border-light text-text-secondary font-medium rounded-xl hover:border-accent-warm hover:text-accent-warm transition-colors"
          >
            浏览工具
          </Link>
        </div>
      </div>
    </div>
  );
}
