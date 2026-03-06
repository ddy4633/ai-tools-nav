import { createClient } from '@supabase/supabase-js';
import { toolsData } from '@/lib/content/tools-data';
import { toolIcons } from '@/lib/content/tool-icons';
import type { Tool } from '@/types/tool';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// 懒加载 Supabase 客户端，避免构建时出错
let supabaseClient: ReturnType<typeof createClient> | null = null;

const toolDetailIndex = new Map<string, Tool>(
  toolsData.map((tool) => [tool.id, tool])
);
const buildIcon = (id: string) => toolIcons[id] || `/tool-icons/${id}.svg`;

function enrichTool<T extends { id: string }>(tool: T): T & Tool {
  const detail = toolDetailIndex.get(tool.id);
  const merged = { ...tool, ...detail } as T & Tool;
  const pricingType = merged.pricing_type || merged.pricingType;

  if (!merged.pricing_type && pricingType) {
    merged.pricing_type = pricingType;
  }
  if (!merged.pricingType && pricingType) {
    merged.pricingType = pricingType;
  }
  if (!merged.icon) {
    merged.icon = buildIcon(tool.id);
  }
  if (!merged.average_rating && merged.editorRating) {
    merged.average_rating = merged.editorRating;
  }

  return merged;
}

export const getSupabase = () => {
  if (!supabaseClient && supabaseUrl && supabaseKey) {
    supabaseClient = createClient(supabaseUrl, supabaseKey);
  }
  return supabaseClient;
};

export async function getTrendingTools(limit = 10) {
  const supabase = getSupabase();
  if (!supabase) {
    return getMockTrendingTools();
  }
  
  const { data, error } = await supabase
    .from('tools_view')
    .select('*')
    .order('hype_score', { ascending: false })
    .limit(limit);
  
  if (error || !data || data.length === 0) {
    return getMockTrendingTools();
  }
  
  return data;
}

export async function getFeaturedTools(limit = 8) {
  const supabase = getSupabase();
  if (!supabase) {
    return getMockTools();
  }
  
  const { data, error } = await supabase
    .from('tools_view')
    .select('*')
    .eq('is_featured', true)
    .limit(limit);
  
  if (error || !data || data.length === 0) {
    return getMockTools();
  }
  
  return data;
}

export async function getCategories() {
  const supabase = getSupabase();
  if (!supabase) {
    return getMockCategories();
  }
  
  const { data, error } = await supabase
    .from('categories_view')
    .select('*');
  
  if (error || !data) {
    return getMockCategories();
  }
  
  return data;
}

// 获取所有工具
export async function getAllTools(): Promise<Tool[]> {
  const supabase = getSupabase();
  if (!supabase) {
    return getMockTools();
  }
  
  const { data, error } = await supabase
    .from('tools_view')
    .select('*')
    .order('name', { ascending: true });
  
  if (error || !data || data.length === 0) {
    return getMockTools();
  }
  
  return data;
}

// 根据 ID 获取工具
export async function getToolById(id: string): Promise<Tool | null> {
  const supabase = getSupabase();
  if (!supabase) {
    const mockTools = getMockTools();
    return mockTools.find(t => t.id === id) || null;
  }
  
  const { data, error } = await supabase
    .from('tools_view')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error || !data) {
    const mockTools = getMockTools();
    return mockTools.find(t => t.id === id) || null;
  }
  
  return data;
}

// 模拟热度工具数据
function getMockTrendingTools() {
  const tools = [
    {
      id: 'lovable',
      name: 'Lovable',
      description: '用自然语言直接生成可部署的全栈应用',
      one_liner: '用自然语言直接生成可部署的全栈应用',
      website: 'https://lovable.dev',
      repo_url: 'https://github.com/lovable/lovable',
      hype_score: 98,
      viral_coefficient: 3.5,
      tier: '🔥 BREAKING',
      metrics: {
        github: { stars: 25000, stars_per_day: 800, forks: 1200 },
        hackernews: { votes: 512, comments: 128 }
      },
      install_methods: ['☁️ 云端', '🐳 Docker'],
      category: 'AI编程'
    },
    {
      id: 'cursor',
      name: 'Cursor',
      description: 'AI原生代码编辑器，Composer多文件编辑革新编程体验',
      one_liner: 'AI原生代码编辑器，Composer多文件编辑革新编程体验',
      website: 'https://cursor.sh',
      repo_url: null,
      hype_score: 96,
      viral_coefficient: 3.2,
      tier: '🔥 BREAKING',
      metrics: {
        github: { stars: 0, stars_per_day: 0, forks: 0 },
        hackernews: { votes: 890, comments: 234 }
      },
      install_methods: ['💻 客户端'],
      category: 'AI编程'
    },
    {
      id: 'deepseek',
      name: 'DeepSeek',
      description: '国产AI黑马，推理能力顶尖，完全免费',
      one_liner: '国产AI黑马，推理能力顶尖，完全免费',
      website: 'https://chat.deepseek.com',
      repo_url: 'https://github.com/deepseek-ai/DeepSeek-R1',
      hype_score: 95,
      viral_coefficient: 4.0,
      tier: '🔥 BREAKING',
      metrics: {
        github: { stars: 65000, stars_per_day: 2500, forks: 8500 },
        hackernews: { votes: 1200, comments: 456 }
      },
      install_methods: ['☁️ 云端', '📦 API'],
      category: 'AI聊天'
    },
    {
      id: 'sora',
      name: 'Sora',
      description: 'OpenAI视频生成模型，生成质量和一致性顶尖',
      one_liner: 'OpenAI视频生成模型，生成质量和一致性顶尖',
      website: 'https://openai.com/sora',
      repo_url: null,
      hype_score: 94,
      viral_coefficient: 2.8,
      tier: '🔥 BREAKING',
      metrics: {
        github: { stars: 0, stars_per_day: 0, forks: 0 },
        hackernews: { votes: 678, comments: 189 }
      },
      install_methods: ['☁️ 云端'],
      category: 'AI视频'
    },
    {
      id: 'felvin',
      name: 'Felvin',
      description: '用文字编辑图片，像修图师一样对话',
      one_liner: '用文字编辑图片，像修图师一样对话',
      website: 'https://felvin.com',
      repo_url: 'https://github.com/felvin/felvin',
      hype_score: 88,
      viral_coefficient: 2.4,
      tier: '⚡ TRENDING',
      metrics: {
        github: { stars: 8900, stars_per_day: 420, forks: 680 },
        hackernews: { votes: 289, comments: 67 }
      },
      install_methods: ['☁️ 云端', '🐳 Docker', '📦 pip'],
      category: 'AI图像'
    },
    {
      id: 'flux',
      name: 'FLUX',
      description: 'Black Forest Labs出品，开源图像生成新标杆',
      one_liner: 'Black Forest Labs出品，开源图像生成新标杆',
      website: 'https://flux-ai.io',
      repo_url: null,
      hype_score: 87,
      viral_coefficient: 2.1,
      tier: '⚡ TRENDING',
      metrics: {
        github: { stars: 12000, stars_per_day: 350, forks: 890 },
        hackernews: { votes: 345, comments: 89 }
      },
      install_methods: ['☁️ 云端', '📦 pip'],
      category: 'AI图像'
    },
    {
      id: 'tldraw',
      name: 'tldraw',
      description: '画个草图，直接生成可用代码',
      one_liner: '画个草图，直接生成可用代码',
      website: 'https://tldraw.com',
      repo_url: 'https://github.com/tldraw/tldraw',
      hype_score: 86,
      viral_coefficient: 2.2,
      tier: '⚡ TRENDING',
      metrics: {
        github: { stars: 35000, stars_per_day: 580, forks: 2100 },
        hackernews: { votes: 456, comments: 98 }
      },
      install_methods: ['☁️ 云端', '📦 npm', '🐳 Docker'],
      category: 'AI编程'
    },
    {
      id: 'kling-video',
      name: '可灵AI视频',
      description: '快手出品的AI视频生成工具，国产视频生成标杆',
      one_liner: '快手出品的AI视频生成工具，国产视频生成标杆',
      website: 'https://klingai.com',
      repo_url: null,
      hype_score: 85,
      viral_coefficient: 2.5,
      tier: '⚡ TRENDING',
      metrics: {
        github: { stars: 0, stars_per_day: 0, forks: 0 },
        hackernews: { votes: 234, comments: 56 }
      },
      install_methods: ['☁️ 云端'],
      category: 'AI视频'
    },
    {
      id: 'synclabs',
      name: 'Sync Labs',
      description: '给任意视频换嘴型，让任何人说任何话',
      one_liner: '给任意视频换嘴型，让任何人说任何话',
      website: 'https://synclabs.so',
      repo_url: 'https://github.com/synclabs/sync',
      hype_score: 82,
      viral_coefficient: 1.9,
      tier: '🚀 NEW',
      metrics: {
        github: { stars: 5800, stars_per_day: 280, forks: 420 },
        hackernews: { votes: 189, comments: 67 }
      },
      install_methods: ['☁️ API', '🐳 Docker'],
      category: 'AI视频'
    },
    {
      id: 'suno',
      name: 'Suno',
      description: '描述风格，AI给你生成完整歌曲',
      one_liner: '描述风格，AI给你生成完整歌曲',
      website: 'https://suno.com',
      repo_url: 'https://github.com/suno/suno',
      hype_score: 80,
      viral_coefficient: 1.6,
      tier: '🚀 NEW',
      metrics: {
        github: { stars: 3200, stars_per_day: 180, forks: 250 },
        hackernews: { votes: 156, comments: 45 }
      },
      install_methods: ['☁️ 云端'],
      category: 'AI音频'
    }
  ];

  return tools.map(enrichTool);
}

function getMockTools(): Tool[] {
  return toolsData.map((tool) => enrichTool({ ...tool }));
}
function getMockCategories() {
  const categoryMeta = [
    { id: '1', name: 'AI聊天', slug: 'chatbot', popularity: 95 },
    { id: '2', name: 'AI写作', slug: 'writing', popularity: 85 },
    { id: '3', name: 'AI编程', slug: 'code', popularity: 92 },
    { id: '4', name: 'AI图像', slug: 'image', popularity: 94 },
    { id: '5', name: 'AI视频', slug: 'video', popularity: 90 },
    { id: '6', name: 'AI音频', slug: 'audio', popularity: 82 },
    { id: '7', name: '效率工具', slug: 'productivity', popularity: 88 },
    { id: '8', name: '设计助手', slug: 'design', popularity: 78 },
    { id: '9', name: '知识管理', slug: 'knowledge', popularity: 75 },
    { id: '10', name: '数据分析', slug: 'data', popularity: 72 },
  ];

  return categoryMeta.map((category) => ({
    ...category,
    count: toolsData.filter((tool) => (tool.categorySlug || tool.category_slug) === category.slug).length,
  }));
}
// 提交评分
export async function submitRating(
  toolId: string,
  rating: number
): Promise<{ success: boolean; message?: string }> {
  if (typeof window === 'undefined') {
    return { success: false, message: '仅支持在浏览器中评分' };
  }

  if (!toolId) {
    return { success: false, message: '缺少工具标识' };
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { success: false, message: '评分需为 1-5 的整数' };
  }

  try {
    const storageKey = 'toolRatings';
    let data: Record<string, { rating: number; updatedAt: string }> = {};
    const raw = window.localStorage.getItem(storageKey);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          data = parsed as Record<string, { rating: number; updatedAt: string }>;
        }
      } catch {
        data = {};
      }
    }

    data[toolId] = { rating, updatedAt: new Date().toISOString() };
    window.localStorage.setItem(storageKey, JSON.stringify(data));

    return { success: true };
  } catch (error) {
    console.error('提交评分失败:', error);
    return { success: false, message: '本地保存失败' };
  }
}
