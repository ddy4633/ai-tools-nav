import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BarChart3, Layers3, Sparkles, Target, TrendingUp } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import ToolLogo from '@/components/ui/ToolLogo';
import ToolPrimaryCta from '@/components/ui/ToolPrimaryCta';
import { getToolCardData, getToolDetailHref } from '@/lib/content/tool-directory';
import { buildSiteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: '2026 年最值得关注的 10 个 AI 工具',
  description: '从对话模型、AI 编程到视频生成和 Agent，一页看懂 2026 年最值得优先关注的 10 个 AI 工具及其背后的趋势。',
  keywords: ['2026 AI 工具', 'AI 工具推荐', 'AI 榜单', 'Manus', 'Grok 3', 'Kling AI', 'Windsurf'],
  alternates: {
    canonical: buildSiteUrl('/blog/top-ai-tools-2026'),
  },
  openGraph: {
    title: '2026 年最值得关注的 10 个 AI 工具',
    description: '不是简单列名单，而是帮你看懂今年最值得先试的 AI 工具和趋势。',
    url: buildSiteUrl('/blog/top-ai-tools-2026'),
    type: 'article',
    publishedTime: '2026-03-03',
  },
};

const publishDate = '2026-03-03';
const readTime = '12 分钟';

const readingNotes = [
  {
    title: '先装主力，不求装全',
    description: '这篇榜单更适合帮你确定第一批值得深试的工具，而不是做收藏癖清单。',
  },
  {
    title: '看趋势，也看适合谁',
    description: '真正有价值的不是“哪个最火”，而是这波变化会先影响谁、影响哪段工作流。',
  },
  {
    title: '榜单的终点是行动',
    description: '每个工具都应该把你继续送往详情页、官网和下一步决策，而不是停在文章里。',
  },
];

type BlogTool = {
  id: string;
  name: string;
  category: string;
  highlight: string;
  description: string;
  whyNow: string;
};

const toolSeed: BlogTool[] = [
  {
    id: 'grok3',
    name: 'Grok 3',
    category: '对话模型',
    highlight: '把实时信息流直接带进问答',
    description: '它让“今天刚发生的事”更容易直接进入问答链路，是热点、舆情和实时讨论的代表型工具。',
    whyNow: '适合做资讯判断、热点追踪和实时话题响应。',
  },
  {
    id: 'qwen25max',
    name: 'Qwen 2.5-Max',
    category: '对话模型',
    highlight: '中文工作流里的硬实力选手',
    description: '更像一块企业级底座，适合代码、文档、业务分析和偏系统化的任务。',
    whyNow: '适合中文团队把 AI 更深地接进业务流程。',
  },
  {
    id: 'kimi-k15',
    name: 'Kimi k1.5',
    category: '对话模型',
    highlight: '长资料工作流的效率工具',
    description: '它代表的是长上下文能力开始真正影响工作流，而不只是停留在参数展示。',
    whyNow: '适合研究、资料整理、长文档阅读与总结。',
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    category: 'AI 编程',
    highlight: '从补全走向执行',
    description: '它的重要性不只在写代码，而是开始帮开发者接住“理解项目并执行多步任务”的工作。',
    whyNow: '适合追求代理式开发体验的团队和个人开发者。',
  },
  {
    id: 'bolt-new',
    name: 'Bolt.new',
    category: 'AI 编程',
    highlight: '把原型和全栈生成推到浏览器里',
    description: '它把“描述需求就生成应用”的体验做得更直接，适合产品验证和快速起盘。',
    whyNow: '适合创业原型、MVP 验证和快节奏试错。',
  },
  {
    id: 'v0-dev',
    name: 'v0.dev',
    category: 'AI 编程',
    highlight: '前端生成已经足够接近生产',
    description: '它代表前端工作流的一个新阶段：不是只做灵感草图，而是开始接近可交付代码。',
    whyNow: '适合前端团队、产品设计协同和界面原型加速。',
  },
  {
    id: 'recraft-v3',
    name: 'Recraft V3',
    category: '设计工具',
    highlight: '设计从生图进入品牌表达',
    description: '不只是做一张图，而是开始服务风格控制、矢量输出和品牌表达。',
    whyNow: '适合设计团队和品牌视觉工作流。',
  },
  {
    id: 'kling-ai',
    name: 'Kling AI',
    category: '视频生成',
    highlight: '视频生成开始具备真正的传播潜力',
    description: '它代表视频生成从“惊艳演示”走向“可以拿去做传播素材”的阶段。',
    whyNow: '适合内容团队、品牌传播和短视频试验。',
  },
  {
    id: 'udio',
    name: 'Udio',
    category: '音频生成',
    highlight: '音乐生成开始形成稳定审美',
    description: '这类工具的重要性在于，它们让更多团队开始把声音和配乐也纳入 AI 内容生产链。',
    whyNow: '适合做播客、短视频配乐和创作者实验。',
  },
  {
    id: 'manus',
    name: 'Manus',
    category: 'AI Agent',
    highlight: 'Agent 从概念走向产品感',
    description: '它的重要性不只是功能新，而是让更多人第一次感受到“把目标交给 AI 去执行”的产品体验。',
    whyNow: '适合所有在关注 Agent 化工作流的人。',
  },
];

const tools = toolSeed.map((tool) => ({
  ...tool,
  ...getToolCardData(tool),
}));

const trendSignals = [
  {
    title: 'AI 从回答问题，走向替你执行',
    icon: TrendingUp,
    description: '今年最关键的变化，不是模型更会说，而是越来越多工具开始承担执行链路。',
  },
  {
    title: 'AI 编程从补全升级为项目协作',
    icon: Layers3,
    description: 'Windsurf、Bolt.new、v0.dev 代表的是不同层级的“AI 参与开发”。',
  },
  {
    title: '内容生成从单次惊艳走向稳定产出',
    icon: BarChart3,
    description: '图像、视频、音频工具开始被放进真实传播和商业内容生产流程里。',
  },
  {
    title: '榜单价值从介绍工具转向帮人决策',
    icon: Target,
    description: '今天做工具榜单，重点已经不是介绍它是什么，而是它适合谁、为什么现在值得试。',
  },
];

const roleRoutes = [
  {
    title: '如果你是开发者',
    description: '先试 Windsurf、Bolt.new、v0.dev，再决定哪一个接主力工作流。',
  },
  {
    title: '如果你做内容和传播',
    description: '先试 Kling AI、Udio，再配一个稳定的对话模型做脚本和信息整理。',
  },
  {
    title: '如果你偏产品与设计',
    description: 'v0.dev、Recraft V3、Kling AI 更适合帮助你快速产出可展示版本。',
  },
  {
    title: '如果你关心下一代 AI 形态',
    description: '先看 Manus，再回头看今年所有工具为什么都在往 Agent 方向靠拢。',
  },
];

export default function TopAiTools2026Page() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <PageHero
        eyebrow="年度榜单"
        title="2026 年最值得关注的"
        highlight="10 个 AI 工具"
        description="这不是一份为了凑热闹的热词列表，而是一份决策榜单。它更在意哪些工具真的开始改变工作流，以及这些变化分别落在哪一类人身上。"
        metrics={[
          {
            value: `${tools.length}`,
            label: '重点工具',
            hint: '覆盖对话模型、AI 编程、设计、视频、音频和 Agent。',
          },
          {
            value: `${trendSignals.length} 个趋势信号`,
            label: '这份榜单真正想说明的事',
            hint: '榜单不是终点，趋势判断才是。',
          },
          {
            value: '详情页 + 官网入口',
            label: '下一步动作',
            hint: '每个工具都应该通向更具体的试用和判断。',
          },
        ]}
        actions={[
          { href: '/trending', label: '去看热门榜单', tone: 'secondary' },
          { href: '/tools', label: '回到工具库继续筛选', tone: 'primary' },
        ]}
        aside={
          <div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Sparkles className="h-4 w-4 text-accent-yellow" />
              阅读这页之前
            </div>
            <div className="mt-5 space-y-3">
              {readingNotes.map((item) => (
                <div key={item.title} className="rounded-[22px] border border-white/8 bg-black/10 p-4">
                  <p className="text-sm font-medium text-text-primary">{item.title}</p>
                  <p className="mt-3 text-sm leading-7 text-text-secondary">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        }
      >
        <div className="flex flex-wrap gap-2 text-sm text-text-muted">
          {[`更新于 ${publishDate}`, readTime, '适合作为全年工具入口'].map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-black/10 px-3 py-1.5">
              {item}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading
          eyebrow="年度清单"
          title="这 10 个工具，分别代表着什么变化"
          description="别只看排名。每张卡片都在回答一个更实际的问题：它为什么是今年值得你注意的那一个。"
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {tools.map((tool, index) => (
            <article key={tool.id} className="rounded-[30px] border border-white/10 bg-white/5 p-6 transition hover:border-white/16">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/10 text-sm font-semibold text-text-primary">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <ToolLogo
                      name={tool.name}
                      icon={tool.icon}
                      size={56}
                      wrapperClassName="h-14 w-14 rounded-[18px] border border-white/10 bg-black/20"
                      imageClassName="h-10 w-10"
                      textClassName="text-lg text-text-primary"
                    />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-2xl font-semibold text-text-primary">{tool.name}</h2>
                      <span className="rounded-full border border-white/10 bg-black/10 px-2.5 py-1 text-xs text-text-secondary">
                        {tool.category}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-accent-cyan">{tool.highlight}</p>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-text-secondary">{tool.description}</p>
              <div className="mt-5 rounded-[22px] border border-white/8 bg-black/10 p-4 text-sm leading-7 text-text-secondary">
                <strong className="text-text-primary">为什么值得现在关注：</strong>
                {tool.whyNow}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <ToolPrimaryCta
                  tool={tool}
                  placement="blog_top_2026_primary_cta"
                  affiliateLabel="查看合作链接"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
                />
                <Link
                  href={getToolDetailHref(tool.id, tool.name)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
                >
                  查看详情
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeading
            eyebrow="趋势拆解"
            title="这份榜单背后的 4 个年度信号"
            description="如果你只记住工具名字，很快就会过时；如果你记住这几个信号，就知道下一步该关注什么。"
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {trendSignals.map((signal) => (
              <article key={signal.title} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/10">
                  <signal.icon className="h-5 w-5 text-accent-yellow" />
                </div>
                <h2 className="mt-5 text-lg font-semibold text-text-primary">{signal.title}</h2>
                <p className="mt-3 text-sm leading-7 text-text-secondary">{signal.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeading
            eyebrow="试用顺序"
            title="按你的角色来决定先试哪一类"
            description="榜单不是让所有人照单全收，而是帮不同角色更快找到自己的第一批主力工具。"
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {roleRoutes.map((route) => (
              <article key={route.title} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <h2 className="text-lg font-semibold text-text-primary">{route.title}</h2>
                <p className="mt-3 text-sm leading-7 text-text-secondary">{route.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] p-8 text-center shadow-[0_28px_70px_rgba(0,0,0,0.25)]">
            <h2 className="text-3xl font-semibold text-text-primary">榜单看完，下一步应该去做真实试用</h2>
            <p className="mt-4 text-base leading-8 text-text-secondary">
              你可以去工具详情页看更具体的推荐理由，也可以直接回到工具库按任务、分类和价格继续筛选。
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
              >
                浏览全部工具
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/trending"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
              >
                看热门趋势
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/submit"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
              >
                申请收录或合作
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
