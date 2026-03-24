const policyIllustrationPaths = {
  privacy: '/illustrations/policy-privacy.svg',
  terms: '/illustrations/policy-terms.svg',
  disclosure: '/illustrations/policy-disclosure.svg',
} as const;

const editorialIllustrationPaths = {
  deepseekGuide: '/illustrations/reasoning-surface.svg',
  chatgptAlternatives: '/illustrations/reasoning-surface.svg',
  topAiTools2026: '/illustrations/launch-watchlist.svg',
} as const;

function normalizeCategoryKey(category?: string, slug?: string) {
  const candidates = [slug, category]
    .filter(Boolean)
    .map((value) => value!.trim().toLowerCase());

  for (const candidate of candidates) {
    if (['chatbot', 'knowledge', 'data', 'ai聊天', '聊天机器人', '知识', '数据'].includes(candidate)) {
      return 'reasoning';
    }

    if (['code', 'productivity', 'ai编程', '编程', '代码', '生产力'].includes(candidate)) {
      return 'workbench';
    }

    if (['image', 'video', 'design', 'ai图像', 'ai绘画', '图像', '绘画', '视频', '设计'].includes(candidate)) {
      return 'canvas';
    }

    if (['audio', 'ai音频', '音频'].includes(candidate)) {
      return 'audio';
    }
  }

  return 'reasoning';
}

export function getPolicyIllustrationPath(page: keyof typeof policyIllustrationPaths) {
  return policyIllustrationPaths[page];
}

export function getEditorialIllustrationPath(page: keyof typeof editorialIllustrationPaths) {
  return editorialIllustrationPaths[page];
}

export function getToolIllustrationPath(category?: string, slug?: string) {
  const key = normalizeCategoryKey(category, slug);

  switch (key) {
    case 'workbench':
      return '/illustrations/tool-workbench.svg';
    case 'canvas':
      return '/illustrations/tool-canvas.svg';
    case 'audio':
      return '/illustrations/tool-audio.svg';
    case 'reasoning':
    default:
      return '/illustrations/tool-reasoning.svg';
  }
}
