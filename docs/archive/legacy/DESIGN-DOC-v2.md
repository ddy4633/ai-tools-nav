# AI工具导航站重构设计文档 v2.0
## 酷炫科技风格（Cyberpunk主题）

**文档版本**: v2.0  
**创建日期**: 2026-02-27  
**状态**: 🔄 重构中

---

## 一、设计理念

### 1.1 品牌调性转变
**从「温暖人文」到「酷炫科技」**

| 维度 | v1.0 (旧) | v2.0 (新) |
|------|-----------|-----------|
| 感觉 | 温暖、手写、人文 | 科技、未来、精确 |
| 氛围 | 朋友推荐 | 工程师工具 |
| 比喻 | 工具手册 | 终端控制台 |
| 情绪 | 舒适、亲切 | 酷炫、专业 |

### 1.2 设计关键词
- **Cyberpunk** - 霓虹、深色、高科技
- **Developer Tools** - 精确、功能性、专业
- **Space Tech** - 太空科技、极简、未来感
- **Terminal Aesthetic** - 终端风格、等宽字体、代码感

---

## 二、视觉系统规范

### 2.1 色彩系统

```css
/* 主背景色 - 深邃宇宙 */
--bg-primary: #0a0a0f;       /* 深邃黑 - 主背景 */
--bg-secondary: #12121a;     /* 暗灰蓝 - 次背景 */
--bg-card: #1a1a2e;          /* 卡片背景 */
--bg-hover: #252542;         /* 悬停背景 */
--bg-code: #0d1117;          /* 代码块背景 */

/* 文字色 */
--text-primary: #ffffff;         /* 纯白 - 主文字 */
--text-secondary: #a0a0b0;       /* 灰白 - 次要文字 */
--text-muted: #6b6b80;           /* 暗灰 - 弱化文字 */
--text-accent: #00f5d4;          /* 霓虹青 - 强调文字 */

/* 霓虹强调色 */
--accent-cyan: #00f5d4;      /* 霓虹青 - 主强调 */
--accent-pink: #ff006e;      /* 霓虹粉 - 次强调 */
--accent-purple: #8338ec;    /* 霓虹紫 - 第三强调 */
--accent-yellow: #ffbe0b;    /* 霓虹黄 - 警告/高亮 */

/* 渐变色 */
--gradient-cyber: linear-gradient(135deg, #00f5d4 0%, #8338ec 100%);
--gradient-heat: linear-gradient(135deg, #ff006e 0%, #ffbe0b 100%);
--gradient-dark: linear-gradient(180deg, #0a0a0f 0%, #12121a 100%);

/* 边框 */
--border-subtle: rgba(255, 255, 255, 0.1);
--border-glow: rgba(0, 245, 212, 0.3);
--border-card: rgba(255, 255, 255, 0.08);

/* 阴影/光晕 */
--glow-cyan: 0 0 20px rgba(0, 245, 212, 0.3);
--glow-pink: 0 0 20px rgba(255, 0, 110, 0.3);
--glow-purple: 0 0 20px rgba(131, 56, 236, 0.3);
--shadow-card: 0 4px 24px rgba(0, 0, 0, 0.4);
```

### 2.2 字体系统

```css
/* 主字体 - 等宽风格 */
--font-mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
--font-sans: 'Inter', 'SF Pro Display', -apple-system, system-ui, sans-serif;

/* 中文适配 */
--font-zh: 'Inter', 'PingFang SC', 'Microsoft YaHei', sans-serif;

/* 字号系统 */
--text-xs: 0.75rem;      /* 12px - 标签/状态 */
--text-sm: 0.875rem;     /* 14px - 次要信息 */
--text-base: 1rem;       /* 16px - 正文 */
--text-lg: 1.125rem;     /* 18px - 小标题 */
--text-xl: 1.25rem;      /* 20px - 卡片标题 */
--text-2xl: 1.5rem;      /* 24px - 区块标题 */
--text-3xl: 1.875rem;    /* 30px - 页面标题 */
--text-4xl: 2.25rem;     /* 36px - Hero标题 */
--text-5xl: 3rem;        /* 48px - 大标题 */
--text-6xl: 3.75rem;     /* 60px - 超大标题 */

/* 行高 */
--leading-tight: 1.2;
--leading-normal: 1.5;
--leading-relaxed: 1.7;
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
--section-py: 6rem;
--container-px: 1.5rem;
--card-padding: 1.5rem;
```

### 2.4 圆角系统

```css
--radius-sm: 4px;     /* 小圆角 - 标签 */
--radius-md: 8px;     /* 中圆角 - 按钮 */
--radius-lg: 12px;    /* 大圆角 - 卡片 */
--radius-xl: 16px;    /* 超大圆角 */
--radius-full: 9999px; /* 全圆角 */
```

---

## 三、页面结构重构

### 3.1 整体布局

```
┌────────────────────────────────────────────┐
│ Header (固定，玻璃态效果)                   │
├────────────────────────────────────────────┤
│                                            │
│  Hero区域                                  │
│  - 动态打字机效果标题                       │
│  - 科技网格背景                             │
│  - 霓虹光晕装饰                             │
│  - 终端风格搜索框                           │
│                                            │
├────────────────────────────────────────────┤
│                                            │
│  精选工具                                  │
│  - 发光边框卡片                             │
│  - 悬停霓虹效果                             │
│                                            │
├────────────────────────────────────────────┤
│                                            │
│  热门工具                                  │
│  - 网格布局                                 │
│  - 数据流式装饰                             │
│                                            │
├────────────────────────────────────────────┤
│                                            │
│  分类导航                                  │
│  - 霓虹标签云                               │
│                                            │
├────────────────────────────────────────────┤
│  Footer (极简科技风)                        │
└────────────────────────────────────────────┘
```

### 3.2 Header 设计

```tsx
// Header - 玻璃态效果
<header className="sticky top-0 z-50 bg-bg-primary/80 backdrop-blur-xl border-b border-border-subtle">
  {/* 霓虹下划线装饰 */}
  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/50 to-transparent" />
  
  <div className="max-w-7xl mx-auto px-6">
    <div className="flex items-center justify-between h-16">
      {/* Logo - 霓虹效果 */}
      <Link href="/" className="flex items-center gap-2 group">
        <span className="text-xl font-mono font-bold text-text-primary">
          <span className="text-accent-cyan">&gt;</span>_TOOLS
        </span>
        <span className="text-xs font-mono text-accent-cyan/70 border border-accent-cyan/30 px-1.5 py-0.5 rounded">
          v2.0
        </span>
      </Link>
      
      {/* 导航 - 发光悬停 */}
      <nav className="hidden md:flex items-center gap-8">
        {['TOOLS', 'CATEGORIES', 'ABOUT'].map((item) => (
          <Link 
            key={item}
            href={`/${item.toLowerCase()}`}
            className="text-sm font-mono text-text-secondary hover:text-accent-cyan transition-colors relative group"
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent-cyan group-hover:w-full transition-all" />
          </Link>
        ))}
      </nav>
    </div>
  </div>
</header>
```

### 3.3 Hero 区域设计

```tsx
// Hero - 科技感强烈的头部
<section className="relative py-32 md:py-40 overflow-hidden">
  {/* 背景网格 */}
  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,212,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
  
  {/* 霓虹光晕装饰 */}
  <div className="absolute top-20 left-1/4 w-96 h-96 bg-accent-cyan/20 rounded-full blur-3xl" />
  <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl" />
  
  <div className="relative max-w-7xl mx-auto px-6">
    <div className="max-w-3xl">
      {/* 终端风格标签 */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-cyan/10 border border-accent-cyan/30 rounded-full mb-8">
        <span className="w-2 h-2 bg-accent-cyan rounded-full animate-pulse" />
        <span className="text-sm font-mono text-accent-cyan">SYSTEM.ONLINE</span>
      </div>
      
      {/* 打字机效果标题 */}
      <h1 className="text-5xl md:text-7xl font-mono font-bold mb-6">
        <span className="text-text-primary">DISCOVER</span>
        <br />
        <span className="bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
          NEXT_GEN
        </span>
        <br />
        <span className="text-text-primary">TOOLS</span>
      </h1>
      
      {/* 副标题 */}
      <p className="text-lg md:text-xl text-text-secondary font-mono mb-12 max-w-2xl">
        <span className="text-accent-cyan">$</span> curating_the_best_developer_tools_from_the_future
      </p>
      
      {/* 终端风格搜索框 */}
      <div className="relative max-w-2xl">
        <div className="absolute inset-0 bg-accent-cyan/20 rounded-xl blur-xl" />
        <form className="relative flex items-center bg-bg-card border border-border-glow rounded-xl overflow-hidden">
          <span className="pl-4 text-accent-cyan font-mono">&gt;</span>
          <input
            type="text"
            placeholder="search_tools --category=ai"
            className="flex-1 px-4 py-4 bg-transparent text-text-primary font-mono placeholder:text-text-muted focus:outline-none"
          />
          <button className="px-6 py-2 m-2 bg-accent-cyan/10 border border-accent-cyan/50 rounded-lg text-accent-cyan font-mono hover:bg-accent-cyan/20 transition-colors">
            EXECUTE
          </button>
        </form>
      </div>
    </div>
  </div>
</section>
```

### 3.4 工具卡片设计

```tsx
// ToolCard - 霓虹边框卡片
<article className="group relative bg-bg-card rounded-xl overflow-hidden">
  {/* 发光边框效果 */}
  <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/20 via-accent-purple/20 to-accent-pink/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
  <div className="absolute inset-px bg-bg-card rounded-xl" />
  
  <div className="relative p-6">
    {/* 头部：图标 + 名称 */}
    <div className="flex items-start gap-4 mb-4">
      <div className="w-12 h-12 rounded-lg bg-bg-secondary border border-border-subtle flex items-center justify-center flex-shrink-0 group-hover:border-accent-cyan/50 group-hover:shadow-[0_0_15px_rgba(0,245,212,0.3)] transition-all">
        {tool.icon ? (
          <img src={tool.icon} alt="" className="w-8 h-8 object-contain" />
        ) : (
          <span className="text-xl font-mono text-accent-cyan">{tool.name[0]}</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-mono font-bold text-text-primary group-hover:text-accent-cyan transition-colors">
          {tool.name}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-xs font-mono px-2 py-0.5 rounded ${pricingClass}`}>
            {pricingText}
          </span>
          <span className="text-xs text-text-muted font-mono">// {tool.category}</span>
        </div>
      </div>
    </div>
    
    {/* 描述 */}
    <p className="text-text-secondary text-sm leading-relaxed mb-4 font-mono">
      {tool.description}
    </p>
    
    {/* 底部操作 */}
    <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
      <div className="flex items-center gap-2">
        <Star className="w-4 h-4 text-accent-yellow fill-accent-yellow" />
        <span className="text-sm font-mono text-text-secondary">{tool.rating}</span>
      </div>
      <span className="text-xs font-mono text-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity">
        [ACCESS] →
      </span>
    </div>
  </div>
</article>
```

---

## 四、动效规范

### 4.1 页面加载动画

```tsx
// 渐变文字动画
const gradientTextVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

// 卡片 stagger 入场
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};
```

### 4.2 悬停效果

```css
/* 卡片悬停发光 */
.card-glow {
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.card-glow:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 30px rgba(0, 245, 212, 0.15);
}

/* 文字发光 */
.text-glow {
  transition: text-shadow 0.3s ease;
}
.text-glow:hover {
  text-shadow: 0 0 20px rgba(0, 245, 212, 0.5);
}

/* 按钮脉冲 */
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(0, 245, 212, 0.3); }
  50% { box-shadow: 0 0 40px rgba(0, 245, 212, 0.5); }
}
.btn-pulse {
  animation: pulse-glow 2s ease-in-out infinite;
}
```

### 4.3 滚动效果

```tsx
// 视差滚动
const parallaxVariants = {
  offscreen: { y: 100, opacity: 0 },
  onscreen: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", bounce: 0.4, duration: 0.8 }
  }
};

// 使用
<motion.div
  initial="offscreen"
  whileInView="onscreen"
  viewport={{ once: true, amount: 0.3 }}
  variants={parallaxVariants}
>
```

---

## 五、技术要求

### 5.1 依赖

```json
{
  "dependencies": {
    "framer-motion": "^11.x",
    "@next/font": "^14.x"
  }
}
```

### 5.2 字体加载

```tsx
// layout.tsx
import { JetBrains_Mono, Inter } from 'next/font/google';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});
```

### 5.3 性能优化

- 使用 `will-change` 优化动画元素
- 霓虹效果使用 GPU 加速 (`transform: translateZ(0)`)
- 懒加载非首屏内容
- 使用 `prefers-reduced-motion` 尊重用户偏好

---

## 六、实施检查清单

### Phase 1: 基础样式
- [ ] 更新 globals.css - 新色彩系统
- [ ] 更新 tailwind.config.ts - 新配置
- [ ] 更新 layout.tsx - 字体和元数据

### Phase 2: 组件重构
- [ ] 重构 Header - 玻璃态效果
- [ ] 重构 Hero - 打字机效果
- [ ] 重构 ToolCard - 霓虹边框
- [ ] 重构 EditorPicks - 发光效果
- [ ] 重构 Categories - 霓虹标签
- [ ] 重构 Footer - 极简科技风

### Phase 3: 动效
- [ ] 添加 Framer Motion 动画
- [ ] 添加页面加载动画
- [ ] 添加悬停发光效果
- [ ] 添加滚动视差效果

### Phase 4: 验证
- [ ] 类型检查通过
- [ ] 本地构建成功
- [ ] 响应式正常
- [ ] 无 console.log

---

**文档结束**
