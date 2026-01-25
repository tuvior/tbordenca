"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "../_context/ThemeContextBase";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Resume", to: "/resume" },
  { label: "Projects", to: "/projects" },
];

export default function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  const isDarkBackground = true;

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? isDarkBackground
            ? "bg-nord-6/90 py-2 shadow-md backdrop-blur-md dark:bg-nord-0/90"
            : "bg-nord-5/90 py-2 shadow-md backdrop-blur-md dark:bg-nord-1/90"
          : isDarkBackground
            ? "py-4 backdrop-blur-sm"
            : "bg-nord-5/40 py-4 backdrop-blur-sm dark:bg-nord-1/40"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="font-display text-xl font-bold text-nord-10 dark:text-nord-8">
          tbordenca
        </Link>

        <nav className="hidden items-center space-x-8 md:flex">
          <ul className="flex space-x-6">
            {navItems.map(item => {
              const isActive = pathname === item.to;

              return (
                <li key={item.to}>
                  <Link
                    href={item.to}
                    onClick={handleNavClick}
                    className={`font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-nord-10 dark:text-nord-8"
                        : "text-nord-3 hover:text-nord-10 dark:text-nord-4 dark:hover:text-nord-8"
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
            className="rounded-full bg-nord-5/80 p-2 text-nord-0 transition-colors duration-300 hover:bg-nord-4 dark:bg-nord-2/80 dark:text-nord-6 dark:hover:bg-nord-3"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>

        <div className="flex items-center md:hidden">
          <button
            onClick={toggleTheme}
            className="mr-2 rounded-full bg-nord-5/80 p-2 text-nord-0 dark:bg-nord-2/80 dark:text-nord-6"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg bg-nord-5/80 p-2 text-nord-0 dark:bg-nord-2/80 dark:text-nord-6"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="bg-nord-6/95 shadow-lg backdrop-blur-md dark:bg-nord-0/95 md:hidden">
          <ul className="space-y-4 px-6 py-4">
            {navItems.map(item => {
              const isActive = pathname === item.to;

              return (
                <li key={item.to}>
                  <Link
                    href={item.to}
                    onClick={handleNavClick}
                    className={`block py-2 font-medium ${
                      isActive ? "text-nord-10 dark:text-nord-8" : "text-nord-3 dark:text-nord-4"
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
