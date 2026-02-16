const { Client } = require('pg');

const client = new Client({
  host: 'db.crmkyaoczrvnjsizlaas.supabase.co',
  port: 6543,  // 使用连接池端口
  database: 'postgres',
  user: 'postgres.crmkyaoczrvnjsizlaas',
  password: 'A1b2C3d4E5f6G7h8I9j0K1l2M3n4O5',
  ssl: {
    rejectUnauthorized: false
  }
});

async function initDatabase() {
  try {
    console.log('连接 Supabase PostgreSQL...');
    await client.connect();
    console.log('✅ 连接成功\n');

    // 1. 创建分类表
    console.log('创建 categories 表...');
    await client.query(`
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
    `);
    console.log('✅ categories 表创建成功');

    // 2. 创建工具表
    console.log('创建 tools 表...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS tools (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        slug TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        logo_url TEXT,
        description TEXT NOT NULL,
        website_url TEXT NOT NULL,
        category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
        tags TEXT[] DEFAULT '{}',
        rating DECIMAL(2,1) DEFAULT 0,
        view_count INTEGER DEFAULT 0,
        click_count INTEGER DEFAULT 0,
        status TEXT DEFAULT 'active',
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ tools 表创建成功');

    // 3. 创建文章表
    console.log('创建 articles 表...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS articles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        excerpt TEXT,
        content TEXT,
        category TEXT,
        tags TEXT[] DEFAULT '{}',
        view_count INTEGER DEFAULT 0,
        status TEXT DEFAULT 'draft',
        published_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ articles 表创建成功');

    // 4. 创建索引
    console.log('创建索引...');
    await client.query(`CREATE INDEX IF NOT EXISTS idx_tools_category ON tools(category_id);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_tools_status ON tools(status);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_tools_rating ON tools(rating DESC);`);
    console.log('✅ 索引创建成功');

    // 5. 插入分类数据
    console.log('\n插入分类数据...');
    const categories = [
      { slug: 'writing', name: 'AI写作', icon: '✍️', sort: 1 },
      { slug: 'image', name: 'AI图像', icon: '🎨', sort: 2 },
      { slug: 'video', name: 'AI视频', icon: '🎬', sort: 3 },
      { slug: 'audio', name: 'AI音频', icon: '🎵', sort: 4 },
      { slug: 'code', name: 'AI编程', icon: '💻', sort: 5 },
      { slug: 'chat', name: 'AI对话', icon: '💬', sort: 6 },
      { slug: 'productivity', name: 'AI效率', icon: '⚡', sort: 7 },
      { slug: 'design', name: 'AI设计', icon: '🎯', sort: 8 },
      { slug: 'business', name: 'AI商业', icon: '💼', sort: 9 }
    ];

    for (const cat of categories) {
      await client.query(`
        INSERT INTO categories (slug, name, icon, sort_order)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (slug) DO NOTHING;
      `, [cat.slug, cat.name, cat.icon, cat.sort]);
    }
    console.log(`✅ 插入 ${categories.length} 个分类`);

    // 6. 插入示例工具
    console.log('\n插入示例工具...');
    
    // 获取 chat 分类的 id
    const chatCat = await client.query(`SELECT id FROM categories WHERE slug = 'chat'`);
    const chatId = chatCat.rows[0]?.id;

    if (chatId) {
      const tools = [
        { slug: 'chatgpt', name: 'ChatGPT', desc: 'OpenAI开发的对话AI，能回答各种问题、写作、编程辅助', url: 'https://chat.openai.com', tags: ['对话', '写作'], rating: 4.8 },
        { slug: 'claude', name: 'Claude', desc: 'Anthropic开发的AI助手，擅长长文本分析和代码', url: 'https://claude.ai', tags: ['对话', '长文本'], rating: 4.7 },
        { slug: 'kimi', name: 'Kimi', desc: '月之暗面开发的中文AI助手，支持超长文本', url: 'https://kimi.moonshot.cn', tags: ['对话', '中文'], rating: 4.7 }
      ];

      for (const tool of tools) {
        await client.query(`
          INSERT INTO tools (slug, name, description, website_url, category_id, tags, rating, status)
          VALUES ($1, $2, $3, $4, $5, $6, $7, 'active')
          ON CONFLICT (slug) DO NOTHING;
        `, [tool.slug, tool.name, tool.desc, tool.url, chatId, tool.tags, tool.rating]);
      }
      console.log(`✅ 插入 ${tools.length} 个示例工具`);
    }

    // 7. 更新分类工具计数
    console.log('\n更新分类计数...');
    await client.query(`
      UPDATE categories SET tool_count = (
        SELECT COUNT(*) FROM tools WHERE category_id = categories.id
      );
    `);
    console.log('✅ 分类计数更新完成');

    // 8. 启用 RLS (可选)
    console.log('\n配置安全策略...');
    await client.query(`ALTER TABLE IF EXISTS tools ENABLE ROW LEVEL SECURITY;`);
    await client.query(`ALTER TABLE IF EXISTS categories ENABLE ROW LEVEL SECURITY;`);
    await client.query(`ALTER TABLE IF EXISTS articles ENABLE ROW LEVEL SECURITY;`);
    
    // 创建匿名用户只读策略
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_policies WHERE policyname = 'Allow anonymous read' AND tablename = 'tools'
        ) THEN
          CREATE POLICY "Allow anonymous read" ON tools FOR SELECT USING (true);
        END IF;
      END $$;
    `);
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_policies WHERE policyname = 'Allow anonymous read' AND tablename = 'categories'
        ) THEN
          CREATE POLICY "Allow anonymous read" ON categories FOR SELECT USING (true);
        END IF;
      END $$;
    `);
    console.log('✅ 安全策略配置完成');

    console.log('\n🎉 数据库初始化完成！');
    console.log('\n数据汇总:');
    
    const catCount = await client.query('SELECT COUNT(*) FROM categories');
    const toolCount = await client.query('SELECT COUNT(*) FROM tools');
    console.log(`  - 分类: ${catCount.rows[0].count}`);
    console.log(`  - 工具: ${toolCount.rows[0].count}`);

  } catch (err) {
    console.error('❌ 错误:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

initDatabase();
