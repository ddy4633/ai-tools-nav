import type { Tool } from '@/types/tool';

export const sourcedBatchToolsRound7: Tool[] = [
  {
    id: 'runway',
    name: 'Runway',
    description: '头部 AI 视频平台之一，强项是视频生成、编辑工作流和面向创作者的成片能力。',
    reason: '如果你要的不是单个特效，而是一整条 AI 视频工作流，Runway 仍然是很难绕开的平台。',
    fullReview: 'Runway 的价值不只是会生成视频，而是它把“生成、编辑、改动、继续做成片”连成了一条线。很多视频工具只解决某个片段，而 Runway 更像一个创作者工作台：你可以从创意起步，一路走到剪辑、改动和成片交付。\n\n这让它特别适合广告、短片、MV、社媒内容和创意团队使用。相比只会文生视频的工具，Runway 更像真正的视频制作软件在吸收 AI 能力，而不是纯模型演示页。很多创作者会把它当作 AI 视频时代最接近“生产工具”的平台之一。\n\n但它也不便宜，而且学习成本高于单点工具。你需要理解生成结果、剪辑流程和素材边界，才能发挥它的真正价值。Runway 适合认真做视频的人，不只是偶尔玩玩的人。',
    category: 'AI视频',
    categorySlug: 'video',
    pricingType: 'freemium',
    priceRange: '通常提供基础体验，更高分辨率、更多生成额度与团队能力需要订阅升级',
    website: 'https://runwayml.com/',
    reviewSources: [
      {
        source: 'Runway 官方',
        url: 'https://runwayml.com/',
        summary: '官方持续把 Runway 定位为面向创作者的 AI 媒体平台，重点不只是生成，而是完整视频工作流。'
      },
      {
        source: 'Tom\'s Guide',
        url: 'https://www.tomsguide.com/features/5-best-ai-video-generators-tested-and-compared',
        summary: 'Tom\'s Guide 的实测长期把 Runway 放在头部阵营，认为它在综合能力和创作者适配度上依然很强。'
      }
    ],
  },
  {
    id: 'heygen',
    name: 'HeyGen',
    description: '企业级数字人视频平台，擅长口型同步、人物自然度和多语言营销/培训内容生产。',
    reason: '如果你要规模化做讲解、销售、培训和出海视频，HeyGen 会比纯创意视频工具更实用。',
    fullReview: 'HeyGen 的优势在于把“数字人视频”做成了成熟产品，而不是单纯演示能力。你可以快速生成讲解视频、营销视频、培训视频和本地化内容，这对销售、市场、教育和客服团队来说非常有吸引力。\n\n它特别适合标准化、可重复生产的内容。比如产品介绍、课程更新、企业内部沟通、出海视频本地化，这些任务本来就追求高效率和大规模复用，而不是电影级创意。HeyGen 正好瞄准这类场景。\n\n边界也很清晰：如果你要复杂镜头叙事和强导演感，它不如 Runway 或可灵这类视频模型；而数字人越真实，用户对口型、语气、停顿的要求就越高。HeyGen 最强的是效率，不是艺术感。',
    category: 'AI视频',
    categorySlug: 'video',
    pricingType: 'paid',
    priceRange: '以团队和企业场景为主，正式商用通常需要付费套餐',
    website: 'https://www.heygen.com/',
    reviewSources: [
      {
        source: 'HeyGen 官方',
        url: 'https://www.heygen.com/',
        summary: '官方将 HeyGen 定位为面向商业视频与数字人内容生产的平台，强调多语言、本地化和易用性。'
      },
      {
        source: 'G2',
        url: 'https://www.g2.com/products/heygen/reviews',
        summary: 'G2 用户普遍认可 HeyGen 在数字人口型同步、出片效率和企业场景适配上的成熟度，同时也会关注价格与模板感问题。'
      }
    ],
  },
  {
    id: 'synclabs',
    name: 'Sync Labs',
    description: '专注视频唇形同步和视频翻译的 AI 工具，适合让现有视频快速变成多语言版本。',
    reason: '如果你已经有视频素材，而不是从零生成视频，Sync Labs 这类换嘴型工具会比重新拍或重做更划算。',
    fullReview: 'Sync Labs 的价值非常明确：不是重新做视频，而是复用已有视频。它擅长处理口型同步、声音替换和跨语言分发，所以特别适合已经有成熟视频资产的团队做本地化或人物换嘴。\n\n这类能力对出海内容、教学视频、采访片段、数字人传播和媒体素材复用都很有意义。很多时候真正昂贵的是拍摄成本和人物出镜成本，而不是后期语言版本。Sync Labs 就是在帮你节省这部分重复制作。\n\n但边界也明显：它更像后处理工具，不是完整视频生成平台；复杂角度、遮挡、表情和极端口型仍会暴露瑕疵；而且越贴近真人，用户越容易注意到细小不自然。它很实用，但要放在合适任务里。',
    category: 'AI视频',
    categorySlug: 'video',
    pricingType: 'paid',
    priceRange: '通常面向专业创作者和团队，重度商用与批量处理需要付费方案',
    website: 'https://synclabs.so/',
    reviewSources: [
      {
        source: 'Sync Labs 官方',
        url: 'https://synclabs.so/',
        summary: '官方长期强调其核心能力是视频唇形同步和多语言视频处理，明显聚焦在后处理与内容复用。'
      },
      {
        source: 'Product Hunt',
        url: 'https://www.producthunt.com/products/sync-labs',
        summary: 'Product Hunt 社区对 Sync Labs 的关注点主要在“复用现有视频资产”的商业价值，而不是把它当成纯生成模型。'
      }
    ],
  },
  {
    id: 'suno',
    name: 'Suno',
    description: '最具话题性的 AI 音乐生成平台之一，优势在于一段提示词就能快速得到完整歌曲。',
    reason: '如果你想要的是“马上有一首像歌的东西”，Suno 的完成度和娱乐性都非常强。',
    fullReview: 'Suno 的魅力在于它极大地降低了做歌的门槛。你不需要懂编曲、混音或歌唱，就能通过一句风格描述快速得到带人声、结构完整、像模像样的歌曲。这种体验对大众用户来说非常有冲击力，也让它迅速成为 AI 音乐赛道里最出圈的产品之一。\n\n它特别适合灵感验证、内容配乐、短视频音乐尝试、玩梗创作和快速 Demo。很多人不会把它当传统音乐制作工具，但会把它当一个极强的“音乐灵感引擎”。\n\n但它离专业制作依然有距离。歌词质量、结构稳定性、混音细节和版权边界都需要谨慎看待；越接近真正发行级音乐，人工介入就越不可少。Suno 最强的是让人人都能马上开始，而不是替代完整音乐制作行业。',
    category: 'AI音频',
    categorySlug: 'audio',
    pricingType: 'freemium',
    priceRange: '通常提供免费体验，高频生成和商用需求一般需要升级方案',
    website: 'https://suno.com/',
    reviewSources: [
      {
        source: 'Suno 官方',
        url: 'https://suno.com/',
        summary: '官方持续把 Suno 定位为任何人都能快速创作完整歌曲的平台，突出从提示词到成歌的低门槛体验。'
      },
      {
        source: 'PCMag',
        url: 'https://www.pcmag.com/reviews/suno',
        summary: 'PCMag 认为 Suno 的最大亮点是歌曲完成度和娱乐性非常高，但也提醒专业音乐制作仍需更细的人工控制。'
      }
    ],
  },
  {
    id: 'udio',
    name: 'Udio',
    description: '高质量 AI 音乐生成工具，长于音色表现、音乐性和更偏“制作感”的输出。',
    reason: '如果你觉得 AI 音乐不只要快，还要更像“认真做过”的作品，Udio 往往会进入你的比较名单。',
    fullReview: 'Udio 常被拿来和 Suno 并排比较，但它的吸引力往往不是更热闹，而是更“像制作”。不少用户会觉得 Udio 在音色、音乐性和细节层次上更耐听，因此它在真正关心成品质感的创作者中拥有很强口碑。\n\n它适合做更认真一点的音乐草案、片段创作和风格探索。对想把 AI 音乐往更高质量内容方向推进的人来说，Udio 常常不是最快的那个，却可能是更值得多试几轮的那个。\n\n当然，它也不是完美答案。版权、歌词控制、结构延展和商用边界依然需要谨慎；而且当用户要求越高时，AI 音乐就越需要人工筛选和后期。Udio 的优势是质量上限，而不是完全免后期。',
    category: 'AI音频',
    categorySlug: 'audio',
    pricingType: 'freemium',
    priceRange: '通常提供基础免费额度，更高生成量和进阶使用需要升级方案',
    website: 'https://www.udio.com/',
    reviewSources: [
      {
        source: 'Udio 官方',
        url: 'https://www.udio.com/',
        summary: '官方把 Udio 定位为面向高质量音乐创作的 AI 工具，强调创作自由度和歌曲质量。'
      },
      {
        source: 'PCMag',
        url: 'https://www.pcmag.com/reviews/udio',
        summary: 'PCMag 长期把 Udio 视为 AI 音乐赛道里更偏质量派的一档，特别认可其音乐性和成品质感。'
      }
    ],
  }
];

export default sourcedBatchToolsRound7;
