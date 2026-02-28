'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 可以在这里发送错误到日志服务
  }, [error]);

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-text-primary mb-4">
          出错了
        </h1>
        
        <p className="text-text-secondary mb-2">
          抱歉，页面加载时出现了问题
        </p>
        
        <p className="text-sm text-text-muted mb-8">
          错误代码: {error.digest || 'UNKNOWN_ERROR'}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent-warm text-white font-medium rounded-xl hover:bg-accent-warm-hover transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            重试
          </button>
          
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border-light text-text-secondary font-medium rounded-xl hover:border-accent-warm hover:text-accent-warm transition-colors"
          >
            <Home className="w-4 h-4" />
            返回首页
          </a>
        </div>
        
        <div className="mt-12 p-4 bg-bg-secondary rounded-xl">
          <p className="text-sm text-text-muted">
            如果问题持续存在，请{' '}
            <a
              href="mailto:hello@ai.poph163.com"
              className="text-accent-warm hover:text-accent-warm-hover"
            >
              联系我们
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
