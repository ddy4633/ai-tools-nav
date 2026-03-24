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
import IllustrationFrame from '@/components/ui/IllustrationFrame';
import SectionHeading from '@/components/ui/SectionHeading';
import ToolLogo from '@/components/ui/ToolLogo';
import ToolPrimaryCta from '@/components/ui/ToolPrimaryCta';
import { getToolCardData, getToolDetailHref } from '@/lib/content/tool-directory';
import { getEditorialIllustrationPath } from '@/lib/illustrations';
import { buildSiteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'ChatGPT Alternatives for Local-Language Workflows in 2026',
  description:
    'Stop asking only whether ChatGPT is available. This guide explains which alternatives fit local-language work, coding, and long-document workflows best.',
  keywords: ['ChatGPT alternatives', 'local-language AI', 'DeepSeek', 'Qwen 2.5-Max', 'Kimi', 'AI comparison'],
  alternates: {
    canonical: buildSiteUrl('/blog/chatgpt-china-alternatives'),
  },
  openGraph: {
    title: 'ChatGPT Alternatives for Local-Language Workflows in 2026',
    description: 'Choose the tool that fits your workflow instead of looking for a generic one-to-one replacement.',
    url: buildSiteUrl('/blog/chatgpt-china-alternatives'),
    type: 'article',
    publishedTime: '2026-03-12',
  },
};

const publishDate = '2026-03-12';
const readTime = '11 min read';

const quickDecisions = [
  {
    title: 'You want a strong local-language default',
    description: 'Start with DeepSeek if your first priority is a practical reasoning tool for local-language workflows.',
  },
  {
    title: 'You want a balance of code and enterprise-style work',
    description: 'Qwen 2.5-Max is often a stronger fit for technical, documentation-heavy, and operational use cases.',
  },
  {
    title: 'You need help with long documents',
    description: 'Kimi k1.5 behaves more like a document digestion assistant for long-context reading and synthesis.',
  },
];

const whyItMatters = [
  {
    title: 'Availability is not the only question',
    icon: Globe,
    description: 'What changes daily productivity is not just access. It is whether the tool slips naturally into your existing workflow.',
  },
  {
    title: 'Language fit matters more than people admit',
    icon: MessageCircle,
    description: 'Meeting notes, content outlines, document Q&A, and local-language output quality directly affect long-term retention.',
  },
  {
    title: 'Trust comes from operational control',
    icon: Shield,
    description: 'Teams often care more about stability, integration, and manageable risk than about one flashy benchmark moment.',
  },
];

const alternatives = [
  {
    id: 'deepseek',
    name: 'DeepSeek',
    company: 'DeepSeek',
    standout: 'A strong first station for local-language reasoning and lower-cost experimentation',
    description: 'A practical option for teams that want a capable local-language default for Q&A, reasoning, and code explanation.',
    pros: ['Comfortable for local-language tasks', 'Easy to build habits with', 'Reasoning and code help feel practical'],
    cons: ['Not the strongest option for every creative task', 'The surrounding ecosystem is lighter than top international platforms'],
    bestFor: 'Reasoning-heavy questions, code explanation, practical experimentation, and operational writing',
  },
  {
    id: 'qwen25max',
    name: 'Qwen 2.5-Max',
    company: 'Qwen',
    standout: 'A stronger option for code, documents, and more enterprise-like workflows',
    description: 'A better fit when you need a model that can support technical tasks, documents, and more system-oriented work.',
    pros: ['Balanced code and language capability', 'Works well in documentation-heavy settings', 'Feels closer to an enterprise base layer'],
    cons: ['Harder for casual users to evaluate quickly', 'Not always the first choice for expressive creative work'],
    bestFor: 'Coding help, business documents, analysis, and more structured operational workflows',
  },
  {
    id: 'kimi-k15',
    name: 'Kimi k1.5',
    company: 'Kimi',
    standout: 'A very practical option for long documents and material-heavy work',
    description: 'When the job is reading large reports, combining multiple sources, and generating summaries, Kimi behaves more like a productivity assistant than a generic chat tool.',
    pros: ['Very good for long material review', 'Low-friction interface', 'Strong time savings on synthesis'],
    cons: ['Not always the best choice for code-heavy workflows', 'Often strongest as a specialist rather than a universal tool'],
    bestFor: 'Report reading, research summarization, long-context Q&A, and material synthesis',
  },
].map((tool) => ({
  ...tool,
  ...getToolCardData(tool),
}));

const useCases = [
  {
    title: 'Local-language Q&A and early drafting',
    icon: MessageCircle,
    recommendation: 'Start with DeepSeek',
    description: 'It is a good way to reduce blank-page time and reach a practical first version quickly.',
  },
  {
    title: 'Coding and business documentation',
    icon: Code2,
    recommendation: 'Look at Qwen 2.5-Max first',
    description: 'If your work sits between technical explanation and documentation, Qwen is often the better fit.',
  },
  {
    title: 'Long documents and research review',
    icon: FileText,
    recommendation: 'Start with Kimi k1.5',
    description: 'It is especially useful when you need to digest reports, transcripts, or large bodies of material.',
  },
  {
    title: 'Search-driven work',
    icon: Search,
    recommendation: 'Choose based on workflow, not model branding',
    description: 'If your work depends heavily on live web context, evaluate the whole workflow rather than swapping models in isolation.',
  },
];

const comparisonRows = [
  {
    need: 'I want a practical local-language default',
    pick: 'DeepSeek',
    why: 'It is easier to adopt quickly and often fits common local-language workflows well from the start.',
  },
  {
    need: 'I want coding help plus document-heavy work',
    pick: 'Qwen 2.5-Max',
    why: 'It is more balanced across technical and operational tasks and feels less like a single-purpose chat tool.',
  },
  {
    need: 'I need to process large documents',
    pick: 'Kimi k1.5',
    why: 'Long-context reading and synthesis are where it tends to create the most obvious productivity gain.',
  },
  {
    need: 'I still want the broadest ecosystem',
    pick: 'Keep ChatGPT as part of the stack',
    why: 'The smartest move is often to let alternatives own specific workflows while ChatGPT remains a secondary generalist tool.',
  },
];

export default function ChatGPTAlternativesPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <PageHero
        eyebrow="Alternatives Feature"
        title="ChatGPT alternatives"
        highlight="Choose the workflow owner, not a mythical one-to-one replacement."
        description="This page does not dump a list of tools that happen to exist. It answers a more useful question: what kind of work are you trying to do, and which alternative should own that part of the workflow first?"
        metrics={[
          {
            value: `${alternatives.length} priority picks`,
            label: 'Focused shortlist',
            hint: 'The goal is not coverage. The goal is solving the most common decision cases first.',
          },
          {
            value: 'Language / Code / Long context',
            label: 'Decision lenses',
            hint: 'These matter more than brand recognition alone.',
          },
          {
            value: 'Comparison + scenarios + next steps',
            label: 'Page structure',
            hint: 'Built to move you from judgment into trials quickly.',
          },
        ]}
        actions={[
          { href: '/tools?category=chatbot', label: 'Open the chat tools directory', tone: 'secondary' },
          { href: '/tools', label: 'Continue filtering in the directory', tone: 'primary' },
        ]}
        aside={
          <div>
            <IllustrationFrame
              src={getEditorialIllustrationPath('chatgptAlternatives')}
              alt="Abstract comparison workflow illustration for ChatGPT alternatives"
              eyebrow="Visual brief"
              title="Compare the workflow owners first"
              description="Instead of stacking brand names, this image anchors the page around language fit, code fit, and long-context handling."
              chips={['Language fit', 'Code fit', 'Long context']}
              priority
            >
              <div className="grid grid-cols-3 gap-2">
                {alternatives.slice(0, 3).map((tool) => (
                  <div key={tool.id} className="rounded-[20px] border border-white/10 bg-white/5 p-3 text-center">
                    <ToolLogo
                      name={tool.name}
                      icon={tool.icon}
                      size={28}
                      wrapperClassName="mx-auto h-10 w-10 rounded-2xl border border-white/10 bg-black/15"
                      imageClassName="h-7 w-7"
                      textClassName="text-sm text-text-primary"
                    />
                    <p className="mt-2 text-xs text-text-secondary">{tool.name}</p>
                  </div>
                ))}
              </div>
            </IllustrationFrame>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
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
          {[`Updated ${publishDate}`, readTime, 'Built for local-language workflow selection'].map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-black/10 px-3 py-1.5">
              {item}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading
          eyebrow="Decision Premise"
          title="Why this page does not stop at basic availability"
          description="Real replacement value does not come from swapping names. It comes from choosing a tool that better fits the workflows your team actually runs."
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
            eyebrow="Priority Picks"
            title="Alternatives worth trialing first"
            description="Starting from a few representative workflows is a much better path than installing five or six tools at once and hoping one sticks."
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
                    <Star className="h-4 w-4 fill-accent-yellow text-accent-yellow" />
                    Worth a first trial
                  </div>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className="rounded-[22px] border border-white/8 bg-black/10 p-4">
                    <div className="flex items-center gap-2 text-sm text-text-primary">
                      <CheckCircle2 className="h-4 w-4 text-accent-cyan" />
                      Where it fits well
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
                      Limits to know first
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                      {tool.cons.map((item) => (
                        <li key={item}>- {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5 rounded-[22px] border border-white/8 bg-black/10 p-4 text-sm leading-7 text-text-secondary">
                  <strong className="text-text-primary">Best for: </strong>
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
                    View detail
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
            eyebrow="Use Cases"
            title="Do not pick the strongest brand. Pick the smoothest fit."
            description="If you know the work you do most often, this section will help you eliminate the wrong option faster than any general ranking."
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
            eyebrow="Replacement Logic"
            title="When to replace, and when to run tools side by side"
            description="The more realistic strategy is often not full replacement. It is letting different tools own different parts of the workflow."
          />

          <div className="mt-10 overflow-x-auto rounded-[30px] border border-white/10 bg-white/5">
            <table className="w-full min-w-[840px]">
              <thead>
                <tr className="border-b border-white/8 bg-black/10">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Need</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Start with</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Why</th>
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
            <h2 className="text-3xl font-semibold text-text-primary">The next move is not more bookmarking. It is one real task.</h2>
            <p className="mt-4 text-base leading-8 text-text-secondary">
              Once you know whether your work is more language-heavy, code-heavy, or document-heavy, start with the tool that owns that lane best and widen the search later.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/tools?category=chatbot"
                className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
              >
                Open chat tools
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/blog/deepseek-guide"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
              >
                Read the DeepSeek guide
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
              >
                Return to editorials
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
