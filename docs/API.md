# API 文档

## 概述

本文档描述 AI Tools Navigator 的所有数据获取 API。

---

## 核心 API

### getTrendingTools

获取热度最高的工具列表。

**函数签名**:
```typescript
async function getTrendingTools(limit?: number): Promise<TrendingTool[]>
```

**参数**:
| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| limit | number | 否 | 10 | 返回数量 |

**返回值**:
```typescript
interface TrendingTool {
  id: string;                    // 工具唯一标识
  name: string;                  // 工具名称
  description: string;           // 详细描述
  one_liner: string;             // 一句话描述
  website: string;               // 官网链接
  repo_url?: string;             // GitHub 仓库
  hype_score: number;            // 热度分数 0-100
  viral_coefficient: number;     // 传播系数
  tier: '🔥 BREAKING' | '⚡ TRENDING' | '🚀 NEW';
  metrics: {
    github?: {
      stars: number;
      stars_per_day: number;
      forks: number;
    };
    hackernews?: {
      votes: number;
      comments: number;
    };
  };
  install_methods: string[];     // 安装方式
  category: string;              // 分类
}
```

**示例**:
```typescript
import { getTrendingTools } from '@/lib/supabase';

const tools = await getTrendingTools(5);
console.log(tools[0].name);  // "Lovable"
console.log(tools[0].hype_score);  // 92
```

**数据示例**:
```json
{
  "id": "lovable",
  "name": "Lovable",
  "description": "用自然语言直接生成可部署的全栈应用",
  "one_liner": "用自然语言直接生成可部署的全栈应用",
  "website": "https://lovable.dev",
  "repo_url": "https://github.com/lovable/lovable",
  "hype_score": 92,
  "viral_coefficient": 3.2,
  "tier": "🔥 BREAKING",
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
  "install_methods": ["☁️ 云端", "🐳 Docker"],
  "category": "AI编程"
}
```

---

### getFeaturedTools

获取精选工具列表。

**函数签名**:
```typescript
async function getFeaturedTools(limit?: number): Promise<Tool[]>
```

**参数**:
| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| limit | number | 否 | 8 | 返回数量 |

**返回值**:
```typescript
interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  pricing_type: 'free' | 'paid' | 'freemium';
}
```

**示例**:
```typescript
const tools = await getFeaturedTools();
// 返回如 ChatGPT, Midjourney, Claude 等工具
```

---

### getCategories

获取所有工具分类。

**函数签名**:
```typescript
async function getCategories(): Promise<Category[]>
```

**返回值**:
```typescript
interface Category {
  id: string;           // 分类 ID
  name: string;         // 分类名称
  slug: string;         // URL 友好的标识
  count: number;        // 工具数量
  popularity: number;   // 流行度 0-100
}
```

**示例**:
```typescript
const categories = await getCategories();
// [
//   { id: '1', name: 'AI写作', slug: 'writing', count: 120, popularity: 95 },
//   { id: '2', name: 'AI图像', slug: 'image', count: 85, popularity: 90 },
//   ...
// ]
```

---

### getSupabase

获取 Supabase 客户端实例（懒加载）。

**函数签名**:
```typescript
function getSupabase(): SupabaseClient | null
```

**返回值**: Supabase 客户端实例或 null（如果未配置）

**使用场景**:
当你需要直接操作数据库时使用。

**示例**:
```typescript
const supabase = getSupabase();
if (supabase) {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('id', 'chatgpt');
}
```

---

## 错误处理

所有 API 函数都有内置的错误处理：

1. **数据库连接失败** → 返回模拟数据
2. **查询错误** → 返回模拟数据
3. **无数据** → 返回模拟数据

这种设计确保即使数据库不可用，页面也能正常显示。

**示例**:
```typescript
// 如果 Supabase 未配置或查询失败
const tools = await getTrendingTools();
// 自动返回模拟数据，不会抛出错误
```

---

## 模拟数据

当 Supabase 不可用时，API 会返回模拟数据：

### Mock Trending Tools
- Lovable (hype_score: 92)
- tldraw (hype_score: 85)
- Felvin (hype_score: 78)
- Sync Labs (hype_score: 71)
- Suno (hype_score: 68)

### Mock Tools
- ChatGPT, Midjourney, Claude
- Notion AI, GitHub Copilot
- Jasper, Runway, Suno

### Mock Categories
- AI写作 (120 tools)
- AI图像 (85 tools)
- AI编程 (64 tools)
- AI聊天 (56 tools)

---

## 性能优化

### 缓存策略

页面使用 ISR (Incremental Static Regeneration) 缓存:

```typescript
// app/page.tsx
export const revalidate = 3600; // 1小时
```

这意味着：
- 首次访问：服务器渲染
- 后续访问：缓存版本
- 1小时后：自动重新生成

### 并发请求

多个数据获取并行执行：

```typescript
const [trending, tools, categories] = await Promise.all([
  getTrendingTools(10),
  getFeaturedTools(8),
  getCategories(),
]);
```

---

## 类型定义

完整类型定义在 `lib/supabase.ts`：

```typescript
// 工具类型
interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  pricing_type: 'free' | 'paid' | 'freemium';
}

// 热度工具类型（更详细）
interface TrendingTool extends Tool {
  one_liner: string;
  website: string;
  repo_url?: string;
  hype_score: number;
  viral_coefficient: number;
  tier: '🔥 BREAKING' | '⚡ TRENDING' | '🚀 NEW';
  metrics: {
    github?: { stars: number; stars_per_day: number; forks: number };
    hackernews?: { votes: number; comments: number };
  };
  install_methods: string[];
}

// 分类类型
interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
  popularity: number;
}
```

---

**最后更新**: 2026-02-25
