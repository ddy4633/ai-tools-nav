import { Metadata } from 'next';
import { FileCheck2 } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import { buildSiteUrl, siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Review the usage terms, limitations, and cooperation boundaries for AI Tool Atlas.',
  alternates: {
    canonical: buildSiteUrl('/terms'),
  },
};

const sections = [
  {
    title: 'Scope of service',
    content:
      'AI Tool Atlas provides product information, editorial opinions, ranking content, and commercial entry points. Site content is informational and should not be treated as legal, tax, financial, or investment advice.',
  },
  {
    title: 'Content and outbound links',
    content:
      'We try to keep content accurate, but product capabilities, pricing, and policies can change over time. Please verify current terms before relying on third-party product sites or partner links.',
  },
  {
    title: 'User submission responsibility',
    content:
      'Any product information you submit must be accurate, lawful, and non-infringing. We may reject or remove submissions that appear deceptive, illegal, or rights-infringing.',
  },
  {
    title: 'Commercial terms and settlement',
    content:
      'Commercial work follows the agreed schedule, deliverables, and payment terms confirmed by both parties. Public package ranges are reference points and do not create an automatic contract.',
  },
  {
    title: 'Limitation of liability',
    content:
      'If losses result from third-party platform failures, network instability, or vendor outages, we will assist with investigation but do not accept indirect liability beyond what applicable law requires.',
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <PageHero
        eyebrow="Terms"
        title="Terms of service."
        highlight="Clear rules make collaboration faster."
        description="These terms explain the platform boundary, user responsibilities, commercial rules, and liability limits."
        metrics={[
          {
            value: 'Transparent cooperation',
            label: 'Commercial principle',
            hint: 'Commercial relationships stay distinct from editorial recommendations.',
          },
          {
            value: 'Informational content',
            label: 'Content nature',
            hint: 'Tool details and pricing should always be confirmed with official sources.',
          },
        ]}
        aside={
          <div className="rounded-[24px] border border-white/10 bg-black/10 p-5">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <FileCheck2 className="h-4 w-4 text-accent-yellow" />
              Questions about terms
            </div>
            <p className="mt-3 text-sm leading-7 text-text-secondary">
              For contractual clarification, email: {siteConfig.contactEmail}
            </p>
          </div>
        }
      />

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="space-y-4">
          {sections.map((section) => (
            <article key={section.title} className="rounded-[28px] border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-semibold text-text-primary">{section.title}</h2>
              <p className="mt-3 text-sm leading-8 text-text-secondary">{section.content}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
