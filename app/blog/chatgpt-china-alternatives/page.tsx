import { Metadata } from 'next';
import { Calendar, Clock, ArrowLeft, CheckCircle, XCircle, ExternalLink, Star, Shield, Globe, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'ChatGPT国内替代 - 国内能用的AI对话工具推荐 | AI工具导航',
  description: 'ChatGPT国内无法使用？推荐文心一言、讯飞星火、通义千问、智谱清言、Kimi等国内可用的AI对话工具，详细对比优缺点，帮你找到最适合的ChatGPT替代方案。',
  keywords: ['ChatGPT国内替代', 'ChatGPT替代方案', '国内AI工具', '文心一言', '讯飞星火', '通义千问', '智谱清言', 'Kimi', 'AI对话工具'],
  alternates: {
    canonical: 'https://ai.poph163.com/blog/chatgpt-china-alternatives',
  },
  openGraph: {
    title: 'ChatGPT国内替代 - 国内能用的AI对话工具推荐',
    description: '国内可用的AI对话工具全面对比，帮你找到最适合的ChatGPT替代方案',
    url: 'https://ai.poph163.com/blog/chatgpt-china-alternatives',
    type: 'article',
    publishedTime: '2024-03-20T08:00:00+08:00',
  },
};

// 工具对比数据
const toolsComparison = [
  {
    name: '文心一言',
    company: '百度',
    url: '/tools/wenxin-yiyan',
    externalUrl: 'https://yiyan.baidu.com',
    pros: ['中文理解能力强', '与百度搜索深度整合', '支持多模态生成', 'API接口完善'],
    cons: ['创意写作能力一般', '代码能力较弱', '部分回答过于官方'],
    bestFor: '搜索问答、内容创作、日常对话',
    rating: 4.5,
  },
  {
    name: '讯飞星火',
    company: '科大讯飞',
    url: '/tools/xinghuo',
    externalUrl: 'https://xinghuo.xfyun.cn',
    pros: ['语音识别能力强', '数学逻辑优秀', 'PPT生成实用', '教育场景覆盖广'],
    cons: ['界面相对传统', '创意生成一般', '部分功能需付费'],
    bestFor: '语音交互、办公辅助、教育学习',
    rating: 4.3,
  },
  {
    name: '通义千问',
    company: '阿里巴巴',
    url: '/tools/tongyi-qianwen',
    externalUrl: 'https://tongyi.aliyun.com',
    pros: ['代码能力强', '与阿里生态整合', '文档理解优秀', '开源模型可选'],
    cons: ['中文文学性一般', '复杂推理有局限', '部分响应较慢'],
    bestFor: '编程辅助、文档处理、企业应用',
    rating: 4.4,
  },
  {
    name: '智谱清言',
    company: '智谱AI',
    url: '/tools/zhipu-qingyan',
    externalUrl: 'https://chatglm.cn',
    pros: ['学术研究能力强', '长文本处理优秀', '开源生态活跃', '专业术语准确'],
    cons: ['日常对话偏正式', '产品功能相对简单', '知名度较低'],
    bestFor: '学术研究、长文档分析、专业咨询',
    rating: 4.2,
  },
  {
    name: 'Kimi',
    company: '月之暗面',
    url: '/tools/kimi',
    externalUrl: 'https://kimi.moonshot.cn',
    pros: ['超长上下文支持', '文件处理能力突出', '阅读总结能力强', '界面简洁现代'],
    cons: ['联网搜索功能有限', '多模态支持较弱', '新功能迭代较慢'],
    bestFor: '长文档阅读、资料整理、内容总结',
    rating: 4.4,
  },
];

// 使用建议场景
const useCases = [
  {
    title: '日常办公',
    description: '推荐讯飞星火或通义千问，办公辅助功能完善，支持PPT生成和文档处理。',
    icon: '📊',
  },
  {
    title: '编程开发',
    description: '通义千问代码能力最强，文心一言和Kimi在代码解释方面表现也不错。',
    icon: '💻',
  },
  {
    title: '内容创作',
    description: '文心一言中文写作能力较强，Kimi在长篇内容整理方面有独到之处。',
    icon: '✍️',
  },
  {
    title: '学术研究',
    description: '智谱清言和Kimi擅长处理长文本和学术资料，适合论文阅读和资料整理。',
    icon: '📚',
  },
  {
    title: '语音交互',
    description: '讯飞星火语音识别和合成能力领先，适合需要语音输入输出的场景。',
    icon: '🎙️',
  },
];

export default function ChatGPTAlternativesPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Breadcrumb */}
      <div className="border-b border-border-light">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Link href="/" className="hover:text-accent-warm transition-colors">首页</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-accent-warm transition-colors">博客</Link>
            <span>/</span>
            <span className="text-text-secondary">ChatGPT国内替代</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-border-light">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-warm/5 via-transparent to-accent-cool/5" />
        <div className="container mx-auto px-4 py-16 sm:py-20 relative">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-text-muted hover:text-accent-warm transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              返回博客
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-accent-warm/10 text-accent-warm rounded-full text-sm font-medium">
                工具推荐
              </span>
              <span className="flex items-center gap-1 text-text-muted text-sm">
                <Calendar className="w-4 h-4" />
                2024-03-20
              </span>
              <span className="flex items-center gap-1 text-text-muted text-sm">
                <Clock className="w-4 h-4" />
                10 分钟阅读
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-6">
              ChatGPT国内替代方案
            </h1>
            
            <p className="text-xl text-text-secondary leading-relaxed">
              ChatGPT在国内无法直接访问？别担心！本文为您详细介绍国内可用的AI对话工具，
              包括文心一言、讯飞星火、通义千问、智谱清言、Kimi等，帮助您找到最适合的替代方案。
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* 为什么需要替代 */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-accent-warm/10 flex items-center justify-center text-accent-warm text-lg">1</span>
              为什么需要ChatGPT替代方案？
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-surface-card rounded-xl p-6 border border-border-light">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-bold text-text-primary mb-2">网络限制</h3>
                <p className="text-text-secondary text-sm">
                  ChatGPT官网在国内无法直接访问，需要特殊网络环境，给普通用户带来不便。
                </p>
              </div>
              
              <div className="bg-surface-card rounded-xl p-6 border border-border-light">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-text-primary mb-2">语言优化</h3>
                <p className="text-text-secondary text-sm">
                  国内AI工具针对中文场景深度优化，在中文理解和生成方面表现更出色。
                </p>
              </div>
              
              <div className="bg-surface-card rounded-xl p-6 border border-border-light">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-text-primary mb-2">合规安全</h3>
                <p className="text-text-secondary text-sm">
                  国内工具符合本地法规要求，数据存储在境内，更适合企业级应用。
                </p>
              </div>
            </div>
          </section>

          {/* 工具对比 */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-accent-warm/10 flex items-center justify-center text-accent-warm text-lg">2</span>
              主流国内AI工具对比
            </h2>

            <div className="space-y-6">
              {toolsComparison.map((tool, index) => (
                <div key={tool.name} className="bg-surface-card rounded-xl border border-border-light overflow-hidden hover:border-accent-warm/30 transition-all">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-warm to-accent-cool flex items-center justify-center text-white font-bold text-lg">
                          {tool.name[0]}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-text-primary">{tool.name}</h3>
                          <p className="text-text-muted text-sm">{tool.company}</p>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < Math.floor(tool.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-text-muted'}`} 
                              />
                            ))}
                            <span className="text-text-muted text-sm ml-1">{tool.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href={tool.url}
                          className="px-4 py-2 bg-accent-warm/10 text-accent-warm rounded-lg text-sm font-medium hover:bg-accent-warm/20 transition-colors"
                        >
                          查看详情
                        </Link>
                        <a
                          href={tool.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-surface-base text-text-secondary rounded-lg text-sm font-medium hover:bg-surface-hover transition-colors flex items-center gap-1"
                        >
                          访问官网
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <h4 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          优点
                        </h4>
                        <ul className="space-y-2">
                          {tool.pros.map((pro, i) => (
                            <li key={i} className="text-text-secondary text-sm flex items-start gap-2">
                              <span className="text-green-500 mt-1">•</span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-red-500" />
                          缺点
                        </h4>
                        <ul className="space-y-2">
                          {tool.cons.map((con, i) => (
                            <li key={i} className="text-text-secondary text-sm flex items-start gap-2">
                              <span className="text-red-500 mt-1">•</span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-border-light">
                      <p className="text-text-secondary text-sm">
                        <span className="font-semibold text-text-primary">适用场景：</span>
                        {tool.bestFor}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 使用建议 */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-accent-warm/10 flex items-center justify-center text-accent-warm text-lg">3</span>
              不同场景的使用建议
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {useCases.map((useCase, index) => (
                <div key={useCase.title} className="bg-surface-card rounded-xl p-6 border border-border-light hover:border-accent-warm/30 transition-all">
                  <div className="text-3xl mb-4">{useCase.icon}</div>
                  <h3 className="font-bold text-text-primary mb-2">{useCase.title}</h3>
                  <p className="text-text-secondary text-sm">{useCase.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 总结 */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-accent-warm/10 flex items-center justify-center text-accent-warm text-lg">4</span>
              总结与建议
            </h2>
            
            <div className="bg-gradient-to-br from-accent-warm/5 to-accent-cool/5 rounded-xl p-8 border border-accent-warm/20">
              <p className="text-text-secondary leading-relaxed mb-6">
                虽然ChatGPT在国际上处于领先地位，但国内AI对话工具在中文场景下已经具备了很强的竞争力。
                选择哪款工具，主要取决于您的具体需求：
              </p>
              
              <ul className="space-y-3 text-text-secondary mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-accent-warm font-bold">•</span>
                  <span><strong className="text-text-primary">追求综合体验</strong> - 文心一言功能全面，与搜索结合紧密</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-warm font-bold">•</span>
                  <span><strong className="text-text-primary">办公效率优先</strong> - 讯飞星火的办公辅助功能最实用</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-warm font-bold">•</span>
                  <span><strong className="text-text-primary">编程开发场景</strong> - 通义千问的代码能力值得信赖</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-warm font-bold">•</span>
                  <span><strong className="text-text-primary">长文档处理</strong> - Kimi的上下文长度优势明显</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-warm font-bold">•</span>
                  <span><strong className="text-text-primary">学术研究</strong> - 智谱清言在专业性方面表现出色</span>
                </li>
              </ul>

              <p className="text-text-secondary leading-relaxed">
                建议您根据自己的主要使用场景，选择1-2款工具进行深度体验。
                大多数工具都提供免费版本，可以充分测试后再决定是否使用付费功能。
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <h3 className="text-xl font-bold text-text-primary mb-4">探索更多AI工具</h3>
            <p className="text-text-secondary mb-6">
              访问我们的<a href="/tools" className="text-accent-warm hover:underline">AI工具库</a>，发现1000+优质AI工具
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="px-8 py-3 bg-accent-warm text-white rounded-xl hover:bg-accent-warm-hover transition-colors font-medium"
              >
                浏览首页推荐
              </Link>
              <Link
                href="/blog"
                className="px-8 py-3 bg-surface-card border border-border-medium text-text-primary rounded-xl hover:border-accent-warm hover:text-accent-warm transition-all font-medium"
              >
                阅读更多文章
              </Link>
            </div>
          </section>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-border-light">
            <div className="flex flex-wrap gap-2">
              {['ChatGPT替代', '国内AI工具', '文心一言', '讯飞星火', '通义千问', '智谱清言', 'Kimi', 'AI对话'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-surface-base text-text-secondary rounded-lg text-sm hover:bg-accent-warm/10 hover:text-accent-warm cursor-pointer transition-all"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
