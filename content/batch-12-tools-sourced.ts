import type { Tool } from '@/types/tool';

export const sourcedBatchToolsRound11: Tool[] = [
  {
    id: 'codex',
    name: 'Codex',
    slug: 'codex',
    description: 'OpenAI\'s cloud coding agent for delegated engineering work, repo-aware edits, and reviewable code changes.',
    reason: 'If you want an AI tool that behaves more like an async engineering teammate than a single-tab copilot, Codex is one of the clearest products to watch right now.',
    fullReview:
      'Codex matters because it pushes coding AI away from “help me write this function” and closer to “take this scoped task, work through the repo, run the checks, and give me something reviewable.” That shift is important for teams who care about throughput, because the real bottleneck is often not one line of code but the time spent switching context, reproducing local state, and stitching together multi-step implementation work.\n\nIts strongest use case is delegated engineering work with clear boundaries: bug fixes, refactors, tests, docs, and isolated product tasks that can be handed off and reviewed later. For founders, PMs, and engineering leads, that changes the value proposition. You are not only buying model quality. You are buying back attention.\n\nThe trade-off is that agentic coding only pays off when review discipline stays high. You still need clean task framing, repo hygiene, and fast human judgment on the output. Codex is powerful because it closes more of the loop, but the people using it still need to decide where autonomy helps and where direct control matters more.',
    category: 'AI编程',
    categorySlug: 'code',
    pricingType: 'freemium',
    priceRange: 'Included through OpenAI product plans, with higher limits, team controls, and deeper usage typically gated behind paid tiers.',
    website: 'https://openai.com/codex/',
    features: ['Cloud coding agent', 'Parallel task handling', 'Repo-aware edits', 'Test and command execution', 'Reviewable patches'],
    pros: ['Feels closer to delegated work than autocomplete', 'Strong fit for scoped engineering tasks', 'Good for async code review loops', 'Matches high-intent developer demand'],
    cons: ['Still needs strong review discipline', 'Best results depend on clear task framing', 'Can be overkill for tiny edits'],
    alternatives: ['Claude Code', 'Cursor', 'Windsurf'],
    editorRating: 4.8,
    difficulty: 3,
    createdAt: '2026-07-01',
    updatedAt: '2026-07-01',
    isFeatured: true,
    isEditorsPick: true,
    reviewSources: [
      {
        source: 'OpenAI Codex',
        url: 'https://openai.com/codex/',
        summary: 'OpenAI presents Codex as a coding agent that can take on real software tasks instead of only providing inline suggestions.'
      },
      {
        source: 'OpenAI launch post',
        url: 'https://openai.com/index/introducing-codex/',
        summary: 'The launch post emphasizes delegated work, repo context, and output that is meant to be reviewed rather than blindly accepted.'
      },
      {
        source: 'OpenAI Help Center',
        url: 'https://help.openai.com/en/articles/11844228-codex-in-chatgpt',
        summary: 'OpenAI\'s help documentation shows Codex is actively shipping inside ChatGPT workflows, not a one-off research demo.'
      }
    ],
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    slug: 'claude-code',
    description: 'Anthropic\'s coding agent for terminal and IDE workflows, built to read repos, edit files, run commands, and keep multi-step coding work moving.',
    reason: 'Claude Code stays relevant because it is not just a model wrapper. It is a workflow product that reduces the friction between reading code, changing it, and checking the result.',
    fullReview:
      'Claude Code keeps winning attention because it feels close to how strong developers actually work: read the repo, inspect the surrounding files, make the change, run the command, inspect the output, and iterate. That is a much more valuable loop than simply asking for snippets in a chat box.\n\nIt is especially good for people already living in terminal-first or IDE-first environments. If your day is spent moving between a codebase, a failing test, a stack trace, and a deployment branch, Claude Code fits that operating style naturally. It is a tool for maintaining flow, not just generating text.\n\nThe limitation is the same one shared by every serious coding agent: the more authority you give it, the more important judgment becomes. Claude Code is excellent when paired with fast human review, good repo boundaries, and a willingness to treat the agent like a sharp junior teammate rather than an oracle.',
    category: 'AI编程',
    categorySlug: 'code',
    pricingType: 'freemium',
    priceRange: 'Typically accessed through Anthropic plans and enterprise agreements, with heavier usage and admin controls concentrated in paid tiers.',
    website: 'https://www.anthropic.com/claude-code',
    features: ['Terminal-first workflow', 'Repo reading and editing', 'Command execution', 'IDE support', 'Multi-step coding assistance'],
    pros: ['Very strong fit for real developer workflows', 'Understands surrounding repo context well', 'Works across terminal and IDE setups', 'High buyer intent from engineering teams'],
    cons: ['Requires existing engineering habits to get full value', 'Still needs review and guardrails', 'Not the lightest option for casual users'],
    alternatives: ['Codex', 'Cursor', 'GitHub Copilot'],
    editorRating: 4.8,
    difficulty: 3,
    createdAt: '2026-07-01',
    updatedAt: '2026-07-01',
    isFeatured: true,
    isEditorsPick: true,
    reviewSources: [
      {
        source: 'Anthropic',
        url: 'https://www.anthropic.com/claude-code',
        summary: 'Anthropic describes Claude Code as an agentic coding tool designed for terminal, IDE, desktop, and browser workflows.'
      },
      {
        source: 'Anthropic product page',
        url: 'https://www.anthropic.com/product/claude-code',
        summary: 'The product page reinforces that Claude Code is meant to help developers understand codebases, edit files, and ship faster.'
      },
      {
        source: 'Anthropic docs',
        url: 'https://docs.anthropic.com/en/docs/claude-code/overview',
        summary: 'Anthropic\'s documentation makes the workflow concrete by focusing on repo context, commands, and step-by-step coding tasks.'
      }
    ],
  },
  {
    id: 'granola',
    name: 'Granola',
    slug: 'granola',
    description: 'AI meeting notepad that turns live conversations into structured notes, searchable memory, and cleaner post-meeting follow-up.',
    reason: 'Granola is high-intent because it solves a painful recurring workflow that teams hit every single day: meetings that produce too much information and too little usable output.',
    fullReview:
      'Granola stands out because it does not try to be a universal “AI for everything” layer. It does one painful job well: capture the substance of meetings without forcing you to become the human stenographer. That focus is why the product feels commercially credible. The value is easy to explain and easy to feel.\n\nFor founders, operators, recruiters, sales teams, and managers, the real benefit is not prettier notes. It is better continuity. You finish a call with usable context, searchable memory, and a cleaner path to the next decision. That makes Granola much easier to justify than broad assistants whose ROI is harder to pin down.\n\nThe edge case to watch is team dependence. Meeting tools only become truly valuable when they are trusted and adopted consistently. Granola looks strongest in organizations that already know meetings are a throughput problem and are willing to standardize around a clearer note-taking workflow.',
    category: '效率工具',
    categorySlug: 'productivity',
    pricingType: 'freemium',
    priceRange: 'Free entry is available, while heavier meeting volume, team memory, and administrative controls usually sit in paid plans.',
    website: 'https://www.granola.ai/',
    features: ['Automatic meeting notes', 'Searchable meeting memory', 'Structured follow-up', 'Low-friction capture', 'Team knowledge reuse'],
    pros: ['Easy value proposition for teams', 'Strong recurring workflow fit', 'Good for operational continuity', 'High commercial intent from knowledge workers'],
    cons: ['Value compounds only with consistent usage', 'Not every team wants another meeting layer', 'Trust depends on note quality over time'],
    alternatives: ['Fireflies', 'Otter', 'Read AI'],
    editorRating: 4.7,
    difficulty: 1,
    createdAt: '2026-07-01',
    updatedAt: '2026-07-01',
    isFeatured: true,
    reviewSources: [
      {
        source: 'Granola',
        url: 'https://www.granola.ai/',
        summary: 'Granola positions itself as the AI notepad for back-to-back meetings, which is a very clear and commercially legible promise.'
      },
      {
        source: 'Y Combinator',
        url: 'https://www.ycombinator.com/companies/granola',
        summary: 'YC frames Granola as software for capturing and organizing meeting knowledge, reinforcing the product\'s operational use case.'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/products/granola',
        summary: 'Product Hunt feedback highlights the same core value: better meeting recall without adding heavy ceremony to the call itself.'
      }
    ],
  },
  {
    id: 'vapi',
    name: 'Vapi',
    slug: 'vapi',
    description: 'Developer platform for building voice AI agents with telephony, orchestration, testing, and production deployment controls.',
    reason: 'Vapi deserves fresh placement because voice AI is no longer just a demo category. Teams are actively buying infrastructure that helps them launch usable phone and assistant workflows.',
    fullReview:
      'Vapi is important because it sits closer to infrastructure than novelty. Instead of asking whether voice AI sounds cool, it asks whether a developer can actually build, test, and deploy a working voice agent that plugs into a real business process. That makes it much more commercially serious than a lot of voice demos.\n\nIts strongest audience is builders: startups creating AI receptionists, support agents, outbound callers, and embedded voice experiences. Those buyers care about orchestration, latency, testing, telephony, and production reliability. Vapi speaks directly to those needs, which is why it carries strong monetization intent.\n\nThe trade-off is that platforms like this are only as good as the system built on top of them. Voice UX is hard, reliability matters, and downstream business logic still needs disciplined engineering. But as a launch surface for production voice agents, Vapi is one of the more credible names in the market.',
    category: 'AI编程',
    categorySlug: 'code',
    pricingType: 'freemium',
    priceRange: 'Developer-friendly entry pricing is common, while production minutes, telephony, and enterprise controls generally push usage into paid tiers.',
    website: 'https://vapi.ai/',
    features: ['Voice agent orchestration', 'Telephony integrations', 'Testing and deployment', 'Developer APIs', 'Production voice workflows'],
    pros: ['Clear developer and startup demand', 'Built for real production voice agents', 'Good fit for monetizable support and calling workflows', 'Strong infrastructure positioning'],
    cons: ['Voice reliability remains hard', 'Requires engineering depth to ship well', 'Costs can scale quickly with production volume'],
    alternatives: ['Retell AI', 'Bland', 'ElevenLabs'],
    editorRating: 4.7,
    difficulty: 3,
    createdAt: '2026-07-01',
    updatedAt: '2026-07-01',
    isFeatured: true,
    reviewSources: [
      {
        source: 'Vapi',
        url: 'https://vapi.ai/',
        summary: 'Vapi markets itself as a platform for building advanced voice AI agents, putting developer deployment ahead of pure demo value.'
      },
      {
        source: 'Vapi docs',
        url: 'https://docs.vapi.ai/',
        summary: 'The documentation focuses on implementation, telephony, and orchestration, which confirms Vapi\'s infrastructure-first positioning.'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/products/vapi',
        summary: 'Product Hunt discussions around Vapi center on builders shipping voice agents, not just experimenting with voice generation.'
      }
    ],
  },
  {
    id: 'wispr-flow',
    name: 'Wispr Flow',
    slug: 'wispr-flow',
    description: 'Cross-app voice dictation layer that turns spoken thoughts into polished writing, reducing friction in email, docs, notes, and messaging.',
    reason: 'Wispr Flow is the kind of tool that can spread fast once people feel it, because the benefit is immediate: less typing, faster drafts, and smoother day-to-day writing.',
    fullReview:
      'Wispr Flow is compelling because it sits in a behavior that happens dozens of times a day: writing. Instead of asking users to learn a new destination app, it tries to make the existing stack feel faster by letting speech become polished text across tools. That is a much stronger distribution pattern than building yet another isolated AI workspace.\n\nThe appeal is obvious for operators, founders, recruiters, sales teams, and anyone who spends the day drafting quick responses, notes, or documents. If the product gets accuracy and latency right, it becomes the kind of workflow upgrade users miss immediately when it is gone.\n\nThe challenge is that voice input is unforgiving. Small recognition issues, formatting misses, or awkward edits can break trust quickly. Wispr Flow therefore lives or dies on execution quality. When it works, though, it is one of the cleaner examples of AI improving an existing habit instead of inventing a new one.',
    category: 'AI音频',
    categorySlug: 'audio',
    pricingType: 'freemium',
    priceRange: 'Usually available with a free trial or starter tier, while heavier usage and premium controls sit inside paid plans.',
    website: 'https://wisprflow.ai/',
    features: ['Voice dictation across apps', 'Polished text output', 'Fast drafting', 'Cross-workflow writing support', 'Low-friction capture'],
    pros: ['Immediate user value', 'Fits existing writing habits', 'Strong potential for word-of-mouth spread', 'Useful across many work roles'],
    cons: ['Accuracy and latency have to stay excellent', 'Some users still prefer keyboard control', 'Trust can drop quickly if formatting slips'],
    alternatives: ['Superwhisper', 'Aqua Voice', 'Whisper'],
    editorRating: 4.6,
    difficulty: 1,
    createdAt: '2026-07-01',
    updatedAt: '2026-07-01',
    isFeatured: true,
    reviewSources: [
      {
        source: 'Wispr Flow',
        url: 'https://wisprflow.ai/',
        summary: 'Wispr Flow presents itself as effortless voice dictation, which aligns with its strongest value: faster writing without extra app friction.'
      },
      {
        source: 'Wispr Flow pricing',
        url: 'https://wisprflow.ai/pricing',
        summary: 'The pricing surface reinforces that Flow is designed for repeat daily usage rather than a one-time novelty workflow.'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/products/wispr-flow',
        summary: 'Product Hunt reactions focus on how quickly Wispr Flow reduces typing overhead for people who write all day.'
      }
    ],
  },
  {
    id: 'notebooklm',
    name: 'NotebookLM',
    slug: 'notebooklm',
    description: 'Google\'s source-grounded research notebook for turning documents, notes, and references into summaries, briefs, citations, and audio explainers.',
    reason: 'NotebookLM keeps earning attention because it is one of the few mainstream AI products that feels built around source-heavy thinking rather than generic chat.',
    fullReview:
      'NotebookLM is powerful because it starts from sources, not vibes. That sounds simple, but it changes the whole user experience. Instead of asking a model to improvise from a broad latent memory, you anchor the system to your own documents, links, notes, and study material. For research, planning, and synthesis work, that is a much more credible promise.\n\nIt is especially valuable for students, analysts, researchers, educators, and operators who need to turn dense material into something reusable: a briefing, a study guide, a working outline, or a spoken recap. This is why NotebookLM travels well from education into business knowledge work. The core pain is the same: too many sources, too little clarity.\n\nIts limitation is that it works best when you already have material worth grounding to. NotebookLM is less about open-ended exploration and more about compressing complexity inside a bounded context. That makes it narrower than general assistants, but also far more trustworthy for the jobs it is actually built to do.',
    category: '知识管理',
    categorySlug: 'knowledge',
    pricingType: 'freemium',
    priceRange: 'NotebookLM is broadly available with optional premium or workspace-linked upgrades for heavier usage and additional capabilities.',
    website: 'https://notebooklm.google/',
    features: ['Source-grounded answers', 'Research summaries', 'Briefing generation', 'Citation support', 'Audio explainers'],
    pros: ['Very strong fit for source-heavy workflows', 'Trustworthy framing for research tasks', 'Useful across education and business', 'Distinct product identity versus generic chat'],
    cons: ['Less suited to open-ended brainstorming', 'Value depends on the quality of your source set', 'Premium capability lines can matter for heavy users'],
    alternatives: ['Perplexity', 'Readwise', 'Mem'],
    editorRating: 4.7,
    difficulty: 1,
    createdAt: '2026-07-01',
    updatedAt: '2026-07-01',
    isFeatured: true,
    reviewSources: [
      {
        source: 'NotebookLM',
        url: 'https://notebooklm.google/',
        summary: 'Google frames NotebookLM as an AI research tool and thinking partner, which is the clearest explanation of its source-grounded positioning.'
      },
      {
        source: 'Google Blog',
        url: 'https://blog.google/innovation-and-ai/products/notebooklm/better-research-notebooklm/',
        summary: 'Google\'s product writing around NotebookLM consistently emphasizes better research workflows instead of generic assistant behavior.'
      },
      {
        source: 'Support',
        url: 'https://support.google.com/notebooklm/',
        summary: 'The support surface shows NotebookLM is being maintained as a real consumer and workspace product, not an experimental side page.'
      }
    ],
  },
];

export default sourcedBatchToolsRound11;
