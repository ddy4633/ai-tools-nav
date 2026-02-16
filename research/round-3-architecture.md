# Round 3: 网站架构与内容策略

## 1. 信息架构 (IA)

### 1.1 网站地图
```
/
├── 首页 (AI工具导航)
│   ├── 热门工具推荐
│   ├── 最新上架
│   ├── 分类导航
│   └── 搜索入口
│
├── /categories/ (分类页)
│   ├── /writing/ (AI写作)
│   ├── /image/ (AI图像)
│   ├── /video/ (AI视频)
│   ├── /audio/ (AI音频)
│   ├── /code/ (AI编程)
│   ├── /chat/ (AI对话)
│   ├── /productivity/ (AI效率)
│   ├── /design/ (AI设计)
│   └── /business/ (AI商业)
│
├── /tools/ (工具详情页)
│   └── /{tool-slug}/
│       ├── 工具介绍
│       ├── 功能特点
│       ├── 价格对比
│       ├── 用户评价
│       └── 相似工具
│
├── /blog/ (博客文章)
│   ├── /guides/ (使用教程)
│   ├── /comparisons/ (对比评测)
│   ├── /lists/ (排行榜单)
│   └── /news/ (行业资讯)
│
├── /about/ (关于我们)
├── /contact/ (联系方式)
└── /submit/ (提交工具)
```

### 1.2 URL 结构规范
```
首页: /
分类页: /categories/{category-slug}/
工具页: /tools/{tool-slug}/
文章页: /blog/{article-slug}/
标签页: /tags/{tag-name}/
```

## 2. 页面设计规范

### 2.1 首页结构

**Hero Section**
- 主标题: "发现最好用的 AI 工具"
- 副标题: "1000+ AI 工具，帮你提升 10 倍效率"
- CTA 按钮: "开始探索" + 搜索框

**热门分类 (8个)**
- AI 写作
- AI 图像
- AI 视频
- AI 编程
- AI 对话
- AI 音频
- AI 设计
- AI 效率

**本周热门 (6个工具)**
- 卡片式展示
- 工具图标
- 简短描述
- 评分
- "免费试用" 按钮

**最新上架 (滚动列表)**
- 工具名称 + 分类 + 添加时间

### 2.2 分类页结构

**页面顶部**
- 分类标题 + 描述
- 工具数量统计
- 筛选器 (免费/付费/评分)

**工具列表**
- 网格布局 (3列桌面 / 2列平板 / 1列手机)
- 工具卡片:
  - Logo
  - 名称
  - 一句话描述
  - 标签 (免费/付费)
  - 评分
  - "查看详情" 按钮

**分页/无限滚动**
- 每页 24 个工具

### 2.3 工具详情页结构

**顶部信息**
- 工具 Logo + 名称
- 一句话 slogan
- 评分 + 评论数
- 主要标签
- "访问官网" CTA (联盟链接)

**内容区块**
1. **功能介绍** (富文本)
2. **价格对比** (表格)
3. **使用教程** (视频/图文)
4. **用户评价** (5条精选)
5. **相似工具** (3个推荐)

**侧边栏**
- 快速导航
- 分类推荐
- 热门文章

## 3. 内容策略

### 3.1 内容类型矩阵

| 内容类型 | 数量目标 | 更新频率 | SEO价值 | 用户价值 |
|----------|----------|----------|---------|----------|
| 工具收录 | 500+ | 每日 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 列表文章 | 50篇 | 每周2篇 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| 对比评测 | 30篇 | 每周1篇 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 教程指南 | 40篇 | 每周1篇 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 行业资讯 | 20篇 | 每月4篇 | ⭐⭐⭐ | ⭐⭐⭐ |

### 3.2 首批内容清单 (MVP)

**工具收录 (首批 100个)**

AI写作 (15个):
1. ChatGPT / OpenAI
2. Claude (Anthropic)
3. Jasper
4. Copy.ai
5. Writesonic
6. Notion AI
7. Grammarly
8. 文心一言
9. 通义千问
10. Kimi
11. 豆包
12. 智谱清言
13. 讯飞星火
14. 秘塔写作猫
15. 笔灵 AI

AI图像 (15个):
1. Midjourney
2. DALL-E 3
3. Stable Diffusion
4. Adobe Firefly
5. Canva AI
6. Remove.bg
7. Upscayl
8. 通义万相
9. 文心一格
10. 即时 AI
11. 堆友 AI
12. 稿定 AI
13. 创客贴 AI
14. 可灵 AI
15. 美图秀秀 AI

AI编程 (10个):
1. GitHub Copilot
2. Cursor
3. Claude Code
4. Codeium
5. Tabnine
6. Amazon CodeWhisperer
7. Replit Ghostwriter
8. Sourcegraph Cody
9. JetBrains AI
10. CodeGeeX

AI对话 (10个):
1. ChatGPT
2. Claude
3. Google Bard
4. Microsoft Copilot
5. Perplexity
6. Poe
7. Character.AI
8. 文心一言
9. 通义千问
10. Kimi

(其他分类各收录 10-15 个工具)

**首批文章 (10篇)**

1. "2026年最好用的 20 个 AI 写作工具" (P0)
2. "ChatGPT vs Claude: 深度对比评测" (P0)
3. "10个免费的 AI 图像生成器推荐" (P0)
4. "Midjourney 完全使用指南 (中文版)" (P0)
5. "程序员必备的 15 个 AI 编程助手" (P0)
6. "AI工具导航: 从入门到精通" (支柱)
7. "小众但好用的 10 个国产 AI 工具" (P0)
8. "AI写作工具价格对比: 哪个最划算?" (商业)
9. "学生党必看: 免费 AI 学习工具合集" (细分)
10. "设计师的 AI 工具箱: 从图像到视频" (细分)

### 3.3 内容模板

**工具列表文章模板**:
```markdown
# {数字}个最好用的{分类}AI工具

## 快速对比
| 工具 | 免费额度 | 价格 | 中文支持 | 推荐指数 |
|------|----------|------|----------|----------|
| {工具1} | {额度} | {价格} | ✅/❌ | ⭐⭐⭐⭐⭐ |

## 详细评测

### 1. {工具名}
**一句话描述**: {slogan}
**核心功能**:
- {功能1}
- {功能2}
- {功能3}

**价格**:
- 免费版: {额度}
- 付费版: {价格}/月

**优缺点**:
✅ 优点:
- {优点1}
- {优点2}

❌ 缺点:
- {缺点1}

**适合人群**: {人群}
**直达链接**: [免费试用]({联盟链接})

---

### 2. {工具2}
...

## 总结
{总结建议}

## 常见问题
Q: {问题1}
A: {答案1}
```

**对比评测模板**:
```markdown
# {工具A} vs {工具B}: 深度对比

## 快速结论
- 选 {A} 如果: {场景}
- 选 {B} 如果: {场景}

## 详细对比

### 功能对比
| 功能 | {A} | {B} |
|------|-----|-----|
| {功能1} | ✅ | ❌ |
| {功能2} | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

### 价格对比
{A}:
- 免费: {额度}
- Plus: {价格}

{B}:
- 免费: {额度}
- Pro: {价格}

### 使用体验
{A}:
- ✅ {优点}
- ❌ {缺点}

{B}:
- ✅ {优点}
- ❌ {缺点}

## 最终推荐
{推荐结论}
```

## 4. 技术栈选择

### 4.1 推荐方案 A: Next.js + Supabase (推荐)

**优势**:
- SEO 友好 (SSR)
- 性能优秀
- 生态成熟
- 免费部署 (Vercel)

**技术栈**:
```
前端: Next.js 14 + Tailwind CSS + shadcn/ui
后端: Supabase (PostgreSQL + Auth)
部署: Vercel (免费)
图片: Cloudinary / 本地
分析: Vercel Analytics + Google Analytics
```

**成本**:
- 域名: ¥100/年
- 其他: ¥0 (免费额度足够)

### 4.2 推荐方案 B: Astro + Markdown (内容优先)

**优势**:
- 极致性能
- 内容管理简单
- 静态生成，CDN 友好

**适合**: 内容为主，交互较少

### 4.3 推荐方案 C: WordPress (快速启动)

**优势**:
- 上手快
- 插件丰富
- 非技术友好

**劣势**:
- 性能一般
- 维护成本

## 5. 数据模型

### 5.1 Tool (工具)
```typescript
interface Tool {
  id: string;
  slug: string;
  name: string;
  logo: string;
  description: string;
  category: string[];
  tags: string[];
  website: string;
  affiliateLink?: string;
  pricing: {
    hasFree: boolean;
    freeQuota?: string;
    paidPlan: {
      name: string;
      price: number;
      billing: 'monthly' | 'yearly';
    }[];
  };
  features: string[];
  pros: string[];
  cons: string[];
  rating: number;
  reviewCount: number;
  screenshots: string[];
  isChinese: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### 5.2 Category (分类)
```typescript
interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  toolCount: number;
  metaTitle: string;
  metaDescription: string;
}
```

### 5.3 Article (文章)
```typescript
interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'guide' | 'comparison' | 'list' | 'news';
  tags: string[];
  featuredImage: string;
  author: string;
  publishedAt: Date;
  updatedAt: Date;
  viewCount: number;
}
```

## 6. MVP 开发计划

### Week 1: 基础框架
- [ ] 项目初始化 (Next.js + shadcn)
- [ ] 数据库设计 (Supabase)
- [ ] 首页框架
- [ ] 导航组件

### Week 2: 核心功能
- [ ] 分类页
- [ ] 工具详情页
- [ ] 搜索功能
- [ ] 数据录入 (20个工具)

### Week 3: 内容优化
- [ ] SEO 优化
- [ ] 首批文章 (5篇)
- [ ] 联盟链接配置
- [ ] 性能优化

### Week 4: 上线准备
- [ ] 域名配置
- [ ] Search Console
- [ ] Analytics
- [ ] 正式上线

## 7. 下一步行动

### 立即执行
1. [ ] 确定技术栈 (推荐 Next.js)
2. [ ] 购买域名
3. [ ] 初始化项目

### 本周目标
1. [ ] 完成 MVP 开发
2. [ ] 录入 100 个工具数据
3. [ ] 发布 5 篇文章

---

*Round 3 完成*
*进入 Round 4: 技术实现与开发*
