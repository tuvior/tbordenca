'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import { ThemeContext, type Theme } from '@/app/_context/ThemeContextBase';

type ThemeProviderProps = {
  children: ReactNode;
};

const getPreferredTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'dark';
};

const updateThemeColor = (theme: Theme) => {
  const themeColor = theme === 'dark' ? '#2E3440' : '#ECEFF4';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColor);
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>('dark');

  const applyTheme = (nextTheme: Theme) => {
    localStorage.setItem('theme', nextTheme);
    updateThemeColor(nextTheme);

    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const setTheme = (nextTheme: Theme) => {
    setThemeState(nextTheme);
    applyTheme(nextTheme);
  };

  useEffect(() => {
    const preferredTheme = getPreferredTheme();
    applyTheme(preferredTheme);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync client-only theme after mount
    setThemeState(preferredTheme);
  }, []);

  const toggleTheme = () => {
    setThemeState(prevTheme => {
      const nextTheme = prevTheme === 'light' ? 'dark' : 'light';
      applyTheme(nextTheme);
      return nextTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
