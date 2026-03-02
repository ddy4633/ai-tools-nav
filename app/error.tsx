'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * 全局错误边界组件 - 赛博朋克风格
 */
export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // 记录错误到监控系统
    console.error('Error caught by boundary:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-6">
      <div className="max-w-lg w-full">
        {/* 错误图标 */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-accent-pink/20 blur-xl rounded-full animate-pulse" />
            <div className="relative w-24 h-24 rounded-2xl bg-bg-card border border-border-card flex items-center justify-center">
              <AlertTriangle className="w-12 h-12 text-accent-pink" />
            </div>
          </div>
        </div>

        {/* 错误信息 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-4">
            系统异常
          </h1>
          <p className="text-text-secondary mb-4">
            抱歉，页面加载时遇到了问题
          </p>
          <div className="bg-bg-card border border-border-card rounded-lg p-4 text-left">
            <p className="text-text-muted text-sm font-mono">
              {error.message || 'Unknown error'}
            </p>
            {error.digest && (
              <p className="text-text-muted text-xs mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan rounded-lg hover:bg-accent-cyan/20 transition-all group"
          >
            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            重试
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-bg-card border border-border-card text-text-primary rounded-lg hover:border-accent-warm/30 hover:text-accent-warm transition-all"
          >
            <Home className="w-4 h-4" />
            返回首页
          </Link>
        </div>

        {/* 装饰线条 */}
        <div className="mt-12 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border-card to-transparent" />
          <span className="text-text-muted text-xs">AI Tools Navigator</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border-card to-transparent" />
        </div>
      </div>
    </div>
  );
}
