'use client';

import { useThemeToggler } from '@/hooks/use-theme-toggler';

export default function ThemeToggle() {
  const { theme, switchTheme } = useThemeToggler();

  return (
    <button
      onClick={switchTheme}
      className="fixed top-4 right-4 px-4 py-2 bg-accent text-foreground rounded shadow"
    >
      Switch to {theme === 'light' ? 'dark' : 'light'} mode
    </button>
  );
}
