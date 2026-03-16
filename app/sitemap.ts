import { MetadataRoute } from 'next';
import { getAllTools, getCategories } from '@/lib/supabase';
import { toolsData, categoriesData } from '@/lib/content/tools-data';
import { buildSiteUrl } from '@/lib/site';

export const revalidate = 86400; // 24 hours

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let tools: { id: string; updated_at?: string }[] = [];
  let categories: { slug: string; updated_at?: string }[] = [];

  // Try to fetch from Supabase, fallback to local data
  try {
    const [toolsResult, categoriesResult] = await Promise.all([
      getAllTools(),
      getCategories(),
    ]);
    tools = toolsResult || [];
    categories = categoriesResult || [];
  } catch {
    // 使用本地备用数据
    tools = toolsData.map(t => ({ id: t.id, updated_at: t.updatedAt }));
    categories = categoriesData.map(c => ({ slug: c.slug }));
  }

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: buildSiteUrl('/'),
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: buildSiteUrl('/tools'),
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: buildSiteUrl('/categories'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: buildSiteUrl('/blog'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: buildSiteUrl('/about'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: buildSiteUrl('/advertise'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: buildSiteUrl('/submit'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: buildSiteUrl('/trending'),
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: buildSiteUrl('/privacy'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: buildSiteUrl('/terms'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: buildSiteUrl('/disclosure'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  // Tool detail pages
  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: buildSiteUrl(`/tools/${tool.id}`),
    lastModified: tool.updated_at ? new Date(tool.updated_at) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: buildSiteUrl(`/categories/${category.slug}`),
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  // Blog article pages
  const blogPages: MetadataRoute.Sitemap = [
    {
      url: buildSiteUrl('/blog/deepseek-guide'),
      lastModified: new Date('2026-03-10'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: buildSiteUrl('/blog/ai-art-generators'),
      lastModified: new Date('2026-03-07'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: buildSiteUrl('/blog/ai-writing-tools-free'),
      lastModified: new Date('2026-03-08'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: buildSiteUrl('/blog/chatgpt-china-alternatives'),
      lastModified: new Date('2026-03-12'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: buildSiteUrl('/blog/top-ai-tools-2026'),
      lastModified: new Date('2026-03-03'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  return [...staticPages, ...toolPages, ...categoryPages, ...blogPages];
}
