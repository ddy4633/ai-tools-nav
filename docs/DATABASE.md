# 数据库架构文档

## 概述

本文档描述 AI Tools Navigator 的数据库表结构和关系。

**数据库**: PostgreSQL (Supabase)  
**ORM**: Supabase Client  
**类型**: 关系型数据库

---

## 表结构

### 1. categories (分类表)

存储工具分类信息。

```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,           -- 分类名称
  slug VARCHAR(100) UNIQUE NOT NULL,    -- URL 标识
  description TEXT,                      -- 描述
  icon VARCHAR(50),                      -- 图标
  count INTEGER DEFAULT 0,               -- 工具数量
  popularity INTEGER DEFAULT 0,          -- 流行度 0-100
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**索引**:
- `slug` (UNIQUE) - URL 查询
- `popularity` (DESC) - 排序

**示例数据**:
| id | name | slug | count | popularity |
|----|------|------|-------|------------|
| 1 | AI写作 | writing | 120 | 95 |
| 2 | AI图像 | image | 85 | 90 |
| 3 | AI编程 | code | 64 | 85 |

---

### 2. tools (工具表)

存储 AI 工具信息。

```sql
CREATE TABLE tools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL,           -- 工具名称
  description TEXT,                      -- 描述
  website VARCHAR(500),                  -- 官网
  repo_url VARCHAR(500),                 -- GitHub 仓库
  category_id UUID REFERENCES categories(id),  -- 分类外键
  
  -- 定价
  pricing_type VARCHAR(20) CHECK (
    pricing_type IN ('free', 'paid', 'freemium')
  ),
  
  -- 特性
  is_featured BOOLEAN DEFAULT FALSE,     -- 是否精选
  
  -- 热度指标
  hype_score INTEGER DEFAULT 0,          -- 热度分数 0-100
  viral_coefficient DECIMAL(3,1) DEFAULT 0,  -- 传播系数
  
  -- 社交指标 (JSON)
  metrics JSONB DEFAULT '{}'::jsonb,
  
  -- 安装方式 (数组)
  install_methods TEXT[] DEFAULT '{}',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**索引**:
- `category_id` - 分类查询
- `is_featured` - 精选查询
- `hype_score` (DESC) - 热度排序
- `pricing_type` - 定价筛选

**示例数据**:
```json
{
  "id": "lovable",
  "name": "Lovable",
  "description": "用自然语言直接生成可部署的全栈应用",
  "website": "https://lovable.dev",
  "repo_url": "https://github.com/lovable/lovable",
  "category_id": "xxx",
  "pricing_type": "freemium",
  "is_featured": true,
  "hype_score": 92,
  "viral_coefficient": 3.2,
  "metrics": {
    "github": {
      "stars": 12100,
      "stars_per_day": 580,
      "forks": 890
    },
    "hackernews": {
      "votes": 312,
      "comments": 89
    }
  },
  "install_methods": ["☁️ 云端", "🐳 Docker"]
}
```

---

### 3. submissions (提交表)

存储用户提交的工具。

```sql
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL,
  description TEXT,
  website VARCHAR(500) NOT NULL,
  category VARCHAR(100),
  submitter_email VARCHAR(200),
  status VARCHAR(20) DEFAULT 'pending' CHECK (
    status IN ('pending', 'approved', 'rejected')
  ),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 关系图

```
┌─────────────────┐
│   categories    │
├─────────────────┤
│ id (PK)         │
│ name            │
│ slug            │
│ count           │
│ popularity      │
└────────┬────────┘
         │
         │ 1:N
         │
         ▼
┌─────────────────┐
│     tools       │
├─────────────────┤
│ id (PK)         │
│ name            │
│ category_id (FK)│
│ pricing_type    │
│ hype_score      │
│ is_featured     │
└─────────────────┘
```

---

## 常用查询

### 获取热度最高的工具
```sql
SELECT t.*, c.name as category_name
FROM tools t
JOIN categories c ON t.category_id = c.id
ORDER BY t.hype_score DESC
LIMIT 10;
```

### 获取分类统计
```sql
SELECT 
  c.id,
  c.name,
  c.slug,
  COUNT(t.id) as tool_count
FROM categories c
LEFT JOIN tools t ON c.id = t.category_id
GROUP BY c.id, c.name, c.slug;
```

### 获取精选工具
```sql
SELECT *
FROM tools
WHERE is_featured = TRUE
ORDER BY hype_score DESC;
```

---

## 初始化 SQL

```sql
-- 启用 UUID 扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 创建分类表
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  count INTEGER DEFAULT 0,
  popularity INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建工具表
CREATE TABLE tools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL,
  description TEXT,
  website VARCHAR(500),
  repo_url VARCHAR(500),
  category_id UUID REFERENCES categories(id),
  pricing_type VARCHAR(20) CHECK (pricing_type IN ('free', 'paid', 'freemium')),
  is_featured BOOLEAN DEFAULT FALSE,
  hype_score INTEGER DEFAULT 0,
  viral_coefficient DECIMAL(3,1) DEFAULT 0,
  metrics JSONB DEFAULT '{}'::jsonb,
  install_methods TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建提交表
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL,
  description TEXT,
  website VARCHAR(500) NOT NULL,
  category VARCHAR(100),
  submitter_email VARCHAR(200),
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_tools_category ON tools(category_id);
CREATE INDEX idx_tools_featured ON tools(is_featured);
CREATE INDEX idx_tools_hype ON tools(hype_score DESC);
CREATE INDEX idx_tools_pricing ON tools(pricing_type);
CREATE INDEX idx_categories_popularity ON categories(popularity DESC);

-- 插入初始分类
INSERT INTO categories (name, slug, description, icon, count, popularity) VALUES
('AI写作', 'writing', '智能写作助手', 'writing', 120, 95),
('AI图像', 'image', '图像生成与编辑', 'image', 85, 90),
('AI编程', 'code', '代码助手与开发工具', 'code', 64, 85),
('AI音频', 'audio', '语音合成与音乐创作', 'audio', 42, 70),
('AI视频', 'video', '视频编辑与生成', 'video', 38, 75),
('AI聊天', 'chatbot', '对话式 AI 助手', 'chat', 56, 88),
('设计助手', 'design', '设计辅助工具', 'design', 35, 65),
('效率工具', 'productivity', '效率提升工具', 'zap', 48, 80),
('知识管理', 'knowledge', '知识整理与管理', 'book', 28, 60),
('数据分析', 'data', '数据分析工具', 'bar-chart', 32, 55);

-- 插入示例工具
INSERT INTO tools (name, description, website, category_id, pricing_type, is_featured, hype_score) VALUES
('ChatGPT', 'OpenAI 开发的大型语言模型', 'https://chatgpt.com', 
 (SELECT id FROM categories WHERE slug = 'chatbot'), 'freemium', true, 95),
('Midjourney', '强大的 AI 图像生成工具', 'https://midjourney.com',
 (SELECT id FROM categories WHERE slug = 'image'), 'paid', true, 90),
('Claude', 'Anthropic 开发的 AI 助手', 'https://claude.ai',
 (SELECT id FROM categories WHERE slug = 'chatbot'), 'freemium', true, 88);
```

---

## 性能优化

### 索引策略
- 所有外键字段都有索引
- 常用查询字段 (hype_score, is_featured) 有索引
- JSONB 字段可根据查询需求添加 GIN 索引

### 查询优化
- 使用 JOIN 替代子查询
- 限制返回字段，避免 SELECT *
- 使用分页 (LIMIT/OFFSET)

---

**最后更新**: 2026-02-25
