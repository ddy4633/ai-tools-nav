import Link from 'next/link';
import { ArrowRight, Home, Sparkles } from 'lucide-react';
import type { Tool } from '@/types/tool';
import ToolLogo from '@/components/ui/ToolLogo';
import ToolPrimaryCta from '@/components/ui/ToolPrimaryCta';
import SponsorBadge from '@/components/ui/SponsorBadge';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import { getCategoryLabel, getToolCardSummary, getToolDisplayName } from '@/lib/tool-display';

interface CategoryToolsPageProps {
  categoryLabel: string;
  heading: string;
  description: string;
  tools: Tool[];
  toolsFilterHref: string;
  toolsFilterLabel: string;
  emptyEmoji: string;
  emptyTitle: string;
  emptyDescription: string;
}

const pricingLabels = {
  free: { text: 'Free', className: 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/30' },
  paid: { text: 'Paid', className: 'bg-accent-pink/10 text-accent-pink border-accent-pink/30' },
  freemium: { text: 'Freemium', className: 'bg-white/6 text-text-secondary border-white/12' },
};

export function filterToolsByKeywords(tools: Tool[], keywords: string[]): Tool[] {
  return tools.filter((tool) => {
    const category = tool.category?.toLowerCase() ?? '';
    return keywords.some((keyword) => category.includes(keyword.toLowerCase()));
  });
}

export default function CategoryToolsPage({
  categoryLabel,
  heading,
  description,
  tools,
  toolsFilterHref,
  toolsFilterLabel,
  emptyEmoji,
  emptyTitle,
  emptyDescription,
}: CategoryToolsPageProps) {
  const spotlightTools = [...tools].sort((left, right) => (right.editorRating ?? 0) - (left.editorRating ?? 0)).slice(0, 3);
  const freeCount = tools.filter((tool) => (tool.pricing_type ?? tool.pricingType) === 'free').length;

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <nav className="flex items-center gap-2 text-sm text-text-muted">
          <Link href="/" className="flex items-center gap-1 transition hover:text-text-primary">
            <Home className="w-4 h-4" />
            Home
          </Link>
          <span>/</span>
          <Link href="/categories" className="transition hover:text-text-primary">
            Categories
          </Link>
          <span>/</span>
          <span className="text-text-primary">{categoryLabel}</span>
        </nav>
      </div>

      <PageHero
        eyebrow={`${categoryLabel} category`}
        title={heading.endsWith('.') ? heading : `${heading}.`}
        highlight="Know what to judge before you start clicking."
        description={`${tools.length} tools in this category. ${description}`}
        metrics={[
          {
            value: `${tools.length}`,
            label: 'Tools in category',
            hint: 'Good for deeper review pages and tighter shortlist work.',
          },
          {
            value: `${freeCount}`,
            label: 'Free-to-try tools',
            hint: 'Useful when you want proof before budget approval.',
          },
          {
            value: `${spotlightTools.length}`,
            label: 'Priority starts',
            hint: 'Start with stronger editorial reasoning to reduce false tries.',
          },
        ]}
        actions={[
          { href: toolsFilterHref, label: toolsFilterLabel, tone: 'secondary' },
          { href: '/advertise', label: 'Promote in this category', tone: 'primary' },
        ]}
        aside={
          <div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Sparkles className="h-4 w-4 text-accent-yellow" />
              How to judge this category
            </div>
            <div className="mt-5 space-y-3">
              {buildCategoryPrinciples(categoryLabel).map((item) => (
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
        {tools.length > 0 ? (
          <>
            <SectionHeading
              eyebrow="Top Pick"
              title={`Start with these 3 ${categoryLabel} tools`}
              description="They are not always the most famous. They are simply the easiest way to establish your decision criteria before you scan the longer list."
            />

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {spotlightTools.map((tool) => (
                <article
                  key={tool.id}
                  className="rounded-[30px] border border-white/10 bg-white/5 p-5 transition hover:border-white/16 hover:bg-white/[0.07]"
                >
                  <div className="flex items-start gap-4">
                    <ToolLogo
                      name={getToolDisplayName(tool.name)}
                      icon={tool.icon}
                      size={32}
                      alt={`${getToolDisplayName(tool.name)} logo`}
                      wrapperClassName="h-14 w-14 rounded-[20px] border border-white/10 bg-black/10"
                      imageClassName="h-8 w-8"
                      textClassName="text-xl text-accent-cyan"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-lg font-semibold text-text-primary">{getToolDisplayName(tool.name)}</h3>
                        <span
                          className={`rounded-full border px-2.5 py-1 text-xs ${
                            pricingLabels[tool.pricing_type ?? tool.pricingType ?? 'freemium'].className
                          }`}
                        >
                      {pricingLabels[tool.pricing_type ?? tool.pricingType ?? 'freemium'].text}
                    </span>
                    <SponsorBadge tool={tool} />
                  </div>
                      <p className="mt-2 text-xs text-text-muted">{getCategoryLabel(tool.category, tool.categorySlug ?? tool.category_slug)}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-text-secondary">{getToolCardSummary(tool)}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <ToolPrimaryCta
                      tool={tool}
                      placement="category_page_spotlight_primary_cta"
                      affiliateLabel="Open partner link"
                      websiteLabel="Visit site"
                      className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
                    />
                    <Link
                      href={`/tools/${tool.id}`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
                    >
                      Open review
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-14 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-text-muted">Full List</p>
                <h2 className="mt-2 text-2xl font-semibold text-text-primary">Full {categoryLabel} list</h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-text-secondary">
                  If you already know the direction, this section is better for side-by-side review, especially around pricing, workflow fit, and alternatives.
                </p>
              </div>
              <Link
                href="/submit"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
            >
                Submit your tool
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {tools.map((tool) => {
                const pricing = pricingLabels[tool.pricing_type ?? tool.pricingType ?? 'freemium'] || pricingLabels.freemium;
                const detailHref = `/tools/${tool.id}`;

                return (
                  <article
                    key={tool.id}
                    className="group rounded-[28px] border border-white/10 bg-white/5 p-5 transition hover:border-white/16 hover:bg-white/[0.07]"
                  >
                    <div className="flex items-start gap-4">
                      <ToolLogo
                        name={getToolDisplayName(tool.name)}
                        icon={tool.icon}
                        size={32}
                        alt={`${getToolDisplayName(tool.name)} logo`}
                        wrapperClassName="h-14 w-14 rounded-[20px] border border-white/10 bg-black/10"
                        imageClassName="h-8 w-8"
                        textClassName="text-xl text-accent-cyan"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Link href={detailHref} className="transition hover:text-accent-cyan">
                            <h3 className="truncate text-lg font-semibold text-text-primary">{getToolDisplayName(tool.name)}</h3>
                          </Link>
                          <span className={`rounded-full border px-2.5 py-1 text-xs ${pricing.className}`}>
                            {pricing.text}
                          </span>
                          <SponsorBadge tool={tool} />
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-text-muted">
                          <span>{getCategoryLabel(tool.category, tool.categorySlug ?? tool.category_slug)}</span>
                          {tool.editorRating ? <span>Editor score {tool.editorRating.toFixed(1)}</span> : null}
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-7 text-text-secondary">{getToolCardSummary(tool)}</p>

                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <ToolPrimaryCta
                        tool={tool}
                        placement="category_page_primary_cta"
                        affiliateLabel="Open partner link"
                        websiteLabel="Visit site"
                        className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
                      />
                      <Link
                        href={detailHref}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
                      >
                        Open review
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        ) : (
          <div className="rounded-[32px] border border-white/10 bg-white/5 py-16 text-center">
            <div className="text-6xl mb-4">{emptyEmoji}</div>
            <p className="text-lg font-semibold text-text-primary">{emptyTitle}</p>
            <p className="mt-2 text-sm text-text-muted">{emptyDescription}</p>
            <Link
              href="/tools"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
            >
              Browse all tools
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        <div className="mt-14 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
          >
            <Home className="w-4 h-4" />
            Back home
          </Link>
        </div>
      </section>
    </div>
  );
}

function buildCategoryPrinciples(categoryLabel: string) {
  const ruleMap: Record<string, Array<{ title: string; description: string }>> = {
    'AI Chat': [
      {
        title: 'Start with context depth and reasoning',
        description: 'Long-context handling, browsing, and reasoning stability decide whether the tool can actually work, not just chat.',
      },
      {
        title: 'Then check workflow fit',
        description: 'Look at file handling, speed, and team coordination support before you assume the product can own a real workflow.',
      },
    ],
    'AI Writing': [
      {
        title: 'Judge structure before polish',
        description: 'The useful tools are the ones that can organize a brief, argument, and narrative flow before sentence cleanup.',
      },
      {
        title: 'Then measure control',
        description: 'Brand voice, rewrite precision, and output consistency matter more than whether it can generate a paragraph at all.',
      },
    ],
    'AI Coding': [
      {
        title: 'See if it understands the project',
        description: 'The real divide is whether the product can read the repo, follow context, and edit across files.',
      },
      {
        title: 'Then check the execution loop',
        description: 'From autocomplete to refactor to runnable output, the tighter the loop, the closer it is to real development work.',
      },
    ],
    'Image & Art': [
      {
        title: 'Start with the style ceiling',
        description: 'Speed is not enough. Consistency, detail quality, and commercial deliverability matter more.',
      },
      {
        title: 'Then check rights and cost',
        description: 'If the output is for commercial work, include licensing, generation limits, and post-edit cost in the decision.',
      },
    ],
  };

  return (
    ruleMap[categoryLabel] ?? [
      {
        title: 'Start with the real job',
        description: 'Do not let novelty decide for you. Check whether the product meaningfully improves the workflow you already care about.',
      },
      {
        title: 'Then compare price and substitutes',
        description: 'The best option is not always the most expensive one. Judge whether this job has a simpler or cheaper alternative.',
      },
    ]
  );
}
