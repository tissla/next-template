'use client'

import ThemeToggle from '@/components/ThemeButton';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="space-y-8 p-8">
      <h1 className="text-4xl font-bold text-primary">{t('Rubrik')}</h1>


      <div className="absolute top-4 right-4 flex items-center gap-2">
      <LanguageSwitcher />
      <ThemeToggle />
      </div>

      <div className="ml-3 p-3 text-lg">
        <p>{t('FontTest')}</p>
        <p><i>{t('FontTest')}</i></p>
        <p><strong>{t('FontTest')}</strong></p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="rounded-xl p-4 bg-background text-foreground shadow">
          <strong>{t('Background')}</strong>
          <p>bg-background + text-foreground</p>
        </div>
        <div className="rounded-xl p-4 bg-primary text-foreground shadow">
          <strong>{t('Primary')}</strong>
          <p>bg-primary</p>
        </div>
        <div className="rounded-xl p-4 bg-secondary text-foreground shadow">
          <strong>{t('Secondary')}</strong>
          <p>bg-secondary</p>
        </div>
        <div className="rounded-xl p-4 bg-accent text-foreground shadow">
          <strong>{t('Accent')}</strong>
          <p>bg-accent</p>
        </div>
        <div className="rounded-xl p-4 bg-muted text-foreground shadow">
          <strong>{t('Muted')}</strong>
          <p>bg-muted</p>
        </div>
        <div className="rounded-xl p-4 bg-foreground text-background shadow">
          <strong>{t('Inverted')}</strong>
          <p>bg-foreground + text-background</p>
        </div>
      </div>
    </main>
  );
}
