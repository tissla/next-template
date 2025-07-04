'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { t as baseT, LangKey, getAvailableLanguages } from '@/lib/i18n';

type LanguageContextType = {
  lang: string;
  setLang: (lang: string) => void;
  t: (key: LangKey, replacements?: Record<string, string>) => string;
  availableLanguages: string[];
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [lang, setLangState] = useState('sv-SE');

  useEffect(() => {
    const saved = localStorage.getItem('preferred-lang');
    if (saved) {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: string) => {
    setLangState(newLang);
    localStorage.setItem('preferred-lang', newLang);
  };

  const t = (key: LangKey, replacements?: Record<string, string>) =>
    baseT(key, lang, replacements);

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, t, availableLanguages: getAvailableLanguages() }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used inside a LanguageProvider');
  }
  return ctx;
};
