import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, Clock3, Megaphone } from 'lucide-react';
import SubmitForm from './SubmitForm';
import { buildSiteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: '提交工具 - 推荐好用的 AI 工具 | 好工具',
  description: '发现了好用的 AI 工具？提交给我们，让更多人知道它。我们欢迎各种优质的 AI 工具推荐，包括 AI 写作、AI 绘画、编程开发、AI 对话、视频创作等各类工具。',
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

function Breadcrumb() {
  return (
    <nav aria-label="breadcrumb" className="max-w-2xl mx-auto px-4 sm:px-6 pt-6">
      <ol itemScope itemType="https://schema.org/BreadcrumbList" className="flex items-center gap-2 text-sm text-text-muted">
        <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <Link itemProp="item" href="/" className="hover:text-accent-warm transition-colors">
            <span itemProp="name">首页</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>
        <li className="text-border-medium">&gt;</li>
        <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <span itemProp="name" className="text-text-secondary">提交工具</span>
          <meta itemProp="item" content="/submit" />
          <meta itemProp="position" content="2" />
        </li>
      </ol>
    </nav>
  );
}

function CommercialPlans() {
  const plans = [
    {
      icon: CheckCircle2,
      title: '免费收录',
      desc: '适合自然推荐，进入常规审核队列。',
      meta: '1-3 个工作日',
    },
    {
      icon: Clock3,
      title: '加急评估',
      desc: '适合活动排期、产品发布周、想更快拿到审核反馈。',
      meta: '商务咨询',
    },
    {
      icon: Megaphone,
      title: '赞助置顶',
      desc: '适合首页、分类页或专题页曝光，支持合作链接导流。',
      meta: '商务咨询',
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-6 mb-12">
      <div className="grid md:grid-cols-3 gap-4">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <div key={plan.title} className="bg-surface-card rounded-2xl p-5 border border-border-light">
              <div className="w-10 h-10 rounded-xl bg-accent-warm/10 text-accent-warm flex items-center justify-center mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-semibold text-text-primary mb-2">{plan.title}</h2>
              <p className="text-sm text-text-secondary mb-3">{plan.desc}</p>
              <span className="inline-flex px-2.5 py-1 rounded-full text-xs bg-accent-warm/10 text-accent-warm">
                {plan.meta}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function SubmissionGuide() {
  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 mt-16 mb-12">
      <div className="bg-surface-card rounded-2xl p-6 sm:p-8 border border-border-light">
        <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center gap-2">
          <span className="w-6 h-6 bg-accent-warm/10 text-accent-warm rounded-full flex items-center justify-center text-sm">?</span>
          提交指南
        </h2>
        <div className="space-y-4 text-text-secondary">
          <div className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-accent-warm/10 text-accent-warm rounded-full flex items-center justify-center text-sm font-medium">1</span>
            <div>
              <h3 className="font-medium text-text-primary mb-1">什么样的工具会被收录？</h3>
              <p className="text-sm">我们收录真正实用的 AI 工具，包括但不限于：AI 写作、AI 绘画、编程助手、AI 对话、视频创作、音频处理等类别。工具需要有一定的用户基础和实际使用价值。</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-accent-warm/10 text-accent-warm rounded-full flex items-center justify-center text-sm font-medium">2</span>
            <div>
              <h3 className="font-medium text-text-primary mb-1">审核和商务反馈需要多久？</h3>
              <p className="text-sm">免费收录通常会在 1-3 个工作日内完成审核；加急评估和赞助置顶会优先由商务邮箱跟进，适合活动排期或投放合作。</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-accent-warm/10 text-accent-warm rounded-full flex items-center justify-center text-sm font-medium">3</span>
            <div>
              <h3 className="font-medium text-text-primary mb-1">收费工具可以提交吗？</h3>
              <p className="text-sm">可以。我们欢迎免费和付费工具，只要它对用户有价值。若希望获得更快收录或前台曝光，可以直接选择商务方案并留下预算信息。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RelatedLinks() {
  const links = [
    { href: '/tools', label: '浏览全部工具', desc: '探索我们收录的 AI 工具' },
    { href: '/blog', label: '阅读博客', desc: '了解 AI 工具使用技巧' },
    { href: '/about', label: '关于我们', desc: '了解好工具的使命' },
  ];

  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 mb-16">
      <h2 className="text-lg font-semibold text-text-primary mb-4">您可能还想了解</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="p-4 bg-surface-card rounded-xl border border-border-light hover:border-accent-warm/50 hover:shadow-md transition-all group"
          >
            <h3 className="font-medium text-text-primary group-hover:text-accent-warm transition-colors mb-1">
              {link.label}
            </h3>
            <p className="text-sm text-text-muted">{link.desc}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

export default function SubmitPage() {
  return (
    <main className="min-h-screen bg-surface-base">
      <Breadcrumb />
      <SubmitForm />
      <CommercialPlans />
      <SubmissionGuide />
      <RelatedLinks />
    </main>
  );
}
