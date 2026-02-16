import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getTrendingTools(limit = 10) {
  if (!supabaseUrl || !supabaseKey) {
    return getMockTrendingTools();
  }
  
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .order('hype_score', { ascending: false })
    .limit(limit);
  
  if (error || !data || data.length === 0) {
    return getMockTrendingTools();
  }
  
  return data;
}

export async function getFeaturedTools(limit = 8) {
  if (!supabaseUrl || !supabaseKey) {
    return getMockTools();
  }
  
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('is_featured', true)
    .limit(limit);
  
  if (error || !data || data.length === 0) {
    return getMockTools();
  }
  
  return data;
}

export async function getCategories() {
  if (!supabaseUrl || !supabaseKey) {
    return getMockCategories();
  }
  
  const { data, error } = await supabase
    .from('categories')
    .select('*');
  
  if (error || !data) {
    return getMockCategories();
  }
  
  return data;
}

// 模拟热度工具数据
function getMockTrendingTools() {
  return [
    {
      id: 'lovable',
      name: 'Lovable',
      description: '用自然语言直接生成可部署的全栈应用',
      one_liner: '用自然语言直接生成可部署的全栈应用',
      website: 'https://lovable.dev',
      repo_url: 'https://github.com/lovable/lovable',
      hype_score: 92,
      viral_coefficient: 3.2,
      tier: '🔥 BREAKING',
      metrics: {
        github: { stars: 12100, stars_per_day: 580, forks: 890 },
        hackernews: { votes: 312, comments: 89 }
      },
      install_methods: ['☁️ 云端', '🐳 Docker'],
      category: 'AI编程'
    },
    {
      id: 'felvin',
      name: 'Felvin',
      description: '用文字编辑图片，像修图师一样对话',
      one_liner: '用文字编辑图片，像修图师一样对话',
      website: 'https://felvin.com',
      repo_url: 'https://github.com/felvin/felvin',
      hype_score: 78,
      viral_coefficient: 2.1,
      tier: '⚡ TRENDING',
      metrics: {
        github: { stars: 5400, stars_per_day: 320, forks: 420 },
        hackernews: { votes: 189, comments: 45 }
      },
      install_methods: ['☁️ 云端', '🐳 Docker', '📦 pip'],
      category: 'AI图像'
    },
    {
      id: 'synclabs',
      name: 'Sync Labs',
      description: '给任意视频换嘴型，让任何人说任何话',
      one_liner: '给任意视频换嘴型，让任何人说任何话',
      website: 'https://synclabs.so',
      repo_url: 'https://github.com/synclabs/sync',
      hype_score: 71,
      viral_coefficient: 1.8,
      tier: '⚡ TRENDING',
      metrics: {
        github: { stars: 3800, stars_per_day: 210, forks: 290 },
        hackernews: { votes: 156, comments: 67 }
      },
      install_methods: ['☁️ API', '🐳 Docker'],
      category: 'AI视频'
    },
    {
      id: 'tldraw',
      name: 'tldraw',
      description: '画个草图，直接生成可用代码',
      one_liner: '画个草图，直接生成可用代码',
      website: 'https://tldraw.com',
      repo_url: 'https://github.com/tldraw/tldraw',
      hype_score: 85,
      viral_coefficient: 1.9,
      tier: '🔥 BREAKING',
      metrics: {
        github: { stars: 28900, stars_per_day: 450, forks: 1600 },
        hackernews: { votes: 234, comments: 56 }
      },
      install_methods: ['☁️ 云端', '📦 npm', '🐳 Docker'],
      category: 'AI编程'
    },
    {
      id: 'suno',
      name: 'Suno',
      description: '描述风格，AI给你生成完整歌曲',
      one_liner: '描述风格，AI给你生成完整歌曲',
      website: 'https://suno.com',
      repo_url: 'https://github.com/suno/suno',
      hype_score: 68,
      viral_coefficient: 1.4,
      tier: '🚀 NEW',
      metrics: {
        github: { stars: 2100, stars_per_day: 180, forks: 150 },
        hackernews: { votes: 98, comments: 32 }
      },
      install_methods: ['☁️ 云端'],
      category: 'AI音频'
    }
  ];
}

function getMockTools() {
  return [
    { id: '1', name: 'ChatGPT', description: 'OpenAI 开发的大型语言模型，支持对话、写作、编程等多种任务', category: 'AI聊天', rating: 4.9, is_free: false, pricing_type: 'freemium' },
    { id: '2', name: 'Midjourney', description: '强大的 AI 图像生成工具，可创建高质量艺术作品', category: 'AI图像', rating: 4.8, is_free: false, pricing_type: 'paid' },
    { id: '3', name: 'Claude', description: 'Anthropic 开发的 AI 助手，擅长长文本分析和推理', category: 'AI聊天', rating: 4.8, is_free: true, pricing_type: 'freemium' },
    { id: '4', name: 'Notion AI', description: 'Notion 内置的 AI 写作助手，支持笔记、文档生成', category: 'AI写作', rating: 4.6, is_free: false, pricing_type: 'paid' },
    { id: '5', name: 'GitHub Copilot', description: 'GitHub 和 OpenAI 合作的 AI 编程助手', category: 'AI编程', rating: 4.7, is_free: false, pricing_type: 'paid' },
    { id: '6', name: 'Jasper', description: '企业级 AI 写作工具，专注于营销文案创作', category: 'AI写作', rating: 4.5, is_free: false, pricing_type: 'paid' },
    { id: '7', name: 'Runway', description: 'AI 视频编辑和生成工具，支持多种创意效果', category: 'AI视频', rating: 4.4, is_free: false, pricing_type: 'freemium' },
    { id: '8', name: 'Suno', description: 'AI 音乐生成工具，可根据文字描述创作歌曲', category: 'AI音频', rating: 4.6, is_free: true, pricing_type: 'freemium' },
  ];
}

function getMockCategories() {
  return [
    { id: '1', name: 'AI写作', slug: 'writing', description: '智能写作助手', icon: 'writing', tool_count: 120 },
    { id: '2', name: 'AI图像', slug: 'image', description: '图像生成与编辑', icon: 'image', tool_count: 85 },
    { id: '3', name: 'AI编程', slug: 'code', description: '代码助手与开发工具', icon: 'code', tool_count: 64 },
    { id: '4', name: 'AI音频', slug: 'audio', description: '语音合成与音乐创作', icon: 'audio', tool_count: 42 },
  ];
}
