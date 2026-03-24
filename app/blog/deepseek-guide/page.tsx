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
import IllustrationFrame from '@/components/ui/IllustrationFrame';
import SectionHeading from '@/components/ui/SectionHeading';
import ToolLogo from '@/components/ui/ToolLogo';
import ToolPrimaryCta from '@/components/ui/ToolPrimaryCta';
import { getToolCardData, getToolDetailHref } from '@/lib/content/tool-directory';
import { getEditorialIllustrationPath } from '@/lib/illustrations';
import { buildSiteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'DeepSeek Guide - How to Use It Well in 2026',
  description:
    'Understand how to start with DeepSeek, what kinds of workflows it fits best, and where it differs from ChatGPT in practical day-to-day use.',
  keywords: ['DeepSeek guide', 'how to use DeepSeek', 'DeepSeek workflow', 'DeepSeek vs ChatGPT', 'AI research tool'],
  alternates: {
    canonical: buildSiteUrl('/blog/deepseek-guide'),
  },
  openGraph: {
    title: 'DeepSeek Guide - How to Use It Well in 2026',
    description: 'Decide whether DeepSeek fits your workflow before you move serious work into it.',
    url: buildSiteUrl('/blog/deepseek-guide'),
    type: 'article',
    publishedTime: '2026-03-10',
  },
};

const publishDate = '2026-03-10';
const readTime = '12 min read';

const deepseekTool = getToolCardData({
  id: 'deepseek',
  name: 'DeepSeek',
  website: 'https://chat.deepseek.com',
});

const quickDecisions = [
  {
    title: 'Strong for reasoning and code explanation',
    description: 'If your daily work involves structured analysis, coding help, and practical reasoning, DeepSeek is worth testing early.',
  },
  {
    title: 'Useful when you want lower-cost experimentation',
    description: 'It works well as a first serious station for building prompting habits without overcommitting to a heavier stack.',
  },
  {
    title: 'Do not treat it like a universal replacement',
    description: 'For multimodal collaboration, deep ecosystem features, and more mature integrated workflows, you may still want a companion tool.',
  },
];

const fitSignals = [
  {
    title: 'Daily research and synthesis',
    icon: MessagesSquare,
    description: 'A strong fit for briefing notes, outlines, meeting synthesis, and structured Q&A.',
  },
  {
    title: 'Reasoning and code tasks',
    icon: Code2,
    description: 'It tends to feel more practical when you need problem breakdowns, code explanations, and step-by-step output.',
  },
  {
    title: 'Document digestion',
    icon: FileText,
    description: 'Useful as a first-pass assistant for summaries, material review, and knowledge extraction.',
  },
];

const onboardingSteps = [
  {
    title: 'Start with one repeatable task',
    detail: 'Do not test everything at once. Use one high-frequency workflow such as summaries, outlines, bug explanations, or research notes.',
  },
  {
    title: 'Structure every prompt in three parts',
    detail: 'State the goal, the context, and the output format. DeepSeek becomes noticeably more stable when the input is structured.',
  },
  {
    title: 'Use it for version one first',
    detail: 'The fastest win is not final output. It is getting a usable structure, list, or direction that you can improve afterward.',
  },
  {
    title: 'Save what works into reusable templates',
    detail: 'The tool only becomes part of your workflow when your best prompts stop living in memory and start living in a repeatable system.',
  },
];

const comparisonRows = [
  {
    label: 'Best-fit tasks',
    deepseek: 'Reasoning-heavy questions, code explanation, structured synthesis, lower-cost experimentation',
    chatgpt: 'General collaboration, broader multimodal work, richer surrounding ecosystem',
  },
  {
    label: 'Onboarding friction',
    deepseek: 'Feels easier to adopt when you want a direct, practical starting point',
    chatgpt: 'Very broad, but often invites more stack decisions and ecosystem choices',
  },
  {
    label: 'Output style',
    deepseek: 'More direct and utilitarian, often better for structured first-pass answers',
    chatgpt: 'More rounded and general-purpose, often stronger for multipurpose collaboration',
  },
  {
    label: 'Best-fit users',
    deepseek: 'Researchers, builders, developers, and operators who value direct reasoning',
    chatgpt: 'Cross-functional teams, heavy ecosystem users, and people needing broader tool integration',
  },
];

const strengths = {
  pros: [
    'It tends to feel direct and practical when you need a structured answer quickly.',
    'Reasoning, code explanation, and step breakdown tasks often feel more grounded.',
    'It is useful for building a disciplined AI workflow without too much overhead.',
  ],
  cons: [
    'It is not automatically the strongest choice for every creative or highly brand-sensitive task.',
    'If you depend on mature plugins, multimodal workflows, or broad integrations, it may feel less complete.',
    'Treating it like a one-tool-for-everything solution can hide where it is strongest.',
  ],
};

const promptPlaybook = [
  {
    title: 'Weekly update drafting',
    icon: MessagesSquare,
    prompt:
      'You are an operations assistant. Based on the notes below, produce a team-ready weekly update with wins, risks, and next steps in bullet format.',
  },
  {
    title: 'Code explanation',
    icon: Code2,
    prompt:
      'Explain this code as if you are onboarding a new teammate. Start with the problem it solves, then walk through the key logic in execution order, and finish with the easiest places to break it.',
  },
  {
    title: 'Document summary',
    icon: FileText,
    prompt:
      'Break this document into three layers: one-sentence conclusion, five key points, and a practical action list I can execute next.',
  },
  {
    title: 'Problem decomposition',
    icon: BrainCircuit,
    prompt:
      'Do not answer the question directly. Break the problem into four decision steps. For each step, explain why it matters, what information is missing, and how to move forward.',
  },
];

const faqs = [
  {
    question: 'What is the best first task to try with DeepSeek?',
    answer: 'Pick a frequent task with a fast feedback loop, such as outlines, bug explanations, meeting synthesis, or document summaries. That is the quickest way to see whether it fits your workflow.',
  },
  {
    question: 'Can DeepSeek fully replace ChatGPT?',
    answer: 'The better question is not whether it fully replaces another tool, but which part of your workflow it should own. DeepSeek is often a great first option for reasoning-heavy and structured tasks.',
  },
  {
    question: 'Why does answer quality vary so much sometimes?',
    answer: 'Most quality variance comes from prompt structure. Clarifying the goal, context, and output format is usually more powerful than switching models at random.',
  },
  {
    question: 'How do I know whether it deserves a permanent place in my stack?',
    answer: 'Look for three signs: it reduces blank-page time, gets a useful first version faster, and produces reusable prompt patterns. If you are hitting two of those, it is worth keeping.',
  },
];

export default function DeepSeekGuidePage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <PageHero
        eyebrow="Tool Guide"
        title="DeepSeek guide"
        highlight="Decide whether it fits before you move real work into it."
        description="This page is not here to call DeepSeek a universal answer. It is here to help you answer three practical questions: who it fits, how to start, and whether the difference from ChatGPT will matter in your real workflow."
        metrics={[
          {
            value: '3 key decisions',
            label: 'Reading goal',
            hint: 'Who it fits, how to start, and how it compares.',
          },
          {
            value: 'Onboarding + comparison + prompts',
            label: 'Content structure',
            hint: 'Built to take you from reading into actual trial.',
          },
          {
            value: 'Research / reasoning / code',
            label: 'Most common fit',
            hint: 'These are the workflows where the difference is easiest to feel.',
          },
        ]}
        actions={[
          { href: getToolDetailHref(deepseekTool.id, deepseekTool.name), label: 'View DeepSeek detail', tone: 'primary' },
          { href: '/blog/chatgpt-china-alternatives', label: 'See alternative options', tone: 'secondary' },
        ]}
        aside={
          <div>
            <IllustrationFrame
              src={getEditorialIllustrationPath('deepseekGuide')}
              alt="Abstract reasoning workflow illustration for the DeepSeek guide"
              eyebrow="Visual brief"
              title="A reasoning-first workflow snapshot"
              description="This artwork gives the page a clearer visual anchor before the reader moves into onboarding, comparison, and prompt design."
              chips={['Reasoning', 'Prompt structure', 'Workflow fit']}
              priority
            />
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
                <p className="mt-1 text-xs leading-6 text-text-muted">A practical option for structured reasoning, research, and lower-friction experimentation.</p>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2 text-sm text-text-secondary">
              <Sparkles className="h-4 w-4 text-accent-yellow" />
              Quick takeaways
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
          {[`Updated ${publishDate}`, readTime, 'Best for reasoning-heavy workflows'].map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-black/10 px-3 py-1.5">
              {item}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading
          eyebrow="Who It Fits"
          title="If these are your needs, DeepSeek is worth testing early"
          description="Before you move work into the tool, start by checking whether your real workflows match its strengths."
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
            eyebrow="Getting Started"
            title="A practical first-run path"
            description="The biggest mistake is trying to test everything at once. Start with a stable repeatable task and let the tool prove itself there."
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
            eyebrow="Comparison"
            title="The difference from ChatGPT is not about who wins every benchmark"
            description="What matters more is which tasks feel smoother in your actual workflow and where each tool should sit in the stack."
          />

          <div className="mt-10 overflow-x-auto rounded-[30px] border border-white/10 bg-white/5">
            <table className="w-full min-w-[880px]">
              <thead>
                <tr className="border-b border-white/8 bg-black/10">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Lens</th>
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
            eyebrow="Strengths and Limits"
            title="What is worth keeping and what to watch closely"
            description="The point is not to list advantages only. It is to know exactly where the tool accelerates you and where it can create misreads."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <article className="rounded-[30px] border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-2 text-text-primary">
                <CheckCircle2 className="h-5 w-5 text-accent-cyan" />
                <h2 className="text-xl font-semibold">Reasons to keep it in the stack</h2>
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
                <h2 className="text-xl font-semibold">Limits to know in advance</h2>
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
            eyebrow="Prompt Playbook"
            title="Four prompt structures that usually make the output more stable"
            description="If you do not know how to start prompting, use one of these patterns instead of improvising from scratch."
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
            eyebrow="FAQ"
            title="The questions most people hit first"
            description="If you only have ten minutes for the first evaluation, these are the questions worth answering."
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
                Run one real task first, then decide how deep the dependency should go
              </div>
            </div>
            <h2 className="mt-6 text-3xl font-semibold text-text-primary">If you are ready to test, do not stop at the article</h2>
            <p className="mt-4 text-base leading-8 text-text-secondary">
              The best next move is to run one real task through DeepSeek, then compare it against the wider directory once you know what kind of help you want from the tool.
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
                View tool detail
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/blog/chatgpt-china-alternatives"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
              >
                Compare alternatives
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
