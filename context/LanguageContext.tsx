'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { 
  t as baseT, 
  LangKey, 
  Locale,
  getAvailableLanguages, 
  getBrowserLanguage,
  isValidLocale,
  DEFAULT_LOCALE,
  STORAGE_KEY
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
  // Initialize with browser language or default
  const [lang, setLangState] = useState<Locale>(() => {
    if (typeof window === 'undefined') {
      return defaultLang || DEFAULT_LOCALE;
    }
    
    // Check localStorage first
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && isValidLocale(saved)) {
      return saved;
    }
    
    // Then check browser language
    return defaultLang || getBrowserLanguage();
  });



  const setLang = useCallback((newLang: Locale) => {
    setLangState(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
    
    // Optional: Update document lang attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLang.toLowerCase();
    }
  }, []);

  const t = useCallback((
    key: LangKey, 
    replacements?: Record<string, string | number>
  ) => baseT(key, lang, replacements), [lang]);

  return (
    <LanguageContext.Provider
      value={{ 
        lang, 
        setLang, 
        t, 
        availableLanguages: getAvailableLanguages() 
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

// === Optional: Language detector component ===
export const LanguageDetector = ({ children }: { children: React.ReactNode }) => {
  const { setLang } = useLanguage();
  
  useEffect(() => {
    // Only run if no saved preference
    if (!localStorage.getItem(STORAGE_KEY)) {
      const browserLang = getBrowserLanguage();
      setLang(browserLang);
    }
  }, [setLang]);
  
  return <>{children}</>;
};