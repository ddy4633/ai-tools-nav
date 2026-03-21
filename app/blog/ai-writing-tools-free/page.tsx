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
  title: 'Free AI Writing Tools Worth Trying in 2026',
  description:
    'From ChatGPT and Claude to Notion AI, this page breaks down the writing tools worth trying in 2026 by budget, depth, and team use case.',
  keywords: ['free AI writing tools', 'AI writing software', 'AI copywriting', 'ChatGPT writing', 'Claude writing', 'content tools'],
  alternates: {
    canonical: buildSiteUrl('/blog/ai-writing-tools-free'),
  },
  openGraph: {
    title: 'Free AI Writing Tools Worth Trying in 2026',
    description: 'A practical guide to AI writing tools by budget, writing depth, and workflow fit.',
    url: buildSiteUrl('/blog/ai-writing-tools-free'),
    type: 'article',
  },
};

const pricingStyles: Record<string, string> = {
  Free: 'border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan',
  'Free trial': 'border-accent-yellow/30 bg-accent-yellow/10 text-accent-yellow',
  Paid: 'border-accent-pink/30 bg-accent-pink/10 text-accent-pink',
};

const aiWritingTools = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'The most reliable general writing entry point, from outlines and first drafts to rewrites and polish.',
    pricing: 'Free trial',
    priceDetail: 'A free starting point with clear upgrade headroom in Plus',
    rating: 4.8,
    features: ['Multilingual writing', 'Draft continuation', 'Copy improvement', 'Translation and polish'],
    pros: ['Strong general-purpose output', 'Easy to use across many workflows', 'Excellent for turning a blank page into a first structure'],
    cons: ['Quality can vary during peak periods', 'Sometimes produces polished but low-substance text'],
    bestFor: 'General writing, freelancers, and teams that need fast draft generation',
    website: 'https://chat.openai.com',
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'A stronger fit for long-form, deep writing, research-heavy content, and structured editorial work.',
    pricing: 'Free trial',
    priceDetail: 'Free access is enough to evaluate, but heavy use usually needs an upgrade',
    rating: 4.9,
    features: ['Long-context writing', 'Deep analysis', 'Research writing', 'Document synthesis'],
    pros: ['Excellent long-context handling', 'More rigorous structure', 'Long-form work tends to drift less'],
    cons: ['Free access is more limited', 'Not the strongest option for real-time web-heavy tasks'],
    bestFor: 'Reports, whitepapers, research writing, and long-form editorial work',
    website: 'https://claude.ai',
  },
  {
    id: 'notion-ai',
    name: 'Notion AI',
    description: 'A natural fit for teams already working in Notion, where writing and knowledge management live in one workflow.',
    pricing: 'Free trial',
    priceDetail: 'More compelling once the team already collaborates in Notion',
    rating: 4.5,
    features: ['AI inside notes', 'Content continuation', 'Brainstorming', 'Translation'],
    pros: ['Excellent workflow integration', 'Natural for team collaboration', 'Great for meetings and knowledge docs'],
    cons: ['Value drops outside the Notion environment', 'Individual point solutions are not always best-in-class'],
    bestFor: 'Teams managing projects, documents, and internal knowledge bases',
    website: 'https://www.notion.so/product/ai',
  },
  {
    id: 'jasper',
    name: 'Jasper',
    description: 'A marketing-first tool built for brand voice consistency, repeatable content templates, and campaign copy.',
    pricing: 'Paid',
    priceDetail: 'Better suited to commercial teams than solo low-budget users',
    rating: 4.4,
    features: ['Marketing templates', 'SEO support', 'Brand voice', 'Team workflows'],
    pros: ['Strong marketing templates', 'Better brand consistency', 'Good for repeatable production'],
    cons: ['More expensive', 'Not ideal as a zero-budget starting point'],
    bestFor: 'Marketing teams, ecommerce, campaign copy, and brand content operations',
    website: 'https://www.jasper.ai',
  },
  {
    id: 'copy-ai',
    name: 'Copy.ai',
    description: 'Fast, template-heavy, and useful for teams generating short-form marketing or sales material quickly.',
    pricing: 'Free trial',
    priceDetail: 'A low-friction way to test fit before paying',
    rating: 4.3,
    features: ['Content templates', 'Blog writing', 'Social copy', 'Product descriptions'],
    pros: ['Large template library', 'Good for shorter output', 'Low experimentation cost'],
    cons: ['Not as strong for deep writing', 'Quality varies more outside core marketing use cases'],
    bestFor: 'Short-form marketing, social media, and lightweight commercial copy',
    website: 'https://www.copy.ai',
  },
  {
    id: 'quillbot',
    name: 'QuillBot',
    description: 'More useful for rewriting than first-pass creation, especially for polishing, paraphrasing, and academic cleanup.',
    pricing: 'Free trial',
    priceDetail: 'The basic rewrite features are enough for common use cases',
    rating: 4.2,
    features: ['Paraphrasing', 'Grammar checks', 'Summaries', 'Citation help'],
    pros: ['Excellent rewriting support', 'Strong for English and academic work', 'Browser tooling is handy'],
    cons: ['Not a primary drafting tool', 'Less compelling if you need idea generation'],
    bestFor: 'Paraphrasing, editing, English polishing, and academic cleanup',
    website: 'https://quillbot.com',
  },
  {
    id: 'writesonic',
    name: 'Writesonic',
    description: 'A more all-in-one growth platform for teams doing blog SEO, ecommerce pages, and traffic-oriented content work.',
    pricing: 'Free trial',
    priceDetail: 'The trial is useful for testing workflow fit before committing',
    rating: 4.1,
    features: ['Blog writing', 'SEO support', 'Ecommerce copy', 'Chat assistant'],
    pros: ['Good for SEO workflows', 'Wide feature set', 'Useful for growth teams'],
    cons: ['Busier interface', 'Not the most stable for premium editorial quality'],
    bestFor: 'SEO blogs, ecommerce teams, and traffic-focused content ops',
    website: 'https://writesonic.com',
  },
  {
    id: 'rytr',
    name: 'Rytr',
    description: 'Cheap, simple, and friendly for light users trying to build an AI writing habit without much friction.',
    pricing: 'Free trial',
    priceDetail: 'Feels more like a low-cost starting tool than a heavyweight platform',
    rating: 4.0,
    features: ['Use-case templates', 'Tone adjustment', 'Rewrite tools', 'Multilingual support'],
    pros: ['Low barrier to entry', 'Budget-friendly', 'Fine for light writing tasks'],
    cons: ['Weak for deep content', 'Not ideal for high-standard brand output'],
    bestFor: 'Light writing, email, social posts, and personal experimentation',
    website: 'https://rytr.me',
  },
];

const quickDecisions = [
  {
    title: 'Starting with no budget',
    description: 'Begin with ChatGPT or Claude and focus on building a repeatable prompting and editing habit.',
  },
  {
    title: 'Long-form and deep editorial work',
    description: 'Claude is usually a stronger fit for reports, research-heavy writing, and long-structure refinement.',
  },
  {
    title: 'Marketing teams',
    description: 'Jasper and Copy.ai are better built for repeatable templates, brand voice, and campaign copy.',
  },
];

const scenarioSuggestions = [
  {
    title: 'Academic writing',
    icon: GraduationCap,
    description: 'Claude paired with QuillBot works well for long-context comprehension, rewriting, and cleanup.',
  },
  {
    title: 'Content teams',
    icon: FileText,
    description: 'ChatGPT for drafting plus Notion AI for collaboration is a dependable combination.',
  },
  {
    title: 'Marketing output',
    icon: PenTool,
    description: 'Jasper and Copy.ai are stronger for campaigns, landing page copy, and scalable short-form assets.',
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
        eyebrow="AI Writing Feature"
        title="Free AI writing tools"
        highlight="that are actually worth testing"
        description="Writing efficiency is not about how many tools you install. It is about quickly finding the category that matches your workflow. This page splits the field by budget, writing depth, and team context instead of throwing brand names at you."
        metrics={[
          { value: `${aiWritingTools.length}`, label: 'Priority tools', hint: 'Covers general writing, deep writing, and marketing-oriented workflows.' },
          { value: 'Budget / Depth / Team fit', label: 'Decision lenses', hint: 'Use case first, pricing second.' },
          { value: 'Cards + comparison + scenarios', label: 'Page structure', hint: 'Built to help you finish the first round of filtering fast.' },
        ]}
        actions={[
          { href: '/tools?category=writing', label: 'Open the writing directory', tone: 'secondary' },
          { href: '/advertise', label: 'Explore editorial sponsorship', tone: 'primary' },
        ]}
        aside={
          <div>
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
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading
          eyebrow="Tool List"
          title="AI writing tools worth trying first"
          description="Every card answers the same practical question: who is it for, what is it good at, and where will it slow you down?"
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
                      <span className={`rounded-full border px-2.5 py-1 text-xs ${pricingStyles[tool.pricing] ?? pricingStyles['Free trial']}`}>
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
                    Strengths
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
                    Limits
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                    {tool.cons.map((con) => (
                      <li key={con}>- {con}</li>
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
                  placement="blog_writing_primary_cta"
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
            eyebrow="Comparison"
            title="One table for the first pass"
            description="The point of this table is not to replace detail pages. It helps you remove obvious mismatches faster."
          />

          <div className="mt-10 overflow-x-auto rounded-[30px] border border-white/10 bg-white/5">
            <table className="w-full min-w-[880px]">
              <thead>
                <tr className="border-b border-white/8 bg-black/10">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Tool</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Pricing</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Best at</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Complexity</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Best for</th>
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
                            <Star className="h-3 w-3 fill-accent-yellow text-accent-yellow" />
                            {tool.rating.toFixed(1)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full border px-2.5 py-1 text-xs ${pricingStyles[tool.pricing] ?? pricingStyles['Free trial']}`}>
                        {tool.pricing}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">{tool.features.slice(0, 2).join(' / ')}</td>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      {['chatgpt', 'copy-ai', 'rytr'].includes(tool.id) ? 'Low' : ['claude', 'notion-ai', 'writesonic'].includes(tool.id) ? 'Medium' : 'Medium to high'}
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
            eyebrow="Scenarios"
            title="Choosing by use case is faster than choosing by brand"
            description="If you are here to get work done, start with your workflow instead of researching tool brands forever."
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
            <h2 className="text-3xl font-semibold text-text-primary">Keep moving instead of stopping at the article</h2>
            <p className="mt-4 text-base leading-8 text-text-secondary">
              If you already know your first shortlist, jump into the detail pages or widen the search inside the directory.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/tools?category=writing"
                className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
              >
                Open the writing directory
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
