import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BarChart3, Layers3, Sparkles, Target, TrendingUp } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import ToolLogo from '@/components/ui/ToolLogo';
import ToolPrimaryCta from '@/components/ui/ToolPrimaryCta';
import { getToolCardData, getToolDetailHref } from '@/lib/content/tool-directory';
import { buildSiteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: '10 AI Tools Worth Watching in 2026',
  description:
    'From frontier chat models and AI coding to video generation and agent products, this page highlights the 10 AI tools most worth paying attention to in 2026.',
  keywords: ['AI tools 2026', 'AI tool ranking', 'AI trends', 'Manus', 'Grok 3', 'Kling AI', 'Windsurf'],
  alternates: {
    canonical: buildSiteUrl('/blog/top-ai-tools-2026'),
  },
  openGraph: {
    title: '10 AI Tools Worth Watching in 2026',
    description: 'Not a generic listicle, but a decision-focused guide to the AI tools shaping 2026.',
    url: buildSiteUrl('/blog/top-ai-tools-2026'),
    type: 'article',
    publishedTime: '2026-03-03',
  },
};

const publishDate = '2026-03-03';
const readTime = '12 min read';

const readingNotes = [
  {
    title: 'Choose a core stack first',
    description: 'This ranking is meant to help you pick the first tools worth going deep on, not build an endless bookmark list.',
  },
  {
    title: 'Read the shifts, not just the names',
    description: 'The real value is not who is hot. It is which workflow is changing, and who will feel that change first.',
  },
  {
    title: 'A ranking should end in action',
    description: 'Every tool here should send you toward a detail page, product site, or sharper next decision instead of stopping at the article.',
  },
];

type BlogTool = {
  id: string;
  name: string;
  category: string;
  highlight: string;
  description: string;
  whyNow: string;
};

const toolSeed: BlogTool[] = [
  {
    id: 'grok3',
    name: 'Grok 3',
    category: 'Chat model',
    highlight: 'Real-time information enters the answer loop',
    description: 'Grok 3 matters because current events and live internet signals are becoming part of the answer experience, not just an add-on.',
    whyNow: 'Useful for news judgment, live trend tracking, and fast-moving discussions.',
  },
  {
    id: 'qwen25max',
    name: 'Qwen 2.5-Max',
    category: 'Chat model',
    highlight: 'A strong operator for serious language workflows',
    description: 'It behaves more like an enterprise-ready foundation model for code, documentation, analysis, and operational tasks.',
    whyNow: 'A strong fit for teams integrating AI deeper into daily execution.',
  },
  {
    id: 'kimi-k15',
    name: 'Kimi k1.5',
    category: 'Chat model',
    highlight: 'Long-context work becomes a real workflow advantage',
    description: 'Kimi signals that long-context capability is starting to change real work instead of staying a benchmark headline.',
    whyNow: 'Useful for research, document digestion, and long-form synthesis.',
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    category: 'AI coding',
    highlight: 'Coding moves from completion toward execution',
    description: 'The important shift is not just code generation. It is the ability to understand a project and execute multi-step developer tasks.',
    whyNow: 'A strong pick for teams chasing an agentic development experience.',
  },
  {
    id: 'bolt-new',
    name: 'Bolt.new',
    category: 'AI coding',
    highlight: 'Prototype and full-stack generation move into the browser',
    description: 'Bolt.new makes “describe what you want and generate the app” feel immediate enough for startup validation and rapid iteration.',
    whyNow: 'Useful for MVP testing, founder speed, and fast product experiments.',
  },
  {
    id: 'v0-dev',
    name: 'v0.dev',
    category: 'AI coding',
    highlight: 'Frontend generation is getting close to production',
    description: 'v0.dev represents a change in frontend workflows: from inspirational mockups to code that is increasingly close to being shipped.',
    whyNow: 'A strong fit for frontend teams, designers, and product prototyping.',
  },
  {
    id: 'recraft-v3',
    name: 'Recraft V3',
    category: 'Design',
    highlight: 'Design generation moves from pretty images toward brand systems',
    description: 'The tool matters because it supports style control, vector output, and brand expression rather than one-off image generation alone.',
    whyNow: 'Useful for brand design teams and design-heavy visual workflows.',
  },
  {
    id: 'kling-ai',
    name: 'Kling AI',
    category: 'Video generation',
    highlight: 'Generated video starts to feel distribution-ready',
    description: 'Kling AI shows the shift from stunning demos to clips that can actually be turned into campaign assets and content distribution.',
    whyNow: 'Useful for content teams, creative marketers, and short-form video experiments.',
  },
  {
    id: 'udio',
    name: 'Udio',
    category: 'Audio generation',
    highlight: 'Music generation is developing real aesthetic consistency',
    description: 'Tools like Udio matter because more teams are now folding sound and music into the same AI content chain as visuals and text.',
    whyNow: 'Useful for podcasts, video soundtracks, and creator experiments.',
  },
  {
    id: 'manus',
    name: 'Manus',
    category: 'AI agent',
    highlight: 'Agents move from concept to product feeling',
    description: 'Manus matters because it gives more people the first real product sensation of handing an outcome to AI instead of just asking questions.',
    whyNow: 'Useful for anyone watching the move toward agentic workflows.',
  },
];

const tools = toolSeed.map((tool) => ({
  ...tool,
  ...getToolCardData(tool),
}));

const trendSignals = [
  {
    title: 'AI is moving from answers to execution',
    icon: TrendingUp,
    description: 'The biggest shift this year is not that models speak better. It is that more tools are starting to carry out work.',
  },
  {
    title: 'AI coding is upgrading into project collaboration',
    icon: Layers3,
    description: 'Windsurf, Bolt.new, and v0.dev represent different layers of AI participating inside software creation.',
  },
  {
    title: 'Generation is becoming repeatable production',
    icon: BarChart3,
    description: 'Image, video, and audio tools are increasingly being used inside real marketing and content workflows, not just novelty demos.',
  },
  {
    title: 'The value of rankings is shifting toward decision support',
    icon: Target,
    description: 'A useful ranking in 2026 is not just “what exists.” It is “who should care and why now.”',
  },
];

const roleRoutes = [
  {
    title: 'If you are a developer',
    description: 'Start with Windsurf, Bolt.new, and v0.dev, then decide which one deserves a place in your core workflow.',
  },
  {
    title: 'If you work in content and distribution',
    description: 'Start with Kling AI and Udio, then pair them with a reliable language model for scripting and research.',
  },
  {
    title: 'If you are product or design-led',
    description: 'v0.dev, Recraft V3, and Kling AI are strong for getting from idea to presentable output quickly.',
  },
  {
    title: 'If you care about the next shape of AI',
    description: 'Start with Manus, then look back at the rest of the list through the lens of agentic behavior.',
  },
];

export default function TopAiTools2026Page() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <PageHero
        eyebrow="Annual Ranking"
        title="10 AI tools worth"
        highlight="watching in 2026"
        description="This is not a hype-driven list. It is a decision ranking built around which tools are actually reshaping workflows and which audiences are likely to feel those shifts first."
        metrics={[
          {
            value: `${tools.length}`,
            label: 'Priority tools',
            hint: 'Covers chat models, AI coding, design, video, audio, and agent products.',
          },
          {
            value: `${trendSignals.length} shifts`,
            label: 'Signals behind the list',
            hint: 'The list matters less than the pattern it reveals.',
          },
          {
            value: 'Detail pages + product sites',
            label: 'Next action',
            hint: 'Every pick should route you toward a more concrete trial and a sharper decision.',
          },
        ]}
        actions={[
          { href: '/trending', label: 'See the trending board', tone: 'secondary' },
          { href: '/tools', label: 'Return to the directory', tone: 'primary' },
        ]}
        aside={
          <div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Sparkles className="h-4 w-4 text-accent-yellow" />
              Before you read
            </div>
            <div className="mt-5 space-y-3">
              {readingNotes.map((item) => (
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
          {[`Updated ${publishDate}`, readTime, 'Built as an annual discovery gateway'].map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-black/10 px-3 py-1.5">
              {item}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading
          eyebrow="Annual List"
          title="What each of these 10 tools actually represents"
          description="Do not stop at the ranking. Every card should answer a more useful question: why this tool deserves attention right now."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {tools.map((tool, index) => (
            <article key={tool.id} className="rounded-[30px] border border-white/10 bg-white/5 p-6 transition hover:border-white/16">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/10 text-sm font-semibold text-text-primary">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <ToolLogo
                      name={tool.name}
                      icon={tool.icon}
                      size={56}
                      wrapperClassName="h-14 w-14 rounded-[18px] border border-white/10 bg-black/20"
                      imageClassName="h-10 w-10"
                      textClassName="text-lg text-text-primary"
                    />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-2xl font-semibold text-text-primary">{tool.name}</h2>
                      <span className="rounded-full border border-white/10 bg-black/10 px-2.5 py-1 text-xs text-text-secondary">
                        {tool.category}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-accent-cyan">{tool.highlight}</p>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-text-secondary">{tool.description}</p>
              <div className="mt-5 rounded-[22px] border border-white/8 bg-black/10 p-4 text-sm leading-7 text-text-secondary">
                <strong className="text-text-primary">Why this matters now: </strong>
                {tool.whyNow}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <ToolPrimaryCta
                  tool={tool}
                  placement="blog_top_2026_primary_cta"
                  affiliateLabel="Open partner link"
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
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeading
            eyebrow="Trend Breakdown"
            title="The four signals underneath this ranking"
            description="If you only remember product names, the list will age fast. If you remember these signals, you will know what to watch next."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {trendSignals.map((signal) => (
              <article key={signal.title} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/10">
                  <signal.icon className="h-5 w-5 text-accent-yellow" />
                </div>
                <h2 className="mt-5 text-lg font-semibold text-text-primary">{signal.title}</h2>
                <p className="mt-3 text-sm leading-7 text-text-secondary">{signal.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeading
            eyebrow="Trial Order"
            title="Start from the lens that matches your role"
            description="A good ranking does not ask everyone to adopt the same stack. It helps each role find the first tools worth trialing."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {roleRoutes.map((route) => (
              <article key={route.title} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <h2 className="text-lg font-semibold text-text-primary">{route.title}</h2>
                <p className="mt-3 text-sm leading-7 text-text-secondary">{route.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] p-8 text-center shadow-[0_28px_70px_rgba(0,0,0,0.25)]">
            <h2 className="text-3xl font-semibold text-text-primary">A ranking is only useful if it leads to real trials</h2>
            <p className="mt-4 text-base leading-8 text-text-secondary">
              Go deeper through the detail pages or return to the directory and filter by workflow, category, and price.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
              >
                Browse all tools
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/trending"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
              >
                See the trend board
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/submit"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
              >
                Submit or partner
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
