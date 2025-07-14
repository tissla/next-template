import sv from '../lang/sv-SE';
import en from '../lang/en-US';

// Constants
export const DEFAULT_LOCALE = 'sv-SE';
export const STORAGE_KEY = 'preferred-lang';

// Types
export type LangDict = typeof sv;
export type LangKey = keyof LangDict;
export type Locale = keyof typeof languages;

// Language registry
const languages = {
  'sv-SE': sv,
  'en-US': en,
} as const;

// Helpers
export const getAvailableLanguages = (): Locale[] =>
  Object.keys(languages) as Locale[];

export const isValidLocale = (lang: string): lang is Locale =>
  lang in languages;

export const getTranslations = (lang: string): LangDict =>
  isValidLocale(lang) ? languages[lang] : languages[DEFAULT_LOCALE];

// Translation function
export const t = (
  key: LangKey,
  lang: string,
  replacements?: Record<string, string | number>
): string => {
  const dict = getTranslations(lang);
  let text = (dict[key] ?? key) as string;

  if (replacements) {
    Object.entries(replacements).forEach(([placeholder, value]) => {
      text = text.replace(new RegExp(`{${placeholder}}`, 'g'), String(value));
    });
  }

  return text;
};

// Browser language detection
export const getBrowserLanguage = (): Locale => {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;

  const browserLang = navigator.language;

  // Exact match
  if (isValidLocale(browserLang)) return browserLang;

  // Partial match (e.g., 'en' matches 'en-US')
  const shortLang = browserLang.split('-')[0];
  const match = getAvailableLanguages().find((locale) =>
    locale.startsWith(shortLang)
  );

  return match || DEFAULT_LOCALE;
};
