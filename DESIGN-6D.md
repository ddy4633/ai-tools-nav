# 6维度拆解设计文档

## 1. 技术实现

### 组件架构
```
app/
├── layout.tsx              # 根布局 + 字体 + 元数据
├── page.tsx                # 首页 (Server Component)
├── loading.tsx             # 全局加载状态
├── error.tsx               # 全局错误处理
├── template.tsx            # 页面过渡动画 (新增)
├── tools/
│   ├── page.tsx            # 工具列表页
│   ├── ToolsClient.tsx     # 客户端搜索筛选
│   └── [id]/page.tsx       # 工具详情页
├── categories/
│   └── [slug]/page.tsx     # 分类页
└── blog/
    └── [slug]/page.tsx     # 博客文章

components/
├── home/                   # 首页区块组件
│   ├── Hero.tsx
│   ├── FeaturedTools.tsx
│   ├── TrendingTools.tsx
│   ├── EditorPicks.tsx
│   ├── Categories.tsx
│   └── NewsletterSection.tsx
├── layout/                 # 布局组件
│   ├── Header.tsx
│   └── Footer.tsx
├── tools/                  # 工具相关组件
│   ├── ToolsList.tsx       # 需要重构
│   └── ToolCardSkeleton.tsx # (新增)
├── ui/                     # 通用 UI 组件
│   ├── Breadcrumb.tsx
│   ├── Skeleton.tsx
│   └── StarRating.tsx
└── transitions/            # (新增)
    └── PageTransition.tsx  # 页面过渡动画

lib/
├── supabase.ts             # 数据层
└── content/
    └── tools-data.ts       # 静态数据

types/
└── tool.ts                 # 类型定义
```

### 状态管理
- **服务端状态**: React Server Components + fetch
- **客户端状态**: React useState/useMemo
- **全局状态**: 暂无需要（可用 Context 扩展）

### 数据流
```
Server Component
    ↓ fetch
Supabase / Mock Data
    ↓ props
Client Component (ToolsClient)
    ↓ state
UI (搜索/筛选结果)
```

### 类型定义
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
}

interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}
```

### 依赖清单
```json
{
  "dependencies": {
    "next": "^15.1.3",
    "react": "^19.2.4",
    "framer-motion": "^12.34.3",
    "lucide-react": "^0.564.0",
    "@supabase/supabase-js": "^2.95.3",
    "tailwindcss": "^4.1.18"
  }
}
```

---

## 2. 视觉设计

### 色彩系统
```css
/* 主背景 */
--bg-primary: #0a0a0f;      /* 深邃黑 */
--bg-secondary: #12121a;    /* 暗灰蓝 */
--bg-card: #1a1a2e;         /* 卡片背景 */
--bg-hover: #252542;        /* 悬停背景 */

/* 文字 */
--text-primary: #ffffff;      /* 纯白 */
--text-secondary: #a0a0b0;    /* 灰白 */
--text-muted: #6b6b80;        /* 暗灰 */
--text-accent: #00f5d4;       /* 霓虹青 */

/* 强调色 */
--accent-cyan: #00f5d4;       /* 主强调 */
--accent-pink: #ff006e;       /* 次强调 */
--accent-purple: #8338ec;     /* 第三强调 */
--accent-yellow: #ffbe0b;     /* 警告/高亮 */

/* 边框 */
--border-subtle: rgba(255, 255, 255, 0.1);
--border-glow: rgba(0, 245, 212, 0.3);
--border-card: rgba(255, 255, 255, 0.08);
```

### 字体系统
- **主字体**: Inter (Sans-serif) - 正文
- **等宽字体**: JetBrains Mono - 标题/代码风格
- **中文回退**: PingFang SC, Microsoft YaHei

### 间距系统
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
```

### 响应式断点
```css
/* Mobile First */
sm: 640px   /* 小屏手机 */
md: 768px   /* 平板 */
lg: 1024px  /* 小桌面 */
xl: 1280px  /* 大桌面 */
2xl: 1536px /* 超大屏 */
```

### 暗色模式
当前仅支持深色模式（强制）。如需浅色模式，需扩展：
```css
@media (prefers-color-scheme: light) {
  :root {
    --bg-primary: #ffffff;
    --text-primary: #0a0a0f;
    /* ... */
  }
}
```

---

## 3. 交互体验

### 加载状态
- **全局加载**: 旋转动画 + 霓虹光晕
- **骨架屏**: 脉冲动画的灰色块
- **按钮加载**: 禁用状态 + Spinner

### 空状态
```tsx
// 搜索结果为空
<div className="text-center py-12">
  <Search className="w-12 h-12 text-text-muted mx-auto mb-4" />
  <p className="text-text-secondary">没有找到匹配的工具</p>
  <p className="text-sm text-text-muted mt-2">试试其他关键词</p>
</div>
```

### 错误状态
- **全局错误**: error.tsx 捕获
- **数据获取错误**: 静默降级到 Mock 数据
- **表单错误**: 内联提示 + 红色边框

### 动效规范
```typescript
// 缓动函数
const easeOut = [0.22, 1, 0.36, 1];
const easeInOut = [0.65, 0, 0.35, 1];

// 动画时长
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

### 可访问性
- 所有交互元素有焦点样式
- 按钮有 aria-label
- 图片有 alt 文本
- 颜色对比度符合 WCAG 4.5:1

---

## 4. 性能优化

### 加载优化
- ✅ 动态导入减少初始包大小
- ✅ 图片懒加载 (loading="lazy")
- ✅ 字体 display: swap
- ✅ ISR 缓存 (revalidate = 3600)

### 运行时优化
- useMemo 缓存筛选结果
- 组件懒加载
- 避免不必要的重渲染

### 资源优化
```typescript
// next.config.js
{
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [...],
  },
  compress: true,
}
```

### 缓存策略
| 资源 | 策略 | 时长 |
|------|------|------|
| 静态页面 | ISR | 1小时 |
| Sitemap | ISR | 24小时 |
| 工具数据 | SSR + SWR | - |

---

## 5. SEO 优化

### Meta 标签
```tsx
export const metadata: Metadata = {
  title: '...',
  description: '...',
  keywords: [...],
  openGraph: { ... },
  twitter: { ... },
  robots: { index: true, follow: true },
  alternates: { canonical: '...' },
};
```

### 结构化数据
```tsx
// JSON-LD
{
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'AI工具导航',
  url: 'https://ai.poph163.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://ai.poph163.com/tools?search={search_term_string}',
  },
}
```

### URL 结构
- `/` - 首页
- `/tools` - 工具列表
- `/tools/[id]` - 工具详情
- `/categories` - 分类列表
- `/categories/[slug]` - 分类详情
- `/blog` - 博客列表
- `/blog/[slug]` - 博客文章

### 图片优化
- 所有图片有 alt 属性
- 使用 next/image (待优化)
- 生成 OpenGraph 图片

---

## 6. 验证方案

### 类型检查
```bash
npm run type-check
```

### 构建验证
```bash
npm run build
```

### 手动测试清单
- [ ] 首页正常加载
- [ ] 工具列表搜索/筛选正常
- [ ] 工具详情页正常
- [ ] 分类页面正常
- [ ] 移动端响应式正常
- [ ] 暗色主题一致
- [ ] 动画流畅

### 回归测试
- [ ] 所有页面无 404
- [ ] 所有链接可点击
- [ ] 表单提交正常
- [ ] SEO 元数据正确

### 性能测试
```bash
# Lighthouse
npx lighthouse https://ai.poph163.com --output=json

# Bundle 分析
npm run build:analyze
```
