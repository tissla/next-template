'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import {
  t as baseT,
  LangKey,
  Locale,
  getAvailableLanguages,
  getBrowserLanguage,
  isValidLocale,
  DEFAULT_LOCALE,
  STORAGE_KEY,
} from '@/lib/i18n';

interface LanguageContextType {
  lang: Locale;
  setLang: (lang: Locale) => void;
  t: (key: LangKey, replacements?: Record<string, string | number>) => string;
  availableLanguages: Locale[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({
  children,
  defaultLang,
}: {
  children: React.ReactNode;
  defaultLang?: Locale;
}) => {
  const [lang, setLangState] = useState<Locale>(DEFAULT_LOCALE);

  const setLang = useCallback((newLang: Locale) => {
    setLangState(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);

    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLang.toLowerCase();
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && isValidLocale(saved)) {
      setLang(saved);
    } else {
      setLang(defaultLang || getBrowserLanguage());
    }
  }, [defaultLang, setLang]);

  const t = useCallback(
    (key: LangKey, replacements?: Record<string, string | number>) => {
      return baseT(key, lang, replacements);
    },
    [lang]
  );

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        t,
        availableLanguages: getAvailableLanguages(),
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
