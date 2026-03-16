import { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import { buildSiteUrl, siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: '隐私政策',
  description: '了解 AI工具导航 如何收集、使用和保护你的数据。',
  alternates: {
    canonical: buildSiteUrl('/privacy'),
  },
};

const sections = [
  {
    title: '我们收集哪些信息',
    content:
      '当你提交工具、订阅周报或发起合作咨询时，我们会收集你主动填写的邮箱、公司名称、预算区间和工具信息；站点会记录基础访问日志与行为埋点用于分析页面效果。',
  },
  {
    title: '我们如何使用这些信息',
    content:
      '我们只会用于工具审核、商务沟通、内容分发和站点优化，不会将你的线索数据出售给第三方。若你订阅邮件，仅会收到与 AI 工具选型、榜单和站点更新相关内容。',
  },
  {
    title: '数据保存与删除',
    content:
      '你可以通过邮件联系站点管理员申请查看、更正或删除你提交的数据。我们会在收到请求后尽快处理，并在必要时同步第三方服务商删除。',
  },
  {
    title: '第三方服务',
    content:
      '站点可能使用邮件服务商、Webhook 或数据分析服务处理业务请求。我们会尽量选择合规服务并限制传输字段，降低隐私泄露风险。',
  },
  {
    title: '政策更新',
    content:
      '当业务流程、合规要求或服务商发生变化时，本政策会同步更新。继续使用站点视为你已阅读更新内容。',
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <PageHero
        eyebrow="Privacy"
        title="隐私政策"
        highlight="我们重视线索，也重视你的数据边界。"
        description="这份页面说明我们收集哪些信息、如何使用、如何删除，以及你可以如何联系我们。"
        metrics={[
          {
            value: '最小必要收集',
            label: '字段策略',
            hint: '只收集工具收录和商务沟通所需信息。',
          },
          {
            value: '可申请删除',
            label: '用户权利',
            hint: '支持按邮箱申请删除提交记录。',
          },
        ]}
        aside={
          <div className="rounded-[24px] border border-white/10 bg-black/10 p-5">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <ShieldCheck className="h-4 w-4 text-accent-cyan" />
              联系方式
            </div>
            <p className="mt-3 text-sm leading-7 text-text-secondary">
              如需隐私相关支持，请邮件联系：{siteConfig.contactEmail}
            </p>
          </div>
        }
      />

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="space-y-4">
          {sections.map((section) => (
            <article key={section.title} className="rounded-[28px] border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-semibold text-text-primary">{section.title}</h2>
              <p className="mt-3 text-sm leading-8 text-text-secondary">{section.content}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
