# AISEOHUB 6维度拆解设计文档

**文档日期**: 2026-03-04  
**项目**: AI工具导航 (aiseohub)  
**迭代目标**: 丰富内容 + 优化体验

---

## 一、技术实现维度

### 1.1 组件架构

```
app/
├── layout.tsx              # 根布局 + Meta + JSON-LD
├── page.tsx                # 首页 (RSC + 动态导入)
├── loading.tsx             # 全局加载状态
├── error.tsx               # 全局错误边界
├── template.tsx            # 页面过渡动画
├── tools/
│   ├── page.tsx            # 工具列表 (RSC)
│   ├── ToolsClient.tsx     # 客户端搜索筛选
│   └── [id]/page.tsx       # 工具详情页
├── categories/
│   └── [slug]/page.tsx     # 分类页 (10个)
├── blog/
│   └── [slug]/page.tsx     # 博客文章
└── api/
    ├── health/route.ts     # 健康检查
    ├── tools/route.ts      # 工具API
    └── categories/route.ts # 分类API

components/
├── home/                   # 首页区块
├── layout/                 # Header + Footer
├── tools/                  # 工具相关
├── ui/                     # 通用UI
└── transitions/            # 动画组件

lib/
├── supabase.ts             # 数据层
└── content/
    └── tools-data.ts       # 静态数据

types/
└── tool.ts                 # 类型定义
```

### 1.2 状态管理

**服务端状态**:
- React Server Components
- Supabase fetch with ISR
- 静默降级到Mock数据

**客户端状态**:
```typescript
// ToolsClient.tsx
const [search, setSearch] = useState('');
const [selectedCategory, setSelectedCategory] = useState('all');
const [selectedPricing, setSelectedPricing] = useState('all');

// 派生状态用useMemo缓存
const filteredTools = useMemo(() => {...}, [...]);
```

### 1.3 数据流

```
Server Component (page.tsx)
    ↓ Promise.all([getTrending(), getFeatured(), getCategories()])
Supabase / Mock Data
    ↓ props
Client Component (ToolsClient)
    ↓ useState + useMemo
Filtered UI
```

### 1.4 类型定义

```typescript
// types/tool.ts
interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  pricing_type: 'free' | 'paid' | 'freemium';
  icon?: string;
  website?: string;
  average_rating?: number;
  rating_count?: number;
  tags?: string[];
  features?: string[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
  description?: string;
}
```

### 1.5 依赖清单

```json
{
  "next": "^15.1.3",
  "react": "^19.2.4",
  "framer-motion": "^12.34.3",
  "lucide-react": "^0.564.0",
  "@supabase/supabase-js": "^2.95.3",
  "tailwindcss": "^4.1.18",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.5.0"
}
```

---

## 二、视觉设计维度

### 2.1 色彩系统

```css
/* 主背景 */
--bg-primary: #0a0a0f;        /* 深邃黑 */
--bg-secondary: #12121a;      /* 暗灰蓝 */
--bg-card: #1a1a2e;           /* 卡片背景 */
--bg-hover: #252542;          /* 悬停背景 */

/* 文字 */
--text-primary: #ffffff;
--text-secondary: #a0a0b0;
--text-muted: #6b6b80;
--text-accent: #00f5d4;

/* 强调色 */
--accent-cyan: #00f5d4;       /* 霓虹青 */
--accent-pink: #ff006e;       /* 霓虹粉 */
--accent-purple: #8338ec;     /* 霓虹紫 */
--accent-yellow: #ffbe0b;     /* 警告 */

/* 边框 */
--border-subtle: rgba(255, 255, 255, 0.1);
--border-glow: rgba(0, 245, 212, 0.3);
--border-card: rgba(255, 255, 255, 0.08);
```

### 2.2 字体系统

| 用途 | 字体 | 回退 |
|------|------|------|
| 正文 | Inter | system-ui, sans-serif |
| 代码/标题 | JetBrains Mono | monospace |
| 中文 | PingFang SC | Microsoft YaHei |

### 2.3 间距系统

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

### 2.4 响应式断点

```css
sm: 640px   /* 手机 */
md: 768px   /* 平板 */
lg: 1024px  /* 小桌面 */
xl: 1280px  /* 大桌面 */
2xl: 1536px /* 超大屏 */
```

### 2.5 暗色模式

当前强制深色模式。如需浅色模式扩展:

```css
@media (prefers-color-scheme: light) {
  :root {
    --bg-primary: #fafafa;
    --text-primary: #0a0a0f;
    /* ... */
  }
}
```

---

## 三、交互体验维度

### 3.1 加载状态

**全局加载** (loading.tsx):
```tsx
<div className="flex items-center justify-center min-h-[50vh]">
  <div className="w-8 h-8 border-2 border-accent-cyan/30 border-t-accent-cyan rounded-full animate-spin" />
</div>
```

**骨架屏** (Skeleton.tsx):
```tsx
<div className="animate-pulse bg-bg-secondary rounded-lg h-32" />
```

**按钮加载**:
```tsx
<button disabled className="opacity-50 cursor-not-allowed">
  <Spinner className="animate-spin" />
</button>
```

### 3.2 空状态

```tsx
<div className="text-center py-16">
  <Search className="w-12 h-12 text-text-muted mx-auto mb-4" />
  <p className="text-text-primary text-lg font-mono mb-2">
    没有找到匹配的工具
  </p>
  <p className="text-text-muted text-sm font-mono mb-6">
    试试其他关键词
  </p>
  <button className="px-6 py-2 bg-accent-cyan/10 border border-accent-cyan/50 
                     text-accent-cyan font-mono rounded-lg">
    清除筛选
  </button>
</div>
```

### 3.3 错误状态

**全局错误** (error.tsx):
- 捕获React错误边界
- 显示友好错误信息
- 提供重试按钮

**数据获取错误**:
```typescript
try {
  data = await fetchData();
} catch {
  // 静默降级到Mock数据
  data = mockData;
}
```

### 3.4 动效规范

```typescript
// 缓动函数
const easeOut = [0.22, 1, 0.36, 1];
const easeInOut = [0.65, 0, 0.35, 1];

// 时长
const duration = {
  fast: 0.2,      // 悬停
  normal: 0.3,    // 过渡
  slow: 0.5,      // 页面
};

// 页面过渡
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};
```

### 3.5 可访问性

- 所有交互元素有焦点样式
- 按钮有 aria-label
- 图片有 alt 文本
- 颜色对比度 ≥ 4.5:1

---

## 四、性能优化维度

### 4.1 加载优化

| 技术 | 实现 | 效果 |
|------|------|------|
| 动态导入 | next/dynamic | 减少首屏JS |
| 图片懒加载 | loading="lazy" | 延迟加载 |
| 字体优化 | display: swap | 避免FOIT |
| ISR缓存 | revalidate=3600 | 增量更新 |
| Suspense | React.Suspense | 流式渲染 |

### 4.2 运行时优化

```typescript
// useMemo缓存筛选结果
const filteredTools = useMemo(() => {
  return tools.filter(...);
}, [tools, search, category, pricing]);

// 组件懒加载
const TrendingTools = dynamic(() => import('@/components/home/TrendingTools'), {
  loading: () => <TrendingToolsSkeleton />,
});
```

### 4.3 资源优化

```javascript
// next.config.js
{
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [...],
  },
  compress: true,
}
```

### 4.4 缓存策略

| 资源 | 策略 | 时长 |
|------|------|------|
| 静态页面 | ISR | 1小时 |
| Sitemap | ISR | 24小时 |
| 工具数据 | SSR + SWR | - |
| 静态资源 | Cache-Control | 1年 |

---

## 五、SEO优化维度

### 5.1 Meta标签

```tsx
export const metadata: Metadata = {
  title: {
    default: 'AI工具导航 - 发现1000+最好用的AI工具',
    template: '%s | AI工具导航',
  },
  description: '发现1000+国内免费最好用的AI工具...',
  keywords: ['AI工具', 'AI写作', 'AI绘画', ...],
  authors: [{ name: 'AI工具导航', url: '...' }],
  openGraph: {
    title: '...',
    description: '...',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    // ...
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://ai.poph163.com' },
};
```

### 5.2 结构化数据

```tsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'AI工具导航',
  url: siteUrl,
  description: '...',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteUrl}/tools?search={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};
```

### 5.3 URL结构

| 页面 | URL | 说明 |
|------|-----|------|
| 首页 | / | 主页面 |
| 工具列表 | /tools | 搜索+筛选 |
| 工具详情 | /tools/[id] | 详情页 |
| 分类列表 | /categories | 全部分类 |
| 分类详情 | /categories/[slug] | 分类页 |
| 博客列表 | /blog | 文章列表 |
| 博客文章 | /blog/[slug] | 文章页 |

### 5.4 图片优化

- 所有图片有 alt 属性
- 使用 next/image (优化中)
- OpenGraph 图片 1200x630

---

## 六、验证方案维度

### 6.1 类型检查

```bash
npm run type-check
# ✅ 通过 (无错误)
```

### 6.2 构建验证

```bash
npm run build
# ✅ 成功 (104页面)
# ✅ standalone输出
```

### 6.3 手动测试清单

| 检查项 | 状态 |
|--------|------|
| 首页正常加载 | ✅ |
| 工具搜索筛选 | ✅ |
| 工具详情页 | ✅ |
| 分类页面 | ✅ |
| 移动端响应式 | ✅ |
| 暗色主题 | ✅ |
| 动画流畅 | ✅ |

### 6.4 404回归测试

```bash
./quick_scan.sh
# ✅ 全部正常
```

### 6.5 SEO检查

| 检查项 | 状态 |
|--------|------|
| Meta标签 | ✅ |
| OpenGraph | ✅ |
| JSON-LD | ✅ |
| Sitemap | ✅ |
| Robots.txt | ✅ |
| Canonical | ✅ |

---

## 七、本次迭代任务

### 7.1 P0任务 (已完成)

- [x] 类型检查通过
- [x] 构建验证成功
- [x] 404扫描正常

### 7.2 P1任务 (执行中)

- [ ] 丰富工具数据 (添加热门AI工具)
- [ ] 添加新博客文章
- [ ] 优化现有内容

### 7.3 P2任务 (后续)

- [ ] 搜索自动完成
- [ ] 图片WebP优化
- [ ] 移动端体验优化

---

*文档生成时间: 2026-03-04 11:25*
