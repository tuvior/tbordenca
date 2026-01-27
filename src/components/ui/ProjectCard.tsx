'use client';

import type React from 'react';
import { useEffect, useState } from 'react';

import { Briefcase, Code2, ExternalLink, X } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';

import withBasePath from '@/lib/basePath';

type ProjectCardProps = {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  link?: string;
  details?: string;
  type?: 'product' | 'development';
};

export default function ProjectCard({
  title,
  description,
  image,
  tags,
  link,
  details,
  type,
}: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isCardInteractive = Boolean(details && isMobile);
  const typeMeta =
    type === 'product'
      ? { label: 'Product', Icon: Briefcase }
      : type === 'development'
        ? { label: 'Development', Icon: Code2 }
        : null;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCardClick = () => {
    if (details && isMobile) {
      setIsModalOpen(true);
    }
  };

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isCardInteractive) {
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick();
    }
  };

  const handleDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (details) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <motion.div
        className="dark:bg-nord-2 flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-lg"
        whileHover={{ y: -5 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        onClick={isCardInteractive ? handleCardClick : undefined}
        onKeyDown={isCardInteractive ? handleCardKeyDown : undefined}
        role={isCardInteractive ? 'button' : undefined}
        tabIndex={isCardInteractive ? 0 : undefined}
        aria-expanded={isCardInteractive ? isModalOpen : undefined}
      >
        {image && (
          <div
            className={`relative h-48 overflow-hidden ${isCardInteractive ? 'cursor-pointer' : ''}`}
          >
            <Image
              src={withBasePath(image)}
              alt={title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        )}

        <div className={`grow p-6 ${isCardInteractive ? 'cursor-pointer' : ''}`}>
          <div className="mb-2 flex items-center justify-between gap-2">
            <h3 className="text-xl font-bold">{title}</h3>
            {typeMeta && (
              <span className="bg-nord-6 text-nord-1 dark:bg-nord-0/30 dark:text-nord-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium">
                <typeMeta.Icon size={14} />
                {typeMeta.label}
              </span>
            )}
          </div>
          <p className="text-nord-10 dark:text-secondary-400 mb-4">{description}</p>

          <div className="mb-4 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-nord-6 text-nord-1 dark:bg-nord-0/30 dark:text-nord-4 rounded-full px-2 py-1 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto flex gap-3 px-6 pb-6">
          {details && (
            <button onClick={handleDetailsClick} className="btn btn-secondary flex-1">
              {isMobile ? 'View' : 'View Details'}
            </button>
          )}

          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary flex flex-1 items-center justify-center gap-2"
              onClick={e => e.stopPropagation()}
            >
              Visit <ExternalLink size={16} />
            </a>
          )}
        </div>
      </motion.div>

      {/* Project Details Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setIsModalOpen(false)}
          onKeyDown={event => {
            if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setIsModalOpen(false);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Close project details"
        >
          <motion.div
            className="dark:bg-nord-2 max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="border-nord-5 dark:border-nord-3 flex items-center justify-between border-b p-6">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-bold">{title}</h3>
                {typeMeta && (
                  <span className="bg-nord-6 text-nord-1 dark:bg-nord-0/30 dark:text-nord-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium">
                    <typeMeta.Icon size={14} />
                    {typeMeta.label}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-nord-9 hover:bg-nord-6 hover:text-nord-3 dark:text-secondary-400 dark:hover:bg-nord-3 dark:hover:text-nord-5 rounded-full p-2"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              {image && (
                <div className="relative mb-6 h-64 w-full overflow-hidden rounded-lg">
                  <Image
                    src={withBasePath(image)}
                    alt={title}
                    fill
                    sizes="(min-width: 1024px) 60vw, 90vw"
                    className="object-cover"
                  />
                </div>
              )}

              <div className="prose dark:prose-invert max-w-none">
                <p>{details}</p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-nord-6 text-nord-1 dark:bg-nord-0/30 dark:text-nord-4 rounded-full px-3 py-1 text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {link && (
                <div className="mt-6">
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary inline-flex items-center gap-2"
                  >
                    Visit Project <ExternalLink size={16} />
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
