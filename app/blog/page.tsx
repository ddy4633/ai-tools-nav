import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Search, Sparkles, TrendingUp } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import NewsletterSection from '@/components/home/NewsletterSection';
import { buildSiteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'AI Editorials - Rankings, Alternatives, and Guides',
  description: 'The editorial hub for AI tool rankings, alternatives, practical guides, and high-intent discovery content.',
  keywords: ['AI editorials', 'AI tool guides', 'AI rankings', 'AI alternatives', 'AI tutorials'],
  alternates: {
    canonical: buildSiteUrl('/blog'),
  },
};

const featuredPost = {
  href: '/blog/june-2026-ai-tools',
  title: '8 New AI Tools Worth Tracking in June 2026',
  excerpt: 'A sharper June watchlist built around browser agents, voice software, AI video, UI generation, and commercial buyer intent.',
  category: 'June roundup',
  date: '2026-06-11',
  readTime: '10 min read',
  cover: '/tool-icons/claude-4.svg',
  logos: ['/tool-icons/google-flow.svg', '/tool-icons/browser-use.svg', '/tool-icons/stitch.svg'],
};

const editorialClusters = [
  {
    title: 'Alternatives',
    description: 'Capture search demand from people comparing replacements, migrations, and stack changes.',
  },
  {
    title: 'Comparisons and rankings',
    description: 'Use ranked lists and side-by-side picks to answer the question buyers actually ask: which one should I choose?',
  },
  {
    title: 'Practical guides',
    description: 'Turn complex products into clear onboarding paths while routing attention into detail pages and partner clicks.',
  },
];

const blogPosts = [
  {
    href: '/blog/june-2026-ai-tools',
    title: '8 New AI Tools Worth Tracking in June 2026',
    excerpt: 'A fresh June shortlist covering Claude 4, Flow, Stitch, Wispr Flow, Granola, Vapi, Browser Use, and Browse.sh.',
    category: 'Rankings',
    date: '2026-06-11',
    readTime: '10 min read',
    tags: ['June 2026', 'AI tools', 'Commercial intent'],
    cover: '/tool-icons/claude-4.svg',
    logos: ['/tool-icons/google-flow.svg', '/tool-icons/browser-use.svg'],
  },
  {
    href: '/blog/top-ai-tools-2026',
    title: '10 AI Tools Worth Watching in 2026',
    excerpt: 'A high-level annual gateway into models, AI coding, video generation, and agent products.',
    category: 'Rankings',
    date: '2026-03-03',
    readTime: '12 min read',
    tags: ['Annual ranking', 'AI tools', 'Trends'],
    cover: '/tool-icons/windsurf.png',
    logos: ['/tool-icons/windsurf.png', '/tool-icons/kling.png'],
  },
  {
    href: '/blog/deepseek-guide',
    title: 'DeepSeek Guide: How to Use It for Research and Coding',
    excerpt: 'A practical onboarding guide for teams evaluating DeepSeek for daily work.',
    category: 'Guides',
    date: '2026-03-10',
    readTime: '15 min read',
    tags: ['DeepSeek', 'Guide', 'AI workflows'],
    cover: '/tool-icons/deepseek.png',
    logos: ['/tool-icons/chatgpt.svg', '/tool-icons/qwen.svg'],
  },
  {
    href: '/blog/chatgpt-china-alternatives',
    title: 'ChatGPT Alternatives for Teams That Need Local-Language Workflows',
    excerpt: 'A high-intent comparison page for buyers who care about language fit, control, and operational access.',
    category: 'Alternatives',
    date: '2026-03-12',
    readTime: '10 min read',
    tags: ['Alternatives', 'Local-language AI', 'Comparison'],
    cover: '/tool-icons/deepseek.png',
    logos: ['/tool-icons/qwen.svg', '/tool-icons/kimi.png'],
  },
  {
    href: '/blog/ai-writing-tools-free',
    title: 'Free AI Writing Tools for Content and Marketing Teams',
    excerpt: 'A practical shortlist for teams balancing speed, writing depth, and budget.',
    category: 'Rankings',
    date: '2026-03-08',
    readTime: '11 min read',
    tags: ['AI writing', 'Free tools', 'Content marketing'],
    cover: '/tool-icons/chatgpt.svg',
    logos: ['/tool-icons/claude.svg', '/tool-icons/notion-ai.png'],
  },
  {
    href: '/blog/ai-art-generators',
    title: 'AI Image Generators: From Free Trials to Production-Ready Visuals',
    excerpt: 'A practical guide for people creating campaigns, posters, social assets, and design explorations.',
    category: 'Rankings',
    date: '2026-03-07',
    readTime: '11 min read',
    tags: ['AI images', 'Visual creation', 'Design'],
    cover: '/tool-icons/midjourney.png',
    logos: ['/tool-icons/stable-diffusion.png', '/tool-icons/ideogram.png'],
  },
];

const visualLogos = [
  '/tool-icons/claude-4.svg',
  '/tool-icons/google-flow.svg',
  '/tool-icons/stitch.svg',
  '/tool-icons/wispr-flow.svg',
  '/tool-icons/granola.svg',
  '/tool-icons/vapi.svg',
  '/tool-icons/browser-use.svg',
  '/tool-icons/browse-sh.svg',
  '/tool-icons/deepseek.png',
  '/tool-icons/chatgpt.svg',
  '/tool-icons/claude.svg',
  '/tool-icons/kimi.png',
  '/tool-icons/qwen.svg',
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <PageHero
        eyebrow="Editorial Hub"
        title="Content is not a side dish."
        highlight="It is both a traffic engine and a conversion surface."
        description="This page is not here to host random posts. It is the content operating layer for high-intent search capture, ranking distribution, and sponsored editorial programs. Visitors should instantly understand what is here, why it matters, and what action comes next."
        metrics={[
          {
            value: `${blogPosts.length}`,
            label: 'Priority editorials',
            hint: 'Start with high-intent content, then expand into a durable long-tail matrix.',
          },
          {
            value: 'Rankings / Alternatives / Guides',
            label: 'Core content structure',
            hint: 'This is the content mix that best captures search demand and commercial interest.',
          },
          {
            value: 'Directory-aware',
            label: 'Internal linking model',
            hint: 'Editorial pages should route people into the directory, detail pages, and monetization paths.',
          },
        ]}
        actions={[
          { href: '/tools', label: 'Open the directory', tone: 'secondary' },
          { href: '/advertise', label: 'Explore editorial sponsorship', tone: 'primary' },
        ]}
        aside={
          <div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Search className="h-4 w-4 text-accent-cyan" />
              Three jobs editorial pages must do
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
              Best editorial to feature this week
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
              Read the feature
              <ArrowRight className="h-4 w-4 text-accent-cyan" />
            </span>
          </Link>

          <aside className="rounded-[32px] border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <TrendingUp className="h-4 w-4 text-accent-yellow" />
              This column should carry commercial value
            </div>
            <div className="mt-5 space-y-3">
              {[
                'Alternative pages are perfect for partner links and detail-page cross-routing.',
                'Ranking pages are strong for awareness and timely distribution.',
                'Guide pages are strong for trust-building and second clicks.',
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
              View sponsorship options
              <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeading
            eyebrow="Editorial Grid"
            title="High-intent editorial inventory"
            description="These pages are built for discovery and conversion, so the structure emphasizes picks, comparisons, alternatives, and clear next actions."
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
                  Open article
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
            title="Visual entry wall"
            description="Give mainstream visitors a fast visual way into the content universe by letting them recognize brands before reading headlines."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {visualLogos.map((logo) => (
              <div
                key={logo}
                className="group relative h-20 overflow-hidden rounded-[18px] border border-white/10 bg-black/20"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,226,212,0.16),transparent_56%),radial-gradient(circle_at_80%_20%,rgba(240,154,121,0.12),transparent_46%)]" />
                <Image src={logo} alt="Tool logo" fill unoptimized className="object-contain p-4 opacity-85 transition group-hover:scale-105 group-hover:opacity-100" />
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
                <h2 className="mt-2 text-2xl font-semibold text-text-primary">Want search traffic or brand lift through editorial content?</h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-text-secondary">
                  You can co-create annual rankings, sponsor category editorials, own an alternatives page, or pair ranking pages with tool detail pages to capture demand.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/advertise"
                  className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
                >
                  View partnership options
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/submit"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
                >
                  Submit your product
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
