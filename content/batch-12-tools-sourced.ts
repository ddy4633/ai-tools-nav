import type { Tool } from '@/types/tool';

export const sourcedBatchToolsRound11: Tool[] = [
  {
    id: 'openai-codex',
    name: 'Codex',
    slug: 'codex',
    description: 'OpenAI 的 AI 编码代理，核心卖点不是补全，而是把功能、重构、测试和自动化工作成批推进。',
    reason: '如果你的目标是把“写点代码”升级成“把任务交给代理做完”，Codex 现在已经是必须单独跟踪的一条产品线。',
    fullReview: 'Codex 现在更像一套完整的工程执行界面，而不是传统意义上的 AI 补全工具。OpenAI 官方首页已经把它明确定位成 coding agent，强调的是 build and ship，而不是只在编辑器里补几行代码。这意味着它瞄准的价值点已经从“提速”变成“交付”：功能实现、复杂重构、迁移、测试、代码评审和持续后台任务，都开始往同一个产品里收口。\n\n对开发团队和增长型产品来说，Codex 的吸引力在于它能覆盖从本地终端到桌面工作区再到自动化巡检的整条链路。尤其是多代理、worktree、自动化和角色插件这些能力一起出现后，它不只是写代码，而是在接手越来越多原本要由工程、运营、分析甚至设计配合完成的工作。对需要压缩交付时间的团队，这种变化非常现实。\n\n它的边界也很清楚。越是高权限、长链路、跨系统的任务，就越需要你把规则、验证和回滚机制设好。Codex 很适合当高杠杆执行器，但不适合在缺少流程约束的情况下被当作“万能自动员”直接放飞。',
    category: 'AI编程',
    categorySlug: 'code',
    pricingType: 'paid',
    priceRange: '通常跟随 ChatGPT / workspace 方案与团队 credits 使用，最新可用性以官方工作区说明为准。',
    website: 'https://openai.com/codex/',
    features: ['编码代理', '多代理并行', 'worktree 工作流', '后台自动化任务', '插件与技能扩展'],
    pros: ['从改代码走向交付任务', '本地与云端工作流打通', '适合复杂重构与测试补全', '自动化场景想象空间大'],
    cons: ['高权限任务仍需严格验证', '团队规范不清时容易放大混乱', '计费与配额要结合工作区策略评估'],
    alternatives: ['Cursor', 'GitHub Copilot', 'Kiro'],
    editorRating: 4.8,
    difficulty: 3,
    createdAt: '2026-06-25',
    updatedAt: '2026-06-25',
    isFeatured: true,
    reviewSources: [
      {
        source: 'OpenAI Codex 官方',
        url: 'https://openai.com/codex/',
        summary: '官方把 Codex 直接定义为 “A coding agent that helps you build and ship with AI”，并强调多代理、worktree 和自动化。'
      },
      {
        source: 'OpenAI 产品更新',
        url: 'https://openai.com/index/codex-for-every-role-tool-workflow/',
        summary: '2026 年 6 月 2 日的官方更新说明 Codex 正从开发工具扩展到插件、站点分享和跨角色工作流。'
      }
    ],
  },
  {
    id: 'kiro',
    name: 'Kiro',
    slug: 'kiro',
    description: '把 spec-driven development（规范驱动开发）做成核心体验的 AI IDE，重点是先把需求、设计和任务结构化，再让代理执行。',
    reason: 'Kiro 的差异点不是“又一个 AI IDE”，而是它把 spec、agent、验证和 CI 这条线收得很完整。',
    fullReview: 'Kiro 的产品叙事很鲜明：不要只让 AI 帮你写代码，而是让它先把需求、设计、任务拆解和验证链路建立起来。官方首页和文档都在反复强调 specs，这让它和很多只强调聊天、补全或单次 agent 执行的产品区分得很开。对真实项目来说，这种结构化路线比“先写出来再慢慢补”更接近长期可维护的工程方式。\n\n它特别适合中大型代码库、多人协作和需要把需求变更转成稳定交付的团队。因为 Kiro 不只是帮你动手，还试图把需求、架构、任务、验证和 hooks 变成统一流程。对产品经理、工程负责人和想做长期系统的人来说，这种做法很容易比纯 vibe coding 更省返工。\n\n当然，它也不是没有成本。spec-driven development 会要求用户接受更强的流程感，前期看起来比直接开干更慢。只有当你真的在意质量、回归成本和多人协作时，这套思路的价值才会完全释放。',
    category: 'AI编程',
    categorySlug: 'code',
    pricingType: 'freemium',
    priceRange: '提供下载与信用点计费路线，团队版与更高配额方案按官方 pricing 更新。',
    website: 'https://kiro.dev/',
    features: ['spec-driven development', '并行代理', '属性测试导向验证', 'hooks 与自动化', 'CLI / IDE / Web 多入口'],
    pros: ['结构化能力很强', '适合大代码库和多人协作', '把需求到实现串成一条链', '比纯聊天式开发更强调可维护性'],
    cons: ['流程感更强，上手心智高于普通 AI IDE', '并不适合所有快速试错场景', '价值要在复杂项目里才更明显'],
    alternatives: ['Codex', 'Cursor', 'GitHub Copilot'],
    editorRating: 4.7,
    difficulty: 3,
    createdAt: '2026-06-25',
    updatedAt: '2026-06-25',
    isFeatured: true,
    reviewSources: [
      {
        source: 'Kiro 官方首页',
        url: 'https://kiro.dev/',
        summary: '官方将 Kiro 定位为 agentic engineering 工具，强调可执行 specs、并行 agents 和超过单元测试的 correctness 验证。'
      },
      {
        source: 'Kiro Specs 文档',
        url: 'https://kiro.dev/docs/specs/',
        summary: '文档明确把 specs 定义为把需求、设计和可追踪任务结构化的核心机制，这是 Kiro 的关键差异点。'
      }
    ],
  },
  {
    id: 'figma-make',
    name: 'Figma Make',
    slug: 'figma-make',
    description: 'Figma 推出的 prompt-to-code（提示词到代码）产品，重点不只是做草图，而是把设计、原型和可运行产品更紧地接在一起。',
    reason: '如果你在看 2026 年最值得追的 AI app builder，Figma Make 已经从“设计工具附属功能”变成单独值得收录的产品。',
    fullReview: 'Figma Make 现在的价值不只是帮设计师“生成一个界面”，而是把从想法到原型再到可运行页面这件事做得更一体。Figma 官方产品页已经直接把它写成 “Prompt to code anything you can imagine”，而 Config 2026 的产品更新又把 Motion、Sites、code on canvas 等能力一起端出来，说明 Figma 正在把设计和生成式构建放进同一个主工作台。\n\n这对产品团队很有吸引力。过去很多 AI app builder 的问题，是生成出来的东西很快，但设计协作、版本控制、后续迭代和团队评审不顺。Figma Make 的优势在于它天然站在现有产品设计工作流中间，而不是要求团队再迁移到一套完全新的工具里。对设计驱动型产品、独立开发者和跨职能小团队，它会比纯聊天式建站工具更顺。\n\n它的边界同样存在。Figma Make 不会让工程复杂度凭空消失，真正的权限、数据、后端和可维护性仍然要靠开发流程兜住。它更像把前端原型和产品表达往前推了一大步，而不是替代完整软件工程。',
    category: '设计助手',
    categorySlug: 'design',
    pricingType: 'freemium',
    priceRange: '通常跟随 Figma 工作区与 AI 配额开放，更多团队能力取决于工作区计划和最新 beta 范围。',
    website: 'https://www.figma.com/make/',
    features: ['prompt to code', '设计与原型一体化', '版本迭代记录', '和 Figma 生态打通', '更适合团队评审'],
    pros: ['站在成熟设计工作流里', '比纯生成功能更适合团队协作', '适合快速把想法变成可演示原型', '与 Figma 其他产品联动强'],
    cons: ['不是后端与复杂工程的完整替代', '最新能力受工作区和 beta 范围影响', '更适合前台产品表达而非全栈闭环'],
    alternatives: ['Lovable', 'Replit Agent', 'Polygram'],
    editorRating: 4.7,
    difficulty: 2,
    createdAt: '2026-06-25',
    updatedAt: '2026-06-25',
    isFeatured: true,
    reviewSources: [
      {
        source: 'Figma Make 官方',
        url: 'https://www.figma.com/make/',
        summary: '官方把 Figma Make 定位为 “Prompt to code anything you can imagine”，强调从想法到原型的 AI 生成体验。'
      },
      {
        source: 'Figma Release Notes',
        url: 'https://www.figma.com/release-notes/',
        summary: 'Config 2026 更新显示 Figma 正把 motion、texture、code 等能力直接带到同一画布，Make 的产品重要性明显上升。'
      }
    ],
  },
  {
    id: 'polygram',
    name: 'Polygram',
    slug: 'polygram',
    description: '强调先 plan，再 design，再 ship 的 AI app builder，主打从产品想法到可交付应用的一体化路线。',
    reason: 'Polygram 最值得看的点，是它没有把自己包装成“随便一句提示词就出产品”，而是明确强调先理解、先规划。',
    fullReview: 'Polygram 的卖点和很多 app builder 最大的不同，在于它反复强调计划先于编码。官方介绍写得很直接：它不是盲目 vibe-coding，而是先理解你的想法，再进入设计画布、网站构建和移动应用构建。这个方向很贴近真实产品团队，因为真正浪费时间的往往不是“写代码慢”，而是前面对齐不清、需求跳来跳去、设计和工程来回返工。\n\n它适合创始人、小团队、产品设计一体化工作流和想快速做出第一版业务产品的人。相比只给你代码片段的工具，Polygram 更像在卖一套产品构建流程：从 idea、plan、design 到 coding agent 都在同一个叙事里。这对要做 demo、MVP、营销落地页和移动产品原型的人，很容易形成吸引力。\n\n但这类工具也有天然边界。越往真实业务后端、权限体系、性能和长期维护走，团队越需要回到工程治理本身。Polygram 的强项是缩短从产品想法到首版可交付物的距离，而不是替代所有后续研发工作。',
    category: '效率工具',
    categorySlug: 'productivity',
    pricingType: 'freemium',
    priceRange: '通常提供试用或体验入口，更多生成额度、团队协作与产品化能力按官方计划变化。',
    website: 'https://polygram.dev/',
    features: ['plan before code', 'AI Design Canvas', '网站与移动应用构建', 'coding agent', '更适合产品型工作流'],
    pros: ['先规划再生成的路线更稳', '适合 MVP 和产品原型', '设计与编码衔接自然', '对小团队很友好'],
    cons: ['长期工程能力仍要靠团队补齐', '新产品生态还在形成', '复杂业务系统不等于一键完成'],
    alternatives: ['Figma Make', 'Lovable', 'Replit Agent'],
    editorRating: 4.5,
    difficulty: 2,
    createdAt: '2026-06-25',
    updatedAt: '2026-06-25',
    isFeatured: true,
    reviewSources: [
      {
        source: 'Polygram 官方',
        url: 'https://polygram.dev/',
        summary: '官方首页把 Polygram 描述为先理解产品想法，再进入设计和构建流程，而不是单纯 prompt 一把梭。'
      },
      {
        source: 'Polygram 官方博客',
        url: 'https://polygram.dev/blogs/introducing-polygram-the-ai-app-builder-that-plans-before-it-codes',
        summary: '官方博客明确把核心定位写成 “plans before it codes”，说明它在刻意和无规划的 vibe coding 拉开差异。'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/products/polygram-4',
        summary: 'Product Hunt 显示 Polygram 主产品在 2026 年 5 月上线，Coding Agent 在 2026 年 6 月 17 日单独发布，说明其迭代节奏很快。'
      }
    ],
  },
  {
    id: 'google-flow',
    name: 'Google Flow',
    slug: 'google-flow',
    description: 'Google 面向创作者的 AI creative studio（创意工作室），把视频、图像、参考素材和自然语言编辑放在同一个创作空间里。',
    reason: 'Flow 值得收录，不只是因为它能做视频，而是因为 Google 已经把它从单点视频工具推进成更完整的创意工作台。',
    fullReview: 'Google Flow 现在更像一个面向创作者的 AI creative studio，而不只是“用 Veo 生成视频”的入口。当前官方站点已经把它写成 Your AI creative studio，并把 Gemini Omni、Nano Banana、Veo 3.1 这些模型一起放进同一个工作台。这意味着 Flow 的定位正在从单次出片，逐步走向围绕创意、镜头、素材和自然语言编辑的连续创作环境。\n\n它特别适合短视频创意、广告脚本测试、视觉提案和需要反复 refine 的内容团队。因为 Flow 不只是生一段视频，而是允许你在计划、生成和细修之间来回迭代。对营销团队和创作者来说，这比只追求单次惊艳生成更有商业价值。\n\n边界依旧存在。视频生成的成本、稳定性、人物一致性和成片可控度，仍然决定了它更适合做创意加速器，而不是完全替代传统后期流程。Flow 已经很值得跟，但更适合理解成“内容生产前台的加速层”。',
    category: 'AI视频',
    categorySlug: 'video',
    pricingType: 'paid',
    priceRange: '功能与可用额度通常随 Google AI 订阅层级、地区和 credits 政策变化。',
    website: 'https://flow.google/',
    features: ['AI creative studio', '视频与图像一体化', '自然语言细修', '多模型协同', '更适合内容团队迭代'],
    pros: ['官方产品方向很完整', '适合从创意到 refine 的连续流程', '视频与图像能力联动强', '面向创作者的产品表达清晰'],
    cons: ['成片稳定性仍需人工筛选', '价格与 credits 受订阅层级影响', '复杂长内容仍要靠传统制作流程配合'],
    alternatives: ['Runway', 'Kling AI', 'Pika'],
    editorRating: 4.6,
    difficulty: 2,
    createdAt: '2026-06-25',
    updatedAt: '2026-06-25',
    isFeatured: true,
    reviewSources: [
      {
        source: 'Google Flow 官方',
        url: 'https://flow.google/',
        summary: '官方首页已将 Flow 定位为 AI creative studio，强调视频、图像、agent 和多模型协同的完整创作空间。'
      },
      {
        source: 'Google Blog',
        url: 'https://blog.google/innovation-and-ai/products/google-flow-veo-ai-filmmaking-tool/',
        summary: 'Google 发布文章将 Flow 定义为 built with and for creatives 的 AI filmmaking tool，并强调与 Veo、Imagen、Gemini 的结合。'
      }
    ],
  },
];

export default sourcedBatchToolsRound11;
