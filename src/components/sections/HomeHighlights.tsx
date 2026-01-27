import { FileText, Github, Linkedin, Mail, Sparkles, Twitter } from 'lucide-react';
import Link from 'next/link';

import { contactData } from '../../data/contactData';
import { footerData } from '../../data/footerData';
import { profileData } from '../../data/profileData';
import Card from '../ui/Card';
import SectionTitle from '../ui/SectionTitle';

export default function HomeHighlights() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4">
      <SectionTitle
        title="At a Glance"
        subtitle="A compact snapshot of what I do and the easiest ways to connect."
      />

      <div className="grid gap-6 md:grid-cols-3">
        <Card
          title="Focus"
          icon={<Sparkles size={18} />}
          contentClassName="items-center justify-center"
        >
          <div className="flex w-full flex-wrap items-center justify-center gap-3">
            {profileData.focus.map((role, index) => {
              const tagStyles = [
                'rotate-1 scale-[0.98]',
                '-rotate-1 scale-[1.02]',
                'rotate-0 scale-100',
                'rotate-2 scale-[1.03]',
                '-rotate-2 scale-[0.97]',
                'rotate-0 scale-[1.01]',
              ];

              return (
                <span
                  key={role}
                  className={`bg-nord-6/80 text-nord-1 ring-nord-5/40 dark:bg-nord-1 dark:text-nord-5 dark:ring-nord-3/60 inline-flex h-10 items-center rounded-full px-4 text-sm leading-none font-medium shadow-sm ring-1 transition-transform duration-300 hover:-translate-y-0.5 ${
                    tagStyles[index % tagStyles.length]
                  }`}
                >
                  {role}
                </span>
              );
            })}
          </div>
        </Card>

        <Card
          title="Contact"
          icon={<Mail size={18} />}
          className="overflow-hidden"
          contentClassName="items-center justify-center gap-4 text-center"
          decoration={
            <div className="bg-nord-10/10 dark:bg-nord-9/20 pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full blur-2xl" />
          }
          footer={
            <div className="flex items-center justify-end gap-3">
              {footerData.socialLinks.linkedin && (
                <a
                  href={footerData.socialLinks.linkedin}
                  className="text-nord-3 hover:text-nord-10 dark:text-nord-4 dark:hover:text-nord-8 transition-colors duration-300"
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
                  className="text-nord-3 hover:text-nord-10 dark:text-nord-4 dark:hover:text-nord-8 transition-colors duration-300"
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
                  className="text-nord-3 hover:text-nord-10 dark:text-nord-4 dark:hover:text-nord-8 transition-colors duration-300"
                  aria-label="Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter size={18} />
                </a>
              )}
            </div>
          }
        >
          <p className="text-nord-3 dark:text-nord-4">{contactData.message}</p>
          <a
            href={`mailto:${contactData.email}`}
            className="btn btn-secondary inline-flex items-center"
          >
            {contactData.email}
          </a>
        </Card>

        <Card title="Resume" icon={<FileText size={18} />}>
          <p className="text-nord-3 dark:text-nord-4 mb-6">
            Prefer the traditional format? Download the full CV in one click.
          </p>
          <div className="flex justify-center">
            <Link
              href={footerData.resume.url}
              className="btn btn-primary inline-flex items-center gap-2"
              download={footerData.resume.fileName}
            >
              Download CV
              <FileText size={16} />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
