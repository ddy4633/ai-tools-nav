import type { Tool } from '@/types/tool';
import type { UiLanguage } from '@/lib/ui-language';

type CategoryMeta = {
  label: string;
  shortLabel: string;
  overview: string;
  bestFor: string;
  guideTitle: string;
  guideDescription: string;
};

const categoryMetaMap: Record<string, CategoryMeta> = {
  chatbot: {
    label: 'AI Chat',
    shortLabel: 'Chat',
    overview: 'assistant workflows, research, and conversational task handling',
    bestFor: 'research, long-form Q&A, and fast workflow support',
    guideTitle: 'Check context depth first',
    guideDescription:
      'The real difference is whether the tool can keep track of long tasks, documents, and follow-up requests without losing the thread.',
  },
  writing: {
    label: 'AI Writing',
    shortLabel: 'Writing',
    overview: 'copy drafting, rewriting, and editorial workflows',
    bestFor: 'copy teams, content ops, and structured drafting',
    guideTitle: 'Judge structure before style',
    guideDescription:
      'The best writing tools help you shape a brief, tighten an argument, and keep the output on-brand before polishing sentences.',
  },
  code: {
    label: 'AI Coding',
    shortLabel: 'Coding',
    overview: 'coding, refactoring, and multi-file implementation work',
    bestFor: 'shipping code, refactoring, and debugging with speed',
    guideTitle: 'See if it understands the whole project',
    guideDescription:
      'Autocomplete is not enough. The useful tools are the ones that can follow repo context, edit across files, and close the loop.',
  },
  image: {
    label: 'Image & Art',
    shortLabel: 'Image',
    overview: 'image generation, illustration, and creative visual work',
    bestFor: 'creative direction, image generation, and campaign visuals',
    guideTitle: 'Measure consistency, not just wow factor',
    guideDescription:
      'A strong image tool should stay reliable across prompts, edits, and production constraints instead of producing one-off lucky outputs.',
  },
  video: {
    label: 'Video Generation',
    shortLabel: 'Video',
    overview: 'video generation, motion design, and marketing visuals',
    bestFor: 'short-form content, product storytelling, and motion assets',
    guideTitle: 'Look for repeatability in motion',
    guideDescription:
      'The key question is whether the product can keep subjects, pacing, and scene logic stable when you need multiple usable outputs.',
  },
  audio: {
    label: 'Audio & Voice',
    shortLabel: 'Audio',
    overview: 'voice, transcription, audio cleanup, and spoken workflows',
    bestFor: 'voice workflows, transcription, and audio operations',
    guideTitle: 'Usability beats novelty',
    guideDescription:
      'Audio tools win when they reduce editing time, improve clarity, and make speech workflows easier to ship under real deadlines.',
  },
  design: {
    label: 'Design',
    shortLabel: 'Design',
    overview: 'design exploration, UI work, and creative systems',
    bestFor: 'UI exploration, rapid concepts, and visual iteration',
    guideTitle: 'Use it to decide faster',
    guideDescription:
      'The best design tools narrow the decision space. They should help teams compare, iterate, and commit instead of adding noise.',
  },
  productivity: {
    label: 'Productivity',
    shortLabel: 'Productivity',
    overview: 'ops workflows, meeting capture, and task compression',
    bestFor: 'faster ops, meeting output, and workflow compression',
    guideTitle: 'Count context switches',
    guideDescription:
      'The value is not in a new interface. It is in how much busywork, tab-hopping, and repeated manual work the tool removes.',
  },
  knowledge: {
    label: 'Research & Knowledge',
    shortLabel: 'Knowledge',
    overview: 'research, knowledge capture, and information retrieval',
    bestFor: 'research teams, note systems, and long-term recall',
    guideTitle: 'Reuse matters most',
    guideDescription:
      'A strong knowledge tool should help you retrieve and reuse what matters later, not just look organized on day one.',
  },
  data: {
    label: 'Data & Analytics',
    shortLabel: 'Data',
    overview: 'analysis, reporting, and decision support',
    bestFor: 'analysis, reporting, and turning datasets into decisions',
    guideTitle: 'Interpretation is the real feature',
    guideDescription:
      'Charts are easy. The harder job is helping people understand what changed, why it matters, and what to do next.',
  },
};

const categoryAliases: Record<string, string> = {
  chatbot: 'chatbot',
  'ai聊天': 'chatbot',
  '聊天机器人': 'chatbot',
  '对话': 'chatbot',
  writing: 'writing',
  'ai写作': 'writing',
  '写作': 'writing',
  code: 'code',
  'ai编程': 'code',
  '编程': 'code',
  '代码': 'code',
  image: 'image',
  'ai图像': 'image',
  'ai绘画': 'image',
  '图像': 'image',
  '绘画': 'image',
  video: 'video',
  'ai视频': 'video',
  '视频': 'video',
  audio: 'audio',
  'ai音频': 'audio',
  '音频': 'audio',
  design: 'design',
  'ai设计': 'design',
  '设计': 'design',
  productivity: 'productivity',
  '生产力': 'productivity',
  knowledge: 'knowledge',
  '知识': 'knowledge',
  data: 'data',
  '数据': 'data',
};

const pricingMetaMap = {
  free: 'Free',
  paid: 'Paid',
  freemium: 'Freemium',
} as const;

const localizedToolNameMap: Record<string, string> = {
  '通义千问': 'Qwen (通义千问)',
  '豆包': 'Doubao (豆包)',
  '可灵AI': 'Kling AI (可灵AI)',
  '可灵AI视频': 'Kling AI Video (可灵AI视频)',
  '海螺AI': 'Hailuo AI (海螺AI)',
  '通义万相': 'Tongyi Wanxiang (通义万相)',
  '通义听悟': 'Tongyi Tingwu (通义听悟)',
  '飞书多维表格': 'Lark Base (飞书多维表格)',
  '文心一言': 'ERNIE Bot (文心一言)',
  '文心一格': 'ERNIE Image (文心一格)',
};

function normalizeCategoryKey(category?: string, slug?: string) {
  const candidates = [slug, category]
    .filter(Boolean)
    .map((value) => value!.trim().toLowerCase());

  for (const candidate of candidates) {
    if (categoryAliases[candidate]) {
      return categoryAliases[candidate];
    }
  }

  return 'chatbot';
}

export function isCjkHeavy(value?: string | null) {
  if (!value) {
    return false;
  }

  const letters = value.match(/[A-Za-z]/g)?.length ?? 0;
  const cjk = value.match(/[\u3400-\u9fff]/g)?.length ?? 0;

  return cjk > letters;
}

export function hasCjk(value?: string | null) {
  if (!value) {
    return false;
  }

  return /[\u3400-\u9fff]/.test(value);
}

export function getCategoryMeta(category?: string, slug?: string) {
  const key = normalizeCategoryKey(category, slug);
  return categoryMetaMap[key] ?? categoryMetaMap.chatbot;
}

export function getCategoryLabel(category?: string, slug?: string) {
  return getCategoryMeta(category, slug).label;
}

export function getPricingLabel(type?: Tool['pricing_type'] | Tool['pricingType']) {
  if (!type) {
    return pricingMetaMap.freemium;
  }

  return pricingMetaMap[type] ?? pricingMetaMap.freemium;
}

export function getToolDisplayName(name?: string | null) {
  if (!name) {
    return 'Unknown tool';
  }

  const trimmedName = name.trim();
  return localizedToolNameMap[trimmedName] ?? trimmedName;
}

export function getToolPrimaryName(name?: string | null) {
  return getToolDisplayName(name).replace(/\s*\([^)]*[\u3400-\u9fff][^)]*\)\s*$/, '').trim();
}

export function getToolNameForLanguage(
  name: string | null | undefined,
  language: UiLanguage,
  mode: 'surface' | 'detail' = 'surface'
) {
  if (language === 'zh') {
    return getToolDisplayName(name);
  }

  if (mode === 'detail') {
    return getToolPrimaryName(name);
  }

  return getToolPrimaryName(name);
}

export function getToolPricingNote(tool: Tool) {
  const priceRange = tool.priceRange?.trim();

  if (priceRange && !hasCjk(priceRange)) {
    return priceRange;
  }

  const pricingType = tool.pricing_type ?? tool.pricingType;

  switch (pricingType) {
    case 'free':
      return 'Free to start. Check usage limits before relying on it in production workflows.';
    case 'paid':
      return 'Paid access. Review the plan details before rolling it out to the team.';
    case 'freemium':
    default:
      return 'Free entry is available, with advanced usage usually gated behind paid plans.';
  }
}

const installMethodLabelMap: Record<string, string> = {
  '☁️ 云端': '☁️ Cloud',
  '☁️ API': '☁️ API',
  '🐳 Docker': '🐳 Docker',
  '📦 API': '📦 API',
  '📦 pip': '📦 pip',
  '📦 npm': '📦 npm',
  '💻 客户端': '💻 Desktop app',
  云端: 'Cloud',
  客户端: 'Desktop app',
};

export function getInstallMethodLabel(method?: string | null) {
  if (!method) {
    return 'Platform';
  }

  const trimmedMethod = method.trim();
  const mappedLabel = installMethodLabelMap[trimmedMethod];

  if (mappedLabel) {
    return mappedLabel;
  }

  return hasCjk(trimmedMethod) ? 'Platform' : trimmedMethod;
}

export function getToolHeroSummary(tool: Tool) {
  const description = tool.description?.trim();
  const displayName = getToolPrimaryName(tool.name);

  if (description && !hasCjk(description)) {
    return description;
  }

  const category = getCategoryMeta(tool.category, tool.categorySlug ?? tool.category_slug);
  const pricing = getPricingLabel(tool.pricing_type ?? tool.pricingType).toLowerCase();

  return `${displayName} sits in ${category.label}. Review workflow fit, ${pricing} access, and alternatives before you commit to the click.`;
}

export function getToolCardSummary(tool: Tool) {
  const reason = tool.reason?.trim();
  const description = tool.description?.trim();
  const displayName = getToolPrimaryName(tool.name);

  if (reason && !hasCjk(reason)) {
    return reason;
  }

  if (description && !hasCjk(description)) {
    return description;
  }

  const category = getCategoryMeta(tool.category, tool.categorySlug ?? tool.category_slug);
  return `${displayName} is best for ${category.bestFor}. Use this card to judge fit, maturity, and whether the product deserves a deeper look.`;
}

export function getToolSourceNote(tool: Tool) {
  if (isCjkHeavy(tool.reason) || isCjkHeavy(tool.description)) {
    return 'Original editorial notes are currently stored in Simplified Chinese. English-first summaries are shown here for global browsing.';
  }

  return 'Editorial notes are shown in the original review language.';
}

export function getCategoryGuide(category?: string, slug?: string) {
  const meta = getCategoryMeta(category, slug);
  return {
    title: meta.guideTitle,
    description: meta.guideDescription,
  };
}
