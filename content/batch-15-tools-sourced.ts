import type { Tool } from '@/types/tool';

export const sourcedBatchToolsRound14: Tool[] = [
  {
    id: 'workbuddy',
    name: 'WorkBuddy',
    slug: 'workbuddy',
    description: 'Tencent\'s global agentic workspace for office work that turns one instruction into parallel research, writing, analysis, and deliverable-ready output.',
    reason: 'WorkBuddy goes first this round because it sits at the center of two narratives that still convert clicks: big-tech validation for agent workspaces and a very legible promise for buyers who want AI to finish office tasks instead of just chatting about them.',
    fullReview: `WorkBuddy is commercially interesting because it packages the agent story in language workplace buyers already understand. Instead of selling another chatbot, Tencent is pitching an AI workspace that can take one instruction, plan the work, split it across agents, and hand back something ready to use. That is a much stronger conversion story than generic “ask anything” positioning.

The official global launch materials lean into practical office outcomes: data analysis, content creation, multi-agent parallel execution, and remote control from messaging tools like Slack, Discord, and Telegram. That matters because the real question in 2026 is not whether agents can reason. It is whether they can slot into the places teams already work and close useful tasks without turning into another dashboard.

There are still trade-offs. Pricing is not clearly published on the public global site, and enterprise buyers will need to verify how much of the full Tencent ecosystem experience carries over outside China. Even so, WorkBuddy deserves homepage exposure because it has both traffic appeal and real budget intent: it is a recognizable brand launch attached to a broad productivity job buyers can justify quickly.`,
    category: '效率工具',
    categorySlug: 'productivity',
    pricingType: 'paid',
    priceRange: 'Pricing is not public on the current global launch page; expect signup-led or enterprise-style rollout details.',
    website: 'https://www.workbuddy.ai/',
    features: ['Multi-agent parallel execution', 'Single-prompt task planning', 'Ready-to-use office deliverables', 'Remote control from messaging apps', 'Flexible multi-model integration'],
    pros: ['Strong Tencent trust signal', 'Clear workplace buyer story', 'Parallel agent workflow feels current', 'Broad office use cases beyond demos'],
    cons: ['Public pricing is still unclear', 'Global rollout details may vary by region', 'Enterprise buyers will want deeper governance proof'],
    alternatives: ['Claude', 'Manus', 'Notion AI'],
    editorRating: 4.8,
    difficulty: 2,
    createdAt: '2026-07-05',
    updatedAt: '2026-07-05',
    isFeatured: true,
    isEditorsPick: true,
    reviewSources: [
      {
        source: 'WorkBuddy global site',
        url: 'https://www.workbuddy.ai/',
        summary: 'The public site frames WorkBuddy as an AI workbench where expert agents plan, execute, and run tasks in parallel for everyday office work.'
      },
      {
        source: 'Tencent Cloud launch article',
        url: 'https://www.tencent.com/en-us/articles/2202341.html',
        summary: 'Tencent says WorkBuddy helps users turn one instruction into a ready-to-use deliverable, supports multiple tasks and agents in parallel, and can be controlled from Slack, Discord, and Telegram.'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/products/workbuddy-2',
        summary: 'WorkBuddy ranked first on the July 5, 2026 Product Hunt daily board, making it one of the freshest high-attention agent launches right now.'
      }
    ],
  },
  {
    id: 'docsalot',
    name: 'DocsAlot',
    slug: 'docsalot',
    description: 'AI-readable documentation platform that turns scattered help centers, API docs, and product notes into hosted docs, llms.txt, skill.md, and MCP-ready onboarding surfaces.',
    reason: 'DocsAlot earns a top slot because “docs for humans and agents” is quickly becoming a high-intent software budget line, and this product packages that need in a way founders, developer tools teams, and support leads can understand immediately.',
    fullReview: `DocsAlot is one of the clearest examples of a new SaaS wedge created by agent adoption. The pitch is not just “host your docs.” It is “make your product legible to both developers and AI systems from one maintained source.” That includes hosted docs, llms.txt, skill.md, MCP-ready outputs, and benchmark-style visibility checks that show what agents can actually find.

That positioning matters because documentation is turning into an acquisition and onboarding surface again. If ChatGPT, Claude, Cursor, or another repo-aware assistant cannot find the right install flow or API example, you lose trust before a human ever books a demo. DocsAlot is selling directly into that pain, which gives it stronger monetization potential than a generic knowledge-base refresh.

The main question is defensibility. Documentation is crowded, and many incumbents will add more AI-readable exports over time. But right now DocsAlot feels well-timed and commercially sharp: it bundles hosted docs, MCP, llms.txt, and an audit story into something technical buyers can approve without needing a long internal education cycle.`,
    category: '知识管理',
    categorySlug: 'knowledge',
    pricingType: 'paid',
    priceRange: 'Startup $39/mo, Team $99/mo, Enterprise custom; Product Hunt launch code offers 50% off the first 3 months.',
    website: 'https://docsalot.dev/',
    features: ['Hosted docs and API references', 'llms.txt and skill.md exports', 'Hosted MCP endpoint', 'AI visibility audits and benchmark reports', 'GitHub/help-center/OpenAPI source syncing'],
    pros: ['Excellent fit for current agent onboarding demand', 'Clear pricing for startups and teams', 'Combines docs hosting with AI-facing surfaces', 'Strong value for developer-tools and API companies'],
    cons: ['Category is getting crowded', 'Best value depends on teams caring about AI onboarding quality', 'Migration work still matters for messy legacy docs'],
    alternatives: ['Mintlify', 'Fern', 'ReadMe'],
    editorRating: 4.8,
    difficulty: 3,
    createdAt: '2026-07-05',
    updatedAt: '2026-07-05',
    isFeatured: true,
    isEditorsPick: true,
    reviewSources: [
      {
        source: 'DocsAlot homepage',
        url: 'https://docsalot.dev/',
        summary: 'DocsAlot says it turns scattered help-center pages, API docs, and internal product knowledge into one polished source of truth for humans and AI agents.'
      },
      {
        source: 'DocsAlot pricing',
        url: 'https://docsalot.dev/',
        summary: 'The public pricing section lists Startup at $39 per month, Team at $99 per month, and Enterprise as custom.'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/products/docsalot-2',
        summary: 'DocsAlot ranked second on the July 5, 2026 Product Hunt daily board, giving it both recency and launch momentum.'
      }
    ],
  },
  {
    id: 'trycase',
    name: 'TryCase',
    slug: 'trycase',
    description: 'Disposable Linux environments for coding agents that run apps, test changes end to end, and return proof with screenshots, recordings, logs, and artifacts.',
    reason: 'TryCase belongs near the top because it addresses one of the most expensive weak spots in agent coding workflows: proving a change actually works before a human burns time retesting it.',
    fullReview: `TryCase is a strong fit for the current coding-agent market because it does not try to be the agent. It tries to be the verification layer around the agent. The product gives a coding agent a disposable Linux desktop, browser and terminal control, and a proof bundle with screenshots, recordings, logs, and artifacts. That is a much stronger promise than “trust the patch and test it yourself later.”

This matters because the AI coding market is shifting from generation to reliability. Teams now care about whether an agent can reproduce a bug, ship a fix, rerun the flow, and hand back evidence. TryCase packages that workflow clearly, and the pricing page is more transparent than many infra-style launches, which helps it feel buyable instead of purely experimental.

The main limitation is that this is still one more environment layer teams need to understand, and some orgs may want deeper security or policy controls than a young product can show on day one. But as a fresh-launch directory pick, TryCase has exactly the right ingredients: pain is real, the buyer is obvious, and the output is something people can judge in one sentence.`,
    category: 'AI编程',
    categorySlug: 'code',
    pricingType: 'freemium',
    priceRange: 'Free beta starts at $0 with monthly credits; paid plans begin at $19/mo, then $79/mo, $199/mo, and $399/mo.',
    website: 'https://www.trycase.dev/',
    features: ['Disposable Linux desktop per run', 'Browser + terminal control for agents', 'Screenshots, recordings, logs, and artifacts', 'Retest loop after fixes', 'Skill and CLI workflows for coding agents'],
    pros: ['Very clear value for coding-agent QA', 'Transparent public pricing', 'Proof-oriented workflow is easy to market', 'Strong fit for teams shipping with agents daily'],
    cons: ['Still another environment layer to manage', 'Early product category with evolving expectations', 'Heavier apps may need larger compute tiers quickly'],
    alternatives: ['GhostVM', 'Bunnyshell', 'Qovery'],
    editorRating: 4.7,
    difficulty: 3,
    createdAt: '2026-07-05',
    updatedAt: '2026-07-05',
    isFeatured: true,
    isEditorsPick: true,
    reviewSources: [
      {
        source: 'TryCase homepage',
        url: 'https://www.trycase.dev/',
        summary: 'TryCase describes itself as a disposable Linux environment that lets coding agents run apps, test like a user, and send back screenshots, recordings, and logs.'
      },
      {
        source: 'TryCase pricing',
        url: 'https://www.trycase.dev/pricing',
        summary: 'The pricing page shows a free beta tier and paid plans starting at $19 per month with usage-based compute credits.'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/products/trycase',
        summary: 'TryCase ranked fourth on the July 5, 2026 Product Hunt daily board and is positioned directly at the AI coding-agent workflow.'
      }
    ],
  },
  {
    id: 'mentiondrop-mcp',
    name: 'MentionDrop MCP',
    slug: 'mentiondrop-mcp',
    description: 'MCP server for live brand, competitor, and demand signals so agents can query mentions, summarize pain points, and draft replies from high-signal public sources.',
    reason: 'MentionDrop MCP makes the cut because it turns a familiar monitoring job into a concrete agent workflow that small teams can both understand and pay for without enterprise social-listening pricing.',
    fullReview: `MentionDrop MCP is a good example of how MCP is becoming a distribution layer for practical SaaS, not just a developer meme. The product gives Claude, Cursor, Windsurf, and other MCP-aware agents access to brand mentions, competitor conversations, public customer pain, and reply drafts from bounded high-signal sources like Reddit, Google News, search, and selected public web results.

That is commercially strong because the buyer pain is obvious. Small teams do not need another bloated dashboard. They need to know when somebody is talking about their product, whether it matters, and what response is worth sending. MentionDrop turns that into a workflow an agent can actually help execute, which is much closer to revenue than generic “AI marketing copilot” language.

The limitation is scope. This is not a full social-listening suite with every social network on earth. But that focus is part of the appeal: cheaper, faster, and better aligned with lean teams. For a traffic-and-monetization-first directory, MentionDrop MCP is exactly the kind of product that brings qualified clicks instead of passive browsing.`,
    category: '数据分析',
    categorySlug: 'data',
    pricingType: 'paid',
    priceRange: 'Starts at $29/mo; the Product Hunt launch includes a 14-day free trial plus MCP setup help.',
    website: 'https://www.mentiondrop.com/mcp',
    features: ['Public MCP endpoint for agents', 'Brand and competitor mention monitoring', 'Demand-signal digests from Reddit/news/search', 'Reply drafting from live mentions', 'Bounded high-signal source coverage'],
    pros: ['Very clear ROI story for small teams', 'MCP framing is timely and differentiated', 'Affordable starting price', 'Good bridge between monitoring and action'],
    cons: ['Not a full enterprise social-listening suite', 'Source scope is intentionally narrower', 'Best fit for teams that already work inside agent clients'],
    alternatives: ['Brand24', 'Mention', 'Google Alerts'],
    editorRating: 4.6,
    difficulty: 2,
    createdAt: '2026-07-05',
    updatedAt: '2026-07-05',
    isFeatured: true,
    reviewSources: [
      {
        source: 'MentionDrop MCP page',
        url: 'https://www.mentiondrop.com/mcp',
        summary: 'MentionDrop says its MCP server lets AI agents query brand mentions, competitor conversations, public customer pain, and reply drafts without another dashboard.'
      },
      {
        source: 'MentionDrop pricing',
        url: 'https://www.mentiondrop.com/pricing',
        summary: 'MentionDrop publicly prices the product from $29 per month and frames it as simple, transparent monitoring for teams that do not want a sales call.'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/products/mentiondrop',
        summary: 'MentionDrop MCP ranked fifth on the July 5, 2026 Product Hunt daily board and launched with a 14-day trial offer.'
      }
    ],
  },
  {
    id: 'circlechat',
    name: 'CircleChat',
    slug: 'circlechat',
    description: 'Workspace where teams of AI agents break goals into kanban tasks, report in channels, and pass an LLM judge before work can close.',
    reason: 'CircleChat deserves the final slot because it packages multi-agent orchestration into a surface people already understand — chat plus kanban — while keeping the pricing and self-host story unusually legible.',
    fullReview: `CircleChat feels timely because it does not hide the messy parts of multi-agent work. Instead of pretending a single assistant will do everything, it treats agent collaboration as an operating surface: goals, channels, tasks, approvals, and a judge that verifies deliverables before they count as done. That is a much stronger story than endless group-chat demos where nobody can tell whether work actually closed.

The biggest commercial plus is how simple the packaging is. Self-hosting is free and MIT-licensed. Managed workspaces start at $29 per month. Bring your own model keys, and CircleChat says it never marks up tokens. That combination makes the product easy for both hackers and small teams to try without procurement drama.

The trade-off is that multi-agent coordination can become overhead if the workflow is too heavy for the task. Some teams will still prefer a lighter agent loop. But for discovery and buyer intent, CircleChat is compelling: it sits in a hot category, makes the control surface visible, and gives teams both a self-host and paid path from the same launch.`,
    category: '效率工具',
    categorySlug: 'productivity',
    pricingType: 'freemium',
    priceRange: 'Self-host for free, or use managed cloud workspaces from $29/mo; larger team tiers go to $79/mo and $199/mo.',
    website: 'https://circlechat.co/',
    repo_url: 'https://github.com/tashfeenahmed/circlechat',
    features: ['Goal-to-kanban task planning', 'Agent channels and work reporting', 'LLM judge before task closure', 'Self-hosted or managed deployment', 'Bring-your-own-model keys'],
    pros: ['Very legible multi-agent workflow', 'Free self-host path lowers friction', 'Managed pricing is simple', 'Open source MIT license builds trust'],
    cons: ['Multi-agent coordination can add overhead', 'Still a young pattern for many teams', 'Best value depends on teams wanting a visible agent workspace'],
    alternatives: ['CrewAI', 'Slack', 'WorkBuddy'],
    editorRating: 4.6,
    difficulty: 3,
    createdAt: '2026-07-05',
    updatedAt: '2026-07-05',
    isFeatured: true,
    reviewSources: [
      {
        source: 'CircleChat site',
        url: 'https://circlechat.co/',
        summary: 'CircleChat presents itself as team chat where AI agents do real work, break goals into tasks, wait for approval on risky steps, and can be self-hosted or run in the cloud.'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/products/circlechat',
        summary: 'The Product Hunt launch page says CircleChat lets a team of AI agents work on a kanban board, self-host for free, or use hosted workspaces from $29 per month.'
      },
      {
        source: 'GitHub',
        url: 'https://github.com/tashfeenahmed/circlechat',
        summary: 'The public GitHub repo confirms CircleChat is MIT-licensed, self-hosted, and designed around agents as first-class team members.'
      }
    ],
  },
];

export default sourcedBatchToolsRound14;
