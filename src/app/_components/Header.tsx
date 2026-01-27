'use client';

import { useEffect, useState } from 'react';

import { Menu, X, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useTheme } from '../_context/ThemeContextBase';

const navItems = [
  { label: 'Home', to: '/' },
  // { label: 'Blog', to: '/blog' },
  { label: 'Resume', to: '/resume' },
  { label: 'Projects', to: '/projects' },
];

export default function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const normalizePath = (value: string) => {
    const trimmed = value.replace(/\/+$/, '');
    return trimmed === '' ? '/' : trimmed;
  };

  const isRouteActive = (target: string) => {
    const current = normalizePath(pathname ?? '/');
    const normalizedTarget = normalizePath(target);

    if (normalizedTarget === '/') {
      return current === '/';
    }

    return current === normalizedTarget || current.startsWith(`${normalizedTarget}/`);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  const isDarkBackground = true;

  return (
    <header
      className={`site-header fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? isDarkBackground
            ? 'bg-nord-6/90 dark:bg-nord-0/90 py-2 shadow-md backdrop-blur-md'
            : 'bg-nord-5/90 dark:bg-nord-1/90 py-2 shadow-md backdrop-blur-md'
          : isDarkBackground
            ? 'py-4 backdrop-blur-sm'
            : 'bg-nord-5/40 dark:bg-nord-1/40 py-4 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="font-display text-nord-10 dark:text-nord-8 text-xl font-bold">
          tbordenca
        </Link>

        <nav className="hidden items-center space-x-8 md:flex">
          <ul className="flex space-x-6">
            {navItems.map(item => {
              const isActive = isRouteActive(item.to);

              return (
                <li key={item.to}>
                  <Link
                    href={item.to}
                    onClick={handleNavClick}
                    className={`font-medium transition-colors duration-300 ${
                      isActive
                        ? 'text-nord-10 dark:text-nord-8'
                        : 'text-nord-3 hover:text-nord-10 dark:text-nord-4 dark:hover:text-nord-8'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            onClick={toggleTheme}
            className="bg-nord-5/80 text-nord-0 hover:bg-nord-4 dark:bg-nord-2/80 dark:text-nord-6 dark:hover:bg-nord-3 rounded-full p-2 transition-colors duration-300"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'light' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>

        <div className="flex items-center md:hidden">
          <button
            onClick={toggleTheme}
            className="bg-nord-5/80 text-nord-0 dark:bg-nord-2/80 dark:text-nord-6 mr-2 rounded-full p-2"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-nord-5/80 text-nord-0 dark:bg-nord-2/80 dark:text-nord-6 rounded-lg p-2"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="bg-nord-6/95 dark:bg-nord-0/95 shadow-lg backdrop-blur-md md:hidden">
          <ul className="space-y-4 px-6 py-4">
            {navItems.map(item => {
              const isActive = isRouteActive(item.to);

              return (
                <li key={item.to}>
                  <Link
                    href={item.to}
                    onClick={handleNavClick}
                    className={`block py-2 font-medium ${
                      isActive ? 'text-nord-10 dark:text-nord-8' : 'text-nord-3 dark:text-nord-4'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
