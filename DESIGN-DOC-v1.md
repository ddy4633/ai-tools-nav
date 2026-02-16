# AI工具导航站重构设计文档
## ai.poph163.com 视觉与体验重构方案

**文档版本**: v1.0  
**创建日期**: 2026-02-17  
**状态**: 设计阶段 → 开发实施

---

## 一、设计原则与品牌定位

### 1.1 品牌调性
**「工具箱里的老朋友」**
- 温暖、可信、有人情味
- 不是冷冰冰的目录，而是朋友间的真诚推荐
- 像一本手写的工具手册，有使用痕迹的"旧物感"

### 1.2 核心设计原则

| 原则 | 说明 | 落地方式 |
|------|------|----------|
| **温暖而非冰冷** | 用暖色调替代冷色调 | 米色系背景、陶土橙强调 |
| **故事而非列表** | 每个工具背后有故事 | 增加「为什么推荐」短句 |
| **克制而非堆砌** | 少即是多，留白重要 | 减少卡片数量，增加留白 |
| **人味而非机器味** | 文案像朋友推荐 | 口语化文案、编辑精选 |
| **惊喜而非平庸** | 微交互带来愉悦 | 悬停效果、手绘元素 |

---

## 二、视觉系统规范

### 2.1 色彩系统

```css
/* 主色调 */
--bg-primary: #F5F1EB;        /* 暖米色背景 */
--bg-secondary: #FAF8F5;      /* 更浅的米白 */
--bg-card: #FFFFFF;           /* 卡片纯白 */

/* 文字色 */
--text-primary: #2C2420;      /* 深棕文字 */
--text-secondary: #6B5E55;    /* 次要文字 */
--text-muted: #9B8B7B;        /* 弱化文字 */

/* 强调色 */
--accent-warm: #D4825A;       /* 陶土橙 */
--accent-warm-hover: #B86D45; /* 陶土橙悬停 */
--accent-cool: #4A5D4E;       /* 森林绿 */
--accent-cool-hover: #3D4D40; /* 森林绿悬停 */

/* 状态色 */
--status-free: #4A5D4E;       /* 免费 - 绿色 */
--status-paid: #D4825A;       /* 付费 - 橙色 */
--status-freemium: #6B5E55;   /*  Freemium - 灰色 */

/* 边框与阴影 */
--border-light: #E8E2D9;      /* 浅色边框 */
--border-medium: #D4CFC4;     /* 中等边框 */
--shadow-soft: 0 2px 8px rgba(44, 36, 32, 0.06);  /* 柔和阴影 */
--shadow-hover: 0 4px 16px rgba(44, 36, 32, 0.1); /* 悬停阴影 */
```

### 2.2 字体系统

```css
/* 中文字体 */
--font-display: "Source Han Serif CN", "Noto Serif SC", serif;  /* 标题 */
--font-body: "Source Han Sans CN", "Noto Sans SC", -apple-system, sans-serif;  /* 正文 */

/* 英文字体 */
--font-en: "Inter", -apple-system, sans-serif;

/* 字号 */
--text-xs: 0.75rem;      /* 12px - 标签 */
--text-sm: 0.875rem;     /* 14px - 次要信息 */
--text-base: 1rem;       /* 16px - 正文 */
--text-lg: 1.125rem;     /* 18px - 小标题 */
--text-xl: 1.25rem;      /* 20px - 卡片标题 */
--text-2xl: 1.5rem;      /* 24px - 区块标题 */
--text-3xl: 1.875rem;    /* 30px - 页面标题 */
--text-4xl: 2.25rem;     /* 36px - Hero标题 */

/* 行高 */
--leading-tight: 1.25;
--leading-normal: 1.6;
--leading-relaxed: 1.8;
```

### 2.3 间距系统

```css
/* 基础间距 */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */

/* 区块间距 */
--section-py: 5rem;       /* 区块上下间距 */
--section-py-lg: 6rem;    /* 大区块间距 */
--container-px: 1.5rem;   /* 容器左右内边距 */
--card-padding: 1.5rem;   /* 卡片内边距 */
```

### 2.4 圆角与边框

```css
/* 圆角 */
--radius-sm: 4px;     /* 小圆角 - 标签 */
--radius-md: 8px;     /* 中圆角 - 按钮 */
--radius-lg: 12px;    /* 大圆角 - 卡片 */
--radius-xl: 16px;    /* 超大圆角 - Hero */
--radius-full: 9999px; /* 全圆角 - 胶囊 */

/* 边框 */
--border-width: 1px;
--border-color: var(--border-light);
```

---

## 三、页面结构重构

### 3.1 整体布局调整

**旧布局问题：**
- 全宽渐变Hero，视觉冲击过强
- 完美对称网格，缺乏变化
- 页脚信息过载

**新布局设计：**
```
┌─────────────────────────────────────┐
│ Header (固定，简化)                  │
├─────────────────────────────────────┤
│                                     │
│  Hero区域                           │
│  - 手写风格标题                      │
│  - 简洁搜索框                        │
│  - 左侧留白，右侧内容                │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  编辑精选 (新板块)                   │
│  - 3-4个精选工具                     │
│  - 带编辑头像和评语                  │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  热门工具                           │
│  - 非对称网格布局                    │
│  - 卡片大小不一                      │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  分类浏览 (文字云)                   │
│  - 非均匀分布                        │
│  - 手绘图标                          │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  最新推荐                           │
│  - 时间线形式                        │
│  - 显示更新时间                      │
│                                     │
├─────────────────────────────────────┤
│  Footer (简化)                      │
└─────────────────────────────────────┘
```

### 3.2 Header 重构

**旧设计：**
- Logo + 导航 + 搜索按钮
- 白色背景 + 底部边框

**新设计：**
```tsx
// Header.tsx
<header className="sticky top-0 z-50 bg-[#F5F1EB]/95 backdrop-blur-sm">
  <div className="max-w-6xl mx-auto px-6">
    <div className="flex items-center justify-between h-16">
      {/* Logo - 简化 */}
      <Link href="/" className="flex items-center gap-2">
        <span className="text-xl font-serif text-[#2C2420]">
          好工具
        </span>
        <span className="text-xs text-[#9B8B7B] bg-[#E8E2D9] px-2 py-0.5 rounded">
          beta
        </span>
      </Link>
      
      {/* 导航 - 简化 */}
      <nav className="hidden md:flex items-center gap-8">
        <Link href="/tools" className="text-sm text-[#6B5E55] hover:text-[#2C2420] transition-colors">
          全部工具
        </Link>
        <Link href="/categories" className="text-sm text-[#6B5E55] hover:text-[#2C2420] transition-colors">
          分类
        </Link>
        <Link href="/about" className="text-sm text-[#6B5E55] hover:text-[#2C2420] transition-colors">
          关于
        </Link>
      </nav>
      
      {/* 搜索图标 */}
      <button className="p-2 text-[#6B5E55] hover:text-[#2C2420] transition-colors">
        <Search className="w-5 h-5" />
      </button>
    </div>
  </div>
</header>
```

### 3.3 Hero 区域重构

**旧文案：**
> 发现最好用的 AI 工具  
> 1000+ AI 工具，涵盖写作、图像、代码、音频等领域。帮你提升 10 倍效率

**新文案：**
> 「好工具，值得被看见」  
> 这里收集了我们真正用过、觉得好用的工具。没有广告，只有真诚的推荐。

**新设计：**
```tsx
// Hero.tsx
<section className="py-20 md:py-28 bg-[#F5F1EB]">
  <div className="max-w-6xl mx-auto px-6">
    <div className="max-w-2xl">
      {/* 手写风格标题 */}
      <h1 className="text-4xl md:text-5xl font-serif text-[#2C2420] mb-6 leading-tight">
        「好工具，<br />
        值得被看见」
      </h1>
      
      {/* 副标题 */}
      <p className="text-lg text-[#6B5E55] mb-8 leading-relaxed">
        这里收集了我们真正用过、觉得好用的工具。<br />
        没有广告，只有真诚的推荐。
      </p>
      
      {/* 搜索框 - 简化 */}
      <form className="relative max-w-lg">
        <input
          type="text"
          placeholder="搜索工具..."
          className="w-full px-5 py-3.5 bg-white border border-[#D4CFC4] rounded-lg text-[#2C2420] placeholder-[#9B8B7B] focus:outline-none focus:border-[#D4825A] focus:ring-2 focus:ring-[#D4825A]/20 transition-all"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-[#D4825A] text-white text-sm rounded-md hover:bg-[#B86D45] transition-colors">
          搜索
        </button>
      </form>
      
      {/* 快捷标签 */}
      <div className="mt-6 flex flex-wrap gap-2">
        {['ChatGPT', 'Claude', 'Midjourney', 'Notion'].map((tag) => (
          <a
            key={tag}
            href={`/tools?search=${tag}`}
            className="px-3 py-1 text-sm text-[#6B5E55] bg-[#E8E2D9] rounded-full hover:bg-[#D4CFC4] transition-colors"
          >
            {tag}
          </a>
        ))}
      </div>
    </div>
  </div>
</section>
```

### 3.4 工具卡片重构

**旧结构：**
- 图标(字母) + 名称 + 描述 + 星级(4.9) + 分类标签 + 付费标签

**新结构：**
```tsx
// ToolCard.tsx
interface ToolCardProps {
  tool: {
    id: string;
    name: string;
    description: string;
    reason: string;        // 新增：推荐理由
    category: string;
    pricingType: 'free' | 'paid' | 'freemium';
    icon?: string;         // 图标URL
  };
}

const ToolCard = ({ tool }: ToolCardProps) => {
  const pricingLabels = {
    free: { text: '免费', class: 'bg-[#4A5D4E]/10 text-[#4A5D4E]' },
    paid: { text: '付费', class: 'bg-[#D4825A]/10 text-[#D4825A]' },
    freemium: { text: '部分免费', class: 'bg-[#6B5E55]/10 text-[#6B5E55]' },
  };
  
  return (
    <a
      href={`/tools/${tool.id}`}
      className="group block bg-white rounded-xl border border-[#E8E2D9] p-5 hover:shadow-lg hover:border-[#D4CFC4] transition-all duration-300"
    >
      {/* 头部：图标 + 名称 */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-lg bg-[#F5F1EB] flex items-center justify-center flex-shrink-0 overflow-hidden">
          {tool.icon ? (
            <img src={tool.icon} alt="" className="w-8 h-8 object-contain" />
          ) : (
            <span className="text-xl text-[#D4825A] font-serif">
              {tool.name[0]}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-[#2C2420] group-hover:text-[#D4825A] transition-colors">
            {tool.name}
          </h3>
          <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded ${pricingLabels[tool.pricingType].class}`}>
            {pricingLabels[tool.pricingType].text}
          </span>
        </div>
      </div>
      
      {/* 推荐理由 - 重点 */}
      <p className="text-[#6B5E55] text-sm leading-relaxed mb-4">
        「{tool.reason}」
      </p>
      
      {/* 底部分类 */}
      <div className="flex items-center justify-between pt-4 border-t border-[#F5F1EB]">
        <span className="text-xs text-[#9B8B7B]">
          {tool.category}
        </span>
        <span className="text-xs text-[#D4825A] opacity-0 group-hover:opacity-100 transition-opacity">
          查看详情 →
        </span>
      </div>
    </a>
  );
};
```

### 3.5 编辑精选板块（新增）

```tsx
// EditorPicks.tsx
<section className="py-16 bg-white">
  <div className="max-w-6xl mx-auto px-6">
    <div className="flex items-center gap-3 mb-8">
      <span className="text-2xl">👋</span>
      <h2 className="text-2xl font-serif text-[#2C2420]">编辑精选</h2>
      <span className="text-sm text-[#9B8B7B]">本周我们最爱的工具</span>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {editorPicks.map((pick) => (
        <div key={pick.id} className="bg-[#F5F1EB] rounded-xl p-6">
          <ToolCard tool={pick.tool} />
          <div className="mt-4 pt-4 border-t border-[#E8E2D9] flex items-center gap-3">
            <img 
              src={pick.editor.avatar} 
              alt={pick.editor.name}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-sm text-[#6B5E55]">"{pick.editor.comment}"</p>
              <p className="text-xs text-[#9B8B7B]">— {pick.editor.name}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

### 3.6 分类导航重构

**旧设计：** 6个图标卡片网格

**新设计：** 文字云形式
```tsx
// CategoryCloud.tsx
<section className="py-16 bg-[#F5F1EB]">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-2xl font-serif text-[#2C2420] mb-8">按分类浏览</h2>
    
    <div className="flex flex-wrap gap-3">
      {categories.map((cat) => (
        <a
          key={cat.id}
          href={`/categories/${cat.id}`}
          className="px-4 py-2 bg-white border border-[#E8E2D9] rounded-lg text-[#6B5E55] hover:text-[#D4825A] hover:border-[#D4825A] hover:shadow-md transition-all"
          style={{
            fontSize: cat.popularity > 80 ? '1.125rem' : cat.popularity > 50 ? '1rem' : '0.875rem',
          }}
        >
          {cat.name}
          <span className="ml-2 text-xs text-[#9B8B7B]">({cat.count})</span>
        </a>
      ))}
    </div>
  </div>
</section>
```

### 3.7 Footer 重构

**旧设计：** 4列网格，信息过载

**新设计：**
```tsx
// Footer.tsx
<footer className="bg-[#2C2420] text-[#9B8B7B] py-12">
  <div className="max-w-6xl mx-auto px-6">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      {/* 左侧 */}
      <div>
        <h3 className="text-lg font-serif text-[#F5F1EB] mb-2">好工具</h3>
        <p className="text-sm">收集真正好用的工具，真诚推荐。</p>
      </div>
      
      {/* 右侧链接 */}
      <div className="flex items-center gap-6 text-sm">
        <a href="/about" className="hover:text-[#F5F1EB] transition-colors">关于我们</a>
        <a href="/submit" className="hover:text-[#F5F1EB] transition-colors">提交工具</a>
        <a href="mailto:hello@poph163.com" className="hover:text-[#F5F1EB] transition-colors">联系我们</a>
      </div>
    </div>
    
    <div className="mt-8 pt-8 border-t border-[#3D352F] text-xs text-center">
      <p>© 2025 好工具. 用心推荐每一款工具。</p>
    </div>
  </div>
</footer>
```

---

## 四、交互设计规范

### 4.1 悬停效果

```css
/* 卡片悬停 */
.card-hover {
  transition: all 0.3s ease;
}
.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(44, 36, 32, 0.1);
  border-color: #D4CFC4;
}

/* 链接悬停 */
.link-hover {
  transition: color 0.2s ease;
}
.link-hover:hover {
  color: #D4825A;
}

/* 按钮悬停 */
.btn-hover {
  transition: all 0.2s ease;
}
.btn-hover:hover {
  background-color: #B86D45;
  transform: translateY(-1px);
}
```

### 4.2 加载状态

**旧设计：** 旋转圆圈

**新设计：** 骨架屏
```tsx
// Skeleton.tsx
const ToolCardSkeleton = () => (
  <div className="bg-white rounded-xl border border-[#E8E2D9] p-5 animate-pulse">
    <div className="flex items-start gap-4 mb-4">
      <div className="w-12 h-12 rounded-lg bg-[#F5F1EB]" />
      <div className="flex-1">
        <div className="h-5 bg-[#F5F1EB] rounded w-24 mb-2" />
        <div className="h-4 bg-[#F5F1EB] rounded w-12" />
      </div>
    </div>
    <div className="h-4 bg-[#F5F1EB] rounded w-full mb-2" />
    <div className="h-4 bg-[#F5F1EB] rounded w-3/4" />
  </div>
);
```

### 4.3 页面过渡

```tsx
// 使用 Next.js 的页面过渡
// layout.tsx
import { AnimatePresence } from 'framer-motion';

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body className="bg-[#F5F1EB] text-[#2C2420]">
        <Header />
        <AnimatePresence mode="wait">
          <main className="flex-1">{children}</main>
        </AnimatePresence>
        <Footer />
      </body>
    </html>
  );
}
```

---

## 五、数据结构更新

### 5.1 工具数据结构

```typescript
// types/tool.ts
interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  reason: string;           // 新增：推荐理由
  fullReview?: string;      // 新增：详细评测
  category: string;
  categorySlug: string;
  pricingType: 'free' | 'paid' | 'freemium';
  priceRange?: string;      // 新增：价格区间
  website: string;
  icon: string;
  screenshots?: string[];   // 新增：截图
  features: string[];       // 新增：功能特点
  pros: string[];           // 新增：优点
  cons: string[];           // 新增：缺点
  alternatives: string[];   // 新增：替代品
  editorRating?: number;    // 新增：编辑评分
  userRating?: number;      // 新增：用户评分
  createdAt: string;
  updatedAt: string;
  isEditorsPick: boolean;   // 新增：是否精选
  isFeatured: boolean;      // 新增：是否推荐
}
```

### 5.2 编辑数据结构

```typescript
// types/editor.ts
interface Editor {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  role: 'editor' | 'admin';
}

interface EditorPick {
  id: string;
  tool: Tool;
  editor: Editor;
  comment: string;          // 编辑评语
  pickedAt: string;
}
```

---

## 六、性能优化方案

### 6.1 图片优化

```tsx
// next.config.js
module.exports = {
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
};

// 使用 next/image
import Image from 'next/image';

<Image
  src={tool.icon}
  alt={tool.name}
  width={48}
  height={48}
  className="rounded-lg"
  loading="lazy"
/>
```

### 6.2 字体优化

```tsx
// 使用 next/font
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});
```

### 6.3 数据获取优化

```tsx
// 使用 React Server Components
// page.tsx
export default async function HomePage() {
  const tools = await getTools(); // Server-side fetch
  const picks = await getEditorPicks();
  
  return (
    <>
      <Hero />
      <EditorPicks picks={picks} />
      <FeaturedTools tools={tools} />
    </>
  );
}
```

---

## 七、测试清单

### 7.1 功能测试

| 页面 | 测试项 | 期望结果 |
|------|--------|----------|
| 首页 | Hero搜索框 | 输入关键词，跳转到/tools?search=xxx |
| 首页 | 快捷标签点击 | 正确跳转并带搜索参数 |
| 首页 | 工具卡片点击 | 跳转到工具详情页 |
| 首页 | 分类标签点击 | 跳转到分类页面 |
| 工具列表 | 搜索功能 | 实时过滤工具列表 |
| 工具列表 | 分类筛选 | 按分类筛选工具 |
| 工具详情 | 外部链接 | 正确打开工具官网 |
| 工具详情 | 返回按钮 | 返回上一页 |
| 导航 | Header链接 | 所有链接可正常跳转 |
| 导航 | 移动端菜单 | 响应式菜单正常展开/收起 |
| 页脚 | 链接点击 | 关于、提交、联系链接正常 |

### 7.2 视觉测试

| 测试项 | 检查点 |
|--------|--------|
| 色彩一致性 | 所有页面使用统一配色 |
| 字体渲染 | 中文、英文正确显示 |
| 响应式布局 | 移动端、平板、桌面端正常显示 |
| 悬停效果 | 卡片、按钮悬停有反馈 |
| 加载状态 | 骨架屏正常显示 |
| 图片加载 | 工具图标正确显示 |

### 7.3 性能测试

| 指标 | 目标 |
|------|------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3.5s |
| Cumulative Layout Shift | < 0.1 |

### 7.4 兼容性测试

- Chrome / Edge / Safari / Firefox
- iOS Safari / Android Chrome
- 不同屏幕尺寸

---

## 八、实施计划

### Phase 1: 基础重构（P0）
- [ ] 更新全局样式变量
- [ ] 重构 Header 组件
- [ ] 重构 Hero 组件
- [ ] 重构 Footer 组件
- [ ] 更新配色系统

### Phase 2: 内容重构（P1）
- [ ] 重构工具卡片
- [ ] 添加编辑精选板块
- [ ] 重构分类导航
- [ ] 更新文案内容

### Phase 3: 细节优化（P2）
- [ ] 添加微交互
- [ ] 优化图片加载
- [ ] 完善错误处理
- [ ] 添加骨架屏

### Phase 4: 全面测试
- [ ] 功能测试
- [ ] 视觉测试
- [ ] 性能测试
- [ ] 兼容性测试

---

## 九、附录

### 9.1 参考资源
- 字体：https://github.com/adobe-fonts/source-han-serif
- 配色：https://www.colorhunt.co/palette/f5f1ebe8e2d9d4825a2c2420
- 设计灵感：https://www.are.na/

### 9.2 更新日志
- 2026-02-17: 初始版本 v1.0

---

**文档结束**
