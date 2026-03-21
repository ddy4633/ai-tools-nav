import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  DollarSign,
  Image as ImageIcon,
  Paintbrush,
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
  title: 'AI Image Generators Worth Trying in 2026',
  description:
    'From Midjourney and Stable Diffusion to DALL-E 3, this guide breaks down the AI image tools worth trying in 2026 by quality, cost, and ease of use.',
  keywords: ['AI image generators', 'AI art tools', 'Midjourney', 'Stable Diffusion', 'DALL-E 3', 'design tools'],
  alternates: {
    canonical: buildSiteUrl('/blog/ai-art-generators'),
  },
  openGraph: {
    title: 'AI Image Generators Worth Trying in 2026',
    description: 'A practical guide to AI image tools by output quality, cost, and learning curve.',
    url: buildSiteUrl('/blog/ai-art-generators'),
    type: 'article',
  },
};

const pricingStyles: Record<string, string> = {
  Free: 'border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan',
  'Free trial': 'border-accent-yellow/30 bg-accent-yellow/10 text-accent-yellow',
  Paid: 'border-accent-pink/30 bg-accent-pink/10 text-accent-pink',
};

const aiArtTools = [
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: 'Still one of the strongest choices when visual impact, polish, and style quality matter immediately.',
    pricing: 'Paid',
    priceDetail: 'Starts around $10/month and is best for serious visual work',
    rating: 4.9,
    features: ['High finish quality', 'Strong style control', 'Mature community', 'Excellent for concept art'],
    pros: ['Very high hit rate', 'Strong detail and atmosphere', 'Mature aesthetic output'],
    cons: ['No free tier', 'Not the lightest learning curve for new users', 'Still tied to a Discord-centered workflow for many users'],
    bestFor: 'Professional designers, brand teams, concept artists, and premium commercial output',
    website: 'https://www.midjourney.com',
  },
  {
    id: 'stable-diffusion',
    name: 'Stable Diffusion',
    description: 'More like an image-generation foundation layer for people who want deep control, low software cost, and self-hosting options.',
    pricing: 'Free',
    priceDetail: 'Open source and free, but with a higher setup cost in time and hardware',
    rating: 4.7,
    features: ['Open source', 'Local deployment', 'Huge model ecosystem', 'Deep customization'],
    pros: ['No licensing cost', 'Very flexible', 'Excellent for batch generation and fine control'],
    cons: ['Higher setup barrier', 'More hardware requirements', 'Not ideal for lightweight casual use'],
    bestFor: 'Technical users, studios, local deployment, and deep customization workflows',
    website: 'https://stability.ai',
  },
  {
    id: 'dall-e-3',
    name: 'DALL-E 3',
    description: 'A better fit for people who want to describe a visual in natural language and get to a useful image quickly.',
    pricing: 'Paid',
    priceDetail: 'Usually accessed through paid ChatGPT capabilities',
    rating: 4.6,
    features: ['Strong prompt understanding', 'Conversational generation', 'Low friction', 'Fast prototyping'],
    pros: ['Very approachable', 'Feels intuitive when describing intent', 'Great for quick prototypes'],
    cons: ['Lower artistic ceiling than Midjourney', 'Less granular control'],
    bestFor: 'Product managers, content creators, and fast-moving visual prototyping',
    website: 'https://openai.com/dall-e-3',
  },
  {
    id: 'leonardo',
    name: 'Leonardo.AI',
    description: 'A strong fit for game assets, character work, and production teams balancing experimentation with professional models.',
    pricing: 'Free trial',
    priceDetail: 'Offers trial usage so teams can validate fit before buying',
    rating: 4.5,
    features: ['Trial access', 'Model training', 'Game-friendly outputs', 'Rich controls'],
    pros: ['Low cost to experiment', 'Strong for assets and character work', 'Broad model options'],
    cons: ['Advanced workflows still require payment', 'Choice complexity can slow down beginners'],
    bestFor: 'Game teams, character design, asset generation, and concept design',
    website: 'https://leonardo.ai',
  },
  {
    id: 'ideogram',
    name: 'Ideogram',
    description: 'Especially strong when you need readable text inside the image, such as posters, covers, and social content.',
    pricing: 'Free',
    priceDetail: 'Easy to start on the base tier',
    rating: 4.4,
    features: ['Text rendering', 'Poster design', 'Logo-like compositions', 'Social assets'],
    pros: ['Text handling is noticeably more stable', 'Very useful for graphic content', 'Beginner-friendly'],
    cons: ['Less compelling at high-end artistic style work', 'The free experience is still limited'],
    bestFor: 'Posters, covers, social graphics, and text-heavy image content',
    website: 'https://ideogram.ai',
  },
  {
    id: 'adobe-firefly',
    name: 'Adobe Firefly',
    description: 'Best for people already inside the Adobe stack, where generation, editing, and handoff feel naturally connected.',
    pricing: 'Free trial',
    priceDetail: 'Most valuable for teams already committed to Adobe tools',
    rating: 4.3,
    features: ['Adobe integration', 'Commercial safety positioning', 'Generative fill', 'Smooth design handoff'],
    pros: ['Feels safer for commercial usage', 'Fits naturally into professional design pipelines'],
    cons: ['Much less compelling outside the Adobe ecosystem', 'Trial usage is limited'],
    bestFor: 'Adobe-heavy teams, brand designers, and professional design operations',
    website: 'https://www.adobe.com/products/firefly.html',
  },
  {
    id: 'bing-image-creator',
    name: 'Bing Image Creator',
    description: 'A very low-friction starting point, especially for people trying AI image generation for the first time.',
    pricing: 'Free',
    priceDetail: 'Free to try and excellent for lightweight experiments',
    rating: 4.2,
    features: ['Free access', 'Easy onboarding', 'Fast generation', 'Lightweight use'],
    pros: ['Zero cost', 'Very little setup overhead', 'Good for temporary or simple needs'],
    cons: ['Lower ceiling', 'Less fine-grained control'],
    bestFor: 'Beginners, temporary visual needs, and quick tests',
    website: 'https://www.bing.com/create',
  },
  {
    id: 'playground',
    name: 'Playground AI',
    description: 'A good choice for teams with limited budget who still want to compare styles and run more experiments.',
    pricing: 'Free trial',
    priceDetail: 'Generous enough for broader experimentation before paying',
    rating: 4.1,
    features: ['Multiple models', 'Useful trial tier', 'Layer editing', 'Low-cost experimentation'],
    pros: ['Large testing surface', 'Good for style comparisons', 'Friendly for curious beginners'],
    cons: ['Performance can fluctuate under load', 'Advanced workflows still push you toward paid plans'],
    bestFor: 'Budget-conscious users, multi-model experiments, and style exploration',
    website: 'https://playgroundai.com',
  },
];

const quickDecisions = [
  {
    title: 'You want the strongest visual punch',
    description: 'Start with Midjourney if finished quality and image impact matter more than anything else.',
  },
  {
    title: 'You want to keep cost low',
    description: 'Start with Stable Diffusion or Bing Image Creator depending on how technical you are.',
  },
  {
    title: 'You want the fastest onboarding',
    description: 'DALL-E 3 and Ideogram are easier to use without learning a lot of image-generation theory first.',
  },
];

const scenarioSuggestions = [
  {
    title: 'Tight budget',
    icon: DollarSign,
    description: 'Start with Stable Diffusion, Bing Image Creator, or Playground AI.',
  },
  {
    title: 'Professional output',
    icon: Paintbrush,
    description: 'Start with Midjourney or Leonardo.AI when visual ceiling matters more than convenience.',
  },
  {
    title: 'Fast onboarding',
    icon: ImageIcon,
    description: 'Start with DALL-E 3 or Ideogram if you want a lower learning curve.',
  },
];

const aiArtToolCards = aiArtTools.map((tool) => ({
  ...tool,
  ...getToolCardData(tool),
}));

export default function AIArtGeneratorsPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <PageHero
        eyebrow="AI Image Feature"
        title="AI image tools"
        highlight="worth trying first"
        description="Image generation gets messy when people optimize for brand names before actual goals. This guide groups the field into three practical lanes: premium output, low-cost experimentation, and low-friction onboarding."
        metrics={[
          { value: `${aiArtTools.length}`, label: 'Priority tools', hint: 'Covers premium image quality, trial-first platforms, and beginner-friendly picks.' },
          { value: 'Quality / Cost / Learning curve', label: 'Decision lenses', hint: 'These matter more than hype when choosing a visual tool.' },
          { value: 'Cards + table + scenarios', label: 'Page structure', hint: 'Built to remove mismatches quickly.' },
        ]}
        actions={[
          { href: '/tools?category=image', label: 'Open the image directory', tone: 'secondary' },
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
          title="AI image tools worth trying first"
          description="Every card answers the same real-world question: how good is the output, how hard is it to use, and is it worth moving part of your workflow into it?"
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {aiArtToolCards.map((tool) => (
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
                  placement="blog_art_primary_cta"
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
            title="A quick first-pass comparison table"
            description="If you already know whether you care most about quality, cost, or onboarding speed, this table gets you to the right shortlist faster."
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
                {aiArtToolCards.map((tool, index) => (
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
                      {tool.id === 'bing-image-creator' || tool.id === 'dall-e-3'
                        ? 'Low'
                        : tool.id === 'stable-diffusion'
                          ? 'High'
                          : 'Medium'}
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
            title="Choosing by goal is faster than choosing by platform"
            description="Most people do not need more brand research. They need the right tool for the kind of visual output they actually make."
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
            <h2 className="text-3xl font-semibold text-text-primary">If this page is not enough, move into the live directory</h2>
            <p className="mt-4 text-base leading-8 text-text-secondary">
              Keep going through the image directory or jump into tool detail pages when you are ready for a more exact decision.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/tools?category=image"
                className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
              >
                Open the image directory
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
