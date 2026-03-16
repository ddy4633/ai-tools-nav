import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Compass, Layers3, Sparkles } from 'lucide-react';
import { getCategories } from '@/lib/supabase';
import Breadcrumb, { breadcrumbPresets } from '@/components/ui/Breadcrumb';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import { buildSiteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'AI 工具分类 - 按类别浏览',
  description: '按任务场景浏览 AI 工具分类，包括 AI 写作、图像生成、代码助手、聊天机器人等分类。',
  keywords: ['AI工具分类', 'AI写作', 'AI图像', 'AI编程', 'AI聊天', '工具分类'],
  alternates: {
    canonical: buildSiteUrl('/categories'),
  },
};

export default async function CategoriesPage() {
  const categories = await getCategories();
  const topCategories = [...categories].sort((left, right) => right.popularity - left.popularity).slice(0, 4);

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <Breadcrumb items={[{ ...breadcrumbPresets.categories, href: undefined }]} />
      </div>

      <PageHero
        eyebrow="任务分类"
        title="别先记模型名。"
        highlight="先从你的工作任务开始。"
        description="分类页的目标不是展示目录树，而是帮你快速进入合适的决策区。写作、做图、开发、做视频、整理知识，各自需要的评估标准都不一样。"
        metrics={[
          {
            value: `${categories.length}`,
            label: '当前一级分类',
            hint: '覆盖高频 AI 工作流，避免一开始就信息过载。',
          },
          {
            value: `${categories.reduce((sum, category) => sum + category.count, 0)}+`,
            label: '分类下工具数',
            hint: '每个分类页都能继续进入工具详情和专题内容。',
          },
          {
            value: `${topCategories[0]?.name ?? 'AI聊天'}`,
            label: '当前最热分类',
            hint: '热度高不代表最好，只代表更值得先看一眼。',
          },
          {
            value: '场景导向',
            label: '信息组织方式',
            hint: '我们优先按任务拆，而不是按“模型品牌”拆。',
          },
        ]}
        actions={[
          { href: '/tools', label: '直接进入工具库', tone: 'secondary' },
          { href: '/blog', label: '查看专题内容', tone: 'ghost' },
          { href: '/advertise', label: '购买分类曝光', tone: 'primary' },
        ]}
        aside={
          <div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Compass className="h-4 w-4 text-accent-cyan" />
              怎么使用分类页
            </div>
            <div className="mt-5 space-y-3">
              {[
                {
                  icon: Layers3,
                  title: '按任务选入口',
                  description: '如果你是内容团队，先看写作、图像和视频；如果你是开发团队，先看编程和数据。',
                },
                {
                  icon: Sparkles,
                  title: '再看编辑判断',
                  description: '每个分类页都会给出该类工具更看重的评估标准，避免只看热度和价格。',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-[22px] border border-white/8 bg-black/10 p-4">
                  <div className="flex items-center gap-2 text-sm text-text-primary">
                    <item.icon className="h-4 w-4 text-accent-yellow" />
                    {item.title}
                  </div>
                  <p className="mt-3 text-sm leading-7 text-text-secondary">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        }
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading
          eyebrow="Category Matrix"
          title="从这里选一个入口，先缩小决策范围"
          description="每个分类页都提供分类工具列表、推荐理由、合作位和继续深入的行动入口。"
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group rounded-[30px] border border-white/10 bg-white/5 p-5 transition hover:border-white/16 hover:bg-white/[0.07]"
            >
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-[18px] border border-white/10 bg-black/12">
                <Image
                  src={getCategoryIcon(category.slug)}
                  alt={`${category.name} 图标`}
                  width={36}
                  height={36}
                  unoptimized
                  className="object-contain"
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-text-primary transition group-hover:text-accent-cyan">
                    {category.name}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-text-secondary">
                    {getCategoryDescription(category.slug, category.name)}
                  </p>
                </div>
                <span className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-sm text-text-secondary">
                  {category.count} 个工具
                </span>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between text-sm text-text-muted">
                  <span>热度指数</span>
                  <span>{category.popularity}</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent-cyan via-accent-yellow to-accent-pink"
                    style={{ width: `${Math.min(category.popularity, 100)}%` }}
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between text-sm">
                <span className="text-text-muted">{getCategoryCue(category.slug)}</span>
                <span className="inline-flex items-center gap-2 text-text-primary">
                  进入分类页
                  <ArrowRight className="h-4 w-4 text-accent-cyan" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-[32px] border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-text-muted">Sponsor Ready</p>
              <h2 className="mt-2 text-2xl font-semibold text-text-primary">分类页也是明确的商业入口</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-text-secondary">
                如果你卖的是垂直能力，比如 AI 写作、AI 编程、AI 视频，买分类页比买泛流量更容易获得高意图点击。
              </p>
            </div>
            <Link
              href="/advertise"
              className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
            >
              查看分类合作方案
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function getCategoryDescription(slug: string, name: string) {
  const descriptions: Record<string, string> = {
    chatbot: '适合做问答、调研、总结和长上下文阅读。',
    writing: '适合写周报、做营销文案、写长文和改写已有内容。',
    code: '适合补全代码、改项目、搭原型和自动化开发工作流。',
    image: '适合做海报、风格图、产品视觉和社媒素材。',
    video: '适合生成短视频、产品演示和镜头脚本素材。',
    audio: '适合配音、转录、音频增强和语音克隆。',
    productivity: '适合整理会议、规划日程、自动推进团队任务。',
    design: '适合做原型、视觉探索和品牌表达提案。',
    knowledge: '适合沉淀资料、收藏灵感、构建个人知识库。',
    data: '适合做表格分析、商业洞察和自动生成结论。',
  };

  return descriptions[slug] ?? `${name} 相关工具的集中入口。`;
}

function getCategoryIcon(slug: string) {
  const iconMap: Record<string, string> = {
    chatbot: '/tool-icons/chatgpt.svg',
    writing: '/tool-icons/jasper.svg',
    code: '/tool-icons/cursor.svg',
    image: '/tool-icons/midjourney.png',
    video: '/tool-icons/sora.png',
    audio: '/tool-icons/suno.png',
    productivity: '/tool-icons/notion.svg',
    design: '/tool-icons/figma-ai.svg',
    knowledge: '/tool-icons/obsidian.svg',
    data: '/tool-icons/julius.ico',
  };

  return iconMap[slug] ?? '/tool-icons/chatgpt.svg';
}

function getCategoryCue(slug: string) {
  const cues: Record<string, string> = {
    chatbot: '先看长文本和推理能力',
    writing: '先看结构感和可控性',
    code: '先看上下文和执行闭环',
    image: '先看风格稳定和可交付性',
    video: '先看一致性和生成成本',
    audio: '先看可用度和清晰度',
    productivity: '先看能不能减少切换',
    design: '先看能不能帮助做判断',
    knowledge: '先看沉淀后的复用效率',
    data: '先看解释能力和结论质量',
  };

  return cues[slug] ?? '先看推荐理由';
}
