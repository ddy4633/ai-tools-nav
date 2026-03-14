import { toolsData } from '@/lib/content/tools-data';

const toolDirectory = new Map(toolsData.map((tool) => [tool.id, tool]));

export function getToolById(id: string) {
  return toolDirectory.get(id);
}

export function getToolDetailHref(id: string, name: string) {
  if (toolDirectory.has(id)) {
    return `/tools/${id}`;
  }

  return `/tools?search=${encodeURIComponent(name)}`;
}

interface ToolCardInput {
  id: string;
  name: string;
  website?: string;
  affiliate_url?: string | null;
  affiliateUrl?: string | null;
  icon?: string | null;
}

export function getToolCardData(tool: ToolCardInput) {
  const indexedTool = getToolById(tool.id);

  return {
    id: tool.id,
    name: tool.name,
    website: tool.website ?? indexedTool?.website,
    affiliate_url: tool.affiliate_url ?? indexedTool?.affiliate_url ?? null,
    affiliateUrl: tool.affiliateUrl ?? indexedTool?.affiliateUrl ?? null,
    icon: tool.icon ?? indexedTool?.icon ?? null,
  };
}
