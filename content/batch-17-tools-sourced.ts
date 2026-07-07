import type { Tool } from '@/types/tool';

export const sourcedBatchToolsRound16: Tool[] = [
  {
    id: 'scribble-network',
    name: 'Scribble Network',
    slug: 'scribble-network',
    description: 'AI visibility platform that helps brands measure where they are missing in answer engines, then close those citation gaps with creator-led distribution.',
    reason: 'Scribble takes the top spot because it sits exactly at the traffic-to-revenue layer: if brands now care about being cited by ChatGPT, Gemini, Perplexity, Copilot, and Grok, this is a budget line with obvious urgency.',
    fullReview: `Scribble Network is commercially sharp because it does not pitch vague “AI marketing.” It frames the problem around a painful shift brands already feel: traffic is being rerouted from search results to AI answers, and most teams have no clear view of whether they are being cited, ignored, or misrepresented. That makes the value proposition legible in one sentence and immediately relevant to teams that already spend on SEO, content, and growth.

The product packaging is also strong. Scribble audits brand visibility across major answer engines, turns the gaps into concrete prompts and citation opportunities, then pairs that with creator-led distribution so the fix is not just another dashboard. This makes it easier to justify than analytics-only tools because the product connects diagnosis to action and to distribution.

For this directory’s goals, Scribble is exactly the kind of launch worth surfacing: the buyer is clear, the category is hot, the search intent is rising, and the monetization path is direct. The main caveat is that brands still need patience and execution discipline; AI discoverability is not a one-click channel. But as a launch story built around traffic, attribution, and conversion, it is one of the strongest fresh picks today.`,
    category: '数据分析',
    categorySlug: 'data',
    pricingType: 'paid',
    priceRange: 'Basic starts at $99/mo; higher tiers and enterprise support scale from there.',
    website: 'https://scribble.network/',
    features: ['Tracks brand visibility across major AI answer engines', 'Finds citation gaps and missed prompts', 'Turns gaps into creator bounties and content distribution', 'Measures mention share and citation share by model', 'Built around GEO and AI-discoverability workflows'],
    pros: ['#2 Product Hunt launch on July 7', 'Very direct traffic and monetization story', 'Combines analytics with execution, not just reporting', 'Pricing is easy for growth teams to trial'],
    cons: ['Best fit is B2B brands already investing in content', 'Results still depend on execution quality and time', 'Category language may feel new to teams still thinking only in SEO'],
    alternatives: ['Profound', 'AthenaHQ', 'Semrush'],
    editorRating: 4.9,
    difficulty: 2,
    createdAt: '2026-07-07',
    updatedAt: '2026-07-07',
    isFeatured: true,
    isEditorsPick: true,
    reviewSources: [
      {
        source: 'Scribble homepage',
        url: 'https://scribble.network/',
        summary: 'The official site positions Scribble as an AI visibility platform that audits brand discoverability and turns citation gaps into creator-powered distribution.'
      },
      {
        source: 'Scribble pricing',
        url: 'https://scribble.network/pricing',
        summary: 'The pricing page lists Basic at $99 per month for small companies monitoring AI search visibility, with larger plans above it.'
      },
      {
        source: 'Product Hunt daily leaderboard',
        url: 'https://www.producthunt.com/leaderboard/daily/2026/7/7?ref=header_nav',
        summary: 'Product Hunt ranked Scribble Network #2 on July 7, 2026 with the positioning “The product that makes AI recommend your brand.”'
      }
    ],
  },
  {
    id: 'katalyst',
    name: 'Katalyst',
    slug: 'katalyst',
    description: 'AI sales agent for Salesforce teams that turns calls, emails, and signals into CRM updates, next steps, and account plans.',
    reason: 'Katalyst earns a front-row slot because it sells directly into revenue teams with a simple promise: less CRM drag, more pipeline movement, and better follow-up without another tab jungle.',
    fullReview: `Katalyst is one of the clearest high-intent launches in this cohort because it is tied to a real budget owner and a familiar pain. Sales teams on Salesforce already know the tax of manual CRM hygiene, weak follow-up, stale records, and lost context between calls. Katalyst packages that mess into a sharper story: every customer interaction becomes updated pipeline data, guided next steps, and meeting prep without the rep having to do all the admin work.

That buyer story matters. Compared with more generic agent launches, Katalyst maps directly to revenue operations and to measurable sales productivity. The product also goes beyond note-taking: it handles signal detection, account planning, and workflow nudging. That makes it more defensible and more budgetable than a thin “AI call recap” layer.

From a discovery perspective, it fits the site’s money-first objective well. Salesforce-native tooling is a strong search and comparison wedge, and the promise is specific enough to convert curiosity into demos. The trade-off is that the product is clearly designed for organized sales teams rather than solo founders. Still, as a traffic and monetization candidate, Katalyst is a strong fresh addition.`,
    category: '效率工具',
    categorySlug: 'productivity',
    pricingType: 'freemium',
    priceRange: 'Start free; production pricing is sales-led and demo-based.',
    website: 'https://www.joinkatalyst.com/',
    features: ['Auto-updates Salesforce from calls, notes, emails, and calendar activity', 'Drafts next steps and follow-ups', 'Surfaces buying signals and deal risks', 'Builds contextual account plans for reps', 'Designed for enterprise sales workflows'],
    pros: ['#3 Product Hunt launch on July 7', 'Very clear revenue-team buyer', 'Strong Salesforce-native positioning', 'Closer to workflow execution than passive meeting summaries'],
    cons: ['Best fit is teams already on Salesforce', 'Pricing is not transparently self-serve at scale', 'Less useful for tiny teams without structured sales ops'],
    alternatives: ['Salesforce Agentforce', 'Scratchpad', 'Attention'],
    editorRating: 4.8,
    difficulty: 3,
    createdAt: '2026-07-07',
    updatedAt: '2026-07-07',
    isFeatured: true,
    isEditorsPick: true,
    reviewSources: [
      {
        source: 'Katalyst homepage',
        url: 'https://www.joinkatalyst.com/',
        summary: 'The official site positions Katalyst as an AI sales agent for Salesforce that turns calls, emails, and signals into updates, next steps, and account plans.'
      },
      {
        source: 'Katalyst pricing/contact flow',
        url: 'https://www.joinkatalyst.com/pricing/basic',
        summary: 'The pricing flow emphasizes starting free, demos, and sales contact rather than exposing a simple public per-seat tier.'
      },
      {
        source: 'Product Hunt daily leaderboard',
        url: 'https://www.producthunt.com/leaderboard/daily/2026/7/7?ref=header_nav',
        summary: 'Product Hunt ranked Katalyst #3 on July 7, 2026 with the line “The AI agent that works your Salesforce Pipeline.”'
      }
    ],
  },
  {
    id: 'mira',
    name: 'Mira',
    slug: 'mira',
    description: 'AI moderator for qualitative research that adapts questions in real time and reads emotional cues across large interview cohorts.',
    reason: 'Mira makes the batch because research budgets are real, the value story is concrete, and the product goes beyond “AI survey” into a faster research ops replacement with strong enterprise upside.',
    fullReview: `Mira stands out because it aims at a real workflow bottleneck inside research, insights, and product teams: moderated qualitative work is valuable, but it is slow, expensive, and hard to scale across markets. The official pitch is stronger than a generic feedback bot. Mira adapts the interview in real time, reads emotional cues, and produces insights quickly enough to change how teams think about discovery cycles.

The free tier is important. It lowers the barrier for teams to test the format without a demo-first sales loop, while the broader platform still points toward bigger enterprise motion through multilingual research, large participant pools, and panel access. That gives Mira a better path from curiosity to expansion than tools that only sell on novelty.

For the directory, this is a strong discovery candidate because it sits in a category buyers will actively compare: user research, concept testing, UX discovery, and insight generation. The caveat is trust. Some teams will still want humans in the loop for sensitive or executive research. But as a fresh launch with clear budget potential and cross-functional appeal, Mira deserves the surface area.`,
    category: '数据分析',
    categorySlug: 'data',
    pricingType: 'freemium',
    priceRange: 'Fully self-serve free tier; larger panel and enterprise research plans are sales-led.',
    website: 'https://www.entropik.io/platform/ai-moderator',
    features: ['Runs AI-moderated interviews at scale', 'Adapts questions in real time based on responses', 'Reads facial, voice, and language cues', 'Supports 70+ languages and markets', 'Generates summaries, themes, and highlight clips automatically'],
    pros: ['#5 Product Hunt launch on July 7', 'Free tier makes adoption easier', 'Clear buyer story for research and product teams', 'More differentiated than basic AI survey tooling'],
    cons: ['Some teams will still prefer human moderation for sensitive work', 'Branding is tied to a broader research platform, not only one lightweight product', 'Best value appears when teams already run recurring qualitative research'],
    alternatives: ['Outset', 'Discuss', 'Dovetail'],
    editorRating: 4.7,
    difficulty: 3,
    createdAt: '2026-07-07',
    updatedAt: '2026-07-07',
    isFeatured: true,
    isEditorsPick: false,
    reviewSources: [
      {
        source: 'Mira official page',
        url: 'https://www.entropik.io/platform/ai-moderator',
        summary: 'The official page says Mira can run hundreds of interviews simultaneously across 70+ languages and includes a fully self-serve free tier.'
      },
      {
        source: 'Entropik research resources',
        url: 'https://www.entropik.io/resources/blog-articles/ux-army-alternative',
        summary: 'Entropik materials describe broader participant access across 120 countries and position the product for scaled research programs.'
      },
      {
        source: 'Product Hunt daily leaderboard',
        url: 'https://www.producthunt.com/leaderboard/daily/2026/7/7?ref=header_nav',
        summary: 'Product Hunt ranked Mira #5 on July 7, 2026 with the positioning “AI moderated interviews that read how people feel.”'
      }
    ],
  },
  {
    id: 'ai-emaily',
    name: 'AI Emaily',
    slug: 'ai-emaily',
    description: 'AI-native inbox that triages mail, drafts in your voice, schedules, and can progress from manual help to bounded autopilot.',
    reason: 'AI Emaily belongs here because inbox pain is universal, the product story is easy to understand, and the free-to-paid path is tighter than many “AI assistant” launches.',
    fullReview: `AI Emaily is one of the better consumer-to-pro launches in this group because it focuses on a problem people already feel every day: the inbox is still where too many workflows stall. Instead of stopping at drafting, the product pushes toward controlled autonomy — triage, brand-voice replies, scheduling, and follow-up — while keeping approval and auditability in the story. That is a clearer wedge than yet another “write better email” tool.

The commercial packaging is strong too. It works across multiple providers rather than only Gmail, starts free, and has visible upgrade paths that still feel reachable for founders, investors, and operators. This gives it both search appeal and conversion appeal, which is exactly what the directory should care about.

The main risk is competition. Email is crowded, and trust is fragile when a tool starts acting on your behalf. But the product has enough specificity around authority modes, provider coverage, and autonomous workflows to feel meaningfully differentiated. For traffic plus monetization, it is a very usable launch.`,
    category: '效率工具',
    categorySlug: 'productivity',
    pricingType: 'freemium',
    priceRange: 'Free plan forever; Pro starts at $17.99/mo and Team at $22.99/seat annually.',
    website: 'https://aiemaily.com/',
    features: ['Unified inbox across Gmail, Outlook, iCloud, Proton, Fastmail, and IMAP', 'Drafts in your voice with manual, copilot, and autopilot modes', 'Auto-triage, scheduling, and follow-up workflows', 'Undo and audit trail for autonomous actions', 'Works across web, macOS, iOS, and planned Android support'],
    pros: ['#6 Product Hunt launch on July 7', 'Simple problem with large audience and real willingness to pay', 'Free plan lowers testing friction', 'More action-oriented than draft-only AI email tools'],
    cons: ['Trust hurdle is higher once automation touches real email', 'Competitive market with many inbox incumbents', 'Best value shows up for heavy inbox users, not everyone'],
    alternatives: ['Superhuman', 'Shortwave', 'Fyxer'],
    editorRating: 4.7,
    difficulty: 2,
    createdAt: '2026-07-07',
    updatedAt: '2026-07-07',
    isFeatured: true,
    isEditorsPick: true,
    reviewSources: [
      {
        source: 'AI Emaily homepage',
        url: 'https://aiemaily.com/',
        summary: 'The official site positions AI Emaily as a unified AI inbox with copilot and autopilot modes, free plan forever, and multi-provider support.'
      },
      {
        source: 'AI Emaily official comparison/pricing content',
        url: 'https://aiemaily.com/blog/ai-email-platforms-compared',
        summary: 'Official comparison content describes the product as starting free with paid upgrades such as Pro and Team tiers.'
      },
      {
        source: 'Product Hunt daily leaderboard',
        url: 'https://www.producthunt.com/leaderboard/daily/2026/7/7?ref=header_nav',
        summary: 'Product Hunt ranked AI Emaily #6 on July 7, 2026 and described it as “Your AI inbox that writes like you + replies on autopilot.”'
      }
    ],
  },
  {
    id: 'ogment-ai',
    name: 'Ogment AI',
    slug: 'ogment-ai',
    description: 'Slack-native AI coworker that can answer questions, run tasks, connect tools, and share memory across a whole workspace.',
    reason: 'Ogment AI makes the cut because it packages the “AI for the whole team” story in a place people already work, which is easier to adopt and easier to monetize than standalone chat tabs.',
    fullReview: `Ogment AI gets interesting where many team-assistant products fail: it lives inside Slack and treats the agent like a coworker rather than another destination app. That matters because adoption is often the hardest part of workplace AI. If a tool stays in a separate dashboard, it becomes a demo. If it shows up in the place where work already happens, it has a better chance of becoming habit.

The commercial story is also unusually legible. One workspace plan covers the team, connectors are already managed, credits make the cost model understandable, and the site explains the difference between simple, standard, and complex tasks. This is a stronger monetization wrapper than vague “seat plus usage” messaging.

For this directory, Ogment is worth surfacing because it plays at the intersection of agent automation, Slack-native workflows, and org-wide productivity. The main caveat is that teams still need trust and governance before they let an agent touch business tools. But the distribution logic is good, the price anchor is visible, and the workflow story is concrete.`,
    category: '效率工具',
    categorySlug: 'productivity',
    pricingType: 'freemium',
    priceRange: '$100 free credit with no card; paid plans start at $50/mo and scale up to enterprise tiers.',
    website: 'https://www.ogment.ai/',
    features: ['Slack-native AI coworker triggered by tagging @O', 'Connects to 1,000+ tools and custom APIs', 'Shared memory and skill library for the workspace', 'Scheduled and event-triggered automations', 'Credit-based pricing with unlimited Slack users on workspace plans'],
    pros: ['#9 Product Hunt launch on July 7', 'Slack-native distribution reduces habit change', 'Pricing and free credits are easy to understand', 'Workspace-wide model is commercially stronger than one-off side assistants'],
    cons: ['Value depends on teams already coordinating work in Slack', 'Governance and trust are still a buying hurdle', 'Credit-based systems can be less intuitive than flat SaaS pricing for some buyers'],
    alternatives: ['Claude Tag', 'n8n', 'ChatGPT Team'],
    editorRating: 4.6,
    difficulty: 3,
    createdAt: '2026-07-07',
    updatedAt: '2026-07-07',
    isFeatured: true,
    isEditorsPick: true,
    reviewSources: [
      {
        source: 'Ogment homepage',
        url: 'https://www.ogment.ai/',
        summary: 'The official site positions Ogment as a Slack-native AI coworker with 1,000+ integrations, workspace memory, and $100 free credits with no card required.'
      },
      {
        source: 'Ogment pricing section',
        url: 'https://www.ogment.ai/',
        summary: 'The same page shows paid plans starting at $50 per month with 3,750 credits and notes pricing can scale to larger enterprise tiers.'
      },
      {
        source: 'Product Hunt daily leaderboard',
        url: 'https://www.producthunt.com/leaderboard/daily/2026/7/7?ref=header_nav',
        summary: 'Product Hunt ranked Ogment AI #9 on July 7, 2026 with the line “Your AI coworker, in Slack. Just tag @O.”'
      }
    ],
  },
];

export default sourcedBatchToolsRound16;
