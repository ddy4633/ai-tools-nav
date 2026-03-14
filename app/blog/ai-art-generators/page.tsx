import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  DollarSign,
  Image as ImageIcon,
  Paintbrush,
  Sparkles,
  Star,
  XCircle,
} from 'lucide-react';
import ToolPrimaryCta from '@/components/ui/ToolPrimaryCta';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import ToolLogo from '@/components/ui/ToolLogo';
import { getToolCardData, getToolDetailHref } from '@/lib/content/tool-directory';
import { buildSiteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'AI 绘画网站推荐 - 2026 值得先试的图像生成工具',
  description: '从 Midjourney、Stable Diffusion 到 DALL-E 3，按预算、出图质量和上手难度拆解 2026 年值得先试的 AI 绘画工具。',
  keywords: ['AI绘画', 'AI图像生成', 'Midjourney', 'Stable Diffusion', 'DALL-E', 'AI画画'],
  alternates: {
    canonical: buildSiteUrl('/blog/ai-art-generators'),
  },
  openGraph: {
    title: 'AI 绘画网站推荐 - 2026 值得先试的图像生成工具',
    description: '按预算、出图质量和上手难度拆解值得先试的 AI 绘画工具。',
    url: buildSiteUrl('/blog/ai-art-generators'),
    type: 'article',
  },
};

const pricingStyles: Record<string, string> = {
  免费: 'border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan',
  免费试用: 'border-accent-yellow/30 bg-accent-yellow/10 text-accent-yellow',
  付费: 'border-accent-pink/30 bg-accent-pink/10 text-accent-pink',
};

const aiArtTools = [
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: '如果你追求第一眼就能打动人的风格感和完成度，它仍然是最稳的入口之一。',
    pricing: '付费',
    priceDetail: '$10/月起，更适合专业创作',
    rating: 4.9,
    features: ['高完成度', '风格强', '社区氛围成熟', '概念图友好'],
    pros: ['成片率高', '细节和氛围感突出', '风格成熟'],
    cons: ['没有免费层', '对新手不算最低门槛', '依赖 Discord 工作流'],
    bestFor: '专业设计师、品牌视觉、概念设计和高要求商业出图',
    website: 'https://www.midjourney.com',
  },
  {
    id: 'stable-diffusion',
    name: 'Stable Diffusion',
    description: '更像一套能力底座，适合要极致控制、低成本和本地部署的人。',
    pricing: '免费',
    priceDetail: '开源免费，但学习成本更高',
    rating: 4.7,
    features: ['开源可控', '本地部署', '模型生态丰富', '扩展能力强'],
    pros: ['零授权成本', '可玩性高', '适合批量和深定制'],
    cons: ['配置门槛高', '硬件要求高', '不适合纯轻量用户'],
    bestFor: '技术用户、工作室、本地部署和深度控制场景',
    website: 'https://stability.ai',
  },
  {
    id: 'dall-e-3',
    name: 'DALL-E 3',
    description: '更适合想直接用自然语言描述需求、快速出图的人，理解提示词更省心。',
    pricing: '付费',
    priceDetail: '通常跟随 ChatGPT 付费能力使用',
    rating: 4.6,
    features: ['提示词理解强', '对话式生成', '中文友好', '上手简单'],
    pros: ['易用度高', '理解需求更直观', '适合快速原型'],
    cons: ['风格上限不如 Midjourney', '控制感偏弱'],
    bestFor: '产品经理、内容创作者、需要快速试图的人',
    website: 'https://openai.com/dall-e-3',
  },
  {
    id: 'leonardo',
    name: 'Leonardo.AI',
    description: '更适合游戏、角色和素材制作，兼顾免费试用和专业模型选择。',
    pricing: '免费试用',
    priceDetail: '有日常试用额度，适合先试后买',
    rating: 4.5,
    features: ['免费额度', '模型训练', '游戏素材友好', '控制项丰富'],
    pros: ['试错成本低', '适合角色和素材', '专业模型多'],
    cons: ['高级能力需付费', '对新手仍有选择成本'],
    bestFor: '游戏开发、角色设定、素材生产与概念设计',
    website: 'https://leonardo.ai',
  },
  {
    id: 'ideogram',
    name: 'Ideogram',
    description: '在“图片里带可读文字”这件事上更稳定，适合海报、封面和社媒图。',
    pricing: '免费',
    priceDetail: '基础版可直接开始',
    rating: 4.4,
    features: ['文字渲染', '海报设计', 'Logo 场景', '社媒素材'],
    pros: ['文字效果明显更稳', '做平面内容很方便', '新手友好'],
    cons: ['纯艺术风格上限一般', '免费版仍有限制'],
    bestFor: '海报、封面、社媒图和带字图片内容',
    website: 'https://ideogram.ai',
  },
  {
    id: 'adobe-firefly',
    name: 'Adobe Firefly',
    description: '适合已经在 Adobe 工作流里的人，生成、编辑和交付衔接更顺。',
    pricing: '免费试用',
    priceDetail: '更适合已在 Adobe 生态里的人',
    rating: 4.3,
    features: ['Adobe 集成', '商业安全', '生成式填充', '设计链路顺'],
    pros: ['商业使用更安心', '与现有设计工具衔接自然'],
    cons: ['离开 Adobe 生态价值下降', '免费额度有限'],
    bestFor: 'Adobe 用户、品牌设计团队、专业设计流程',
    website: 'https://www.adobe.com/products/firefly.html',
  },
  {
    id: 'bing-image-creator',
    name: 'Bing Image Creator',
    description: '最适合零门槛试用，尤其是第一次接触 AI 出图的人。',
    pricing: '免费',
    priceDetail: '完全免费，适合快速尝试',
    rating: 4.2,
    features: ['完全免费', '上手简单', '速度快', '轻量试用'],
    pros: ['零成本', '不必复杂学习', '适合轻需求'],
    cons: ['上限有限', '精细控制不足'],
    bestFor: '初学者、临时需求、快速试图',
    website: 'https://www.bing.com/create',
  },
  {
    id: 'playground',
    name: 'Playground AI',
    description: '更适合预算有限又想多试几个模型的人，适合把试错成本拉低。',
    pricing: '免费试用',
    priceDetail: '免费额度较多，适合跑大量实验',
    rating: 4.1,
    features: ['多模型支持', '免费额度多', '图层编辑', '实验成本低'],
    pros: ['试验空间大', '适合跑风格对比', '新手也能慢慢摸索'],
    cons: ['高峰期表现波动', '高阶能力仍要付费'],
    bestFor: '预算有限用户、多模型尝试、风格试验',
    website: 'https://playgroundai.com',
  },
];

const quickDecisions = [
  {
    title: '想要第一眼就惊艳',
    description: '先看 Midjourney，它更适合成片感和视觉冲击力优先的需求。',
  },
  {
    title: '想把成本压低',
    description: '先看 Stable Diffusion 或 Bing Image Creator，视你的技术能力决定。',
  },
  {
    title: '想快速上手出图',
    description: 'DALL-E 3 和 Ideogram 的理解成本更低，更适合快速试图。',
  },
];

const scenarioSuggestions = [
  {
    title: '预算有限',
    icon: DollarSign,
    description: '优先考虑 Stable Diffusion、Bing Image Creator 和 Playground AI。',
  },
  {
    title: '专业创作',
    icon: Paintbrush,
    description: '优先看 Midjourney 和 Leonardo.AI，出图上限更高。',
  },
  {
    title: '快速上手',
    icon: ImageIcon,
    description: '优先看 DALL-E 3 和 Ideogram，理解成本更低。',
  },
];

const aiArtToolCards = aiArtTools.map((tool) => ({
  ...tool,
  ...getToolCardData(tool),
}));

export default function AIArtGeneratorsPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <PageHero
        eyebrow="AI 绘画专题"
        title="AI 绘画工具"
        highlight="先看出图目标，再看模型名字。"
        description="选出图工具最怕一上来就被名字和风格带偏。这个页面把工具拆成三类：追求成片感、追求低成本、追求低门槛。先看目标，再看平台。"
        metrics={[
          { value: `${aiArtTools.length}`, label: '重点工具', hint: '覆盖高质量出图、免费试用和低门槛试图三类需求。' },
          { value: '质量 / 成本 / 上手难度', label: '核心判断维度', hint: '比单看热度更接近真实决策。' },
          { value: '对比表 + 场景建议', label: '内容结构', hint: '帮助你快速排除不适合自己的工具。' },
        ]}
        actions={[
          { href: '/tools?category=image', label: '查看全部图像工具', tone: 'secondary' },
          { href: '/advertise', label: '做专题合作', tone: 'primary' },
        ]}
        aside={
          <div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Sparkles className="h-4 w-4 text-accent-yellow" />
              先看结论
            </div>
            <div className="mt-5 space-y-3">
              {quickDecisions.map((item) => (
                <div key={item.title} className="rounded-[22px] border border-white/8 bg-black/10 p-4">
                  <p className="text-sm font-medium text-text-primary">{item.title}</p>
                  <p className="mt-3 text-sm leading-7 text-text-secondary">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        }
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading
          eyebrow="工具清单"
          title="值得先试的 AI 绘画工具"
          description="每张卡片都围绕同一个问题：画得够不够好、上手难不难、值不值得你把工作流迁进去。"
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {aiArtToolCards.map((tool) => (
            <article key={tool.id} className="rounded-[30px] border border-white/10 bg-white/5 p-6 transition hover:border-white/16">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <ToolLogo
                    name={tool.name}
                    icon={tool.icon}
                    size={56}
                    wrapperClassName="h-14 w-14 rounded-[18px] border border-white/10 bg-black/20"
                    imageClassName="h-10 w-10"
                    textClassName="text-lg text-text-primary"
                  />
                  <div>
                    <h2 className="text-2xl font-semibold text-text-primary">{tool.name}</h2>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className={`rounded-full border px-2.5 py-1 text-xs ${pricingStyles[tool.pricing] ?? pricingStyles['免费试用']}`}>
                        {tool.pricing}
                      </span>
                      <span className="text-xs text-text-muted">{tool.priceDetail}</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-sm text-text-primary">
                  {tool.rating.toFixed(1)}
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-text-secondary">{tool.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {tool.features.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs text-text-secondary"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-[22px] border border-white/8 bg-black/10 p-4">
                  <div className="flex items-center gap-2 text-sm text-text-primary">
                    <CheckCircle2 className="h-4 w-4 text-accent-cyan" />
                    优点
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                    {tool.pros.map((pro) => (
                      <li key={pro}>+ {pro}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-[22px] border border-white/8 bg-black/10 p-4">
                  <div className="flex items-center gap-2 text-sm text-text-primary">
                    <XCircle className="h-4 w-4 text-accent-pink" />
                    缺点
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                    {tool.cons.map((con) => (
                      <li key={con}>- {con}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 rounded-[22px] border border-white/8 bg-black/10 p-4 text-sm leading-7 text-text-secondary">
                <strong className="text-text-primary">更适合：</strong>
                {tool.bestFor}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <ToolPrimaryCta
                  tool={tool}
                  placement="blog_art_primary_cta"
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
            eyebrow="横向对比"
            title="一张表看完第一轮差异"
            description="如果你已经知道自己最看重的是质量、预算还是门槛，这张表能帮你更快筛掉不匹配的工具。"
          />

          <div className="mt-10 overflow-x-auto rounded-[30px] border border-white/10 bg-white/5">
            <table className="w-full min-w-[880px]">
              <thead>
                <tr className="border-b border-white/8 bg-black/10">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">工具</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">价格</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">更擅长</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">上手难度</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">适合谁</th>
                </tr>
              </thead>
              <tbody>
                {aiArtToolCards.map((tool, index) => (
                  <tr key={tool.id} className={index % 2 === 1 ? 'bg-black/10' : ''}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <ToolLogo
                          name={tool.name}
                          icon={tool.icon}
                          size={32}
                          wrapperClassName="h-9 w-9 rounded-xl border border-white/10 bg-black/20"
                          imageClassName="h-6 w-6"
                          textClassName="text-sm text-text-primary"
                        />
                        <div>
                          <div className="font-medium text-text-primary">{tool.name}</div>
                          <div className="mt-1 flex items-center gap-1 text-xs text-text-muted">
                            <Star className="h-3 w-3 text-accent-yellow fill-accent-yellow" />
                            {tool.rating.toFixed(1)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full border px-2.5 py-1 text-xs ${pricingStyles[tool.pricing] ?? pricingStyles['免费试用']}`}>
                        {tool.pricing}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">{tool.features.slice(0, 2).join(' / ')}</td>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      {tool.id === 'bing-image-creator' || tool.id === 'dall-e-3'
                        ? '简单'
                        : tool.id === 'stable-diffusion'
                          ? '困难'
                          : '中等'}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">{tool.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeading
            eyebrow="适用场景"
            title="按目标选，比按平台选更快"
            description="很多人不是选不出工具，而是用错了判断顺序。先看你的出图目标，再看平台名称。"
          />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {scenarioSuggestions.map((item) => (
              <article key={item.title} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/10">
                  <item.icon className="h-5 w-5 text-accent-cyan" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-text-primary">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-text-secondary">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] p-8 text-center shadow-[0_28px_70px_rgba(0,0,0,0.25)]">
            <h2 className="text-3xl font-semibold text-text-primary">如果这一页还不够，就继续往工具库里走</h2>
            <p className="mt-4 text-base leading-8 text-text-secondary">
              你可以继续查看图像工具详情页，也可以回到工具库按价格、分类和任务进一步筛选。
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/tools?category=image"
                className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
              >
                查看图像工具库
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
              >
                回到专题内容中心
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
