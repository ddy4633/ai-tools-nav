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
  const tools = [
    // ===== AI聊天 (8个) =====
    { id: 'chatgpt', name: 'ChatGPT', description: 'OpenAI 开发的大型语言模型，支持对话、写作、编程等多种任务', category: 'AI聊天', pricing_type: 'freemium' as const, average_rating: 4.5, rating_count: 1280, website: 'https://chat.openai.com', repo_url: null },
    { id: 'claude', name: 'Claude', description: 'Anthropic 开发的 AI 助手，擅长长文本分析和推理，支持200K上下文', category: 'AI聊天', pricing_type: 'freemium' as const, average_rating: 4.7, rating_count: 890, website: 'https://claude.ai', repo_url: null },
    { id: 'gemini', name: 'Gemini', description: 'Google 开发的 AI 助手，与 Google 服务深度集成，支持多模态', category: 'AI聊天', pricing_type: 'freemium' as const, average_rating: 4.3, rating_count: 567, website: 'https://gemini.google.com', repo_url: null },
    { id: 'perplexity', name: 'Perplexity', description: 'AI 搜索引擎，提供带引用来源的答案，实时信息检索', category: 'AI聊天', pricing_type: 'freemium' as const, average_rating: 4.6, rating_count: 432, website: 'https://www.perplexity.ai', repo_url: null },
    { id: 'deepseek', name: 'DeepSeek', description: '国产AI大模型，推理能力强，性价比极高，完全免费', category: 'AI聊天', pricing_type: 'free' as const, average_rating: 4.8, rating_count: 2100, website: 'https://chat.deepseek.com', repo_url: null },
    { id: 'kimi', name: 'Kimi', description: '月之暗面开发的AI助手，支持超长上下文，国内访问流畅', category: 'AI聊天', pricing_type: 'freemium' as const, average_rating: 4.4, rating_count: 890, website: 'https://kimi.moonshot.cn', repo_url: null },
    { id: 'qwen', name: '通义千问', description: '阿里巴巴开发的大语言模型，中文理解和生成能力强', category: 'AI聊天', pricing_type: 'freemium' as const, average_rating: 4.2, rating_count: 678, website: 'https://tongyi.aliyun.com', repo_url: null },
    { id: 'doubao', name: '豆包', description: '字节跳动开发的AI助手，多模态能力强，免费额度充足', category: 'AI聊天', pricing_type: 'freemium' as const, average_rating: 4.3, rating_count: 756, website: 'https://www.doubao.com', repo_url: null },

    // ===== AI写作 (6个) =====
    { id: 'notion-ai', name: 'Notion AI', description: 'Notion 内置的 AI 写作助手，支持笔记、文档生成和总结', category: 'AI写作', pricing_type: 'paid' as const, average_rating: 4.2, rating_count: 567, website: 'https://www.notion.so/product/ai', repo_url: null },
    { id: 'jasper', name: 'Jasper', description: '企业级AI写作工具，专注于营销文案和品牌内容创作', category: 'AI写作', pricing_type: 'paid' as const, average_rating: 4.4, rating_count: 345, website: 'https://www.jasper.ai', repo_url: null },
    { id: 'copy-ai', name: 'Copy.ai', description: '营销文案AI写作工具，提供丰富的模板和工作流', category: 'AI写作', pricing_type: 'freemium' as const, average_rating: 4.1, rating_count: 289, website: 'https://www.copy.ai', repo_url: null },
    { id: 'writesonic', name: 'Writesonic', description: 'AI写作平台，支持博客、广告、电商等多种场景', category: 'AI写作', pricing_type: 'freemium' as const, average_rating: 4.0, rating_count: 234, website: 'https://writesonic.com', repo_url: null },
    { id: 'quillbot', name: 'QuillBot', description: 'AI改写和润色工具，提升文章质量和可读性', category: 'AI写作', pricing_type: 'freemium' as const, average_rating: 4.3, rating_count: 890, website: 'https://quillbot.com', repo_url: null },
    { id: 'grammarly', name: 'Grammarly', description: 'AI语法检查和写作辅助工具，实时纠正错误', category: 'AI写作', pricing_type: 'freemium' as const, average_rating: 4.5, rating_count: 1500, website: 'https://www.grammarly.com', repo_url: null },

    // ===== AI编程 (8个) =====
    { id: 'github-copilot', name: 'GitHub Copilot', description: 'GitHub和OpenAI合作的AI编程助手，代码补全准确率极高', category: 'AI编程', pricing_type: 'paid' as const, average_rating: 4.6, rating_count: 2100, website: 'https://github.com/features/copilot', repo_url: 'https://github.com/github/copilot' },
    { id: 'cursor', name: 'Cursor', description: 'AI原生代码编辑器，基于VS Code，支持Composer多文件编辑', category: 'AI编程', pricing_type: 'freemium' as const, average_rating: 4.8, rating_count: 1200, website: 'https://cursor.sh', repo_url: null },
    { id: 'codeium', name: 'Codeium', description: '免费的AI编程助手，个人用户完全免费，Copilot替代品', category: 'AI编程', pricing_type: 'free' as const, average_rating: 4.3, rating_count: 678, website: 'https://codeium.com', repo_url: null },
    { id: 'lovable', name: 'Lovable', description: '用自然语言直接生成可部署的全栈应用，2024年最火AI编程工具', category: 'AI编程', pricing_type: 'freemium' as const, average_rating: 4.7, rating_count: 890, website: 'https://lovable.dev', repo_url: null },
    { id: 'tldraw', name: 'tldraw', description: '画个草图直接生成可用代码，白板+AI编程神器', category: 'AI编程', pricing_type: 'free' as const, average_rating: 4.6, rating_count: 1200, website: 'https://tldraw.com', repo_url: 'https://github.com/tldraw/tldraw' },
    { id: 'v0', name: 'v0.dev', description: 'Vercel出品的前端UI生成工具，从描述生成React组件', category: 'AI编程', pricing_type: 'freemium' as const, average_rating: 4.5, rating_count: 756, website: 'https://v0.dev', repo_url: null },
    { id: 'windsurf', name: 'Windsurf', description: 'Codeium团队推出的AI IDE，Cascade代理模式革新编程体验', category: 'AI编程', pricing_type: 'freemium' as const, average_rating: 4.4, rating_count: 234, website: 'https://codeium.com/windsurf', repo_url: null },
    { id: 'replit-agent', name: 'Replit Agent', description: 'Replit推出的AI编程助手，云端IDE整合，直接运行代码', category: 'AI编程', pricing_type: 'freemium' as const, average_rating: 4.2, rating_count: 345, website: 'https://replit.com', repo_url: null },

    // ===== AI图像 (10个) =====
    { id: 'midjourney', name: 'Midjourney', description: '强大的AI图像生成工具，艺术性和美感业界领先', category: 'AI图像', pricing_type: 'paid' as const, average_rating: 4.8, rating_count: 2800, website: 'https://www.midjourney.com', repo_url: null },
    { id: 'dalle3', name: 'DALL-E 3', description: 'OpenAI的AI图像生成工具，提示词理解精准，与ChatGPT集成', category: 'AI图像', pricing_type: 'freemium' as const, average_rating: 4.4, rating_count: 1200, website: 'https://openai.com/dall-e-3', repo_url: null },
    { id: 'stable-diffusion', name: 'Stable Diffusion', description: '开源AI图像生成模型，可本地部署，高度可定制', category: 'AI图像', pricing_type: 'free' as const, average_rating: 4.5, rating_count: 3400, website: 'https://stability.ai', repo_url: 'https://github.com/Stability-AI/stablediffusion' },
    { id: 'felvin', name: 'Felvin', description: '用文字编辑图片，像修图师一样对话，自然语言修图', category: 'AI图像', pricing_type: 'freemium' as const, average_rating: 4.6, rating_count: 456, website: 'https://felvin.com', repo_url: null },
    { id: 'adobe-firefly', name: 'Adobe Firefly', description: 'Adobe出品的AI图像工具，与Creative Cloud深度集成', category: 'AI图像', pricing_type: 'freemium' as const, average_rating: 4.3, rating_count: 789, website: 'https://www.adobe.com/sensei/generative-ai/firefly.html', repo_url: null },
    { id: 'leonardo', name: 'Leonardo.ai', description: '游戏和创意设计的AI图像生成平台，提供丰富模型', category: 'AI图像', pricing_type: 'freemium' as const, average_rating: 4.4, rating_count: 890, website: 'https://leonardo.ai', repo_url: null },
    { id: 'ideogram', name: 'Ideogram', description: '擅长文字渲染的AI图像工具，海报设计首选', category: 'AI图像', pricing_type: 'freemium' as const, average_rating: 4.2, rating_count: 567, website: 'https://ideogram.ai', repo_url: null },
    { id: 'flux', name: 'FLUX', description: 'Black Forest Labs出品，开源图像生成新标杆', category: 'AI图像', pricing_type: 'free' as const, average_rating: 4.7, rating_count: 678, website: 'https://flux-ai.io', repo_url: null },
    { id: 'kling', name: '可灵AI', description: '快手出品的AI图像和视频生成工具，中文理解优秀', category: 'AI图像', pricing_type: 'freemium' as const, average_rating: 4.5, rating_count: 1200, website: 'https://klingai.com', repo_url: null },
    { id: 'tongyi-wanxiang', name: '通义万相', description: '阿里出品的AI图像生成工具，中文场景优化', category: 'AI图像', pricing_type: 'freemium' as const, average_rating: 4.1, rating_count: 567, website: 'https://tongyi.aliyun.com/wanxiang', repo_url: null },

    // ===== AI视频 (10个) =====
    { id: 'runway', name: 'Runway', description: 'AI视频编辑和生成工具，Motion Brush功能业界领先', category: 'AI视频', pricing_type: 'freemium' as const, average_rating: 4.4, rating_count: 890, website: 'https://runwayml.com', repo_url: null },
    { id: 'heygen', name: 'HeyGen', description: 'AI数字人视频生成工具，口型同步和表情自然', category: 'AI视频', pricing_type: 'paid' as const, average_rating: 4.3, rating_count: 678, website: 'https://www.heygen.com', repo_url: null },
    { id: 'synclabs', name: 'Sync Labs', description: '给任意视频换嘴型，让任何人说任何话，视频翻译神器', category: 'AI视频', pricing_type: 'paid' as const, average_rating: 4.7, rating_count: 345, website: 'https://synclabs.so', repo_url: null },
    { id: 'pika', name: 'Pika', description: 'AI视频生成工具，支持文生视频和图生视频', category: 'AI视频', pricing_type: 'freemium' as const, average_rating: 4.2, rating_count: 567, website: 'https://pika.art', repo_url: null },
    { id: 'luma-dream-machine', name: 'Luma Dream Machine', description: '高质量AI视频生成，物理模拟真实', category: 'AI视频', pricing_type: 'freemium' as const, average_rating: 4.5, rating_count: 456, website: 'https://lumalabs.ai/dream-machine', repo_url: null },
    { id: 'kling-video', name: '可灵AI视频', description: '快手出品的AI视频生成工具，国内访问流畅', category: 'AI视频', pricing_type: 'freemium' as const, average_rating: 4.6, rating_count: 890, website: 'https://klingai.com', repo_url: null },
    { id: 'sora', name: 'Sora', description: 'OpenAI的视频生成模型，生成质量和一致性顶尖', category: 'AI视频', pricing_type: 'paid' as const, average_rating: 4.8, rating_count: 1200, website: 'https://openai.com/sora', repo_url: null },
    { id: 'hailuo', name: '海螺AI', description: 'MiniMax出品的AI视频生成工具，视频质量优秀', category: 'AI视频', pricing_type: 'freemium' as const, average_rating: 4.4, rating_count: 567, website: 'https://hailuoai.video', repo_url: null },
    { id: 'vidu', name: 'Vidu', description: '生数科技出品的AI视频生成工具，国产Sora', category: 'AI视频', pricing_type: 'freemium' as const, average_rating: 4.3, rating_count: 345, website: 'https://www.vidu.com', repo_url: null },
    { id: 'synthesia', name: 'Synthesia', description: '企业级AI数字人视频平台，多语言支持', category: 'AI视频', pricing_type: 'paid' as const, average_rating: 4.2, rating_count: 678, website: 'https://www.synthesia.io', repo_url: null },

    // ===== AI音频 (8个) =====
    { id: 'elevenlabs', name: 'ElevenLabs', description: 'AI语音合成工具，声音克隆逼真，多语言支持', category: 'AI音频', pricing_type: 'freemium' as const, average_rating: 4.7, rating_count: 1200, website: 'https://elevenlabs.io', repo_url: null },
    { id: 'suno', name: 'Suno', description: '描述风格AI生成完整歌曲，词曲唱一体化', category: 'AI音频', pricing_type: 'freemium' as const, average_rating: 4.5, rating_count: 890, website: 'https://suno.com', repo_url: null },
    { id: 'udio', name: 'Udio', description: '高质量AI音乐生成工具，音质业界领先', category: 'AI音频', pricing_type: 'freemium' as const, average_rating: 4.6, rating_count: 567, website: 'https://www.udio.com', repo_url: null },
    { id: 'murf', name: 'Murf', description: '专业AI配音工具，适合视频和演示文稿', category: 'AI音频', pricing_type: 'freemium' as const, average_rating: 4.2, rating_count: 456, website: 'https://murf.ai', repo_url: null },
    { id: 'speechify', name: 'Speechify', description: 'AI文本转语音工具，支持多种阅读和朗读场景', category: 'AI音频', pricing_type: 'freemium' as const, average_rating: 4.3, rating_count: 789, website: 'https://speechify.com', repo_url: null },
    { id: 'adobe-podcast', name: 'Adobe Podcast', description: 'AI音频增强工具，提升录音质量和清晰度', category: 'AI音频', pricing_type: 'free' as const, average_rating: 4.4, rating_count: 567, website: 'https://podcast.adobe.com', repo_url: null },
    { id: 'tongyi-tingwu', name: '通义听悟', description: '阿里出品的AI语音转文字工具，中文识别准确', category: 'AI音频', pricing_type: 'freemium' as const, average_rating: 4.2, rating_count: 678, website: 'https://tingwu.aliyun.com', repo_url: null },
    { id: 'whisper', name: 'Whisper', description: 'OpenAI开源的语音识别模型，支持99种语言', category: 'AI音频', pricing_type: 'free' as const, average_rating: 4.6, rating_count: 2100, website: 'https://openai.com/research/whisper', repo_url: 'https://github.com/openai/whisper' },

    // ===== 效率工具 (8个) =====
    { id: 'tome', name: 'Tome', description: 'AI演示文稿生成工具，从主题自动生成完整PPT', category: '效率工具', pricing_type: 'freemium' as const, average_rating: 4.1, rating_count: 345, website: 'https://tome.app', repo_url: null },
    { id: 'gamma', name: 'Gamma', description: 'AI驱动的演示工具，文档、演示、网页一体化', category: '效率工具', pricing_type: 'freemium' as const, average_rating: 4.4, rating_count: 567, website: 'https://gamma.app', repo_url: null },
    { id: 'beautiful-ai', name: 'Beautiful.ai', description: '智能演示文稿工具，自动排版和设计', category: '效率工具', pricing_type: 'paid' as const, average_rating: 4.2, rating_count: 456, website: 'https://www.beautiful.ai', repo_url: null },
    { id: 'mem', name: 'Mem', description: 'AI知识管理工具，自动整理和关联笔记', category: '效率工具', pricing_type: 'freemium' as const, average_rating: 4.0, rating_count: 234, website: 'https://mem.ai', repo_url: null },
    { id: 'otter', name: 'Otter.ai', description: 'AI会议记录工具，实时转录和总结', category: '效率工具', pricing_type: 'freemium' as const, average_rating: 4.3, rating_count: 890, website: 'https://otter.ai', repo_url: null },
    { id: 'fireflies', name: 'Fireflies', description: 'AI会议助手，自动记录、转录和分析会议', category: '效率工具', pricing_type: 'freemium' as const, average_rating: 4.2, rating_count: 567, website: 'https://fireflies.ai', repo_url: null },
    { id: 'reclaim', name: 'Reclaim', description: 'AI时间管理工具，自动安排日程和任务', category: '效率工具', pricing_type: 'freemium' as const, average_rating: 4.1, rating_count: 345, website: 'https://reclaim.ai', repo_url: null },
    { id: 'motion', name: 'Motion', description: 'AI任务管理工具，自动规划优先级和时间', category: '效率工具', pricing_type: 'paid' as const, average_rating: 4.0, rating_count: 289, website: 'https://www.usemotion.com', repo_url: null },

    // ===== 设计助手 (6个) =====
    { id: 'canva', name: 'Canva', description: '在线设计平台，AI功能丰富，模板海量', category: '设计助手', pricing_type: 'freemium' as const, average_rating: 4.5, rating_count: 3400, website: 'https://www.canva.com', repo_url: null },
    { id: 'figma-ai', name: 'Figma AI', description: 'Figma内置AI功能，设计到代码一键生成', category: '设计助手', pricing_type: 'freemium' as const, average_rating: 4.4, rating_count: 1200, website: 'https://www.figma.com/ai', repo_url: null },
    { id: 'galileo-ai', name: 'Galileo AI', description: '文字描述生成UI设计稿，高保真原型', category: '设计助手', pricing_type: 'freemium' as const, average_rating: 4.2, rating_count: 345, website: 'https://www.usegalileo.ai', repo_url: null },
    { id: 'uizard', name: 'Uizard', description: 'AI UI设计工具，草图转设计稿', category: '设计助手', pricing_type: 'freemium' as const, average_rating: 4.0, rating_count: 234, website: 'https://uizard.io', repo_url: null },
    { id: 'remove-bg', name: 'Remove.bg', description: 'AI自动抠图工具，一键去除背景', category: '设计助手', pricing_type: 'freemium' as const, average_rating: 4.6, rating_count: 2100, website: 'https://www.remove.bg', repo_url: null },
    { id: 'vectorizer', name: 'Vectorizer.AI', description: 'AI位图转矢量图工具，放大不失真', category: '设计助手', pricing_type: 'freemium' as const, average_rating: 4.3, rating_count: 567, website: 'https://vectorizer.ai', repo_url: null },

    // ===== 知识管理 (6个) =====
    { id: 'notion', name: 'Notion', description: '全能知识管理和协作平台，AI功能强大', category: '知识管理', pricing_type: 'freemium' as const, average_rating: 4.7, rating_count: 2800, website: 'https://www.notion.so', repo_url: null },
    { id: 'obsidian', name: 'Obsidian', description: '本地优先的知识库工具，插件生态丰富', category: '知识管理', pricing_type: 'freemium' as const, average_rating: 4.8, rating_count: 1500, website: 'https://obsidian.md', repo_url: null },
    { id: 'readwise', name: 'Readwise', description: '阅读高亮和复习工具，AI总结和联系', category: '知识管理', pricing_type: 'paid' as const, average_rating: 4.5, rating_count: 678, website: 'https://readwise.io', repo_url: null },
    { id: 'pocket', name: 'Pocket', description: '稍后阅读工具，AI推荐和总结', category: '知识管理', pricing_type: 'freemium' as const, average_rating: 4.2, rating_count: 890, website: 'https://getpocket.com', repo_url: null },
    { id: 'raindrop', name: 'Raindrop', description: '书签管理工具，AI标签和分类', category: '知识管理', pricing_type: 'freemium' as const, average_rating: 4.4, rating_count: 456, website: 'https://raindrop.io', repo_url: null },
    { id: 'mymind', name: 'mymind', description: 'AI驱动的个人知识库，自动整理收藏', category: '知识管理', pricing_type: 'paid' as const, average_rating: 4.1, rating_count: 234, website: 'https://mymind.com', repo_url: null },

    // ===== 数据分析 (6个) =====
    { id: 'chatgpt-data', name: 'ChatGPT Advanced Data Analysis', description: 'ChatGPT高级数据分析功能，支持代码执行', category: '数据分析', pricing_type: 'paid' as const, average_rating: 4.5, rating_count: 567, website: 'https://chat.openai.com', repo_url: null },
    { id: 'claude-code', name: 'Claude Code', description: 'Claude的代码和数据分析能力，文件处理强大', category: '数据分析', pricing_type: 'freemium' as const, average_rating: 4.6, rating_count: 345, website: 'https://claude.ai', repo_url: null },
    { id: 'julius', name: 'Julius AI', description: 'AI数据分析助手，可视化图表一键生成', category: '数据分析', pricing_type: 'freemium' as const, average_rating: 4.3, rating_count: 234, website: 'https://julius.ai', repo_url: null },
    { id: 'chatcsv', name: 'ChatCSV', description: '与CSV文件对话的AI工具，数据查询简单', category: '数据分析', pricing_type: 'freemium' as const, average_rating: 4.0, rating_count: 156, website: 'https://www.chatcsv.co', repo_url: null },
    { id: 'formula-bot', name: 'Formula Bot', description: 'Excel公式AI助手，自动生成和解释公式', category: '数据分析', pricing_type: 'freemium' as const, average_rating: 4.2, rating_count: 890, website: 'https://formulabot.com', repo_url: null },
    { id: 'lark-base', name: '飞书多维表格', description: '飞书出品的数据管理和AI分析工具', category: '数据分析', pricing_type: 'freemium' as const, average_rating: 4.4, rating_count: 567, website: 'https://www.feishu.cn/product/base', repo_url: null },
  ];

  return tools.map(enrichTool);
}

function getMockCategories() {
  return [
    { id: '1', name: 'AI聊天', slug: 'chatbot', count: 8, popularity: 95 },
    { id: '2', name: 'AI写作', slug: 'writing', count: 6, popularity: 85 },
    { id: '3', name: 'AI编程', slug: 'code', count: 8, popularity: 92 },
    { id: '4', name: 'AI图像', slug: 'image', count: 10, popularity: 94 },
    { id: '5', name: 'AI视频', slug: 'video', count: 10, popularity: 90 },
    { id: '6', name: 'AI音频', slug: 'audio', count: 8, popularity: 82 },
    { id: '7', name: '效率工具', slug: 'productivity', count: 8, popularity: 88 },
    { id: '8', name: '设计助手', slug: 'design', count: 6, popularity: 78 },
    { id: '9', name: '知识管理', slug: 'knowledge', count: 6, popularity: 75 },
    { id: '10', name: '数据分析', slug: 'data', count: 6, popularity: 72 },
  ];
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
