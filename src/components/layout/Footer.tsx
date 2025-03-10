import React from 'react';
import { Github, Linkedin, Mail, Twitter, FileText } from 'lucide-react';
import { footerData } from '../../data/footerData';

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-nord-4 bg-nord-6 py-6 dark:border-nord-3 dark:bg-nord-0">
      <div className="container mx-auto px-4">
        <div className="flex flex-row items-center justify-between">
          <div className="mb-0">
            <a
              href={footerData.resume.url}
              className="flex items-center gap-2 text-nord-3 transition-colors duration-300 hover:text-nord-10 dark:text-nord-4 dark:hover:text-nord-8"
              download={footerData.resume.fileName}
            >
              <FileText size={20} />
              <span className="text-sm font-medium">Download CV</span>
            </a>
          </div>

          <div className="flex space-x-4">
            {footerData.socialLinks.linkedin && (
              <a
                href={footerData.socialLinks.linkedin}
                className="text-nord-3 transition-colors duration-300 hover:text-nord-10 dark:text-nord-4 dark:hover:text-nord-8"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={20} />
              </a>
            )}
            {footerData.socialLinks.github && (
              <a
                href={footerData.socialLinks.github}
                className="text-nord-3 transition-colors duration-300 hover:text-nord-10 dark:text-nord-4 dark:hover:text-nord-8"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={20} />
              </a>
            )}
            {footerData.socialLinks.twitter && (
              <a
                href={footerData.socialLinks.twitter}
                className="text-nord-3 transition-colors duration-300 hover:text-nord-10 dark:text-nord-4 dark:hover:text-nord-8"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={20} />
              </a>
            )}
            {footerData.socialLinks.email && (
              <a
                href={footerData.socialLinks.email}
                className="text-nord-3 transition-colors duration-300 hover:text-nord-10 dark:text-nord-4 dark:hover:text-nord-8"
                aria-label="Email"
                target="_blank"
              >
                <Mail size={20} />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
