import { useState, useEffect } from 'react';

const THEME_KEY = 'filmology-theme';

export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first
    const stored = localStorage.getItem(THEME_KEY);
    if (stored !== null) {
      return stored === 'dark';
    }
    // Default to dark theme
    return true;
  });

  useEffect(() => {
    // Apply theme on mount and when isDark changes
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Persist to localStorage
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return { isDark, toggleTheme };
}
