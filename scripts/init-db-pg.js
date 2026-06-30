const { Client } = require('pg');

const requiredEnv = ['SUPABASE_DB_HOST', 'SUPABASE_DB_USER', 'SUPABASE_DB_PASSWORD'];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);

if (missingEnv.length > 0) {
  console.error(`缺少环境变量: ${missingEnv.join(', ')}`);
  console.error('请通过环境变量提供数据库连接信息，不要把数据库凭据写进仓库。');
  process.exit(1);
}

const client = new Client({
  host: process.env.SUPABASE_DB_HOST,
  port: Number(process.env.SUPABASE_DB_PORT || 6543),
  database: process.env.SUPABASE_DB_NAME || 'postgres',
  user: process.env.SUPABASE_DB_USER,
  password: process.env.SUPABASE_DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
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
    await client.query(`CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);`);
    console.log('✅ 索引创建成功');

    console.log('\n🎉 数据库初始化完成！');

  } catch (error) {
    console.error('❌ 初始化失败:', error);
  } finally {
    await client.end();
  }
}

initDatabase();
