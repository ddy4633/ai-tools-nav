import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

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
