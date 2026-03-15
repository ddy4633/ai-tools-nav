import type { Metadata } from 'next';
import { ArrowRight, Compass, Search, Send, Zap } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import TrackedLink from '@/components/ui/TrackedLink';

export const metadata: Metadata = {
  title: '页面未找到 - AI工具导航',
  description: '你访问的页面不存在，继续浏览工具库、专题内容或提交你的产品。',
};

export default function NotFound() {
  const fallbackLinks = [
    {
      href: '/tools',
      title: '去工具库继续找',
      desc: '按任务、分类和价格继续筛选，最快回到决策路径。',
      icon: Search,
    },
    {
      href: '/blog',
      title: '去专题页看对比',
      desc: '从替代、推荐和教程入口继续，减少信息检索成本。',
      icon: Compass,
    },
    {
      href: '/submit',
      title: '提交你的产品',
      desc: '如果你是产品方，可以直接提交并进入收录或合作流程。',
      icon: Send,
    },
  ];

  return (
    <main className="min-h-screen bg-bg-primary">
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[460px] bg-[radial-gradient(circle_at_top_left,rgba(125,226,212,0.16),transparent_34%),radial-gradient(circle_at_78%_12%,rgba(240,154,121,0.14),transparent_28%),radial-gradient(circle_at_52%_42%,rgba(142,162,255,0.08),transparent_42%)]" />
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-12 md:pb-20 md:pt-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.06fr)_24rem]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-text-secondary">
                <span className="h-2 w-2 rounded-full bg-accent-yellow" />
                页面不存在 / 404
              </div>
              <h1 className="mt-6 font-display text-5xl leading-[1.04] tracking-tight text-text-primary md:text-6xl">
                这个链接走丢了。
                <span className="block text-gradient-cyber">但你的下一步不该停在这里。</span>
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-text-secondary md:text-lg">
                你访问的地址可能已迁移、拼写错误或内容下线。继续操作更重要，我们把最常用的恢复路径放在下面了。
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <TrackedLink
                  href="/tools"
                  trackingPayload={{ placement: 'not_found_hero_tools', source: 'not_found' }}
                  className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
                >
                  返回工具库
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
                <TrackedLink
                  href="/"
                  trackingPayload={{ placement: 'not_found_hero_home', source: 'not_found' }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
                >
                  回到首页
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
              </div>
            </div>

            <aside className="rounded-[30px] border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Zap className="h-4 w-4 text-accent-yellow" />
                快速恢复导航
              </div>
              <div className="mt-5 space-y-3">
                {[
                  '先到工具库，按关键词直接搜索。',
                  '如果你来自外部文章，优先看专题页导航。',
                  '如果你是产品方，直接走提交或合作入口。',
                ].map((item) => (
                  <div key={item} className="rounded-[22px] border border-white/8 bg-black/10 px-4 py-3 text-sm text-text-secondary">
                    {item}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading
          eyebrow="Recovery Path"
          title="从这里继续，不浪费这次访问"
          description="无论你是找工具、看内容还是要提交产品，这三个入口都能把你带回主流程。"
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {fallbackLinks.map((item) => (
            <TrackedLink
              key={item.href}
              href={item.href}
              trackingPayload={{ placement: 'not_found_recovery_grid', source: 'not_found' }}
              className="rounded-[28px] border border-white/10 bg-white/5 p-5 transition hover:border-white/16 hover:bg-white/[0.07]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/10">
                <item.icon className="h-5 w-5 text-accent-cyan" />
              </div>
              <h2 className="mt-5 text-xl font-semibold text-text-primary">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-text-secondary">{item.desc}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm text-text-primary">
                进入
                <ArrowRight className="h-4 w-4 text-accent-cyan" />
              </span>
            </TrackedLink>
          ))}
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 text-center">
            <h2 className="text-2xl font-semibold text-text-primary">你是来推广产品的吗？</h2>
            <p className="mt-3 text-sm leading-7 text-text-secondary">
              如果你是产品团队，现在就可以提交工具，或直接看商务合作方案。
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <TrackedLink
                href="/submit"
                trackingPayload={{ placement: 'not_found_submit_cta', source: 'not_found' }}
                className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
              >
                提交工具
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
              <TrackedLink
                href="/advertise"
                trackingPayload={{ placement: 'not_found_advertise_cta', source: 'not_found' }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
              >
                查看合作方案
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
