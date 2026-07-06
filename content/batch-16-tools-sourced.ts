import type { Tool } from '@/types/tool';

export const sourcedBatchToolsRound15: Tool[] = [
  {
    id: 'anysearch',
    name: 'AnySearch',
    slug: 'anysearch',
    description: 'Real-time structured search infrastructure for agents and developers, with API, MCP, and Skill delivery built around cleaner machine-readable results.',
    reason: 'AnySearch takes the top slot because search quality is now one of the clearest bottlenecks in agent reliability, and this launch packages that pain into a simple buyer story with strong distribution hooks.',
    fullReview: `AnySearch is a commercially sharp launch because it reframes search as infrastructure for agents rather than a UI for humans. The core promise is straightforward: instead of sending an agent into noisy public search results and messy HTML, you give it structured answers from trusted sources searched in parallel. That is a meaningful shift for builders who care about provenance, lower retry loops, and better downstream outputs.

The product also lands at the right time. More teams are wiring search into coding, research, sales, and workflow agents, but the weak point is usually not model intelligence alone. It is whether the agent can get current, usable, well-ranked information without wasting tokens on cleanup. AnySearch leans into API, MCP, and Skill distribution from day one, which makes adoption feel native to how agent teams already work.

There are still open questions around long-term defensibility and how much better the product stays once incumbents push harder into agent-ready search. Even so, as a fresh launch built for traffic and monetization, this is exactly the kind of product worth surfacing now: strong narrative, obvious audience, and a free starting point that lowers friction.`,
    category: '数据分析',
    categorySlug: 'data',
    pricingType: 'freemium',
    priceRange: 'Free plan at $0/mo includes 1,000 requests/day; Search Pro is marked coming soon, and Enterprise pricing is custom.',
    website: 'https://www.anysearch.com/',
    features: ['Structured outputs for agents', 'API + MCP + Skill integrations', 'Intent-aware routing across domains', 'Freshness- and authority-based ranking', 'Privacy-first no-telemetry positioning'],
    pros: ['#1 Product Hunt launch on July 6', 'Free tier makes testing easy', 'Agent-native integrations are distribution-friendly', 'Strong fit for search, research, and verification workflows'],
    cons: ['Professional self-serve tier is not fully live yet', 'Benchmark claims still need production validation', 'Best value depends on teams already building agent workflows'],
    alternatives: ['Exa', 'Brave Search API', 'Tavily'],
    editorRating: 4.8,
    difficulty: 3,
    createdAt: '2026-07-06',
    updatedAt: '2026-07-06',
    isFeatured: true,
    isEditorsPick: true,
    reviewSources: [
      {
        source: 'AnySearch homepage',
        url: 'https://anysearch.com/home',
        summary: 'The official site positions AnySearch as privacy-first search infrastructure for AI agents with API, MCP, and Skill support plus structured outputs.'
      },
      {
        source: 'AnySearch pricing',
        url: 'https://anysearch.com/pricing',
        summary: 'The pricing page lists a free $0/month plan with 1,000 requests per day, a coming-soon professional tier, and custom enterprise pricing.'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/products/anysearch',
        summary: 'AnySearch ranked #1 on Product Hunt for July 6, 2026, and was framed as real-time structured search trusted by agents and developers.'
      }
    ],
  },
  {
    id: 'octolens',
    name: 'Octolens',
    slug: 'octolens',
    description: 'AI social listening built for the agent era, covering brand mentions across community, news, code, and social channels with API, webhook, and MCP access.',
    reason: 'Octolens earns a top slot because it turns monitoring into something agents can actually work with, which is a much stronger monetization story than another passive dashboard.',
    fullReview: `Octolens is a good example of what sells in the current agent market: not “AI for marketing” in the abstract, but a concrete workflow with obvious ROI. The product watches places B2B software teams already care about, including Reddit, X, GitHub, Hacker News, newsletters, podcasts, and news, then filters the stream with AI so teams only get the mentions that matter. That is easy to explain, easy to trial, and easy to justify with real budgets.

The interesting part is that Octolens does not stop at alerts. API, webhooks, Slack delivery, and MCP support turn it into an operational input for teams and agents. That gives it a better product story than legacy listening tools that still assume a human will live inside one interface all day. If a team wants brand intelligence to feed sales, support, product, or GTM loops, this packaging makes sense right now.

The main trade-off is price. This is not positioned like a tiny side-tool for hobby projects, and teams will need enough mention volume and response urgency to feel the value quickly. Still, for a discovery site built around high-intent clicks, Octolens is a strong pick because the buyer is clear and the pain is real.`,
    category: '数据分析',
    categorySlug: 'data',
    pricingType: 'paid',
    priceRange: 'Pro starts at $159/mo, Scale at $499/mo, and Enterprise is custom; all plans include API, webhooks, and MCP access, with a 7-day free trial available.',
    website: 'https://octolens.com/',
    features: ['Tracks mentions across social, community, news, and code channels', 'AI relevance scoring, sentiment, and tagging', 'API, webhooks, and MCP server', 'Slack and email alerts', 'Hourly or real-time refresh depending on plan'],
    pros: ['#2 Product Hunt launch on July 6', 'Very clear B2B SaaS buyer story', 'MCP support differentiates it from older listening tools', 'Source coverage is broad and agent-friendly'],
    cons: ['Pricing is high for very small teams', 'Best fit is still B2B software rather than every brand', 'Teams may need tuning before relevance scores feel perfect'],
    alternatives: ['Brand24', 'Mention', 'Google Alerts'],
    editorRating: 4.7,
    difficulty: 2,
    createdAt: '2026-07-06',
    updatedAt: '2026-07-06',
    isFeatured: true,
    isEditorsPick: true,
    reviewSources: [
      {
        source: 'Octolens pricing',
        url: 'https://octolens.com/pricing',
        summary: 'The official pricing page shows Pro at $159 per month, Scale at $499 per month, API/webhooks/MCP on every plan, and a 7-day free trial.'
      },
      {
        source: 'Octolens homepage',
        url: 'https://octolens.com/',
        summary: 'The site frames Octolens as the AI social listening tool for the agent era and highlights monitoring plus workflow integration.'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/products/octolens-ai',
        summary: 'Product Hunt ranked Octolens #2 on July 6, 2026, and described it as social listening for the agent era.'
      }
    ],
  },
  {
    id: 'typeahead',
    name: 'Typeahead',
    slug: 'typeahead',
    description: 'System-wide AI autocomplete for macOS that runs locally and works across the apps where you already type.',
    reason: 'Typeahead makes the batch because it solves a consumer productivity pain with a dead-simple promise people can understand in one sentence, which is exactly the kind of launch that can pull organic traffic.',
    fullReview: `Typeahead stands out because the value proposition is instantly legible: autocomplete for every app on your Mac, not just one editor or one document surface. That makes it a much easier product to explain than many “AI assistant” launches, and simple products with clear before-and-after stories often travel well in search and social.

The privacy angle matters too. The official positioning leans hard on local execution, no servers, and no telemetry, which gives it an attractive wedge against cloud-first writing helpers. The one-time purchase also helps. Plenty of productivity buyers are happy to try a $79 Mac utility if the benefit shows up every day and the subscription treadmill disappears.

The limitation is scope. This is a Mac-first typing accelerator, not a full knowledge or workflow platform, so it will appeal most to users who write all day and care about speed. But that focus is also why it has traffic potential: the use case is concrete, the page can rank for clear intent, and the conversion story is tight.`,
    category: '效率工具',
    categorySlug: 'productivity',
    pricingType: 'paid',
    priceRange: '$79 one-time with no subscription.',
    website: 'https://www.typeahead.ai/',
    features: ['Works across Mac apps, not just one editor', 'Runs locally on macOS', 'Inline autocomplete with tab acceptance', 'Learns your writing style over time', 'Built and optimized for Apple Silicon'],
    pros: ['#3 Product Hunt launch on July 6', 'Consumer value proposition is instantly clear', 'Local privacy is easy to market', 'One-time pricing lowers purchase friction'],
    cons: ['Mac-only product', 'Narrower than a full writing assistant', 'Best value depends on typing-heavy daily workflows'],
    alternatives: ['Wispr Flow', 'Apple Writing Tools', 'Grammarly'],
    editorRating: 4.6,
    difficulty: 1,
    createdAt: '2026-07-06',
    updatedAt: '2026-07-06',
    isFeatured: true,
    isEditorsPick: true,
    reviewSources: [
      {
        source: 'Typeahead homepage',
        url: 'https://www.typeahead.ai/',
        summary: 'The official site says Typeahead finishes your sentences across every app on your Mac, runs locally, and keeps your words on-device.'
      },
      {
        source: 'Typeahead pricing',
        url: 'https://www.typeahead.ai/',
        summary: 'The homepage presents Typeahead as a $79 purchase with no subscription.'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/products/typeahead',
        summary: 'Product Hunt ranked Typeahead 2.0 #3 on July 6, 2026, and positioned it as private AI autocomplete for every app on your Mac.'
      }
    ],
  },
  {
    id: 'edgee',
    name: 'Edgee',
    slug: 'edgee',
    description: 'AI gateway for coding assistants that compresses tokens, routes across models, and adds observability for Claude Code, Codex, Cursor, Copilot, and similar tools.',
    reason: 'Edgee belongs in the batch because coding-agent bills and reliability are becoming a real budget problem, and this launch sells a very legible fix: keep the same agent, spend less, and avoid downtime.',
    fullReview: `Edgee is commercially interesting because it is not asking developers to switch coding agents. It is inserting itself between the agent and the model provider to lower token costs, route requests across models, and keep work moving when providers fail or limits hit. That is an easy value story to understand, especially now that many teams are using Claude Code, Codex, Cursor, and Copilot more heavily than they did even a few months ago.

The product packaging is also strong. There is a free solo tier, a $29 per developer team tier, built-in token compression, BYOK, fallback models, and per-repo or per-PR attribution. In other words, Edgee turns a messy mix of cost, routing, and observability concerns into one gateway story. That gives it a better monetization angle than tools that optimize only one narrow slice of the agent stack.

The trade-off is that the value scales with agent usage. If a team barely touches coding agents, the ROI story is weaker. But for developer-heavy audiences and traffic capture around coding tools, Edgee is exactly the kind of launch worth surfacing because the pain is concrete and the spend is real.`,
    category: 'AI编程',
    categorySlug: 'code',
    pricingType: 'freemium',
    priceRange: 'Free for solo developers; Team starts at $29/developer/mo; Enterprise is custom.',
    website: 'https://www.edgee.ai/',
    features: ['Token compression for coding-agent traffic', 'Routing and failover across model providers', 'Works with Claude Code, Codex, Cursor, Copilot, and more', 'BYOK without markup', 'Usage, session, repo, and PR observability'],
    pros: ['Clear ROI for heavy coding-agent users', 'Free starting point reduces adoption friction', 'Fits directly into current developer workflows', 'Observability plus routing makes it easier to justify budget'],
    cons: ['Value depends on already having meaningful coding-agent spend', 'Infra positioning is less approachable for casual users', 'Some teams may only need one piece of the stack, not the full gateway'],
    alternatives: ['Portkey', 'Helicone', 'OpenRouter'],
    editorRating: 4.7,
    difficulty: 3,
    createdAt: '2026-07-06',
    updatedAt: '2026-07-06',
    isFeatured: true,
    isEditorsPick: true,
    reviewSources: [
      {
        source: 'Edgee pricing',
        url: 'https://www.edgee.ai/pricing',
        summary: 'The official pricing page shows a free solo tier, a Team tier at $29 per developer per month, and a custom Enterprise tier.'
      },
      {
        source: 'Edgee homepage',
        url: 'https://www.edgee.ai/',
        summary: 'The site positions Edgee as an agent gateway for Claude Code, Codex, Copilot, OpenCode, and Cursor with compression, routing, and observability.'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/products/edgee',
        summary: 'The July 6 Product Hunt launch focused on Edgee Claude Code Compressor V2 and described a drop-in way to cut coding-agent token costs.'
      }
    ],
  },
  {
    id: 'needle',
    name: 'Needle',
    slug: 'needle',
    description: 'Proactive GTM agent for Slack and Teams that watches pipeline risk, drafts follow-ups, keeps CRM data clean, and works through your existing permissions.',
    reason: 'Needle stays in the fresh-launch rotation because revenue teams pay for concrete, proactive help much faster than they pay for vague copilots, and the product packaging is unusually clear.',
    fullReview: `Needle stands out because it sells AI through revenue outcomes instead of generic productivity language. The product watches your pipeline, flags stalled deals, drafts follow-ups, prepares call context, and keeps CRM data clean — all from inside Slack or Teams. That is a much stronger buyer story than “chat with your data” because the before-and-after is obvious and tied to real money.

The pricing and model strategy are also more explicit than a lot of sales-agent launches. Needle offers a free trial, a paid plan per agent, support for frontier models, your own keys when you want them, and credit-based scaling. For teams already spending on CRM, outbound tooling, and RevOps overhead, that framing makes the product feel more buyable than another abstract agent demo.

The limitation is focus. This is built for GTM teams, not a universal assistant, and the paid entry point is serious enough that tiny startups will think twice. Even so, for a traffic-and-conversion-minded directory, Needle is a strong inclusion because it lives in a high-intent budget category and tells a crisp story.`,
    category: '效率工具',
    categorySlug: 'productivity',
    pricingType: 'freemium',
    priceRange: 'Free 1-week trial; Needle Pro starts at $199/agent/mo with 20,000 credits; Enterprise pricing is custom.',
    website: 'https://needle.app/',
    features: ['Lives inside Slack and Teams', 'Proactively flags stalled deals and next actions', 'Connects to CRM, email, calendar, and call tools', 'Supports frontier models plus BYOK', 'Acts through the user’s existing permissions'],
    pros: ['Strong revenue-team buyer story', 'Not-another-dashboard positioning is compelling', 'Slack-native workflow lowers behavior change', 'Pricing and model packaging are unusually clear'],
    cons: ['Focused on GTM teams rather than general users', 'Paid plan is expensive for tiny teams', 'Value depends on having enough pipeline volume and integrations'],
    alternatives: ['Salesforce Agentforce', 'Common Room', 'HubSpot Breeze'],
    editorRating: 4.7,
    difficulty: 3,
    createdAt: '2026-07-06',
    updatedAt: '2026-07-06',
    isFeatured: true,
    reviewSources: [
      {
        source: 'Needle homepage',
        url: 'https://needle.app/',
        summary: 'The official site frames Needle as a proactive GTM agent inside Slack and Teams that acts through your permissions and existing tools.'
      },
      {
        source: 'Needle pricing',
        url: 'https://needle.app/pricing',
        summary: 'The pricing page lists a free one-week trial and a Needle Pro plan at $199 per agent per month with 20,000 credits.'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/products/needle-3',
        summary: 'Product Hunt ranked Needle #3 on July 2, 2026, and described it as the proactive GTM agent in Slack and Teams.'
      }
    ],
  },
];

export default sourcedBatchToolsRound15;
