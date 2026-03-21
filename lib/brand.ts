export const brandConfig = {
  siteName: 'AI Tool Atlas',
  shortName: 'Tool Atlas',
  legacyName: 'AI工具导航',
  siteDescription:
    'Curated AI tools, launch feeds, and decision-ready reviews for English, German, Japanese, Korean, and global teams.',
  shortDescription:
    'Curated AI tools and launch-ready discovery flows for global builders and growth teams.',
  ogDescription:
    'Discover launch-ready AI tools, review workflow fit, and explore curated picks across English, German, Japanese, Korean, and global markets.',
  taglines: {
    primary: 'Curated AI tools for builders, teams, and launch-driven operators.',
    secondary: 'See the signal first, then decide where to click.',
  },
  locale: 'en_US',
  htmlLang: 'en',
  primaryMarkets: ['English', 'Deutsch', '日本語', '한국어'],
  secondaryMarkets: ['简体中文'],
};

export const globalAudienceBlurb =
  'Built for English-first discovery, with German, Japanese, Korean, and selected Chinese context layered in when it improves the decision.';

export function formatGlobalNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

export function formatGlobalDate(value: string | Date) {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return typeof value === 'string' ? value : '';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}
