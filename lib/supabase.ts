import { createClient } from '@supabase/supabase-js';
import { toolsData } from '@/lib/content/tools-data';
import { toolIcons } from '@/lib/content/tool-icons';
import type { Tool, TrendingTool } from '@/types/tool';
import { freshLaunchToolIds, rankFeaturedTools, rankToolsForDiscovery } from '@/lib/tool-ranking';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// 懒加载 Supabase 客户端，避免构建时出错
let supabaseClient: ReturnType<typeof createClient> | null = null;

const toolDetailIndex = new Map<string, Tool>(
  toolsData.map((tool) => [tool.id, tool])
);
const buildIcon = (id: string) => toolIcons[id];

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

  const affiliateUrl = merged.affiliate_url ?? merged.affiliateUrl;
  if (!merged.affiliate_url && affiliateUrl) {
    merged.affiliate_url = affiliateUrl;
  }
  if (!merged.affiliateUrl && affiliateUrl) {
    merged.affiliateUrl = affiliateUrl;
  }

  const sponsorType = merged.sponsor_type ?? merged.sponsorType;
  if (!merged.sponsor_type && sponsorType) {
    merged.sponsor_type = sponsorType;
  }
  if (!merged.sponsorType && sponsorType) {
    merged.sponsorType = sponsorType;
  }

  const sponsorLabel = merged.sponsor_label ?? merged.sponsorLabel;
  if (!merged.sponsor_label && sponsorLabel) {
    merged.sponsor_label = sponsorLabel;
  }
  if (!merged.sponsorLabel && sponsorLabel) {
    merged.sponsorLabel = sponsorLabel;
  }

  const sponsorRank = merged.sponsor_rank ?? merged.sponsorRank;
  if (merged.sponsor_rank == null && sponsorRank != null) {
    merged.sponsor_rank = sponsorRank;
  }
  if (merged.sponsorRank == null && sponsorRank != null) {
    merged.sponsorRank = sponsorRank;
  }

  const sponsorStartAt = merged.sponsor_start_at ?? merged.sponsorStartAt;
  if (merged.sponsor_start_at == null && sponsorStartAt != null) {
    merged.sponsor_start_at = sponsorStartAt;
  }
  if (merged.sponsorStartAt == null && sponsorStartAt != null) {
    merged.sponsorStartAt = sponsorStartAt;
  }

  const sponsorEndAt = merged.sponsor_end_at ?? merged.sponsorEndAt;
  if (merged.sponsor_end_at == null && sponsorEndAt != null) {
    merged.sponsor_end_at = sponsorEndAt;
  }
  if (merged.sponsorEndAt == null && sponsorEndAt != null) {
    merged.sponsorEndAt = sponsorEndAt;
  }

  const isSponsored = merged.is_sponsored ?? merged.isSponsored ?? Boolean(sponsorType);
  if (merged.is_sponsored == null) {
    merged.is_sponsored = isSponsored;
  }
  if (merged.isSponsored == null) {
    merged.isSponsored = isSponsored;
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
  
  return data.map((item) => enrichTool(item));
}

export async function getFeaturedTools(limit = 8) {
  const supabase = getSupabase();
  if (!supabase) {
    return rankFeaturedTools(getMockTools(), limit);
  }

  const { data, error } = await supabase
    .from('tools_view')
    .select('*')
    .eq('is_featured', true);

  if (error || !data || data.length === 0) {
    return rankFeaturedTools(getMockTools(), limit);
  }

  return rankFeaturedTools(data.map((item) => enrichTool(item)), limit);
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

  return rankToolsForDiscovery(data.map((item) => enrichTool(item)));
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
  
  return enrichTool(data);
}

// 模拟热度工具数据
const fallbackTrendingOrder = [
  ...freshLaunchToolIds,
  'codex',
  'claude-code',
  'granola',
  'vapi',
  'wispr-flow',
  'notebooklm',
] as const;

const fallbackTrendingMeta: Record<string, Pick<TrendingTool, 'one_liner' | 'hype_score' | 'viral_coefficient' | 'tier' | 'metrics' | 'install_methods'>> = {
  modelence: {
    one_liner: 'Ship a production-ready full-stack app from a prompt',
    hype_score: 99,
    viral_coefficient: 3.7,
    tier: '🔥 BREAKING',
    metrics: {
      github: { stars: 414, stars_per_day: 31, forks: 41 },
      hackernews: { votes: 402, comments: 118 },
    },
    install_methods: ['☁️ Cloud', '📦 GitHub export'],
  },
  tabstack: {
    one_liner: 'Extract, research, and automate the web in one API call',
    hype_score: 97,
    viral_coefficient: 3.4,
    tier: '🔥 BREAKING',
    metrics: {
      github: { stars: 0, stars_per_day: 0, forks: 0 },
      hackernews: { votes: 362, comments: 114 },
    },
    install_methods: ['☁️ API', '🧩 MCP', '💻 CLI'],
  },
  acti: {
    one_liner: 'Turn the mobile keyboard into an agent that can act, not just type',
    hype_score: 96,
    viral_coefficient: 3.6,
    tier: '🔥 BREAKING',
    metrics: {
      github: { stars: 0, stars_per_day: 0, forks: 0 },
      hackernews: { votes: 418, comments: 121 },
    },
    install_methods: ['📱 iOS', '🤖 Android'],
  },
  'adam-cad-copilot': {
    one_liner: 'AI CAD help inside Onshape and Fusion for real hardware workflows',
    hype_score: 93,
    viral_coefficient: 2.8,
    tier: '⚡ TRENDING',
    metrics: {
      github: { stars: 0, stars_per_day: 0, forks: 0 },
      hackernews: { votes: 276, comments: 74 },
    },
    install_methods: ['🧩 Onshape', '🛠️ Fusion'],
  },
  mailadept: {
    one_liner: 'Fix inbox placement with AI agents plus deliverability experts',
    hype_score: 91,
    viral_coefficient: 2.5,
    tier: '⚡ TRENDING',
    metrics: {
      github: { stars: 0, stars_per_day: 0, forks: 0 },
      hackernews: { votes: 224, comments: 61 },
    },
    install_methods: ['☁️ Subscription service'],
  },
  humalike: {
    one_liner: 'Give agents turn-taking, norms, memory, and social signals',
    hype_score: 89,
    viral_coefficient: 2.9,
    tier: '🚀 NEW',
    metrics: {
      github: { stars: 0, stars_per_day: 0, forks: 0 },
      hackernews: { votes: 432, comments: 155 },
    },
    install_methods: ['☁️ API', '🤝 Design partners'],
  },
  codex: {
    one_liner: 'Delegated coding work with repo context, commands, and reviewable output',
    hype_score: 88,
    viral_coefficient: 2.7,
    tier: '💡 WATCH',
    metrics: {
      github: { stars: 0, stars_per_day: 0, forks: 0 },
      hackernews: { votes: 884, comments: 231 },
    },
    install_methods: ['☁️ Cloud'],
  },
  'claude-code': {
    one_liner: 'Repo-aware coding agent for terminal and IDE workflows',
    hype_score: 87,
    viral_coefficient: 2.6,
    tier: '💡 WATCH',
    metrics: {
      github: { stars: 0, stars_per_day: 0, forks: 0 },
      hackernews: { votes: 742, comments: 198 },
    },
    install_methods: ['💻 Desktop app', '☁️ API'],
  },
  granola: {
    one_liner: 'Stay present in the meeting and let the notes become structured memory',
    hype_score: 86,
    viral_coefficient: 2.4,
    tier: '💡 WATCH',
    metrics: {
      github: { stars: 0, stars_per_day: 0, forks: 0 },
      hackernews: { votes: 388, comments: 96 },
    },
    install_methods: ['💻 Desktop app'],
  },
  vapi: {
    one_liner: 'Build production voice agents instead of stopping at demos',
    hype_score: 85,
    viral_coefficient: 2.4,
    tier: '💡 WATCH',
    metrics: {
      github: { stars: 0, stars_per_day: 0, forks: 0 },
      hackernews: { votes: 312, comments: 84 },
    },
    install_methods: ['☁️ API'],
  },
  'wispr-flow': {
    one_liner: 'Reduce typing friction and turn spoken drafts into polished text',
    hype_score: 84,
    viral_coefficient: 2.2,
    tier: '💡 WATCH',
    metrics: {
      github: { stars: 0, stars_per_day: 0, forks: 0 },
      hackernews: { votes: 274, comments: 73 },
    },
    install_methods: ['💻 Desktop app'],
  },
  notebooklm: {
    one_liner: 'Turn dense sources into briefs, study guides, citations, and audio explainers',
    hype_score: 83,
    viral_coefficient: 2.1,
    tier: '💡 WATCH',
    metrics: {
      github: { stars: 0, stars_per_day: 0, forks: 0 },
      hackernews: { votes: 536, comments: 142 },
    },
    install_methods: ['☁️ Cloud'],
  },
};

function getMockTrendingTools(): TrendingTool[] {
  return fallbackTrendingOrder
    .map((id) => {
      const detail = toolDetailIndex.get(id);
      const meta = fallbackTrendingMeta[id];

      if (!detail || !meta) {
        return null;
      }

      return enrichTool({
        id,
        name: detail.name,
        description: detail.description,
        website: detail.website,
        repo_url: detail.repo_url ?? null,
        category: detail.category,
        categorySlug: detail.categorySlug,
        one_liner: meta.one_liner,
        hype_score: meta.hype_score,
        viral_coefficient: meta.viral_coefficient,
        tier: meta.tier,
        metrics: meta.metrics,
        install_methods: meta.install_methods,
      }) as TrendingTool;
    })
    .filter((tool): tool is TrendingTool => Boolean(tool));
}

function getMockTools(): Tool[] {
  return rankToolsForDiscovery(toolsData.map((tool) => enrichTool({ ...tool })));
}
function getMockCategories() {
  const categoryMeta = [
    { id: '1', name: 'Chatbots', slug: 'chatbot', popularity: 95 },
    { id: '2', name: 'Writing', slug: 'writing', popularity: 85 },
    { id: '3', name: 'Coding', slug: 'code', popularity: 92 },
    { id: '4', name: 'Image', slug: 'image', popularity: 94 },
    { id: '5', name: 'Video', slug: 'video', popularity: 90 },
    { id: '6', name: 'Audio', slug: 'audio', popularity: 82 },
    { id: '7', name: 'Productivity', slug: 'productivity', popularity: 88 },
    { id: '8', name: 'Design', slug: 'design', popularity: 78 },
    { id: '9', name: 'Knowledge', slug: 'knowledge', popularity: 75 },
    { id: '10', name: 'Data', slug: 'data', popularity: 72 },
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
    return { success: false, message: 'Ratings can only be submitted in the browser' };
  }

  if (!toolId) {
    return { success: false, message: 'Missing tool identifier' };
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { success: false, message: 'Rating must be an integer from 1 to 5' };
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
    return { success: false, message: 'Failed to save the rating locally' };
  }
}
