import type { Tool } from '@/types/tool';

export const sourcedBatchToolsRound13: Tool[] = [
  {
    id: 'glaze',
    name: 'Glaze',
    slug: 'glaze',
    description: 'Raycast-backed AI desktop app builder that turns prompts into local-first Mac apps with publishing, team sharing, and OS-level access built in.',
    reason: 'Glaze deserves the top slot this round because it combines real launch momentum with a buyer story teams can understand quickly: build internal desktop software with AI instead of stopping at browser demos.',
    fullReview: `Glaze is one of the more commercially interesting launches in the current app-builder wave because it is not trying to be another browser-only mockup generator. The pitch is that you describe the app you want, and Glaze builds a real desktop app that lives on your Mac, runs locally, and can reach files, shortcuts, and other operating-system surfaces that browser builders cannot touch as directly. That immediately changes who might pay for it.

For operators, founders, and internal-tool teams, that is a useful angle. Plenty of AI builders can make a fast first screen. Fewer make a compelling case for personal utilities, internal dashboards, or workflow tools that feel native to the machine where work is actually happening. Raycast also gives the product extra trust and distribution leverage instead of making it feel like a one-off launch page.

The trade-off is platform scope. Today it is Mac-first, and desktop builders still need human judgment around maintainability, security, and workflow fit. But from a traffic and monetization lens, Glaze is exactly the kind of fresh tool people will click because it promises something concrete: personal software you can actually use, not just admire.`,
    category: 'AI编程',
    categorySlug: 'code',
    pricingType: 'freemium',
    priceRange: 'Free with welcome credits; Pro starts at $20/mo; Team plans add private app stores and team sharing.',
    website: 'https://www.glaze.app/',
    features: ['Prompt-to-desktop app building', 'Local-first runtime', 'Mac-native files and OS access', 'Publish publicly or share privately', 'Built-in team distribution'],
    pros: ['Clear buyer story beyond demos', 'Strong Raycast trust signal', 'Better OS integration than browser-only builders', 'Good fit for internal tools and personal utilities'],
    cons: ['Mac-first today', 'Desktop app quality still needs review', 'Less useful for teams that only want web deployment'],
    alternatives: ['Lovable', 'Replit', 'Rork'],
    editorRating: 4.9,
    difficulty: 2,
    createdAt: '2026-07-05',
    updatedAt: '2026-07-05',
    isFeatured: true,
    isEditorsPick: true,
    reviewSources: [
      {
        source: 'Glaze homepage',
        url: 'https://www.glaze.app/',
        summary: 'Glaze presents itself as a way to create desktop apps in minutes by chatting with AI, with local-first runtime and desktop-level OS integration.'
      },
      {
        source: 'Glaze pricing',
        url: 'https://www.glaze.app/pricing',
        summary: 'The pricing page confirms a free starting path plus paid Pro and Team plans, which matters because the product is positioned for ongoing internal-tool usage instead of one-off experiments.'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/products/glaze-4',
        summary: 'Glaze launched this week and reached the top of the July 3, 2026 Product Hunt board, which is a strong recency and attention signal.'
      }
    ],
  },
  {
    id: 'vida',
    name: 'Vida',
    slug: 'vida',
    description: 'Proactive personal AI agent that learns work context, anticipates intent, and turns chats, files, and habits into completed tasks before you ask.',
    reason: 'Vida is worth adding because proactive agents are still rare in consumer-facing form, and the product is pitching concrete work outcomes instead of vague “assistant” language.',
    fullReview: `Vida matters because it is trying to move AI from response mode into background execution. The product message is simple: learn how the user works, keep memory of what matters, and quietly take care of repetitive or preparatory tasks before the prompt is written. That is much easier to market than generic “super assistant” promises because the site shows specific use cases like reply drafting, prompt cleanup, workspace cleanup, and daily summaries.

The bigger opportunity is that proactive context stitching can matter across sales, client work, operations, recruiting, and founder workflows. If Vida actually handles the prep work around communication, file organization, and summaries, it becomes much easier to justify than a chatbot that still waits for instructions. The product also talks about privacy controls and memory editing, which helps because always-on agents raise trust questions immediately.

The risk is execution. Proactive products only survive if the judgment is good and the interruptions stay low. But as a fresh launch with real traffic potential, Vida earns attention because it turns the agent story into something people can imagine using every day rather than just demoing once.`,
    category: '效率工具',
    categorySlug: 'productivity',
    pricingType: 'freemium',
    priceRange: 'Free to try, with paid plans and billing cadence listed on Vida\'s current pricing page.',
    website: 'https://vida.app/',
    features: ['Proactive context learning', 'Reply and prompt rescue flows', 'Cross-app context stitching', 'Automatic daily summaries', 'User-controlled memory and privacy controls'],
    pros: ['Clear proactive-agent angle', 'Broad fit across knowledge-work roles', 'More concrete than generic chatbots', 'Strong current launch heat'],
    cons: ['Proactive agents are hard to get right', 'Trust can break fast if suggestions misfire', 'Long-term value depends on retention, not novelty'],
    alternatives: ['Claude for Desktop', 'Littlebird', 'Hoop'],
    editorRating: 4.7,
    difficulty: 2,
    createdAt: '2026-07-05',
    updatedAt: '2026-07-05',
    isFeatured: true,
    isEditorsPick: true,
    reviewSources: [
      {
        source: 'Vida homepage',
        url: 'https://vida.app/',
        summary: 'Vida describes itself as a proactive agent that understands context, anticipates intent, and ships production-grade outcomes across a growing list of use cases.'
      },
      {
        source: 'Vida pricing',
        url: 'https://vida.app/pricing/',
        summary: 'Vida maintains a live pricing page, which signals the launch is meant to convert real usage rather than sit as a teaser.'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/products/vida-5',
        summary: 'Vida was the top featured Product Hunt launch on July 4, 2026, giving it fresh discovery momentum right now.'
      }
    ],
  },
  {
    id: 'termi-protocol',
    name: 'Termi Protocol',
    slug: 'termi-protocol',
    description: '3D control room for AI coding agents that visualizes file reads, commands, checkpoints, cost, and approvals while keeping the agent on your own machine.',
    reason: 'Termi Protocol fits the site well because it packages the coding-agent boom into a product people instantly understand and buy: visibility, control, and a little game layer on top of agent workflows.',
    fullReview: `Termi Protocol is a clever packaging play on top of the coding-agent wave. Instead of selling another agent, it sells a control room for the agents you already run. Claude Code, Codex, Gemini CLI, Copilot, and similar tools are getting more powerful, but they still feel opaque to many users. Termi turns that opacity into a product opportunity by letting you watch the work, pause it, checkpoint it, and track cost while the agent runs.

That is commercially stronger than it sounds. Visibility and control are real pain points for teams that want agent speed without losing confidence in what the tool is doing. The fact that the product also adds a persistent workspace, saved memory, and approval flow means it can appeal to people treating coding agents as serious daily infrastructure rather than weekend toys.

The playful 3D presentation and progression layer will not be for everyone, and some buyers may still prefer a more stripped-down command center. Even so, as a launch built for traffic, clicks, and developer curiosity, Termi is a strong pick because it sits exactly where the market is hot: people want agents, but they also want to see and steer them.`,
    category: 'AI编程',
    categorySlug: 'code',
    pricingType: 'paid',
    priceRange: 'Founder pricing launched at $6.99 one-time for lifetime access; check the current site for any post-launch changes.',
    website: 'https://termiprotocol.com/',
    features: ['Live 3D agent visualization', 'Checkpoint and rewind controls', 'Per-agent command center', 'Saved task boards and memory', 'Cost and approval tracking'],
    pros: ['Very legible value proposition', 'Rides strong coding-agent demand', 'Useful for visibility and governance', 'Low-friction launch pricing can convert curiosity fast'],
    cons: ['Presentation may feel gimmicky to some teams', 'Value depends on users already running agents', 'Still another surface to manage in the workflow'],
    alternatives: ['Claude Code', 'Codex', 'Warp'],
    editorRating: 4.6,
    difficulty: 2,
    createdAt: '2026-07-05',
    updatedAt: '2026-07-05',
    isFeatured: true,
    reviewSources: [
      {
        source: 'Termi Protocol homepage',
        url: 'https://termiprotocol.com/',
        summary: 'The official site frames Termi as the control room for AI coding agents, emphasizing live visibility, checkpoints, memory, and local-first control.'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/products/termi-protocol',
        summary: 'Product Hunt positioned Termi as a way to watch coding agents build in live 3D, which helps explain why it is drawing fast launch attention.'
      }
    ],
  },
  {
    id: 'archify',
    name: 'Archify',
    slug: 'archify',
    description: 'Browser-based architecture intelligence tool that reveals components, APIs, libraries, and runtime behavior directly on a live web page.',
    reason: 'Archify earns a slot because it targets a pain that is only getting bigger in the AI era: understanding software built by other people, not just generating more code.',
    fullReview: `Archify is appealing because it focuses on software comprehension instead of software generation. As AI makes it faster to produce code, more teams are running into the opposite bottleneck: figuring out how an existing app actually works. Archify tries to solve that inside the browser by tracing components, requests, libraries, and runtime behavior directly on the page you are inspecting.

That makes it useful for several high-intent audiences at once. Frontend engineers can trace a symptom back to an API or component. QA people can add technical context to bug reports. Founders and growth teams can read a competitor’s stack and third-party scripts from the outside. The positioning is also strong because it is local-first and open source, which makes the security story easier to trust than a black-box analysis service.

The main limitation is that inference about production code always has edges, especially once code is minified or heavily customized. Still, Archify deserves fresh placement because it is a smart answer to a real workflow shift: the world does not just need more code now, it needs faster ways to understand the code that already ships.`,
    category: 'AI编程',
    categorySlug: 'code',
    pricingType: 'free',
    priceRange: 'Free and open source under Apache-2.0, with no account required.',
    website: 'https://archify.salahxd.dev/',
    repo_url: 'https://github.com/Salah-XD/archify',
    features: ['Runtime component tracing', 'API and storage visibility', '100% local analysis', 'Framework and stack detection', 'Security-oriented third-party script inspection'],
    pros: ['Strong fit for understanding complex apps', 'Useful for engineering, QA, and competitor research', 'Local-first and open source', 'Differentiated from standard DevTools and stack detectors'],
    cons: ['Best results depend on observable runtime clues', 'Open-source tools may monetize less directly', 'Some users will still need DevTools for deeper debugging'],
    alternatives: ['Wappalyzer', 'React DevTools', 'WhatRuns'],
    editorRating: 4.6,
    difficulty: 3,
    createdAt: '2026-07-05',
    updatedAt: '2026-07-05',
    isFeatured: true,
    reviewSources: [
      {
        source: 'Archify homepage',
        url: 'https://archify.salahxd.dev/',
        summary: 'Archify says it reveals components, APIs, libraries, and behavior directly in the browser while keeping analysis 100% local.'
      },
      {
        source: 'Archify GitHub',
        url: 'https://github.com/Salah-XD/archify',
        summary: 'The GitHub repo reinforces that the product is open source and built around browser-native runtime inspection rather than a hosted SaaS black box.'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/products/archify',
        summary: 'Archify launched this week on Product Hunt and landed near the top of the July 3, 2026 board, which makes it fresh enough for homepage rotation.'
      }
    ],
  },
  {
    id: 'checklistfox',
    name: 'ChecklistFox',
    slug: 'checklistfox',
    description: 'AI checklist and planner generator that turns plain-language prompts into styled, printable PDFs for life events, trips, and operational prep.',
    reason: 'ChecklistFox is a lighter pick than the agent tools, but it has clear SEO and everyday-intent potential because the output maps naturally to search-heavy planning jobs people already look up.',
    fullReview: `ChecklistFox is not a frontier model product, and that is exactly why it is interesting. It takes a familiar user job — planning a move, a trip, a ceremony, a visa process, a new job, a baby, or some other high-stress event — and uses AI to generate a finished checklist that people can actually print, share, and use. That is a much cleaner promise than “general productivity assistant.”

From a traffic standpoint, it also fits high-volume search behavior. People already search for planning templates, checklists, and printable guides. A product that sits on top of those workflows can attract broad consumer demand while still feeling useful enough to keep. The styled PDF angle is important too because it makes the output feel more like a deliverable and less like disposable chat text.

The limitation is that this is a simpler category with lower switching costs. If the generated checklist quality or customization falls short, people will move on quickly. But as a discovery pick for traffic capture and practical utility, ChecklistFox is a credible launch to surface now.`,
    category: '效率工具',
    categorySlug: 'productivity',
    pricingType: 'free',
    priceRange: 'Free to use with local browser storage and PDF downloads; no subscription required to get started.',
    website: 'https://checklistfox.com/',
    features: ['Prompt-to-checklist generation', 'Styled PDF export', 'Local browser saving', 'Editable items and themes', 'Template library for repeat planning jobs'],
    pros: ['Easy everyday use case', 'Good search and social sharing potential', 'Output feels finished, not raw chat text', 'No account or payment friction at launch'],
    cons: ['Lower moat than infrastructure products', 'Value depends on checklist quality', 'Consumer utility may monetize more slowly than B2B tools'],
    alternatives: ['Arrange', 'Notion AI', 'Todoist'],
    editorRating: 4.4,
    difficulty: 1,
    createdAt: '2026-07-05',
    updatedAt: '2026-07-05',
    isFeatured: true,
    reviewSources: [
      {
        source: 'ChecklistFox homepage',
        url: 'https://checklistfox.com/',
        summary: 'ChecklistFox explains the value clearly: type a prompt, get a beautiful planner, and download it as a PDF.'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/products/checklistfox',
        summary: 'ChecklistFox ranked near the top of the July 4, 2026 Product Hunt launch board, which is enough current heat to justify adding it to the fresh-launch rotation.'
      }
    ],
  },
  {
    id: 'vox',
    name: 'Vox',
    slug: 'vox',
    description: 'Hands-free voice layer for GitHub Copilot CLI that lets developers speak turns aloud, hear agent replies back, and stay in flow without typing every prompt.',
    reason: 'Vox is a niche developer pick, but the launch is timely because voice and coding agents are converging, and this is a direct, usable extension rather than a speculative concept.',
    fullReview: `Vox makes sense because it solves a small but real friction point in agent-heavy coding workflows: sometimes you want to keep thinking and steering without living on the keyboard. The product adds a voice canvas to Copilot CLI, with spoken input, spoken output, live transcript, and a standalone orb window that stays out of the way. That makes it more than a toy dictation script.

The interesting part is that it is not trying to replace the coding agent. It is trying to change the control surface around the agent. That is a smart place to experiment because more developers are already using terminal agents, and extensions that make those sessions easier can spread quickly inside power-user communities. The site also emphasizes local execution and no cloud dependency, which helps with trust.

This is still a narrower product than Glaze or Vida, and not every developer wants to talk to their terminal. But for a directory trying to stay close to live developer-tool behavior, Vox is a good fresh add: it is practical, current, and tightly aligned with where agent workflows are heading.`,
    category: 'AI编程',
    categorySlug: 'code',
    pricingType: 'free',
    priceRange: 'Free and MIT-licensed, with local install through GitHub Copilot CLI extension commands.',
    website: 'https://aasis21.github.io/vox/',
    repo_url: 'https://github.com/aasis21/vox',
    features: ['Voice input for Copilot CLI', 'Read-aloud agent replies', 'Standalone orb window', 'Multi-session routing', 'Local-only speech flow with no telemetry'],
    pros: ['Fresh take on agent control surfaces', 'Very low install friction for Copilot users', 'Runs locally with no cloud dependency', 'Good fit for power users experimenting with voice workflows'],
    cons: ['Niche audience versus broader AI tools', 'Depends on existing Copilot CLI adoption', 'Voice workflows are not for everyone'],
    alternatives: ['Wispr Flow', 'Superwhisper', 'GitHub Copilot'],
    editorRating: 4.3,
    difficulty: 2,
    createdAt: '2026-07-05',
    updatedAt: '2026-07-05',
    isFeatured: true,
    reviewSources: [
      {
        source: 'Vox homepage',
        url: 'https://aasis21.github.io/vox/',
        summary: 'Vox presents itself as a voice canvas for Copilot CLI sessions, with a reactive orb, voice input, read-aloud replies, and one-line local install.'
      },
      {
        source: 'Vox GitHub',
        url: 'https://github.com/aasis21/vox',
        summary: 'The GitHub repo confirms Vox is open source, pure JavaScript, and designed to install as a Copilot CLI extension on macOS, Linux, and Windows.'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/products/vox-5',
        summary: 'Vox launched this week on Product Hunt, which makes it timely enough to include in a fresh coding-tool batch even though it is still niche.'
      }
    ],
  },
];

export default sourcedBatchToolsRound13;
