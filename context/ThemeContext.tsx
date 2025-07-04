'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type ThemeContextType = {
  theme: 'light' | 'dark';
  switchTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const initial = stored === 'dark' || stored === 'light' ? stored : 'light';
    setTheme(initial);
    document.documentElement.className = `theme-${initial}`;
  }, []);

  useEffect(() => {
    document.documentElement.className = `theme-${theme}`;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const switchTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeToggler = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeToggler must be used within a ThemeProvider');
  }
  return context;
};
