import type { Tool } from '@/types/tool';

export const sourcedBatchToolsRound12: Tool[] = [
  {
    id: 'modelence',
    name: 'Modelence App Builder',
    slug: 'modelence',
    description: 'AI app builder that turns a prompt into a production-ready full-stack app with auth, database, deployment, and code ownership.',
    reason: 'Modelence is worth surfacing because it pushes the “build with AI” category closer to real production software instead of landing on disposable demos.',
    fullReview:
      'Modelence matters because it positions AI app building as an operations shortcut, not a toy. You describe what you want, and it generates the frontend, backend, database, and authentication in one pass, with deployment included. That makes it especially relevant for founders, operators, and product teams who want to validate or ship quickly without assembling five separate services.\n\nThe strongest part of the pitch is that it keeps talking about production, ownership, and maintainability instead of only speed. That is commercially important. The AI app-builder market is crowded, but the real buyer question is whether the result can handle users, not whether it can produce a flashy first screen. Modelence is trying to answer that harder question directly.\n\nThe trade-off is that products in this category still need human judgment around architecture, edge cases, and long-term code quality. But as a launch surface for serious MVPs and internal tools, Modelence looks like one of the more monetizable entries in the prompt-to-app wave.',
    category: 'AI编程',
    categorySlug: 'code',
    pricingType: 'freemium',
    priceRange: 'Free plan includes $5 of builder usage; Starter $20/mo; Pro $100/mo; enterprise pricing is custom.',
    website: 'https://modelence.com/',
    features: ['Prompt-to-full-stack generation', 'Built-in auth and database', 'One-click production deploys', 'Own and inspect the code', 'Monitoring and scaling on the same platform'],
    pros: ['Closer to production than demo-only builders', 'Good fit for founders and product teams', 'Clear code ownership story', 'Strong buyer intent around shipping real apps'],
    cons: ['Serious apps still need technical review', 'Ongoing infra costs matter once usage grows', 'Less ideal for teams with highly opinionated existing stacks'],
    alternatives: ['Lovable', 'Bolt.new', 'Replit'],
    editorRating: 4.8,
    difficulty: 2,
    createdAt: '2026-07-03',
    updatedAt: '2026-07-03',
    isFeatured: true,
    isEditorsPick: true,
    reviewSources: [
      {
        source: 'Modelence homepage',
        url: 'https://modelence.com/',
        summary: 'Modelence frames itself as a way to generate a full-stack app from a prompt with auth, database, deploys, and code ownership built in.'
      },
      {
        source: 'Modelence pricing',
        url: 'https://modelence.com/pricing',
        summary: 'The pricing page confirms there is a free plan plus Starter and Pro tiers, which makes it easier to test before committing to production usage.'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/products/modelence-app-builder',
        summary: 'Product Hunt positioned the latest Modelence launch as a production-ready AI app builder, which matches the current market demand around shipping software with AI.'
      }
    ],
  },
  {
    id: 'tabstack',
    name: 'Tabstack',
    slug: 'tabstack',
    description: 'Mozilla-backed web data and browser automation API for extraction, cited research, and live task execution in one stack.',
    reason: 'Tabstack fits the current agent market because it removes the browser orchestration tax that slows down research, enrichment, and workflow products.',
    fullReview:
      'Tabstack stands out because it treats the live web as infrastructure. Instead of forcing teams to maintain their own mix of browser runners, extraction logic, schema enforcement, and research tooling, it gives them one API surface for structured extraction, cited answers, and browser automation. That is exactly the kind of operational simplification dev teams will pay for.\n\nThe product is especially strong for builders shipping internal research tools, enrichment flows, checkout agents, or agentic products that need to act on third-party websites. Mozilla backing also gives it a trust angle that many web-agent products lack. Privacy, data handling, and publisher-respect messaging are part of the pitch rather than an afterthought.\n\nThe trade-off is that browser automation categories always have reliability pressure. The sites change, flows break, and costs compound when agents do more. Even so, Tabstack looks like one of the more commercially credible picks in the current browser-automation and AI infrastructure wave.',
    category: 'AI编程',
    categorySlug: 'code',
    pricingType: 'freemium',
    priceRange: '10,000 free credits to start; pay-as-you-go on Individual; Team $99/mo; Pro $499/mo; enterprise pricing is custom.',
    website: 'https://tabstack.ai/',
    features: ['Structured web extraction', 'Cited research endpoint', 'Browser automation without hosting browsers', 'TypeScript and Python SDKs', 'Mozilla-backed privacy posture'],
    pros: ['Clear fit for agent builders', 'Strong trust story versus generic scraping stacks', 'Useful across extraction, research, and automation', 'Pricing starts light enough for experimentation'],
    cons: ['Browser workflows always face reliability drift', 'Usage costs can scale with heavy automation', 'Best fit is still fairly technical'],
    alternatives: ['Firecrawl', 'Browserbase', 'Airtop'],
    editorRating: 4.7,
    difficulty: 3,
    createdAt: '2026-07-03',
    updatedAt: '2026-07-03',
    isFeatured: true,
    isEditorsPick: true,
    reviewSources: [
      {
        source: 'Tabstack homepage',
        url: 'https://tabstack.ai/',
        summary: 'Tabstack presents a single managed API for extraction, research, and automation, which is the core reason it belongs in a high-intent developer shortlist.'
      },
      {
        source: 'Tabstack pricing',
        url: 'https://tabstack.ai/pricing',
        summary: 'The pricing surface confirms a real freemium entry, monthly team plans, and explicit credit economics for production workloads.'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/products/tabstack',
        summary: 'Product Hunt recently featured Tabstack Browser Automation, reinforcing that it is getting current launch attention rather than relying on older buzz.'
      }
    ],
  },
  {
    id: 'acti',
    name: 'Acti',
    slug: 'acti',
    description: 'Mobile-first agentic keyboard that turns typing or voice into links, lookups, workflows, and reusable actions without app switching.',
    reason: 'Acti is a fresh consumer-facing angle on AI utility because it aims to own the text field itself instead of asking users to bounce into another assistant app.',
    fullReview:
      'Acti feels important because it reframes the keyboard as an action layer. A lot of mobile AI products still live as destinations: open the app, ask the question, copy the result, go back to where you were. Acti tries to compress that loop by staying in the text field and turning the intent into something useful right there.\n\nThat is a strong distribution idea. If it works well, it can spread through daily behaviors like messaging, search, scheduling, location sharing, and quick workflow triggers. The broader opportunity is that AI dictation and AI keyboard products are now trending, but most still stop at rewriting or tone adjustment. Acti is trying to move one step higher into execution.\n\nThe risk is trust and consistency. Mobile users are ruthless when a keyboard slows them down, misfires, or gets in the way. But from a discovery and traffic standpoint, Acti is a credible new product to watch because the value proposition is immediately understandable and easy to test.',
    category: '效率工具',
    categorySlug: 'productivity',
    pricingType: 'freemium',
    priceRange: 'Free to download on iOS and Android; check the current mobile app listings for the latest premium pricing or add-ons.',
    website: 'https://openacti.com/',
    features: ['Agentic keyboard layer', 'Cross-app commands', 'Skill builder for reusable actions', 'Voice and typing entry points', 'Mobile workflow shortcuts'],
    pros: ['Very legible consumer value proposition', 'Could spread through existing typing habits', 'More action-oriented than basic rewrite keyboards', 'Strong freshness signal from current launch coverage'],
    cons: ['Keyboard products fail fast if latency slips', 'Trust can drop quickly when actions misfire', 'Long-term monetization depends on retention, not novelty'],
    alternatives: ['Wispr Flow', 'Superwhisper', 'Raycast'],
    editorRating: 4.6,
    difficulty: 1,
    createdAt: '2026-07-03',
    updatedAt: '2026-07-03',
    isFeatured: true,
    reviewSources: [
      {
        source: 'Acti homepage',
        url: 'https://openacti.com/',
        summary: 'Acti describes itself as the first agentic keyboard and shows concrete flows like location sharing, restaurant lookup, and sports schedules.'
      },
      {
        source: 'TechCrunch',
        url: 'https://techcrunch.com/2026/06/30/acti-puts-ai-agents-directly-into-your-smartphone-keyboard/',
        summary: 'TechCrunch highlighted the product as a new attempt to make the smartphone keyboard the home for AI assistants.'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/products/acti-2',
        summary: 'Product Hunt recently surfaced Acti as an agentic keyboard for mobile commands and search, which matches its current distribution story.'
      }
    ],
  },
  {
    id: 'adam-cad-copilot',
    name: 'Adam CAD Copilot',
    slug: 'adam-cad-copilot',
    description: 'AI CAD copilot for Onshape and Autodesk Fusion, built around prompt-driven edits, geometry context, and cleaner feature trees.',
    reason: 'Adam is a strong vertical pick because AI CAD buyers tend to have real budgets, clear pain, and far less patience for gimmicks than generic consumer AI users.',
    fullReview:
      'Adam is compelling because it targets a workflow where mistakes are expensive and iteration speed matters. Mechanical engineers and hardware teams do not need another generic image generator; they need help inside the CAD tools where actual design work happens. Adam leans into that by grounding its copilot around prompts, selected geometry, feature trees, and parametrized cleanup.\n\nThat makes the product commercially attractive. Vertical AI is often easier to monetize when the pain is concrete, the buyer is identifiable, and the return on time saved is obvious. Adam fits that pattern. It is not trying to win a vague “creative AI” market. It is trying to become useful to teams building real parts and revising real models.\n\nThe challenge is that domain credibility has to stay high. Engineers will not keep using a CAD copilot that produces messy geometry or weak design logic. Still, as an AI tool directory pick, Adam earns placement because it brings fresh, high-intent traffic from a category that is finally becoming productized.',
    category: '设计助手',
    categorySlug: 'design',
    pricingType: 'freemium',
    priceRange: 'Adam offers a free starting flow, with deeper team access and onboarding handled through the product and sales process.',
    website: 'https://adam.new/copilot',
    features: ['Prompt-driven CAD edits', 'Selected-geometry context', 'Feature tree optimization', 'Parametrization cleanup', 'Native flows for Onshape and Fusion'],
    pros: ['Clear enterprise and pro-user value', 'Strong vertical focus', 'Fits real hardware workflows instead of generic creation', 'High-value niche with less commodity pressure'],
    cons: ['Must earn trust on technical accuracy', 'Best fit is narrow by design', 'Some teams will still prefer fully manual control'],
    alternatives: ['CADAM', 'Zoo', 'Autodesk Fusion'],
    editorRating: 4.7,
    difficulty: 3,
    createdAt: '2026-07-03',
    updatedAt: '2026-07-03',
    isFeatured: true,
    isEditorsPick: true,
    reviewSources: [
      {
        source: 'Adam Copilot',
        url: 'https://adam.new/copilot',
        summary: 'The product page makes the positioning explicit: AI CAD help inside Onshape and Fusion, with editable results and feature-tree awareness.'
      },
      {
        source: 'Y Combinator',
        url: 'https://www.ycombinator.com/companies/adam',
        summary: 'YC describes Adam as AI-powered CAD for faster engineering work, which reinforces the seriousness of the hardware design angle.'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/products/adam-cad-copilot',
        summary: 'The latest Product Hunt launch gives Adam an additional freshness signal right as AI CAD workflows are getting more visible.'
      }
    ],
  },
  {
    id: 'mailadept',
    name: 'MailAdept',
    slug: 'mailadept',
    description: 'Subscription email deliverability service that combines AI agents and human experts to audit, fix, and monitor revenue-critical email infrastructure.',
    reason: 'MailAdept aligns well with the site’s monetization lens because it sits directly on a pain point that costs teams pipeline, replies, and revenue when it breaks.',
    fullReview:
      'MailAdept is interesting because it treats email deliverability as an operational function, not just a diagnostics dashboard. The pitch is simple: if your marketing, outbound, or transactional email is landing in spam, you lose money long before someone notices. MailAdept joins the team, audits the setup, fixes the infrastructure, and keeps watching it.\n\nThat makes it a high-intent B2B pick. Deliverability is painful, technical, and usually badly handled until it becomes urgent. Products that reduce that pain can monetize well because the ROI is direct. The service framing also distinguishes it from “here is another analytics tool” offerings that stop at showing you a problem.\n\nThe downside is that it is closer to a hybrid service product than a pure self-serve SaaS. Some visitors will want software they can poke at alone. But for a revenue-minded AI tools directory, MailAdept deserves attention because it connects AI to a concrete growth bottleneck teams will actually pay to solve.',
    category: '效率工具',
    categorySlug: 'productivity',
    pricingType: 'paid',
    priceRange: 'Custom subscription pricing with a free deliverability audit and sales-led onboarding.',
    website: 'https://www.mailadept.com/',
    features: ['Deliverability audits', 'Infrastructure fixes', 'Daily monitoring', 'Inbox placement improvement', 'Hybrid AI plus expert execution'],
    pros: ['Directly tied to revenue outcomes', 'Clear problem-solution fit for B2B teams', 'More operational than dashboard-only tools', 'Strong monetization intent'],
    cons: ['Less self-serve than typical SaaS products', 'Best fit is narrow to email-reliant teams', 'Value depends on real execution quality over time'],
    alternatives: ['Mailwarm', 'Warmy', 'GlockApps'],
    editorRating: 4.6,
    difficulty: 2,
    createdAt: '2026-07-03',
    updatedAt: '2026-07-03',
    isFeatured: true,
    reviewSources: [
      {
        source: 'MailAdept homepage',
        url: 'https://www.mailadept.com/',
        summary: 'MailAdept pitches subscription deliverability execution, covering audits, fixes, monitoring, and inbox placement improvements.'
      },
      {
        source: 'About MailAdept',
        url: 'https://www.mailadept.com/about',
        summary: 'The about page makes it clear that the service is focused on companies that rely on email as a core growth or operational channel.'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/products/mailadept-by-mailwarm-yc-s20',
        summary: 'The latest Product Hunt launch framed MailAdept as an AI-native deliverability service, giving it both freshness and demand context.'
      }
    ],
  },
  {
    id: 'humalike',
    name: 'Humalike',
    slug: 'humalike',
    description: 'Behavioral infrastructure for AI agents, offering APIs for turn-taking, norms, persona, social memory, and other human-facing interaction primitives.',
    reason: 'Humalike belongs on the radar because more teams are building agents, but the missing layer is often not intelligence alone — it is whether the agent feels socially usable.',
    fullReview:
      'Humalike is an unusual but timely product because it focuses on how agents behave around people, not just what they know. Its API surface covers turn-taking, norms, persona, social memory, theory of mind, and other signals that make group conversations feel natural instead of awkward. That is a sharper angle than generic “agent framework” positioning.\n\nThe commercial case is that AI coworkers, companions, game characters, community bots, and voice agents all need more than raw model output if they are going to stay in the loop with humans. Humalike is trying to become that behavior layer. If the agent market keeps maturing, this kind of infrastructure could become a real category instead of a research curiosity.\n\nThe trade-off is that the product is still early and better suited to builders than casual users. Closed-beta or design-partner infrastructure always carries adoption risk. But for an AI tools site that wants to stay ahead of agent-market shifts, Humalike is exactly the sort of fresh, high-signal tool worth adding early.',
    category: 'AI编程',
    categorySlug: 'code',
    pricingType: 'paid',
    priceRange: 'Closed beta / design-partner access today; pricing runs through direct contact with the team.',
    website: 'https://humalike.ai/',
    features: ['Turn-taking API', 'Norm and tone adaptation', 'Persona layer', 'Social memory', 'Behavioral observability for agents'],
    pros: ['Fresh angle inside the agent stack', 'Useful for voice, community, gaming, and coworker agents', 'Strong conceptual differentiation', 'Good fit for teams building human-facing agent products'],
    cons: ['Still early and not broadly self-serve', 'Value is easiest to see in complex interaction products', 'Category education is still required for mainstream buyers'],
    alternatives: ['Inworld', 'Hume', 'Letta'],
    editorRating: 4.5,
    difficulty: 4,
    createdAt: '2026-07-03',
    updatedAt: '2026-07-03',
    isFeatured: true,
    reviewSources: [
      {
        source: 'Humalike homepage',
        url: 'https://humalike.ai/',
        summary: 'Humalike describes itself as behavioral infrastructure for humanlike AI agents, centered on social skills and proactiveness rather than raw model intelligence.'
      },
      {
        source: 'Humalike research and comparison pages',
        url: 'https://humalike.ai/humalike-vs-letta',
        summary: 'Humalike’s own comparison material makes the positioning clearer by contrasting a memory-first agent stack with a broader behavioral layer.'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/products/humalike-2',
        summary: 'The Product Hunt launch provides a current market signal that developers are actively looking at more human-facing agent infrastructure.'
      }
    ],
  },
];

export default sourcedBatchToolsRound12;
