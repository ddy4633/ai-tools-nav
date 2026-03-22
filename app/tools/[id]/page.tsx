import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink, Sparkles, Star } from 'lucide-react';
import type { ReactNode } from 'react';
import { getAllTools, getToolById } from '@/lib/supabase';
import { RatingDisplay } from '@/components/ui/star-rating';
import { RatingForm } from '@/components/rating-form';
import Breadcrumb, { breadcrumbPresets } from '@/components/ui/Breadcrumb';
import LocalizedToolName from '@/components/ui/LocalizedToolName';
import ToolLogo from '@/components/ui/ToolLogo';
import SponsorBadge from '@/components/ui/SponsorBadge';
import type { Tool } from '@/types/tool';
import { buildSiteUrl } from '@/lib/site';
import ToolPrimaryCta from '@/components/ui/ToolPrimaryCta';
import TrackedExternalLink from '@/components/ui/TrackedExternalLink';
import { resolveToolPrimaryUrl } from '@/lib/tracking';
import {
  getCategoryLabel,
  getToolCardSummary,
  getToolDisplayName,
  getToolHeroSummary,
  getToolPrimaryName,
  getToolPricingNote,
  getToolSourceNote,
  hasCjk,
  isCjkHeavy,
} from '@/lib/tool-display';

interface ToolPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const tools = await getAllTools();
  return tools.map((tool) => ({ id: tool.id }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { id } = await params;
  const tool = await getToolById(id);

  if (!tool) {
    return {
      title: 'Tool Not Found',
      description: 'The tool you requested is unavailable or has been removed from the directory.',
    };
  }

  const toolUrl = buildSiteUrl(`/tools/${tool.id}`);
  const displayName = getToolDisplayName(tool.name);
  const categoryLabel = getCategoryLabel(tool.category, tool.categorySlug ?? tool.category_slug);
  const keywords = Array.from(
    new Set([displayName, tool.name, categoryLabel, 'AI tool review', 'pricing', 'alternatives'].filter(Boolean))
  );

  return {
    title: `${displayName} review, pricing, and alternatives`,
    description: `${getToolHeroSummary(tool)} Review workflow fit, pricing, alternatives, and direct access links for ${displayName}.`,
    keywords,
    alternates: {
      canonical: toolUrl,
    },
    openGraph: {
      title: `${displayName} - ${categoryLabel} review`,
      description: getToolHeroSummary(tool),
      url: toolUrl,
      type: 'article',
    },
  };
}

const pricingLabels = {
  free: { text: 'Free', className: 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/30' },
  paid: { text: 'Paid', className: 'bg-accent-pink/10 text-accent-pink border-accent-pink/30' },
  freemium: { text: 'Freemium', className: 'bg-white/6 text-text-secondary border-white/12' },
};

export default async function ToolPage({ params }: ToolPageProps) {
  const { id } = await params;
  const [tool, allTools] = await Promise.all([getToolById(id), getAllTools()]);

  if (!tool) {
    notFound();
  }

  const pricingType: keyof typeof pricingLabels = tool.pricing_type ?? tool.pricingType ?? 'freemium';
  const pricing = pricingLabels[pricingType] || pricingLabels.freemium;
  const displayName = getToolPrimaryName(tool.name);
  const categoryLabel = getCategoryLabel(tool.category, tool.categorySlug ?? tool.category_slug);
  const averageRating = tool.average_rating ?? tool.editorRating ?? 0;
  const ratingCount = tool.rating_count ?? 0;
  const toolUrl = buildSiteUrl(`/tools/${tool.id}`);
  const hasPrimaryCta = Boolean(resolveToolPrimaryUrl(tool));
  const visibleFeatures = tool.features?.filter((item) => !hasCjk(item)) ?? [];
  const visiblePros = tool.pros?.filter((item) => !hasCjk(item)) ?? [];
  const visibleCons = tool.cons?.filter((item) => !hasCjk(item)) ?? [];
  const visibleReviewSources =
    tool.reviewSources?.map((source) => ({
      ...source,
      displaySource: hasCjk(source.source) ? 'Original source page' : source.source,
      displaySummary: !hasCjk(source.summary)
        ? source.summary
        : 'The original source summary is stored in Simplified Chinese. Use the English-first summary on this page before opening the source.',
    })) ?? [];
  const displayAlternatives = (tool.alternatives ?? []).map((item) => getToolPrimaryName(item));
  const relatedTools = allTools
    .filter((item: Tool) => item.id !== tool.id && item.category === tool.category)
    .slice(0, 3);

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: displayName,
    description: getToolHeroSummary(tool),
    applicationCategory: categoryLabel,
    operatingSystem: 'Web',
    url: tool.website || toolUrl,
  };

  if (displayName !== tool.name) {
    jsonLd.alternateName = tool.name;
  }

  if (averageRating && ratingCount) {
    jsonLd.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: averageRating,
      ratingCount,
    };
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <Breadcrumb
          items={[
            breadcrumbPresets.tools,
            { label: categoryLabel, href: `/tools?category=${tool.categorySlug || tool.category}` },
            { label: displayName },
          ]}
        />

        <Link
          href="/tools"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to directory
        </Link>
      </div>

      <section className="border-b border-white/8">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-4">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.12fr)_22rem]">
            <article className="rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] p-8 shadow-[0_28px_70px_rgba(0,0,0,0.25)]">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`rounded-full border px-3 py-1 text-sm ${pricing.className}`}>{pricing.text}</span>
                <span className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-sm text-text-secondary">
                  {categoryLabel}
                </span>
                <SponsorBadge tool={tool} />
              </div>

              <div className="mt-6 flex items-start gap-5">
                <ToolLogo
                  name={displayName}
                  icon={tool.icon}
                  size={44}
                  priority
                  wrapperClassName="h-20 w-20 rounded-[26px] border border-white/10 bg-black/10"
                  imageClassName="h-11 w-11"
                  textClassName="text-3xl text-accent-cyan"
                />
                <div className="min-w-0">
                  <h1 className="text-4xl font-semibold text-text-primary md:text-5xl">
                    <LocalizedToolName name={tool.name} mode="detail" />
                  </h1>
                  <p className="mt-4 max-w-3xl text-base leading-8 text-text-secondary">{getToolHeroSummary(tool)}</p>
                  {isCjkHeavy(tool.description) ? (
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-text-muted">{getToolSourceNote(tool)}</p>
                  ) : null}
                  <div className="mt-4">
                    <RatingDisplay averageRating={averageRating} ratingCount={ratingCount} size="md" />
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <MetricCard
                  value={getToolPricingNote(tool)}
                  label="Pricing"
                  hint="Check whether the access tier fits your first test."
                />
                <MetricCard
                  value={tool.editorRating ? tool.editorRating.toFixed(1) : 'TBD'}
                  label="Editor score"
                  hint="Higher usually means the product deserves the next click sooner."
                />
                <MetricCard
                  value={tool.alternatives?.length ? `${tool.alternatives.length}` : '0'}
                  label="Alternatives"
                  hint="Strong options should still be judged against close substitutes."
                />
                <MetricCard
                  value={tool.difficulty ? `${tool.difficulty}/5` : '1/5'}
                  label="Setup effort"
                  hint="Lower effort makes the product easier to test first."
                />
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <ToolPrimaryCta
                  tool={tool}
                  placement="tool_detail_primary_cta"
                  affiliateLabel="Open partner link"
                  websiteLabel="Visit site"
                  className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-5 py-3 text-sm text-text-primary transition hover:bg-accent-cyan/18"
                />

                {tool.repo_url ? (
                  <TrackedExternalLink
                    href={tool.repo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    trackingPayload={{
                      placement: 'tool_detail_repo_cta',
                      toolId: tool.id,
                      toolName: tool.name,
                      targetUrl: tool.repo_url,
                      isAffiliate: false,
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-text-secondary transition hover:text-text-primary"
                  >
                    View source
                    <ExternalLink className="h-4 w-4" />
                  </TrackedExternalLink>
                ) : null}

                <Link
                  href={`/tools?category=${tool.categorySlug || tool.category}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-text-secondary transition hover:text-text-primary"
                >
                  Browse similar tools
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>

            <aside className="space-y-4">
              <div className="rounded-[30px] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Sparkles className="h-4 w-4 text-accent-yellow" />
                  3-minute decision guide
                </div>
                <div className="mt-5 space-y-3">
                  {buildDecisionBullets(tool).map((item) => (
                    <div key={item} className="rounded-[22px] border border-white/8 bg-black/10 px-4 py-3 text-sm text-text-secondary">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[30px] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Star className="h-4 w-4 text-accent-cyan" />
                  If you run the product
                </div>
                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  Want this level of product page, traffic intent, and directory visibility for your own tool? Start with the submit flow or paid placement options.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="/submit"
                    className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
                  >
                    Submit your tool
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/advertise"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
                  >
                    Promote
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          {(tool.reason || tool.description) ? (
            <ContentCard title="Why this tool is featured">
              <p className="text-sm leading-8 text-text-secondary">{getToolCardSummary(tool)}</p>
            </ContentCard>
          ) : null}

          {(visibleFeatures.length || visiblePros.length || visibleCons.length) ? (
            <ContentCard title="What to check before you commit">
              {visibleFeatures.length ? (
                <div>
                  <p className="text-sm font-medium text-text-primary">Feature surface</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {visibleFeatures.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs text-text-secondary"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {visiblePros.length ? (
                  <div className="rounded-[24px] border border-white/8 bg-black/10 p-4">
                    <p className="text-sm font-medium text-text-primary">Strengths</p>
                    <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                      {visiblePros.map((item) => (
                        <li key={`pro-${item}`}>+ {item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {visibleCons.length ? (
                  <div className="rounded-[24px] border border-white/8 bg-black/10 p-4">
                    <p className="text-sm font-medium text-text-primary">Watch-outs</p>
                    <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                      {visibleCons.map((item) => (
                        <li key={`con-${item}`}>- {item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </ContentCard>
          ) : null}
        </div>

        {tool.fullReview && !isCjkHeavy(tool.fullReview) ? (
          <div className="mt-6">
            <ContentCard title="Full editorial notes">
              <div className="space-y-4 text-sm leading-8 text-text-secondary">
                {tool.fullReview
                  .split(/\n\s*\n/)
                  .map((paragraph, index) => (
                    <p key={index}>{paragraph.trim()}</p>
                  ))}
              </div>
            </ContentCard>
          </div>
        ) : null}

        {tool.fullReview && isCjkHeavy(tool.fullReview) ? (
          <div className="mt-6">
            <ContentCard title="Editorial note">
              <p className="text-sm leading-8 text-text-secondary">
                The long-form editorial review is currently stored in Simplified Chinese. The English-first summary above is the recommended version for global browsing.
              </p>
            </ContentCard>
          </div>
        ) : null}

        {visibleReviewSources.length ? (
          <div className="mt-6">
            <ContentCard title="External source notes">
              <div className="space-y-4">
                {visibleReviewSources.map((source) => (
                  <div
                    key={`${source.source}-${source.url}`}
                    className="rounded-[24px] border border-white/8 bg-black/10 p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm font-semibold text-text-primary">{source.displaySource}</p>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-accent-cyan transition hover:opacity-80"
                      >
                        View source
                      </a>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-text-secondary">{source.displaySummary}</p>
                  </div>
                ))}
              </div>
            </ContentCard>
          </div>
        ) : null}

        {displayAlternatives.length ? (
          <div className="mt-6">
            <ContentCard title="Alternatives">
              <div className="flex flex-wrap gap-2">
                {displayAlternatives.map((alt) => (
                  <span
                    key={alt}
                    className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-sm text-text-secondary"
                  >
                    {alt}
                  </span>
                ))}
              </div>
            </ContentCard>
          </div>
        ) : null}

        {relatedTools.length ? (
          <div className="mt-6">
            <ContentCard title="Related picks">
              <div className="grid gap-4 md:grid-cols-3">
                {relatedTools.map((relatedTool) => (
                  <Link
                    key={relatedTool.id}
                    href={`/tools/${relatedTool.id}`}
                    className="rounded-[24px] border border-white/8 bg-black/10 p-4 transition hover:border-white/16"
                  >
                    <div className="flex items-start gap-3">
                      <ToolLogo
                        name={getToolPrimaryName(relatedTool.name)}
                        icon={relatedTool.icon}
                        size={24}
                        wrapperClassName="h-11 w-11 rounded-2xl border border-white/10 bg-black/10 shrink-0"
                        imageClassName="h-6 w-6"
                        textClassName="text-sm text-accent-cyan"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-text-primary">{getToolPrimaryName(relatedTool.name)}</p>
                        <p className="mt-2 line-clamp-3 text-xs leading-6 text-text-secondary">{getToolCardSummary(relatedTool)}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </ContentCard>
          </div>
        ) : null}

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
          <ContentCard title="User rating">
            <RatingForm toolId={tool.id} />
          </ContentCard>

          <div className="rounded-[30px] border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-medium text-text-primary">Next move</p>
            <p className="mt-3 text-sm leading-7 text-text-secondary">
              {hasPrimaryCta
                ? 'If you want to test the product now, use the primary link first. If you are still unsure, compare alternatives and related picks before you leave.'
                : 'There is no live website or partner link yet. Use the related picks or return to the directory to keep filtering.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function MetricCard({ value, label, hint }: { value: string; label: string; hint: string }) {
  return (
    <div className="rounded-[26px] border border-white/10 bg-black/10 p-4">
      <p className="text-xl font-semibold text-text-primary">{value}</p>
      <p className="mt-2 text-sm text-text-secondary">{label}</p>
      <p className="mt-2 text-xs leading-6 text-text-muted">{hint}</p>
    </div>
  );
}

function ContentCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-[32px] border border-white/10 bg-white/5 p-6">
      <h2 className="text-2xl font-semibold text-text-primary">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function buildDecisionBullets(tool: Tool) {
  const categoryLabel = getCategoryLabel(tool.category, tool.categorySlug ?? tool.category_slug);
  const displayName = getToolPrimaryName(tool.name);

  return [
    `If ${displayName} improves the job you do inside ${categoryLabel}, it deserves a first click.`,
    `Pricing signal: ${getToolPricingNote(tool)} Decide whether the access tier fits your first test before you commit time.`,
    tool.alternatives?.length
      ? `Alternative set: people often compare it with ${tool.alternatives.slice(0, 2).map((item) => getToolPrimaryName(item)).join(', ')}.`
      : 'If this page does not convince you yet, compare related picks before making the final call.',
  ];
}
