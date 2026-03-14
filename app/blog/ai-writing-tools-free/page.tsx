import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  GraduationCap,
  PenTool,
  Sparkles,
  Star,
  XCircle,
} from 'lucide-react';
import ToolPrimaryCta from '@/components/ui/ToolPrimaryCta';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import ToolLogo from '@/components/ui/ToolLogo';
import { getToolCardData, getToolDetailHref } from '@/lib/content/tool-directory';
import { buildSiteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: '免费 AI 写作工具推荐 - 2026 值得先试的 8 个选择',
  description: '从 ChatGPT、Claude 到 Notion AI，按预算、写作深度和团队场景拆解 2026 年值得先试的 AI 写作工具。',
  keywords: ['免费AI写作工具', 'AI写作软件', 'AI写作助手', 'ChatGPT写作', 'Claude写作', 'AI文案生成'],
  alternates: {
    canonical: buildSiteUrl('/blog/ai-writing-tools-free'),
  },
  openGraph: {
    title: '免费 AI 写作工具推荐 - 2026 值得先试的 8 个选择',
    description: '按预算、写作深度和团队场景拆解值得先试的 AI 写作工具。',
    url: buildSiteUrl('/blog/ai-writing-tools-free'),
    type: 'article',
  },
};

const pricingStyles: Record<string, string> = {
  免费: 'border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan',
  免费试用: 'border-accent-yellow/30 bg-accent-yellow/10 text-accent-yellow',
  付费: 'border-accent-pink/30 bg-accent-pink/10 text-accent-pink',
};

const aiWritingTools = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: '最稳的通用写作入口，适合从提纲、初稿到改写润色的整条链路。',
    pricing: '免费试用',
    priceDetail: '免费版可起步，Plus 升级空间明确',
    rating: 4.8,
    features: ['多语言写作', '文章续写', '文案优化', '翻译润色'],
    pros: ['中文写作流畅', '通用性最强', '适合从零开始搭框架'],
    cons: ['高峰时段波动明显', '偶尔会生成过度顺滑的空话'],
    bestFor: '通用内容写作、自由职业者、需要快速出初稿的人',
    website: 'https://chat.openai.com',
  },
  {
    id: 'claude',
    name: 'Claude',
    description: '更适合长文、深度稿和研究类材料，结构感和长文本处理都更稳。',
    pricing: '免费试用',
    priceDetail: '免费额度可试，重度用需要升级',
    rating: 4.9,
    features: ['长文本处理', '深度分析写作', '学术写作', '文档总结'],
    pros: ['长上下文优势明显', '逻辑严谨', '长稿更少跑偏'],
    cons: ['免费额度更克制', '实时联网场景不占优'],
    bestFor: '论文、报告、白皮书、长文改写与深度写作',
    website: 'https://claude.ai',
  },
  {
    id: 'notion-ai',
    name: 'Notion AI',
    description: '适合已经在 Notion 里工作的团队，把写作和知识管理直接连在一起。',
    pricing: '免费试用',
    priceDetail: '试用后更适合团队协作场景',
    rating: 4.5,
    features: ['笔记内嵌 AI', '内容续写', '头脑风暴', '多语言翻译'],
    pros: ['工作流整合好', '多人协作自然', '适合会议与文档'],
    cons: ['离开 Notion 场景价值会下降', '单点能力不算极强'],
    bestFor: '团队协作、项目文档、知识库运营',
    website: 'https://www.notion.so/product/ai',
  },
  {
    id: 'jasper',
    name: 'Jasper',
    description: '更偏营销团队，适合做品牌语气稳定、模板化批量输出和广告文案。',
    pricing: '付费',
    priceDetail: '更适合商业团队而不是轻量个人用户',
    rating: 4.4,
    features: ['营销模板库', 'SEO 优化', '品牌语调', '团队协作'],
    pros: ['营销模板专业', '品牌一致性更好', '适合批量生产'],
    cons: ['价格较高', '不适合作为零预算起步工具'],
    bestFor: '营销团队、内容运营、电商与品牌文案',
    website: 'https://www.jasper.ai',
  },
  {
    id: 'copy-ai',
    name: 'Copy.ai',
    description: '模板多、上手快，适合需要短平快写出销售或营销材料的团队。',
    pricing: '免费试用',
    priceDetail: '免费额度适合低成本试错',
    rating: 4.3,
    features: ['内容模板', '博客写作', '社交媒体', '产品描述'],
    pros: ['模板丰富', '适合短内容', '试错成本低'],
    cons: ['中文上限一般', '深度写作能力不足'],
    bestFor: '营销短内容、社媒运营、轻量商用文案',
    website: 'https://www.copy.ai',
  },
  {
    id: 'quillbot',
    name: 'QuillBot',
    description: '更偏“改”而不是“写”，适合改写、降重、润色和学术表达修正。',
    pricing: '免费试用',
    priceDetail: '基础改写功能足够常用',
    rating: 4.2,
    features: ['智能改写', '语法检查', '文本总结', '引用生成'],
    pros: ['改写强', '适合论文与英文内容', '浏览器插件方便'],
    cons: ['不适合做主写作工具', '中文能力有限'],
    bestFor: '论文改写、降重、英文润色与校对',
    website: 'https://quillbot.com',
  },
  {
    id: 'writesonic',
    name: 'Writesonic',
    description: '偏全能型平台，适合博客 SEO、电商页面和带流量目标的内容团队。',
    pricing: '免费试用',
    priceDetail: '免费额度适合验证是否匹配工作流',
    rating: 4.1,
    features: ['博客写作', 'SEO 优化', '电商文案', '聊天助手'],
    pros: ['SEO 场景友好', '模块多', '适合增长团队'],
    cons: ['界面复杂', '中文质量不够稳定'],
    bestFor: '博客 SEO、电商团队、偏增长导向的内容运营',
    website: 'https://writesonic.com',
  },
  {
    id: 'rytr',
    name: 'Rytr',
    description: '便宜、简单，适合轻量级使用者先建立 AI 写作习惯。',
    pricing: '免费试用',
    priceDetail: '更像低成本起步工具',
    rating: 4.0,
    features: ['场景模板', '语气调整', '改写功能', '多语言支持'],
    pros: ['上手门槛低', '价格友好', '适合轻度写作者'],
    cons: ['深度内容能力弱', '不适合高标准品牌内容'],
    bestFor: '轻量写作、邮件、社媒和个人试用',
    website: 'https://rytr.me',
  },
];

const quickDecisions = [
  {
    title: '零预算先试',
    description: '先从 ChatGPT 或 Claude 开始，建立自己的提问和改稿习惯。',
  },
  {
    title: '长文和深度稿',
    description: 'Claude 更适合报告、论文、研究材料和长文结构整理。',
  },
  {
    title: '营销团队',
    description: 'Jasper 和 Copy.ai 更适合模板化产出和品牌语气管理。',
  },
];

const scenarioSuggestions = [
  {
    title: '学术写作',
    icon: GraduationCap,
    description: 'Claude + QuillBot 的组合更适合长文理解、改写和降重。',
  },
  {
    title: '内容团队',
    icon: FileText,
    description: 'ChatGPT 负责起稿，Notion AI 负责协作整理，是更稳的组合。',
  },
  {
    title: '营销输出',
    icon: PenTool,
    description: 'Jasper、Copy.ai 更适合广告文案、社媒内容和批量营销稿。',
  },
];

const aiWritingToolCards = aiWritingTools.map((tool) => ({
  ...tool,
  ...getToolCardData(tool),
}));

export default function AIWritingToolsFreePage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <PageHero
        eyebrow="AI 写作专题"
        title="免费 AI 写作工具"
        highlight="先看适合谁，再看能写什么。"
        description="真正影响写作效率的，不是工具数量，而是你能不能快速找到和自己工作流匹配的那一类。这个页面按预算、写作深度和团队场景来拆，不再只堆工具名。"
        metrics={[
          { value: `${aiWritingTools.length}`, label: '重点工具', hint: '覆盖通用写作、深度写作和营销团队场景。' },
          { value: '零预算 / 长文 / 营销', label: '主要筛选维度', hint: '先按用途看，再按价格看。' },
          { value: '对比表 + 场景建议', label: '内容结构', hint: '帮助你 5 分钟内完成第一轮判断。' },
        ]}
        actions={[
          { href: '/tools?category=writing', label: '查看全部写作工具', tone: 'secondary' },
          { href: '/advertise', label: '做专题合作', tone: 'primary' },
        ]}
        aside={
          <div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Sparkles className="h-4 w-4 text-accent-yellow" />
              先看结论
            </div>
            <div className="mt-5 space-y-3">
              {quickDecisions.map((item) => (
                <div key={item.title} className="rounded-[22px] border border-white/8 bg-black/10 p-4">
                  <p className="text-sm font-medium text-text-primary">{item.title}</p>
                  <p className="mt-3 text-sm leading-7 text-text-secondary">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        }
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading
          eyebrow="工具清单"
          title="值得先试的 AI 写作工具"
          description="每张卡片都围绕同一个问题：它适合谁，优点在哪里，缺点会不会影响你的工作流。"
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {aiWritingToolCards.map((tool) => (
            <article key={tool.id} className="rounded-[30px] border border-white/10 bg-white/5 p-6 transition hover:border-white/16">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <ToolLogo
                    name={tool.name}
                    icon={tool.icon}
                    size={56}
                    wrapperClassName="h-14 w-14 rounded-[18px] border border-white/10 bg-black/20"
                    imageClassName="h-10 w-10"
                    textClassName="text-lg text-text-primary"
                  />
                  <div>
                    <h2 className="text-2xl font-semibold text-text-primary">{tool.name}</h2>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className={`rounded-full border px-2.5 py-1 text-xs ${pricingStyles[tool.pricing] ?? pricingStyles['免费试用']}`}>
                        {tool.pricing}
                      </span>
                      <span className="text-xs text-text-muted">{tool.priceDetail}</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-sm text-text-primary">
                  {tool.rating.toFixed(1)}
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-text-secondary">{tool.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {tool.features.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs text-text-secondary"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-[22px] border border-white/8 bg-black/10 p-4">
                  <div className="flex items-center gap-2 text-sm text-text-primary">
                    <CheckCircle2 className="h-4 w-4 text-accent-cyan" />
                    优点
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                    {tool.pros.map((pro) => (
                      <li key={pro}>+ {pro}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-[22px] border border-white/8 bg-black/10 p-4">
                  <div className="flex items-center gap-2 text-sm text-text-primary">
                    <XCircle className="h-4 w-4 text-accent-pink" />
                    缺点
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                    {tool.cons.map((con) => (
                      <li key={con}>- {con}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 rounded-[22px] border border-white/8 bg-black/10 p-4 text-sm leading-7 text-text-secondary">
                <strong className="text-text-primary">更适合：</strong>
                {tool.bestFor}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <ToolPrimaryCta
                  tool={tool}
                  placement="blog_writing_primary_cta"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
                />
                <Link
                  href={getToolDetailHref(tool.id, tool.name)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
                >
                  查看详情
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeading
            eyebrow="横向对比"
            title="一张表看完第一轮差异"
            description="这张表不是为了取代详情页，而是为了帮你先剔除明显不合适的选项。"
          />

          <div className="mt-10 overflow-x-auto rounded-[30px] border border-white/10 bg-white/5">
            <table className="w-full min-w-[880px]">
              <thead>
                <tr className="border-b border-white/8 bg-black/10">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">工具</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">价格</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">更擅长</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">中文表现</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">适合谁</th>
                </tr>
              </thead>
              <tbody>
                {aiWritingToolCards.map((tool, index) => (
                  <tr key={tool.id} className={index % 2 === 1 ? 'bg-black/10' : ''}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <ToolLogo
                          name={tool.name}
                          icon={tool.icon}
                          size={32}
                          wrapperClassName="h-9 w-9 rounded-xl border border-white/10 bg-black/20"
                          imageClassName="h-6 w-6"
                          textClassName="text-sm text-text-primary"
                        />
                        <div>
                          <div className="font-medium text-text-primary">{tool.name}</div>
                          <div className="mt-1 flex items-center gap-1 text-xs text-text-muted">
                            <Star className="h-3 w-3 text-accent-yellow fill-accent-yellow" />
                            {tool.rating.toFixed(1)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full border px-2.5 py-1 text-xs ${pricingStyles[tool.pricing] ?? pricingStyles['免费试用']}`}>
                        {tool.pricing}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">{tool.features.slice(0, 2).join(' / ')}</td>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      {['chatgpt', 'claude', 'notion-ai'].includes(tool.id) ? '较强' : tool.id === 'jasper' ? '一般' : '有限'}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">{tool.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeading
            eyebrow="适用场景"
            title="按场景更容易选对"
            description="如果你不是来研究工具，而是想尽快开始干活，就直接从自己的场景切入。"
          />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {scenarioSuggestions.map((item) => (
              <article key={item.title} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/10">
                  <item.icon className="h-5 w-5 text-accent-cyan" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-text-primary">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-text-secondary">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] p-8 text-center shadow-[0_28px_70px_rgba(0,0,0,0.25)]">
            <h2 className="text-3xl font-semibold text-text-primary">继续往前走，不只停在这篇文章里</h2>
            <p className="mt-4 text-base leading-8 text-text-secondary">
              如果你已经有了第一轮判断，可以继续去工具详情页看推荐理由，也可以直接回工具库扩大筛选范围。
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/tools?category=writing"
                className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
              >
                查看写作工具库
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
              >
                回到专题内容中心
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
