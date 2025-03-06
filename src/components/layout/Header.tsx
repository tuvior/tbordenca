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
  
  // Determine if the current section has a light background
  const isLightBackground = activeSection === 'hero' || 
                           activeSection === 'skills' || 
                           activeSection === 'education' ||
                           activeSection === 'contact';
  
  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? isLightBackground 
            ? 'bg-nord-6/90 dark:bg-nord-0/90 backdrop-blur-md shadow-md py-2' 
            : 'bg-nord-5/90 dark:bg-nord-1/90 backdrop-blur-md shadow-md py-2'
          : isLightBackground
            ? 'bg-nord-6/40 dark:bg-nord-0/40 backdrop-blur-sm py-4'
            : 'bg-nord-5/40 dark:bg-nord-1/40 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a 
          href="#hero" 
          onClick={(e) => handleNavClick(e, 'hero')}
          className="text-xl font-display font-bold text-frost-darker dark:text-frost-medium"
        >
          tbordenca
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-6">
            {sections.map(section => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={(e) => handleNavClick(e, section.id)}
                  className={`font-medium transition-colors duration-300 ${
                    activeSection === section.id
                      ? 'text-frost-darker dark:text-frost-medium'
                      : 'text-nord-3 dark:text-nord-4 hover:text-frost-darker dark:hover:text-frost-medium'
                  }`}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-nord-5/80 dark:bg-nord-2/80 text-nord-0 dark:text-nord-6 hover:bg-nord-4 dark:hover:bg-nord-3 transition-colors duration-300"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 mr-2 rounded-full bg-nord-5/80 dark:bg-nord-2/80 text-nord-0 dark:text-nord-6"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg bg-nord-5/80 dark:bg-nord-2/80 text-nord-0 dark:text-nord-6"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-nord-6/95 dark:bg-nord-0/95 backdrop-blur-md shadow-lg">
          <ul className="py-4 px-6 space-y-4">
            {sections.map(section => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={(e) => handleNavClick(e, section.id)}
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
