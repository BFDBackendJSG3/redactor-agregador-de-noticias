import { useEffect, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
}) {
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem(storageKey) || defaultTheme;
  });

  // Aplica classe no <html>
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');

    let appliedTheme = theme;

    if (theme === 'system') {
      appliedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }

    root.classList.add(appliedTheme);
  }, [theme]);

  function setTheme(newTheme) {
    localStorage.setItem(storageKey, newTheme);
    setThemeState(newTheme);
  }

  function toggleTheme() {
    setThemeState((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem(storageKey, next);
      return next;
    });
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
