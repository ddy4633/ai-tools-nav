import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BarChart3, Layers3, Megaphone, Target } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import {
  commercialPackages,
  contentPillars,
  growthChannels,
  partnershipSteps,
} from '@/lib/content/growth-content';
import { buildMailtoLink, buildSiteUrl, siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: '商务合作 - AI工具导航流量与曝光方案',
  description: '查看 AI工具导航 的合作位与收费方案，覆盖首页赞助、分类页置顶、榜单合作、专题内容和企业顾问支持。',
  keywords: ['商务合作', 'AI工具广告位', 'AI工具推广', '分类置顶', '首页赞助', '专题合作'],
  alternates: {
    canonical: buildSiteUrl('/advertise'),
  },
  openGraph: {
    title: '商务合作 - AI工具导航',
    description: '首页赞助、分类置顶、榜单合作、专题内容与顾问支持一览。',
    url: buildSiteUrl('/advertise'),
    type: 'website',
  },
};

const adVisualLogos = [
  '/tool-icons/chatgpt.svg',
  '/tool-icons/claude.svg',
  '/tool-icons/deepseek.png',
  '/tool-icons/cursor.svg',
  '/tool-icons/windsurf.png',
  '/tool-icons/perplexity.svg',
  '/tool-icons/midjourney.png',
  '/tool-icons/sora.png',
  '/tool-icons/kling.png',
  '/tool-icons/figma-ai.svg',
  '/tool-icons/notion-ai.svg',
  '/tool-icons/obsidian.svg',
];

export default function AdvertisePage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <PageHero
        eyebrow="商务合作"
        title="把你的产品放到"
        highlight="已经在认真筛工具的人面前。"
        description="我们不卖泛泛的展示量，而是卖更明确的决策节点：首页筛选、分类对比、热门榜单、专题内容和工具详情页，分别服务不同阶段的用户意图。"
        metrics={[
          {
            value: '首页 + 分类 + 榜单',
            label: '核心曝光组合',
            hint: '适合做品牌抬升、拉新和新品起量。',
          },
          {
            value: '专题内容',
            label: '长尾流量入口',
            hint: '适合拦截对比、替代、教程和价格相关搜索。',
          },
          {
            value: '点击埋点',
            label: '效果追踪',
            hint: '合作链接和页面入口都能做点击追踪与后续复盘。',
          },
        ]}
        actions={[
          { href: '/submit', label: '立即提交产品需求', tone: 'primary' },
          { href: '/tools', label: '先看工具库形态', tone: 'secondary' },
        ]}
        aside={
          <div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Target className="h-4 w-4 text-accent-cyan" />
              为什么客户会买这里
            </div>
            <div className="mt-5 space-y-3">
              {[
                '用户已经在做工具决策，而不是纯浏览资讯。',
                '不同页面可以分别承接品牌曝光、点击转化和销售线索。',
                '合作位与编辑位分开，能减少商业化对信任的伤害。',
              ].map((item) => (
                <div key={item} className="rounded-[22px] border border-white/8 bg-black/10 px-4 py-3 text-sm text-text-secondary">
                  {item}
                </div>
              ))}
            </div>
          </div>
        }
      />

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-text-muted">Audience Familiarity</p>
              <h2 className="mt-2 text-2xl font-semibold text-text-primary">客户买曝光，先看用户是否认得这些入口</h2>
            </div>
            <span className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-sm text-text-secondary">
              12 个高识别度图标
            </span>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {adVisualLogos.map((logo) => (
              <div key={logo} className="group relative h-20 overflow-hidden rounded-[18px] border border-white/10 bg-black/15">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,226,212,0.16),transparent_58%),radial-gradient(circle_at_82%_18%,rgba(240,154,121,0.13),transparent_46%)]" />
                <Image
                  src={logo}
                  alt="合作位可覆盖工具图标"
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
          eyebrow="Offer Menu"
          title="当前可以直接售卖的合作方案"
          description="为了控制执行复杂度，收费产品先从这几条开始，不接订阅收费，但把流量和线索类方案都铺开。"
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {commercialPackages.map((pkg) => (
            <article key={pkg.title} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between gap-3">
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
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Traffic Slot"
                title="合作位不是单一广告位，而是按意图拆开的流量层"
              />
              <div className="mt-8 space-y-4">
                {contentPillars.map((pillar) => (
                  <article key={pillar.title} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center gap-2 text-text-primary">
                      <Layers3 className="h-4 w-4 text-accent-yellow" />
                      <h3 className="text-lg font-semibold">{pillar.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-text-secondary">{pillar.detail}</p>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading
                eyebrow="Promotion Plan"
                title="推广方案必须跟页面结构一起设计"
              />
              <div className="mt-8 space-y-4">
                {growthChannels.map((channel) => (
                  <article key={channel.title} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center gap-2 text-text-primary">
                      <Megaphone className="h-4 w-4 text-accent-cyan" />
                      <h3 className="text-lg font-semibold">{channel.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-text-secondary">{channel.summary}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeading
            eyebrow="Execution Flow"
            title="从需求到上线，我们建议这样推进"
            description="这不是复杂项目管理，而是为了让合作不拖、页面不乱、数据可复盘。"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {partnershipSteps.map((step, index) => (
              <article key={step} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/10 text-sm font-semibold text-text-primary">
                  {index + 1}
                </div>
                <p className="mt-5 text-sm leading-7 text-text-secondary">{step}</p>
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
                <p className="text-sm uppercase tracking-[0.24em] text-text-muted">Business CTA</p>
                <h2 className="mt-2 text-3xl font-semibold text-text-primary">准备好买曝光或买线索，就从这里开始</h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-text-secondary">
                  如果你已经明确目标，可以直接提交合作需求；如果还在判断适合买哪种页面，我们也可以先按产品阶段给建议。
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/submit"
                    className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
                  >
                    提交合作需求
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={buildMailtoLink()}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
                  >
                    写邮件咨询
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-black/12 p-5">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <BarChart3 className="h-4 w-4 text-accent-yellow" />
                  联络方式
                </div>
                <p className="mt-4 text-2xl font-semibold text-text-primary">{siteConfig.contactEmail}</p>
                <p className="mt-3 text-sm leading-7 text-text-secondary">
                  来信时最好附上：产品链接、目标人群、期望页面、投放周期和预算范围。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
