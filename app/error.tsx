'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">出错了</h2>
        <p className="text-gray-600 mb-6">
          抱歉，页面加载时出现了问题。请稍后重试。
        </p>
        <div className="flex gap-4 justify-center"
        >
          <button
            onClick={reset}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            重试
          </button>
          <a
            href="/"
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            返回首页
          </a>
        </div>
      </div>
    </div>
  );
}
