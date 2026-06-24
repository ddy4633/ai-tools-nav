// 使用 Supabase JS 客户端创建表结构
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('错误: 请设置 SUPABASE_URL（或 NEXT_PUBLIC_SUPABASE_URL）和 SUPABASE_SERVICE_ROLE_KEY 环境变量');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function initDatabase() {
  console.log('开始初始化数据库...\n');

  // 1. 创建分类表
  const { error: catError } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS categories (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        slug TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        description TEXT,
        icon TEXT,
        sort_order INTEGER DEFAULT 0,
        tool_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `
  });

  if (catError) {
    console.log('分类表创建方式1失败，尝试方式2...');
    // 方式2: 使用 REST API 直接查询
  } else {
    console.log('✅ 分类表创建成功');
  }

  // 2. 使用直接的 SQL 执行（通过 pgrest）
  const initSql = `
    -- 创建工具表
    CREATE TABLE IF NOT EXISTS tools (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      logo_url TEXT,
      description TEXT NOT NULL,
      website_url TEXT NOT NULL,
      category_id UUID REFERENCES categories(id),
      tags TEXT[] DEFAULT '{}',
      rating DECIMAL(2,1) DEFAULT 0,
      view_count INTEGER DEFAULT 0,
      click_count INTEGER DEFAULT 0,
      status TEXT DEFAULT 'active',
      created_at TIMESTAMP DEFAULT NOW()
    );

    -- 插入分类
    INSERT INTO categories (slug, name, icon, sort_order) VALUES
    ('writing', 'AI写作', '✍️', 1),
    ('image', 'AI图像', '🎨', 2),
    ('video', 'AI视频', '🎬', 3),
    ('audio', 'AI音频', '🎵', 4),
    ('code', 'AI编程', '💻', 5),
    ('chat', 'AI对话', '💬', 6),
    ('productivity', 'AI效率', '⚡', 7),
    ('design', 'AI设计', '🎯', 8)
    ON CONFLICT (slug) DO NOTHING;

    -- 插入示例工具
    INSERT INTO tools (slug, name, description, website_url, category_id, tags, rating, status)
    SELECT 'chatgpt', 'ChatGPT', 'OpenAI开发的对话AI', 'https://chat.openai.com', id, ARRAY['对话','写作'], 4.8, 'active'
    FROM categories WHERE slug = 'chat'
    ON CONFLICT (slug) DO NOTHING;

    INSERT INTO tools (slug, name, description, website_url, category_id, tags, rating, status)
    SELECT 'claude', 'Claude', 'Anthropic开发的AI助手', 'https://claude.ai', id, ARRAY['对话','长文本'], 4.7, 'active'
    FROM categories WHERE slug = 'chat'
    ON CONFLICT (slug) DO NOTHING;

    INSERT INTO tools (slug, name, description, website_url, category_id, tags, rating, status)
    SELECT 'kimi', 'Kimi', '月之暗面开发的中文AI助手', 'https://kimi.moonshot.cn', id, ARRAY['对话','中文'], 4.7, 'active'
    FROM categories WHERE slug = 'chat'
    ON CONFLICT (slug) DO NOTHING;
  `;

  // 执行 SQL
  const { error: sqlError } = await supabase.rpc('exec_sql', { sql: initSql });
  
  if (sqlError) {
    console.error('❌ SQL 执行失败:', sqlError.message);
    console.log('\n请手动在 Supabase Dashboard 执行 SQL');
    process.exit(1);
  } else {
    console.log('✅ 数据库初始化成功！');
  }
}

initDatabase();
