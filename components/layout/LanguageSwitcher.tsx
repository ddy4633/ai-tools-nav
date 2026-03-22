'use client';

import { ChevronDown, Languages } from 'lucide-react';
import { useUiLanguage } from '@/components/providers/LanguageProvider';
import { uiLanguageOptions, type UiLanguage } from '@/lib/ui-language';

export default function LanguageSwitcher({
  mobile = false,
}: {
  mobile?: boolean;
}) {
  const { language, setLanguage, copy } = useUiLanguage();

  return (
    <div className={`relative ${mobile ? 'w-full' : 'hidden md:block'}`}>
      <label className="sr-only" htmlFor={mobile ? 'language-switcher-mobile' : 'language-switcher'}>
        {copy.languageLabel}
      </label>
      <div className={`relative flex items-center gap-2 rounded-full border border-white/10 bg-white/5 text-text-secondary ${mobile ? 'w-full px-4 py-3' : 'px-3 py-2'}`}>
        <Languages className="h-4 w-4 text-accent-cyan" />
        <select
          id={mobile ? 'language-switcher-mobile' : 'language-switcher'}
          value={language}
          onChange={(event) => setLanguage(event.target.value as UiLanguage)}
          aria-label={copy.languageLabel}
          className="w-full appearance-none bg-transparent pr-6 text-sm text-text-primary outline-none"
        >
          {uiLanguageOptions.map((option) => (
            <option key={option.code} value={option.code}>
              {option.shortLabel} · {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-text-muted" />
      </div>
    </div>
  );
}
