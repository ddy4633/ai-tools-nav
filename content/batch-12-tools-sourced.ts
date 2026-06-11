import type { Tool } from '@/types/tool';

export const sourcedBatchToolsRound11: Tool[] = [
  {
    id: 'claude-4',
    name: 'Claude 4',
    slug: 'claude-4',
    description: 'Anthropic 新一代 Claude 模型家族，主打更强的代码、推理、Agent 和长任务持续执行能力。',
    reason: '它不是简单版本更新，而是把“写代码、调工具、跑长任务”这条高商业价值工作流又往前推了一大截。',
    fullReview: 'Claude 4 值得单独列出来，不只是因为它强，而是因为它把 AI 的主战场继续往“真实工作交付”推进了。Anthropic 在官方发布里把重点放在 coding、advanced reasoning 和 AI agents 上，这对买家来说是很明确的信号：Claude 4 不只是聊天更顺，而是更适合进入复杂项目、长链路任务和开发执行场景。\n\n如果你关注的是付费意愿最强的一批用户——开发团队、研究型岗位、需要复杂文档和多工具协同的知识工作者——Claude 4 的吸引力很直接。它背后的产品叙事也更完整：模型升级、Claude Code 正式可用、工具调用和记忆能力一起补齐。这意味着用户买的不只是模型，而是一整套更能落地的工作方式。\n\n它的门槛也同样清楚。Claude 4 更适合有明确任务密度的人，而不是轻量聊天用户；如果只是偶尔问答，它的价值感没有那么容易放大。但一旦你的目标是代码产出、文档交付、Agent 编排或者高质量长任务，Claude 4 就会很有存在感。',
    category: 'AI聊天',
    categorySlug: 'chatbot',
    pricingType: 'freemium',
    priceRange: 'Sonnet 4 免费可试；API 价格为 Sonnet 4 每百万输入/输出 token 3/15 美元，Opus 4 为 15/75 美元。',
    website: 'https://claude.ai',
    features: ['更强代码与推理', '扩展思考配合工具调用', '并行工具执行', '更适合长任务 Agent', 'Claude Code 正式可用'],
    pros: ['开发与知识工作价值更直接', '长任务稳定性更强', 'Agent 场景产品叙事完整', '有免费入口也有成熟付费层'],
    cons: ['轻量用户不一定能立刻感到差异', '高阶价值更依赖真实工作流', '高级能力主要在付费和 API 场景放大'],
    alternatives: ['ChatGPT', 'Gemini', 'DeepSeek', 'Claude Code'],
    editorRating: 4.9,
    difficulty: 2,
    createdAt: '2026-06-11',
    updatedAt: '2026-06-11',
    reviewSources: [
      {
        source: 'Anthropic 官方发布',
        url: 'https://www.anthropic.com/news/claude-4',
        summary: 'Anthropic 在 2025 年 5 月 22 日宣布 Claude Opus 4 和 Sonnet 4，重点强调 coding、advanced reasoning、AI agents、并行工具调用和 Claude Code 正式可用。'
      }
    ],
    isFeatured: true,
  },
  {
    id: 'google-flow',
    name: 'Google Flow',
    slug: 'google-flow',
    description: 'Google 面向创作者推出的 AI 影视制作工具，围绕 Veo 系列模型做镜头、场景和资产级创作。',
    reason: '这类工具最有流量潜力的点，不是“会生成视频”，而是“越来越像能做成片的工作台”。',
    fullReview: 'Google Flow 的重要性在于，它不再只是把文生视频包装成一个炫技入口，而是明显往“创作者工作台”方向走。官方对它的定位就是 AI-powered filmmaking tool，并把 Camera Controls、Scenebuilder、Asset Management 这些能力摆出来，这说明 Flow 的卖点已经不是单次生成，而是更连续的镜头控制和素材管理。\n\n这会更容易带来高意图流量。因为真正愿意付费的用户，不只想看 demo，而是想知道这个工具能不能进入短片、广告、产品视频、社媒内容这些真实生产链路。Flow 这种叙事天然更适合做“值不值得订阅 Google AI Pro/Ultra”“和 Runway、Kling、Sora 怎么比”这类商业化内容。\n\n它当前的边界也很明确：地区可用性、订阅门槛、生成成本和后期协同都还会影响大规模 adoption。但从“视频生成工具榜单”角度看，Flow 已经是必须被单独拿出来讲的名字。',
    category: 'AI视频',
    categorySlug: 'video',
    pricingType: 'paid',
    priceRange: '当前主要向 Google AI Pro / Ultra 订阅用户开放，美国先行。',
    website: 'https://labs.google/fx/tools/flow',
    features: ['Veo 驱动视频创作', 'Camera Controls', 'Scenebuilder', 'Asset Management', 'Flow TV 学习与示例'],
    pros: ['更像创作工作台而不是单次生成器', '镜头与场景控制更容易讲清价值', '适合视频创作与营销内容比较场景', '背靠 Google 模型生态'],
    cons: ['地区和订阅门槛会影响转化', '真实成片仍需人工后期', '更适合内容生产者而非纯轻娱乐用户'],
    alternatives: ['Runway', 'Kling AI', 'Sora', 'Pika'],
    editorRating: 4.7,
    difficulty: 2,
    createdAt: '2026-06-11',
    updatedAt: '2026-06-11',
    reviewSources: [
      {
        source: 'Google Blog',
        url: 'https://blog.google/innovation-and-ai/products/google-flow-veo-ai-filmmaking-tool/',
        summary: 'Google 在 2025 年 5 月 20 日介绍 Flow，明确把它定位为 AI filmmaking tool，并重点展示 Camera Controls、Scenebuilder 和 Asset Management。'
      },
      {
        source: 'Google Labs',
        url: 'https://labs.google/fx/tools/flow',
        summary: 'Google Labs 产品页把 Flow 定位为面向 creatives 的视频与图像创作工具，强化了它作为创作工作台而非单点 demo 的产品心智。'
      }
    ],
    isFeatured: true,
  },
  {
    id: 'stitch',
    name: 'Stitch',
    slug: 'stitch',
    description: 'Google Labs 的 AI 界面设计工具，可从文本、图片或线框快速生成 UI 设计和前端代码。',
    reason: '它踩中的不是“画图”需求，而是产品、设计、开发三方都愿意点进来的高意图交叉流量。',
    fullReview: 'Stitch 的价值很适合做流量，因为它天然站在“idea to app”这条热门叙事上。Google 最早介绍它时，就把重点放在把 prompt 和 image inputs 变成 UI designs 和 frontend code；后续更新又继续往 high-fidelity UI、AI-native canvas、voice critique 和导出到开发工具推进。\n\n这意味着 Stitch 不只是一个“生成页面稿”的小工具，而是在占一个很值钱的位置：谁能更快把想法变成可讨论、可导出、可继续开发的界面。这个问题会同时吸引产品经理、独立开发者、设计师和创始人，也更容易承接比较、替代、教程和联盟链接内容。\n\n它目前最适合早期探索、界面方向收敛和快速原型，不应被误读成完整设计系统或成熟交付平台。但正因为它适合“先跑起来”，反而更适合成为高点击入口。',
    category: '设计助手',
    categorySlug: 'design',
    pricingType: 'free',
    priceRange: 'Google Labs 实验产品，当前以试用/实验入口为主，尚未形成独立企业级定价结构。',
    website: 'https://stitch.withgoogle.com/',
    features: ['文本生成 UI', '从图片或线框生成界面', '快速变体探索', '导出前端代码', '可粘贴到 Figma'],
    pros: ['同时吸引产品、设计、开发流量', '非常适合比较与教程型内容', '从想法到界面稿的路径更短', 'Google 持续迭代明显'],
    cons: ['更偏原型与探索，不是完整交付系统', '实验产品形态仍可能变化', '复杂设计系统落地还得回到成熟工具'],
    alternatives: ['v0.dev', 'Lovable', 'Galileo AI', 'Figma AI'],
    editorRating: 4.7,
    difficulty: 1,
    createdAt: '2026-06-11',
    updatedAt: '2026-06-11',
    reviewSources: [
      {
        source: 'Google Developers Blog',
        url: 'https://developers.googleblog.com/stitch-a-new-way-to-design-uis/',
        summary: 'Google 在 2025 年 5 月 20 日把 Stitch 介绍为能把文本和图片输入转成复杂 UI 设计与前端代码的 Google Labs 实验。'
      },
      {
        source: 'Google Blog',
        url: 'https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-ai-ui-design/',
        summary: 'Google 后续更新继续强调 Stitch 的 high-fidelity UI、AI-native canvas、语音批注和导出到开发工具，说明它仍在向更完整工作流推进。'
      }
    ],
    isFeatured: true,
  },
  {
    id: 'wispr-flow',
    name: 'Wispr Flow',
    slug: 'wispr-flow',
    description: '跨桌面和移动端的 AI 语音输入工具，主打把说话直接变成更干净、更像成稿的文本。',
    reason: '它踩中的是高频办公效率场景，比“炫酷生成器”更接近稳定付费软件。',
    fullReview: 'Wispr Flow 这类产品的吸引力，在于它不是让你“多一个聊天框”，而是直接改写输入方式。官方最核心的表达非常明确：4x faster than typing，并且支持 Mac、Windows、iPhone、Android。这种定位天然更适合切入真实工作场景：回消息、写文档、写代码、做笔记、改文本。\n\n从商业角度看，这类工具更容易形成稳定续费。因为用户一旦把它嵌进日常工作，就不是偶尔玩一下，而是每天都在用。它也很适合和 Claude、ChatGPT、Perplexity 这些“思考层”工具搭配，形成“语音输入 + AI 执行”的完整工作流内容。\n\n它的风险点在于，语音工具最终要靠准确率、延迟、隐私和跨应用稳定性说话；广告感再强也挡不住真实体验。如果产品做不到稳定，留存会很快见顶。但至少现在，它已经很值得放进“能带来持续效率收益”的名单里。',
    category: '效率工具',
    categorySlug: 'productivity',
    pricingType: 'freemium',
    priceRange: 'Basic 免费；Pro 约 15 美元/人/月，年付约 12 美元/人/月，含 14 天 Pro 试用。',
    website: 'https://wisprflow.ai/',
    features: ['4 倍于键盘的语音输入定位', 'AI auto-edits', '跨 Mac/Windows/iPhone/Android', '100+ 语言', '团队协作与隐私模式'],
    pros: ['高频刚需场景明显', '比聊天型产品更容易形成留存', '多端覆盖完整', '付费层级清楚'],
    cons: ['体验高度依赖识别准确率和稳定性', '语音习惯需要培养', '对安静环境和设备条件更敏感'],
    alternatives: ['Superwhisper', 'MacWhisper', 'Apple Dictation', 'Speechify'],
    editorRating: 4.6,
    difficulty: 1,
    createdAt: '2026-06-11',
    updatedAt: '2026-06-11',
    reviewSources: [
      {
        source: 'Wispr Flow 官网',
        url: 'https://wisprflow.ai/',
        summary: '官方首页把 Flow 定位为跨应用 voice-to-text AI，并反复强调 create、code、message、write 时“4x faster than typing”。'
      },
      {
        source: 'Wispr Flow 定价页',
        url: 'https://wisprflow.ai/pricing',
        summary: '定价页显示 Flow Pro 提供 14 天免费试用，个人 Pro 约 15 美元/月或年付 12 美元/月，多端无限字数和团队能力进入付费层。'
      }
    ],
    isFeatured: true,
  },
  {
    id: 'granola',
    name: 'Granola',
    slug: 'granola',
    description: '面向高频会议人群的 AI notepad，强调 botless、私密、可复用的会议上下文与行动项。',
    reason: '会议笔记是高频刚需，而 Granola 的“不是 bot，不打扰会议”叙事非常容易形成转化。',
    fullReview: 'Granola 不是靠“我也能记会议纪要”来赢，而是靠产品感觉更克制。官方的表述很直接：The AI notepad for people in back-to-back meetings，notes、actions and memory quietly handled for you。再往下看，Private by default、Works with every meeting platform、botless device audio capture 这些点，都非常适合拿来做对比型内容。\n\n它有商业价值，是因为会议场景天然高频，而且会议之后最有价值的不是摘要本身，而是后续动作、团队共享和进入 CRM / Notion / Slack / MCP 工作流。Granola 现在已经把这些方向往前延伸，这比“会生成纪要”更能撑起付费。\n\n当然，它也不是所有团队都会买单。对极少开会或者强隐私约束的团队，价值会没那么直接；同时会议类产品竞争非常密集，差异化必须靠体验和集成持续证明。但从内容和商业意图看，它已经是不能绕过的名字。',
    category: '效率工具',
    categorySlug: 'productivity',
    pricingType: 'freemium',
    priceRange: '基础版可免费开始；Business 约 14 美元/人/月，Enterprise 约 35 美元/人/月起。',
    website: 'https://www.granola.ai/',
    features: ['AI notepad 而非会议 bot', '私有默认', '适配各类会议平台', '会议后动作与记忆', '与 Notion / Slack / MCP 等工作流衔接'],
    pros: ['高频会议用户的价值感很强', '不以 bot 身份加入会议更自然', '从纪要延伸到行动项更容易付费', '商业化层级已经清晰'],
    cons: ['对低会议密度用户吸引力有限', '竞争对手多', '隐私与分享策略会被认真审视'],
    alternatives: ['Otter', 'Fireflies', 'Fathom', 'Notion AI'],
    editorRating: 4.7,
    difficulty: 1,
    createdAt: '2026-06-11',
    updatedAt: '2026-06-11',
    reviewSources: [
      {
        source: 'Granola 官网',
        url: 'https://www.granola.ai/',
        summary: '官方首页把 Granola 定位为面向 back-to-back meetings 的 AI notepad，并强调 private by default、works with every meeting platform、download for free。'
      },
      {
        source: 'Granola 官方发布',
        url: 'https://www.granola.ai/blog/announcement',
        summary: '官方发布文把 Granola 描述为“regular notepad + quietly listens”，并突出 botless、保留用户主导权和会后可追溯上下文。'
      }
    ],
    isFeatured: true,
  },
  {
    id: 'vapi',
    name: 'Vapi',
    slug: 'vapi',
    description: '开发者向的语音 Agent 平台，围绕电话、客服、预约、销售等真实通话业务提供一站式编排。',
    reason: '语音 Agent 已经开始接近预算和 ROI 讨论，Vapi 这类平台最容易承接企业级商业流量。',
    fullReview: 'Vapi 最值得关注的地方，是它已经不只是“做一个能说话的 AI demo”，而是明确进入了企业通话业务。官网核心表达是 speak human to every customer，并且直接展示 support、lead qualification、appointment scheduling 这些场景。对于商业化内容来说，这种表达很关键，因为它对接的是预算，而不是玩具心态。\n\n它的价值也比很多通用语音产品更容易讲清楚：你要的是 build、test、deploy advanced voice AI agents，而且还要 orchestration、monitoring、telephony、integrations。这意味着用户不是拿它做一个小实验，而是可能拿去承接客服、呼叫中心、销售线索和内部流程自动化。\n\n边界同样存在。真正落地语音 Agent 时，效果、合规、通话成本和客户接受度都会被放大检验。但正因为这里离钱更近，Vapi 会持续吸引高价值流量。',
    category: 'AI音频',
    categorySlug: 'audio',
    pricingType: 'paid',
    priceRange: 'Build 计划按用量计费，通话约 0.05 美元/分钟起，模型成本另计；更大规模走 Scale 合同。',
    website: 'https://vapi.ai/',
    features: ['语音 Agent 编排', '实时监控', '电话与集成能力', '支持客服/预约/销售场景', '按用量扩展到企业规模'],
    pros: ['离真实业务价值非常近', '适合企业和开发者高意图内容', '产品与价格结构清晰', '可延展到电话、短信、聊天'],
    cons: ['通话效果和合规要求高', '真实成本会叠加模型费用', '更偏 B2B，不是大众消费流量产品'],
    alternatives: ['Retell AI', 'Bland', 'ElevenLabs Conversational AI', 'Twilio Voice'],
    editorRating: 4.7,
    difficulty: 3,
    createdAt: '2026-06-11',
    updatedAt: '2026-06-11',
    reviewSources: [
      {
        source: 'Vapi 官网',
        url: 'https://vapi.ai/',
        summary: '官方首页强调 build and deploy voice agents，并以 customer support、lead qualification、appointment scheduling 等业务场景展示产品价值。'
      },
      {
        source: 'Vapi 定价页',
        url: 'https://vapi.ai/pricing',
        summary: '定价页显示 Build 计划按用量计费，通话约 0.05 美元/分钟起，支持并发、HIPAA、Zero Data Retention 等企业特性。'
      }
    ],
    isFeatured: true,
  },
  {
    id: 'browser-use',
    name: 'Browser Use',
    slug: 'browser-use',
    description: '把浏览器能力开放给 AI Agent 的热门基础设施，覆盖真实网页操作、隐身浏览器、Skills 和云端执行。',
    reason: '浏览器 Agent 已经从 demo 变成基础设施赛道，Browser Use 是这一波里最容易带来开发者流量的名字之一。',
    fullReview: 'Browser Use 的核心心智很直接：The Way AI uses the web。它想解决的不是“做一个自动化脚本”，而是让 Agent 真正把互联网当操作界面。对开发者、自动化团队和 B2B 工作流产品来说，这已经不是锦上添花，而是下一轮产品能力的底座。\n\n它之所以很有流量价值，是因为内容空间非常大：Browser Use 是什么、和 Playwright/Stagehand 有什么区别、怎么做网页登录、怎么做数据抓取、怎么做测试、怎么控成本、怎么配 Skills。这些问题都比普通榜单更容易带来稳定搜索需求。\n\n同时它也不算低门槛。浏览器 Agent 仍然要面对站点差异、反爬、权限、成本和稳定性问题，真正跑生产任务需要工程能力。但也正因为问题复杂，开发者会持续找答案。',
    category: 'AI编程',
    categorySlug: 'code',
    pricingType: 'freemium',
    priceRange: '提供免费试用；云端按浏览器、Skill 和调用量计费，官方展示可按月订阅或按量付费。',
    website: 'https://browser-use.com/',
    features: ['真实浏览器自动化', 'Stealth Browsers', 'Skill APIs', '云端与本地双入口', '面向 Agent 的网页操作基础设施'],
    pros: ['Agent 基础设施热度高', '开发者搜索需求持续', '既有开源也有云端商业化', '适合教程、对比和案例型内容'],
    cons: ['对非技术用户门槛高', '生产稳定性依赖具体站点', '成本与权限问题要细算'],
    alternatives: ['Stagehand', 'Playwright', 'Browserbase', 'Open Browser Use'],
    editorRating: 4.8,
    difficulty: 4,
    createdAt: '2026-06-11',
    updatedAt: '2026-06-11',
    reviewSources: [
      {
        source: 'Browser Use 官网',
        url: 'https://browser-use.com/',
        summary: '官方首页直接把 Browser Use 定位为让 AI 使用网页的基础设施，强调 agents at scale、undetectable browsers 和 API for any website。'
      },
      {
        source: 'Browser Use 定价页',
        url: 'https://browser-use.com/pricing',
        summary: '定价页显示它既提供免费入口，也提供浏览器、Skill 与 LLM 级别的商业化计费，这说明产品已经从开源热度走向基础设施定价。'
      }
    ],
    isFeatured: true,
  },
  {
    id: 'browse-sh',
    name: 'Browse.sh',
    slug: 'browse-sh',
    description: '面向 AI Agent 的浏览器技能目录与 CLI，把可复用的网站操作流程做成可安装的技能。',
    reason: '它非常适合承接“Agent 为什么总在网页上重复摸索”这类高讨论度问题。',
    fullReview: 'Browse.sh 很适合拿来做“下一步”内容，因为它切中的不是模型能力，而是 agent memory。Browserbase 官方对它的解释很到位：一个 open catalog of browser skills，launch 时就带 100 个 curated skills，而且强调 reusable playbooks、减少重复探索、降低 token 成本。\n\n它的好处是内容角度很多。你可以从 Codex / Claude Code / Cursor 这些上下文切进去，也可以从 browser automation、workflow reuse、cost reduction、skills ecosystem 这些方向切进去。对一个做 AI 工具导航的站来说，这类产品非常容易形成差异化内容，而不是只复读“又一个浏览器 Agent”。\n\n它现阶段的门槛在于，真正理解其价值的人仍以开发者和自动化团队为主；对大众用户来说，它不像聊天助手那样一眼能懂。但只要你的目标是更值钱的技术流量，它就很值得放大。',
    category: 'AI编程',
    categorySlug: 'code',
    pricingType: 'free',
    priceRange: 'Browse CLI 和 Browse.sh 技能目录以开源免费入口为主，云端浏览器与平台能力可继续接 Browserbase 商业层。',
    website: 'https://browse.sh/',
    features: ['浏览器技能目录', 'browse CLI', '技能安装与复用', '调试与云端会话', '用技能减少 token 成本'],
    pros: ['技术内容差异化明显', '非常适合 Agent 与浏览器自动化话题', '开源免费入口利于传播', '和 Browserbase 商业层天然联动'],
    cons: ['目标受众更偏开发者', '需要理解 Skills 心智才会觉得值', '价值不如通用聊天产品那样直观'],
    alternatives: ['Browser Use Skills', 'Playwright scripts', 'Stagehand', 'Browserbase Skills'],
    editorRating: 4.6,
    difficulty: 3,
    createdAt: '2026-06-11',
    updatedAt: '2026-06-11',
    reviewSources: [
      {
        source: 'Browse.sh 官网',
        url: 'https://browse.sh/',
        summary: '官网把 Browse.sh 定位为 A browser CLI for your AI Agents，并强调 skills、browser primitives、debugging、cloud sessions 与 50% token cost reduction。'
      },
      {
        source: 'Browserbase 官方博客',
        url: 'https://www.browserbase.com/blog/browse.sh',
        summary: 'Browserbase 在 2026 年 5 月 18 日介绍 Browse.sh 时，强调 100+ curated browser skills、one CLI command、open source 和降低重复探索成本。'
      }
    ],
    isFeatured: true,
  },
];

export default sourcedBatchToolsRound11;
