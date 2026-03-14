import Link from 'next/link';
import { ArrowRight, Home, Sparkles } from 'lucide-react';
import type { Tool } from '@/types/tool';
import ToolLogo from '@/components/ui/ToolLogo';
import ToolPrimaryCta from '@/components/ui/ToolPrimaryCta';
import SponsorBadge from '@/components/ui/SponsorBadge';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';

interface CategoryToolsPageProps {
  categoryLabel: string;
  heading: string;
  description: string;
  tools: Tool[];
  toolsFilterHref: string;
  toolsFilterLabel: string;
  emptyEmoji: string;
  emptyTitle: string;
  emptyDescription: string;
}

const pricingLabels = {
  free: { text: '免费', className: 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/30' },
  paid: { text: '付费', className: 'bg-accent-pink/10 text-accent-pink border-accent-pink/30' },
  freemium: { text: '部分免费', className: 'bg-white/6 text-text-secondary border-white/12' },
};

export function filterToolsByKeywords(tools: Tool[], keywords: string[]): Tool[] {
  return tools.filter((tool) => {
    const category = tool.category?.toLowerCase() ?? '';
    return keywords.some((keyword) => category.includes(keyword.toLowerCase()));
  });
}

export default function CategoryToolsPage({
  categoryLabel,
  heading,
  description,
  tools,
  toolsFilterHref,
  toolsFilterLabel,
  emptyEmoji,
  emptyTitle,
  emptyDescription,
}: CategoryToolsPageProps) {
  const spotlightTools = [...tools].sort((left, right) => (right.editorRating ?? 0) - (left.editorRating ?? 0)).slice(0, 3);
  const freeCount = tools.filter((tool) => (tool.pricing_type ?? tool.pricingType) === 'free').length;

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <nav className="flex items-center gap-2 text-sm text-text-muted">
          <Link href="/" className="flex items-center gap-1 transition hover:text-text-primary">
            <Home className="w-4 h-4" />
            首页
          </Link>
          <span>/</span>
          <Link href="/categories" className="transition hover:text-text-primary">
            分类
          </Link>
          <span>/</span>
          <span className="text-text-primary">{categoryLabel}</span>
        </nav>
      </div>

      <PageHero
        eyebrow={`${categoryLabel} 分类页`}
        title={heading}
        highlight="先判断这一类工具最该看什么。"
        description={`共 ${tools.length} 个工具。${description}`}
        metrics={[
          {
            value: `${tools.length}`,
            label: '当前分类工具数',
            hint: '适合继续看详情页、替代方案和专题内容。',
          },
          {
            value: `${freeCount}`,
            label: '免费可试工具',
            hint: '适合先跑通工作流，再决定是否采购。',
          },
          {
            value: `${spotlightTools.length}`,
            label: '优先入口',
            hint: '先看评分和推荐理由更高的工具，减少试错成本。',
          },
        ]}
        actions={[
          { href: toolsFilterHref, label: toolsFilterLabel, tone: 'secondary' },
          { href: '/advertise', label: '购买该分类曝光', tone: 'primary' },
        ]}
        aside={
          <div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Sparkles className="h-4 w-4 text-accent-yellow" />
              这一类工具怎么挑
            </div>
            <div className="mt-5 space-y-3">
              {buildCategoryPrinciples(categoryLabel).map((item) => (
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
        {tools.length > 0 ? (
          <>
            <SectionHeading
              eyebrow="Top Pick"
              title={`先看这 3 个 ${categoryLabel} 工具`}
              description="它们不一定最有名，但更适合作为第一轮筛选入口。先把判断标准建立起来，再看更长的列表。"
            />

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {spotlightTools.map((tool) => (
                <article
                  key={tool.id}
                  className="rounded-[30px] border border-white/10 bg-white/5 p-5 transition hover:border-white/16 hover:bg-white/[0.07]"
                >
                  <div className="flex items-start gap-4">
                    <ToolLogo
                      name={tool.name}
                      icon={tool.icon}
                      size={32}
                      alt={`${tool.name} logo`}
                      wrapperClassName="h-14 w-14 rounded-[20px] border border-white/10 bg-black/10"
                      imageClassName="h-8 w-8"
                      textClassName="text-xl text-accent-cyan"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-lg font-semibold text-text-primary">{tool.name}</h3>
                        <span
                          className={`rounded-full border px-2.5 py-1 text-xs ${
                            pricingLabels[tool.pricing_type ?? tool.pricingType ?? 'freemium'].className
                          }`}
                        >
                          {pricingLabels[tool.pricing_type ?? tool.pricingType ?? 'freemium'].text}
                        </span>
                        <SponsorBadge tool={tool} />
                      </div>
                      <p className="mt-2 text-xs text-text-muted">{tool.category}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-text-secondary">{tool.reason || tool.description}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <ToolPrimaryCta
                      tool={tool}
                      placement="category_page_spotlight_primary_cta"
                      affiliateLabel="合作链接"
                      websiteLabel="访问官网"
                      className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
                    />
                    <Link
                      href={`/tools/${tool.id}`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
                    >
                      看详情
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-14 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-text-muted">Full List</p>
                <h2 className="mt-2 text-2xl font-semibold text-text-primary">{categoryLabel} 工具全列表</h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-text-secondary">
                  如果你已经知道自己要找的方向，下面这部分更适合逐个点进详情页做对比，尤其是价格、推荐理由和替代方案。
                </p>
              </div>
              <Link
                href="/submit"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
              >
                提交你的工具
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {tools.map((tool) => {
                const pricing = pricingLabels[tool.pricing_type ?? tool.pricingType ?? 'freemium'] || pricingLabels.freemium;
                const detailHref = `/tools/${tool.id}`;

                return (
                  <article
                    key={tool.id}
                    className="group rounded-[28px] border border-white/10 bg-white/5 p-5 transition hover:border-white/16 hover:bg-white/[0.07]"
                  >
                    <div className="flex items-start gap-4">
                      <ToolLogo
                        name={tool.name}
                        icon={tool.icon}
                        size={32}
                        alt={`${tool.name} logo`}
                        wrapperClassName="h-14 w-14 rounded-[20px] border border-white/10 bg-black/10"
                        imageClassName="h-8 w-8"
                        textClassName="text-xl text-accent-cyan"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Link href={detailHref} className="transition hover:text-accent-cyan">
                            <h3 className="truncate text-lg font-semibold text-text-primary">{tool.name}</h3>
                          </Link>
                          <span className={`rounded-full border px-2.5 py-1 text-xs ${pricing.className}`}>
                            {pricing.text}
                          </span>
                          <SponsorBadge tool={tool} />
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-text-muted">
                          <span>{tool.category}</span>
                          {tool.editorRating ? <span>编辑分 {tool.editorRating.toFixed(1)}</span> : null}
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-7 text-text-secondary">{tool.reason || tool.description}</p>

                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <ToolPrimaryCta
                        tool={tool}
                        placement="category_page_primary_cta"
                        affiliateLabel="合作链接"
                        websiteLabel="访问官网"
                        className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
                      />
                      <Link
                        href={detailHref}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
                      >
                        查看详情
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        ) : (
          <div className="rounded-[32px] border border-white/10 bg-white/5 py-16 text-center">
            <div className="text-6xl mb-4">{emptyEmoji}</div>
            <p className="text-lg font-semibold text-text-primary">{emptyTitle}</p>
            <p className="mt-2 text-sm text-text-muted">{emptyDescription}</p>
            <Link
              href="/tools"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/12 px-4 py-2 text-sm text-text-primary transition hover:bg-accent-cyan/18"
            >
              浏览全部工具
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        <div className="mt-14 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition hover:text-text-primary"
          >
            <Home className="w-4 h-4" />
            返回首页
          </Link>
        </div>
      </section>
    </div>
  );
}

function buildCategoryPrinciples(categoryLabel: string) {
  const ruleMap: Record<string, Array<{ title: string; description: string }>> = {
    聊天机器人: [
      {
        title: '先看上下文和推理',
        description: '长文本处理、联网能力和推理稳定性，决定它是否只是“能聊”，还是“能干活”。',
      },
      {
        title: '再看中文与工作流',
        description: '如果主要服务中文用户或团队协作，就要优先看中文质量、文件支持和速度。',
      },
    ],
    写作: [
      {
        title: '先看结构能力',
        description: '好用的写作工具不只是能续写，而是能把提纲、观点和节奏组织清楚。',
      },
      {
        title: '再看可控性',
        description: '品牌语气、改写精度和输出稳定性，比“能不能生成一段话”更重要。',
      },
    ],
    编程: [
      {
        title: '先看上下文理解',
        description: '能不能读懂整个项目、跨文件修改，是 AI 编程工具的分水岭。',
      },
      {
        title: '再看执行闭环',
        description: '从补全、重构到跑通任务，闭环越完整，越适合真实开发工作流。',
      },
    ],
    图像: [
      {
        title: '先看风格上限',
        description: '不是出得快就够，关键是风格稳定、细节质量和商业可交付性。',
      },
      {
        title: '再看版权与成本',
        description: '如果用于商业项目，要一起考虑授权、生成限制和后续修改成本。',
      },
    ],
  };

  return (
    ruleMap[categoryLabel] ?? [
      {
        title: '先看是否解决真实任务',
        description: '别被新鲜功能带偏，先看它是否能明显提升你当前工作流的效率。',
      },
      {
        title: '再看价格和替代方案',
        description: '好工具不一定最贵，关键是这个场景里它有没有更低成本的替代选项。',
      },
    ]
  );
}
