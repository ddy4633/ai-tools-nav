-- AI Tools Navigator - 数据库初始化脚本
-- 执行方式: Supabase Dashboard -> SQL Editor -> New query -> 粘贴执行

-- 1. 创建分类表
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  meta_title TEXT,
  meta_description TEXT,
  sort_order INTEGER DEFAULT 0,
  tool_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 2. 创建工具表
CREATE TABLE tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  logo_url TEXT,
  description TEXT NOT NULL,
  full_description TEXT,
  website_url TEXT NOT NULL,
  affiliate_url TEXT,
  category_id UUID REFERENCES categories(id),
  tags TEXT[] DEFAULT '{}',
  ai_tags TEXT[] DEFAULT '{}',
  pricing JSONB DEFAULT '{"has_free": false, "free_quota": null, "plans": []}',
  features TEXT[] DEFAULT '{}',
  pros TEXT[] DEFAULT '{}',
  cons TEXT[] DEFAULT '{}',
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  scraped_at TIMESTAMP,
  scraped_source TEXT,
  last_price_check TIMESTAMP,
  meta_title TEXT,
  meta_description TEXT,
  status TEXT DEFAULT 'pending',
  is_featured BOOLEAN DEFAULT false,
  is_chinese BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. 创建文章表
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  featured_image TEXT,
  meta_title TEXT,
  meta_description TEXT,
  view_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft',
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 4. 创建用户表 (Phase 2)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE,
  saved_tools UUID[] DEFAULT '{}',
  newsletter_subscribed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 5. 创建价格历史表
CREATE TABLE price_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID REFERENCES tools(id),
  price_data JSONB NOT NULL,
  recorded_at TIMESTAMP DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_tools_category ON tools(category_id);
CREATE INDEX idx_tools_status ON tools(status);
CREATE INDEX idx_tools_is_featured ON tools(is_featured);
CREATE INDEX idx_tools_rating ON tools(rating DESC);
CREATE INDEX idx_tools_created_at ON tools(created_at DESC);
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_published_at ON articles(published_at DESC);

-- 创建更新触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tools_updated_at BEFORE UPDATE ON tools
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 插入初始分类数据
INSERT INTO categories (slug, name, description, icon, sort_order) VALUES
('writing', 'AI写作', '智能写作助手、文案生成工具', '✍️', 1),
('image', 'AI图像', '图像生成、编辑、处理工具', '🎨', 2),
('video', 'AI视频', '视频生成、剪辑、特效工具', '🎬', 3),
('audio', 'AI音频', '语音合成、音乐生成、音频处理', '🎵', 4),
('code', 'AI编程', '代码助手、开发工具', '💻', 5),
('chat', 'AI对话', '聊天机器人、对话AI', '💬', 6),
('productivity', 'AI效率', '办公自动化、效率工具', '⚡', 7),
('design', 'AI设计', '设计辅助、UI/UX工具', '🎯', 8),
('business', 'AI商业', '营销、销售、客服工具', '💼', 9);

-- 插入示例工具数据 (10个)
INSERT INTO tools (slug, name, logo_url, description, full_description, website_url, category_id, tags, features, pros, cons, rating, status, is_chinese) VALUES
('chatgpt', 'ChatGPT', 'https://chat.openai.com/favicon.ico', 'OpenAI开发的对话AI，能回答各种问题、写作、编程辅助', 'ChatGPT是OpenAI推出的对话式AI助手，基于GPT-4架构。它能进行自然对话、回答问题、协助写作、编程调试、翻译等多种任务。', 'https://chat.openai.com', (SELECT id FROM categories WHERE slug = 'chat'), ARRAY['对话', '写作', '编程'], ARRAY['自然对话', '多轮记忆', '代码生成', '多语言支持'], ARRAY['功能全面', '中文支持好', '持续更新'], ARRAY['需要翻墙', '免费版有限制'], 4.8, 'active', false),

('claude', 'Claude', 'https://claude.ai/favicon.ico', 'Anthropic开发的AI助手，擅长长文本分析和代码', 'Claude是Anthropic公司开发的AI助手，以安全性和有用性著称。特别擅长处理长文档、代码分析和复杂推理任务。', 'https://claude.ai', (SELECT id FROM categories WHERE slug = 'chat'), ARRAY['对话', '长文本', '代码'], ARRAY['长上下文', '代码能力强', '安全性高'], ARRAY['中文表现好', '响应速度快', '免费额度 generous'], ARRAY['部分地区受限'], 4.7, 'active', false),

('midjourney', 'Midjourney', 'https://www.midjourney.com/favicon.ico', '顶级AI图像生成工具，艺术风格独特', 'Midjourney是目前最受欢迎的AI图像生成工具之一，以其独特的艺术风格和高品质输出著称。通过Discord使用，适合艺术创作、设计灵感。', 'https://www.midjourney.com', (SELECT id FROM categories WHERE slug = 'image'), ARRAY['图像生成', '艺术创作'], ARRAY['高品质图像', '独特艺术风格', '社区活跃'], ARRAY['艺术感强', '细节丰富', '风格多样'], ARRAY['需要Discord', '收费较高', '中文支持一般'], 4.9, 'active', false),

('github-copilot', 'GitHub Copilot', 'https://github.com/favicon.ico', 'AI编程助手，自动补全代码', 'GitHub Copilot是GitHub和OpenAI合作开发的AI编程助手，能根据上下文自动补全代码、生成函数、解释代码。支持多种编程语言。', 'https://github.com/features/copilot', (SELECT id FROM categories WHERE slug = 'code'), ARRAY['代码补全', '编程助手'], ARRAY['多语言支持', 'IDE集成', '代码解释'], ARRAY['提高编码效率', '学习新语言辅助', '减少重复代码'], ARRAY['需要付费', '偶尔会出错', '隐私担忧'], 4.6, 'active', false),

('notion-ai', 'Notion AI', 'https://www.notion.so/favicon.ico', 'Notion内置的AI写作助手', 'Notion AI是集成在Notion工作空间中的AI助手，可以帮助写作、总结、翻译、头脑风暴。直接在文档中使用，无需切换应用。', 'https://www.notion.so/product/ai', (SELECT id FROM categories WHERE slug = 'writing'), ARRAY['写作', '笔记', '效率'], ARRAY['深度集成Notion', '多种写作模式', '团队协作'], ARRAY[' workflow 无缝', '模板丰富', '协作友好'], ARRAY['需要Notion订阅', '中文支持一般'], 4.5, 'active', false),

('kimi', 'Kimi', 'https://kimi.moonshot.cn/favicon.ico', '月之暗面开发的中文AI助手，支持超长文本', 'Kimi是月之暗面(Moonshot AI)开发的中文AI助手，特别擅长处理超长文档（支持20万字上下文）。适合论文阅读、报告总结、长文写作。', 'https://kimi.moonshot.cn', (SELECT id FROM categories WHERE slug = 'chat'), ARRAY['对话', '长文本', '中文'], ARRAY['超长上下文', '中文优化', '文件上传'], ARRAY['中文表现出色', '免费额度大', '响应速度快'], ARRAY['功能相对单一'], 4.7, 'active', true),

('wenxin-yiyan', '文心一言', 'https://yiyan.baidu.com/favicon.ico', '百度开发的中文大模型', '文心一言是百度推出的知识增强大语言模型，在中文理解和生成方面表现优秀。集成了百度知识图谱，适合中文问答、创作。', 'https://yiyan.baidu.com', (SELECT id FROM categories WHERE slug = 'chat'), ARRAY['对话', '中文', '搜索'], ARRAY['中文理解强', '百度生态集成', '免费使用'], ARRAY['中文优化好', '无需翻墙', '持续更新'], ARRAY['创造力一般', '偶尔有广告'], 4.3, 'active', true),

('tongyi-qianwen', '通义千问', 'https://tongyi.aliyun.com/favicon.ico', '阿里云开发的大语言模型', '通义千问是阿里云推出的大语言模型，在代码、数学、推理方面表现优秀。提供多种模型尺寸选择，适合不同场景。', 'https://tongyi.aliyun.com', (SELECT id FROM categories WHERE slug = 'chat'), ARRAY['对话', '代码', '中文'], ARRAY['代码能力强', '多模型选择', '阿里生态'], ARRAY['中文支持好', 'API稳定', '文档完善'], ARRAY['免费额度有限'], 4.4, 'active', true),

('doubao', '豆包', 'https://www.doubao.com/favicon.ico', '字节跳动开发的AI助手', '豆包是字节跳动推出的AI助手，集成在抖音生态中。语音交互体验好，适合日常问答、娱乐、学习辅助。', 'https://www.doubao.com', (SELECT id FROM categories WHERE slug = 'chat'), ARRAY['对话', '语音', '中文'], ARRAY['语音交互', '字节生态', '多模态'], ARRAY['语音效果好', '免费使用', '年轻化设计'], ARRAY['专业场景一般'], 4.2, 'active', true),

('remove-bg', 'Remove.bg', 'https://www.remove.bg/favicon.ico', '自动抠图工具，一键去除背景', 'Remove.bg是一款强大的AI抠图工具，能自动识别图像主体并去除背景。适合电商、设计、摄影等需要快速处理图片的场景。', 'https://www.remove.bg', (SELECT id FROM categories WHERE slug = 'image'), ARRAY['图像处理', '抠图', '设计'], ARRAY['一键抠图', '边缘处理精细', '批量处理'], ARRAY['效果出色', '简单易用', 'API友好'], ARRAY['免费版有限制', '复杂场景偶有失误'], 4.6, 'active', false);

-- 更新分类工具计数
UPDATE categories SET tool_count = (
  SELECT COUNT(*) FROM tools WHERE category_id = categories.id
);

-- 创建 RLS (Row Level Security) 策略
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- 允许匿名用户读取
CREATE POLICY "Allow anonymous read" ON tools
  FOR SELECT USING (true);

CREATE POLICY "Allow anonymous read" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Allow anonymous read" ON articles
  FOR SELECT USING (true);

-- 允许认证用户写入 (后续添加认证后使用)
-- CREATE POLICY "Allow authenticated insert" ON tools
--   FOR INSERT WITH CHECK (auth.role() = 'authenticated');
