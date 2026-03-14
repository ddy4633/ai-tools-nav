import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Code2,
  FileText,
  Gauge,
  MessagesSquare,
  Sparkles,
  XCircle,
} from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import ToolLogo from '@/components/ui/ToolLogo';
import ToolPrimaryCta from '@/components/ui/ToolPrimaryCta';
import { getToolCardData, getToolDetailHref } from '@/lib/content/tool-directory';
import { buildSiteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'DeepSeek 使用教程 - 2026 怎么上手、适合谁、值不值得继续用',
  description: '用一页看懂 DeepSeek 的上手路径、适用场景、和 ChatGPT 的差别，以及怎样把它真正放进自己的中文工作流。',
  keywords: ['DeepSeek 教程', 'DeepSeek 使用', 'DeepSeek 怎么用', '国产 AI', 'AI 对话工具', 'DeepSeek 与 ChatGPT'],
  alternates: {
    canonical: buildSiteUrl('/blog/deepseek-guide'),
  },
  openGraph: {
    title: 'DeepSeek 使用教程 - 2026 怎么上手、适合谁、值不值得继续用',
    description: '先判断它适不适合你，再决定要不要把工作流迁进去。',
    url: buildSiteUrl('/blog/deepseek-guide'),
    type: 'article',
    publishedTime: '2026-03-10',
  },
};

const publishDate = '2026-03-10';
const readTime = '12 分钟';

const deepseekTool = getToolCardData({
  id: 'deepseek',
  name: 'DeepSeek',
  website: 'https://chat.deepseek.com',
});

const quickDecisions = [
  {
    title: '中文推理和代码优先',
    description: '如果你日常做中文问答、推理拆解和代码解释，DeepSeek 很适合先成为主力入口。',
  },
  {
    title: '想先把试错成本压低',
    description: '它更适合作为第一站，因为进入门槛低，适合先把自己的提问习惯练起来。',
  },
  {
    title: '不要把它当万能替代',
    description: '遇到多模态、成熟生态和复杂协作需求时，仍然要和其他工具配合使用。',
  },
];

const fitSignals = [
  {
    title: '日常中文工作流',
    icon: MessagesSquare,
    description: '更适合日报、提纲、会议纪要、内容整理和常见中文问答场景。',
  },
  {
    title: '推理与代码任务',
    icon: Code2,
    description: '当你更在意拆解问题、解释代码和给出步骤时，它通常更省心。',
  },
  {
    title: '文档理解与总结',
    icon: FileText,
    description: '适合作为长文摘要、资料消化和知识梳理的第一轮工具。',
  },
];

const onboardingSteps = [
  {
    title: '先选一个固定场景',
    detail: '不要一上来什么都试。先用它处理一个高频任务，比如日报、提纲、总结或代码报错。',
  },
  {
    title: '把提问拆成三段',
    detail: '目标、背景、输出格式缺一不可。DeepSeek 的稳定度会在结构化输入里明显更好。',
  },
  {
    title: '先拿它做第一版',
    detail: '最适合的切入点不是终稿，而是让它先给思路、骨架、清单和改写方向。',
  },
  {
    title: '留下自己的高频模板',
    detail: '把常用提示词存下来，才是真正把工具变成工作流，而不是每次重新摸索。',
  },
];

const comparisonRows = [
  {
    label: '更适合的任务',
    deepseek: '中文问答、推理拆解、代码说明、低成本试错',
    chatgpt: '通用协作、多模态体验、生态联动、成熟工作流',
  },
  {
    label: '上手门槛',
    deepseek: '更适合国内用户直接开始，学习成本更低',
    chatgpt: '强在广度，但对环境和搭配要求更高',
  },
  {
    label: '输出气质',
    deepseek: '偏直接、偏务实，适合先拿到结构化答案',
    chatgpt: '更圆润、更通用，适合复杂协作和多轮打磨',
  },
  {
    label: '推荐角色',
    deepseek: '中文内容团队、学生、开发者、轻量办公人群',
    chatgpt: '跨语言团队、重度工具用户、需要更多生态的人',
  },
];

const strengths = {
  pros: [
    '中文表达自然，做中文任务时更容易直接进入状态。',
    '推理、代码解释和步骤拆解场景更容易得到务实结果。',
    '适合先建立自己的 AI 使用习惯，试错成本更可控。',
  ],
  cons: [
    '不是所有创意类输出都更强，文学性和品牌表达仍要复核。',
    '如果你依赖成熟插件、多模态协作和外部生态，替代感没那么完整。',
    '把它当成一站式解决方案，往往会误判它真正强的场景。',
  ],
};

const promptPlaybook = [
  {
    title: '做日报和周报',
    icon: MessagesSquare,
    prompt:
      '你是一名项目助理。请根据下面的原始记录，整理一版适合发给团队的周报。保留重点成果、风险、下周计划，并用项目符号输出。',
  },
  {
    title: '做代码解释',
    icon: Code2,
    prompt:
      '请把这段代码当成给新同事的入职讲解，先说明它解决什么问题，再按执行顺序解释关键逻辑，最后指出最容易改错的地方。',
  },
  {
    title: '做资料总结',
    icon: FileText,
    prompt:
      '请把这份资料拆成三层输出：先给一句话结论，再给 5 个关键要点，最后给我一份可直接执行的行动清单。',
  },
  {
    title: '做问题拆解',
    icon: BrainCircuit,
    prompt:
      '请不要直接给答案，先帮我把问题拆成 4 个判断步骤。每一步都说明为什么重要、需要补哪些信息、以及下一步怎么推进。',
  },
];

const faqs = [
  {
    question: '第一次用 DeepSeek，最值得先试什么任务？',
    answer: '先挑一个高频、重复、反馈快的场景，例如日报、内容提纲、代码报错解释或资料总结。这样最容易判断它是否真的适合你。',
  },
  {
    question: 'DeepSeek 能完全替代 ChatGPT 吗？',
    answer: '更好的判断方式不是“能不能替代”，而是“哪一段工作流更适合它”。推理、中文问答和低成本试错适合先交给 DeepSeek，生态协作和更复杂的综合任务再看其他工具。',
  },
  {
    question: '为什么同样的问题，有时回答质量差很多？',
    answer: '大多数波动来自输入方式。把任务目标、背景信息和输出格式说清楚，通常比只换一个模型更有效。',
  },
  {
    question: '怎样判断它值不值得长期留在工作流里？',
    answer: '看三个指标：是否减少了你的空白启动时间、是否让第一版更快出现、以及是否能沉淀成可复用模板。三项里占两项，就值得继续留。',
  },
];

export default function DeepSeekGuidePage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <PageHero
        eyebrow="国产大模型教程"
        title="DeepSeek 使用教程"
        highlight="先判断它适不适合你，再决定要不要迁入工作流。"
        description="这页不打算把 DeepSeek 讲成万能答案，而是帮你做三个判断：它适合哪类人、第一次应该怎么上手、以及它和 ChatGPT 的差别会不会真实影响你的日常使用。"
        metrics={[
          {
            value: '3 个判断问题',
            label: '这页的阅读目标',
            hint: '适合谁、怎么上手、和谁搭配用。',
          },
          {
            value: '上手路径 + 对比 + 模板',
            label: '内容结构',
            hint: '帮助你从看文章直接走到开始实操。',
          },
          {
            value: '中文推理 / 代码 / 总结',
            label: '最常见的命中场景',
            hint: '这些场景最容易快速感受到差异。',
          },
        ]}
        actions={[
          { href: getToolDetailHref(deepseekTool.id, deepseekTool.name), label: '查看 DeepSeek 详情', tone: 'primary' },
          { href: '/blog/chatgpt-china-alternatives', label: '再看国内替代方案', tone: 'secondary' },
        ]}
        aside={
          <div>
            <div className="flex items-center gap-3 rounded-[24px] border border-white/10 bg-black/10 p-4">
              <ToolLogo
                name={deepseekTool.name}
                icon={deepseekTool.icon}
                size={48}
                wrapperClassName="h-12 w-12 rounded-2xl border border-white/10 bg-black/20"
                imageClassName="h-8 w-8"
                textClassName="text-base text-text-primary"
              />
              <div>
                <p className="text-sm font-medium text-text-primary">{deepseekTool.name}</p>
                <p className="mt-1 text-xs leading-6 text-text-muted">适合把中文推理和低成本试错先跑通。</p>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2 text-sm text-text-secondary">
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
          {[`更新于 ${publishDate}`, readTime, '适合中文工作流首次落地'].map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-black/10 px-3 py-1.5">
              {item}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading
          eyebrow="适合谁用"
          title="如果你符合这三类需求，DeepSeek 值得先试"
          description="把它放进工作流之前，先判断自己的真实需求，而不是先被模型名字带着走。"
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {fitSignals.map((item) => (
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
            eyebrow="快速上手"
            title="第一次用，建议按这条路径走"
            description="把工具跑通最忌讳一开始就追求复杂。先让它在一个可重复的任务上稳定出结果。"
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {onboardingSteps.map((step, index) => (
              <article key={step.title} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/10 text-sm font-semibold text-text-primary">
                  {index + 1}
                </div>
                <h2 className="mt-5 text-lg font-semibold text-text-primary">{step.title}</h2>
                <p className="mt-3 text-sm leading-7 text-text-secondary">{step.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeading
            eyebrow="横向对比"
            title="和 ChatGPT 的差别，不要只看谁更强"
            description="真正影响体验的，往往不是榜单名次，而是你在什么任务上用、是否能顺手融入当前工作流。"
          />

          <div className="mt-10 overflow-x-auto rounded-[30px] border border-white/10 bg-white/5">
            <table className="w-full min-w-[880px]">
              <thead>
                <tr className="border-b border-white/8 bg-black/10">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">判断项</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">DeepSeek</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">ChatGPT</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr key={row.label} className={index % 2 === 1 ? 'bg-black/10' : ''}>
                    <td className="px-6 py-4 text-sm font-medium text-text-primary">{row.label}</td>
                    <td className="px-6 py-4 text-sm leading-7 text-text-secondary">{row.deepseek}</td>
                    <td className="px-6 py-4 text-sm leading-7 text-text-secondary">{row.chatgpt}</td>
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
            eyebrow="优劣判断"
            title="哪些地方值得留下来，哪些地方要提前知道"
            description="别只看优点。真正有帮助的是，提前知道它会在哪些场景帮你加速，在哪些场景反而会让你误判。"
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <article className="rounded-[30px] border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-2 text-text-primary">
                <CheckCircle2 className="h-5 w-5 text-accent-cyan" />
                <h2 className="text-xl font-semibold">值得留下来的地方</h2>
              </div>
              <div className="mt-5 space-y-3">
                {strengths.pros.map((item) => (
                  <div key={item} className="rounded-[22px] border border-white/8 bg-black/10 p-4 text-sm leading-7 text-text-secondary">
                    {item}
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[30px] border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-2 text-text-primary">
                <XCircle className="h-5 w-5 text-accent-pink" />
                <h2 className="text-xl font-semibold">提前知道的限制</h2>
              </div>
              <div className="mt-5 space-y-3">
                {strengths.cons.map((item) => (
                  <div key={item} className="rounded-[22px] border border-white/8 bg-black/10 p-4 text-sm leading-7 text-text-secondary">
                    {item}
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeading
            eyebrow="提问模板"
            title="把回答质量拉稳的 4 种写法"
            description="当你不确定该怎么提问时，直接从这些结构开始，通常比临场发挥更稳。"
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {promptPlaybook.map((item) => (
              <article key={item.title} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/10">
                  <item.icon className="h-5 w-5 text-accent-yellow" />
                </div>
                <h2 className="mt-5 text-xl font-semibold text-text-primary">{item.title}</h2>
                <div className="mt-4 rounded-[22px] border border-white/8 bg-black/10 p-4 text-sm leading-7 text-text-secondary">
                  {item.prompt}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <SectionHeading
            eyebrow="常见问题"
            title="第一次试用最容易卡住的地方"
            description="如果你只打算花 10 分钟做第一轮试用，先看这四个问题就够了。"
            align="center"
          />

          <div className="mt-10 space-y-4">
            {faqs.map((item) => (
              <article key={item.question} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <h2 className="text-lg font-semibold text-text-primary">{item.question}</h2>
                <p className="mt-3 text-sm leading-7 text-text-secondary">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] p-8 text-center shadow-[0_28px_70px_rgba(0,0,0,0.25)]">
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/10 px-4 py-2 text-sm text-text-secondary">
                <Gauge className="h-4 w-4 text-accent-cyan" />
                先把一个任务跑顺，再决定要不要深度依赖
              </div>
            </div>
            <h2 className="mt-6 text-3xl font-semibold text-text-primary">如果你已经想开始试，就别停在文章里</h2>
            <p className="mt-4 text-base leading-8 text-text-secondary">
              现在最值得做的动作，是直接拿一个真实任务去试 DeepSeek，然后再回到工具库看它适合和谁配合使用。
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <ToolPrimaryCta
                tool={deepseekTool}
                placement="blog_deepseek_primary_cta"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
              />
              <Link
                href={getToolDetailHref(deepseekTool.id, deepseekTool.name)}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
              >
                查看工具详情
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/blog/chatgpt-china-alternatives"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
              >
                看替代方案对比
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
