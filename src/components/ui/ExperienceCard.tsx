'use client';

import type React from 'react';

import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  Briefcase,
  Building,
  ExternalLink,
  Info,
  X,
  Link,
  ChevronDown,
} from 'lucide-react';
import { projectsData } from '../../data/projectsData';
import type { Experience } from '../../data/experienceData';
import { withBasePath } from '@/lib/basePath';

type ExperienceCardProps = {
  experience: Experience;
  index: number;
  isExpanded: boolean;
  isMobile: boolean;
  showCompanyInfo: boolean;
  onCardClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onCompanyInfoToggle: (e: React.MouseEvent) => void;
  companyInfoRef: React.RefCallback<HTMLDivElement>;
  infoButtonRef: React.RefCallback<HTMLButtonElement>;
  cardRef: React.RefCallback<HTMLDivElement>;
};

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  index,
  isExpanded,
  isMobile,
  showCompanyInfo,
  onCardClick,
  onMouseEnter,
  onMouseLeave,
  onCompanyInfoToggle,
  companyInfoRef,
  infoButtonRef,
  cardRef,
}) => {
  const relatedProjects = projectsData.filter(project =>
    experience.relatedProjects.includes(project.title)
  );

  const hasExpandableContent = experience.achievements.length > 0 || relatedProjects.length > 0;
  const isLeftAligned = index % 2 === 0;
  const columnClasses = isLeftAligned ? 'md:col-start-1 md:pr-12' : 'md:col-start-2 md:pl-12';
  const connectorClasses = isLeftAligned ? 'md:right-1/2 md:left-auto' : 'md:left-1/2';
  const overlapClasses = isLeftAligned ? '' : 'md:-mt-24';
  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!hasExpandableContent) {
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onCardClick();
    }
  };

  return (
    <div className={`md:mb-12 ${overlapClasses}`}>
      <motion.div
        className="experience-card relative"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        ref={cardRef}
      >
        <div
          aria-hidden="true"
          className="border-nord-10 bg-nord-6 dark:border-nord-7 dark:bg-nord-1 pointer-events-none absolute top-10 left-5 z-10 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 shadow-lg md:left-1/2"
        >
          <span className="bg-nord-10 dark:bg-nord-7 h-2 w-2 rounded-full motion-safe:animate-pulse" />
        </div>
        <div
          aria-hidden="true"
          className={`bg-nord-10/40 dark:bg-nord-7/40 pointer-events-none absolute top-10 left-5 h-px w-8 -translate-y-1/2 md:w-10 ${connectorClasses}`}
        />
        <div className="md:grid md:grid-cols-2 md:items-start">
          <div className={`w-full pl-10 md:pl-0 ${columnClasses}`}>
            <div
              className={`dark:bg-nord-2 rounded-xl bg-white shadow-lg transition-all duration-300 ${
                isMobile && hasExpandableContent ? 'cursor-pointer' : ''
              } ${isExpanded ? 'ring-nord-9 dark:ring-nord-3 ring-2' : 'hover:shadow-xl'}`}
              onClick={hasExpandableContent ? onCardClick : undefined}
              onKeyDown={hasExpandableContent ? handleCardKeyDown : undefined}
              role={hasExpandableContent ? 'button' : undefined}
              tabIndex={hasExpandableContent ? 0 : undefined}
              aria-expanded={hasExpandableContent ? isExpanded : undefined}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              {/* Card Header */}
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-3 flex items-center">
                      <span className="bg-nord-6 text-nord-1 dark:bg-nord-0/30 dark:text-nord-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium md:text-sm">
                        <Calendar size={14} className="mr-1.5" />
                        {experience.period}
                      </span>
                    </div>

                    <h3 className="mb-2 text-2xl font-bold md:text-3xl">{experience.role}</h3>

                    <div className="relative mt-1 flex items-center">
                      <Building size={16} className="text-nord-10 dark:text-nord-9 mr-1.5" />
                      <p className="text-nord-3 dark:text-nord-9 text-base font-medium md:text-lg">
                        {experience.company.name}
                      </p>
                      <button
                        ref={infoButtonRef}
                        onClick={onCompanyInfoToggle}
                        className="text-nord-9 hover:bg-nord-6 hover:text-nord-10 dark:text-secondary-400 dark:hover:bg-nord-3 dark:hover:text-nord-9 ml-2 rounded-full p-1 transition-colors"
                        aria-label="Company info"
                      >
                        <Info size={14} />
                      </button>

                      {/* Company Info Popover */}
                      <AnimatePresence>
                        {showCompanyInfo && (
                          <motion.div
                            ref={companyInfoRef}
                            className="border-nord-5 dark:border-nord-3 dark:bg-nord-2 absolute top-full left-0 z-50 mt-2 w-72 rounded-lg border bg-white shadow-xl md:w-80"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            onClick={e => e.stopPropagation()}
                          >
                            <div className="border-nord-5 dark:border-nord-3 flex items-center justify-between border-b p-4">
                              <h4 className="flex items-center font-semibold">
                                <Building
                                  size={16}
                                  className="text-nord-10 dark:text-nord-9 mr-2"
                                />
                                About {experience.company.name}
                              </h4>
                              <button
                                onClick={onCompanyInfoToggle}
                                className="text-nord-9 hover:text-nord-3 dark:text-secondary-400 dark:hover:text-nord-5"
                              >
                                <X size={16} />
                              </button>
                            </div>
                            <div className="p-4">
                              <p className="text-nord-10 dark:text-nord-4 text-sm">
                                {experience.company.description}
                              </p>
                              <a
                                href={experience.company.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-nord-10 hover:text-nord-3 dark:text-nord-9 dark:hover:text-nord-4 mt-3 inline-flex items-center text-sm font-medium"
                              >
                                Visit company website
                                <ExternalLink size={14} className="ml-1" />
                              </a>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Company Logo */}
                  {experience.company.logo && (
                    <div className="dark:bg-nord-3/30 relative ml-4 h-20 w-20 flex-shrink-0 rounded-lg bg-white p-2 shadow-md md:h-24 md:w-24">
                      <Image
                        src={withBasePath(experience.company.logo)}
                        alt={`${experience.company.name} logo`}
                        fill
                        sizes="96px"
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>

                <p className="text-nord-10 dark:text-nord-4 mt-4">{experience.description}</p>

                {/* Mobile Expand Indicator */}
                {isMobile && hasExpandableContent && !isExpanded && (
                  <div className="mt-4 flex flex-col items-center justify-center">
                    <span className="text-nord-9 dark:text-secondary-400 text-sm">Show more</span>
                    <motion.div
                      animate={{ y: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="bg-nord-6 text-nord-9 dark:bg-nord-2 dark:text-secondary-400 rounded-full"
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </div>
                )}
              </div>

              {/* Expandable Content */}
              <AnimatePresence>
                {isExpanded && hasExpandableContent && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-nord-5 dark:border-nord-3 border-t px-6 pt-4 pb-6">
                      {experience.achievements.length > 0 && (
                        <div className="mb-4">
                          <h4 className="mb-2 flex items-center font-semibold">
                            <Briefcase size={18} className="text-nord-10 dark:text-nord-9 mr-2" />
                            Key Achievements
                          </h4>
                          <ul className="space-y-2 pl-6">
                            {experience.achievements.map((achievement, i) => (
                              <li key={i} className="text-nord-3 dark:text-nord-4 list-disc">
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Related Projects */}
                      {relatedProjects.length > 0 && (
                        <div className="mt-6">
                          <h4 className="mb-3 flex items-center font-semibold">
                            <Link size={16} className="text-nord-10 dark:text-nord-9 mr-2" />
                            Related Projects
                          </h4>
                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {relatedProjects.map((project, i) => (
                              <a
                                key={i}
                                href={`#projects-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                                className="bg-secondary-50 hover:bg-nord-6 dark:bg-nord-2/50 dark:hover:bg-nord-3/50 flex items-center rounded-lg p-3 transition-colors"
                              >
                                <div className="relative mr-3 h-10 w-10 flex-shrink-0 overflow-hidden rounded-md">
                                  {project.image && (
                                    <Image
                                      src={project.image}
                                      alt={project.title}
                                      fill
                                      sizes="40px"
                                      className="object-cover"
                                    />
                                  )}
                                </div>
                                <div>
                                  <h5 className="text-nord-2 dark:text-nord-5 font-medium">
                                    {project.title}
                                  </h5>
                                  <p className="text-nord-9 dark:text-secondary-400 text-xs">
                                    {project.tags.join(', ')}
                                  </p>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ExperienceCard;
