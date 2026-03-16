import { Metadata } from 'next';
import { Megaphone } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import { buildSiteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: '合作披露',
  description: '查看 AI工具导航 的赞助展示、合作链接与编辑推荐披露规则。',
  alternates: {
    canonical: buildSiteUrl('/disclosure'),
  },
};

const sections = [
  {
    title: '赞助标识规则',
    content:
      '所有赞助工具会在卡片或详情页展示明确的赞助标识（如“首页赞助”“分类赞助”）。我们不会用模糊样式隐藏商业关系。',
  },
  {
    title: '合作链接说明',
    content:
      '部分“合作链接”可能产生佣金或线索收益。你点击前会看到“合作链接”文案，便于区分普通官网跳转和合作导流。',
  },
  {
    title: '编辑推荐独立性',
    content:
      '编辑推荐与商务合作分开管理。即使同一工具存在合作关系，也应在内容里保留适用场景、风险与替代方案说明。',
  },
  {
    title: '数据与复盘',
    content:
      '合作链接和核心转化入口会进行埋点统计，用于复盘合作效果。我们不会公开披露合作方的敏感经营数据。',
  },
];

export default function DisclosurePage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <PageHero
        eyebrow="Disclosure"
        title="合作披露"
        highlight="商业化可以做，但必须说清楚。"
        description="这个页面用于公开说明赞助位、合作链接和编辑推荐之间的关系，保护用户信任。"
        metrics={[
          {
            value: '显式标注',
            label: '赞助展示',
            hint: '赞助位必须有可见标识。',
          },
          {
            value: '可追踪',
            label: '合作链路',
            hint: '关键入口支持点击埋点与复盘。',
          },
        ]}
        aside={
          <div className="rounded-[24px] border border-white/10 bg-black/10 p-5">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Megaphone className="h-4 w-4 text-accent-cyan" />
              披露更新说明
            </div>
            <p className="mt-3 text-sm leading-7 text-text-secondary">
              如果商业化策略变更，我们会优先更新此页，确保披露规则与站内展示保持一致。
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
