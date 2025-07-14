import sv from '../lang/sv-SE';
import en from '../lang/en-US';

// Constants
export const DEFAULT_LOCALE = 'en-US';
export const STORAGE_KEY = 'preferred-lang';

// Types
export type LangDict = typeof en; // the full translation object
export type LangKey = keyof LangDict; // key, part of the full translation object
export type Locale = keyof typeof languages; // mapping from supported langcode to translation object

// Language registry map
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
  lang: string, //usually provided by LanguageProvider
  replacements?: Record<string, string | number> //cross-language params, such as names or values
): string => {
  const dict = getTranslations(lang);
  let text = (dict[key] ?? key) as string; //shows key as string if translation isnt found

  //cross-language replacements, if used
  if (replacements) {
    Object.entries(replacements).forEach(([placeholder, value]) => {
      text = text.replace(new RegExp(`{${placeholder}}`, 'g'), String(value));
    });
  }

  return text;
};

// browser language detection
export const getBrowserLanguage = (): Locale => {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;

  const browserLang = navigator.language;

  // use browser lang
  if (isValidLocale(browserLang)) return browserLang;

  // or default
  return DEFAULT_LOCALE;
};
