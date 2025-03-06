import React from 'react';
import { Github, Linkedin, Mail, Twitter, FileText } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-nord-6 dark:bg-nord-0 py-6 border-t border-nord-4 dark:border-nord-3 w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a
              href="#"
              className="text-nord-3 dark:text-nord-4 hover:text-frost-darker dark:hover:text-frost-medium transition-colors duration-300 flex items-center gap-2"
              download="Alex_Morgan_Resume.pdf"
            >
              <FileText size={20} />
              <span className="text-sm font-medium">Download CV</span>
            </a>
          </div>
          
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-nord-3 dark:text-nord-4 hover:text-frost-darker dark:hover:text-frost-medium transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="#"
              className="text-nord-3 dark:text-nord-4 hover:text-frost-darker dark:hover:text-frost-medium transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="#"
              className="text-nord-3 dark:text-nord-4 hover:text-frost-darker dark:hover:text-frost-medium transition-colors duration-300"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a
              href="mailto:contact@example.com"
              className="text-nord-3 dark:text-nord-4 hover:text-frost-darker dark:hover:text-frost-medium transition-colors duration-300"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;