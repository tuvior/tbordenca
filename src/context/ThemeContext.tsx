import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

type ThemeProviderProps = {
  children: ReactNode;
};

const updateThemeColor = (theme: string) => {
  const themeColor = theme === 'dark' ? '#2E3440' : '#ECEFF4';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColor);
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Check if user has a theme preference in localStorage or prefers dark mode
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }

    // Check if user prefers dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  });

  // Update theme in localStorage and document when theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    updateThemeColor(theme);

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
