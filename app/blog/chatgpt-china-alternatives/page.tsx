import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  FileText,
  Globe,
  MessageCircle,
  Search,
  Shield,
  Sparkles,
  Star,
  XCircle,
} from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import ToolLogo from '@/components/ui/ToolLogo';
import ToolPrimaryCta from '@/components/ui/ToolPrimaryCta';
import { getToolCardData, getToolDetailHref } from '@/lib/content/tool-directory';
import { buildSiteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'ChatGPT 国内替代方案 - 2026 谁更适合中文工作流',
  description: '别再只问 ChatGPT 能不能用。用一页看懂 DeepSeek、Qwen 2.5-Max、Kimi k1.5 各自适合什么工作流，以及谁更值得先试。',
  keywords: ['ChatGPT 国内替代', '国内 AI 对话工具', 'DeepSeek', 'Qwen 2.5-Max', 'Kimi', '中文 AI'],
  alternates: {
    canonical: buildSiteUrl('/blog/chatgpt-china-alternatives'),
  },
  openGraph: {
    title: 'ChatGPT 国内替代方案 - 2026 谁更适合中文工作流',
    description: '先看你的任务类型，再决定该用哪个国内替代工具。',
    url: buildSiteUrl('/blog/chatgpt-china-alternatives'),
    type: 'article',
    publishedTime: '2026-03-12',
  },
};

const publishDate = '2026-03-12';
const readTime = '11 分钟';

const quickDecisions = [
  {
    title: '想先找到中文主力入口',
    description: '先试 DeepSeek，最快的价值不是“完全替代”，而是让你先把 AI 工作流跑起来。',
  },
  {
    title: '想兼顾代码和企业场景',
    description: 'Qwen 2.5-Max 更适合技术、文档和偏企业协作的任务。',
  },
  {
    title: '想处理长文档和资料',
    description: 'Kimi k1.5 更像一个资料整理器，适合把长文本工作先接过去。',
  },
];

const whyItMatters = [
  {
    title: '不是只看能不能打开',
    icon: Globe,
    description: '真正影响体验的，是它能不能顺手放进你当前的工作流，而不是只看访问条件。',
  },
  {
    title: '中文语境差异很真实',
    icon: MessageCircle,
    description: '会议纪要、内容提纲、文档问答和中文表达，会直接决定你是不是愿意长期留下来。',
  },
  {
    title: '安全感来自可控流程',
    icon: Shield,
    description: '企业和团队常常更在意流程稳定、工具衔接和风险可控，而不是单次炫技表现。',
  },
];

const alternatives = [
  {
    id: 'deepseek',
    name: 'DeepSeek',
    company: '深度求索',
    standout: '中文推理和低成本试错的第一站',
    description: '更适合作为国内用户的主力起点，尤其是中文问答、推理拆解和代码解释。',
    pros: ['中文任务顺手', '适合快速建立 AI 使用习惯', '推理和代码场景更务实'],
    cons: ['不是所有创意场景都更强', '生态成熟度不如国际头部产品'],
    bestFor: '中文问答、代码解释、低成本试错、轻量办公',
  },
  {
    id: 'qwen25max',
    name: 'Qwen 2.5-Max',
    company: '阿里通义',
    standout: '代码、文档和企业感更强的选择',
    description: '如果你需要更偏技术、偏文档和偏系统化的工作流，Qwen 往往更容易接住。',
    pros: ['中文理解和代码能力更均衡', '适合文档与业务场景', '更像企业工具底座'],
    cons: ['对普通用户来说判断成本更高', '创意表达不一定是它的强项'],
    bestFor: '代码辅助、企业文档、业务分析、复杂资料处理',
  },
  {
    id: 'kimi-k15',
    name: 'Kimi k1.5',
    company: '月之暗面',
    standout: '长文档和资料整理最容易立刻见效',
    description: '当你要处理长资料、长上下文问答和总结归纳时，它比很多通用对话工具更像生产力工具。',
    pros: ['适合长文和多资料整理', '界面和使用方式门槛低', '做信息提炼更省时间'],
    cons: ['如果你主要做代码和复杂推理，不一定是第一选择', '更适合作为专项工具使用'],
    bestFor: '论文和报告阅读、资料总结、长文档问答、内容整理',
  },
].map((tool) => ({
  ...tool,
  ...getToolCardData(tool),
}));

const useCases = [
  {
    title: '中文问答和内容起稿',
    icon: MessageCircle,
    recommendation: '先从 DeepSeek 开始',
    description: '更容易拿到可执行的第一版，适合把空白启动时间压到最短。',
  },
  {
    title: '编程和业务文档',
    icon: Code2,
    recommendation: '优先看 Qwen 2.5-Max',
    description: '如果你既做技术又做文档，它更适合承担中间那段“解释和梳理”的工作。',
  },
  {
    title: '长资料阅读与总结',
    icon: FileText,
    recommendation: '优先看 Kimi k1.5',
    description: '适合接住论文、报告、访谈整理和多份材料的交叉阅读。',
  },
  {
    title: '搜索驱动的问题',
    icon: Search,
    recommendation: '先看任务再决定工具',
    description: '如果你更依赖实时搜索和外部信息，替代方案要和搜索型工作流一起考虑，而不是只换模型。',
  },
];

const comparisonRows = [
  {
    need: '想先把中文工作流跑起来',
    pick: 'DeepSeek',
    why: '更容易直接上手，也更适合高频中文任务的第一轮落地。',
  },
  {
    need: '想做代码、文档和偏企业协作',
    pick: 'Qwen 2.5-Max',
    why: '更均衡，适合技术与业务混合场景，不容易只停留在聊天工具层面。',
  },
  {
    need: '想处理超长资料和复杂文档',
    pick: 'Kimi k1.5',
    why: '长文和资料消化的效率提升最容易被直接感知。',
  },
  {
    need: '想要更成熟的国际生态和更多外围能力',
    pick: '把 ChatGPT 留作第二工具',
    why: '国内替代适合承担主力场景，但不是每条链路都必须一刀切替换。',
  },
];

export default function ChatGPTAlternativesPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <PageHero
        eyebrow="替代方案专题"
        title="ChatGPT 国内替代方案"
        highlight="先看你的任务类型，再决定该把谁放进主力工作流。"
        description="这页不再堆“国内能用的 AI 名单”，而是直接回答更重要的问题：你到底想解决什么任务，以及哪个工具最适合先承担那段工作流。"
        metrics={[
          {
            value: `${alternatives.length} 个优先选择`,
            label: '这页先聚焦的替代工具',
            hint: '不求全，只先解决最常见的三类需求。',
          },
          {
            value: '中文 / 代码 / 长文档',
            label: '核心判断维度',
            hint: '比按品牌选，更接近真实决策。',
          },
          {
            value: '对比 + 场景 + 下一步动作',
            label: '页面结构',
            hint: '帮助你从判断直接走向试用。',
          },
        ]}
        actions={[
          { href: '/tools?category=chatbot', label: '查看全部对话工具', tone: 'secondary' },
          { href: '/tools', label: '进入工具库继续筛选', tone: 'primary' },
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
      >
        <div className="flex flex-wrap gap-2 text-sm text-text-muted">
          {[`更新于 ${publishDate}`, readTime, '适合中文工作流选型'].map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-black/10 px-3 py-1.5">
              {item}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading
          eyebrow="判断前提"
          title="为什么这页不只回答“能不能用”"
          description="真正的替代，不是把名字换掉，而是找到更适合中文团队和国内用户的任务承接方式。"
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {whyItMatters.map((item) => (
            <article key={item.title} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/10">
                <item.icon className="h-5 w-5 text-accent-cyan" />
              </div>
              <h2 className="mt-5 text-xl font-semibold text-text-primary">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-text-secondary">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeading
            eyebrow="优先推荐"
            title="更值得先试的国内替代工具"
            description="先从这三类典型工作流切入，比一口气同时装五六个工具更容易形成长期使用习惯。"
          />

          <div className="mt-10 grid gap-4">
            {alternatives.map((tool) => (
              <article key={tool.id} className="rounded-[30px] border border-white/10 bg-white/5 p-6 transition hover:border-white/16">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
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
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-2xl font-semibold text-text-primary">{tool.name}</h2>
                        <span className="rounded-full border border-white/10 bg-black/10 px-2.5 py-1 text-xs text-text-secondary">
                          {tool.company}
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-accent-cyan">{tool.standout}</p>
                      <p className="mt-3 max-w-3xl text-sm leading-7 text-text-secondary">{tool.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/10 px-3 py-1 text-sm text-text-primary">
                    <Star className="h-4 w-4 text-accent-yellow fill-accent-yellow" />
                    推荐优先试用
                  </div>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className="rounded-[22px] border border-white/8 bg-black/10 p-4">
                    <div className="flex items-center gap-2 text-sm text-text-primary">
                      <CheckCircle2 className="h-4 w-4 text-accent-cyan" />
                      更适合它的地方
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                      {tool.pros.map((item) => (
                        <li key={item}>+ {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-[22px] border border-white/8 bg-black/10 p-4">
                    <div className="flex items-center gap-2 text-sm text-text-primary">
                      <XCircle className="h-4 w-4 text-accent-pink" />
                      先知道这些限制
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                      {tool.cons.map((item) => (
                        <li key={item}>- {item}</li>
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
                    placement="blog_chatgpt_alternatives_primary_cta"
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
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeading
            eyebrow="按场景选"
            title="不是选最强，而是选最顺手"
            description="如果你已经知道自己最常做什么，这一段会比任何榜单都更快帮你排除选项。"
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {useCases.map((item) => (
              <article key={item.title} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/10">
                  <item.icon className="h-5 w-5 text-accent-yellow" />
                </div>
                <h2 className="mt-5 text-lg font-semibold text-text-primary">{item.title}</h2>
                <p className="mt-3 text-sm text-accent-cyan">{item.recommendation}</p>
                <p className="mt-3 text-sm leading-7 text-text-secondary">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeading
            eyebrow="替代逻辑"
            title="什么时候可以直接替，什么时候适合并行用"
            description="更现实的做法通常不是一刀切，而是让不同工具接住不同任务。"
          />

          <div className="mt-10 overflow-x-auto rounded-[30px] border border-white/10 bg-white/5">
            <table className="w-full min-w-[840px]">
              <thead>
                <tr className="border-b border-white/8 bg-black/10">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">你的需求</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">更推荐先试</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">原因</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr key={row.need} className={index % 2 === 1 ? 'bg-black/10' : ''}>
                    <td className="px-6 py-4 text-sm font-medium text-text-primary">{row.need}</td>
                    <td className="px-6 py-4 text-sm text-text-secondary">{row.pick}</td>
                    <td className="px-6 py-4 text-sm leading-7 text-text-secondary">{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] p-8 text-center shadow-[0_28px_70px_rgba(0,0,0,0.25)]">
            <h2 className="text-3xl font-semibold text-text-primary">下一步不是继续收藏，而是马上试一个真实任务</h2>
            <p className="mt-4 text-base leading-8 text-text-secondary">
              如果你已经知道自己更偏中文问答、代码文档还是长资料处理，就直接从对应工具开始试，再回到工具库扩大筛选范围。
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/tools?category=chatbot"
                className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
              >
                继续看对话工具
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/blog/deepseek-guide"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
              >
                读 DeepSeek 教程
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
              >
                回到专题中心
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
