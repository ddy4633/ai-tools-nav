import { Metadata } from 'next';
import { Compass, Layers3, Search, Sparkles } from 'lucide-react';
import { getAllTools, getCategories } from '@/lib/supabase';
import Breadcrumb, { breadcrumbPresets } from '@/components/ui/Breadcrumb';
import PageHero from '@/components/ui/PageHero';
import ToolsClient from './ToolsClient';
import { buildSiteUrl } from '@/lib/site';
import { brandConfig } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'AI Tools Directory - Filter launch-ready tools by workflow',
  description: 'Browse curated AI tools, filter by workflow and pricing, and compare which products deserve the next click.',
  keywords: ['AI tools directory', 'AI tool search', 'AI tool categories', 'AI launch feed', 'AI coding tools', 'AI writing tools', 'AI design tools'],
  alternates: {
    canonical: buildSiteUrl('/tools'),
  },
  openGraph: {
    title: `AI Tools Directory | ${brandConfig.siteName}`,
    description: 'Browse curated AI tools with workflow-first filtering and review-ready cards.',
    url: buildSiteUrl('/tools'),
    type: 'website',
  },
};

export const revalidate = 3600;

export default async function ToolsPage({
  searchParams,
}: {
  searchParams?: Promise<{ search?: string; category?: string; pricing?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const [tools, categories] = await Promise.all([getAllTools(), getCategories()]);

  const initialSearch = typeof resolvedSearchParams?.search === 'string' ? resolvedSearchParams.search : '';
  const initialCategory = typeof resolvedSearchParams?.category === 'string' ? resolvedSearchParams.category : '';
  const initialPricing = typeof resolvedSearchParams?.pricing === 'string' ? resolvedSearchParams.pricing : '';

  const freeCount = tools.filter((tool) => (tool.pricing_type ?? tool.pricingType) === 'free').length;
  const featuredCount = tools.filter((tool) => tool.is_featured ?? tool.isFeatured).length;
  const sponsoredCount = tools.filter((tool) => tool.is_sponsored ?? tool.isSponsored).length;

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <Breadcrumb items={[{ ...breadcrumbPresets.tools, href: undefined }]} />
      </div>

      <PageHero
        eyebrow="Full directory"
        title="This is not a wall of names."
        highlight="It is a decision surface that narrows the field first."
        description="The directory takes over after the homepage, trending page, and editorial content. Filter by workflow, pricing, and search intent first, then decide which product pages deserve attention."
        metrics={[
          {
            value: `${tools.length}+`,
            label: 'Filterable tools',
            hint: 'Continuously updated without turning the page into a noisy dump.',
          },
          {
            value: `${categories.length}`,
            label: 'Workflow categories',
            hint: 'Built around jobs to be done before model-brand recall.',
          },
          {
            value: `${freeCount}`,
            label: 'Free tools',
            hint: 'Useful when you want proof before budget.',
          },
          {
            value: `${featuredCount}/${sponsoredCount}`,
            label: 'Editorial / paid',
            hint: 'Editorial picks and paid placement stay visibly separate.',
          },
        ]}
        actions={[
          { href: '/categories', label: 'Browse by workflow', tone: 'secondary' },
          { href: '/trending', label: 'Open trending', tone: 'ghost' },
          { href: '/advertise', label: 'View paid plans', tone: 'primary' },
        ]}
        aside={
          <div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Sparkles className="h-4 w-4 text-accent-yellow" />
              Who this page helps
            </div>
            <div className="mt-5 space-y-3">
              {[
                {
                  icon: Search,
                  title: 'Search by job first',
                  description: 'Use this when you already know the job to be done, such as writing a brief, generating assets, or reviewing a long document.',
                },
                {
                  icon: Layers3,
                  title: 'Then compress by category and price',
                  description: 'The goal is to shrink the list to 5 to 10 serious candidates before you open detailed reviews.',
                },
                {
                  icon: Compass,
                  title: 'Use editor judgment at the end',
                  description: 'Read the reasoning, alternatives, and direct entry points instead of picking on hype alone.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-[22px] border border-white/8 bg-black/10 p-4">
                  <div className="flex items-center gap-2 text-sm text-text-primary">
                    <item.icon className="h-4 w-4 text-accent-cyan" />
                    {item.title}
                  </div>
                  <p className="mt-3 text-sm leading-7 text-text-secondary">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        }
      />

      <div className="mx-auto max-w-7xl px-6 pb-20">
        <ToolsClient
          tools={tools}
          categories={categories}
          initialSearch={initialSearch}
          initialCategory={initialCategory}
          initialPricing={initialPricing}
        />
      </div>
    </div>
  );
}
