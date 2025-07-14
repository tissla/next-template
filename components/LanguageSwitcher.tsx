'use client';

import { useLanguage } from '@/context/LanguageContext';
import Select from '@/components/Select';
import { Locale } from '@/lib/i18n';

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  const languageOptions = [
    { value: 'sv-SE', label: 'Svenska', icon: '🇸🇪' },
    { value: 'en-US', label: 'English', icon: '🇬🇧' },
  ];

  return (
    <Select
      options={languageOptions}
      value={lang}
      onChange={(value) => setLang(value as Locale)}
      className="w-full"
    />
  );
}
