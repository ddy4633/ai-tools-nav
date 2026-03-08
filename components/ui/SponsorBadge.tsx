import type { Tool } from '@/types/tool';
import { getToolSponsorLabel, isToolSponsored } from '@/lib/monetization/sponsored';

interface SponsorBadgeProps {
  tool: Tool;
  className?: string;
}

export default function SponsorBadge({ tool, className = '' }: SponsorBadgeProps) {
  if (!isToolSponsored(tool)) {
    return null;
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono bg-accent-yellow/10 text-accent-yellow border border-accent-yellow/30 ${className}`.trim()}>
      {getToolSponsorLabel(tool)}
    </span>
  );
}
