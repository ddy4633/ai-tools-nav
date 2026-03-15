import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Search, Sparkles, TrendingUp } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import NewsletterSection from '@/components/home/NewsletterSection';
import { buildSiteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'AI 工具博客 - 最新资讯与使用技巧',
  description: '围绕 AI 工具推荐、替代方案、使用教程和高意图内容的专题内容中心。',
  keywords: ['AI 博客', 'AI工具教程', '人工智能资讯', 'AI使用技巧'],
  alternates: {
    canonical: buildSiteUrl('/blog'),
  },
};

const featuredPost = {
  href: '/blog/top-ai-tools-2026',
  title: '2026 年最值得关注的 10 个 AI 工具',
  excerpt: '从大模型、AI 编程到视频生成和 Agent，这篇文章更适合做年度入口和热点分发。',
  category: '年度榜单',
  date: '2026-03-03',
  readTime: '12 分钟',
  cover: '/tool-icons/windsurf.png',
  logos: ['/tool-icons/windsurf.png', '/tool-icons/kling.png', '/tool-icons/deepseek.png'],
};

const editorialClusters = [
  {
    title: '替代方案',
    description: '抓住“ChatGPT 国内替代”“谁能替代 Midjourney”这类高意图搜索。',
  },
  {
    title: '对比与推荐',
    description: '用榜单、清单和横向对比承接“该选哪个”的决策需求。',
  },
  {
    title: '使用教程',
    description: '把复杂产品讲清楚，顺手完成工具详情页和联盟链接导流。',
  },
];

const blogPosts = [
  {
    href: '/blog/top-ai-tools-2026',
    title: '2026 年最值得关注的 10 个 AI 工具',
    excerpt: '大模型、AI 编程、视频生成和 Agent 的年度入口文章。',
    category: '工具推荐',
    date: '2026-03-03',
    readTime: '12 分钟',
    tags: ['年度榜单', 'AI 工具', '趋势'],
    cover: '/tool-icons/windsurf.png',
    logos: ['/tool-icons/windsurf.png', '/tool-icons/kling.png'],
  },
  {
    href: '/blog/deepseek-guide',
    title: 'DeepSeek 使用教程：从注册到高质量提问',
    excerpt: '一篇兼顾入门和场景实践的国产大模型教程页。',
    category: '使用教程',
    date: '2026-03-10',
    readTime: '15 分钟',
    tags: ['DeepSeek', '教程', '国产 AI'],
    cover: '/tool-icons/deepseek.png',
    logos: ['/tool-icons/chatgpt.svg', '/tool-icons/qwen.svg'],
  },
  {
    href: '/blog/chatgpt-china-alternatives',
    title: 'ChatGPT 国内替代方案：谁更适合中文工作流',
    excerpt: '适合截获“国内能用吗”“有没有替代”这类高转化搜索。',
    category: '替代方案',
    date: '2026-03-12',
    readTime: '10 分钟',
    tags: ['替代方案', '中文 AI', '对比'],
    cover: '/tool-icons/deepseek.png',
    logos: ['/tool-icons/qwen.svg', '/tool-icons/kimi.png'],
  },
  {
    href: '/blog/ai-writing-tools-free',
    title: '免费 AI 写作工具推荐：适合内容和营销团队的选择',
    excerpt: '更偏实战，适合承接内容生产和营销增长需求。',
    category: '工具推荐',
    date: '2026-03-08',
    readTime: '11 分钟',
    tags: ['AI 写作', '免费工具', '内容营销'],
    cover: '/tool-icons/chatgpt.svg',
    logos: ['/tool-icons/claude.svg', '/tool-icons/notion-ai.png'],
  },
  {
    href: '/blog/ai-art-generators',
    title: 'AI 绘画网站推荐：从免费试用到专业出图',
    excerpt: '适合拦截做图、海报、社媒素材和视觉提案相关需求。',
    category: '工具推荐',
    date: '2026-03-07',
    readTime: '11 分钟',
    tags: ['AI 绘画', '视觉创作', '设计'],
    cover: '/tool-icons/midjourney.png',
    logos: ['/tool-icons/stable-diffusion.png', '/tool-icons/ideogram.png'],
  },
];

const visualLogos = [
  '/tool-icons/deepseek.png',
  '/tool-icons/chatgpt.svg',
  '/tool-icons/claude.svg',
  '/tool-icons/kimi.png',
  '/tool-icons/qwen.svg',
  '/tool-icons/windsurf.png',
  '/tool-icons/v0.png',
  '/tool-icons/midjourney.png',
  '/tool-icons/stable-diffusion.png',
  '/tool-icons/ideogram.png',
  '/tool-icons/kling.png',
  '/tool-icons/udio.svg',
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <PageHero
        eyebrow="专题内容中心"
        title="内容不是附属品。"
        highlight="它本身就是流量入口和转化入口。"
        description="博客页承担的不是“发几篇文章”，而是构建高意图搜索词、榜单分发和专题合作的内容中台。它应该让用户一眼看懂：这里有什么、为什么值得点、点进去之后能做什么。"
        metrics={[
          {
            value: `${blogPosts.length}`,
            label: '当前重点专题',
            hint: '先做高意图内容，再逐步扩展长尾矩阵。',
          },
          {
            value: '推荐 / 替代 / 教程',
            label: '主打内容结构',
            hint: '最适合承接搜索流量，也最适合商业合作。',
          },
          {
            value: '可导向详情页',
            label: '站内互链方向',
            hint: '专题页负责把用户继续送往工具库、详情页和合作入口。',
          },
        ]}
        actions={[
          { href: '/tools', label: '先去工具库', tone: 'secondary' },
          { href: '/advertise', label: '做专题合作', tone: 'primary' },
        ]}
        aside={
          <div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Search className="h-4 w-4 text-accent-cyan" />
              内容页的三种作用
            </div>
            <div className="mt-5 space-y-3">
              {editorialClusters.map((cluster) => (
                <div key={cluster.title} className="rounded-[22px] border border-white/8 bg-black/10 p-4">
                  <p className="text-sm font-medium text-text-primary">{cluster.title}</p>
                  <p className="mt-3 text-sm leading-7 text-text-secondary">{cluster.description}</p>
                </div>
              ))}
            </div>
          </div>
        }
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_22rem]">
          <Link
            href={featuredPost.href}
            className="group rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] p-8 shadow-[0_28px_70px_rgba(0,0,0,0.25)] transition hover:border-white/16"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/10 px-4 py-2 text-sm text-text-secondary">
              <Sparkles className="h-4 w-4 text-accent-yellow" />
              本周最适合做首页联动的一篇
            </div>
            <div className="relative mt-6 h-56 overflow-hidden rounded-[28px] border border-white/10 bg-black/20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,226,212,0.2),transparent_46%),radial-gradient(circle_at_84%_20%,rgba(240,154,121,0.16),transparent_36%)]" />
              <Image
                src={featuredPost.cover}
                alt={featuredPost.title}
                fill
                unoptimized
                className="object-contain p-8 opacity-90"
              />
              <div className="absolute bottom-4 right-4 flex gap-2">
                {featuredPost.logos.map((logo) => (
                  <span
                    key={logo}
                    className="relative h-10 w-10 overflow-hidden rounded-xl border border-white/12 bg-black/25"
                  >
                    <Image src={logo} alt="logo" fill unoptimized className="object-contain p-2" />
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-text-muted">
              <span>{featuredPost.category}</span>
              <span>{featuredPost.date}</span>
              <span>{featuredPost.readTime}</span>
            </div>
            <h2 className="mt-5 text-4xl font-semibold text-text-primary transition group-hover:text-accent-cyan">
              {featuredPost.title}
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-text-secondary">{featuredPost.excerpt}</p>
            <span className="mt-8 inline-flex items-center gap-2 text-sm text-text-primary">
              阅读专题
              <ArrowRight className="h-4 w-4 text-accent-cyan" />
            </span>
          </Link>

          <aside className="rounded-[32px] border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <TrendingUp className="h-4 w-4 text-accent-yellow" />
              这一栏应该承接商业价值
            </div>
            <div className="mt-5 space-y-3">
              {[
                '替代方案页适合挂联盟链接和详情页互链。',
                '榜单页适合做品牌曝光和热点传播。',
                '教程页适合做用户信任和二跳留存。',
              ].map((item) => (
                <div key={item} className="rounded-[22px] border border-white/8 bg-black/10 px-4 py-3 text-sm text-text-secondary">
                  {item}
                </div>
              ))}
            </div>
            <Link
              href="/advertise"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
            >
              了解专题合作
              <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeading
            eyebrow="Editorial Grid"
            title="高意图专题内容"
            description="这些页面优先服务搜索和转化，所以结构上更强调推荐、对比、替代和继续行动。"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.href}
                href={post.href}
                className="group rounded-[28px] border border-white/10 bg-white/5 p-5 transition hover:border-white/16 hover:bg-white/[0.07]"
              >
                <div className="relative h-36 overflow-hidden rounded-[20px] border border-white/10 bg-black/20">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,226,212,0.16),transparent_48%),radial-gradient(circle_at_84%_16%,rgba(240,154,121,0.15),transparent_36%)]" />
                  <Image src={post.cover} alt={post.title} fill unoptimized className="object-contain p-6 opacity-90" />
                  <div className="absolute bottom-3 right-3 flex gap-1.5">
                    {post.logos.map((logo) => (
                      <span
                        key={logo}
                        className="relative h-7 w-7 overflow-hidden rounded-lg border border-white/12 bg-black/25"
                      >
                        <Image src={logo} alt="logo" fill unoptimized className="object-contain p-1.5" />
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-text-muted">
                  <span className="rounded-full border border-white/10 bg-black/10 px-2.5 py-1">{post.category}</span>
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="mt-4 text-2xl font-semibold text-text-primary transition group-hover:text-accent-cyan">
                  {post.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-text-secondary">{post.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sm text-text-primary">
                  打开文章
                  <ArrowRight className="h-4 w-4 text-accent-cyan" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeading
            eyebrow="Visual Wall"
            title="图像入口墙"
            description="给大众用户一个“先看图标再点内容”的入口，降低首次浏览门槛。"
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {visualLogos.map((logo) => (
              <div
                key={logo}
                className="group relative h-20 overflow-hidden rounded-[18px] border border-white/10 bg-black/20"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,226,212,0.16),transparent_56%),radial-gradient(circle_at_80%_20%,rgba(240,154,121,0.12),transparent_46%)]" />
                <Image src={logo} alt="工具图标" fill unoptimized className="object-contain p-4 opacity-85 transition group-hover:scale-105 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-text-muted">Content Partner</p>
                <h2 className="mt-2 text-2xl font-semibold text-text-primary">想借专题内容拿搜索流量或品牌曝光？</h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-text-secondary">
                  你可以做年度榜单共创、分类专题合作、替代方案页联动，或者直接通过详情页和榜单页组合承接流量。
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/advertise"
                  className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
                >
                  查看合作方式
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/submit"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
                >
                  提交你的产品
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
}
