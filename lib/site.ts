import { brandConfig } from '@/lib/brand';

const DEFAULT_SITE_URL = 'https://ai.poph163.com';
const DEFAULT_GITHUB_URL = 'https://github.com/ddy4633/ai-tools-nav';
const DEFAULT_CONTACT_EMAIL = 'hello@ai.poph163.com';

function normalizeUrl(url: string) {
  return url.trim().replace(/\/$/, '');
}

function normalizeOptionalValue(value?: string) {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

export const siteConfig = {
  siteName: brandConfig.siteName,
  legacySiteName: brandConfig.legacyName,
  shortName: brandConfig.shortName,
  siteDescription: brandConfig.siteDescription,
  ogDescription: brandConfig.ogDescription,
  siteUrl: normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL),
  githubUrl: normalizeOptionalValue(process.env.NEXT_PUBLIC_GITHUB_URL) || DEFAULT_GITHUB_URL,
  xUrl: normalizeOptionalValue(process.env.NEXT_PUBLIC_X_URL),
  contactEmail: normalizeOptionalValue(process.env.NEXT_PUBLIC_CONTACT_EMAIL) || DEFAULT_CONTACT_EMAIL,
  searchVerification: {
    google: normalizeOptionalValue(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION),
    baidu: normalizeOptionalValue(process.env.NEXT_PUBLIC_BAIDU_SITE_VERIFICATION),
    bing: normalizeOptionalValue(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION),
  },
};

export function buildSiteUrl(path = '/') {
  if (!path || path === '/') {
    return siteConfig.siteUrl;
  }

  return `${siteConfig.siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export function buildMailtoLink(email = siteConfig.contactEmail) {
  return `mailto:${email}`;
}
