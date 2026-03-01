'use client';

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ className = '', style }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-bg-hover rounded ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

// 工具卡片骨架屏 - Cyberpunk 风格
export function ToolCardSkeleton() {
  return (
    <div className="bg-bg-card rounded-xl border border-border-card p-5">
      <div className="flex items-start gap-4 mb-4">
        <Skeleton className="w-12 h-12 rounded-lg flex-shrink-0 bg-bg-primary" />
        <div className="flex-1">
          <Skeleton className="h-5 w-24 mb-2 bg-bg-primary" />
          <Skeleton className="h-4 w-12 bg-bg-primary" />
        </div>
      </div>
      <Skeleton className="h-4 w-full mb-2 bg-bg-primary" />
      <Skeleton className="h-4 w-3/4 mb-4 bg-bg-primary" />
      
      <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
        <Skeleton className="h-3 w-16 bg-bg-primary" />
        <Skeleton className="h-3 w-20 bg-bg-primary" />
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
    <section className="py-24 md:py-40 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <Skeleton className="h-8 w-32 mb-8 rounded-full bg-bg-card" />
          <Skeleton className="h-16 w-3/4 mb-6 bg-bg-card" />
          <Skeleton className="h-6 w-full mb-4 bg-bg-card" />
          <Skeleton className="h-6 w-2/3 mb-12 bg-bg-card" />
          
          <Skeleton className="h-16 w-full max-w-2xl mb-6 rounded-xl bg-bg-card" />
          
          <div className="flex gap-3">
            <Skeleton className="h-8 w-20 rounded" />
            <Skeleton className="h-8 w-16 rounded" />
            <Skeleton className="h-8 w-24 rounded" />
            <Skeleton className="h-8 w-20 rounded" />
            <Skeleton className="h-8 w-16 rounded" />
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
          className="h-10 rounded-lg bg-bg-card"
          style={{ width: `${60 + Math.random() * 80}px` }}
        />
      ))}
    </div>
  );
}

// 编辑精选骨架屏
export function EditorPickSkeleton() {
  return (
    <div className="bg-bg-secondary rounded-xl p-6 border border-border-card">
      <ToolCardSkeleton />
      <div className="mt-4 pt-4 border-t border-border-subtle flex items-center gap-3">
        <Skeleton className="w-8 h-8 rounded-full bg-bg-primary" />
        <div className="flex-1">
          <Skeleton className="h-4 w-full mb-1 bg-bg-primary" />
          <Skeleton className="h-3 w-20 bg-bg-primary" />
        </div>
      </div>
    </div>
  );
}

// 页面内容骨架屏
export function PageContentSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-1/3 bg-bg-card" />
      <Skeleton className="h-4 w-full bg-bg-card" />
      <Skeleton className="h-4 w-5/6 bg-bg-card" />
      <Skeleton className="h-4 w-4/5 bg-bg-card" />
      <div className="pt-4">
        <Skeleton className="h-32 w-full rounded-xl bg-bg-card" />
      </div>
    </div>
  );
}

// 三列网格骨架屏
export function ThreeColumnGridSkeleton({ count = 9 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ToolCardSkeleton key={i} />
      ))}
    </div>
  );
}

// 分类卡片骨架屏
export function CategoryCardSkeleton() {
  return (
    <div className="bg-bg-card rounded-xl p-6 border border-border-card">
      <div className="flex items-center gap-4 mb-4">
        <Skeleton className="w-12 h-12 rounded-lg bg-bg-primary" />
        <div className="flex-1">
          <Skeleton className="h-6 w-24 mb-2 bg-bg-primary" />
          <Skeleton className="h-4 w-16 bg-bg-primary" />
        </div>
      </div>
      <Skeleton className="h-4 w-full bg-bg-primary" />
    </div>
  );
}
