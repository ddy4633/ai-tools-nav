// 骨架屏组件库

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
    />
  );
}

// 工具卡片骨架屏
export function ToolCardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-soft border border-border-light">
      <div className="flex items-start justify-between mb-3">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-4/5 mb-4" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-20 rounded" />
        <Skeleton className="h-4 w-4" />
      </div>
    </div>
  );
}

// 工具列表骨架屏
export function ToolsListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ToolCardSkeleton key={i} />
      ))}
    </div>
  );
}

// 页面标题骨架屏
export function PageHeaderSkeleton() {
  return (
    <div className="mb-8">
      <Skeleton className="h-10 w-48 mb-2" />
      <Skeleton className="h-5 w-64" />
    </div>
  );
}

// 详情页骨架屏
export function ToolDetailSkeleton() {
  return (
    <div className="animate-pulse">
      <Skeleton className="h-4 w-24 mb-8" />
      <div className="bg-white rounded-2xl p-8 shadow-soft mb-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <Skeleton className="h-10 w-48 mb-2" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-4/5 mb-8" />
        <div className="flex gap-4">
          <Skeleton className="h-12 w-32 rounded-xl" />
          <Skeleton className="h-12 w-32 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
