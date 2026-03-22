'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  UI_LANGUAGE_COOKIE_KEY,
  UI_LANGUAGE_STORAGE_KEY,
  getUiCopy,
  getUiLanguageMeta,
  resolveUiLanguage,
  type UiCopy,
  type UiLanguage,
} from '@/lib/ui-language';

type LanguageContextValue = {
  language: UiLanguage;
  setLanguage: (language: UiLanguage) => void;
  copy: UiCopy;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readCookieValue(name: string) {
  if (typeof document === 'undefined') {
    return null;
  }

  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function detectInitialLanguage(): UiLanguage {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const storedLanguage = window.localStorage.getItem(UI_LANGUAGE_STORAGE_KEY);
  if (storedLanguage) {
    return resolveUiLanguage(storedLanguage);
  }

  const cookieLanguage = readCookieValue(UI_LANGUAGE_COOKIE_KEY);
  if (cookieLanguage) {
    return resolveUiLanguage(cookieLanguage);
  }

  const browserLanguage = window.navigator.languages?.[0] ?? window.navigator.language;
  return resolveUiLanguage(browserLanguage);
}

export function LanguageProvider({
  children,
  initialLanguage,
}: {
  children: ReactNode;
  initialLanguage?: UiLanguage;
}) {
  const [language, setLanguage] = useState<UiLanguage>(() => initialLanguage ?? detectInitialLanguage());

  useEffect(() => {
    const meta = getUiLanguageMeta(language);

    document.documentElement.lang = meta.htmlLang;
    document.documentElement.dataset.uiLang = language;
    window.localStorage.setItem(UI_LANGUAGE_STORAGE_KEY, language);
    document.cookie = `${UI_LANGUAGE_COOKIE_KEY}=${encodeURIComponent(language)}; path=/; max-age=31536000; SameSite=Lax`;
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage,
    copy: getUiCopy(language),
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useUiLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useUiLanguage must be used within LanguageProvider');
  }

  return context;
}
