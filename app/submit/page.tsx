import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock3, Megaphone } from 'lucide-react';
import SubmitForm from './SubmitForm';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import { commercialPackages, partnershipSteps } from '@/lib/content/growth-content';
import { buildSiteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: '提交工具 - 推荐好用的 AI 工具 | 好工具',
  description: '提交你的 AI 工具，支持免费收录、加急评估和赞助合作。适合新品发布、分类曝光和专题内容联动。',
  keywords: ['提交工具', '推荐工具', 'AI工具推荐', '工具提交', 'AI工具收录', 'AI工具导航', '人工智能工具分享'],
  alternates: {
    canonical: buildSiteUrl('/submit'),
  },
  openGraph: {
    title: '提交工具 - 推荐好用的 AI 工具',
    description: '发现了好用的 AI 工具？提交给我们，让更多人知道它。',
    url: buildSiteUrl('/submit'),
    type: 'website',
  },
};

function CommercialPlans() {
  const plans = [
    {
      icon: CheckCircle2,
      title: '免费收录',
      desc: '适合自然推荐，先进入常规审核队列。',
      meta: '标准审核',
    },
    {
      icon: Clock3,
      title: '加急评估',
      desc: '适合活动排期、产品发布周、需要更快拿到反馈的团队。',
      meta: '48 小时优先处理',
    },
    {
      icon: Megaphone,
      title: '赞助合作',
      desc: '适合首页、分类页、榜单页和专题页的组合曝光。',
      meta: '支持商务咨询',
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <SectionHeading
        eyebrow="Plan Entry"
        title="先选合作路径，再决定要不要加预算"
        description="免费收录是内容入口，加急和赞助是时间与曝光入口。它们服务的是不同阶段的增长目标。"
      />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <article key={plan.title} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/10">
                <Icon className="h-5 w-5 text-accent-cyan" />
              </div>
              <h2 className="mt-5 text-xl font-semibold text-text-primary">{plan.title}</h2>
              <p className="mt-3 text-sm leading-7 text-text-secondary">{plan.desc}</p>
              <span className="mt-4 inline-flex rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs text-text-secondary">
                {plan.meta}
              </span>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function PackageOverview() {
  return (
    <section className="border-t border-white/8">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading
          eyebrow="Package Ladder"
          title="这页要承接“免费推荐”到“商业合作”的完整漏斗"
          description="所以我们把收费方案拆成逐层递进的阶梯，先让用户敢提交，再让客户能看清升级路径。"
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
      </div>
    </section>
  );
}

function SubmissionGuide() {
  return (
    <section className="border-t border-white/8">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <SectionHeading
          eyebrow="How It Works"
          title="提交之后会发生什么"
          description="把流程说清楚，能显著提高提交率，也能减少后续沟通成本。"
          align="center"
        />
        <div className="mt-10 space-y-4">
          {partnershipSteps.map((step, index) => (
            <div key={step} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/10 text-sm font-semibold text-text-primary">
                  {index + 1}
                </span>
                <p className="text-sm leading-7 text-text-secondary">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedLinks() {
  const links = [
    { href: '/advertise', label: '商务合作方案', desc: '了解首页、分类页、榜单和专题位' },
    { href: '/tools', label: '浏览全部工具', desc: '看看当前站内工具库长什么样' },
    { href: '/blog', label: '阅读专题内容', desc: '了解我们如何写高意图内容页' },
  ];

  return (
    <section className="border-t border-white/8">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading
          eyebrow="Next Step"
          title="你可能还想继续看这几个入口"
          align="center"
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-[28px] border border-white/10 bg-white/5 p-5 transition hover:border-white/16 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-semibold text-text-primary">{link.label}</h3>
              <p className="mt-3 text-sm leading-7 text-text-secondary">{link.desc}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm text-text-primary">
                继续查看
                <ArrowRight className="h-4 w-4 text-accent-cyan" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function SubmitPage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <PageHero
        eyebrow="提交工具 / 商务合作"
        title="这不是一个普通的提交表单。"
        highlight="它应该是你的增长入口。"
        description="如果你只是想被收录，可以走免费提交；如果你希望在发布窗口拿到更快审核、更多曝光或更高意图流量，就应该直接从这里进入商业合作路径。"
        metrics={[
          {
            value: '免费收录',
            label: '适合内容入库',
            hint: '先进入标准审核队列，适合自然推荐。',
          },
          {
            value: '加急评估',
            label: '适合发布窗口',
            hint: '适合新品上线、营销活动和内容冷启动。',
          },
          {
            value: '赞助合作',
            label: '适合买流量',
            hint: '首页、分类页、榜单页和专题页都可组合。',
          },
        ]}
        actions={[
          { href: '/advertise', label: '先看合作方案', tone: 'primary' },
          { href: '/tools', label: '先看站内现状', tone: 'secondary' },
        ]}
        aside={
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-text-muted">Why This Page Exists</p>
            <h2 className="mt-3 text-2xl font-semibold text-text-primary">把“提交入口”和“收费路径”放在同一页说清楚</h2>
            <p className="mt-4 text-sm leading-7 text-text-secondary">
              这样既不会让自然推荐的用户被价格吓走，也不会让真正有预算的团队找不到升级入口。
            </p>
          </div>
        }
      />

      <SubmitForm />
      <CommercialPlans />
      <PackageOverview />
      <SubmissionGuide />
      <RelatedLinks />
    </main>
  );
}
