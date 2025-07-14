'use client';

import { useThemeToggler } from '@/context/ThemeContext';
import { useNotification } from '@/context/NotificationContext';

export default function ThemeToggle() {
  const { theme, switchTheme } = useThemeToggler();

  // mostly for testing the notification display during a theme-switch, remove if uwanted
  const { showNotification } = useNotification();

  const handleClick = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    switchTheme();
    showNotification(`Theme switched: ${newTheme}`);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full px-4 py-3 text-left hover:bg-primary hover:text-background transition-colors"
    >
      {theme === 'dark' ? 'Light' : 'Dark'} mode
    </button>
  );
}
