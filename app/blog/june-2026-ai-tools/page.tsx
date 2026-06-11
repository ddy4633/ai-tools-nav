import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  BriefcaseBusiness,
  Film,
  Mic2,
  Search,
  Sparkles,
  Target,
  Workflow,
} from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import ToolLogo from '@/components/ui/ToolLogo';
import ToolPrimaryCta from '@/components/ui/ToolPrimaryCta';
import { getToolCardData, getToolDetailHref } from '@/lib/content/tool-directory';
import { buildSiteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: '8 New AI Tools Worth Tracking in June 2026',
  description:
    'A fresh June 2026 roundup covering Claude 4, Google Flow, Stitch, Wispr Flow, Granola, Vapi, Browser Use, and Browse.sh.',
  keywords: ['June 2026 AI tools', 'Claude 4', 'Google Flow', 'Stitch', 'Wispr Flow', 'Granola', 'Vapi', 'Browser Use', 'Browse.sh'],
  alternates: {
    canonical: buildSiteUrl('/blog/june-2026-ai-tools'),
  },
  openGraph: {
    title: '8 New AI Tools Worth Tracking in June 2026',
    description: 'A practical June 2026 watchlist built around buyer intent, workflow change, and commercial value.',
    url: buildSiteUrl('/blog/june-2026-ai-tools'),
    type: 'article',
    publishedTime: '2026-06-11',
  },
};

const publishDate = '2026-06-11';
const readTime = '10 min read';

const readingNotes = [
  {
    title: 'Commercial intent beats novelty',
    description: 'This list biases toward products that plug into budgets, daily work, or repeat software spend, not one-off demos.',
  },
  {
    title: 'Workflow change matters more than launch noise',
    description: 'The strongest picks are changing how people code, capture meetings, create media, or automate the web.',
  },
  {
    title: 'A good roundup should route to action',
    description: 'Every pick here should push readers toward a trial, a comparison, or a detail page instead of ending at awareness.',
  },
];

type BlogTool = {
  id: string;
  name: string;
  category: string;
  highlight: string;
  description: string;
  whyNow: string;
  buyerFit: string;
};

const toolSeed: BlogTool[] = [
  {
    id: 'claude-4',
    name: 'Claude 4',
    category: 'Model + coding stack',
    highlight: 'Long, agentic coding work keeps moving into paid production workflows',
    description: 'Claude 4 matters because it pushes coding, reasoning, and tool-using AI further into work that teams already budget for.',
    whyNow: 'It is one of the clearest “AI as execution layer” signals on the market.',
    buyerFit: 'Developers, research-heavy teams, and knowledge workers with dense task stacks.',
  },
  {
    id: 'google-flow',
    name: 'Google Flow',
    category: 'AI video',
    highlight: 'Video generation is becoming a creator workbench, not just a prompt toy',
    description: 'Flow moves the conversation from “can AI make a clip?” toward “can AI help create, extend, and manage a video workflow?”',
    whyNow: 'That makes it more relevant to marketers, creators, and media teams with real output goals.',
    buyerFit: 'Creative teams, short-form marketers, and AI video comparers.',
  },
  {
    id: 'stitch',
    name: 'Stitch',
    category: 'AI UI design',
    highlight: 'Idea-to-interface is becoming a major search and product surface',
    description: 'Stitch sits in the sweet spot between prompt-based prototyping, design exploration, and code-adjacent UI generation.',
    whyNow: 'It attracts product, design, and founder traffic at the same time.',
    buyerFit: 'Product teams, indie builders, designers, and founders validating app ideas.',
  },
  {
    id: 'wispr-flow',
    name: 'Wispr Flow',
    category: 'Voice productivity',
    highlight: 'Voice input is turning into recurring productivity software',
    description: 'Wispr Flow is less about AI chat and more about changing the default input method for writing, messaging, and coding.',
    whyNow: 'That makes it sticky, daily, and commercially stronger than many novelty tools.',
    buyerFit: 'Operators, founders, writers, and people who live in text all day.',
  },
  {
    id: 'granola',
    name: 'Granola',
    category: 'Meeting intelligence',
    highlight: 'Meeting context is turning into reusable company memory',
    description: 'Granola stands out because it frames itself as a quiet AI notepad instead of another loud meeting bot.',
    whyNow: 'That positioning is highly clickable and easier to convert than generic transcription talk.',
    buyerFit: 'Sales, product, recruiting, founders, and heavy-meeting teams.',
  },
  {
    id: 'vapi',
    name: 'Vapi',
    category: 'Voice agents',
    highlight: 'Voice AI is moving closer to line-item budgets and ROI conversations',
    description: 'Vapi is not just voice generation. It is voice agent infrastructure tied to customer support, scheduling, and business outcomes.',
    whyNow: 'That makes it especially valuable for B2B discovery and enterprise-intent traffic.',
    buyerFit: 'Support teams, voice startups, AI agencies, and enterprise builders.',
  },
  {
    id: 'browser-use',
    name: 'Browser Use',
    category: 'Browser agents',
    highlight: 'Browser automation is becoming agent infrastructure',
    description: 'Browser Use is one of the names developers now check when they want AI to operate on real websites, not just answer questions.',
    whyNow: 'It supports deep comparison content, tutorials, and technical commercial traffic.',
    buyerFit: 'Developers, automation teams, and teams building AI operators.',
  },
  {
    id: 'browse-sh',
    name: 'Browse.sh',
    category: 'Skills infrastructure',
    highlight: 'Reusable browser skills are becoming a serious product layer',
    description: 'Browse.sh matters because it turns repeated browser workflows into installable skills instead of fresh exploration on every run.',
    whyNow: 'That is a strong angle for cost, memory, and agent reliability conversations.',
    buyerFit: 'Codex users, automation teams, browser-agent builders, and infra buyers.',
  },
];

const tools = toolSeed.map((tool) => ({
  ...tool,
  ...getToolCardData(tool),
}));

const marketShifts = [
  {
    title: 'Execution > chat',
    icon: Workflow,
    description: 'Claude 4, Vapi, and Browser Use all point to AI doing more work, not just giving cleaner answers.',
  },
  {
    title: 'Media tools are becoming workbenches',
    icon: Film,
    description: 'Flow is a good example of AI video moving toward a production surface instead of a one-prompt novelty.',
  },
  {
    title: 'Voice is becoming software, not a feature',
    icon: Mic2,
    description: 'Wispr Flow and Vapi sit on opposite ends of the same shift: input and customer interaction both moving through voice.',
  },
  {
    title: 'High-intent traffic is getting more technical',
    icon: BriefcaseBusiness,
    description: 'Browser Use and Browse.sh pull in buyers who care about automation, cost, and workflow durability, not just trend-chasing.',
  },
];

const nextMoves = [
  {
    title: 'If your site wants commercial traffic first',
    description: 'Start with Granola, Vapi, Wispr Flow, and Browser Use. These products are closest to budgeted software categories.',
  },
  {
    title: 'If your audience skews creator or design-led',
    description: 'Lead with Google Flow and Stitch, then route readers into comparisons with existing video and prototyping tools.',
  },
  {
    title: 'If your audience is developer-heavy',
    description: 'Claude 4, Browser Use, and Browse.sh are the strongest anchors for deeper technical editorial programs.',
  },
];

export default function June2026AiToolsPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <PageHero
        eyebrow="June 2026 roundup"
        title="8 new AI tools"
        highlight="worth tracking right now"
        description="This is not a generic launch pile. It is a June filter built around software people may actually keep paying for: code, voice, meetings, browser automation, video creation, and interface generation."
        metrics={[
          {
            value: `${tools.length}`,
            label: 'Fresh picks',
            hint: 'Chosen for workflow change, buyer intent, and content leverage.',
          },
          {
            value: 'Voice / Browser / Media / UI',
            label: 'Core shift clusters',
            hint: 'These are the categories gaining the most commercial depth right now.',
          },
          {
            value: `${publishDate}`,
            label: 'Current update',
            hint: `Published ${publishDate} · ${readTime}`,
          },
        ]}
        actions={[
          { href: '/blog', label: 'Back to editorials', tone: 'secondary' },
          { href: '/trending', label: 'See the trending board', tone: 'primary' },
        ]}
        aside={
          <div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Search className="h-4 w-4 text-accent-cyan" />
              Why this roundup exists
            </div>
            <div className="mt-5 space-y-3">
              {readingNotes.map((note) => (
                <div key={note.title} className="rounded-[22px] border border-white/8 bg-black/10 p-4">
                  <p className="text-sm font-medium text-text-primary">{note.title}</p>
                  <p className="mt-3 text-sm leading-7 text-text-secondary">{note.description}</p>
                </div>
              ))}
            </div>
          </div>
        }
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading
          eyebrow="Fresh list"
          title="The 8 products worth opening first"
          description="Each pick below is here because it changes a real workflow and creates strong follow-on content opportunities: comparisons, alternatives, setup guides, and buyer education."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {tools.map((tool, index) => {
            const detailHref = getToolDetailHref(tool.id, tool.name);

            return (
              <article
                key={tool.id}
                className="rounded-[32px] border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.035))] p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-start gap-4">
                    <ToolLogo
                      name={tool.name}
                      icon={tool.icon}
                      size={34}
                      wrapperClassName="h-14 w-14 shrink-0 rounded-[20px] border border-white/10 bg-black/15"
                      imageClassName="h-9 w-9"
                      textClassName="text-xl text-text-primary"
                    />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted">
                        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">#{index + 1}</span>
                        <span>{tool.category}</span>
                      </div>
                      <h2 className="mt-3 text-2xl font-semibold text-text-primary">{tool.name}</h2>
                      <p className="mt-2 text-sm leading-7 text-text-secondary">{tool.highlight}</p>
                    </div>
                  </div>
                  <span className="rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-3 py-1 text-xs text-accent-cyan">
                    Watch now
                  </span>
                </div>

                <p className="mt-5 text-sm leading-7 text-text-secondary">{tool.description}</p>

                <div className="mt-5 grid gap-3 rounded-[24px] border border-white/8 bg-black/10 p-4 text-sm text-text-secondary sm:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Why now</p>
                    <p className="mt-2 leading-7">{tool.whyNow}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Best-fit buyers</p>
                    <p className="mt-2 leading-7">{tool.buyerFit}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    href={detailHref}
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm text-text-primary transition hover:border-white/18 hover:bg-white/10"
                  >
                    Read tool detail
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <ToolPrimaryCta
                    tool={tool}
                    placement="blog-june-2026-card"
                    className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
                    websiteLabel="Visit product"
                  />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeading
            eyebrow="What the list reveals"
            title="The bigger shifts underneath the names"
            description="The names matter less than the workflow direction they reveal. That is where stronger editorial strategy and monetization usually come from."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {marketShifts.map((shift) => (
              <div key={shift.title} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <shift.icon className="h-5 w-5 text-accent-cyan" />
                <h3 className="mt-4 text-lg font-semibold text-text-primary">{shift.title}</h3>
                <p className="mt-3 text-sm leading-7 text-text-secondary">{shift.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeading
            eyebrow="Routing"
            title="If you only build three follow-up pages next"
            description="The strongest next move is not more listicles. It is sharper pages that match buyer intent and route into detail pages, sponsorship, and partner clicks."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {nextMoves.map((move) => (
              <div key={move.title} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/10 px-3 py-1.5 text-xs text-text-muted">
                  <Target className="h-3.5 w-3.5 text-accent-yellow" />
                  Next editorial route
                </div>
                <h3 className="mt-4 text-lg font-semibold text-text-primary">{move.title}</h3>
                <p className="mt-3 text-sm leading-7 text-text-secondary">{move.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm text-text-primary transition hover:border-white/18 hover:bg-white/10"
            >
              Open the full directory
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
            >
              Explore more editorials
              <Sparkles className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
