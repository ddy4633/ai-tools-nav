import { MetadataRoute } from 'next';
import { getAllTools, getCategories } from '@/lib/supabase';
import { toolsData, categoriesData } from '@/lib/content/tools-data';

export const revalidate = 86400; // 24 hours

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://ai.poph163.com';

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
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/submit`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/trending`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  // Tool detail pages
  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.id}`,
    lastModified: tool.updated_at ? new Date(tool.updated_at) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  // Blog article pages
  const blogPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog/deepseek-guide`,
      lastModified: new Date('2024-02-28'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog/ai-art-generators`,
      lastModified: new Date('2024-03-01'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog/ai-writing-tools-free`,
      lastModified: new Date('2024-03-05'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog/chatgpt-china-alternatives`,
      lastModified: new Date('2024-03-08'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  return [...staticPages, ...toolPages, ...categoryPages, ...blogPages];
}
