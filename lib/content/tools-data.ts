// lib/content/tools-data.ts - 首批20个工具详细评测数据

import { Tool, EditorPick, Editor } from '@/types/tool';

export const editors: Editor[] = [
  {
    id: 'editor1',
    name: '小明',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xiaoming',
    bio: 'AI工具重度使用者，每天测试3-5个新工具',
    role: 'editor'
  },
  {
    id: 'editor2', 
    name: '阿强',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=qiang',
    bio: '前产品经理，专注效率工具和工作流优化',
    role: 'editor'
  },
  {
    id: 'editor3',
    name: 'Lisa',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa',
    bio: '设计师出身，对AI图像和视频工具有独到见解',
    role: 'editor'
  }
];

export const toolsData: Tool[] = [
  // ===== AI聊天 (4个) =====
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    slug: 'chatgpt',
    description: 'OpenAI开发的大型语言模型，支持对话、写作、编程等多种任务',
    reason: '处理长文档时，它的理解能力让我惊讶',
    fullReview: 'ChatGPT是我每天使用频率最高的AI工具。从2022年底发布以来，它彻底改变了我获取信息和处理知识的方式。我主要用它做三件事：第一，快速学习新概念，把复杂的技术文档转化成我能理解的语言；第二，辅助写作，帮我梳理论文结构和润色表达；第三，编程助手，解释代码和调试错误。GPT-4发布后的代码能力让我印象深刻。缺点是它偶尔会产生幻觉，编造看似合理但实际错误的信息。',
    category: 'AI聊天',
    categorySlug: 'chatbot',
    pricingType: 'freemium',
    priceRange: '免费版可用，Plus $20/月',
    website: 'https://chat.openai.com',
    features: ['多轮对话', '代码生成', '文档总结', '创意写作', '多语言支持'],
    pros: ['理解能力极强', '上下文记忆长', '更新迭代快', '生态丰富'],
    cons: ['免费版有使用限制', '偶尔产生幻觉', '对中文支持不如英文'],
    alternatives: ['Claude', 'Gemini', 'Perplexity'],
    editorRating: 4.5,
    difficulty: 1,
    createdAt: '2026-02-27',
    updatedAt: '2026-02-27',
    isEditorsPick: true,
    isFeatured: true
  },
  {
    id: 'claude',
    name: 'Claude',
    slug: 'claude',
    description: 'Anthropic开发的AI助手，擅长长文本分析和推理',
    reason: '200K上下文让它成为论文阅读神器',
    fullReview: 'Claude 3是我目前处理长文档的首选工具。200K的上下文窗口意味着什么？我可以直接把一本300页的技术书籍扔给它，然后问任何关于这本书的问题。它的回答风格比ChatGPT更严谨，幻觉率明显更低。Sonnet版本的速度和质量的平衡做得很好。缺点是它不像ChatGPT有那么多插件和生态，在创意写作方面稍微保守一些。',
    category: 'AI聊天',
    categorySlug: 'chatbot',
    pricingType: 'freemium',
    priceRange: '免费版可用，Pro $20/月',
    website: 'https://claude.ai',
    features: ['超长上下文', '文档分析', '代码辅助', '学术写作', '推理能力'],
    pros: ['200K上下文', '幻觉率低', '回答严谨', '隐私保护好'],
    cons: ['生态不如ChatGPT', '创意写作偏保守', '中文表现一般'],
    alternatives: ['ChatGPT', 'Gemini'],
    editorRating: 4.8,
    difficulty: 1,
    createdAt: '2026-02-27',
    updatedAt: '2026-02-27',
    isEditorsPick: true,
    isFeatured: true
  },
  {
    id: 'gemini',
    name: 'Gemini',
    slug: 'gemini',
    description: 'Google开发的AI助手，与Google服务深度集成',
    reason: '和Google生态的无缝集成让工作流更顺畅',
    fullReview: 'Gemini 1.5 Pro的发布让Google在AI竞赛中重新回到了第一梯队。它的多模态能力是真的强——我可以给它一张复杂的图表，它不仅能理解内容，还能进行分析和总结。最大的卖点是和Google服务的集成。Gmail、Docs、Drive、YouTube...如果你已经在用Google全家桶，Gemini能让你的工作效率提升一个档次。',
    category: 'AI聊天',
    categorySlug: 'chatbot',
    pricingType: 'freemium',
    priceRange: '免费版可用，Advanced $20/月',
    website: 'https://gemini.google.com',
    features: ['多模态理解', 'Google集成', '实时搜索', '代码生成', '长上下文'],
    pros: ['Google生态集成', '多模态能力强', '实时信息更新', '免费版够用'],
    cons: ['长文本记忆不稳定', '创造力不如ChatGPT', '部分地区受限'],
    alternatives: ['ChatGPT', 'Claude'],
    editorRating: 4.3,
    difficulty: 1,
    createdAt: '2026-02-27',
    updatedAt: '2026-02-27',
    isEditorsPick: false,
    isFeatured: true
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    slug: 'perplexity',
    description: 'AI搜索引擎，提供带引用来源的答案',
    reason: '研究工作时，有来源的答案让我更放心',
    fullReview: 'Perplexity已经成为我进行任何研究工作的第一步。传统搜索引擎给你一堆链接，Perplexity直接给你一个带引用的总结——这节省了多少时间！它的界面非常干净，没有广告，没有SEO垃圾内容。每个答案都标注了信息来源，我可以快速验证关键信息。Pro版的Copilot功能很实用，它会主动问你需要哪些信息，然后搜索多个来源综合回答。',
    category: 'AI聊天',
    categorySlug: 'chatbot',
    pricingType: 'freemium',
    priceRange: '免费版可用，Pro $20/月',
    website: 'https://www.perplexity.ai',
    features: ['实时搜索', '引用来源', '多轮对话', '聚焦模式', 'Copilot'],
    pros: ['信息准确', '引用透明', '界面简洁', '搜索效率高'],
    cons: ['依赖外部源', '深度推理弱', '中文内容偏少'],
    alternatives: ['ChatGPT', 'Gemini'],
    editorRating: 4.6,
    difficulty: 1,
    createdAt: '2026-02-27',
    updatedAt: '2026-02-27',
    isEditorsPick: true,
    isFeatured: true
  },

  // ===== AI写作 (2个) =====
  {
    id: 'notion-ai',
    name: 'Notion AI',
    slug: 'notion-ai',
    description: 'Notion内置的AI写作助手，支持笔记、文档生成',
    reason: '在写笔记的场景下，它是最自然的选择',
    fullReview: 'Notion AI最大的优点是它就在你工作的地方。不需要切换到其他应用，选中文字按空格就能调用AI。这种无缝体验让AI真正融入了日常工作流。我经常用的功能：总结长文档、提取行动项、续写内容、翻译。它特别擅长把混乱的会议记录整理成结构化的笔记。对于已经在用Notion的团队，这个AI插件几乎是必买的。',
    category: 'AI写作',
    categorySlug: 'writing',
    pricingType: 'paid',
    priceRange: '$10/月/人',
    website: 'https://www.notion.so/product/ai',
    features: ['续写', '总结', '翻译', '头脑风暴', '语法修正'],
    pros: ['集成度高', '使用自然', '团队协作好', '价格适中'],
    cons: ['功能不如专业工具', '需要Notion基础', '中文支持一般'],
    alternatives: ['Jasper', 'Copy.ai'],
    editorRating: 4.2,
    difficulty: 1,
    createdAt: '2026-02-27',
    updatedAt: '2026-02-27',
    isEditorsPick: false,
    isFeatured: true
  },
  {
    id: 'jasper',
    name: 'Jasper',
    slug: 'jasper',
    description: '企业级AI写作工具，专注于营销文案创作',
    reason: '营销文案的质量是我用过所有工具中最高的',
    fullReview: 'Jasper是我用过的最专业的AI写作工具。它不是那种随便生成点文字的玩具，而是真正能帮助营销团队提升效率的生产力工具。它的模板库非常丰富：博客文章、广告文案、邮件序列、社交媒体帖子...每个模板都经过精心设计，输出质量比直接用ChatGPT高一个档次。我特别喜欢它的Brand Voice功能，可以训练它模仿你品牌的语气。',
    category: 'AI写作',
    categorySlug: 'writing',
    pricingType: 'paid',
    priceRange: '$49-125/月',
    website: 'https://www.jasper.ai',
    features: ['营销模板', '品牌声音', 'SEO优化', '多语言', '团队协作'],
    pros: ['营销文案质量高', '模板丰富', '品牌一致性', '团队协作好'],
    cons: ['价格较高', '学习曲线陡', '非营销内容一般'],
    alternatives: ['Copy.ai', 'Notion AI'],
    editorRating: 4.4,
    difficulty: 3,
    createdAt: '2026-02-27',
    updatedAt: '2026-02-27',
    isEditorsPick: true,
    isFeatured: true
  },

  // ===== AI编程 (3个) =====
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    slug: 'github-copilot',
    description: 'GitHub和OpenAI合作的AI编程助手',
    reason: '代码补全的准确率让我惊讶，它真的懂我在写什么',
    fullReview: 'GitHub Copilot是我每天编程时最离不开的工具。它不像传统的代码补全那样只是基于语法，而是真正理解上下文，能预测你下一步要写什么。最神奇的时刻是它自动补全整个函数，而且和我想要的一模一样。它特别擅长：样板代码、单元测试、文档注释、正则表达式。',
    category: 'AI编程',
    categorySlug: 'code',
    pricingType: 'paid',
    priceRange: '$10/月，免费对学生和开源维护者',
    website: 'https://github.com/features/copilot',
    features: ['代码补全', '函数生成', '注释生成', '测试生成', '多语言支持'],
    pros: ['理解上下文', 'IDE集成好', '节省时间', '支持语言多'],
    cons: ['偶有错误建议', '隐私顾虑', '可能版权风险'],
    alternatives: ['Cursor', 'Codeium'],
    editorRating: 4.7,
    difficulty: 1,
    createdAt: '2026-02-27',
    updatedAt: '2026-02-27',
    isEditorsPick: true,
    isFeatured: true
  },
  {
    id: 'cursor',
    name: 'Cursor',
    slug: 'cursor',
    description: 'AI原生的代码编辑器，基于VS Code',
    reason: 'AI和编辑器的深度融合，Coding体验完全不同',
    fullReview: 'Cursor是我今年发现的最令人兴奋的编程工具。它不只是给VS Code加了个AI插件，而是重新思考了AI时代的代码编辑器应该是什么样的。它的Composer功能太强大了。你可以用自然语言描述需求，它会自动生成、修改多个文件。Tab键的代码补全比Copilot更智能，因为它有整个项目的上下文。',
    category: 'AI编程',
    categorySlug: 'code',
    pricingType: 'freemium',
    priceRange: '免费版可用，Pro $20/月',
    website: 'https://cursor.sh',
    features: ['Composer', '智能补全', 'Inline Edit', '代码解释', '错误修复'],
    pros: ['AI深度融合', '多文件编辑', '上下文理解强', '体验流畅'],
    cons: ['迁移成本高', 'Pro版较贵', '资源占用大'],
    alternatives: ['GitHub Copilot', 'Windsurf'],
    editorRating: 4.8,
    difficulty: 2,
    createdAt: '2026-02-27',
    updatedAt: '2026-02-27',
    isEditorsPick: true,
    isFeatured: true
  },
  {
    id: 'codeium',
    name: 'Codeium',
    slug: 'codeium',
    description: '免费的AI编程助手，Copilot的替代品',
    reason: '免费又好用，学生和个人开发者的最佳选择',
    fullReview: 'Codeium是我推荐给每个预算有限的开发者的工具。它提供了和Copilot类似的代码补全功能，但个人用户完全免费，这在AI编程工具中非常罕见。它的补全质量虽然不如Copilot和Cursor，但对于日常编程已经足够好了。而且它的速度非常快，几乎没有延迟。',
    category: 'AI编程',
    categorySlug: 'code',
    pricingType: 'free',
    priceRange: '个人免费，Pro $12/月',
    website: 'https://codeium.com',
    features: ['代码补全', '自然语言搜索', '代码解释', '文档生成', '多IDE支持'],
    pros: ['个人完全免费', '速度快', 'IDE支持广', '隐私友好'],
    cons: ['能力不如付费工具', '复杂场景弱', '中文支持一般'],
    alternatives: ['GitHub Copilot', 'Cursor'],
    editorRating: 4.3,
    difficulty: 1,
    createdAt: '2026-02-27',
    updatedAt: '2026-02-27',
    isEditorsPick: false,
    isFeatured: true
  },

  // ===== AI图像 (3个) =====
  {
    id: 'midjourney',
    name: 'Midjourney',
    slug: 'midjourney',
    description: '强大的AI图像生成工具，可创建高质量艺术作品',
    reason: '图像质量和艺术性是目前所有工具中最高的',
    fullReview: 'Midjourney V6的发布让我再次确认它在AI图像生成领域的统治地位。其他工具可能在某些方面追赶，但综合质量和艺术性，Midjourney依然是第一。它的图像有一种独特的美感——不是简单的照片级真实，而是带有一种梦幻的、艺术的气质。Discord的使用方式一开始让我不适应，但这种社区驱动的模式其实很有意思。',
    category: 'AI图像',
    categorySlug: 'image',
    pricingType: 'paid',
    priceRange: '$10-60/月',
    website: 'https://www.midjourney.com',
    features: ['文生图', '图生图', '风格迁移', '高清放大', '社区灵感'],
    pros: ['图像质量最高', '艺术感强', '社区活跃', '持续进化'],
    cons: ['学习曲线陡', 'Discord界面', '指令遵循差'],
    alternatives: ['DALL-E 3', 'Stable Diffusion'],
    editorRating: 4.8,
    difficulty: 3,
    createdAt: '2026-02-27',
    updatedAt: '2026-02-27',
    isEditorsPick: true,
    isFeatured: true
  },
  {
    id: 'dalle3',
    name: 'DALL-E 3',
    slug: 'dalle3',
    description: 'OpenAI的AI图像生成工具，与ChatGPT集成',
    reason: '对提示词的理解最准确，你想要什么它就能生成什么',
    fullReview: 'DALL-E 3最大的优点是它真的能听懂你在说什么。其他工具经常需要你学习特殊的提示词技巧，但DALL-E 3你只需要用自然语言描述，它就能准确理解。和ChatGPT的集成让它使用非常方便。在准确遵循指令方面，它比Midjourney强多了。缺点是图像的艺术性和美感不如Midjourney。',
    category: 'AI图像',
    categorySlug: 'image',
    pricingType: 'freemium',
    priceRange: 'ChatGPT Plus $20/月包含',
    website: 'https://openai.com/dall-e-3',
    features: ['精准控制', '自然语言理解', 'ChatGPT集成', '文字渲染', '风格多样'],
    pros: ['理解准确', '使用简单', '文字渲染好', '集成度高'],
    cons: ['艺术性一般', '需要排队', '风格单一'],
    alternatives: ['Midjourney', 'Adobe Firefly'],
    editorRating: 4.4,
    difficulty: 1,
    createdAt: '2026-02-27',
    updatedAt: '2026-02-27',
    isEditorsPick: false,
    isFeatured: true
  },
  {
    id: 'stable-diffusion',
    name: 'Stable Diffusion',
    slug: 'stable-diffusion',
    description: '开源的AI图像生成模型，可本地部署',
    reason: '开源免费，定制化程度最高，没有内容限制',
    fullReview: 'Stable Diffusion是AI图像生成领域的Linux。它开源、免费、高度可定制，给了用户最大的自由度。本地部署意味着没有使用限制，没有审查，没有订阅费。它的生态极其丰富，各种微调模型、LoRA、ControlNet插件让它的能力无限扩展。对于技术人员和想要完全控制生成过程的用户，SD是最佳选择。',
    category: 'AI图像',
    categorySlug: 'image',
    pricingType: 'free',
    priceRange: '免费开源',
    website: 'https://stability.ai',
    features: ['本地部署', '模型训练', 'ControlNet', '无限定制', '商业授权'],
    pros: ['完全免费', '高度定制', '无内容限制', '生态丰富'],
    cons: ['需要好显卡', '配置复杂', '学习曲线陡'],
    alternatives: ['Midjourney', 'DALL-E 3'],
    editorRating: 4.5,
    difficulty: 4,
    createdAt: '2026-02-27',
    updatedAt: '2026-02-27',
    isEditorsPick: false,
    isFeatured: true
  },

  // ===== AI视频 (2个) =====
  {
    id: 'runway',
    name: 'Runway',
    slug: 'runway',
    description: 'AI视频编辑和生成工具，支持多种创意效果',
    reason: '视频生成的质量和可控性是目前最好的',
    fullReview: 'Runway Gen-2让我第一次觉得AI生成的视频真的可以用在专业项目中了。它的Motion Brush功能特别有意思——你可以用笔刷选择画面中的特定区域，让它们动起来，其他区域保持静止。这种精细控制是其他工具没有的。视频到视频的转换也很强大。',
    category: 'AI视频',
    categorySlug: 'video',
    pricingType: 'freemium',
    priceRange: '免费试用，$12-76/月',
    website: 'https://runwayml.com',
    features: ['文生视频', '图生视频', 'Motion Brush', '视频编辑', '绿幕去除'],
    pros: ['质量高', '可控性强', '功能丰富', '创意无限'],
    cons: ['生成慢', '积分消耗快', '价格偏高'],
    alternatives: ['Pika', 'HeyGen'],
    editorRating: 4.4,
    difficulty: 2,
    createdAt: '2026-02-27',
    updatedAt: '2026-02-27',
    isEditorsPick: true,
    isFeatured: true
  },
  {
    id: 'heygen',
    name: 'HeyGen',
    slug: 'heygen',
    description: 'AI数字人视频生成工具',
    reason: '数字人的真实度让我惊讶，口型和表情都对得上',
    fullReview: 'HeyGen是我用过的最逼真的AI数字人工具。它生成的虚拟主播不仅口型能对上，面部表情和手势也很自然。如果不是仔细看，很难分辨是真人还是AI。对于需要大量视频内容的创作者和企业，这是革命性的工具。你可以创建一个数字人，然后让它说任何语言的内容。',
    category: 'AI视频',
    categorySlug: 'video',
    pricingType: 'paid',
    priceRange: '$24-72/月',
    website: 'https://www.heygen.com',
    features: ['数字人', '多语言', '口型同步', '模板丰富', '自定义形象'],
    pros: ['真实度高', '多语言支持', '使用简单', '场景丰富'],
    cons: ['价格较高', '细看有AI痕迹', '创意自由度低'],
    alternatives: ['Synthesia', 'D-ID'],
    editorRating: 4.3,
    difficulty: 1,
    createdAt: '2026-02-27',
    updatedAt: '2026-02-27',
    isEditorsPick: false,
    isFeatured: true
  },

  // ===== AI音频 (2个) =====
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    slug: 'elevenlabs',
    description: 'AI语音合成工具，支持声音克隆',
    reason: '语音合成的自然度是我听过的最逼真的',
    fullReview: 'ElevenLabs的声音合成质量让我第一次觉得AI语音真的可以骗过人。它的声音不仅有正确的语调和停顿，还有情感和个性的细微差别。声音克隆功能更是神奇。你只需要录制几分钟的样本，它就能克隆出几乎一模一样的声音。对于播客、有声书、视频配音和内容创作者，这节省了大量时间和成本。',
    category: 'AI音频',
    categorySlug: 'audio',
    pricingType: 'freemium',
    priceRange: '免费试用，$5-330/月',
    website: 'https://elevenlabs.io',
    features: ['语音合成', '声音克隆', '多语言', '情感控制', '语音编辑'],
    pros: ['质量极高', '克隆逼真', '价格合理', '多语言支持'],
    cons: ['中文稍弱', '法律风险', '免费版限制多'],
    alternatives: ['Murf', 'Play.ht'],
    editorRating: 4.7,
    difficulty: 1,
    createdAt: '2026-02-27',
    updatedAt: '2026-02-27',
    isEditorsPick: true,
    isFeatured: true
  },
  {
    id: 'suno',
    name: 'Suno',
    slug: 'suno-ai',
    description: 'AI音乐生成工具，可根据文字描述创作歌曲',
    reason: '生成的歌曲有旋律、有歌词、有人声，完整度超出预期',
    fullReview: 'Suno是我今年用过的最令人惊艳的AI工具之一。它不只是生成背景音乐，而是能创作完整的歌曲——包括旋律、编曲、歌词和人声演唱。你描述你想要的风格和主题，几分钟内就能得到一首2分钟的完整歌曲。对于需要背景音乐的视频创作者、想要快速demo的音乐人、或者只是想尝试音乐创作的新手，Suno都是绝佳的选择。',
    category: 'AI音频',
    categorySlug: 'audio',
    pricingType: 'freemium',
    priceRange: '免费版可用，Pro $8/月',
    website: 'https://suno.com',
    features: ['音乐生成', '歌词创作', '人声合成', '风格选择', '多语言'],
    pros: ['完整歌曲', '质量高', '使用简单', '价格便宜'],
    cons: ['偶有artifacts', '控制粒度粗', '版权不明'],
    alternatives: ['Udio', 'AIVA'],
    editorRating: 4.5,
    difficulty: 1,
    createdAt: '2026-02-27',
    updatedAt: '2026-02-27',
    isEditorsPick: true,
    isFeatured: true
  }
];

// 编辑精选数据
export const editorPicks: EditorPick[] = [
  {
    id: 'pick1',
    tool: toolsData.find(t => t.id === 'claude')!,
    editor: editors[0],
    comment: '处理论文和报告时，Claude的长上下文能力让我惊艳。200K的窗口意味着我可以扔给它整本书然后提问。',
    pickedAt: '2026-02-27'
  },
  {
    id: 'pick2',
    tool: toolsData.find(t => t.id === 'cursor')!,
    editor: editors[1],
    comment: 'Composer功能彻底改变了我的编程方式。描述需求，它自动生成多文件代码，而且都能运行。',
    pickedAt: '2026-02-27'
  },
  {
    id: 'pick3',
    tool: toolsData.find(t => t.id === 'midjourney')!,
    editor: editors[2],
    comment: 'V6的质量让我再次确认它在AI图像领域的统治地位。那种独特的美感是其他工具模仿不了的。',
    pickedAt: '2026-02-27'
  }
];

// 分类数据
export const categoriesData = [
  { id: '1', name: 'AI聊天', slug: 'chatbot', count: 45, popularity: 95 },
  { id: '2', name: 'AI写作', slug: 'writing', count: 38, popularity: 85 },
  { id: '3', name: 'AI编程', slug: 'code', count: 32, popularity: 90 },
  { id: '4', name: 'AI图像', slug: 'image', count: 56, popularity: 92 },
  { id: '5', name: 'AI视频', slug: 'video', count: 24, popularity: 78 },
  { id: '6', name: 'AI音频', slug: 'audio', count: 18, popularity: 72 },
  { id: '7', name: '效率工具', slug: 'productivity', count: 42, popularity: 88 },
  { id: '8', name: '设计助手', slug: 'design', count: 28, popularity: 68 },
  { id: '9', name: '知识管理', slug: 'knowledge', count: 22, popularity: 65 },
  { id: '10', name: '数据分析', slug: 'data', count: 15, popularity: 58 },
];

// 工具函数
export function getToolBySlug(slug: string): Tool | undefined {
  return toolsData.find(t => t.slug === slug);
}

export function getToolsByCategory(categorySlug: string): Tool[] {
  return toolsData.filter(t => t.categorySlug === categorySlug);
}

export function getFeaturedTools(): Tool[] {
  return toolsData.filter(t => t.isFeatured);
}

export function getEditorsPickTools(): Tool[] {
  return toolsData.filter(t => t.isEditorsPick);
}

export function getTrendingTools(limit: number = 10): Tool[] {
  return toolsData.slice(0, limit);
}
