import type { Tool, ToolSponsorType } from '@/types/tool';

export interface SponsoredToolFilters {
  limit?: number;
  sponsorType?: ToolSponsorType | 'all' | null;
  category?: string | null;
  activeOnly?: boolean;
}

function parseDate(value?: string | null): Date | null {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function getNow(): Date {
  return new Date();
}

function normalizeText(value?: string | null): string {
  return value?.trim().toLowerCase() ?? '';
}

function normalizeLimit(value?: number | null): number | null {
  if (value == null) {
    return null;
  }

  if (!Number.isFinite(value)) {
    return null;
  }

  return Math.max(Math.floor(value), 1);
}

function resolveFilters(limitOrFilters?: number | SponsoredToolFilters): SponsoredToolFilters {
  if (typeof limitOrFilters === 'number') {
    return { limit: limitOrFilters };
  }

  return limitOrFilters ?? {};
}

function getConfiguredSponsoredToolIds(): string[] {
  const raw = process.env.NEXT_PUBLIC_SPONSORED_TOOL_IDS?.trim();

  if (!raw) {
    return [];
  }

  return raw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function isToolSponsoredWithIds(tool: Tool, configuredIds: string[]): boolean {
  if (configuredIds.includes(tool.id)) {
    return true;
  }

  return Boolean(
    tool.is_sponsored ??
    tool.isSponsored ??
    tool.sponsor_type ??
    tool.sponsorType
  );
}

function getSponsorRank(tool: Tool): number {
  return tool.sponsor_rank ?? tool.sponsorRank ?? Number.MAX_SAFE_INTEGER;
}

function matchesSponsorType(tool: Tool, sponsorType?: ToolSponsorType | 'all' | null): boolean {
  if (!sponsorType || sponsorType === 'all') {
    return true;
  }

  return (tool.sponsor_type ?? tool.sponsorType) === sponsorType;
}

export function matchesToolCategory(tool: Tool, category?: string | null): boolean {
  const normalizedCategory = normalizeText(category);

  if (!normalizedCategory) {
    return true;
  }

  return [tool.category, tool.categorySlug, tool.category_slug]
    .map((value) => normalizeText(value))
    .some((value) => value === normalizedCategory);
}

export function isSponsorScheduleActive(tool: Tool, now = getNow()): boolean {
  const startAt = parseDate(tool.sponsor_start_at ?? tool.sponsorStartAt);
  const endAt = parseDate(tool.sponsor_end_at ?? tool.sponsorEndAt);

  if (startAt && startAt.getTime() > now.getTime()) {
    return false;
  }

  if (endAt && endAt.getTime() < now.getTime()) {
    return false;
  }

  return true;
}

export function isToolSponsored(tool: Tool): boolean {
  return isToolSponsoredWithIds(tool, getConfiguredSponsoredToolIds()) && isSponsorScheduleActive(tool);
}

export function getToolSponsorLabel(tool: Tool): string {
  if (tool.sponsor_label ?? tool.sponsorLabel) {
    return (tool.sponsor_label ?? tool.sponsorLabel)!;
  }

  const sponsorType = tool.sponsor_type ?? tool.sponsorType;

  if (sponsorType === 'homepage_spotlight') {
    return 'Homepage sponsor';
  }

  if (sponsorType === 'category_spotlight') {
    return 'Category sponsor';
  }

  if (sponsorType === 'newsletter_spotlight') {
    return 'Digest sponsor';
  }

  return 'Sponsored pick';
}

export function getSponsoredToolsFromList(
  tools: Tool[],
  limitOrFilters: number | SponsoredToolFilters = 3,
): Tool[] {
  const filters = resolveFilters(limitOrFilters);
  const configuredIds = getConfiguredSponsoredToolIds();
  const configuredOrder = new Map(configuredIds.map((id, index) => [id, index]));
  const now = getNow();
  const activeOnly = filters.activeOnly ?? true;
  const normalizedLimit = normalizeLimit(filters.limit) ?? 3;

  return tools
    .filter((tool) => isToolSponsoredWithIds(tool, configuredIds))
    .filter((tool) => matchesSponsorType(tool, filters.sponsorType))
    .filter((tool) => matchesToolCategory(tool, filters.category))
    .filter((tool) => (activeOnly ? isSponsorScheduleActive(tool, now) : true))
    .sort((left, right) => {
      const rankDelta = getSponsorRank(left) - getSponsorRank(right);
      if (rankDelta !== 0) {
        return rankDelta;
      }

      const configuredLeft = configuredOrder.get(left.id) ?? Number.MAX_SAFE_INTEGER;
      const configuredRight = configuredOrder.get(right.id) ?? Number.MAX_SAFE_INTEGER;
      if (configuredLeft !== configuredRight) {
        return configuredLeft - configuredRight;
      }

      const featuredLeft = Number(Boolean(left.is_featured ?? left.isFeatured));
      const featuredRight = Number(Boolean(right.is_featured ?? right.isFeatured));
      if (featuredLeft !== featuredRight) {
        return featuredRight - featuredLeft;
      }

      return left.name.localeCompare(right.name, 'en');
    })
    .slice(0, normalizedLimit);
}
