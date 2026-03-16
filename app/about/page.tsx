import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Compass, Mail, ShieldCheck, Target } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import {
  audienceProfiles,
  commercialPackages,
  contentPillars,
  editorialPrinciples,
  growthChannels,
} from '@/lib/content/growth-content';
import { buildMailtoLink, buildSiteUrl, siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: '关于我们 - AI工具导航 | 发现最好用的AI工具',
  description: '了解 AI工具导航 的编辑原则、商业透明度和增长策略。我们致力于把 AI 工具站做成有判断力的流量入口。',
  keywords: ['关于我们', 'AI工具导航', 'AI工具推荐', '团队介绍', 'AI工具平台'],
  alternates: {
    canonical: buildSiteUrl('/about'),
  },
  openGraph: {
    title: '关于我们 - AI工具导航',
    description: '了解 AI工具导航 的编辑原则、商业透明度和增长策略。',
    type: 'website',
    url: buildSiteUrl('/about'),
  },
};

const aboutVisualLogos = [
  '/tool-icons/chatgpt.svg',
  '/tool-icons/claude.svg',
  '/tool-icons/deepseek.png',
  '/tool-icons/kimi.png',
  '/tool-icons/qwen.svg',
  '/tool-icons/cursor.svg',
  '/tool-icons/windsurf.png',
  '/tool-icons/midjourney.png',
  '/tool-icons/sora.png',
  '/tool-icons/figma-ai.svg',
  '/tool-icons/notion.svg',
  '/tool-icons/perplexity.svg',
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <PageHero
        eyebrow="关于 AI工具导航"
        title="我们不想做"
        highlight="又一个把工具名字塞满页面的站。"
        description="这个项目的目标，是把 AI 工具导航做成一层真正有判断力的筛选器。对用户来说，它应该帮你缩短试错时间；对 AI 团队来说，它应该是一条能带来流量、点击和线索的增长路径。"
        metrics={[
          {
            value: '策展优先',
            label: '信息组织原则',
            hint: '不是先比数量，而是先比有没有清晰判断。',
          },
          {
            value: '商业透明',
            label: '合作展示原则',
            hint: '赞助、合作链接和编辑推荐必须分开展示。',
          },
          {
            value: '场景驱动',
            label: '页面设计逻辑',
            hint: '首页、榜单、专题、详情页都围绕任务与转化设计。',
          },
          {
            value: '长期增长',
            label: '项目目标',
            hint: '一切都服务于更稳定的流量和更清楚的赚钱路径。',
          },
        ]}
        actions={[
          { href: '/tools', label: '去工具库继续看', tone: 'secondary' },
          { href: '/advertise', label: '查看商务合作', tone: 'primary' },
          { href: '/submit', label: '提交你的产品', tone: 'ghost' },
        ]}
        aside={
          <div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <ShieldCheck className="h-4 w-4 text-accent-cyan" />
              我们最重视的三件事
            </div>
            <div className="mt-5 space-y-3">
              {[
                '用户能不能在 3 分钟内缩小选择范围。',
                '页面是否明确告诉用户“为什么推荐、适合谁、不适合谁”。',
                '商业化位是否清楚披露，不靠模糊带货损耗信任。',
              ].map((item) => (
                <div key={item} className="rounded-[22px] border border-white/8 bg-black/10 px-4 py-3 text-sm text-text-secondary">
                  {item}
                </div>
              ))}
            </div>
          </div>
        }
      />

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeading
            eyebrow="Visual Promise"
            title="我们的判断，不是空口说。"
            description="先把真实工具放在你眼前，再谈推荐逻辑和商业路径。"
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {aboutVisualLogos.map((logo) => (
              <div key={logo} className="group relative h-20 overflow-hidden rounded-[18px] border border-white/10 bg-black/15">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,226,212,0.16),transparent_58%),radial-gradient(circle_at_82%_18%,rgba(240,154,121,0.13),transparent_46%)]" />
                <Image
                  src={logo}
                  alt="工具图标"
                  fill
                  unoptimized
                  className="object-contain p-4 opacity-90 transition group-hover:scale-105 group-hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading
          eyebrow="Demand Lens"
          title="我们服务的不是“所有人”，而是这三类最容易形成价值的人"
          description="需求分析的核心不是做大而全，而是知道哪个页面该服务谁、该让他点向哪里。"
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {audienceProfiles.map((profile) => (
            <article
              key={profile.title}
              className="rounded-[30px] border border-white/10 bg-white/5 p-6 transition hover:border-white/16"
            >
              <h2 className="text-2xl font-semibold text-text-primary">{profile.title}</h2>
              <p className="mt-4 text-sm leading-7 text-text-secondary">{profile.summary}</p>
              <p className="mt-4 rounded-[22px] border border-white/8 bg-black/10 px-4 py-4 text-sm leading-7 text-text-muted">
                {profile.value}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeading
            eyebrow="Editorial Rule"
            title="文案和内容的底层原则"
            description="好文案不是堆形容词，而是把判断、场景、风险和行动路径说清楚。"
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {editorialPrinciples.map((principle) => (
              <article key={principle.title} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <h2 className="text-lg font-semibold text-text-primary">{principle.title}</h2>
                <p className="mt-3 text-sm leading-7 text-text-secondary">{principle.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Content Engine"
                title="内容架构要服务流量，不只是服务完整性"
                description="我们把站内页面拆成不同职责，让它们一起形成增长漏斗，而不是各自孤立。"
              />
              <div className="mt-8 space-y-4">
                {contentPillars.map((pillar) => (
                  <div key={pillar.title} className="rounded-[26px] border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center gap-2 text-text-primary">
                      <Target className="h-4 w-4 text-accent-yellow" />
                      <h3 className="text-lg font-semibold">{pillar.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-text-secondary">{pillar.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading
                eyebrow="Growth Loop"
                title="推广策略不是独立模块，而是页面设计的一部分"
                description="页面、内容和分发应该串在一起，这样 SEO、社区传播和商业合作才不会彼此割裂。"
              />
              <div className="mt-8 space-y-4">
                {growthChannels.map((channel) => (
                  <div key={channel.title} className="rounded-[26px] border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center gap-2 text-text-primary">
                      <Compass className="h-4 w-4 text-accent-cyan" />
                      <h3 className="text-lg font-semibold">{channel.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-text-secondary">{channel.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeading
            eyebrow="Monetization"
            title="收费方案已经拆成可执行的几条线"
            description="暂时不接订阅付费，但联盟链接、付费收录、分类置顶、首页赞助、专题合作和咨询服务都可以开始接。"
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {commercialPackages.slice(0, 6).map((pkg) => (
              <article key={pkg.title} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-semibold text-text-primary">{pkg.title}</h2>
                  <span className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-sm text-text-secondary">
                    {pkg.budget}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-text-secondary">{pkg.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {pkg.deliverables.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs text-text-secondary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] p-8 shadow-[0_28px_70px_rgba(0,0,0,0.25)]">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-text-muted">Contact</p>
                <h2 className="mt-2 text-3xl font-semibold text-text-primary">如果你认同这种做法，我们就可以一起把它做大</h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-text-secondary">
                  无论你是想找工具、提交产品，还是购买首页或分类流量，我们都更欢迎长期合作而不是一次性曝光。
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/advertise"
                    className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
                  >
                    查看商务合作
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/submit"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
                  >
                    提交工具
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-black/12 p-5">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Mail className="h-4 w-4 text-accent-cyan" />
                  联系方式
                </div>
                <p className="mt-4 text-2xl font-semibold text-text-primary">{siteConfig.contactEmail}</p>
                <p className="mt-3 text-sm leading-7 text-text-secondary">
                  你可以直接写邮件说明产品、预算、目标页面和排期，我们会按合作场景给出建议。
                </p>
                <a
                  href={buildMailtoLink()}
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-primary transition hover:border-white/16"
                >
                  发邮件给我们
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
