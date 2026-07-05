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

function mergeCuratedTools(tools: Array<{ id: string }>): Tool[] {
  const merged = new Map<string, Tool>();

  for (const tool of tools) {
    merged.set(tool.id, enrichTool(tool));
  }

  for (const tool of toolsData) {
    if (!merged.has(tool.id)) {
      merged.set(tool.id, enrichTool({ ...tool }));
    }
  }

  return Array.from(merged.values());
}

function mergeTrendingTools(tools: Array<{ id: string } & Partial<TrendingTool> & Partial<Tool>>, limit: number): TrendingTool[] {
  const merged = new Map<string, TrendingTool>(
    getMockTrendingTools().map((tool) => [tool.id, tool])
  );

  for (const tool of tools) {
    const existing = merged.get(tool.id);
    const enriched = enrichTool(tool) as Partial<TrendingTool> & Tool;

    merged.set(
      enriched.id,
      {
        ...(existing ?? {}),
        ...enriched,
        one_liner: enriched.one_liner ?? existing?.one_liner ?? enriched.description,
        hype_score: enriched.hype_score ?? existing?.hype_score ?? 0,
        viral_coefficient: enriched.viral_coefficient ?? existing?.viral_coefficient ?? 0,
        tier: enriched.tier ?? existing?.tier ?? '💡 WATCH',
        metrics: enriched.metrics ?? existing?.metrics ?? {
          github: { stars: 0, stars_per_day: 0, forks: 0 },
        },
        install_methods: enriched.install_methods ?? existing?.install_methods ?? [],
      } as TrendingTool
    );
  }

  return Array.from(merged.values())
    .sort((left, right) => {
      const hypeDelta = (right.hype_score ?? 0) - (left.hype_score ?? 0);
      if (hypeDelta !== 0) {
        return hypeDelta;
      }

      const viralDelta = (right.viral_coefficient ?? 0) - (left.viral_coefficient ?? 0);
      if (viralDelta !== 0) {
        return viralDelta;
      }

      return rankToolsForDiscovery([left, right])[0]?.id === right.id ? 1 : -1;
    })
    .slice(0, limit);
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
    return getMockTrendingTools().slice(0, limit);
  }
  
  const { data, error } = await supabase
    .from('tools_view')
    .select('*')
    .order('hype_score', { ascending: false })
    .limit(limit);
  
  if (error || !data || data.length === 0) {
    return getMockTrendingTools().slice(0, limit);
  }

  return mergeTrendingTools(data, limit);
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

  return rankFeaturedTools(mergeCuratedTools(data), limit);
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

  const remoteCategories = data as Array<{ id: string; name: string; slug: string; count: number; popularity: number }>;
  const localCategories = getMockCategories();
  const localCategoryBySlug = new Map(localCategories.map((category) => [category.slug, category]));

  const mergedCategories = remoteCategories.map((category) => {
    const local = localCategoryBySlug.get(category.slug);
    if (!local) {
      return category;
    }

    localCategoryBySlug.delete(category.slug);
    return {
      ...category,
      count: Math.max(category.count ?? 0, local.count),
      popularity: Math.max(category.popularity ?? 0, local.popularity),
    };
  });

  return [...mergedCategories, ...localCategoryBySlug.values()];
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

  return rankToolsForDiscovery(mergeCuratedTools(data));
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
  workbuddy: {
    one_liner: 'Turn one office prompt into parallel agent execution and deliverables',
    hype_score: 99,
    viral_coefficient: 3.9,
    tier: '🔥 BREAKING',
    metrics: {
      github: { stars: 0, stars_per_day: 0, forks: 0 },
      hackernews: { votes: 295, comments: 64 },
    },
    install_methods: ['☁️ Workspace', '🧠 Multi-agent', '💬 Messaging control'],
  },
  docsalot: {
    one_liner: 'Publish docs that humans and AI agents can both onboard from',
    hype_score: 97,
    viral_coefficient: 3.5,
    tier: '🔥 BREAKING',
    metrics: {
      github: { stars: 0, stars_per_day: 0, forks: 0 },
      hackernews: { votes: 257, comments: 37 },
    },
    install_methods: ['☁️ Hosted docs', '🧩 MCP', '📄 llms.txt'],
  },
  trycase: {
    one_liner: 'Give coding agents disposable Linux desktops and proof bundles',
    hype_score: 95,
    viral_coefficient: 3.2,
    tier: '🔥 BREAKING',
    metrics: {
      github: { stars: 0, stars_per_day: 0, forks: 0 },
      hackernews: { votes: 164, comments: 24 },
    },
    install_methods: ['💻 Disposable desktop', '🧪 Browser testing', '🎥 Proof artifacts'],
  },
  'mentiondrop-mcp': {
    one_liner: 'Feed live market mentions and demand signals into your agent',
    hype_score: 93,
    viral_coefficient: 2.9,
    tier: '⚡ TRENDING',
    metrics: {
      github: { stars: 0, stars_per_day: 0, forks: 0 },
      hackernews: { votes: 160, comments: 17 },
    },
    install_methods: ['🧩 MCP server', '📈 Market signals', '✍️ Reply drafts'],
  },
  circlechat: {
    one_liner: 'Run a visible agent team with channels, kanban, and an LLM judge',
    hype_score: 91,
    viral_coefficient: 2.6,
    tier: '⚡ TRENDING',
    metrics: {
      github: { stars: 29, stars_per_day: 29, forks: 9 },
      hackernews: { votes: 124, comments: 10 },
    },
    install_methods: ['📦 Self-hosted', '☁️ Managed workspace', '🤖 Bring your own model'],
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
