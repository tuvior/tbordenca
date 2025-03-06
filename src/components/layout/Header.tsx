import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Menu, X, Moon, Sun } from 'lucide-react';

type HeaderProps = {
  sections: { id: string; label: string }[];
  activeSection: string;
};

const Header: React.FC<HeaderProps> = ({ sections, activeSection }) => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking a navigation link
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    // Smooth scroll to section
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Determine if if activeSection has an even index
  const isLightBackground = sections.findIndex(section => section.id === activeSection) % 2 === 0;

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? isLightBackground
            ? 'bg-nord-6/90 py-2 shadow-md backdrop-blur-md dark:bg-nord-0/90'
            : 'bg-nord-5/90 py-2 shadow-md backdrop-blur-md dark:bg-nord-1/90'
          : isLightBackground
            ? 'bg-nord-6/40 py-4 backdrop-blur-sm dark:bg-nord-0/40'
            : 'bg-nord-5/40 py-4 backdrop-blur-sm dark:bg-nord-1/40'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <a
          href="#hero"
          onClick={e => handleNavClick(e, 'hero')}
          className="font-display text-xl font-bold text-frost-darker dark:text-frost-medium"
        >
          tbordenca
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-8 md:flex">
          <ul className="flex space-x-6">
            {sections.map(section => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={e => handleNavClick(e, section.id)}
                  className={`font-medium transition-colors duration-300 ${
                    activeSection === section.id
                      ? 'text-frost-darker dark:text-frost-medium'
                      : 'text-nord-3 hover:text-frost-darker dark:text-nord-4 dark:hover:text-frost-medium'
                  }`}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={toggleTheme}
            className="rounded-full bg-nord-5/80 p-2 text-nord-0 transition-colors duration-300 hover:bg-nord-4 dark:bg-nord-2/80 dark:text-nord-6 dark:hover:bg-nord-3"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={toggleTheme}
            className="mr-2 rounded-full bg-nord-5/80 p-2 text-nord-0 dark:bg-nord-2/80 dark:text-nord-6"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg bg-nord-5/80 p-2 text-nord-0 dark:bg-nord-2/80 dark:text-nord-6"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="bg-nord-6/95 shadow-lg backdrop-blur-md dark:bg-nord-0/95 md:hidden">
          <ul className="space-y-4 px-6 py-4">
            {sections.map(section => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={e => handleNavClick(e, section.id)}
                  className={`block py-2 font-medium ${
                    activeSection === section.id
                      ? 'text-frost-darker dark:text-frost-medium'
                      : 'text-nord-3 dark:text-nord-4'
                  }`}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
