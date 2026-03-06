import type { Tool } from '@/types/tool';

export const sourcedBatchToolsRound6: Tool[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: '最通用的 AI 助手之一，已经从单纯聊天扩展到语音、图像、代理、研究和文件工作流。',
    reason: '如果你只选一个覆盖面最广的 AI 工具，ChatGPT 依然是最稳的默认入口。',
    fullReview: 'ChatGPT 的核心优势始终是“通用性”。无论你是写作、学习、编程、做图、分析文件、头脑风暴还是处理日常事务，它都能先给出一个足够好的起点。而且随着语音、图像、深度研究、代理能力和各类应用形态不断补进来，它越来越像一个统一的 AI 工作台，而不是单一聊天机器人。\n\n它特别适合不想把工作流拆成很多工具的人。很多任务你可以先在 ChatGPT 里做第一轮：读材料、生成草稿、看图表、整理报告、规划步骤，再决定是否把结果交给更专业的软件继续精修。这种“先集中完成 60%-80%”的能力，让它在真实工作中非常有竞争力。\n\n但它不是没有代价。免费版和付费版体验差距会拉开；复杂专业任务仍要防幻觉；而且越通用的工具，越容易让用户误以为它在哪一项都等同于最佳专用工具。ChatGPT 最强的是覆盖广和起步快，不是每个垂直场景都绝对第一。',
    category: 'AI聊天',
    categorySlug: 'chatbot',
    pricingType: 'freemium',
    priceRange: '免费版可用，更强模型、更多额度和高级能力通常需要升级付费方案',
    website: 'https://openai.com/chatgpt/overview/',
    reviewSources: [
      {
        source: 'OpenAI 官方',
        url: 'https://openai.com/chatgpt/overview/',
        summary: '官方把 ChatGPT 定位为 discover、learn、create 的统一 AI 助手，并持续扩展语音、图像、代理和研究等能力。'
      },
      {
        source: 'G2 Learn',
        url: 'https://learn.g2.com/chatgpt-review',
        summary: 'G2 的长期评测认为，ChatGPT 最强的地方在于覆盖任务广、上手快，能把很多原本分散的软件工作压缩进一个入口里。'
      },
      {
        source: 'Zapier',
        url: 'https://zapier.com/blog/best-ai-chatbot/',
        summary: 'Zapier 在 AI 聊天工具横评中仍把 ChatGPT 视作综合能力最强的一档，尤其适合作为多数人的默认起点。'
      }
    ],
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Anthropic 的 AI 助手，长于长上下文、写作质量、分析严谨性和更平稳的回答风格。',
    reason: '如果你更看重“读得深、写得稳、出错少一点”，Claude 往往会比很多竞品更对味。',
    fullReview: 'Claude 的优势一直很清晰：它不是最花哨的那个，但往往是读大段材料、做深入分析和输出长篇内容时更让人安心的那个。很多用户会在文档分析、学术阅读、复杂写作和代码解释这些场景里优先选 Claude，因为它的回答风格更克制、组织更稳定。\n\n它特别适合需要处理长资料的人。合同、研究报告、产品文档、采访稿、需求文档、代码库说明，这类内容如果交给 Claude 往往会有比较顺的体验。相比更偏“什么都能来一点”的助手，Claude 更像一个长文和推理上的稳定派。\n\n但它的短板也真实存在：生态和插件感不如最通用的平台强；部分创意类任务可能没有那么外放；价格和配额也要考虑。Claude 的魅力不在于炫技，而在于长期使用时那种相对可靠的质感。',
    category: 'AI聊天',
    categorySlug: 'chatbot',
    pricingType: 'freemium',
    priceRange: '免费版可体验，更高模型能力、额度和团队使用通常需要订阅付费方案',
    website: 'https://www.anthropic.com/claude',
    reviewSources: [
      {
        source: 'Anthropic 官方',
        url: 'https://www.anthropic.com/claude',
        summary: '官方将 Claude 定位为面向工作与思考的 AI 助手，突出分析、写作、代码和长上下文能力。'
      },
      {
        source: 'PCMag',
        url: 'https://www.pcmag.com/reviews/claude',
        summary: 'PCMag 长期把 Claude 视为在文档理解和写作质量上非常强的一档，同时也提醒它并不是生态最丰富的选择。'
      },
      {
        source: 'Zapier',
        url: 'https://zapier.com/blog/best-ai-chatbot/',
        summary: 'Zapier 的横评中，Claude 常被归入更适合写作、分析和长资料处理的工具，而非最全面的生态平台。'
      }
    ],
  },
  {
    id: 'gemini',
    name: 'Gemini',
    description: 'Google 体系中的核心 AI 助手，优势在于搜索、Google 服务整合和多模态入口。',
    reason: '如果你的工作本来就围着 Gmail、Docs、Drive 和搜索打转，Gemini 的协同价值会比单点能力更大。',
    fullReview: 'Gemini 的真正强项，不是单独看某一次回答有多惊艳，而是它和 Google 生态结合后能把很多日常工作变得更顺。邮件、文档、网盘、网页搜索、手机端使用，这些本来就频繁出现的场景，Gemini 都能自然插进去，因此对 Google 重度用户来说，它的价值往往高于“单轮聊天表现”。\n\n它也很适合多模态和信息型任务。图像理解、网页信息获取、和 Google 服务联动的总结与起草，都是 Gemini 比较舒服的地盘。很多用户不会把它当唯一 AI 工具，但会把它当生态内最高频的辅助入口。\n\n不足则在于：如果脱离 Google 体系，它的优势会被削弱；同时它在创造力、回答风格一致性和部分深度任务上，未必总能压过顶级竞品。Gemini 最值得买单的，更多是“整合度”，而不是单项神话。',
    category: 'AI聊天',
    categorySlug: 'chatbot',
    pricingType: 'freemium',
    priceRange: '免费版可用，更高阶模型和 Google 生态内高级能力通常对应付费方案',
    website: 'https://gemini.google/overview/',
    reviewSources: [
      {
        source: 'Google 官方',
        url: 'https://gemini.google/overview/',
        summary: '官方将 Gemini 定位为 Google 的个人 AI 助手，强调与搜索、Workspace 和多模态能力的结合。'
      },
      {
        source: 'PCMag',
        url: 'https://www.pcmag.com/reviews/google-gemini',
        summary: 'PCMag 认为 Gemini 的关键价值在于与 Google 服务的协同，而不是脱离生态单独比较一次回答。'
      },
      {
        source: 'Zapier',
        url: 'https://zapier.com/blog/best-ai-chatbot/',
        summary: 'Zapier 的横评里，Gemini 被视作最适合 Google 用户的一档，尤其擅长信息型和服务内协作型场景。'
      }
    ],
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    description: '以“带来源的 AI 搜索”出名的问答工具，适合研究、事实查证和快速收敛信息。',
    reason: '如果你最在意“答案后面有没有出处”，Perplexity 往往比纯聊天模型更让人放心。',
    fullReview: 'Perplexity 的核心竞争力是把搜索和回答合成了一件事。你不需要先点开很多网页再自己拼接结论，而是可以先拿到一个带引用来源的总结，再去决定要不要追查原文。这对研究、比价、做提纲、看行业信息和做快速事实核验特别有帮助。\n\n它适合那些不想在传统搜索结果页里反复跳转的人。学生、分析师、记者、内容策划、知识工作者，都会从它的“先总结后溯源”体验里获得很直接的效率提升。相比传统聊天机器人，Perplexity 的可信感更多来自链接，而不是回答语气。\n\n但它也不是万能的。首先，它仍然受外部来源质量影响；其次，深度推理和长内容生产不是它的绝对主场；最后，一旦用户把“有引用”误等同于“完全正确”，也会掉进新的误区。Perplexity 更像研究入口，而不是全部工作终点。',
    category: 'AI聊天',
    categorySlug: 'chatbot',
    pricingType: 'freemium',
    priceRange: '免费入口可用，更高模型权限、搜索深度与高级功能通常需要 Pro 方案',
    website: 'https://www.perplexity.ai/',
    reviewSources: [
      {
        source: 'Perplexity 官方',
        url: 'https://www.perplexity.ai/',
        summary: '官方持续把 Perplexity 定位为答案引擎和研究入口，突出引用来源、搜索和知识发现。'
      },
      {
        source: 'PCMag',
        url: 'https://www.pcmag.com/reviews/perplexity-ai',
        summary: 'PCMag 认为 Perplexity 最大的卖点就是把“找资料”和“读总结”合并，并通过来源引用提升研究效率。'
      },
      {
        source: 'Zapier',
        url: 'https://zapier.com/blog/best-ai-chatbot/',
        summary: 'Zapier 的横评中，Perplexity 被认为最适合做研究和事实查找，而不是替代所有创作型聊天任务。'
      }
    ],
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    description: '国产头部大模型之一，强项是推理、代码和高性价比，同时因开源策略而获得极高关注。',
    reason: '如果你最看重推理强度和成本效率，DeepSeek 仍然是中文世界非常难绕开的选择。',
    fullReview: 'DeepSeek 之所以迅速出圈，不只是因为它能答题，而是因为它把“高推理能力 + 更低成本 + 更开放的生态”放在了一起。对很多个人用户和开发团队来说，这意味着不必为每一次复杂推理都承担过高价格，也不必完全依赖封闭平台。\n\n它尤其适合数学、逻辑推理、代码生成和中文语境里的复杂问答。很多用户会把它当作高性价比推理工具，而开发者又会关注它在开源和 API 层面的扩散速度。这个组合让 DeepSeek 不只是一个聊天产品，更是一个生态事件。\n\n但越是热度高，越需要冷静看边界。不同版本体验会有差异；拥堵、配额、稳定性和长时间高压使用体验都要看具体入口；而且强推理并不自动意味着每个场景都最优。DeepSeek 的爆发力很强，但具体用法仍要因任务而定。',
    category: 'AI聊天',
    categorySlug: 'chatbot',
    pricingType: 'free',
    priceRange: '个人入口门槛较低或免费，开发者与企业侧需结合 API 与部署方式评估成本',
    website: 'https://www.deepseek.com/',
    reviewSources: [
      {
        source: 'DeepSeek 官方',
        url: 'https://www.deepseek.com/',
        summary: '官方持续突出其推理、代码和开放能力，定位明显不只是聊天助手，而是更完整的大模型产品矩阵。'
      },
      {
        source: 'GitHub',
        url: 'https://github.com/deepseek-ai',
        summary: 'GitHub 上的 DeepSeek 开源项目长期保持极高关注度，这直接体现了开发者社区对其开放路线和能力上限的认可。'
      }
    ],
  },
  {
    id: 'notion-ai',
    name: 'Notion AI',
    description: '嵌在 Notion 工作区里的 AI 助手，擅长在文档、笔记、知识库和团队协作上下文中直接工作。',
    reason: '如果你本来就把 Notion 当第二大脑，AI 直接长在文档里，体验会比单独开聊天窗口自然很多。',
    fullReview: 'Notion AI 的优势从来不是“最强模型”，而是“离你的内容最近”。它的价值在于，你写笔记、做知识库、整理会议记录、写需求、搭 SOP 时，不需要来回切换到别的工具，而是直接在当前文档里总结、改写、提炼、翻译和继续展开。\n\n这种嵌入式体验对团队尤其重要。因为很多内容工作并不是从零生成，而是围绕已有资料继续迭代。Notion AI 让 AI 真正进入现有工作流，而不是另起一个入口。对已经深度使用 Notion 的组织来说，这种自然度会显著提升采纳率。\n\n它的局限也清楚：如果脱离 Notion 场景，它并不是最划算的 AI 入口；而在极复杂的专业任务上，它也未必比外部顶级模型或专用工具更强。Notion AI 更像工作区加速器，而不是全能替代品。',
    category: 'AI写作',
    categorySlug: 'writing',
    pricingType: 'paid',
    priceRange: '通常按 Notion 套餐与 AI 附加能力组合计费，团队使用更能体现价值',
    website: 'https://www.notion.com/product/ai',
    reviewSources: [
      {
        source: 'Notion 官方',
        url: 'https://www.notion.com/product/ai',
        summary: '官方将 Notion AI 定位为直接嵌入工作区的智能协作助手，重点强调写作、总结、搜索和文档问答。'
      },
      {
        source: 'G2',
        url: 'https://www.g2.com/products/notion-ai/reviews',
        summary: 'G2 用户普遍认可它在日常文档和会议整理上的便利性，但也认为它的价值高度依赖你是否已经重度使用 Notion。'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/products/notion-ai',
        summary: 'Product Hunt 社区对 Notion AI 的典型看法是“不是最炫，但最顺手”，因为它直接生长在团队已有文档上下文里。'
      }
    ],
  },
  {
    id: 'jasper',
    name: 'Jasper',
    description: '老牌企业级 AI 写作平台，长于营销文案、品牌声音一致性和团队化内容生产。',
    reason: '如果你做的是品牌营销，而不是随手写点文字，Jasper 的价值会比通用聊天工具更容易体现。',
    fullReview: 'Jasper 最强的并不是聊天感，而是营销内容生产的专业化。它围绕品牌声音、模板、团队协作、审批和内容流程做了很多针对企业场景的打磨，所以对营销团队来说，它更像一套生产系统，而不只是生成器。\n\n它特别适合高频产出广告文案、博客、邮件、社媒内容和品牌材料的团队。很多公司并不缺一个能写段落的模型，而是缺一个能稳定产出“像我们这个品牌写的东西”的系统。Jasper 正是沿着这条线去构建自己的。\n\n短板也很明显：价格不低；如果你的内容需求很零散，或者并不需要品牌一致性和团队流程，那它的优势就会被削弱。Jasper 适合内容产能型团队，不一定适合每个个人用户。',
    category: 'AI写作',
    categorySlug: 'writing',
    pricingType: 'paid',
    priceRange: '以企业和专业内容团队为主，通常按席位或团队方案付费',
    website: 'https://www.jasper.ai/',
    reviewSources: [
      {
        source: 'Jasper 官方',
        url: 'https://www.jasper.ai/',
        summary: '官方把 Jasper 持续定位为面向营销与品牌团队的 AI 内容平台，重点强调品牌声音和协作流程。'
      },
      {
        source: 'G2',
        url: 'https://www.g2.com/products/jasper-ai/reviews',
        summary: 'G2 用户普遍认可 Jasper 在营销写作和品牌一致性上的表现，同时也频繁提到价格和学习成本。'
      },
      {
        source: 'PCMag',
        url: 'https://www.pcmag.com/reviews/jasper',
        summary: 'PCMag 长期将 Jasper 视为更偏企业内容生产的一档工具，优点是专业，缺点是对普通用户来说可能偏重。'
      }
    ],
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: '长期处于头部的 AI 图像生成工具，最大优势是审美风格、成片感和一眼就能看出的视觉完成度。',
    reason: '如果你最在意“出图就是作品感”，Midjourney 依然经常是第一反应。',
    fullReview: 'Midjourney 的强大，主要体现在一种很难完全量化的东西上：审美稳定性。你给它一个普通提示词，它往往也能给出很像“完成作品”的结果，而不仅仅是技术上正确的图像。这种成片感让它在设计、海报、概念图、封面和社媒视觉里长期有很强竞争力。\n\n它很适合追求风格和氛围的人。创作者、设计师、品牌团队，很多时候不是需要最可控的模型，而是需要最快产出“足够惊艳的第一版”。Midjourney 在这件事上一直做得很好。\n\n但它的门槛也不是没有：如果你要极强的商用流程可控性、精确改图、本地部署或开放生态，它就不一定是第一选择；而且它的使用方式和风格偏好，也并不适合每一个严肃生产链路。它最强的是美感，不是最开放。',
    category: 'AI图像',
    categorySlug: 'image',
    pricingType: 'paid',
    priceRange: '通常以订阅为主，适合长期高频创作用户',
    website: 'https://www.midjourney.com/',
    reviewSources: [
      {
        source: 'Midjourney 官方',
        url: 'https://www.midjourney.com/',
        summary: '官方对自己的定位始终更偏“构建最美的 AI 模型”，其核心卖点就是视觉质量和想象力表达。'
      },
      {
        source: 'PCMag',
        url: 'https://www.pcmag.com/reviews/midjourney',
        summary: 'PCMag 长期认为 Midjourney 在出图审美和完成度上处于第一梯队，但对可控性和使用门槛也有所提醒。'
      },
      {
        source: 'Zapier',
        url: 'https://zapier.com/blog/best-ai-image-generator/',
        summary: 'Zapier 在 AI 图像工具横评中多次把 Midjourney 列为最适合产出“最漂亮图片”的代表工具。'
      }
    ],
  },
  {
    id: 'dalle3',
    name: 'DALL-E 3',
    description: 'OpenAI 的图像生成模型，优势在于提示词理解自然、和 ChatGPT 工作流结合紧密。',
    reason: '如果你更喜欢用自然语言一步步聊出图，而不是自己折腾参数，DALL·E 3 的门槛非常友好。',
    fullReview: 'DALL·E 3 的价值，不只是图像模型本身，而是它和 ChatGPT 的组合方式。你可以直接用自然语言聊需求、补细节、改方向，整个出图过程更像在和一个懂画图的助手沟通，而不是在操作一台复杂机器。\n\n这让它特别适合非专业用户，以及那些更重视“描述 → 修改 → 再生成”流程的人。海报草案、插图、概念图、博客配图、社媒图，都能比较顺畅地跑通。很多人不是不会写提示词，而是懒得反复精调，DALL·E 3 正好降低了这层摩擦。\n\n但它也有边界：如果你要极致审美、极高自由度或开放工作流，Midjourney、FLUX、Stable Diffusion 体系仍然各有优势。DALL·E 3 最强的不是开放，而是“对大多数人足够简单”。',
    category: 'AI图像',
    categorySlug: 'image',
    pricingType: 'paid',
    priceRange: '通常随 ChatGPT 或相关 OpenAI 产品能力提供，实际使用取决于具体套餐',
    website: 'https://openai.com/index/dall-e-3/',
    reviewSources: [
      {
        source: 'OpenAI 官方',
        url: 'https://openai.com/index/dall-e-3/',
        summary: '官方将 DALL·E 3 定位为能更好理解复杂提示词与细节描述的图像模型，并与 ChatGPT 深度结合。'
      },
      {
        source: 'ChatGPT 官方',
        url: 'https://openai.com/chatgpt/overview/',
        summary: 'ChatGPT 官方页面本身已经把图像能力作为核心功能之一，这说明 DALL·E 3 的真实价值越来越体现在工作流整合上。'
      },
      {
        source: 'Zapier',
        url: 'https://zapier.com/blog/best-ai-image-generator/',
        summary: 'Zapier 认为 DALL·E 3 的突出优势是提示词跟随和自然语言对话式改图，对普通用户尤其友好。'
      }
    ],
  },
  {
    id: 'stable-diffusion',
    name: 'Stable Diffusion',
    description: '最具代表性的开源图像生成体系之一，强项是可控、可部署、可二次开发。',
    reason: '如果你最在意自由度和工作流可塑性，Stable Diffusion 依然是很多进阶用户的底座。',
    fullReview: 'Stable Diffusion 的意义远超一个模型名称，它更像整个开放图像生态的总称。因为开源，它被做成了本地工作流、插件、微调模型、控制网络、商用托管和各种衍生应用，所以对开发者、设计师和进阶创作者来说，它往往不是一个产品，而是一套能力栈。\n\n它非常适合那些不满足于“点一下出图”的人。你可以本地部署、精细控制、训练 LoRA、接 ControlNet、塞进自己的产品工作流，甚至完全围绕它搭建内部图像系统。这种自由度，是很多封闭工具无法替代的。\n\n但自由度越高，门槛也越高。版本繁多、参数复杂、工作流搭建成本高、结果质量受模型和调参影响大，都是现实问题。Stable Diffusion 适合想掌控图像生成的人，不一定适合只想马上出成品的人。',
    category: 'AI图像',
    categorySlug: 'image',
    pricingType: 'freemium',
    priceRange: '开源可本地使用，托管服务、训练和高算力工作流会产生额外成本',
    website: 'https://stability.ai/stable-diffusion',
    reviewSources: [
      {
        source: 'Stability AI 官方',
        url: 'https://stability.ai/stable-diffusion',
        summary: '官方始终将 Stable Diffusion 作为开放图像生成核心产品来推进，重点在开放生态和开发可塑性。'
      },
      {
        source: 'PCMag',
        url: 'https://www.pcmag.com/reviews/stable-diffusion',
        summary: 'PCMag 认为 Stable Diffusion 最突出的优势是自由度和可定制性，但它也同时带来了更高的学习成本。'
      },
      {
        source: 'Zapier',
        url: 'https://zapier.com/blog/best-ai-image-generator/',
        summary: 'Zapier 在横评中把 Stable Diffusion 视作最适合高级用户和开放工作流的一档，而不是最省心的默认工具。'
      }
    ],
  }
];

export default sourcedBatchToolsRound6;
