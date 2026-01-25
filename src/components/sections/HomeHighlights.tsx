import React from 'react';
import Link from 'next/link';
import { FileText, Github, Linkedin, Mail, Sparkles, Twitter } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import { contactData } from '../../data/contactData';
import { footerData } from '../../data/footerData';
import { profileData } from '../../data/profileData';

const HomeHighlights: React.FC = () => {
  return (
    <div className="mx-auto w-full max-w-6xl px-4">
      <SectionTitle
        title="At a Glance"
        subtitle="A compact snapshot of what I do and the easiest ways to connect."
      />

      <div className="grid gap-6 md:grid-cols-3">
        <div className="card">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-nord-7/20 text-nord-10 dark:bg-nord-7/10 dark:text-nord-8">
              <Sparkles size={18} />
            </div>
            <h3 className="text-lg font-medium">Focus</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {profileData.focus.map(role => (
              <span key={role} className="skill-badge">
                {role}
              </span>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-nord-7/20 text-nord-10 dark:bg-nord-7/10 dark:text-nord-8">
              <Mail size={18} />
            </div>
            <h3 className="text-lg font-medium">Contact</h3>
          </div>
          <p className="mb-4 text-nord-3 dark:text-nord-4">{contactData.message}</p>
          <a
            href={`mailto:${contactData.email}`}
            className="text-base font-medium text-nord-10 hover:underline dark:text-nord-8"
          >
            {contactData.email}
          </a>
          <div className="mt-4 flex gap-3">
            {footerData.socialLinks.linkedin && (
              <a
                href={footerData.socialLinks.linkedin}
                className="text-nord-3 transition-colors duration-300 hover:text-nord-10 dark:text-nord-4 dark:hover:text-nord-8"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={18} />
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
                <Github size={18} />
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
                <Twitter size={18} />
              </a>
            )}
          </div>
        </div>

        <div className="card">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-nord-7/20 text-nord-10 dark:bg-nord-7/10 dark:text-nord-8">
              <FileText size={18} />
            </div>
            <h3 className="text-lg font-medium">Resume</h3>
          </div>
          <p className="mb-6 text-nord-3 dark:text-nord-4">
            Prefer the traditional format? Download the full CV in one click.
          </p>
          <Link
            href={footerData.resume.url}
            className="btn btn-primary inline-flex items-center gap-2"
            download={footerData.resume.fileName}
          >
            Download CV
            <FileText size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeHighlights;
