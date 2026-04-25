import type { Tool } from '@/types/tool';

export const sourcedBatchToolsRound11: Tool[] = [
  {
    id: 'fathom-ai',
    name: 'Fathom',
    slug: 'fathom-ai',
    description: 'AI 会议记录与会议情报工具，重点不只是转录，而是把会后整理、检索和跟进动作一起做掉。',
    reason: '如果你开会很多，Fathom 这类产品真正省下来的不是记笔记时间，而是会后反复翻记录、写总结和补跟进的时间。',
    fullReview: 'Fathom 这轮 3.0 更新后，产品心智已经从“自动会议纪要”变成“会议知识层”。它不只是把会议录下来，而是把摘要、行动项、跨会议检索和后续工作串到一起。对销售、客户成功、创始团队和远程协作岗位来说，这种升级很实用，因为真正痛点从来不是有没有转录，而是会后怎么把信息重新用起来。\n\n它现在比较有记忆点的方向，是 bot-free capture、跨会议的 Ask Fathom，以及和 Claude、ChatGPT 的接入。也就是说，Fathom 开始不只在自己产品内回答问题，而是试着把会议上下文送进你原本已经在用的 AI 工作流里。这比单纯多一份会议摘要更值钱，因为它直接靠近“把会开完，然后产出东西”的目标。\n\n边界也很明确。你如果会议并不多，或者团队本来就很轻量、很少做结构化复盘，Fathom 的价值会下降。另一个现实问题是，会议类工具最终都绕不开权限、隐私、检索准确度和团队采纳率，功能再强也要看团队是否真把它嵌进日常流程。',
    category: '效率工具',
    categorySlug: 'productivity',
    pricingType: 'freemium',
    priceRange: '免费版可用；Premium 约 $15/用户/月，团队版约 $19/用户/月起。',
    website: 'https://fathom.video/',
    features: ['AI 会议摘要', 'bot-free capture', '跨会议问答检索', 'Claude / ChatGPT 集成', 'CRM 与团队协作同步'],
    pros: ['会后整理效率提升非常直接', '跨会议检索比单次摘要更有价值', '与主流会议平台和外部 AI 工具结合紧', '免费版门槛低，团队试用成本小'],
    cons: ['高频价值依赖团队是否真的重度开会', '搜索与人名识别仍会受具体场景影响', '更高级的团队与自动化能力需要付费计划'],
    alternatives: ['Otter', 'Fireflies', 'Read AI'],
    editorRating: 4.7,
    difficulty: 1,
    createdAt: '2026-04-15',
    updatedAt: '2026-04-26',
    isFeatured: true,
    reviewSources: [
      {
        source: 'Fathom 官方',
        url: 'https://fathom.video/',
        summary: '官方把 Fathom 定位为准确的 AI notetaking 工具，核心卖点已经不只是记录，而是可检索的会议知识和可执行输出。'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/posts/fathom-3-0',
        summary: 'Fathom 3.0 在 2026 年 4 月 15 日拿到 Product Hunt 当日第 1，社区讨论重点集中在 bot-free capture、跨会议搜索和 Claude / ChatGPT 集成。'
      },
      {
        source: 'G2',
        url: 'https://www.g2.com/products/fathom-video/reviews',
        summary: 'G2 上的高频反馈仍然是摘要准确、集成顺手、上手快，但也有人持续提到搜索、移动端和部分语言细节还有提升空间。'
      }
    ],
  },
  {
    id: 'google-vids',
    name: 'Google Vids',
    slug: 'google-vids',
    description: 'Google Workspace 里的 AI 视频制作工具，主打办公语境下的脚本、分镜、录屏、AI 片段与协作剪辑。',
    reason: '很多团队不是缺“更电影感”的视频工具，而是缺一个能在工作流里快速做培训、汇报和内部传播视频的产品，Google Vids 就是这个方向。',
    fullReview: 'Google Vids 的优势不在于它一定能做出最惊艳的视频，而在于它把“工作视频”这件事压进了 Workspace 体系里。很多团队真正需要的是录屏讲解、销售物料、培训视频、项目更新和内部说明，而不是电影预告片式的创作。Google Vids 适合的正是这种更高频、更务实的内容生产场景。\n\n从官方产品页和 2026 年 4 月初的 2.0 更新看，它已经把 Gemini、Veo、AI avatars、脚本建议、素材库和协作能力组合在一起。这个组合的关键价值，是把“从一份文档到一段视频”的路径尽量压短。如果你的团队本来就在用 Docs、Drive、Meet 和 Workspace 权限体系，那它的摩擦会比独立视频平台小很多。\n\n当然，它的边界也很清楚。Google Vids 更像工作表达工具，而不是导演级创作工作台。你如果要的是极强镜头控制、影视级风格统一或面向广告团队的高自由度出片，Runway、Higgsfield、Kling 这类产品往往更合适。Vids 的强项是让普通团队把视频当成日常沟通格式，而不是一次性大制作。',
    category: 'AI视频',
    categorySlug: 'video',
    pricingType: 'paid',
    priceRange: '包含在部分 Google Workspace Business / Enterprise 与 Google AI 计划中。',
    website: 'https://workspace.google.com/products/vids/',
    features: ['Gemini 脚本与分镜建议', 'Veo 生成视频片段', 'AI avatars', '录屏与提词器', 'Workspace 协作与权限体系'],
    pros: ['很适合办公和企业传播场景', '和 Google 生态衔接自然', '从文档到视频的路径短', '团队协作与权限管理更成熟'],
    cons: ['更偏工作视频，不是最自由的创意平台', 'AI 能力与语言支持仍有阶段性限制', '很多能力依赖 Workspace 套餐和桌面端体验'],
    alternatives: ['Synthesia', 'Runway', 'HeyGen'],
    editorRating: 4.6,
    difficulty: 2,
    createdAt: '2026-04-04',
    updatedAt: '2026-04-26',
    isFeatured: true,
    reviewSources: [
      {
        source: 'Google Workspace 官方',
        url: 'https://workspace.google.com/products/vids/',
        summary: '官方把 Google Vids 定位为工作场景的视频创作工具，强调 Gemini 辅助脚本、Veo 生成片段、AI avatar 和 Workspace 协作。'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/products/google?comment=5272218',
        summary: 'Google Vids 2.0 于 2026 年 4 月 4 日登上 Product Hunt 当日第 1，外部讨论重点在于免费扩展、Veo 3.1、AI avatar 和直接发布工作视频。'
      },
      {
        source: 'Zapier',
        url: 'https://zapier.com/blog/google-vids',
        summary: 'Zapier 把 Google Vids 归类为适合办公场景的 AI video generator，强调它对脚本、配音、素材和成片流程的低门槛整合。'
      }
    ],
  },
  {
    id: 'softr',
    name: 'Softr',
    slug: 'softr',
    description: '面向业务团队的 AI 应用构建平台，能从一句需求生成界面、数据库和业务逻辑，再回到可视化编辑。',
    reason: '如果你真正想做的是内部系统、客户门户、CRM 或运营工具，而不是只做个 demo 页面，Softr 这种路线比很多“只会生成前端”的产品更实在。',
    fullReview: 'Softr 现在最有意思的地方，是它把“AI 生成”往真正可用的业务软件推进了一步。很多 AI builder 擅长做出一个看起来像样的前端原型，但一到权限、数据结构、业务逻辑和后续维护就开始掉链子。Softr 试图解决的正是这个问题：不只生成界面，还把数据库和业务流程一起搭起来。\n\n它特别适合运营团队、非技术创始人、咨询公司和内部系统需求很多的中小团队。因为这些团队的目标通常不是追求最底层的工程自由，而是尽快把 CRM、客户门户、工单、知识库、后台管理等业务工具跑起来。官方现在也明显在强化这种产品定位：你可以先让 AI 生成，再切回可视化编辑，不被黑盒锁死。\n\n限制同样存在。Softr 再强，也不是为了替代完整的软件工程体系。复杂权限、深度定制、前后端高度耦合业务、性能瓶颈和大规模系统边界，最终还是会把团队带回更专业的工程平台。Softr 更适合“业务软件加速器”，而不是所有复杂产品的一站式终点。',
    category: '效率工具',
    categorySlug: 'productivity',
    pricingType: 'freemium',
    priceRange: '提供 Free 计划；所有套餐都带 AI credits，更高配额与协作能力需付费升级。',
    website: 'https://www.softr.io/ai-app-generator/',
    features: ['AI 生成界面', '自动建库与关系结构', '业务逻辑与权限生成', '可视化编辑与 AI 双模式', '多数据源集成'],
    pros: ['更接近真实业务软件而不是单纯 demo', '非技术团队也能较快上手', '数据与权限能力比纯前端生成器更完整', '后续维护方式相对清晰'],
    cons: ['深度定制与复杂系统仍有边界', '设计自由度不如从零开发', '随着业务复杂度上升仍会回到工程化问题'],
    alternatives: ['Retool', 'Glide', 'Bubble'],
    editorRating: 4.6,
    difficulty: 2,
    createdAt: '2026-04-14',
    updatedAt: '2026-04-26',
    isFeatured: true,
    reviewSources: [
      {
        source: 'Softr 官方',
        url: 'https://www.softr.io/ai-app-generator/',
        summary: '官方现在明确把 Softr AI Co-Builder 定位为能同时生成应用界面、数据库和业务逻辑的 AI app builder，而不是只改 UI。'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/products/softr?comment=5293812',
        summary: 'Softr AI Co-Builder 在 2026 年 4 月 14 日进入 Product Hunt 当日第 3，讨论点集中在“能生成可用业务软件”而不是纯展示页。'
      },
      {
        source: 'G2',
        url: 'https://www.g2.com/products/softr/reviews',
        summary: 'G2 用户普遍认可 Softr 的易用性和集成能力，常见限制则集中在界面定制深度与复杂场景下的灵活性。'
      }
    ],
  },
  {
    id: 'figma-for-agents',
    name: 'Figma for Agents',
    slug: 'figma-for-agents',
    description: '把 AI Agent 直接接到 Figma 设计系统上的新入口，让代理不只是读设计稿，还能按组件、变量和规范写回画布。',
    reason: '它重要的不是“AI 也能画 UI”这件事，而是终于把 AI 产出拉回真实设计系统，不再只生成一堆看起来像样但落不了地的图。',
    fullReview: 'Figma for Agents 的价值，在于它把 AI 设计从“孤立的生成结果”推进到“接入真实设计系统的生产流程”。过去很多 AI 生成 UI 的问题不在于看起来不酷，而在于它们不知道团队真实用的组件、变量、auto layout 和规范，所以结果很容易漂亮但不耐用。Figma 这次把 MCP、`use_figma` 和 skills 放进同一个故事里，本质上是在补这条断层。\n\n这对产品设计师、设计系统团队、设计工程协作团队都很关键。因为一旦 Agent 可以在你的 Figma 资产上读写，它就不只是“做图”，而是更接近“用你的系统继续做设计工作”。这会直接影响 AI 生成结果能不能进入团队真实流程，也会影响设计到代码之间是不是还能保持同一套上下文。\n\n它的边界在于，Agent 接入设计系统并不等于设计判断被自动解决。越是品牌、体验、可访问性和复杂交互层面的细节，越需要人来定标准、做取舍和复核结果。Figma for Agents 很像一个强力加速器，但不是把设计决策整个外包出去。',
    category: '设计助手',
    categorySlug: 'design',
    pricingType: 'freemium',
    priceRange: '目前 beta 期可免费试用，但通常需要 Figma 付费座席；官方说明后续会转为按使用收费。',
    website: 'https://www.figma.com/blog/the-figma-canvas-is-now-open-to-agents/',
    features: ['`use_figma` 写回画布', '读取组件与变量', '连接设计系统上下文', 'skills 规范 Agent 工作方式', '设计到代码协同增强'],
    pros: ['终于把 Agent 结果接到真实设计系统里', '对设计与开发协作非常关键', '能减少 AI 生成 UI 的品牌漂移', '比单纯截图式生成更容易进入团队流程'],
    cons: ['仍需要人工做设计判断与结果复核', '很多价值依赖团队本身是否有成熟设计系统', '当前仍处在 beta 与快速迭代阶段'],
    alternatives: ['Galileo AI', 'v0', 'Locofy'],
    editorRating: 4.7,
    difficulty: 3,
    createdAt: '2026-03-24',
    updatedAt: '2026-04-26',
    isFeatured: true,
    reviewSources: [
      {
        source: 'Figma Blog',
        url: 'https://www.figma.com/blog/the-figma-canvas-is-now-open-to-agents/',
        summary: 'Figma 在 2026 年 3 月 24 日正式宣布 agents 可以直接在 Figma canvas 上工作，核心是 MCP、`use_figma` 和 design system 上下文。'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/products/figma-for-agents?comment=5296726',
        summary: 'Product Hunt 对 Figma for Agents 的定位很明确：让使用 Figma 作为设计真相源的团队，把 AI agent 工作流也接到同一套系统上。'
      },
      {
        source: 'Figma Help Center',
        url: 'https://help.figma.com/hc/en-us/articles/39216419318551-Get-started-with-the-Figma-MCP-server',
        summary: '帮助文档补充了它的实际工作方式：Agent 不只读设计，还能创建和更新 Figma 设计，beta 期先免费开放给付费座席测试。'
      }
    ],
  },
  {
    id: 'higgsfield',
    name: 'Higgsfield',
    slug: 'higgsfield',
    description: '强调镜头语言和相机控制的 AI 视频平台，适合把图片、产品视觉和短视频素材做成更像“拍出来”的内容。',
    reason: '很多 AI 视频工具都在比谁更会“生成”，Higgsfield 更抓人的地方是它把镜头控制这件事做成了产品心智。',
    fullReview: 'Higgsfield 之所以值得单独看，不是因为它也能生成视频，而是因为它把 camera control 这条线做得足够清晰。很多视频工具能给你一个会动的结果，但如果你真在做广告、社媒短片、品牌内容或者镜头感强的产品展示，决定成片质感的往往不是“会不会动”，而是镜头如何移动、节奏怎么推进、画面怎么切。Higgsfield 很明显在往这个方向拉开差异。\n\n从官方 about、camera controls 页面和今年 2 月的 Vibe-Motion 发布看，它不是只想做一个 prompt playground，而是希望把创作者从静态素材快速带到更有镜头逻辑的视频表达。对内容团队、广告创作者、电商素材团队和短视频运营来说，这种价值很现实，因为它更接近“出可用片段”，而不是只出一个有 AI 感的演示。\n\n它也不是没有问题。越偏 cinematic control，学习成本和付费意愿门槛就越高；而且视频工具天然还会遇到一致性、成本、生成等待时间和商用可控性的老问题。Higgsfield 很适合追求镜头表达的人，但不一定是最适合所有轻量用户的第一站。',
    category: 'AI视频',
    categorySlug: 'video',
    pricingType: 'freemium',
    priceRange: '通常提供免费试用额度；更高质量输出、更多生成量和专业工具在付费计划中。',
    website: 'https://higgsfield.ai/',
    features: ['相机运动控制', 'Vibe-Motion 编辑画布', 'Cinematic presets', '适合广告与社媒片段', '从图像到视频的镜头化表达'],
    pros: ['镜头语言和运动控制辨识度强', '比很多通用视频工具更有导演感', '适合广告和高传播内容', '从静态素材到动态表达路径短'],
    cons: ['进阶使用比普通视频工具更挑审美与操作心智', '高质量输出通常会更依赖付费层', '长时叙事与稳定一致性仍然不是这类产品的强项'],
    alternatives: ['Runway', 'Kling AI', 'Pika'],
    editorRating: 4.6,
    difficulty: 2,
    createdAt: '2026-02-05',
    updatedAt: '2026-04-26',
    isFeatured: true,
    reviewSources: [
      {
        source: 'Higgsfield 官方',
        url: 'https://higgsfield.ai/about',
        summary: '官方把 Higgsfield 定位为面向 creators 与 filmmakers 的平台，强调 camera logic、cinematic parameters 和从图像到视频的完整创作链。'
      },
      {
        source: 'Higgsfield Camera Controls',
        url: 'https://higgsfield.ai/camera-controls',
        summary: '官方专门把 camera controls 做成独立能力页，本身就说明它的差异点不只是生成，而是可控的镜头运动和电影语言。'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/posts/higgsfield-vibe-motion',
        summary: 'Higgsfield Vibe-Motion 在 2026 年 2 月 5 日拿到 Product Hunt 当日第 3，社区评价集中在“单提示词做运动画面”和更直接的创作控制感。'
      }
    ],
  },
  {
    id: 'genspark',
    name: 'Genspark',
    slug: 'genspark',
    description: '从 AI 搜索起家、现在快速往全能 Agent 工作台走的产品，主打让研究、表格、PPT、浏览器操作和办公插件都交给代理完成。',
    reason: '如果你在关注“AI 不只是回答问题，而是开始真的做事”，Genspark 是现在非常值得跟的一条产品线。',
    fullReview: 'Genspark 现在最值得看的，不是它能不能像搜索引擎一样回答问题，而是它已经明显在往“AI 员工工作台”推进。到 2026 年 4 月的 AI Workspace 4.0，产品叙事已经从 Super Agent 扩到桌面端、Office 插件、会议、浏览器和更复杂的 workflow。这个方向和普通聊天产品的差异很大，因为它强调的不是一次回答，而是一整段工作被交付出来。\n\n它特别适合研究密集、资料整合多、需要频繁做文档/PPT/表格的岗位，也适合对 agent 工作流保持高兴趣的早期采用者。Product Hunt 上围绕 2.0、Super Agent 和后续版本的讨论，也基本都在强调一点：Genspark 想做的是把多种工具调用和执行链统一进一个入口，让你少切换上下文。\n\n但它的风险同样明显。越是“什么都能做”的 Agent 产品，越容易遇到稳定性、费用模型、权限边界和结果复核问题。Genspark 的上限很高，但更适合把它理解成高潜力工作台，而不是完全无需人工介入的自动驾驶。',
    category: '效率工具',
    categorySlug: 'productivity',
    pricingType: 'freemium',
    priceRange: '提供免费额度；更高 credits、Cloud Computer 和高级 Agent 工作流需升级 Plus / Pro。',
    website: 'https://www.genspark.ai/',
    features: ['Super Agent', 'AI Workspace 4.0', '桌面端 Computer Use', 'Office 插件', '研究与产出一体化'],
    pros: ['很接近真正的 agent 工作台形态', '覆盖研究、文档、PPT、浏览器等多种任务', '更新速度极快，产品张力强', '对高频知识工作者吸引力很大'],
    cons: ['产品迭代快，学习与适应成本也高', '复杂任务仍然需要人工复核', 'credits 与高级能力的成本管理需要持续关注'],
    alternatives: ['Manus', 'ChatGPT', 'Perplexity'],
    editorRating: 4.7,
    difficulty: 2,
    createdAt: '2026-04-08',
    updatedAt: '2026-04-26',
    isFeatured: true,
    reviewSources: [
      {
        source: 'Genspark 官方',
        url: 'https://www.genspark.ai/blog/genspark-ai-workspace-4',
        summary: 'Genspark 在 2026 年 4 月 8 日发布 AI Workspace 4.0，重点已经扩展到桌面端、Office、会议与复杂工作流，不再只是搜索或单轮 Agent。'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/products/genspark',
        summary: 'Product Hunt 的 Genspark 产品页记录了它从 Super Agent 到 AI Workspace 2.0 的连续发布，说明它已经形成持续可见的 Agent 产品线。'
      },
      {
        source: 'Genspark Help Center',
        url: 'https://www.genspark.ai/helpcenter',
        summary: '帮助中心直接把 Super Agent 定义为 autonomous AI assistant，并补充了 credits、Cloud Computer 和高级执行环境的实际使用方式。'
      }
    ],
  },
];

export default sourcedBatchToolsRound11;
