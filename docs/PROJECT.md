# AI Tools Navigator - 项目文档

**项目名称**: 好工具 (AI Tools Navigator)  
**域名**: https://ai.poph163.com/  
**技术栈**: Next.js 15 + TypeScript + Tailwind CSS + Supabase  
**部署平台**: Dokploy  

---

## 📋 目录

1. [项目概述](#项目概述)
2. [快速开始](#快速开始)
3. [开发指南](#开发指南)
4. [API 文档](#api-文档)
5. [部署指南](#部署指南)
6. [项目结构](#项目结构)
7. [故障排除](#故障排除)

---

## 项目概述

### 简介
好工具是一个专注于 AI 工具发现和评测的中文导航站，帮助用户快速找到适合其需求的 AI 工具。

### 核心功能
- 🔥 **热度工具展示** - 基于社交热度的工具排行
- 🏷️ **分类浏览** - 按类别查找工具
- 🔍 **搜索功能** - 快速定位工具
- 📱 **响应式设计** - 移动端友好
- 📝 **工具提交** - 用户可以提交新工具

### 技术架构
- **前端**: Next.js 15 (App Router) + React 19 + TypeScript
- **样式**: Tailwind CSS 4.x
- **数据库**: Supabase (PostgreSQL)
- **部署**: Dokploy (Docker)
- **监控**: 内置健康检查 API

---

## 快速开始

### 环境要求
- Node.js 18+
- npm 或 yarn
- Git

### 安装步骤

```bash
# 1. 克隆仓库
git clone https://github.com/ddy4633/ai-tools-nav.git
cd ai-tools-nav

# 2. 安装依赖
npm install

# 3. 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 填入你的 Supabase 配置

# 4. 本地开发
npm run dev

# 5. 访问 http://localhost:3000
```

### 环境变量配置

```env
# Supabase 配置 (必需)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# 可选配置
NEXT_PUBLIC_SITE_URL=https://ai.poph163.com
NODE_ENV=production
```

---

## 开发指南

### 开发命令

```bash
# 开发模式
npm run dev

# 构建
npm run build

# 类型检查
npm run lint

# 生成 Supabase 类型
npm run db:types
```

### 代码规范

#### 组件规范
```typescript
// 组件文件: components/home/ToolCard.tsx
'use client';  // 客户端组件标记

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  // 组件实现
}
```

#### 类型定义
```typescript
// 类型定义在 lib/supabase.ts
interface Tool {
  id: string;
  name: string;
  description: string;
  pricing_type: 'free' | 'paid' | 'freemium';
  // ...
}
```

### 添加新页面

1. 在 `app/` 目录下创建新文件夹
2. 创建 `page.tsx` 文件
3. 添加必要的数据获取函数

示例:
```typescript
// app/new-page/page.tsx
import { getData } from '@/lib/supabase';

export default async function NewPage() {
  const data = await getData();
  
  return (
    <div>
      {/* 页面内容 */}
    </div>
  );
}
```

---

## API 文档

### 数据获取 API

#### getTrendingTools(limit?: number)
获取热度最高的工具列表

```typescript
import { getTrendingTools } from '@/lib/supabase';

const trending = await getTrendingTools(10);
```

**返回值**:
```typescript
{
  id: string;
  name: string;
  description: string;
  hype_score: number;  // 热度分数
  viral_coefficient: number;  // 传播系数
  tier: '🔥 BREAKING' | '⚡ TRENDING' | '🚀 NEW';
}
```

#### getFeaturedTools(limit?: number)
获取精选工具列表

```typescript
const featured = await getFeaturedTools(8);
```

#### getCategories()
获取所有分类

```typescript
const categories = await getCategories();
```

**返回值**:
```typescript
{
  id: string;
  name: string;
  slug: string;
  count: number;  // 工具数量
  popularity: number;  // 流行度 0-100
}
```

### 健康检查 API

```http
GET /api/health
```

**响应**:
```json
{
  "status": "ok",
  "timestamp": "2026-02-25T18:30:00.000Z"
}
```

---

## 部署指南

### Dokploy 部署 (推荐)

1. **Git 推送自动部署**
   ```bash
   git push origin main
   ```
   Dokploy 会自动检测到推送并重新部署

2. **查看部署状态**
   - 访问 Dokploy Dashboard
   - 查看部署日志
   - 确认网站可访问 https://ai.poph163.com/

### 环境变量配置

在 Dokploy Dashboard 中设置:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NODE_ENV=production
```

### 数据库初始化

首次部署需要初始化 Supabase 数据库:

1. 访问 Supabase Dashboard
2. 打开 SQL Editor
3. 执行 `supabase/init.sql` 中的 SQL 语句
4. 创建表结构和初始数据

---

## 项目结构

```
ai-tools-nav/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 首页
│   ├── layout.tsx         # 根布局
│   ├── globals.css        # 全局样式
│   ├── about/             # 关于页面
│   ├── tools/             # 工具列表页
│   ├── categories/        # 分类页面
│   ├── submit/            # 提交工具页面
│   ├── blog/              # 博客页面
│   └── api/               # API 路由
│       └── health/        # 健康检查
├── components/            # React 组件
│   ├── home/              # 首页组件
│   │   ├── Hero.tsx
│   │   ├── TrendingTools.tsx
│   │   ├── FeaturedTools.tsx
│   │   └── Categories.tsx
│   └── layout/            # 布局组件
│       ├── Header.tsx
│       └── Footer.tsx
├── lib/                   # 工具函数
│   └── supabase.ts        # Supabase 客户端
├── docs/                  # 项目文档
│   ├── PROJECT.md         # 本文档
│   └── business-plan.md   # 商业计划书
├── supabase/              # Supabase 相关
│   └── init.sql           # 数据库初始化脚本
├── public/                # 静态资源
├── package.json           # 依赖配置
├── next.config.js         # Next.js 配置
├── tailwind.config.ts     # Tailwind 配置
└── tsconfig.json          # TypeScript 配置
```

---

## 故障排除

### 构建失败

**错误**: `supabaseUrl is required`
- **原因**: 环境变量未设置
- **解决**: 确保 `.env.local` 文件存在且包含 Supabase 配置

**错误**: TypeScript 类型错误
- **原因**: 类型不匹配
- **解决**: 检查 `lib/supabase.ts` 中的类型定义

### 部署问题

**问题**: 部署后页面 404
- **检查**: 
  1. 确认构建成功
  2. 检查 Dokploy 日志
  3. 确认域名配置正确

**问题**: 数据库连接失败
- **检查**:
  1. Supabase URL 是否正确
  2. API Key 是否有权限
  3. 数据库是否已初始化

### 性能优化

1. **图片优化**: 使用 Next.js Image 组件
2. **代码分割**: 利用动态导入
3. **缓存策略**: 配置合理的 revalidate 时间
4. **数据库索引**: 确保常用查询有索引

---

## 更新日志

### 2026-02-25
- ✅ 修复 Supabase 客户端懒加载
- ✅ 修复 TypeScript 类型错误
- ✅ 完成项目文档
- ✅ 成功部署到 Dokploy

---

## 贡献指南

欢迎提交 Pull Request 或 Issue。

### 提交规范
- 使用清晰的 commit message
- 确保代码通过 lint 检查
- 更新相关文档

---

**维护者**: ddy4633  
**最后更新**: 2026-02-25
