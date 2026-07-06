import type { Tool } from '@/types/tool';

export const freshLaunchToolIds = ['anysearch', 'octolens', 'typeahead', 'edgee', 'needle'] as const;

const freshLaunchPriority = new Map<string, number>(
  freshLaunchToolIds.map((id, index) => [id, freshLaunchToolIds.length - index])
);

function parseToolDate(tool: Pick<Tool, 'createdAt' | 'updatedAt'>) {
  const value = tool.updatedAt ?? tool.createdAt;
  if (!value) {
    return 0;
  }

  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) ? timestamp : 0;
}

function isFeatured(tool: Pick<Tool, 'is_featured' | 'isFeatured'>) {
  return Boolean(tool.is_featured ?? tool.isFeatured);
}

function isSponsored(tool: Pick<Tool, 'is_sponsored' | 'isSponsored' | 'sponsor_type' | 'sponsorType'>) {
  return Boolean(tool.is_sponsored ?? tool.isSponsored ?? tool.sponsor_type ?? tool.sponsorType);
}

function getEditorScore(tool: Pick<Tool, 'editorRating' | 'average_rating'>) {
  return tool.editorRating ?? tool.average_rating ?? 0;
}

export function compareToolsForDiscovery(left: Tool, right: Tool) {
  const sponsoredDelta = Number(isSponsored(right)) - Number(isSponsored(left));
  if (sponsoredDelta !== 0) {
    return sponsoredDelta;
  }

  const featuredDelta = Number(isFeatured(right)) - Number(isFeatured(left));
  if (featuredDelta !== 0) {
    return featuredDelta;
  }

  const freshPriorityDelta = (freshLaunchPriority.get(right.id) ?? 0) - (freshLaunchPriority.get(left.id) ?? 0);
  if (freshPriorityDelta !== 0) {
    return freshPriorityDelta;
  }

  const freshnessDelta = parseToolDate(right) - parseToolDate(left);
  if (freshnessDelta !== 0) {
    return freshnessDelta;
  }

  const editorScoreDelta = getEditorScore(right) - getEditorScore(left);
  if (editorScoreDelta !== 0) {
    return editorScoreDelta;
  }

  return left.name.localeCompare(right.name);
}

export function rankToolsForDiscovery<T extends Tool>(tools: T[]) {
  return [...tools].sort(compareToolsForDiscovery);
}

export function rankFeaturedTools<T extends Tool>(tools: T[], limit?: number) {
  const ranked = rankToolsForDiscovery(tools.filter((tool) => isFeatured(tool)) as T[]);
  return typeof limit === 'number' ? ranked.slice(0, limit) : ranked;
}
