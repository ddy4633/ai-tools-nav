// components/ui/Skeleton.tsx - 骨架屏组件
'use client';

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ className = '', style }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-border-light rounded ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

// 工具卡片骨架屏
export function ToolCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-border-light p-5">
      <div className="flex items-start gap-4 mb-4">
        <Skeleton className="w-12 h-12 rounded-lg flex-shrink-0" />
        <div className="flex-1">
          <Skeleton className="h-5 w-24 mb-2" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-4" />
      
      <div className="flex items-center justify-between pt-4 border-t border-bg-primary">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
}

// 工具卡片骨架屏网格
export function ToolCardSkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ToolCardSkeleton key={i} />
      ))}
    </div>
  );
}

// Hero骨架屏
export function HeroSkeleton() {
  return (
    <section className="py-20 md:py-28 bg-bg-primary">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl">
          <Skeleton className="h-12 w-3/4 mb-6" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-2/3 mb-8" />
          
          <Skeleton className="h-12 w-full max-w-lg mb-6 rounded-lg" />
          
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20 rounded-full" />
            <Skeleton className="h-8 w-16 rounded-full" />
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-16 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

// 分类云骨架屏
export function CategoryCloudSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="flex flex-wrap gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton 
          key={i} 
          className="h-10 rounded-lg"
          style={{ width: `${60 + Math.random() * 80}px` }}
        />
      ))}
    </div>
  );
}

// 编辑精选骨架屏
export function EditorPickSkeleton() {
  return (
    <div className="bg-bg-secondary rounded-xl p-6">
      <ToolCardSkeleton />
      <div className="mt-4 pt-4 border-t border-border-light flex items-center gap-3">
        <Skeleton className="w-8 h-8 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  );
}

// 页面内容骨架屏
export function PageContentSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/5" />
      <div className="pt-4">
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
    </div>
  );
}
