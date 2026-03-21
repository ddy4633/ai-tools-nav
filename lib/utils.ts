// lib/utils.ts - 工具函数
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatGlobalNumber } from '@/lib/brand';

/**
 * 合并 Tailwind CSS 类名
 * 使用 clsx 进行条件类名合并，再用 tailwind-merge 解决冲突
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 延迟函数
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 格式化数字（添加千位分隔符）
 */
export function formatNumber(num: number): string {
  return formatGlobalNumber(num);
}

/**
 * 截断文本
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * 生成 slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * 获取分类图标颜色
 */
export function getCategoryColor(category: string): string {
  const colorMap: Record<string, string> = {
    '写作': 'text-accent-cool',
    '设计': 'text-accent-warm',
    '图像': 'text-accent-primary',
    '代码': 'text-accent-secondary',
    '音频': 'text-accent-cool',
    '视频': 'text-accent-warm',
    '对话': 'text-accent-primary',
    '知识': 'text-accent-secondary',
  };
  return colorMap[category] || 'text-text-muted';
}
