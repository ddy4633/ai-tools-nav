import { Metadata } from 'next';
import Link from 'next/link';
import { toolsData } from '@/lib/content/tools-data';
import ToolPrimaryCta from '@/components/ui/ToolPrimaryCta';
import { 
  PenTool, 
  Star, 
  Zap, 
  DollarSign, 
  CheckCircle, 
  XCircle,
  ArrowRight,
  Sparkles,
  FileText,
  Lightbulb,
  Briefcase,
  GraduationCap
} from 'lucide-react';

export const metadata: Metadata = {
  title: '免费AI写作工具 - 2025最好用的AI写作软件推荐 | AI工具导航',
  description: '精选2025年最值得使用的免费AI写作工具，包含ChatGPT、Claude、Notion AI等AI写作软件的详细评测、功能对比和使用场景指南。',
  keywords: ['免费AI写作工具', 'AI写作软件', 'AI写作助手', 'ChatGPT写作', 'Claude写作', 'AI文案生成', '免费AI写作'],
  alternates: {
    canonical: 'https://ai.poph163.com/blog/ai-writing-tools-free',
  },
  openGraph: {
    title: '免费AI写作工具 - 2025最好用的AI写作软件推荐',
    description: '精选最好的免费AI写作工具，功能对比评测与使用指南',
    url: 'https://ai.poph163.com/blog/ai-writing-tools-free',
    type: 'article',
  },
};

const indexedToolIds = new Set(toolsData.map((tool) => tool.id));

function getToolDetailHref(id: string, name: string) {
  if (indexedToolIds.has(id)) {
    return `/tools/${id}`;
  }

  return `/tools?search=${encodeURIComponent(name)}`;
}

// 免费AI写作工具数据
const aiWritingTools = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'OpenAI开发的AI聊天助手，具备强大的写作和文本生成能力，支持中文内容创作，免费版功能已足够日常使用。',
    pricing: '免费试用',
    priceDetail: '免费版GPT-3.5可用',
    rating: 4.8,
    features: ['多语言写作', '文章续写', '文案优化', '翻译润色', '代码文档'],
    pros: ['中文写作流畅', '免费版功能强大', '上下文理解好', '多场景适用'],
    cons: ['高峰期需排队', '偶尔产生幻觉', '长文本有限制'],
    bestFor: '日常写作、文案创作、内容优化、学生作业',
    website: 'https://chat.openai.com',
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Anthropic开发的AI助手，以长文本处理和深度分析能力著称，写作风格细腻，特别适合深度内容创作。',
    pricing: '免费试用',
    priceDetail: '免费版有使用限额',
    rating: 4.9,
    features: ['超长文本处理', '深度分析写作', '学术写作', '创意写作', '文档总结'],
    pros: ['200K超长上下文', '中文表达优美', '逻辑严谨', '诚实可靠'],
    cons: ['免费版限额严格', '无实时联网', '响应速度较慢'],
    bestFor: '学术论文、深度文章、研究报告、长文档处理',
    website: 'https://claude.ai',
  },
  {
    id: 'notion-ai',
    name: 'Notion AI',
    description: '集成在Notion笔记中的AI写作助手，可快速生成内容、续写、翻译和总结，与笔记工作流无缝结合。',
    pricing: '免费试用',
    priceDetail: '免费用户有试用额度',
    rating: 4.5,
    features: ['笔记内嵌AI', '内容续写', '头脑风暴', '语法检查', '多语言翻译'],
    pros: ['与工作流整合', '操作便捷', '模板丰富', '协作友好'],
    cons: ['需Notion账户', '免费额度有限', '重度使用需付费'],
    bestFor: '笔记整理、团队协作、知识管理、项目文档',
    website: 'https://www.notion.so/product/ai',
  },
  {
    id: 'jasper',
    name: 'Jasper',
    description: '专注于营销文案的AI写作工具，提供丰富的模板和创作框架，帮助快速生成高质量营销内容。',
    pricing: '付费',
    priceDetail: '提供7天免费试用',
    rating: 4.4,
    features: ['营销模板库', 'SEO优化', '品牌语调', '多语言支持', '团队协作'],
    pros: ['营销场景专业', '模板丰富', 'SEO友好', '支持批量生成'],
    cons: ['无永久免费版', '价格较高', '学习成本略高'],
    bestFor: '营销人员、内容营销、社交媒体、广告文案',
    website: 'https://www.jasper.ai',
  },
  {
    id: 'copy-ai',
    name: 'Copy.ai',
    description: '专注于营销和销售文案的AI写作工具，提供90+内容模板，免费版每月提供2000字额度。',
    pricing: '免费试用',
    priceDetail: '每月2000字免费',
    rating: 4.3,
    features: ['90+内容模板', '博客写作', '社交媒体', '邮件营销', '产品描述'],
    pros: ['免费额度实在', '模板丰富', '营销导向', '界面友好'],
    cons: ['中文支持一般', '创意类内容较弱', '免费版功能受限'],
    bestFor: '营销文案、电商内容、社交媒体运营、英文写作',
    website: 'https://www.copy.ai',
  },
  {
    id: 'quillbot',
    name: 'QuillBot',
    description: '专业的改写和润色工具，提供改写、语法检查、总结和引用生成等功能，学术写作的好帮手。',
    pricing: '免费试用',
    priceDetail: '基础功能免费',
    rating: 4.2,
    features: ['智能改写', '语法检查', '文本总结', '引用生成', '同义词替换'],
    pros: ['改写功能强大', '学术写作友好', '浏览器插件', '免费版够用'],
    cons: ['中文支持有限', '生成类功能弱', '创意写作一般'],
    bestFor: '论文改写、降重、语法检查、学术写作',
    website: 'https://quillbot.com',
  },
  {
    id: 'writesonic',
    name: 'Writesonic',
    description: '全能型AI写作平台，支持博客、广告、电商等多种场景，免费版每月提供10000字额度。',
    pricing: '免费试用',
    priceDetail: '每月10000字免费',
    rating: 4.1,
    features: ['博客写作', 'SEO优化', '电商文案', '聊天机器人', '图片生成'],
    pros: ['免费额度大', '功能全面', 'SEO工具', '支持Chatsonic对话'],
    cons: ['中文质量一般', '高级功能付费', '界面稍显复杂'],
    bestFor: '博客作者、电商卖家、SEO内容、英文创作',
    website: 'https://writesonic.com',
  },
  {
    id: 'rytr',
    name: 'Rytr',
    description: '性价比高的AI写作工具，支持40+场景模板，免费版每月可生成10000字符，适合轻量用户。',
    pricing: '免费试用',
    priceDetail: '每月10000字符免费',
    rating: 4.0,
    features: ['40+写作场景', '多语言支持', '语气调整', '改写功能', '团队协作'],
    pros: ['免费额度充足', '价格实惠', '场景丰富', '简单易用'],
    cons: ['中文质量一般', '深度内容弱', 'UI设计简单'],
    bestFor: '轻量写作、邮件撰写、社交媒体、创意写作',
    website: 'https://rytr.me',
  },
];

export default function AIWritingToolsFreePage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-border-light">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-warm/5 via-transparent to-accent-cool/5" />
        <div className="container mx-auto px-4 py-16 sm:py-20 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-warm/10 rounded-full text-accent-warm text-sm font-medium mb-6">
              <PenTool className="w-4 h-4" />
              AI写作工具
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-6">
              免费AI写作工具推荐
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              精选2025年最值得使用的免费AI写作工具，从日常写作到专业创作，
              帮你找到最适合的AI写作助手，提升写作效率10倍
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* 介绍部分 */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-surface-card rounded-2xl p-8 border border-border-light">
            <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-accent-warm" />
              为什么要使用AI写作工具？
            </h2>
            <div className="prose prose-lg max-w-none text-text-secondary space-y-4">
              <p>
                AI写作工具正在 revolutionize 内容创作的方式。无论你是学生、职场人士、
                内容创作者还是专业写作者，AI写作助手都能帮你：
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li><strong>克服写作障碍</strong>：输入关键词或大纲，AI帮你快速生成初稿</li>
                <li><strong>提升写作效率</strong>：将数小时的写作任务缩短到几分钟</li>
                <li><strong>优化内容质量</strong>：自动检查语法、润色表达、调整语气</li>
                <li><strong>多语言创作</strong>：轻松将内容翻译成多种语言或进行本地化</li>
                <li><strong>激发创意灵感</strong>：AI提供不同角度的观点和表达方式</li>
              </ul>
              <p>
                本页面为你整理了<strong>8款最值得推荐的免费AI写作工具</strong>，
                包括ChatGPT、Claude、Notion AI等热门选择，以及Copy.ai、QuillBot等专业工具。
                每款工具都有详细的功能介绍、优缺点分析和适用场景建议。
              </p>
            </div>
          </div>
        </div>

        {/* 推荐工具列表 */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
            推荐免费AI写作工具
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiWritingTools.map((tool) => (
              <div
                key={tool.id}
                className="bg-surface-card rounded-2xl p-6 border border-border-light hover:border-accent-warm/30 transition-all hover:shadow-lg"
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
                          : 'bg-accent-warm/10 text-accent-warm'
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
                <div className="bg-accent-warm/5 rounded-lg p-3 mb-4">
                  <p className="text-xs text-text-secondary">
                    <strong>适用：</strong>{tool.bestFor}
                  </p>
                </div>

                {/* 操作按钮 */}
                <div className="flex gap-3">
                  <ToolPrimaryCta
                    tool={tool}
                    placement="blog_writing_primary_cta"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-accent-warm text-white text-sm font-medium rounded-lg hover:bg-accent-warm-hover transition-colors"
                  />
                  <Link
                    href={getToolDetailHref(tool.id, tool.name)}
                    className="px-4 py-2 border border-border-light text-text-secondary text-sm font-medium rounded-lg hover:border-accent-warm hover:text-accent-warm transition-colors"
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
            AI写作工具对比表
          </h2>
          
          <div className="bg-surface-card rounded-2xl border border-border-light overflow-hidden overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-surface-base border-b border-border-light">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">工具名称</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">价格</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">核心功能</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">中文支持</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">最佳适用</th>
                </tr>
              </thead>
              <tbody>
                {aiWritingTools.map((tool, index) => (
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
                          : 'bg-accent-warm/10 text-accent-warm'
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
                        tool.id === 'chatgpt' || tool.id === 'claude'
                          ? 'text-green-600'
                          : tool.id === 'notion-ai'
                          ? 'text-green-600'
                          : 'text-yellow-600'
                      }`}>
                        {tool.id === 'chatgpt' || tool.id === 'claude' || tool.id === 'notion-ai' ? '优秀'
                          : tool.id === 'jasper' ? '一般'
                          : '有限'}
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

        {/* 使用场景建议 */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">
            不同场景的AI写作工具选择建议
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-card rounded-xl p-6 border border-border-light">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-text-primary mb-2">学术写作</h3>
              <p className="text-sm text-text-secondary mb-3">
                推荐使用 <strong>Claude</strong>（长文档处理）+ <strong>QuillBot</strong>（改写润色）。
                这对组合能帮你完成从论文初稿到降重的全流程。
              </p>
              <Link 
                href="/tools" 
                className="text-sm text-accent-warm hover:text-accent-warm-hover font-medium inline-flex items-center gap-1"
              >
                查看学术工具 <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="bg-surface-card rounded-xl p-6 border border-border-light">
              <div className="w-12 h-12 bg-accent-warm/10 rounded-xl flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-accent-warm" />
              </div>
              <h3 className="font-bold text-text-primary mb-2">职场办公</h3>
              <p className="text-sm text-text-secondary mb-3">
                推荐使用 <strong>Notion AI</strong>（工作流整合）+ <strong>ChatGPT</strong>（全能助手）。
                适合会议纪要、报告撰写、邮件处理等场景。
              </p>
              <Link 
                href="/tools" 
                className="text-sm text-accent-warm hover:text-accent-warm-hover font-medium inline-flex items-center gap-1"
              >
                查看办公工具 <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="bg-surface-card rounded-xl p-6 border border-border-light">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-text-primary mb-2">营销创作</h3>
              <p className="text-sm text-text-secondary mb-3">
                推荐使用 <strong>Jasper</strong>（专业营销）+ <strong>Copy.ai</strong>（模板丰富）。
                专注于广告文案、社媒内容和产品描述的批量生成。
              </p>
              <Link 
                href="/tools" 
                className="text-sm text-accent-warm hover:text-accent-warm-hover font-medium inline-flex items-center gap-1"
              >
                查看营销工具 <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* 选择建议 */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">
            如何选择适合你的AI写作工具？
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-card rounded-xl p-6 border border-border-light">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-text-primary mb-2">预算优先</h3>
              <p className="text-sm text-text-secondary mb-3">
                推荐 <strong>ChatGPT免费版</strong> 或 <strong>Rytr免费版</strong>。
                两者都提供充足的免费额度，足以满足日常写作需求。
              </p>
              <Link 
                href="/tools" 
                className="text-sm text-accent-warm hover:text-accent-warm-hover font-medium inline-flex items-center gap-1"
              >
                查看免费工具 <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="bg-surface-card rounded-xl p-6 border border-border-light">
              <div className="w-12 h-12 bg-accent-warm/10 rounded-xl flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-accent-warm" />
              </div>
              <h3 className="font-bold text-text-primary mb-2">内容质量</h3>
              <p className="text-sm text-text-secondary mb-3">
                推荐 <strong>Claude</strong>（深度写作）或 <strong>ChatGPT Plus</strong>。
                这两者在中文写作和逻辑表达上表现最佳。
              </p>
              <Link 
                href="/tools" 
                className="text-sm text-accent-warm hover:text-accent-warm-hover font-medium inline-flex items-center gap-1"
              >
                查看高质量工具 <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="bg-surface-card rounded-xl p-6 border border-border-light">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-text-primary mb-2">快速上手</h3>
              <p className="text-sm text-text-secondary mb-3">
                推荐 <strong>Copy.ai</strong> 或 <strong>Notion AI</strong>。
                模板丰富、操作直观，几分钟就能开始创作。
              </p>
              <Link 
                href="/tools" 
                className="text-sm text-accent-warm hover:text-accent-warm-hover font-medium inline-flex items-center gap-1"
              >
                查看易用工具 <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* 使用技巧 */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-surface-card rounded-2xl p-8 border border-border-light">
            <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
              <Lightbulb className="w-6 h-6 text-yellow-500" />
              AI写作工具使用技巧
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-text-primary mb-2">1. 提供清晰的上下文</h3>
                <p className="text-sm text-text-secondary">
                  告诉AI你的目标读者、写作风格和文章长度要求，这样生成的内容会更符合预期。
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-2">2. 使用迭代优化</h3>
                <p className="text-sm text-text-secondary">
                  不要期望一次生成完美内容。先生成大纲，再逐段优化，最后整体润色。
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-2">3. 人工审核必不可少</h3>
                <p className="text-sm text-text-secondary">
                  AI可能会产生事实错误或不符合语境的表达，务必人工审核后再发布。
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-2">4. 善用模板和提示词</h3>
                <p className="text-sm text-text-secondary">
                  保存好用的提示词模板，建立自己的提示词库，提升后续写作效率。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA部分 */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-accent-warm/10 to-accent-cool/10 rounded-2xl p-8 border border-accent-warm/20 text-center">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              探索更多AI工具
            </h2>
            <p className="text-text-secondary mb-6 max-w-xl mx-auto">
              除了AI写作工具，我们还整理了AI绘画、AI编程、AI视频等各类人工智能工具，
              帮助你全面提升工作效率。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent-warm text-white font-medium rounded-xl hover:bg-accent-warm-hover transition-colors"
              >
                <Sparkles className="w-5 h-5" />
                返回首页
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-accent-warm text-accent-warm font-medium rounded-xl hover:bg-accent-warm hover:text-white transition-colors"
              >
                <FileText className="w-5 h-5" />
                浏览全部工具
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border-light text-text-secondary font-medium rounded-xl hover:border-accent-warm hover:text-accent-warm transition-colors"
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
