import type { Tool } from '@/types/tool';

export const sourcedBatchTools: Tool[] = [
  {
    id: 'kimi',
    name: 'Kimi',
    slug: 'kimi',
    description: '月之暗面推出的中文 AI 助手，长文档阅读、资料整理和深度问答体验突出。',
    reason: '如果你的核心需求是“读长文、拆资料、做中文研究”，Kimi 依然是最稳的一档。',
    fullReview: 'Kimi 最强的不是花哨功能，而是它对长文本工作流的适配度。把论文、研报、会议纪要、产品需求文档一次性喂进去，再让它抽取重点、列出问题、给出结构化结论，整体体验会比很多通用聊天工具更顺手。\n\n它在中文表达和资料归纳上的完成度尤其高，适合研究、咨询、产品、运营这类需要“先读后写”的工作。相比更偏通用聊天的产品，Kimi 的优势在于长上下文策略清晰，文件理解和多轮追问更稳定。\n\n不足也很直接：在强工具链、复杂 Agent 调度和开发生态上，它没有国际头部产品那么完整；一旦任务从“读懂材料”转向“调用外部工具连续执行”，优势就会变弱。',
    category: 'AI聊天',
    categorySlug: 'chatbot',
    pricingType: 'freemium',
    priceRange: '基础功能可免费体验，部分高阶能力按官方当前套餐策略开放',
    website: 'https://www.kimi.com',
    features: ['长文本理解', '文件解析', '资料归纳', '联网问答', '代码与写作辅助'],
    pros: ['长文档处理能力强', '中文表达自然', '资料整理效率高', '上手门槛低'],
    cons: ['复杂 Agent 场景不算强项', '高峰期响应体验可能波动', '生态扩展能力不如海外头部产品'],
    alternatives: ['ChatGPT', 'Claude', 'DeepSeek'],
    editorRating: 4.5,
    difficulty: 1,
    createdAt: '2026-03-06',
    updatedAt: '2026-03-06',
    reviewSources: [
      {
        source: 'Moonshot AI 用户手册',
        url: 'https://moonshot-ai.gitbook.io/moonshot-ai/user-manual',
        summary: '官方文档强调 Kimi 系列在长上下文、文件理解和视觉能力上的产品路线，适合资料密集型问答与阅读场景。'
      },
      {
        source: 'South China Morning Post',
        url: 'https://www.scmp.com/tech/tech-trends/article/3324350/moonshot-ais-updated-kimi-model-offers-expanded-context-window-improved-coding',
        summary: '媒体测评关注点集中在上下文窗口扩展和代码能力补强，说明 Kimi 的竞争力主要来自长上下文和实用工作流，而不是单点炫技。'
      }
    ],
    isFeatured: true,
  },
  {
    id: 'qwen',
    name: '通义千问',
    slug: 'qwen',
    description: '阿里巴巴通义千问系列面向中文场景优化明显，在长文本、多模态和企业接入上都比较均衡。',
    reason: '它不是某一项特别激进，而是整体能力最均衡，尤其适合中文办公与企业接入。',
    fullReview: '通义千问最大的价值是“稳”和“全”。对个人用户来说，它的中文理解、联网问答、图文能力和文档处理都已经足够覆盖大多数日常工作；对企业团队来说，阿里云体系下的模型家族、API 和行业接入路径又比较完整。\n\n如果你的工作偏中文写作、企业知识库、文档分析或多模型部署，通义千问通常是更容易落地的一类方案。尤其是长文本和多模态方向，官方路线图推进很快，适合需要持续跟进版本升级的团队。\n\n短板在于：消费端产品体验虽然不断提升，但品牌心智仍偏“平台能力”而非“极致 C 端体验”；普通用户在面对不同版本和不同入口时，也可能会觉得产品矩阵略复杂。',
    category: 'AI聊天',
    categorySlug: 'chatbot',
    pricingType: 'freemium',
    priceRange: '网页与 App 可免费体验，企业与 API 场景按量计费',
    website: 'https://qianwen.aliyun.com/',
    features: ['中文理解', '长文本处理', '图文多模态', '企业接入', '模型家族丰富'],
    pros: ['中文能力稳定', '企业接入成熟', '长上下文路线清晰', '多模态覆盖广'],
    cons: ['产品入口较多', '普通用户对模型版本感知成本高', '消费端体验不如顶级 C 端产品统一'],
    alternatives: ['Kimi', 'DeepSeek', 'ChatGPT'],
    editorRating: 4.4,
    difficulty: 2,
    createdAt: '2026-03-06',
    updatedAt: '2026-03-06',
    reviewSources: [
      {
        source: '通义千问官方产品页',
        url: 'https://qianwen.aliyun.com/',
        summary: '官方定位强调文本、图像、音频理解与工具调用能力，突出长文本分析、研究写作和企业应用场景。'
      },
      {
        source: 'South China Morning Post',
        url: 'https://www.scmp.com/tech/big-tech/article/3297435/alibabas-updated-qwen-ai-model-overtakes-deepseeks-v3-chatbot-ranking',
        summary: '第三方报道更看重其在公开榜单和中文生态中的持续进步，认为它的优势来自迭代速度和综合可用性。'
      }
    ],
    isFeatured: true,
  },
  {
    id: 'doubao',
    name: '豆包',
    slug: 'doubao',
    description: '字节跳动旗下的多模态 AI 助手，产品交互友好、语音和日常使用门槛低。',
    reason: '如果你想要一个“更像 App 而不是更像实验室模型”的中文 AI 助手，豆包很容易上手。',
    fullReview: '豆包的核心竞争力不只是模型本身，而是产品化能力。它把聊天、语音、图像理解、轻量创作和大众场景融合得比较自然，因而对普通用户特别友好。无论是问答、写文案、做简单数据处理，还是语音交互，豆包都更像“现成可用的助手”，而不是需要学习成本的 AI 平台。\n\n这也是它用户增长快的原因：界面简单、反馈快、场景明确，很多人第一次高频使用 AI，就是从豆包开始。对于中文日常办公、生活问答和轻创作，它的体验通常比参数表更有说服力。\n\n但如果你追求的是极限推理、复杂编程或深入工作流自动化，豆包并不是最强的一档；它更适合大众使用，而不是重度专业场景。',
    category: 'AI聊天',
    categorySlug: 'chatbot',
    pricingType: 'freemium',
    priceRange: '多数常用功能可免费体验，企业或进阶能力以官方当前方案为准',
    website: 'https://www.doubao.com',
    features: ['多模态问答', '语音交互', '轻办公创作', '中文场景优化', '移动端体验友好'],
    pros: ['上手门槛低', '产品体验友好', '语音和多模态能力实用', '中文日常场景覆盖好'],
    cons: ['专业推理不算最强', '复杂工作流能力有限', '部分高阶场景深度不如专业工具'],
    alternatives: ['Kimi', '通义千问', 'DeepSeek'],
    editorRating: 4.3,
    difficulty: 1,
    createdAt: '2026-03-06',
    updatedAt: '2026-03-06',
    reviewSources: [
      {
        source: 'Wired',
        url: 'https://www.wired.com/story/bytedance-doubao-chatbot-popularity/',
        summary: '媒体观察认为豆包成功的关键在于产品可用性和界面友好度，而不只是模型指标领先，这与它的 C 端定位高度一致。'
      },
      {
        source: 'AIWorldRank',
        url: 'https://www.aiworldrank.com/doubao',
        summary: '第三方工具目录更强调豆包在多模态与长上下文上的覆盖度，认为它适合日常生产力和大众化使用。'
      }
    ],
    isFeatured: true,
  },
  {
    id: 'copy-ai',
    name: 'Copy.ai',
    slug: 'copy-ai',
    description: '偏营销与销售团队的 AI 文案平台，模板、工作流和 GTM 场景覆盖比较完整。',
    reason: '它不是“万能写作器”，但做营销文案、销售外联和 GTM 流程时非常顺手。',
    fullReview: 'Copy.ai 的优势在于它把“AI 写作”做成了更接近业务流程的平台。相比纯聊天式写作，它更强调营销、外联、销售支持、品牌文案这些可重复场景，因此对增长团队、内容团队和销售运营特别友好。\n\n它的模板和流程化能力能明显缩短从想法到初稿的时间，尤其适合批量生成邮件、社媒文案、广告素材和销售话术。对于需要多人协作的团队来说，Copy.ai 的定位比单一写作助手更偏向 GTM 生产系统。\n\n问题也很明显：长文质量和事实准确性仍然需要人工把关；如果你主要做深度内容、专业文章或复杂研究，它未必比通用大模型更划算。',
    category: 'AI写作',
    categorySlug: 'writing',
    pricingType: 'freemium',
    priceRange: '提供免费体验层，团队版和 GTM 套餐按席位或方案升级',
    website: 'https://www.copy.ai',
    features: ['营销文案模板', '销售外联', 'GTM 工作流', '品牌内容生成', '团队协作'],
    pros: ['营销场景覆盖全', '模板与流程成熟', '团队协作友好', '适合批量出稿'],
    cons: ['长文仍需人工编辑', '事实核验不能省', '价格对小团队不算低'],
    alternatives: ['Jasper', 'Writesonic', 'ChatGPT'],
    editorRating: 4.2,
    difficulty: 2,
    createdAt: '2026-03-06',
    updatedAt: '2026-03-06',
    reviewSources: [
      {
        source: 'Copy.ai 官方',
        url: 'https://www.copy.ai',
        summary: '官方已把产品定位从单点写作工具扩展到 GTM AI 平台，强调销售、营销和内容团队的工作流自动化。'
      },
      {
        source: 'Gartner Peer Insights',
        url: 'https://www.gartner.com/reviews/product/copy-ai',
        summary: '外部评价普遍认可其节省初稿时间和缓解写作卡壳的能力，但也认为长篇内容和精细编辑仍离不开人工。'
      }
    ],
    isFeatured: false,
  },
  {
    id: 'writesonic',
    name: 'Writesonic',
    slug: 'writesonic',
    description: '覆盖博客、SEO、电商和营销内容的 AI 写作平台，适合高频内容生产。',
    reason: '它很适合“量大、节奏快、要兼顾 SEO”的内容团队。',
    fullReview: 'Writesonic 的强项在于把内容生成和 SEO 工作流放在一起考虑。对于要写博客、落地页、电商文案和搜索内容的团队来说，它比单纯聊天式工具更容易直接进入“可发稿”状态。\n\n它适合高频生产、需要结构化模板和需要尽快起稿的场景。对于中小团队和独立内容运营者来说，Writesonic 的价值是把选题、初稿、扩写、改写和 SEO 组织在一个面板里，省去了多工具切换。\n\n弱点在于：AI 文本依然容易同质化，事实密集型内容还是需要校对；如果你已经习惯用通用模型配合自己的 SOP，Writesonic 的平台化优势未必一定更强。',
    category: 'AI写作',
    categorySlug: 'writing',
    pricingType: 'freemium',
    priceRange: '提供免费试用与分层套餐，正式使用通常按月订阅',
    website: 'https://writesonic.com',
    features: ['博客生成', 'SEO 内容', '电商文案', '改写扩写', '营销工作流'],
    pros: ['适合高频出稿', 'SEO 场景成熟', '模板丰富', '对内容团队友好'],
    cons: ['内容同质化风险存在', '事实核验仍需人工', '深度内容质量波动'],
    alternatives: ['Copy.ai', 'Jasper', 'Grammarly'],
    editorRating: 4.1,
    difficulty: 2,
    createdAt: '2026-03-06',
    updatedAt: '2026-03-06',
    reviewSources: [
      {
        source: 'Writesonic 官方',
        url: 'https://writesonic.com',
        summary: '官方强调内容生成、AI 搜索可见性和企业内容工作流，核心卖点是从选题到发布的效率提升。'
      },
      {
        source: 'G2',
        url: 'https://www.g2.com/products/writesonic/reviews',
        summary: '用户评论普遍认可其缓解写作障碍和提升出稿速度，但也普遍提醒要做事实核验和最终人工润色。'
      }
    ],
    isFeatured: false,
  },
  {
    id: 'quillbot',
    name: 'QuillBot',
    slug: 'quillbot',
    description: '专注改写、润色、摘要和引用辅助的写作工具，适合学生和知识工作者做文本整理。',
    reason: '不是最强生成器，但在“把已有文字改得更顺、更短、更清楚”这件事上很有用。',
    fullReview: 'QuillBot 不是典型的全能生成式写作工具，它更像一个针对已有文本的精修助手。你把草稿、论文段落、邮件或报告扔进去，它擅长做改写、摘要、语法修正和引用格式辅助。\n\n这让它在学习场景和办公场景里很实用：学生可以用它快速压缩冗长段落，知识工作者可以用它把语气改得更专业、把表达改得更清晰。相比纯聊天模型，QuillBot 的优势是工具目标明确，处理速度快，界面也很轻。\n\n不过，它更适合“改已有内容”，而不是从零到一写复杂文章；而且一旦过度依赖改写，文本容易失去个人风格。',
    category: 'AI写作',
    categorySlug: 'writing',
    pricingType: 'freemium',
    priceRange: '免费版可用，高级功能按订阅开放',
    website: 'https://quillbot.com',
    features: ['改写润色', '摘要', '语法修正', '引用辅助', '语气调整'],
    pros: ['改写效率高', '目标明确易用', '适合论文和办公文本', '摘要功能实用'],
    cons: ['从零写作能力一般', '过度改写会失真', '高阶学术场景仍需人工审校'],
    alternatives: ['Grammarly', 'Writesonic', 'Notion AI'],
    editorRating: 4.0,
    difficulty: 1,
    createdAt: '2026-03-06',
    updatedAt: '2026-03-06',
    reviewSources: [
      {
        source: 'QuillBot 官方',
        url: 'https://quillbot.com',
        summary: '官方产品页突出改写、总结、语法和引用工具组合，定位很明确，就是帮助用户优化已有文本。'
      },
      {
        source: 'G2',
        url: 'https://www.g2.com/products/quillbot/reviews',
        summary: '用户评价普遍认为它在改写和整理文本时省时明显，但在复杂写作和原创表达方面不能完全替代人工。'
      }
    ],
    isFeatured: false,
  },
  {
    id: 'grammarly',
    name: 'Grammarly',
    slug: 'grammarly',
    description: '覆盖语法、语气、改写和团队风格一致性的老牌写作助手，跨平台体验成熟。',
    reason: '如果你的刚需是“每天都要写邮件、写文档、改措辞”，Grammarly 的稳定性依然很强。',
    fullReview: 'Grammarly 最核心的价值是“嵌入式写作辅助”。它不是让你专门打开一个 AI 页面，而是尽可能在浏览器、邮件、文档和输入框里陪着你工作。对于经常处理英文沟通、商务邮件、说明文档和团队协作的人来说，这种融入式体验非常省心。\n\n如今它已经不只是纠错，而是扩展到了语气建议、改写、风格一致性和团队品牌语调。对企业用户而言，这一点尤其重要：写作质量、品牌一致性和审批成本可以被拉到同一条线上。\n\n不过，Grammarly 在某些界面上的弹窗式交互会打断专注流，高级功能也更适合高频写作者；如果你主要写中文，它的性价比就没那么突出。',
    category: 'AI写作',
    categorySlug: 'writing',
    pricingType: 'freemium',
    priceRange: '免费基础纠错可用，高级改写与团队功能需付费',
    website: 'https://www.grammarly.com',
    features: ['语法纠错', '语气建议', '改写润色', '团队品牌风格', '跨平台输入辅助'],
    pros: ['跨平台成熟', '英文写作稳定', '团队风格统一价值高', '上手成本低'],
    cons: ['中文场景优势有限', '弹窗交互偶尔打断流程', '高级功能价格偏高'],
    alternatives: ['QuillBot', 'Notion AI', 'ChatGPT'],
    editorRating: 4.5,
    difficulty: 1,
    createdAt: '2026-03-06',
    updatedAt: '2026-03-06',
    reviewSources: [
      {
        source: 'Grammarly 官方',
        url: 'https://www.grammarly.com',
        summary: '官方定位已经从传统语法检查器升级为 AI 写作与团队沟通平台，强调语气、风格和品牌一致性。'
      },
      {
        source: 'G2',
        url: 'https://www.g2.com/products/grammarly/reviews',
        summary: 'G2 用户普遍认可它的易用性、上手速度和跨平台集成，但也提到高级功能与界面交互在部分场景会影响写作节奏。'
      }
    ],
    isFeatured: false,
  },
  {
    id: 'v0',
    name: 'v0.dev',
    slug: 'v0',
    description: 'Vercel 推出的前端生成工具，擅长把自然语言快速变成 React 界面和可预览原型。',
    reason: '做前端原型和营销页面时，v0 的成稿速度仍然是第一梯队。',
    fullReview: 'v0 最适合“先把界面跑起来”。描述一个页面结构、交互组件或营销落地页，它可以很快产出 React 代码和可预览结果，对前端、产品和设计协作都很友好。\n\n它的真正价值在于和 Vercel 生态联动：从生成、预览到部署的链路被压得非常短，因此非常适合做实验性页面、活动页、原型验证和中小型前端模块。对熟悉 React/Next.js 的团队来说，v0 是一个很高效的起点，而不是终点。\n\n但它也有明显边界：复杂业务逻辑、长期维护架构和成本控制依然需要工程经验；而且围绕定价和额度的讨论一直不少，重度使用前必须先把预算算清楚。',
    category: 'AI编程',
    categorySlug: 'code',
    pricingType: 'freemium',
    priceRange: '提供免费额度，重度使用通常需要升级付费计划',
    website: 'https://v0.dev',
    features: ['React 界面生成', '实时预览', 'Vercel 部署联动', '前端原型', '设计到代码'],
    pros: ['前端出稿快', '和 Vercel 生态衔接自然', '原型验证效率高', '界面生成质量稳定'],
    cons: ['复杂业务逻辑仍需人工接管', '额度和价格需精算', '长期工程化能力有限'],
    alternatives: ['Lovable', 'Cursor', 'tldraw'],
    editorRating: 4.4,
    difficulty: 2,
    createdAt: '2026-03-06',
    updatedAt: '2026-03-06',
    reviewSources: [
      {
        source: 'Vercel 官方文档',
        url: 'https://vercel.com/docs/v0',
        summary: '官方把 v0 定位为可生成并部署前端体验的 AI 构建工具，强调与 Vercel 工作流的一体化。'
      },
      {
        source: 'TechRadar',
        url: 'https://www.techradar.com/pro/best-vibe-coding-tools',
        summary: '第三方测评认为 v0 在前端与“vibe coding”场景中竞争力很强，亮点是代码质量和快速成型，但仍需人工把控生产级细节。'
      }
    ],
    isFeatured: true,
  },
  {
    id: 'adobe-firefly',
    name: 'Adobe Firefly',
    slug: 'adobe-firefly',
    description: 'Adobe 面向创意工作流打造的生成式 AI 套件，强调与 Photoshop、Express 和商业授权场景协同。',
    reason: '如果你是创意团队而不是单纯玩图用户，Firefly 的最大价值在于“商用安全 + Adobe 工作流”。',
    fullReview: 'Adobe Firefly 不一定是最“惊艳”的图像模型，但它很可能是创意团队最容易落地的生成式 AI 工具之一。原因不在于单次出图效果，而在于它和 Photoshop、Illustrator、Express 等工具的工作流衔接，以及 Adobe 一直强调的商业安全训练数据。\n\n这意味着，设计师可以把 Firefly 当作 Creative Cloud 的加速层，而不是另一个孤立的 AI 网站。做扩图、改图、生成素材、补背景、做变体时，它的价值在于大幅缩短设计迭代周期。\n\n但如果你只追求“最自由的艺术风格”或“最有惊喜感的模型表现”，Firefly 可能没有 Midjourney、FLUX 那么有个性；而且视频能力虽然进步快，但外部实测对定价和成熟度仍有保留。',
    category: 'AI图像',
    categorySlug: 'image',
    pricingType: 'freemium',
    priceRange: '部分功能可试用，完整商用与 Creative Cloud 深度能力通常需订阅',
    website: 'https://firefly.adobe.com',
    features: ['生成填充', '扩图与改图', 'Adobe 生态集成', '商业安全素材路线', '图像与视频生成'],
    pros: ['与 Adobe 工作流深度集成', '适合商业与团队场景', '改图效率高', '版权风险策略清晰'],
    cons: ['纯创意惊喜感不一定最强', '部分高阶能力依赖订阅', '视频方向仍在快速演进'],
    alternatives: ['Midjourney', 'Leonardo.ai', 'FLUX'],
    editorRating: 4.3,
    difficulty: 2,
    createdAt: '2026-03-06',
    updatedAt: '2026-03-06',
    reviewSources: [
      {
        source: 'Adobe Firefly 官方',
        url: 'https://firefly.adobe.com',
        summary: '官方持续强调 Firefly 与 Creative Cloud 的一体化，以及面向商业创意场景的安全训练和可控工作流。'
      },
      {
        source: 'TechRadar',
        url: 'https://www.techradar.com/computing/artificial-intelligence/adobe-firefly-is-doing-generative-ai-differently-and-it-may-even-be-good-for-you',
        summary: '外部评价普遍认可 Firefly 在版权与创意生产流程上的差异化，但也认为它更像专业生产工具，而不是最自由的“艺术型模型”。'
      }
    ],
    isFeatured: true,
  },
  {
    id: 'leonardo',
    name: 'Leonardo.ai',
    slug: 'leonardo',
    description: '面向设计、游戏资产和高风格化图像生产的生成平台，图像编辑与风格控制能力较强。',
    reason: '如果你既要出图速度，也要风格控制和素材复用，Leonardo 的实用性很高。',
    fullReview: 'Leonardo.ai 的优势是“介于创作灵感和生产工具之间”。它不像某些模型只擅长一次性出图，而是把风格控制、素材编辑、批量变体和资产生成组织得更适合持续创作。对游戏美术、营销设计和视觉内容团队来说，这一点非常重要。\n\n它在写实、概念图、素材变体和短视频探索上都比较活跃，因此适合需要不断试错、不断迭代的创作者。和更偏单一生成的网站相比，Leonardo 更像一个创意生产工作台。\n\n缺点是：界面和选项对新手稍微复杂；免费额度虽然有吸引力，但真要进入高频生产，依然需要付费。',
    category: 'AI图像',
    categorySlug: 'image',
    pricingType: 'freemium',
    priceRange: '提供免费额度，高频生产与高级功能通常需要升级付费',
    website: 'https://leonardo.ai',
    features: ['风格化图像生成', '素材变体', '图像编辑', '资产工作流', '创意团队协作'],
    pros: ['风格控制能力好', '适合持续创作', '图像编辑功能完整', '对设计团队友好'],
    cons: ['上手选项较多', '高频使用依赖付费', '并非每个场景都比顶级专用模型更强'],
    alternatives: ['Adobe Firefly', 'Midjourney', 'FLUX'],
    editorRating: 4.4,
    difficulty: 2,
    createdAt: '2026-03-06',
    updatedAt: '2026-03-06',
    reviewSources: [
      {
        source: 'Leonardo.ai 官方',
        url: 'https://leonardo.ai',
        summary: '官方更强调它作为创意生产平台的完整性，而不仅仅是单次图像生成模型。'
      },
      {
        source: 'Tom\'s Guide',
        url: 'https://www.tomsguide.com/ai/ai-image-video/leonardo-review',
        summary: '外部测评对 Leonardo 的评价集中在风格多样性、图像编辑和写实能力，认为它适合需要持续迭代的视觉创作流程。'
      }
    ],
    isFeatured: true,
  }
];

export default sourcedBatchTools;
