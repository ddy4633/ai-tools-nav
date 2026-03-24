import { Metadata } from 'next';
import Image from 'next/image';
import { Megaphone } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import IllustrationFrame from '@/components/ui/IllustrationFrame';
import { getPolicyIllustrationPath } from '@/lib/illustrations';
import { buildSiteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Disclosure Policy',
  description: 'Review how AI Tool Atlas discloses sponsorships, partner links, and editorial independence.',
  alternates: {
    canonical: buildSiteUrl('/disclosure'),
  },
};

const sections = [
  {
    title: 'Sponsor labels',
    content:
      'Sponsored tools display a visible label on cards or detail pages, such as homepage sponsor or category sponsor. We do not hide commercial relationships behind vague styling.',
  },
  {
    title: 'Partner links',
    content:
      'Some partner links may create commission or lead revenue. Visitors should see partner-link wording before clicking so they can distinguish official-site visits from commercial routing.',
  },
  {
    title: 'Editorial independence',
    content:
      'Editorial recommendations and commercial programs are managed separately. Even when a tool is a partner, content should still include fit, risk, and alternative options.',
  },
  {
    title: 'Measurement and review',
    content:
      'Partner links and key conversion surfaces may be tracked to review campaign performance. We do not publish sensitive operating data from commercial partners.',
  },
];

export default function DisclosurePage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <PageHero
        eyebrow="Disclosure"
        title="Disclosure policy."
        highlight="Commercialization is fine. Hiding it is not."
        description="This page explains how sponsorships, partner links, and editorial recommendations relate to each other so trust stays intact."
        metrics={[
          {
            value: 'Visible labels',
            label: 'Sponsor treatment',
            hint: 'Every sponsored surface should carry a clear disclosure marker.',
          },
          {
            value: 'Traceable',
            label: 'Partner routing',
            hint: 'Critical commercial paths can be measured and reviewed.',
          },
        ]}
        aside={
          <div>
            <IllustrationFrame
              src={getPolicyIllustrationPath('disclosure')}
              alt="Abstract disclosure and sponsor signal illustration"
              eyebrow="Trust Layer"
              title="Commercial signals should be obvious"
              description="When money enters the page, the design should clarify that relationship instead of hiding it inside generic UI."
              chips={['Sponsor labels', 'Partner links', 'Editorial split']}
              priority
            >
              <div className="grid grid-cols-2 gap-3">
                {[
                  { src: getPolicyIllustrationPath('disclosure'), label: 'Sponsor markers' },
                  { src: getPolicyIllustrationPath('terms'), label: 'Policy alignment' },
                ].map((item) => (
                  <div key={item.label} className="rounded-[20px] border border-white/10 bg-white/5 p-3">
                    <div className="overflow-hidden rounded-[16px] border border-white/10 bg-[#0A1726]">
                      <Image src={item.src} alt={item.label} width={1200} height={900} className="h-auto w-full object-cover" />
                    </div>
                    <p className="mt-2 text-xs text-text-secondary">{item.label}</p>
                  </div>
                ))}
              </div>
            </IllustrationFrame>
            <div className="mt-5 rounded-[24px] border border-white/10 bg-black/10 p-5">
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Megaphone className="h-4 w-4 text-accent-cyan" />
                Update policy
              </div>
              <p className="mt-3 text-sm leading-7 text-text-secondary">
                If the monetization system changes, this page gets updated first so disclosure rules stay aligned with the live product.
              </p>
            </div>
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
