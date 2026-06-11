import { createClient } from '@supabase/supabase-js';
import { toolsData } from '@/lib/content/tools-data';
import { toolIcons } from '@/lib/content/tool-icons';
import { sortToolsByFreshness } from '@/lib/content/tool-freshness';
import type { Tool } from '@/types/tool';

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
    return getMockTrendingTools(limit);
  }
  
  const { data, error } = await supabase
    .from('tools_view')
    .select('*')
    .order('hype_score', { ascending: false })
    .limit(limit);
  
  if (error || !data || data.length === 0) {
    return getMockTrendingTools(limit);
  }
  
  return data.map((item) => enrichTool(item));
}

export async function getFeaturedTools(limit = 8) {
  const supabase = getSupabase();
  if (!supabase) {
    return getMockFeaturedTools(limit);
  }
  
  const { data, error } = await supabase
    .from('tools_view')
    .select('*')
    .eq('is_featured', true)
    .limit(limit);
  
  if (error || !data || data.length === 0) {
    return getMockFeaturedTools(limit);
  }
  
  return data.map((item) => enrichTool(item));
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
  
  return data.map((item) => enrichTool(item));
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
function getMockTrendingTools(limit = 10) {
  const tools = [
    {
      id: 'browser-use',
      name: 'Browser Use',
      description: '把浏览器真正交给 AI Agent，网页自动化、Skills 和隐身浏览器一体推进',
      one_liner: '浏览器 Agent 基础设施，正在把“会操作网站”变成标准能力',
      website: 'https://browser-use.com',
      repo_url: 'https://github.com/browser-use/browser-use',
      hype_score: 98,
      viral_coefficient: 3.8,
      tier: '🔥 BREAKING',
      metrics: {
        github: { stars: 84853, stars_per_day: 980, forks: 7600 },
        hackernews: { votes: 612, comments: 184 }
      },
      install_methods: ['📦 pip', '☁️ 云端'],
      category: 'AI编程'
    },
    {
      id: 'claude-4',
      name: 'Claude 4',
      description: 'Anthropic 新一代模型家族，代码、推理、Agent 和长任务能力明显前进',
      one_liner: '不是简单聊天升级，而是更适合真实工作交付的模型层',
      website: 'https://claude.ai',
      repo_url: null,
      hype_score: 96,
      viral_coefficient: 3.4,
      tier: '🔥 BREAKING',
      metrics: {
        github: { stars: 0, stars_per_day: 0, forks: 0 },
        hackernews: { votes: 740, comments: 205 }
      },
      install_methods: ['☁️ 云端', '📦 API', '💻 IDE'],
      category: 'AI聊天'
    },
    {
      id: 'google-flow',
      name: 'Google Flow',
      description: 'Google 的 AI 影视制作工具，镜头控制、场景扩展和素材管理更完整',
      one_liner: '视频生成正从 demo 走向创作者工作台',
      website: 'https://labs.google/fx/tools/flow',
      repo_url: null,
      hype_score: 94,
      viral_coefficient: 3.1,
      tier: '🔥 BREAKING',
      metrics: {
        github: { stars: 0, stars_per_day: 0, forks: 0 },
        hackernews: { votes: 430, comments: 120 }
      },
      install_methods: ['☁️ 云端'],
      category: 'AI视频'
    },
    {
      id: 'stitch',
      name: 'Stitch',
      description: 'Google Labs 的 AI UI 设计实验，把文本和图片更快变成界面稿与前端代码',
      one_liner: 'idea-to-app 入口继续升温，产品、设计、开发都想点进来',
      website: 'https://stitch.withgoogle.com/',
      repo_url: null,
      hype_score: 92,
      viral_coefficient: 3.0,
      tier: '🔥 BREAKING',
      metrics: {
        github: { stars: 0, stars_per_day: 0, forks: 0 },
        hackernews: { votes: 398, comments: 106 }
      },
      install_methods: ['☁️ 云端', '🎨 Figma'],
      category: '设计助手'
    },
    {
      id: 'vapi',
      name: 'Vapi',
      description: '语音 Agent 平台，直接承接客服、预约、销售等高价值通话流程',
      one_liner: '语音 AI 离预算和 ROI 更近了',
      website: 'https://vapi.ai',
      repo_url: null,
      hype_score: 90,
      viral_coefficient: 2.9,
      tier: '⚡ TRENDING',
      metrics: {
        github: { stars: 0, stars_per_day: 0, forks: 0 },
        hackernews: { votes: 265, comments: 74 }
      },
      install_methods: ['📦 API', '☁️ 云端'],
      category: 'AI音频'
    },
    {
      id: 'browse-sh',
      name: 'Browse.sh',
      description: '把常见网站操作流程沉淀成可安装技能的浏览器 CLI 和目录',
      one_liner: '让 Agent 少重复摸索，多直接复用技能',
      website: 'https://browse.sh',
      repo_url: 'https://github.com/browserbase/skills',
      hype_score: 89,
      viral_coefficient: 2.8,
      tier: '⚡ TRENDING',
      metrics: {
        github: { stars: 0, stars_per_day: 0, forks: 0 },
        hackernews: { votes: 244, comments: 61 }
      },
      install_methods: ['📦 npm', '☁️ 云端'],
      category: 'AI编程'
    },
    {
      id: 'wispr-flow',
      name: 'Wispr Flow',
      description: '跨桌面和移动端的 AI 语音输入工具，把说话变成更像成稿的文本',
      one_liner: '高频办公效率产品，比很多生成器更容易形成复购',
      website: 'https://wisprflow.ai',
      repo_url: null,
      hype_score: 87,
      viral_coefficient: 2.5,
      tier: '⚡ TRENDING',
      metrics: {
        github: { stars: 0, stars_per_day: 0, forks: 0 },
        hackernews: { votes: 186, comments: 52 }
      },
      install_methods: ['💻 客户端', '📱 移动端'],
      category: '效率工具'
    },
    {
      id: 'granola',
      name: 'Granola',
      description: 'botless 的 AI 会议笔记产品，把会议上下文变成动作和记忆',
      one_liner: '会议记录从“会不会记”转向“会不会进工作流”',
      website: 'https://www.granola.ai',
      repo_url: null,
      hype_score: 85,
      viral_coefficient: 2.3,
      tier: '⚡ TRENDING',
      metrics: {
        github: { stars: 0, stars_per_day: 0, forks: 0 },
        hackernews: { votes: 174, comments: 49 }
      },
      install_methods: ['💻 客户端', '📱 移动端'],
      category: '效率工具'
    },
    {
      id: 'lovable',
      name: 'Lovable',
      description: '用自然语言直接生成可部署的全栈应用',
      one_liner: '浏览器内快速做 MVP，依然有很强传播力',
      website: 'https://lovable.dev',
      repo_url: 'https://github.com/lovable/lovable',
      hype_score: 83,
      viral_coefficient: 2.1,
      tier: '🚀 NEW',
      metrics: {
        github: { stars: 25000, stars_per_day: 340, forks: 1200 },
        hackernews: { votes: 168, comments: 44 }
      },
      install_methods: ['☁️ 云端', '🐳 Docker'],
      category: 'AI编程'
    },
    {
      id: 'cursor',
      name: 'Cursor',
      description: 'AI原生代码编辑器，Composer多文件编辑革新编程体验',
      one_liner: '老热门仍强，但这轮更像成熟基线而不是最新惊喜',
      website: 'https://cursor.sh',
      repo_url: null,
      hype_score: 84,
      viral_coefficient: 1.9,
      tier: '💡 WATCH',
      metrics: {
        github: { stars: 0, stars_per_day: 0, forks: 0 },
        hackernews: { votes: 140, comments: 36 }
      },
      install_methods: ['💻 客户端'],
      category: 'AI编程'
    },
  ];

  return tools
    .sort((left, right) => right.hype_score - left.hype_score)
    .slice(0, limit)
    .map(enrichTool);
}

function getMockFeaturedTools(limit = 8): Tool[] {
  return sortToolsByFreshness(
    getMockTools().filter((tool) => tool.is_featured ?? tool.isFeatured)
  ).slice(0, limit);
}

function getMockTools(): Tool[] {
  return toolsData.map((tool) => enrichTool({ ...tool }));
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
