import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink, Sparkles, Star } from 'lucide-react';
import type { ReactNode } from 'react';
import { getAllTools, getToolById } from '@/lib/supabase';
import { RatingDisplay } from '@/components/ui/star-rating';
import { RatingForm } from '@/components/rating-form';
import Breadcrumb, { breadcrumbPresets } from '@/components/ui/Breadcrumb';
import ToolLogo from '@/components/ui/ToolLogo';
import SponsorBadge from '@/components/ui/SponsorBadge';
import type { Tool } from '@/types/tool';
import { buildSiteUrl } from '@/lib/site';
import ToolPrimaryCta from '@/components/ui/ToolPrimaryCta';
import TrackedExternalLink from '@/components/ui/TrackedExternalLink';
import { resolveToolPrimaryUrl } from '@/lib/tracking';

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
      title: '工具未找到 - AI工具导航',
      description: '抱歉，您查找的工具不存在或已被移除。',
    };
  }

  const toolUrl = buildSiteUrl(`/tools/${tool.id}`);

  return {
    title: `${tool.name} 评测、价格与替代方案`,
    description: `${tool.description}。查看 ${tool.name} 的推荐理由、价格、优缺点、替代工具和访问入口。`,
    keywords: [tool.name, tool.category, 'AI工具评测', '价格', '替代方案'],
    alternates: {
      canonical: toolUrl,
    },
    openGraph: {
      title: `${tool.name} - ${tool.category} 工具评测`,
      description: tool.description,
      url: toolUrl,
      type: 'article',
    },
  };
}

const pricingLabels = {
  free: { text: '免费', className: 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/30' },
  paid: { text: '付费', className: 'bg-accent-pink/10 text-accent-pink border-accent-pink/30' },
  freemium: { text: '部分免费', className: 'bg-white/6 text-text-secondary border-white/12' },
};

export default async function ToolPage({ params }: ToolPageProps) {
  const { id } = await params;
  const [tool, allTools] = await Promise.all([getToolById(id), getAllTools()]);

  if (!tool) {
    notFound();
  }

  const pricingType: keyof typeof pricingLabels = tool.pricing_type ?? tool.pricingType ?? 'freemium';
  const pricing = pricingLabels[pricingType] || pricingLabels.freemium;
  const averageRating = tool.average_rating ?? tool.editorRating ?? 0;
  const ratingCount = tool.rating_count ?? 0;
  const toolUrl = buildSiteUrl(`/tools/${tool.id}`);
  const hasPrimaryCta = Boolean(resolveToolPrimaryUrl(tool));
  const relatedTools = allTools
    .filter((item: Tool) => item.id !== tool.id && item.category === tool.category)
    .slice(0, 3);

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    applicationCategory: tool.category,
    operatingSystem: 'Web',
    url: tool.website || toolUrl,
  };

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
            { label: tool.category, href: `/tools?category=${tool.categorySlug || tool.category}` },
            { label: tool.name },
          ]}
        />

        <Link
          href="/tools"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          返回工具库
        </Link>
      </div>

      <section className="border-b border-white/8">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-4">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.12fr)_22rem]">
            <article className="rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] p-8 shadow-[0_28px_70px_rgba(0,0,0,0.25)]">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`rounded-full border px-3 py-1 text-sm ${pricing.className}`}>{pricing.text}</span>
                <span className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-sm text-text-secondary">
                  {tool.category}
                </span>
                <SponsorBadge tool={tool} />
              </div>

              <div className="mt-6 flex items-start gap-5">
                <ToolLogo
                  name={tool.name}
                  icon={tool.icon}
                  size={44}
                  priority
                  wrapperClassName="h-20 w-20 rounded-[26px] border border-white/10 bg-black/10"
                  imageClassName="h-11 w-11"
                  textClassName="text-3xl text-accent-cyan"
                />
                <div className="min-w-0">
                  <h1 className="text-4xl font-semibold text-text-primary md:text-5xl">{tool.name}</h1>
                  <p className="mt-4 max-w-3xl text-base leading-8 text-text-secondary">{tool.description}</p>
                  <div className="mt-4">
                    <RatingDisplay averageRating={averageRating} ratingCount={ratingCount} size="md" />
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <MetricCard
                  value={tool.priceRange || pricing.text}
                  label="价格与门槛"
                  hint="判断是不是适合第一轮试用。"
                />
                <MetricCard
                  value={tool.editorRating ? tool.editorRating.toFixed(1) : '待补充'}
                  label="编辑分"
                  hint="越高代表越值得先点开官网。"
                />
                <MetricCard
                  value={tool.alternatives?.length ? `${tool.alternatives.length}` : '0'}
                  label="替代工具"
                  hint="不一定非它不可，替代关系也要看。"
                />
                <MetricCard
                  value={tool.difficulty ? `${tool.difficulty}/5` : '1/5'}
                  label="上手难度"
                  hint="越低越适合作为第一轮试用入口。"
                />
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <ToolPrimaryCta
                  tool={tool}
                  placement="tool_detail_primary_cta"
                  affiliateLabel="访问合作链接"
                  websiteLabel="访问官网"
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
                    查看源码
                    <ExternalLink className="h-4 w-4" />
                  </TrackedExternalLink>
                ) : null}

                <Link
                  href={`/tools?category=${tool.categorySlug || tool.category}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-text-secondary transition hover:text-text-primary"
                >
                  查看同类工具
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>

            <aside className="space-y-4">
              <div className="rounded-[30px] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Sparkles className="h-4 w-4 text-accent-yellow" />
                  3 分钟判断法
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
                  如果你是产品团队
                </div>
                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  想让你的工具也获得这种详情页和站内流量入口，可以直接从提交页进入免费收录、加急评估或赞助合作。
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="/submit"
                    className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
                  >
                    提交你的工具
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/advertise"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
                  >
                    商务合作
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
          {tool.reason ? (
            <ContentCard title="推荐理由">
              <p className="text-sm leading-8 text-text-secondary">{tool.reason}</p>
            </ContentCard>
          ) : null}

          {(tool.features?.length || tool.pros?.length || tool.cons?.length) ? (
            <ContentCard title="上手前最该看的点">
              {tool.features?.length ? (
                <div>
                  <p className="text-sm font-medium text-text-primary">核心功能</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {tool.features.map((item) => (
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
                {tool.pros?.length ? (
                  <div className="rounded-[24px] border border-white/8 bg-black/10 p-4">
                    <p className="text-sm font-medium text-text-primary">优点</p>
                    <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                      {tool.pros.map((item) => (
                        <li key={`pro-${item}`}>+ {item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {tool.cons?.length ? (
                  <div className="rounded-[24px] border border-white/8 bg-black/10 p-4">
                    <p className="text-sm font-medium text-text-primary">不足</p>
                    <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                      {tool.cons.map((item) => (
                        <li key={`con-${item}`}>- {item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </ContentCard>
          ) : null}
        </div>

        {tool.fullReview ? (
          <div className="mt-6">
            <ContentCard title="详细评测">
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

        {tool.reviewSources?.length ? (
          <div className="mt-6">
            <ContentCard title="站外评价摘要">
              <div className="space-y-4">
                {tool.reviewSources.map((source) => (
                  <div
                    key={`${source.source}-${source.url}`}
                    className="rounded-[24px] border border-white/8 bg-black/10 p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm font-semibold text-text-primary">{source.source}</p>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-accent-cyan transition hover:opacity-80"
                      >
                        查看来源
                      </a>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-text-secondary">{source.summary}</p>
                  </div>
                ))}
              </div>
            </ContentCard>
          </div>
        ) : null}

        {tool.alternatives?.length ? (
          <div className="mt-6">
            <ContentCard title="替代工具">
              <div className="flex flex-wrap gap-2">
                {tool.alternatives.map((alt) => (
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
            <ContentCard title="同类推荐">
              <div className="grid gap-4 md:grid-cols-3">
                {relatedTools.map((relatedTool) => (
                  <Link
                    key={relatedTool.id}
                    href={`/tools/${relatedTool.id}`}
                    className="rounded-[24px] border border-white/8 bg-black/10 p-4 transition hover:border-white/16"
                  >
                    <div className="flex items-start gap-3">
                      <ToolLogo
                        name={relatedTool.name}
                        icon={relatedTool.icon}
                        size={24}
                        wrapperClassName="h-11 w-11 rounded-2xl border border-white/10 bg-black/10 shrink-0"
                        imageClassName="h-6 w-6"
                        textClassName="text-sm text-accent-cyan"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-text-primary">{relatedTool.name}</p>
                        <p className="mt-2 line-clamp-3 text-xs leading-6 text-text-secondary">{relatedTool.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </ContentCard>
          </div>
        ) : null}

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
          <ContentCard title="用户评价">
            <RatingForm toolId={tool.id} />
          </ContentCard>

          <div className="rounded-[30px] border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-medium text-text-primary">行动提示</p>
            <p className="mt-3 text-sm leading-7 text-text-secondary">
              {hasPrimaryCta
                ? '如果你准备继续试用，这一页已经给出最快的入口；再犹豫时，先看看替代工具和同类推荐。'
                : '当前还没有可点击的官网或合作链接，建议先看同类推荐或返回工具库继续筛选。'}
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
  return [
    `如果你最在意的是 ${tool.category} 场景下的效率提升，这个工具值得先点开。`,
    tool.priceRange ? `价格层面：${tool.priceRange}。先判断是否符合你的试用门槛。` : '如果还没准备花钱，建议先看它是否有免费层。',
    tool.alternatives?.length
      ? `替代关系：它常和 ${tool.alternatives.slice(0, 2).join('、')} 放在一起比较。`
      : '如果详情页还不能说服你，记得看同类推荐和替代工具。',
  ];
}
