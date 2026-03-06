import type { Tool } from '@/types/tool';

export const sourcedBatchToolsRound10: Tool[] = [
  {
    id: 'felvin',
    name: 'Felvin',
    slug: 'felvin',
    description: '对话式 AI 图片编辑工具，核心不是从零生图，而是把现有图片按自然语言快速改对。',
    reason: '如果你的重点是改图、修图、换背景、调产品图，而不是从零生成艺术海报，Felvin 这种路线更实用。',
    fullReview: 'Felvin 的产品思路和很多图像生成器不一样，它瞄准的是“编辑”而不是“创作起点”。很多团队真正高频遇到的问题并不是先生成一张全新图，而是把现有素材改一下：产品换色、背景替换、模特细修、画面清爽一点、文案区留白更多一点。Felvin 这类工具的价值，就在于把这些原来需要修图软件慢慢调的动作，变成直接用自然语言交代。\n\n它尤其适合电商、内容运营、社媒素材团队和轻量设计需求。对这些角色来说，最重要的不是极限画质，而是“快”和“改得像那么回事”。Felvin 的吸引力在于，用户不必先学习复杂图像工作流，而是先用接近聊天的方式推进图片修改。只要任务不是特别复杂，这种体验会比传统修图工具轻很多。\n\n它的上限也很明确。越是高精度商业设计、复杂透视、品牌级视觉统一和细节苛刻的改图任务，就越需要专业设计软件和人工复核。Felvin 更像一个高效率改图助手，而不是完全替代设计师的终极方案。',
    category: 'AI图像',
    categorySlug: 'image',
    pricingType: 'freemium',
    priceRange: '通常提供免费试用或体验额度，更高使用量、批量处理与商用工作流一般需要订阅升级。',
    website: 'https://felvin.com/',
    features: ['自然语言改图', '局部编辑', '背景替换', '更适合电商与内容素材', '低门槛修图工作流'],
    pros: ['改图场景比生图工具更对口', '学习成本低', '适合高频轻量修图需求', '运营和非设计岗位也容易上手'],
    cons: ['复杂透视和高精度设计仍需人工接手', '第三方权威测评相对较少', '更适合编辑而非完整创意设计链路'],
    alternatives: ['Adobe Firefly', 'Photoshop Generative Fill', 'Canva'],
    editorRating: 4.3,
    difficulty: 1,
    createdAt: '2026-03-06',
    updatedAt: '2026-03-06',
    reviewSources: [
      {
        source: 'Felvin 官方',
        url: 'https://felvin.com/',
        summary: '官方长期将 Felvin 包装为更偏对话式图片编辑的工具，重点不是从零生图，而是把图片按指令快速改好。'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/posts/felvin',
        summary: 'Product Hunt 社区对 Felvin 的讨论焦点主要集中在“自然语言修图”和“对非设计用户更友好”这两个价值点上。'
      },
      {
        source: 'AI Review',
        url: 'https://ai-review.com/low-code-no-code/felvin/',
        summary: 'AI Review 这类工具评测站普遍把 Felvin 归为轻量图像编辑助手，认可其效率，但也提醒它不适合极复杂设计任务。'
      }
    ],
  },
  {
    id: 'recraft-v3',
    name: 'Recraft V3',
    slug: 'recraft-v3',
    description: '偏设计生产的 AI 图像平台，强项是向量、品牌风格、商品视觉和更可控的设计资产输出。',
    reason: '如果你不是只想“生成一张好看图”，而是要做品牌资产、矢量图和设计可交付物，Recraft V3 更对路。',
    fullReview: 'Recraft V3 的差异点不在于它能不能生成图，而在于它更接近设计生产平台。很多图像模型更偏创意探索，但 Recraft 一直更强调可交付的设计资产：矢量、品牌风格、商品图、Mockup、图标、营销素材等。这让它和 Midjourney、DALL·E 这类“先有图感”路线形成了明显区分。\n\n它特别适合设计师、品牌团队、电商视觉和需要高频产出设计素材的运营团队。因为它不只是帮你想图，而是更偏帮你做一套能复用、能统一风格、能进入设计流程的东西。对真实业务而言，这种价值往往比单张图惊艳不惊艳更重要。\n\n边界同样存在。Recraft V3 更像面向设计效率，而不是极自由的艺术创作游乐场；如果你要极端抽象风格或重提示词玩法，别的模型可能更有趣。但若你关心的是更稳、更可控、更接近商用设计资产，Recraft 会非常有吸引力。',
    category: 'AI图像',
    categorySlug: 'image',
    pricingType: 'freemium',
    priceRange: '通常提供免费额度与 Pro 计划，更高分辨率、团队协作和专业设计能力主要落在付费层。',
    website: 'https://www.recraft.ai/',
    features: ['矢量与设计资产生成', '品牌风格统一', '商品与营销视觉', 'Mockup 与图标场景', '更偏可交付设计输出'],
    pros: ['设计场景适配度高', '比通用生图工具更偏商用落地', '矢量与品牌控制能力强', '适合团队持续生产素材'],
    cons: ['纯艺术探索不一定最有趣', '设计导向意味着学习心智和普通生图不同', '重度商用能力更依赖付费层'],
    alternatives: ['Ideogram', 'Adobe Firefly', 'Midjourney'],
    editorRating: 4.6,
    difficulty: 2,
    createdAt: '2026-03-06',
    updatedAt: '2026-03-06',
    reviewSources: [
      {
        source: 'Recraft 官方',
        url: 'https://www.recraft.ai/',
        summary: '官方把 Recraft 定位为面向 designers、creatives、sellers 和 teams 的平台，重点强调 photorealism、vector、styles 与 mockups。'
      },
      {
        source: 'G2',
        url: 'https://www.g2.com/products/recraft/reviews',
        summary: 'G2 用户普遍认可 Recraft 在设计生产、品牌资产和可控性上的优势，同时也会关注它与通用生图工具的使用差异。'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/products/recraft-ai/reviews',
        summary: 'Product Hunt 上关于 Recraft 的反馈长期围绕“更适合设计工作流”展开，而不是只看单张图的惊艳程度。'
      }
    ],
  },
  {
    id: 'kling-ai',
    name: 'Kling AI',
    slug: 'kling-ai',
    description: '可灵 AI 的国际化产品入口，主打高质量图像与视频生成，尤其在中文语境与视频表现上存在强记忆点。',
    reason: '如果你在比较 Sora、Runway、Pika 之外还想看国产头部视频生成路线，Kling AI 一定要放进名单里。',
    fullReview: 'Kling AI 的存在感来自两个层面：一是它代表了快手在生成式视频方向上的强投入，二是它让更多海外用户也开始把“可灵”放进全球视频工具比较名单。很多人第一次注意到它，是因为它在运动、镜头和视觉冲击力上确实能打，而不是只因为“国产”。\n\n它适合创意短视频、广告草案、概念片段、视觉实验和中文提示词工作流。相比一些国外视频产品，Kling AI 对中文用户天然更友好，而在国际入口上又努力用更完整的产品包装吸引全球用户，这让它同时具备本土优势和国际竞争感。\n\n当然，视频生成工具的共性问题它也一样要面对：时长、稳定性、可控性、人物一致性和后期衔接，仍然都需要人工把关。Kling AI 很强，但它最适合当创意加速器，而不是一键交付所有成片。',
    category: 'AI视频',
    categorySlug: 'video',
    pricingType: 'freemium',
    priceRange: '通常提供免费体验与 credits 体系，更高分辨率、更多生成量和专业计划依赖积分或订阅升级。',
    website: 'https://www.klingai.com/',
    features: ['文生视频与图生视频', '国际化入口', '中文语境友好', '适合创意短视频', '图像与视频一体化创作'],
    pros: ['视频表现力强', '中文提示词体验友好', '全球讨论度持续上升', '适合创意和营销片段'],
    cons: ['视频生成仍需大量人工筛选', '复杂长时叙事不等于完全稳定', '计划层与积分消耗需要关注'],
    alternatives: ['Sora', 'Runway', 'Pika'],
    editorRating: 4.6,
    difficulty: 2,
    createdAt: '2026-03-06',
    updatedAt: '2026-03-06',
    reviewSources: [
      {
        source: 'Kling AI 官方',
        url: 'https://www.klingai.com/',
        summary: '官方将 Kling AI 定位为 imaginative images and videos 的创作工具，说明其国际版不只强调视频，也在做多模态创作平台。'
      },
      {
        source: 'Tom\'s Guide',
        url: 'https://www.tomsguide.com/ai/ai-image-video/forget-sora-kling-is-a-killer-new-ai-video-model-that-just-dropped-and-im-impressed',
        summary: 'Tom\'s Guide 认为 Kling 在视频生成上确实足够惊艳，甚至会被用户拿来与 Sora 直接比较。'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/products/kling-ai-4/reviews',
        summary: 'Product Hunt 社区对 Kling AI 的评价重点集中在视频质量、全球可用性和与头部产品的正面对比。'
      }
    ],
  },
  {
    id: 'kimi-k25',
    name: 'Kimi K2.5',
    slug: 'kimi-k25',
    description: '月之暗面当前主推的开放视觉 Agent 模型，强调视觉编码、Agent Swarm 和真正可交付的工作输出。',
    reason: '如果你要看的不是传统聊天模型，而是更偏“能把工作做出来”的 Kimi 新路线，K2.5 是关键版本。',
    fullReview: '到 2026 年 3 月 6 日，Kimi 官方首页和模型页主推的重点已经不再只是长上下文聊天，而是 K2.5 所代表的“open visual agentic model”。这说明 Kimi 的方向已经明显从回答问题，转向文档、表格、幻灯片、网站、研究报告等更完整的工作交付。\n\nK2.5 的吸引力，在于它把视觉理解、代码、Agent 和多代理协同放进了同一套产品叙事里。对很多用户来说，这意味着 Kimi 不再只是“帮我总结一下文档”，而是越来越接近“帮我把这件工作做出来”。这种定位和 Manus、Operator、Claude Code 等趋势互相呼应，也解释了为什么 Kimi 近阶段会更强调 Agent Swarm。\n\n它也不是没有边界。Agent 和交付型产品越往前走，越会受到权限、可靠性、长任务稳定性和结果复核的挑战。K2.5 很值得关注，但更适合放在“下一代工作型 AI”视角理解，而不是只拿来做普通问答比较。',
    category: 'AI聊天',
    categorySlug: 'chatbot',
    pricingType: 'freemium',
    priceRange: '官方说明通常提供免费体验和使用上限，更高使用量、Agent 能力与高级工作流依赖付费计划。',
    website: 'https://www.kimi.com/ai-models/kimi-k2-5',
    features: ['视觉编码', 'Agent 模式', 'Agent Swarm', '生成文档/表格/网站/报告', '更偏真实工作交付'],
    pros: ['产品定位非常前沿', '不再局限于聊天回答', '中文用户理解门槛低', '对复杂工作流很有想象空间'],
    cons: ['长任务稳定性与可靠性仍需观察', '越强的 Agent 越需要人工复核', '产品迭代快，用户需适应新模式'],
    alternatives: ['Manus', 'ChatGPT', 'Claude'],
    editorRating: 4.7,
    difficulty: 2,
    createdAt: '2026-03-06',
    updatedAt: '2026-03-06',
    reviewSources: [
      {
        source: 'Kimi 官方',
        url: 'https://www.kimi.com/ai-models/kimi-k2-5',
        summary: '官方明确将 K2.5 定义为 open visual agentic model，并突出 visual coding 与 agent swarm intelligence。'
      },
      {
        source: 'Reuters',
        url: 'https://www.reuters.com/business/media-telecom/chinas-moonshot-ai-releases-open-source-model-reclaim-market-position-2025-07-11/',
        summary: '路透把 Moonshot 的新模型动作放进中国大模型竞争格局里看，说明 Kimi 的迭代已不仅是产品更新，更是市场攻防。'
      },
      {
        source: 'KrASIA',
        url: 'https://kr-asia.com/moonshot-ai-sees-overseas-revenue-surge-as-kimi-k2-5-gains-traction-abroad',
        summary: 'KrASIA 认为 Kimi K2.5 的 traction 已开始外溢到海外市场，这说明它不再只是面向国内用户的单点工具。'
      }
    ],
  },
  {
    id: 'hunyuan-video',
    name: 'HunyuanVideo',
    slug: 'hunyuan-video',
    description: '腾讯混元的视频生成模型体系，亮点在于开源路线、研究透明度和对开发者可接入性更友好。',
    reason: '如果你想要的不是单纯在线生成，而是能研究、部署、微调或自建视频能力，HunyuanVideo 很值得看。',
    fullReview: 'HunyuanVideo 的重要性，在于它把高质量视频生成从“只能看闭源演示”往“开发者也能真正接触和使用”方向推进了一步。相比纯消费级视频工具，它更像是一个模型与系统框架，吸引的是研究者、开源开发者、企业技术团队和希望自建能力的人。\n\n这使它和 Sora、Runway、Kling 形成了一个不同维度的竞争关系：后者更强调产品体验和创意出片，而 HunyuanVideo 更强调技术路线、模型开放度和可扩展性。对企业和开发者来说，是否能自己掌控模型、算力和工作流，常常比某次网页 demo 更重要。\n\n它的现实门槛也很清楚：开源不等于轻松使用。视频模型对算力、部署、推理速度和工程经验要求都很高，因此 HunyuanVideo 更适合技术团队，而不是想即开即用的普通创作者。',
    category: 'AI视频',
    categorySlug: 'video',
    pricingType: 'free',
    priceRange: '模型与代码通常以开源形式提供，实际成本主要来自算力、部署和推理资源。',
    website: 'https://github.com/Tencent-Hunyuan/HunyuanVideo-1.5',
    features: ['开源视频模型', '适合自建与研究', '腾讯混元体系支持', '可接入开发者工作流', '强调研究透明度'],
    pros: ['开源路线清晰', '对开发者和研究团队友好', '适合自建能力', '具备较强行业参考价值'],
    cons: ['部署和使用门槛高', '算力需求大', '不如网页型工具即开即用'],
    alternatives: ['Kling AI', 'Runway', 'Sora'],
    editorRating: 4.5,
    difficulty: 4,
    createdAt: '2026-03-06',
    updatedAt: '2026-03-06',
    reviewSources: [
      {
        source: 'Tencent Hunyuan GitHub',
        url: 'https://github.com/Tencent-Hunyuan/HunyuanVideo-1.5',
        summary: '官方仓库直接把 HunyuanVideo 1.5 描述为 leading lightweight video generation model，强调其模型与代码可供开发者使用。'
      },
      {
        source: 'arXiv',
        url: 'https://arxiv.org/abs/2412.03603',
        summary: '论文将 HunyuanVideo 放在开源大视频生成模型框架的语境中，强调其系统性设计和对闭源能力差距的追赶。'
      },
      {
        source: 'Hugging Face',
        url: 'https://huggingface.co/tencent/HunyuanVideo-1.5',
        summary: 'Hugging Face 社区页面说明 HunyuanVideo 已进入开发者与模型社区的实际使用和讨论范围，而不只是论文展示。'
      }
    ],
  },
  {
    id: 'step-1o',
    name: 'Step-1o',
    slug: 'step-1o',
    description: '阶跃星辰 1o 系列中的关键模型名，当前公开资料更常以 Step-1o Vision / Audio 等多模态路线呈现。',
    reason: '如果你关注国产多模态与推理路线，Step-1o 更适合作为“系列能力入口”而不是单一聊天型号来看。',
    fullReview: 'Step-1o 这条产品线更适合放在“系列”而不是“单一模型”视角理解。到目前公开资料中，用户更容易看到的是 Step-1o Vision、Step-1o Audio 等形态，这说明阶跃星辰并不是把 1o 做成一个普通聊天入口，而是在推进文本、视觉、语音一体化的多模态路线。\n\n这让 Step-1o 的价值更多体现在技术方向和平台能力上。对开发者和行业观察者来说，它代表的是国产多模态模型如何从单点能力，走向一整套理解与生成体系。而对普通用户来说，最现实的意义则是：阶跃星辰的开放平台在持续补齐推理、多模态和 API 路线。\n\n也正因如此，Step-1o 现在并不适合被简单看成“又一个聊天模型”。它更像是理解 Stepfun 技术布局的窗口。真正落地时，用户更可能接触到的是具体子型号和平台能力，而不是只盯着 Step-1o 这个名字本身。',
    category: 'AI聊天',
    categorySlug: 'chatbot',
    pricingType: 'freemium',
    priceRange: '通常通过开放平台/API 入口接入，价格与可用性更取决于具体子模型和调用方式。',
    website: 'https://platform.stepfun.com/',
    features: ['多模态路线', 'Step-1o Vision / Audio 系列延展', '开放平台接入', '推理与理解能力', '更适合开发者视角理解'],
    pros: ['代表国产多模态路线的重要玩家', '平台化方向明确', '适合持续关注模型家族演进', '对开发者有研究价值'],
    cons: ['公开侧产品心智不如头部聊天助手清晰', '普通用户不一定容易直接理解其版本体系', '更适合放在系列能力里看'],
    alternatives: ['Qwen 2.5-Max', 'Kimi K2.5', 'Gemini 2.0 Pro'],
    editorRating: 4.2,
    difficulty: 3,
    createdAt: '2026-03-06',
    updatedAt: '2026-03-06',
    reviewSources: [
      {
        source: 'StepFun 官方',
        url: 'https://platform.stepfun.com/',
        summary: '官方开放平台和文档更强调系列化模型与开发者接入路径，说明 Step-1o 应放在平台能力体系中理解。'
      },
      {
        source: '财联社 / 科创板日报',
        url: 'https://www.cls.cn/detail/1925507',
        summary: '财联社报道明确提到 Step-1o Vision，并指出 Step-1o 系列走的是文本、视觉、语音三模态生成理解一体化路线。'
      },
      {
        source: '腾讯新闻',
        url: 'https://news.qq.com/rain/a/20250121A0860900',
        summary: '腾讯新闻转载的行业报道进一步说明 Step-1o 更像一个系列布局，而非单一对话产品。'
      }
    ],
  },
  {
    id: 'flowise',
    name: 'Flowise',
    slug: 'flowise',
    description: '开源可视化 AI Agent / LLM 工作流平台，适合用拖拽方式快速搭建聊天机器人、RAG 和多步骤代理。',
    reason: '如果你想少写代码先把 Agent 或 RAG 原型跑起来，Flowise 是非常典型且成熟的开源入口。',
    fullReview: 'Flowise 的吸引力在于，它把很多原本需要写一堆框架代码的工作流，变成了拖拽和节点连接。对不少团队来说，这种体验能大幅缩短从“我们想试试 AI 工作流”到“我们真的把原型跑起来了”的时间。特别是在 RAG、聊天机器人、工具调用和多步骤 Agent 场景里，Flowise 很容易成为第一批上手的开源平台。\n\n它适合产品验证、内部工具、PoC、教学和开发团队之间的沟通桥梁。因为它的可视化方式，让非纯后端角色也能看懂工作流逻辑，而 GitHub 和文档生态又足够开放，方便技术团队继续二次开发。这种“看得见 + 改得动”的组合，是 Flowise 长期受欢迎的关键。\n\n它的限制也很明显。可视化并不等于零复杂度，真正进入多环境部署、权限管理、日志治理和复杂 Agent 可靠性之后，团队还是要回到工程化问题上。Flowise 适合快速搭好框架，但不代表后续就没有系统设计工作。',
    category: '效率工具',
    categorySlug: 'productivity',
    pricingType: 'free',
    priceRange: '开源自托管免费；若使用官方云或托管服务，通常会有团队和商用计划。',
    website: 'https://flowiseai.com/',
    features: ['可视化搭建 Agent', 'RAG 工作流', '多模型与工具集成', '开源可自托管', '适合原型和内部工具'],
    pros: ['开源透明', '拖拽式搭建效率高', '很适合快速验证 AI 工作流', '开发者社区活跃'],
    cons: ['复杂系统仍需工程化治理', '可视化节点多了以后也会变复杂', '重度生产环境要补监控与权限体系'],
    alternatives: ['LangFlow', 'Dify', 'n8n'],
    editorRating: 4.6,
    difficulty: 2,
    createdAt: '2026-03-06',
    updatedAt: '2026-03-06',
    reviewSources: [
      {
        source: 'Flowise 官方',
        url: 'https://flowiseai.com/',
        summary: '官方将 Flowise 定位为 open source generative AI development platform，核心卖点是 visually build AI agents 与 LLM orchestration。'
      },
      {
        source: 'GitHub',
        url: 'https://github.com/FlowiseAI/Flowise',
        summary: 'GitHub 仓库长期以“Build AI Agents, Visually”作为核心描述，社区活跃度也说明它已是开源工作流赛道的重要项目。'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/products/build-llms-apps-easily',
        summary: 'Product Hunt 社区对 Flowise 的评价长期围绕“让 Agent/RAG 更容易试起来”，认可其原型效率和可视化体验。'
      }
    ],
  }
];

export default sourcedBatchToolsRound10;
