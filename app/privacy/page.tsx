import { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import { buildSiteUrl, siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how AI Tool Atlas collects, uses, and protects your data.',
  alternates: {
    canonical: buildSiteUrl('/privacy'),
  },
};

const sections = [
  {
    title: 'What we collect',
    content:
      'When you submit a product, subscribe to updates, or open a commercial inquiry, we may collect the email address, company details, budget range, and product information you choose to provide. The site also records basic request logs and event data to measure page performance.',
  },
  {
    title: 'How we use it',
    content:
      'We use this information for editorial review, commercial follow-up, email delivery, and site improvement. We do not sell submitted lead data to third parties. Newsletter subscribers only receive updates related to AI tool discovery, rankings, and platform changes.',
  },
  {
    title: 'Retention and deletion',
    content:
      'You can email us to request access, correction, or deletion of data you submitted. We will handle the request as quickly as possible and, where required, ask connected service providers to remove the same data.',
  },
  {
    title: 'Third-party services',
    content:
      'The site may use email vendors, webhooks, or analytics tools to process operational requests. We aim to choose compliant providers and keep transmitted fields to the minimum necessary.',
  },
  {
    title: 'Policy updates',
    content:
      'This policy may change when workflows, legal requirements, or vendors change. Continued use of the site means you accept the latest version.',
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <PageHero
        eyebrow="Privacy"
        title="Privacy policy."
        highlight="We care about leads, and we care about data boundaries too."
        description="This page explains what we collect, how we use it, how deletion works, and how to contact us."
        metrics={[
          {
            value: 'Minimum necessary collection',
            label: 'Field policy',
            hint: 'We collect only what is needed for listings, follow-up, and site operations.',
          },
          {
            value: 'Deletion requests supported',
            label: 'User rights',
            hint: 'You can request deletion using the email you submitted with.',
          },
        ]}
        aside={
          <div className="rounded-[24px] border border-white/10 bg-black/10 p-5">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <ShieldCheck className="h-4 w-4 text-accent-cyan" />
              Contact
            </div>
            <p className="mt-3 text-sm leading-7 text-text-secondary">
              For privacy-related requests, email: {siteConfig.contactEmail}
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
