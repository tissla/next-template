import sv from '../lang/sv-SE';
import en from '../lang/en-US';

export type LangDict = typeof sv;
export type LangKey = keyof LangDict;

const languages: Record<string, LangDict> = {
  'sv-SE': sv,
  'en-US': en,
};

export const getAvailableLanguages = () => Object.keys(languages);

export const getTranslations = (lang: keyof typeof languages) =>
  languages[lang] ?? languages['sv-SE'];

export const t = (
  key: LangKey,
  lang: keyof typeof languages,
  replacements?: Record<string, string>
): string => {
  const dict = getTranslations(lang);
  let text = dict[key] ?? key;

  if (replacements) {
    Object.entries(replacements).forEach(([placeholder, value]) => {
      text = text.replace(`{${placeholder}}`, value);
    });
  }

  return text;
};
