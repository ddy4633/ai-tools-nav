'use client';

import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-bg-secondary rounded ${className}`}
      style={{
        background: 'linear-gradient(90deg, #1a1a2e 25%, #252542 50%, #1a1a2e 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
      }}
    />
  );
}

// Featured Tools Skeleton
export function FeaturedToolsSkeleton() {
  return (
    <section className="py-20 bg-bg-secondary relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-purple/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-24" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-bg-card border border-border-card rounded-xl p-5">
              <div className="flex items-start gap-4 mb-4">
                <Skeleton className="w-12 h-12 rounded-lg flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-4" />
              <div className="pt-4 border-t border-border-subtle">
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Trending Tools Skeleton
export function TrendingToolsSkeleton() {
  return (
    <section className="py-20 bg-bg-primary relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-pink/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-6 w-24" />
        </div>
        
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-bg-card border border-border-card rounded-xl p-5">
              <div className="flex items-start gap-4">
                <Skeleton className="w-10 h-10 rounded-lg flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                    <Skeleton className="h-8 w-16" />
                  </div>
                  <div className="flex gap-4">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Categories Skeleton
export function CategoriesSkeleton() {
  return (
    <section className="py-20 bg-bg-secondary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-24" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-bg-card border border-border-card rounded-xl p-6">
              <Skeleton className="w-12 h-12 rounded-lg mb-4" />
              <Skeleton className="h-5 w-24 mb-2" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Editor Picks Skeleton
export function EditorPicksSkeleton() {
  return (
    <section className="py-20 bg-bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-24" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main featured card */}
          <div className="lg:col-span-2 bg-bg-card border border-border-card rounded-xl p-6">
            <div className="flex items-start gap-6">
              <Skeleton className="w-20 h-20 rounded-xl flex-shrink-0" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex gap-2 pt-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Side cards */}
          <div className="space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="bg-bg-card border border-border-card rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-12 h-12 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Newsletter Skeleton
export function NewsletterSkeleton() {
  return (
    <section className="py-16 bg-bg-primary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <Skeleton className="h-8 w-64 mx-auto mb-4" />
        <Skeleton className="h-4 w-full max-w-lg mx-auto mb-8" />
        <div className="flex gap-3 max-w-md mx-auto">
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 w-32" />
        </div>
      </div>
    </section>
  );
}

// Tool Card Skeleton Grid for tools page
interface ToolCardSkeletonGridProps {
  count?: number;
}

export function ToolCardSkeletonGrid({ count = 9 }: ToolCardSkeletonGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-bg-card rounded-xl p-6 border border-border-card">
          <div className="flex items-start gap-4 mb-4">
            <Skeleton className="w-12 h-12 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-4" />
          <div className="pt-3 border-t border-bg-primary">
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}
