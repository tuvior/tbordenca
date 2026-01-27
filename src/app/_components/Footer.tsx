import { Github, Linkedin, Mail, Twitter, FileText } from 'lucide-react';
import Link from 'next/link';

import { footerData } from '@/data/footerData';

export default function Footer() {
  return (
    <footer className="border-nord-4 bg-nord-6 dark:border-nord-3 dark:bg-nord-0 w-full border-t py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-row items-center justify-between">
          <div className="mb-0">
            <Link
              href={footerData.resume.url}
              className="text-nord-3 hover:text-nord-10 dark:text-nord-4 dark:hover:text-nord-8 flex items-center gap-2 transition-colors duration-300"
              download={footerData.resume.fileName}
            >
              <FileText size={20} />
              <span className="text-sm font-medium">Download CV</span>
            </Link>
          </div>

          <div className="flex space-x-4">
            {footerData.socialLinks.linkedin && (
              <a
                href={footerData.socialLinks.linkedin}
                className="text-nord-3 hover:text-nord-10 dark:text-nord-4 dark:hover:text-nord-8 transition-colors duration-300"
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
                className="text-nord-3 hover:text-nord-10 dark:text-nord-4 dark:hover:text-nord-8 transition-colors duration-300"
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
                className="text-nord-3 hover:text-nord-10 dark:text-nord-4 dark:hover:text-nord-8 transition-colors duration-300"
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
                className="text-nord-3 hover:text-nord-10 dark:text-nord-4 dark:hover:text-nord-8 transition-colors duration-300"
                aria-label="Email"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Mail size={20} />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
