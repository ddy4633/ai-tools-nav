import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import ToolPrimaryCta from '@/components/ui/ToolPrimaryCta';
import { toolsData } from '@/lib/content/tools-data';
import { buildSiteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: '2026年最值得关注的10个AI工具 - 从Grok 3到Manus',
  description: '盘点2026年最热门的AI工具：Grok 3、Qwen 2.5-Max、Kimi k1.5、Windsurf、Bolt.new、Kling AI等，深度解析它们的特点和适用场景。',
  keywords: ['AI工具推荐', '2026 AI工具', 'Grok 3', 'Manus', 'Kling AI', 'AI趋势'],
  alternates: {
    canonical: buildSiteUrl('/blog/top-ai-tools-2026'),
  },
  openGraph: {
    title: '2026年最值得关注的10个AI工具',
    description: '从Grok 3到Manus，盘点今年最热门的AI工具',
    url: buildSiteUrl('/blog/top-ai-tools-2026'),
    type: 'article',
    publishedTime: '2026-03-03',
  },
};

type BlogTool = {
  id: string;
  name: string;
  category: string;
  highlight: string;
  description: string;
  website?: string;
  affiliate_url?: string | null;
  affiliateUrl?: string | null;
};

const indexedToolIds = new Set(toolsData.map((tool) => tool.id));
const toolLinkIndex = new Map(
  toolsData.map((tool) => [
    tool.id,
    {
      website: tool.website,
      affiliate_url: tool.affiliate_url,
      affiliateUrl: tool.affiliateUrl,
    },
  ]),
);

function getToolDetailHref(id: string, name: string) {
  if (indexedToolIds.has(id)) {
    return `/tools/${id}`;
  }

  return `/tools?search=${encodeURIComponent(name)}`;
}

const tools: BlogTool[] = [
  {
    id: 'grok3',
    name: 'Grok 3',
    category: 'AI聊天',
    highlight: '实时X数据访问',
    description: '马斯克 xAI 的旗舰模型，能实时获取 X 平台数据，对热点事件的回答总是最新最准。',
  },
  {
    id: 'qwen25max',
    name: 'Qwen 2.5-Max',
    category: 'AI聊天',
    highlight: '中文理解顶尖',
    description: '阿里通义千问最强版本，中文语境理解自然，长文本处理能力强。',
  },
  {
    id: 'kimi-k15',
    name: 'Kimi k1.5',
    category: 'AI聊天',
    highlight: '200万字上下文',
    description: '月之暗面最新模型，超长上下文窗口意味着可以处理整本技术手册。',
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    category: 'AI编程',
    highlight: 'Cascade 智能体',
    description: 'Codeium 推出的 AI IDE，Cascade 能自动执行多步骤任务，实现 AI 代理编程。',
  },
  {
    id: 'bolt-new',
    name: 'Bolt.new',
    category: 'AI编程',
    highlight: '浏览器全栈开发',
    description: 'StackBlitz 的革命性工具，在浏览器中用自然语言就能生成可部署的全栈应用。',
  },
  {
    id: 'v0-dev',
    name: 'v0.dev',
    category: 'AI编程',
    highlight: 'AI UI 生成',
    description: 'Vercel 的 AI 界面生成器，描述 UI 需求，几秒就能得到可直接使用的 React 代码。',
  },
  {
    id: 'recraft-v3',
    name: 'Recraft V3',
    category: '设计助手',
    highlight: '专业 AI 设计',
    description: '专为设计师打造的 AI 工具，矢量编辑 + AI 生成，支持 SVG 输出和品牌套件。',
  },
  {
    id: 'kling-ai',
    name: 'Kling AI',
    category: 'AI视频',
    highlight: '国产视频生成最强',
    description: '快手可灵 AI，物理模拟和运动理解顶尖，被誉为“国产 Sora”。',
  },
  {
    id: 'udio',
    name: 'Udio',
    category: 'AI音频',
    highlight: 'Suno 最强竞品',
    description: 'AI 音乐生成工具，生成的音乐更有“人味”，风格选择更丰富。',
  },
  {
    id: 'manus',
    name: 'Manus',
    category: '效率工具',
    highlight: '通用 AI Agent',
    description: '能自主完成复杂任务的 AI 代理，给它一个目标，它能自己规划步骤并完成。',
  },
].map((tool) => ({
  ...(toolLinkIndex.get(tool.id) ?? {}),
  ...tool,
}));

export default function TopAiTools2026Page() {
  const publishDate = '2026-03-03';
  const readTime = '12 分钟';

  return (
    <article className="min-h-screen bg-bg-primary">
      <div className="relative overflow-hidden border-b border-border-light">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-purple/5" />
        <div className="container mx-auto px-4 py-16 sm:py-24 relative">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-text-muted hover:text-accent-cyan transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              返回博客
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-accent-cyan/10 text-accent-cyan rounded-full text-sm font-medium">
                工具推荐
              </span>
              <span className="flex items-center gap-1 text-text-muted text-sm">
                <Calendar className="w-4 h-4" />
                {publishDate}
              </span>
              <span className="flex items-center gap-1 text-text-muted text-sm">
                <Clock className="w-4 h-4" />
                {readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6 leading-tight">
              2026年最值得关注的
              <span className="text-gradient-cyber">10个AI工具</span>
            </h1>

            <p className="text-lg sm:text-xl text-text-secondary leading-relaxed">
              从 Grok 3 到 Manus，盘点今年最热门的 AI 工具。它们代表了大模型、编程助手、视频生成、AI Agent 等领域的最新进展，正在重新定义我们与 AI 协作的方式。
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-text-secondary leading-relaxed">
              2026年，AI工具的竞争进入了新阶段。大语言模型不再满足于问答，开始向 Agent 进化；编程助手从代码补全发展到能独立完成项目；视频生成从玩具变成了生产力工具。本文精选了10个最具代表性的 AI 工具，帮助你了解这个快速变化的领域。
            </p>
          </div>

          <div className="rounded-2xl border border-accent-cyan/20 bg-accent-cyan/5 px-5 py-4 mb-8">
            <p className="text-sm text-text-secondary leading-relaxed">
              页面中的“访问官网 / 合作链接”按钮已接入统一埋点；若某个工具已配置合作链接，按钮会优先跳转合作链接，方便后续统计该榜单页的变现效果。
            </p>
          </div>

          <div className="space-y-8 mb-12">
            {tools.map((tool, index) => (
              <div
                key={tool.id}
                className="group bg-surface-card rounded-2xl p-6 sm:p-8 border border-border-light hover:border-accent-cyan/30 transition-all hover:shadow-lg"
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-accent-cyan/10 text-accent-cyan rounded-xl font-mono font-bold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h2 className="text-xl sm:text-2xl font-bold text-text-primary group-hover:text-accent-cyan transition-colors">
                        {tool.name}
                      </h2>
                      <span className="px-2 py-0.5 bg-surface-base text-text-muted rounded text-xs">
                        {tool.category}
                      </span>
                    </div>
                    <p className="text-accent-cyan font-medium mb-2">{tool.highlight}</p>
                  </div>
                </div>
                <p className="text-text-secondary leading-relaxed pl-14">
                  {tool.description}
                </p>
                <div className="pl-14 mt-5 flex flex-col sm:flex-row gap-3">
                  <ToolPrimaryCta
                    tool={tool}
                    placement="blog_top_2026_primary_cta"
                    affiliateLabel="查看合作链接"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-accent-cyan text-white rounded-xl hover:bg-accent-cyan/90 transition-colors font-medium"
                  />
                  <Link
                    href={getToolDetailHref(tool.id, tool.name)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-surface-card border border-border-medium text-text-primary rounded-xl hover:border-accent-cyan hover:text-accent-cyan transition-colors font-medium"
                  >
                    查看详情
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-accent-purple/5 to-accent-cyan/5 rounded-2xl p-6 sm:p-8 border border-accent-purple/20 mb-12">
            <h2 className="text-2xl font-bold text-text-primary mb-6">分类解读</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">AI聊天：向 Agent 进化</h3>
                <p className="text-text-secondary">
                  Grok 3、Qwen 2.5-Max、Kimi k1.5代表了三个方向：实时信息、中文优化、超长上下文。它们不再只是回答问题，而是开始主动规划和执行任务。
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">AI编程：从辅助到代理</h3>
                <p className="text-text-secondary">
                  Windsurf的 Cascade、Bolt.new 的全栈生成、v0.dev 的 UI 生成，标志着编程助手从“帮你写代码”进化到“帮你做项目”。
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">AI视频：国产崛起</h3>
                <p className="text-text-secondary">
                  Kling AI 的出现证明，在视频生成这个领域，国产模型已经可以达到国际顶尖水平，甚至在某些方面有所超越。
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">AI Agent：元年开启</h3>
                <p className="text-text-secondary">
                  Manus 代表了2026年最重要的趋势——AI 从工具变成代理。它能自主规划、执行、交付，这可能是通往 AGI 的关键一步。
                </p>
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="text-2xl font-bold text-text-primary mb-4">总结</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              2026年的 AI 工具呈现出几个明显趋势：
            </p>
            <ul className="space-y-2 text-text-secondary mb-6">
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan mt-1">•</span>
                <span><strong className="text-text-primary">Agent化</strong>：AI从被动响应转向主动执行</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan mt-1">•</span>
                <span><strong className="text-text-primary">专业化</strong>：工具开始针对特定场景深度优化</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan mt-1">•</span>
                <span><strong className="text-text-primary">国产崛起</strong>：中国在多个领域达到国际领先水平</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan mt-1">•</span>
                <span><strong className="text-text-primary">易用性</strong>：技术门槛持续降低，普通用户也能快速上手</span>
              </li>
            </ul>
            <p className="text-text-secondary leading-relaxed">
              对于普通用户，我的建议是：先选择一个 AI 聊天工具作为日常使用，然后根据自己的工作或兴趣，尝试 1-2 个专业领域的工具。不必追求面面俱到，找到能真正提升效率的工具才是目的。
            </p>
          </div>

          <div className="bg-gradient-to-br from-accent-cyan/10 to-accent-purple/10 rounded-2xl p-8 border border-accent-cyan/20 text-center">
            <h3 className="text-xl font-bold text-text-primary mb-3">
              探索更多AI工具
            </h3>
            <p className="text-text-secondary mb-6">
              在我们的工具库中发现更多精选 AI 工具，或者提交你的产品申请收录与赞助合作。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tools"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent-cyan text-white rounded-xl hover:bg-accent-cyan/90 transition-colors font-medium"
              >
                浏览全部工具
              </Link>
              <Link
                href="/trending"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-surface-card border border-border-medium text-text-primary rounded-xl hover:border-accent-cyan hover:text-accent-cyan transition-colors font-medium"
              >
                查看热门趋势
              </Link>
              <Link
                href="/submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-surface-card border border-border-medium text-text-primary rounded-xl hover:border-accent-cyan hover:text-accent-cyan transition-colors font-medium"
              >
                申请收录 / 赞助
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
