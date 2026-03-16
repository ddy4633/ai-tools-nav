import { Metadata } from 'next';
import { FileCheck2 } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import { buildSiteUrl, siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: '服务条款',
  description: '查看 AI工具导航 的使用条款、免责说明和合作边界。',
  alternates: {
    canonical: buildSiteUrl('/terms'),
  },
};

const sections = [
  {
    title: '服务范围',
    content:
      'AI工具导航提供工具信息、编辑观点、榜单内容和合作入口。站点内容用于信息参考，不构成法律、财税或投资建议。',
  },
  {
    title: '内容与链接说明',
    content:
      '我们会尽量保证内容准确，但工具能力、价格与政策可能随时间变化。你在访问第三方工具官网或合作链接前，应自行核对最新条款。',
  },
  {
    title: '用户提交责任',
    content:
      '你提交的产品信息需保证真实、合法且不侵犯他人权益。若提交内容涉嫌违规、虚假或侵权，站点有权拒绝收录或下架。',
  },
  {
    title: '合作与结算',
    content:
      '商务合作以双方确认的排期、交付和结算规则为准。站内公开的预算区间仅作参考，不构成自动成交承诺。',
  },
  {
    title: '责任限制',
    content:
      '因第三方平台故障、网络波动、服务商中断等造成的损失，站点会协助排查，但不承担超出法定范围的间接损失责任。',
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <PageHero
        eyebrow="Terms"
        title="服务条款"
        highlight="先把规则说清楚，再谈合作效率。"
        description="这份条款用于说明站点服务边界、用户责任、合作规则与免责范围。"
        metrics={[
          {
            value: '透明合作',
            label: '商业原则',
            hint: '合作关系与编辑推荐分开展示。',
          },
          {
            value: '信息参考',
            label: '内容属性',
            hint: '工具信息与价格需以官方为准。',
          },
        ]}
        aside={
          <div className="rounded-[24px] border border-white/10 bg-black/10 p-5">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <FileCheck2 className="h-4 w-4 text-accent-yellow" />
              条款咨询
            </div>
            <p className="mt-3 text-sm leading-7 text-text-secondary">
              如需确认合作条款，请邮件联系：{siteConfig.contactEmail}
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
