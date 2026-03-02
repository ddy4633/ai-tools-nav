// components/ui/Skeleton.tsx - 赛博朋克风格骨架屏组件
'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

/**
 * 基础骨架屏组件 - 赛博朋克脉冲效果
 */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-bg-card',
        'bg-gradient-to-r from-bg-card via-border-card to-bg-card',
        'bg-[length:200%_100%]',
        'animate-shimmer',
        className
      )}
      style={{
        backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 100%)',
      }}
    />
  );
}

/**
 * 工具卡片骨架屏
 */
export function ToolCardSkeleton() {
  return (
    <div className="group bg-bg-card border border-border-card rounded-xl p-5 hover:border-accent-cool/30 transition-all">
      {/* 头部：图标和标题 */}
      <div className="flex items-start gap-3 mb-4">
        <Skeleton className="w-12 h-12 rounded-lg flex-shrink-0" />
        <div className="flex-1 min-w-0 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>

      {/* 描述 */}
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-4" />

      {/* 标签和价格 */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}

/**
 * 热门工具卡片骨架屏
 */
export function TrendingToolCardSkeleton() {
  return (
    <div className="group block bg-white rounded-xl p-6 shadow-soft border border-transparent">
      <div className="flex items-start gap-4">
        {/* 排名 */}
        <Skeleton className="w-12 h-12 rounded-lg flex-shrink-0 bg-gray-200" />

        <div className="flex-1 min-w-0 space-y-3">
          {/* 标题和热度 */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-32 bg-gray-200" />
              <Skeleton className="h-5 w-16 rounded bg-gray-200" />
            </div>
            <Skeleton className="h-4 w-20 bg-gray-200" />
          </div>

          {/* 描述 */}
          <Skeleton className="h-4 w-full bg-gray-200" />
          <Skeleton className="h-4 w-4/5 bg-gray-200" />

          {/* 指标 */}
          <div className="flex items-center gap-4 pt-2">
            <Skeleton className="h-3 w-24 bg-gray-200" />
            <Skeleton className="h-3 w-20 bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 分类卡片骨架屏
 */
export function CategoryCardSkeleton() {
  return (
    <div className="group bg-bg-card border border-border-card rounded-xl p-6 hover:border-accent-warm/30 transition-all">
      <div className="flex items-center gap-4 mb-4">
        <Skeleton className="w-12 h-12 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
      <Skeleton className="h-4 w-full" />
    </div>
  );
}

/**
 * 博客文章骨架屏
 */
export function BlogPostSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-soft">
      <Skeleton className="w-full h-48 bg-gray-200" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-4 w-24 bg-gray-200" />
        <Skeleton className="h-6 w-full bg-gray-200" />
        <Skeleton className="h-4 w-5/6 bg-gray-200" />
      </div>
    </div>
  );
}

/**
 * 工具详情页骨架屏
 */
export function ToolDetailSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
      {/* 头部 */}
      <div className="flex items-start gap-6">
        <Skeleton className="w-20 h-20 rounded-2xl" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-32" />
          <div className="flex gap-2 pt-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </div>
      </div>

      {/* 内容区 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

/**
 * 骨架屏列表容器
 */
interface SkeletonListProps {
  count?: number;
  children: React.ReactNode;
  className?: string;
}

export function SkeletonList({ count = 4, children, className }: SkeletonListProps) {
  return (
    <div className={cn('grid gap-6', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>{children}</div>
      ))}
    </div>
  );
}

export default Skeleton;

/**
 * FeaturedToolsSkeleton - 精选工具骨架屏
 */
export function FeaturedToolsSkeleton() {
  return (
    <div className="py-16 bg-bg-secondary">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <Skeleton className="h-8 w-48 mx-auto mb-4" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ToolCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * TrendingToolsSkeleton - 热门工具骨架屏
 */
export function TrendingToolsSkeleton() {
  return (
    <div className="py-16 bg-bg-primary">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <Skeleton className="h-8 w-48 mx-auto mb-4" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <TrendingToolCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * CategoriesSkeleton - 分类骨架屏
 */
export function CategoriesSkeleton() {
  return (
    <div className="py-16 bg-bg-secondary">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <Skeleton className="h-8 w-48 mx-auto mb-4" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <CategoryCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * EditorPicksSkeleton - 编辑精选骨架屏
 */
export function EditorPicksSkeleton() {
  return (
    <div className="py-16 bg-bg-primary">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <Skeleton className="h-8 w-48 mx-auto mb-4" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-bg-card border border-border-card rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-4">
                <Skeleton className="w-12 h-12 rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="flex items-center gap-3 pt-4">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * NewsletterSkeleton - 订阅区域骨架屏
 */
export function NewsletterSkeleton() {
  return (
    <div className="py-16 bg-bg-secondary">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-gradient-to-r from-accent-purple/10 to-accent-cyan/10 border border-border-card rounded-2xl p-8 md:p-12">
          <div className="text-center space-y-6">
            <Skeleton className="h-8 w-64 mx-auto" />
            <Skeleton className="h-4 w-96 mx-auto" />
            <Skeleton className="h-4 w-80 mx-auto" />
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4">
              <Skeleton className="h-12 flex-1 rounded-lg" />
              <Skeleton className="h-12 w-32 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * ToolCardSkeletonGrid - 工具卡片网格骨架屏
 */
export function ToolCardSkeletonGrid({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ToolCardSkeleton key={i} />
      ))}
    </div>
  );
}
