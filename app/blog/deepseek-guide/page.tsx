import { Metadata } from 'next';
import { Calendar, Clock, MessageCircle, Zap, Award, Users, Bot } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'DeepSeek使用教程 - 国产AI大模型DeepSeek怎么用 | AI工具导航',
  description: 'DeepSeek使用教程详解：DeepSeek是什么？如何注册使用DeepSeek？DeepSeek vs ChatGPT对比分析，DeepSeek优缺点及使用技巧。国产AI大模型DeepSeek全面指南。',
  keywords: ['DeepSeek', 'DeepSeek教程', 'DeepSeek使用', '国产AI', 'AI大模型', 'DeepSeek注册', 'DeepSeek vs ChatGPT'],
  alternates: {
    canonical: 'https://ai.poph163.com/blog/deepseek-guide',
  },
  openGraph: {
    title: 'DeepSeek使用教程 - 国产AI大模型DeepSeek怎么用',
    description: 'DeepSeek完整使用指南：注册、使用技巧、与ChatGPT对比分析',
    type: 'article',
    publishedTime: '2024-02-28',
    authors: ['AI工具导航'],
  },
};

export default function DeepSeekGuidePage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="bg-surface-card border-b border-border-light">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-text-muted hover:text-accent-warm transition-colors">首页</Link>
            <span className="text-text-muted">/</span>
            <Link href="/blog" className="text-text-muted hover:text-accent-warm transition-colors">博客</Link>
            <span className="text-text-muted">/</span>
            <span className="text-text-secondary">DeepSeek使用教程</span>
          </div>
        </div>
      </div>

      <div className="bg-surface-card border-b border-border-light">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-accent-warm/10 text-accent-warm rounded-full text-sm font-medium">使用教程</span>
              <span className="px-3 py-1 bg-accent-cool/10 text-accent-cool rounded-full text-sm font-medium">AI大模型</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6 leading-tight">DeepSeek使用教程</h1>
            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
              国产AI黑马DeepSeek完整使用指南：从注册到精通，深度对比ChatGPT，掌握提示词技巧
            </p>
            <div className="flex flex-wrap items-center gap-6 text-text-muted">
              <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>2024-02-28</span></div>
              <div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span>15 分钟阅读</span></div>
              <div className="flex items-center gap-2"><MessageCircle className="w-4 h-4" /><span>国产AI大模型</span></div>
            </div>
          </div>
        </div>
      </div>

      <article className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-surface-card rounded-xl p-6 border border-border-light mb-10">
            <h2 className="text-lg font-bold text-text-primary mb-4">目录</h2>
            <ul className="space-y-2">
              <li><a href="#what-is-deepseek" className="text-text-secondary hover:text-accent-warm transition-colors">1. DeepSeek介绍 - 国产AI黑马</a></li>
              <li><a href="#how-to-use" className="text-text-secondary hover:text-accent-warm transition-colors">2. 如何注册和使用DeepSeek</a></li>
              <li><a href="#vs-chatgpt" className="text-text-secondary hover:text-accent-warm transition-colors">3. DeepSeek vs ChatGPT对比</a></li>
              <li><a href="#pros-cons" className="text-text-secondary hover:text-accent-warm transition-colors">4. DeepSeek的优缺点</a></li>
              <li><a href="#tips" className="text-text-secondary hover:text-accent-warm transition-colors">5. 使用技巧和提示词示例</a></li>
              <li><a href="#faq" className="text-text-secondary hover:text-accent-warm transition-colors">6. 常见问题FAQ</a></li>
            </ul>
          </div>

          <section id="what-is-deepseek" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent-warm/10 flex items-center justify-center"><Bot className="w-5 h-5 text-accent-warm" /></div>
              <h2 className="text-2xl font-bold text-text-primary">DeepSeek介绍 - 国产AI黑马</h2>
            </div>
            <div className="prose prose-lg max-w-none text-text-secondary leading-relaxed">
              <p className="mb-4"><strong className="text-text-primary">DeepSeek（深度求索）</strong>是由杭州深度求索人工智能基础技术研究有限公司开发的AI大模型，于2024年1月正式发布。作为国内AI领域的新秀，DeepSeek凭借其出色的性能表现和极具竞争力的价格策略，迅速在全球AI市场掀起波澜，被誉为"国产AI黑马"。</p>
              <p className="mb-4">DeepSeek-R1是其最新的推理模型，在数学、代码、逻辑推理等任务上表现优异，甚至在某些基准测试上超越了OpenAI的GPT-4。更令人瞩目的是，DeepSeek-R1的训练成本仅为600万美元，远低于GPT-4等模型的数亿美元，实现了"以低成本追赶顶尖模型"的突破。</p>
              <div className="bg-accent-warm/5 border-l-4 border-accent-warm p-4 rounded-r-lg my-6">
                <p className="text-text-primary font-medium mb-2">DeepSeek核心亮点：</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2"><Zap className="w-5 h-5 text-accent-warm flex-shrink-0 mt-0.5" /><span><strong>超强推理能力</strong> - 在数学推理、代码生成、逻辑分析等任务上表现出色</span></li>
                  <li className="flex items-start gap-2"><Zap className="w-5 h-5 text-accent-warm flex-shrink-0 mt-0.5" /><span><strong>开源开放</strong> - 采用MIT许可证开源，开发者可自由使用和修改</span></li>
                  <li className="flex items-start gap-2"><Zap className="w-5 h-5 text-accent-warm flex-shrink-0 mt-0.5" /><span><strong>价格优势</strong> - API调用成本仅为GPT-4的1/10到1/20</span></li>
                  <li className="flex items-start gap-2"><Zap className="w-5 h-5 text-accent-warm flex-shrink-0 mt-0.5" /><span><strong>中文优化</strong> - 针对中文语境深度优化，中文表达更加自然流畅</span></li>
                </ul>
              </div>
            </div>
          </section>

          <section id="how-to-use" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent-cool/10 flex items-center justify-center"><Users className="w-5 h-5 text-accent-cool" /></div>
              <h2 className="text-2xl font-bold text-text-primary">如何注册和使用DeepSeek</h2>
            </div>
            <div className="space-y-6">
              <div className="bg-surface-card rounded-xl p-6 border border-border-light">
                <h3 className="text-lg font-bold text-text-primary mb-4">1. 访问官方网站</h3>
                <p className="text-text-secondary">打开浏览器，访问 DeepSeek 官方网站：<a href="https://chat.deepseek.com" target="_blank" rel="noopener noreferrer" className="text-accent-warm hover:underline">chat.deepseek.com</a></p>
              </div>
              <div className="bg-surface-card rounded-xl p-6 border border-border-light">
                <h3 className="text-lg font-bold text-text-primary mb-4">2. 注册账号</h3>
                <ul className="space-y-2 text-text-secondary">
                  <li>点击页面右上角的"登录"按钮</li>
                  <li>选择"注册"选项</li>
                  <li>支持手机号注册或邮箱注册</li>
                  <li>输入验证码完成验证</li>
                  <li>设置密码完成注册</li>
                </ul>
              </div>
              <div className="bg-surface-card rounded-xl p-6 border border-border-light">
                <h3 className="text-lg font-bold text-text-primary mb-4">3. 开始对话</h3>
                <p className="text-text-secondary mb-4">登录后，你将进入DeepSeek的对话界面：</p>
                <ul className="space-y-2 text-text-secondary">
                  <li>在底部输入框输入你的问题或需求</li>
                  <li>支持普通对话模式和深度思考模式（R1）</li>
                  <li>点击发送按钮或按 Enter 键提交</li>
                  <li>DeepSeek会快速生成回复</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="vs-chatgpt" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent-cool/10 flex items-center justify-center"><Award className="w-5 h-5 text-accent-cool" /></div>
              <h2 className="text-2xl font-bold text-text-primary">DeepSeek vs ChatGPT对比</h2>
            </div>
            <p className="text-text-secondary mb-6">作为当前AI领域的两大代表，DeepSeek和ChatGPT各有特色。以下是详细对比：</p>
            <div className="overflow-x-auto mb-8">
              <table className="w-full bg-surface-card rounded-xl border border-border-light overflow-hidden">
                <thead>
                  <tr className="bg-surface-base">
                    <th className="px-6 py-4 text-left text-text-primary font-bold">对比项</th>
                    <th className="px-6 py-4 text-left text-accent-warm font-bold">DeepSeek</th>
                    <th className="px-6 py-4 text-left text-accent-cool font-bold">ChatGPT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light">
                  <tr><td className="px-6 py-4 text-text-secondary font-medium">开发公司</td><td className="px-6 py-4 text-text-secondary">深度求索（中国）</td><td className="px-6 py-4 text-text-secondary">OpenAI（美国）</td></tr>
                  <tr><td className="px-6 py-4 text-text-secondary font-medium">最新模型</td><td className="px-6 py-4 text-text-secondary">DeepSeek-R1 / V3</td><td className="px-6 py-4 text-text-secondary">GPT-4o / o1</td></tr>
                  <tr><td className="px-6 py-4 text-text-secondary font-medium">推理能力</td><td className="px-6 py-4 text-green-500">数学/代码顶尖</td><td className="px-6 py-4 text-green-500">综合能力强</td></tr>
                  <tr><td className="px-6 py-4 text-text-secondary font-medium">中文表现</td><td className="px-6 py-4 text-green-500">中文优化好</td><td className="px-6 py-4 text-text-secondary">良好</td></tr>
                  <tr><td className="px-6 py-4 text-text-secondary font-medium">使用成本</td><td className="px-6 py-4 text-green-500 font-medium">免费（个人版）</td><td className="px-6 py-4 text-text-secondary">GPT-4需付费</td></tr>
                  <tr><td className="px-6 py-4 text-text-secondary font-medium">API价格</td><td className="px-6 py-4 text-green-500 font-medium">极低</td><td className="px-6 py-4 text-text-secondary">较高</td></tr>
                  <tr><td className="px-6 py-4 text-text-secondary font-medium">开源情况</td><td className="px-6 py-4 text-green-500">开源</td><td className="px-6 py-4 text-red-400">闭源</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="pros-cons" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent-warm/10 flex items-center justify-center"><Zap className="w-5 h-5 text-accent-warm" /></div>
              <h2 className="text-2xl font-bold text-text-primary">DeepSeek的优缺点</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-green-600">优点</h3>
                <div className="space-y-3">
                  <div className="bg-surface-card p-4 rounded-lg border border-border-light">
                    <p className="font-medium text-text-primary mb-1">推理能力突出</p>
                    <p className="text-sm text-text-secondary">在数学、编程、逻辑推理等任务上表现优异</p>
                  </div>
                  <div className="bg-surface-card p-4 rounded-lg border border-border-light">
                    <p className="font-medium text-text-primary mb-1">极致性价比</p>
                    <p className="text-sm text-text-secondary">个人用户免费使用，API价格极低</p>
                  </div>
                  <div className="bg-surface-card p-4 rounded-lg border border-border-light">
                    <p className="font-medium text-text-primary mb-1">中文优化</p>
                    <p className="text-sm text-text-secondary">针对中文语境深度优化</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-red-500">缺点</h3>
                <div className="space-y-3">
                  <div className="bg-surface-card p-4 rounded-lg border border-border-light">
                    <p className="font-medium text-text-primary mb-1">创意写作稍逊</p>
                    <p className="text-sm text-text-secondary">在创意写作、文学性表达方面略逊于GPT-4</p>
                  </div>
                  <div className="bg-surface-card p-4 rounded-lg border border-border-light">
                    <p className="font-medium text-text-primary mb-1">功能相对单一</p>
                    <p className="text-sm text-text-secondary">暂不支持图片生成、语音对话等多模态功能</p>
                  </div>
                  <div className="bg-surface-card p-4 rounded-lg border border-border-light">
                    <p className="font-medium text-text-primary mb-1">生态待完善</p>
                    <p className="text-sm text-text-secondary">插件生态和第三方集成还不如ChatGPT丰富</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="tips" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent-cool/10 flex items-center justify-center"><Zap className="w-5 h-5 text-accent-cool" /></div>
              <h2 className="text-2xl font-bold text-text-primary">使用技巧和提示词示例</h2>
            </div>
            <div className="space-y-6">
              <div className="bg-accent-warm/5 border border-accent-warm/20 rounded-xl p-6">
                <h3 className="text-lg font-bold text-text-primary mb-4">高效提示词技巧</h3>
                <ul className="space-y-3 text-text-secondary">
                  <li><strong className="text-text-primary">1. 明确任务目标</strong> - 清晰说明你想要什么</li>
                  <li><strong className="text-text-primary">2. 提供背景信息</strong> - 给出足够的上下文</li>
                  <li><strong className="text-text-primary">3. 指定输出格式</strong> - 告诉DeepSeek你希望以什么形式呈现结果</li>
                  <li><strong className="text-text-primary">4. 分步拆解复杂任务</strong> - 复杂问题拆成多个小问题逐个解决</li>
                  <li><strong className="text-text-primary">5. 善用R1模式</strong> - 推理任务一定要开启R1深度思考模式</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="faq" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent-warm/10 flex items-center justify-center"><MessageCircle className="w-5 h-5 text-accent-warm" /></div>
              <h2 className="text-2xl font-bold text-text-primary">常见问题FAQ</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-surface-card rounded-xl p-6 border border-border-light">
                <h3 className="font-bold text-text-primary mb-2">DeepSeek是免费的吗？</h3>
                <p className="text-text-secondary">是的，DeepSeek目前对个人用户完全免费，可以无限制使用。</p>
              </div>
              <div className="bg-surface-card rounded-xl p-6 border border-border-light">
                <h3 className="font-bold text-text-primary mb-2">DeepSeek和ChatGPT哪个更好？</h3>
                <p className="text-text-secondary">两者各有优势。DeepSeek在数学推理、代码生成方面更强，且免费；ChatGPT在创意写作、多模态任务上更全面。</p>
              </div>
              <div className="bg-surface-card rounded-xl p-6 border border-border-light">
                <h3 className="font-bold text-text-primary mb-2">DeepSeek支持哪些语言？</h3>
                <p className="text-text-secondary">DeepSeek支持多种语言，但对中文有特别优化，中文表达更加自然流畅。</p>
              </div>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
