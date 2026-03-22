'use client';

import { useUiLanguage } from '@/components/providers/LanguageProvider';
import { getToolNameForLanguage } from '@/lib/tool-display';

export default function LocalizedToolName({
  name,
  mode = 'surface',
  className,
}: {
  name?: string | null;
  mode?: 'surface' | 'detail';
  className?: string;
}) {
  const { language } = useUiLanguage();
  const displayName = getToolNameForLanguage(name, language, mode);

  return <span className={className}>{displayName}</span>;
}
