'use client';

import { useThemeToggler } from '@/context/ThemeContext';

export default function ThemeToggle() {
  const { theme, switchTheme } = useThemeToggler();

  return (
    <button
      onClick={switchTheme}
      className="w-full px-4 py-3 text-left hover:bg-primary hover:text-background transition-colors"
    >
      {theme === 'dark' ? 'Light' : 'Dark'} mode
    </button>
  );
}
