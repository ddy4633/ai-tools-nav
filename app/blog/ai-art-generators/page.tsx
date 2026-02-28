import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Paintbrush, 
  Star, 
  Zap, 
  DollarSign, 
  CheckCircle, 
  XCircle,
  ArrowRight,
  Sparkles,
  Palette,
  Image as ImageIcon,
  ExternalLink
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI绘画网站推荐 - 免费AI图像生成工具排行榜 | AI工具导航',
  description: '2024年最新AI绘画网站推荐，精选Midjourney、Stable Diffusion、DALL-E等免费AI图像生成工具，包含详细功能对比、价格分析和适用场景指南。',
  keywords: ['AI绘画', 'AI图像生成', 'Midjourney', 'Stable Diffusion', 'DALL-E', '免费AI绘画工具', 'AI画画'],
  alternates: {
    canonical: 'https://ai.poph163.com/blog/ai-art-generators',
  },
  openGraph: {
    title: 'AI绘画网站推荐 - 免费AI图像生成工具排行榜',
    description: '精选最好的AI绘画网站，免费与付费工具对比评测',
    url: 'https://ai.poph163.com/blog/ai-art-generators',
    type: 'article',
  },
};

// AI绘画工具数据
const aiArtTools = [
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: '目前最热门的AI绘画工具，以艺术感和细节著称，适合创作高质量概念艺术和插画作品。',
    pricing: '付费',
    priceDetail: '$10/月起',
    rating: 4.9,
    features: ['极高图像质量', '艺术感强', 'Discord社区活跃', '风格多样'],
    pros: ['生成效果顶级', '细节丰富', '社区氛围好'],
    cons: ['需翻墙使用', '无免费额度', '需Discord'],
    bestFor: '专业设计师、艺术家、高质量创作需求',
    website: 'https://www.midjourney.com',
  },
  {
    id: 'stable-diffusion',
    name: 'Stable Diffusion',
    description: '开源免费的AI绘画模型，支持本地部署，拥有庞大的模型生态和高度可定制性。',
    pricing: '免费',
    priceDetail: '开源免费',
    rating: 4.7,
    features: ['完全免费', '开源可定制', '本地部署', '模型丰富'],
    pros: ['零成本使用', '隐私安全', '高度可控'],
    cons: ['配置门槛高', '需硬件支持', '学习曲线陡峭'],
    bestFor: '技术用户、隐私敏感用户、批量生成需求',
    website: 'https://stability.ai',
  },
  {
    id: 'dall-e-3',
    name: 'DALL-E 3',
    description: 'OpenAI推出的AI绘画工具，与ChatGPT深度整合，文字理解能力出色，操作简单易用。',
    pricing: '付费',
    priceDetail: 'ChatGPT Plus订阅',
    rating: 4.6,
    features: ['文字理解精准', '与ChatGPT整合', '对话式创作', '中文支持好'],
    pros: ['提示词理解强', '操作便捷', '生成速度快'],
    cons: ['需订阅ChatGPT Plus', '风格相对单一', '自由度较低'],
    bestFor: '初学者、内容创作者、快速原型设计',
    website: 'https://openai.com/dall-e-3',
  },
  {
    id: 'leonardo',
    name: 'Leonardo.AI',
    description: '专为游戏开发和创意产业设计的AI绘画平台，提供丰富的预设模型和精细控制选项。',
    pricing: '免费试用',
    priceDetail: '每日150积分免费',
    rating: 4.5,
    features: ['每日免费额度', '游戏资源专精', '模型训练', '实时生成'],
    pros: ['有免费额度', '专业模型多', '训练自定义模型'],
    cons: ['高级功能付费', '免费额度有限'],
    bestFor: '游戏开发者、概念设计师、素材制作',
    website: 'https://leonardo.ai',
  },
  {
    id: 'ideogram',
    name: 'Ideogram',
    description: '专注于文字渲染的AI绘画工具，在图片中生成可读文字方面表现突出。',
    pricing: '免费',
    priceDetail: '基础版免费',
    rating: 4.4,
    features: ['文字渲染优秀', '海报设计', 'Logo生成', '多比例支持'],
    pros: ['文字显示准确', '适合商业设计', '操作简单'],
    cons: ['艺术感一般', '免费版有水印'],
    bestFor: '平面设计师、海报制作、带文字图片需求',
    website: 'https://ideogram.ai',
  },
  {
    id: 'adobe-firefly',
    name: 'Adobe Firefly',
    description: 'Adobe推出的生成式AI工具，与Photoshop、Illustrator等软件深度集成。',
    pricing: '免费试用',
    priceDetail: '每月25积分免费',
    rating: 4.3,
    features: ['与Adobe套件集成', '商业安全', '生成式填充', '矢量生成'],
    pros: ['工作流整合', '版权安全', '专业工具链'],
    cons: ['Adobe生态依赖', '免费额度少'],
    bestFor: 'Adobe用户、商业设计师、专业工作流程',
    website: 'https://www.adobe.com/products/firefly.html',
  },
  {
    id: 'bing-image-creator',
    name: 'Bing Image Creator',
    description: '微软推出的免费AI绘画工具，基于DALL-E技术，无需注册即可使用。',
    pricing: '免费',
    priceDetail: '完全免费',
    rating: 4.2,
    features: ['完全免费', '基于DALL-E', '无需注册', 'Boost加速'],
    pros: ['零门槛使用', '速度快', '基础功能完善'],
    cons: ['功能较简单', '效果不如付费工具', '国内访问受限'],
    bestFor: '初学者、临时使用、轻量级需求',
    website: 'https://www.bing.com/create',
  },
  {
    id: 'playground',
    name: 'Playground AI',
    description: '用户友好的AI绘画平台，提供免费额度，支持多种模型切换和图层编辑。',
    pricing: '免费试用',
    priceDetail: '每日500张免费',
    rating: 4.1,
    features: ['每日大量免费', '多模型支持', '图层编辑', '社区分享'],
    pros: ['免费额度多', '操作简单', '社交功能好'],
    cons: ['高峰期需排队', '高级模型付费'],
    bestFor: '预算有限用户、初学者、快速尝试',
    website: 'https://playgroundai.com',
  },
];

export default function AIArtGeneratorsPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-border-light">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />
        <div className="container mx-auto px-4 py-16 sm:py-20 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-full text-purple-600 text-sm font-medium mb-6">
              <Palette className="w-4 h-4" />
              AI绘画工具
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-6">
              AI绘画网站推荐
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              精选2024年最值得使用的AI绘画网站，从免费工具到专业级软件，
              帮你找到最适合的AI图像生成解决方案
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* 介绍部分 */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-surface-card rounded-2xl p-8 border border-border-light">
            <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-purple-500" />
              什么是AI绘画工具？
            </h2>
            <div className="prose prose-lg max-w-none text-text-secondary space-y-4">
              <p>
                AI绘画工具是利用人工智能技术，根据文字描述（提示词）自动生成图像的在线服务。
                这些工具通过深度学习模型理解自然语言，并将其转化为视觉艺术作品。
              </p>
              <p>
                无论你是专业设计师、内容创作者，还是只是想尝试AI绘画的初学者，
                市场上都有适合你的工具。从<strong>Midjourney</strong>的艺术风格到
                <strong>Stable Diffusion</strong>的开源自由，再到<strong>DALL-E 3</strong>的便捷易用，
                每款工具都有其独特优势。
              </p>
              <p>
                本页面为你整理了2024年最值得推荐的8款AI绘画网站，包含详细的功能对比、
                价格分析和适用场景指南，帮助你快速找到适合自己的AI绘画工具。
              </p>
            </div>
          </div>
        </div>

        {/* 推荐工具列表 */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
            推荐AI绘画工具
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiArtTools.map((tool) => (
              <div
                key={tool.id}
                className="bg-surface-card rounded-2xl p-6 border border-border-light hover:border-purple-500/30 transition-all hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-text-primary mb-1">{tool.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        tool.pricing === '免费' 
                          ? 'bg-green-500/10 text-green-600' 
                          : tool.pricing === '免费试用'
                          ? 'bg-yellow-500/10 text-yellow-600'
                          : 'bg-purple-500/10 text-purple-600'
                      }`}>
                        {tool.pricing}
                      </span>
                      <span className="text-xs text-text-muted">{tool.priceDetail}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-semibold text-text-primary">{tool.rating}</span>
                  </div>
                </div>

                <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                  {tool.description}
                </p>

                {/* 功能标签 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {tool.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-2 py-1 bg-surface-base text-text-secondary text-xs rounded-md"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* 优缺点 */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs font-medium text-green-600 mb-2 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      优点
                    </p>
                    <ul className="text-xs text-text-secondary space-y-1">
                      {tool.pros.map((pro) => (
                        <li key={pro}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-red-500 mb-2 flex items-center gap-1">
                      <XCircle className="w-3 h-3" />
                      缺点
                    </p>
                    <ul className="text-xs text-text-secondary space-y-1">
                      {tool.cons.map((con) => (
                        <li key={con}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 适用场景 */}
                <div className="bg-purple-50 rounded-lg p-3 mb-4">
                  <p className="text-xs text-purple-700">
                    <strong>适用：</strong>{tool.bestFor}
                  </p>
                </div>

                {/* 操作按钮 */}
                <div className="flex gap-3">
                  <a
                    href={tool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-purple-500 text-white text-sm font-medium rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    访问官网
                  </a>
                  <Link
                    href="/tools"
                    className="px-4 py-2 border border-border-light text-text-secondary text-sm font-medium rounded-lg hover:border-purple-500 hover:text-purple-500 transition-colors"
                  >
                    查看详情
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 对比表格 */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
            AI绘画工具对比表
          </h2>
          
          <div className="bg-surface-card rounded-2xl border border-border-light overflow-hidden overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-surface-base border-b border-border-light">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">工具名称</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">价格</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">核心功能</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">上手难度</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">最佳适用</th>
                </tr>
              </thead>
              <tbody>
                {aiArtTools.map((tool, index) => (
                  <tr 
                    key={tool.id} 
                    className={`border-b border-border-light last:border-b-0 ${index % 2 === 1 ? 'bg-surface-base/30' : ''}`}
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-text-primary">{tool.name}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs text-text-muted">{tool.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                        tool.pricing === '免费' 
                          ? 'bg-green-500/10 text-green-600' 
                          : tool.pricing === '免费试用'
                          ? 'bg-yellow-500/10 text-yellow-600'
                          : 'bg-purple-500/10 text-purple-600'
                      }`}>
                        {tool.pricing}
                      </span>
                      <div className="text-xs text-text-muted mt-1">{tool.priceDetail}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {tool.features.slice(0, 2).map((feature) => (
                          <span key={feature} className="text-xs text-text-secondary bg-surface-base px-2 py-0.5 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs ${
                        tool.id === 'bing-image-creator' || tool.id === 'dall-e-3'
                          ? 'text-green-600'
                          : tool.id === 'midjourney'
                          ? 'text-yellow-600'
                          : 'text-text-secondary'
                      }`}>
                        {tool.id === 'bing-image-creator' || tool.id === 'dall-e-3' ? '简单'
                          : tool.id === 'midjourney' ? '中等'
                          : tool.id === 'stable-diffusion' ? '困难'
                          : '中等'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-text-secondary line-clamp-2">
                        {tool.bestFor}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 选择建议 */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">
            如何选择适合你的AI绘画工具？
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-card rounded-xl p-6 border border-border-light">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-text-primary mb-2">预算有限</h3>
              <p className="text-sm text-text-secondary mb-3">
                如果你不想花钱，推荐使用 <strong>Stable Diffusion</strong>（技术向）
                或 <strong>Bing Image Creator</strong>（简单使用）。
              </p>
              <Link 
                href="/tools" 
                className="text-sm text-purple-600 hover:text-purple-700 font-medium inline-flex items-center gap-1"
              >
                查看免费工具 <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="bg-surface-card rounded-xl p-6 border border-border-light">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4">
                <Paintbrush className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-text-primary mb-2">专业创作</h3>
              <p className="text-sm text-text-secondary mb-3">
                如果你追求最高质量的图像效果，推荐 <strong>Midjourney</strong> 或 
                <strong>Leonardo.AI</strong>。
              </p>
              <Link 
                href="/tools" 
                className="text-sm text-purple-600 hover:text-purple-700 font-medium inline-flex items-center gap-1"
              >
                查看专业工具 <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="bg-surface-card rounded-xl p-6 border border-border-light">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-text-primary mb-2">快速上手</h3>
              <p className="text-sm text-text-secondary mb-3">
                如果你是AI绘画新手，推荐 <strong>DALL-E 3</strong> 或 
                <strong>Ideogram</strong>，操作简单易懂。
              </p>
              <Link 
                href="/tools" 
                className="text-sm text-purple-600 hover:text-purple-700 font-medium inline-flex items-center gap-1"
              >
                查看易用工具 <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* CTA部分 */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-8 border border-purple-500/20 text-center">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              探索更多AI工具
            </h2>
            <p className="text-text-secondary mb-6 max-w-xl mx-auto">
              除了AI绘画工具，我们还整理了AI写作、AI编程、AI视频等各类人工智能工具，
              帮助你全面提升工作效率。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple-500 text-white font-medium rounded-xl hover:bg-purple-600 transition-colors"
              >
                <Sparkles className="w-5 h-5" />
                返回首页
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-purple-500 text-purple-600 font-medium rounded-xl hover:bg-purple-500 hover:text-white transition-colors"
              >
                <ImageIcon className="w-5 h-5" />
                浏览全部工具
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border-light text-text-secondary font-medium rounded-xl hover:border-purple-500 hover:text-purple-600 transition-colors"
              >
                查看更多文章
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
