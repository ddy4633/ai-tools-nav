interface ToolFreshnessInput {
  updatedAt?: string | null;
  createdAt?: string | null;
  updated_at?: string | null;
  created_at?: string | null;
}

function parseDateValue(value?: string | null) {
  if (!value) {
    return 0;
  }

  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) ? timestamp : 0;
}

export function getToolFreshnessTimestamp(tool: ToolFreshnessInput) {
  return Math.max(
    parseDateValue(tool.updatedAt),
    parseDateValue(tool.updated_at),
    parseDateValue(tool.createdAt),
    parseDateValue(tool.created_at),
  );
}

export function sortToolsByFreshness<T extends ToolFreshnessInput>(tools: T[]) {
  return [...tools].sort((left, right) => getToolFreshnessTimestamp(right) - getToolFreshnessTimestamp(left));
}
