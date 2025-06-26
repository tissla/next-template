'use client';

import { useEffect, useState } from 'react';

export const useThemeToggler = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Read storage for init theme
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const initial = stored === 'dark' || stored === 'light' ? stored : 'light';
    setTheme(initial);
    document.documentElement.className = `theme-${initial}`;
  }, []);

  // Uppdate dom and localstorage
  useEffect(() => {
    document.documentElement.className = `theme-${theme}`;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const switchTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return { theme, switchTheme };
};
