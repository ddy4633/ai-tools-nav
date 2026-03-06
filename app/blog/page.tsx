import { Metadata } from 'next';
import { Calendar, Clock, ArrowRight, Tag, BookOpen, TrendingUp, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI 工具博客 - 最新资讯与使用技巧',
  description: '探索 AI 工具的最新动态、使用技巧和行业洞察。发现如何更好地利用 AI 提升工作效率。',
  keywords: ['AI 博客', 'AI工具教程', '人工智能资讯', 'AI使用技巧'],
};

// 模拟博客文章数据
const blogPosts = [
  {
    id: 'top-ai-tools-2026',
    title: '2026年最值得关注的10个AI工具 - 从Grok 3到Manus',
    excerpt: '盘点2026年最热门的AI工具：Grok 3、Qwen 2.5-Max、Kimi k1.5、Windsurf、Bolt.new、Kling AI等，深度解析它们的特点和适用场景。',
    category: '工具推荐',
    date: '2026-03-03',
    readTime: '12 分钟',
    tags: ['AI工具', '2026趋势', 'Grok 3', 'Manus', 'Kling AI'],
    featured: true,
    slug: 'top-ai-tools-2026',
  },
  {
    id: 1,
    title: '2024 年最值得关注的 10 个 AI 工具',
    excerpt: '从 ChatGPT 到 Midjourney，盘点今年最热门的 AI 工具及其应用场景，帮助你快速了解 AI 工具生态。',
    category: '工具推荐',
    date: '2024-03-15',
    readTime: '8 分钟',
    tags: ['AI工具', '效率', '推荐'],
    featured: false,
  },
  {
    id: 'deepseek-guide',
    title: 'DeepSeek使用教程 - 国产AI大模型DeepSeek怎么用',
    excerpt: 'DeepSeek使用教程详解：DeepSeek是什么？如何注册使用DeepSeek？DeepSeek vs ChatGPT对比分析，DeepSeek优缺点及使用技巧。',
    category: '使用教程',
    date: '2024-02-28',
    readTime: '15 分钟',
    tags: ['DeepSeek', '国产AI', 'AI大模型'],
    featured: false,
    slug: 'deepseek-guide',
  },
  {
    id: 2,
    title: 'ChatGPT 进阶使用技巧：从入门到精通',
    excerpt: '掌握提示词工程、角色设定、上下文管理等高级技巧，让你的 ChatGPT 使用效率提升 10 倍。',
    category: '使用教程',
    date: '2024-03-12',
    readTime: '12 分钟',
    tags: ['ChatGPT', '提示词', '教程'],
    featured: false,
  },
  {
    id: 3,
    title: 'AI 绘画工具对比：Midjourney vs Stable Diffusion vs DALL-E',
    excerpt: '深入对比三大主流 AI 绘画工具的优劣势，帮你选择最适合自己的创作工具。',
    category: '工具对比',
    date: '2024-03-08',
    readTime: '10 分钟',
    tags: ['AI绘画', 'Midjourney', '对比'],
    featured: false,
  },
  {
    id: 4,
    title: '如何用 AI 工具提升编程效率',
    excerpt: 'GitHub Copilot、CodeWhisperer、Tabnine 等 AI 编程助手的使用心得和最佳实践。',
    category: '开发工具',
    date: '2024-03-05',
    readTime: '6 分钟',
    tags: ['编程', 'Copilot', '效率'],
    featured: false,
  },
  {
    id: 5,
    title: 'AI 写作工具实测：Notion AI、Jasper、Copy.ai',
    excerpt: '三款主流 AI 写作工具的深度测评，包括功能对比、价格分析和适用场景建议。',
    category: '工具对比',
    date: '2024-03-01',
    readTime: '9 分钟',
    tags: ['写作', 'Notion', '测评'],
    featured: false,
  },
  {
    id: 6,
    title: 'AI 工具在内容创作中的 7 种应用方式',
    excerpt: '从文案撰写到视频剪辑，探索 AI 如何全方位助力内容创作者提升生产力。',
    category: '使用教程',
    date: '2024-02-28',
    readTime: '7 分钟',
    tags: ['内容创作', '视频', '文案'],
    featured: false,
  },
];

const categories = [
  { name: '全部', count: 24 },
  { name: '工具推荐', count: 8 },
  { name: '使用教程', count: 6 },
  { name: '工具对比', count: 4 },
  { name: '开发工具', count: 3 },
  { name: '行业资讯', count: 3 },
];

export default function BlogPage() {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-border-light">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-warm/5 via-transparent to-accent-cool/5" />
        <div className="container mx-auto px-4 py-16 sm:py-20 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-warm/10 rounded-full text-accent-warm text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              AI 工具博客
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-6">
              探索 AI 的<span className="text-accent-warm">无限可能</span>
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              最新 AI 工具资讯、深度使用教程和行业洞察，帮助你更好地利用人工智能提升效率
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Post */}
            {featuredPost && (
              <div className="mb-10">
                <div className="flex items-center gap-2 text-accent-warm mb-4">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-semibold">精选文章</span>
                </div>
                <article className="group bg-surface-card rounded-2xl overflow-hidden border border-border-light hover:border-accent-warm/50 transition-all shadow-sm hover:shadow-lg">
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-accent-warm/10 text-accent-warm rounded-full text-sm font-medium">
                        {featuredPost.category}
                      </span>
                      <span className="flex items-center gap-1 text-text-muted text-sm">
                        <Calendar className="w-4 h-4" />
                        {featuredPost.date}
                      </span>
                      <span className="flex items-center gap-1 text-text-muted text-sm">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4 group-hover:text-accent-warm transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-text-secondary text-lg mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {featuredPost.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-surface-base text-text-secondary rounded-full text-sm"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <button className="flex items-center gap-2 text-accent-warm font-medium hover:text-accent-warm-hover transition-colors">
                        阅读全文
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            )}

            {/* Regular Posts Grid */}
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-text-secondary" />
              <h2 className="text-xl font-bold text-text-primary">最新文章</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {regularPosts.map((post) => (
                post.slug ? (
                  <Link href={`/blog/${post.slug}`} key={post.id}>
                    <article className="group bg-surface-card rounded-xl overflow-hidden border border-border-light hover:border-accent-warm/30 transition-all hover:shadow-md h-full">
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-2 py-1 bg-surface-base text-text-secondary rounded-md text-xs font-medium">
                            {post.category}
                          </span>
                          <span className="text-text-muted text-xs">
                            {post.date}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-text-primary mb-3 group-hover:text-accent-warm transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-1">
                            {post.tags.slice(0, 2).map((tag) => (
                              <span key={tag} className="text-xs text-text-muted">
                                #{tag}
                              </span>
                            ))}
                          </div>
                          <span className="flex items-center gap-1 text-text-muted text-xs">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ) : (
                  <article
                    key={post.id}
                    className="group bg-surface-card rounded-xl overflow-hidden border border-border-light hover:border-accent-warm/30 transition-all hover:shadow-md"
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-1 bg-surface-base text-text-secondary rounded-md text-xs font-medium">
                          {post.category}
                        </span>
                        <span className="text-text-muted text-xs">
                          {post.date}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-text-primary mb-3 group-hover:text-accent-warm transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-xs text-text-muted">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <span className="flex items-center gap-1 text-text-muted text-xs">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </article>
                )
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-10">
              <button className="px-8 py-3 bg-surface-card border border-border-medium rounded-xl text-text-primary hover:border-accent-warm hover:text-accent-warm transition-all font-medium">
                加载更多文章
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Categories */}
            <div className="bg-surface-card rounded-xl p-6 border border-border-light mb-6">
              <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                文章分类
              </h3>
              <div className="space-y-2">
                {categories.map((cat, index) => (
                  <button
                    key={cat.name}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all ${
                      index === 0
                        ? 'bg-accent-warm/10 text-accent-warm font-medium'
                        : 'hover:bg-surface-base text-text-secondary'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className={`text-sm ${index === 0 ? 'text-accent-warm' : 'text-text-muted'}`}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-accent-warm/10 to-accent-cool/10 rounded-xl p-6 border border-accent-warm/20">
              <h3 className="font-bold text-text-primary mb-2">订阅更新</h3>
              <p className="text-text-secondary text-sm mb-4">
                每周精选 AI 工具资讯，直达邮箱
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="输入邮箱地址"
                  className="w-full px-4 py-2.5 bg-white border border-border-medium rounded-lg text-text-primary focus:outline-none focus:border-accent-warm text-sm"
                />
                <button className="w-full py-2.5 bg-accent-warm text-white rounded-lg hover:bg-accent-warm-hover transition-colors text-sm font-medium">
                  立即订阅
                </button>
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-surface-card rounded-xl p-6 border border-border-light mt-6">
              <h3 className="font-bold text-text-primary mb-4">热门标签</h3>
              <div className="flex flex-wrap gap-2">
                {['AI工具', 'ChatGPT', '效率', '教程', 'Midjourney', '编程', '写作', '设计'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-surface-base text-text-secondary rounded-lg text-sm hover:bg-accent-warm/10 hover:text-accent-warm cursor-pointer transition-all"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
