# AI Tools Navigator - 核心架构基础方案

## 1. 系统架构概览

```
┌─────────────────────────────────────────────────────────────┐
│                     用户访问层                               │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                     │
│  │ 桌面端   │ │ 移动端   │ │ 搜索引擎 │                     │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘                     │
└───────┼────────────┼────────────┼───────────────────────────┘
        │            │            │
        └────────────┼────────────┘
                     │
┌────────────────────┼──────────────────────────────────────┐
│                    ▼                                       │
│  ┌────────────────────────────────────────────────────┐   │
│  │                  Next.js 应用                      │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐           │   │
│  │  │ 首页     │ │ 分类页   │ │ 工具详情 │           │   │
│  │  └──────────┘ └──────────┘ └──────────┘           │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐           │   │
│  │  │ 搜索页   │ │ 博客文章 │ │ 用户中心 │           │   │
│  │  └──────────┘ └──────────┘ └──────────┘           │   │
│  └────────────────────────────────────────────────────┘   │
│                          │                                │
│  ┌───────────────────────┼──────────────────────────┐    │
│  │                       ▼                          │    │
│  │              ┌─────────────────┐                 │    │
│  │              │   API Routes    │                 │    │
│  │              │  (Serverless)   │                 │    │
│  │              └────────┬────────┘                 │    │
│  └───────────────────────┼──────────────────────────┘    │
└──────────────────────────┼────────────────────────────────┘
                           │
┌──────────────────────────┼────────────────────────────────┐
│                          ▼                                │
│  ┌────────────────────────────────────────────────────┐   │
│  │                  数据层                            │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌───────────┐  │   │
│  │  │ Supabase    │  │ Vercel KV   │  │ 外部API   │  │   │
│  │  │ (PostgreSQL)│  │ (Redis缓存) │  │           │  │   │
│  │  └─────────────┘  └─────────────┘  └───────────┘  │   │
│  └────────────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────────┘
```

## 2. 数据库 Schema 设计

### 2.1 工具表 (tools)
```sql
CREATE TABLE tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,           -- URL友好的标识
  name TEXT NOT NULL,                  -- 工具名称
  logo_url TEXT,                       -- Logo图片URL
  description TEXT NOT NULL,           -- 一句话描述
  full_description TEXT,               -- 完整介绍
  website_url TEXT NOT NULL,           -- 官网链接
  affiliate_url TEXT,                  -- 联盟链接
  
  -- 分类关联
  category_id UUID REFERENCES categories(id),
  
  -- 标签 (数组)
  tags TEXT[],
  
  -- 定价信息 (JSONB灵活存储)
  pricing JSONB DEFAULT '{}',
  -- 示例: {"has_free": true, "free_quota": "100次/月", "plans": [{"name": "Pro", "price": 20, "billing": "monthly"}]}
  
  -- 功能特点 (数组)
  features TEXT[],
  
  -- 优缺点
  pros TEXT[],
  cons TEXT[],
  
  -- 评分
  rating DECIMAL(2,1) DEFAULT 0,       -- 0-5分
  review_count INTEGER DEFAULT 0,
  
  -- 统计数据
  view_count INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  
  -- 状态
  status TEXT DEFAULT 'active',        -- active, pending, archived
  is_featured BOOLEAN DEFAULT false,   -- 是否推荐
  is_chinese BOOLEAN DEFAULT false,    -- 是否国产
  
  -- 元数据
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_tools_category ON tools(category_id);
CREATE INDEX idx_tools_status ON tools(status);
CREATE INDEX idx_tools_is_featured ON tools(is_featured);
CREATE INDEX idx_tools_rating ON tools(rating DESC);
```

### 2.2 分类表 (categories)
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,                  -- 分类名称
  description TEXT,                    -- 描述
  icon TEXT,                           -- 图标名称
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  
  -- 排序
  sort_order INTEGER DEFAULT 0,
  
  -- 统计
  tool_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- 初始数据
INSERT INTO categories (slug, name, description, sort_order) VALUES
('writing', 'AI写作', '智能写作助手、文案生成工具', 1),
('image', 'AI图像', '图像生成、编辑、处理工具', 2),
('video', 'AI视频', '视频生成、剪辑、特效工具', 3),
('audio', 'AI音频', '语音合成、音乐生成、音频处理', 4),
('code', 'AI编程', '代码助手、开发工具', 5),
('chat', 'AI对话', '聊天机器人、对话AI', 6),
('productivity', 'AI效率', '办公自动化、效率工具', 7),
('design', 'AI设计', '设计辅助、UI/UX工具', 8),
('business', 'AI商业', '营销、销售、客服工具', 9);
```

### 2.3 文章表 (articles)
```sql
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,                        -- 摘要
  content TEXT NOT NULL,               -- Markdown内容
  
  -- 分类
  category TEXT,                       -- guide, comparison, list, news
  tags TEXT[],
  
  -- 封面图
  featured_image TEXT,
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  
  -- 统计
  view_count INTEGER DEFAULT 0,
  
  -- 状态
  status TEXT DEFAULT 'draft',         -- draft, published, archived
  published_at TIMESTAMP,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_published_at ON articles(published_at DESC);
```

### 2.4 用户表 (users) - Phase 2
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE,
  
  -- 收藏的工具
  saved_tools UUID[],
  
  -- 订阅设置
  newsletter_subscribed BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 3. API 设计

### 3.1 工具相关 API

```typescript
// GET /api/tools
// 获取工具列表（支持筛选、分页、排序）
interface ListToolsRequest {
  category?: string;      // 分类slug
  search?: string;        // 搜索关键词
  is_free?: boolean;      // 是否免费
  sort_by?: 'rating' | 'views' | 'newest';
  page?: number;
  limit?: number;
}

// GET /api/tools/[slug]
// 获取工具详情
interface GetToolResponse {
  tool: Tool;
  related_tools: Tool[];  // 相似工具
  reviews: Review[];      // 用户评价
}

// POST /api/tools/[slug]/click
// 记录点击（用于统计和联盟追踪）
interface ClickRequest {
  source: 'website' | 'affiliate';
}
```

### 3.2 分类相关 API

```typescript
// GET /api/categories
// 获取所有分类
interface ListCategoriesResponse {
  categories: Category[];
}

// GET /api/categories/[slug]
// 获取分类详情及工具列表
interface GetCategoryResponse {
  category: Category;
  tools: Tool[];
  subcategories?: Category[];
}
```

### 3.3 文章相关 API

```typescript
// GET /api/articles
// 获取文章列表
interface ListArticlesRequest {
  category?: string;
  tag?: string;
  page?: number;
}

// GET /api/articles/[slug]
// 获取文章详情
interface GetArticleResponse {
  article: Article;
  related_articles: Article[];
}
```

## 4. 前端架构

### 4.1 页面结构
```
app/
├── page.tsx                    # 首页
├── layout.tsx                  # 根布局
├── globals.css                 # 全局样式
│
├── categories/
│   ├── page.tsx               # 分类列表页
│   └── [slug]/
│       └── page.tsx           # 分类详情页
│
├── tools/
│   └── [slug]/
│       └── page.tsx           # 工具详情页
│
├── blog/
│   ├── page.tsx               # 博客列表
│   └── [slug]/
│       └── page.tsx           # 文章详情
│
├── api/                       # API路由
│   ├── tools/
│   │   └── route.ts
│   ├── categories/
│   │   └── route.ts
│   └── articles/
│       └── route.ts
│
└── components/                # 组件
    ├── ui/                    # 基础UI组件
    ├── layout/                # 布局组件
    ├── tool/                  # 工具相关组件
    └── blog/                  # 博客相关组件
```

### 4.2 关键组件

```typescript
// components/tool/ToolCard.tsx
interface ToolCardProps {
  tool: Tool;
  variant?: 'default' | 'compact' | 'featured';
}

// components/tool/ToolGrid.tsx
interface ToolGridProps {
  tools: Tool[];
  columns?: 2 | 3 | 4;
}

// components/search/SearchBox.tsx
interface SearchBoxProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

// components/layout/Header.tsx
// 导航栏组件

// components/layout/Footer.tsx
// 页脚组件
```

## 5. MVP 功能清单 (Phase 1)

### 5.1 必须功能 (P0)
- [ ] 首页展示热门/最新工具
- [ ] 分类浏览
- [ ] 工具搜索
- [ ] 工具详情页
- [ ] 响应式设计

### 5.2 重要功能 (P1)
- [ ] 博客文章系统
- [ ] SEO优化 (Meta标签、Sitemap)
- [ ] 联盟链接追踪
- [ ] 基础分析统计

### 5.3 可选功能 (P2)
- [ ] 用户系统 (收藏、登录)
- [ ] 用户评论
- [ ] 工具对比功能
- [ ] Newsletter订阅

## 6. 技术栈详情

### 6.1 核心框架
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** 组件库

### 6.2 数据与存储
- **Supabase** (PostgreSQL)
- **Vercel KV** (Redis缓存)
- **Vercel Blob** (图片存储)

### 6.3 部署与运维
- **Vercel** (部署平台)
- **GitHub Actions** (CI/CD)
- **Vercel Analytics** (性能监控)

### 6.4 第三方服务
- **Resend** (邮件发送)
- **Plausible** 或 **Google Analytics** (分析)

## 7. 成本估算

### 7.1 免费额度利用
| 服务 | 免费额度 | 适用阶段 |
|------|----------|----------|
| Vercel Hobby | 100GB流量/月 | 0-10万PV |
| Supabase Free | 500MB存储 | 0-1000工具 |
| Vercel KV | 1GB/月 | 缓存需求 |
| GitHub | 免费 | 代码托管 |

### 7.2 付费升级节点
- **Vercel Pro**: $20/月 (10万PV以上)
- **Supabase Pro**: $25/月 (数据库超限)
- **CDN**: Cloudflare免费版足够

## 8. 开发路线图

### Week 1: 基础搭建
- [ ] 项目初始化
- [ ] 数据库Schema创建
- [ ] 基础页面搭建
- [ ] 部署到Vercel

### Week 2: 核心功能
- [ ] 工具列表页
- [ ] 工具详情页
- [ ] 分类系统
- [ ] 搜索功能

### Week 3: 内容优化
- [ ] 录入50-100个工具数据
- [ ] SEO优化
- [ ] 性能优化
- [ ] 响应式适配

### Week 4: 上线准备
- [ ] 域名配置
- [ ] Search Console
- [ ] Analytics
- [ ] 正式发布

---

*基础架构方案 v1.0*
*等待三模型调研结果补充优化...*
