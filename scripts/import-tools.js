#!/usr/bin/env node
/**
 * 工具内容导入脚本
 * 将本地 tools-data.ts 中的内容导入到 Supabase 数据库
 * 
 * 使用方法:
 * node scripts/import-tools.js
 * 
 * 环境变量:
 * - SUPABASE_URL: Supabase 项目 URL
 * - SUPABASE_SERVICE_KEY: Supabase 服务角色密钥 (不是 anon key)
 */

const { createClient } = require('@supabase/supabase-js');

// 从 lib/content/tools-data.ts 导入的数据
// 实际使用时需要从文件读取或作为参数传入
const toolsData = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    slug: 'chatgpt',
    description: 'OpenAI开发的大型语言模型，支持对话、写作、编程等多种任务',
    reason: '处理长文档时，它的理解能力让我惊讶',
    full_review: 'ChatGPT是我每天使用频率最高的AI工具。从2022年底发布以来，它彻底改变了我获取信息和处理知识的方式。',
    category: 'AI聊天',
    category_slug: 'chatbot',
    pricing_type: 'freemium',
    price_range: '免费版可用，Plus $20/月',
    website: 'https://chat.openai.com',
    features: ['多轮对话', '代码生成', '文档总结', '创意写作', '多语言支持'],
    pros: ['理解能力极强', '上下文记忆长', '更新迭代快', '生态丰富'],
    cons: ['免费版有使用限制', '偶尔产生幻觉', '对中文支持不如英文'],
    alternatives: ['Claude', 'Gemini', 'Perplexity'],
    editor_rating: 4.5,
    difficulty: 1,
    is_editors_pick: true,
    is_featured: true,
  },
  // 更多工具数据...
];

const categoriesData = [
  { id: '1', name: 'AI聊天', slug: 'chatbot', count: 45, popularity: 95 },
  { id: '2', name: 'AI写作', slug: 'writing', count: 38, popularity: 85 },
  { id: '3', name: 'AI编程', slug: 'code', count: 32, popularity: 90 },
  { id: '4', name: 'AI图像', slug: 'image', count: 56, popularity: 92 },
  { id: '5', name: 'AI视频', slug: 'video', count: 24, popularity: 78 },
  { id: '6', name: 'AI音频', slug: 'audio', count: 18, popularity: 72 },
  { id: '7', name: '效率工具', slug: 'productivity', count: 42, popularity: 88 },
  { id: '8', name: '设计助手', slug: 'design', count: 28, popularity: 68 },
  { id: '9', name: '知识管理', slug: 'knowledge', count: 22, popularity: 65 },
  { id: '10', name: '数据分析', slug: 'data', count: 15, popularity: 58 },
];

async function importTools() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('错误: 请设置 SUPABASE_URL 和 SUPABASE_SERVICE_KEY 环境变量');
    process.exit(1);
  }
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  console.log('开始导入数据...\n');
  
  // 1. 导入分类
  console.log('📁 导入分类数据...');
  const { error: categoryError } = await supabase
    .from('categories')
    .upsert(categoriesData, { onConflict: 'id' });
  
  if (categoryError) {
    console.error('❌ 分类导入失败:', categoryError.message);
  } else {
    console.log(`✅ 成功导入 ${categoriesData.length} 个分类`);
  }
  
  // 2. 导入工具
  console.log('\n🔧 导入工具数据...');
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const tool of toolsData) {
    const { error } = await supabase
      .from('tools')
      .upsert({
        id: tool.id,
        name: tool.name,
        description: tool.description,
        category: tool.category,
        pricing_type: tool.pricing_type,
        website: tool.website,
        is_featured: tool.is_featured,
        is_editors_pick: tool.is_editors_pick,
        editor_rating: tool.editor_rating,
        // 详细评测字段 (需要先在数据库中添加这些列)
        reason: tool.reason,
        full_review: tool.full_review,
        price_range: tool.price_range,
        features: tool.features,
        pros: tool.pros,
        cons: tool.cons,
        alternatives: tool.alternatives,
        difficulty: tool.difficulty,
      }, { onConflict: 'id' });
    
    if (error) {
      console.error(`❌ ${tool.name} 导入失败:`, error.message);
      errorCount++;
    } else {
      console.log(`✅ ${tool.name}`);
      successCount++;
    }
  }
  
  console.log('\n📊 导入统计:');
  console.log(`   成功: ${successCount}`);
  console.log(`   失败: ${errorCount}`);
  console.log(`   总计: ${toolsData.length}`);
  
  if (errorCount === 0) {
    console.log('\n🎉 所有数据导入成功!');
  } else {
    console.log('\n⚠️ 部分数据导入失败，请检查错误信息');
    process.exit(1);
  }
}

// 运行导入
importTools().catch(console.error);
