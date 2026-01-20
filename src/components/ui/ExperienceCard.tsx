import React from 'react';
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
  const connectorClasses = isLeftAligned
    ? 'md:right-1/2 md:left-auto'
    : 'md:left-1/2';
  const overlapClasses = isLeftAligned ? '' : 'md:-mt-24';

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
          className="pointer-events-none absolute left-5 top-10 z-10 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-nord-10 bg-nord-6 shadow-lg dark:border-nord-7 dark:bg-nord-1 md:left-1/2"
        >
          <span className="h-2 w-2 rounded-full bg-nord-10 dark:bg-nord-7 motion-safe:animate-pulse" />
        </div>
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute left-5 top-10 h-px w-8 -translate-y-1/2 bg-nord-10/40 dark:bg-nord-7/40 md:w-10 ${connectorClasses}`}
        />
        <div className="md:grid md:grid-cols-2 md:items-start">
          <div className={`w-full pl-10 md:pl-0 ${columnClasses}`}>
            <div
              className={`rounded-xl bg-white shadow-lg transition-all duration-300 dark:bg-nord-2 ${
                isMobile && hasExpandableContent ? 'cursor-pointer' : ''
              } ${isExpanded ? 'ring-2 ring-nord-9 dark:ring-nord-3' : 'hover:shadow-xl'}`}
              onClick={hasExpandableContent ? onCardClick : undefined}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              {/* Card Header */}
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-3 flex items-center">
                      <span className="inline-flex items-center rounded-full bg-nord-6 px-3 py-1 text-xs font-medium text-nord-1 dark:bg-nord-0/30 dark:text-nord-4 md:text-sm">
                        <Calendar size={14} className="mr-1.5" />
                        {experience.period}
                      </span>
                    </div>

                    <h3 className="mb-2 text-2xl font-bold md:text-3xl">{experience.role}</h3>

                    <div className="relative mt-1 flex items-center">
                      <Building size={16} className="mr-1.5 text-nord-10 dark:text-nord-9" />
                      <p className="text-base font-medium text-nord-3 dark:text-nord-9 md:text-lg">
                        {experience.company.name}
                      </p>
                      <button
                        ref={infoButtonRef}
                        onClick={onCompanyInfoToggle}
                        className="ml-2 rounded-full p-1 text-nord-9 transition-colors hover:bg-nord-6 hover:text-nord-10 dark:text-secondary-400 dark:hover:bg-nord-3 dark:hover:text-nord-9"
                        aria-label="Company info"
                      >
                        <Info size={14} />
                      </button>

                      {/* Company Info Popover */}
                      <AnimatePresence>
                        {showCompanyInfo && (
                          <motion.div
                            ref={companyInfoRef}
                            className="absolute left-0 top-full z-50 mt-2 w-72 rounded-lg border border-nord-5 bg-white shadow-xl dark:border-nord-3 dark:bg-nord-2 md:w-80"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            onClick={e => e.stopPropagation()}
                          >
                            <div className="flex items-center justify-between border-b border-nord-5 p-4 dark:border-nord-3">
                              <h4 className="flex items-center font-semibold">
                                <Building size={16} className="mr-2 text-nord-10 dark:text-nord-9" />
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
                              <p className="text-sm text-nord-10 dark:text-nord-4">
                                {experience.company.description}
                              </p>
                              <a
                                href={experience.company.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3 inline-flex items-center text-sm font-medium text-nord-10 hover:text-nord-3 dark:text-nord-9 dark:hover:text-nord-4"
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
                    <div className="ml-4 h-20 w-20 flex-shrink-0 rounded-lg bg-white p-2 shadow-md dark:bg-nord-3/30 md:h-24 md:w-24">
                      <img
                        src={experience.company.logo}
                        alt={`${experience.company.name} logo`}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  )}
                </div>

                <p className="mt-4 text-nord-10 dark:text-nord-4">{experience.description}</p>

                {/* Mobile Expand Indicator */}
                {isMobile && hasExpandableContent && !isExpanded && (
                  <div className="mt-4 flex flex-col items-center justify-center">
                    <span className="text-sm text-nord-9 dark:text-secondary-400">Show more</span>
                    <motion.div
                      animate={{ y: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="rounded-full bg-nord-6 text-nord-9 dark:bg-nord-2 dark:text-secondary-400"
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
                    <div className="border-t border-nord-5 px-6 pb-6 pt-4 dark:border-nord-3">
                      {experience.achievements.length > 0 && (
                        <div className="mb-4">
                          <h4 className="mb-2 flex items-center font-semibold">
                            <Briefcase size={18} className="mr-2 text-nord-10 dark:text-nord-9" />
                            Key Achievements
                          </h4>
                          <ul className="space-y-2 pl-6">
                            {experience.achievements.map((achievement, i) => (
                              <li key={i} className="list-disc text-nord-3 dark:text-nord-4">
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
                            <Link size={16} className="mr-2 text-nord-10 dark:text-nord-9" />
                            Related Projects
                          </h4>
                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {relatedProjects.map((project, i) => (
                              <a
                                key={i}
                                href={`#projects-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                                className="flex items-center rounded-lg bg-secondary-50 p-3 transition-colors hover:bg-nord-6 dark:bg-nord-2/50 dark:hover:bg-nord-3/50"
                              >
                                <div className="mr-3 h-10 w-10 flex-shrink-0 overflow-hidden rounded-md">
                                  {project.image && (
                                    <img
                                      src={project.image}
                                      alt={project.title}
                                      className="h-full w-full object-cover"
                                    />
                                  )}
                                </div>
                                <div>
                                  <h5 className="font-medium text-nord-2 dark:text-nord-5">
                                    {project.title}
                                  </h5>
                                  <p className="text-xs text-nord-9 dark:text-secondary-400">
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
