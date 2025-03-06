import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Briefcase, Building, ExternalLink, Info, X, Link } from 'lucide-react';
import { projectsData } from '../../data/projectsData';

type ExperienceCardProps = {
  experience: {
    company: string;
    role: string;
    period: string;
    description: string;
    achievements: string[];
    companyDescription: string;
    logo?: string;
    relatedProjects: string[];
  };
  index: number;
  totalCards: number;
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
  totalCards,
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

  return (
    <motion.div
      className="experience-card relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onCardClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={cardRef}
    >
      <div
        className={`overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 dark:bg-secondary-800 ${
          isMobile ? 'cursor-pointer' : ''
        } ${isExpanded ? 'ring-2 ring-primary-400 dark:ring-primary-600' : 'hover:shadow-xl'}`}
      >
        {/* Card Header */}
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="mb-3 flex items-center">
                <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800 dark:bg-primary-900/30 dark:text-primary-300">
                  <Calendar size={14} className="mr-1.5" />
                  {experience.period}
                </span>
              </div>

              <h3 className="mb-2 text-2xl font-bold md:text-3xl">{experience.role}</h3>

              <div className="relative mt-1 flex items-center">
                <Building size={16} className="mr-1.5 text-primary-500 dark:text-primary-400" />
                <p className="text-lg font-medium text-primary-600 dark:text-primary-400">
                  {experience.company}
                </p>
                <button
                  ref={infoButtonRef}
                  onClick={onCompanyInfoToggle}
                  className="ml-2 rounded-full p-1 text-secondary-500 transition-colors hover:bg-secondary-100 hover:text-primary-500 dark:text-secondary-400 dark:hover:bg-secondary-700 dark:hover:text-primary-400"
                  aria-label="Company info"
                >
                  <Info size={14} />
                </button>

                {/* Company Info Popover */}
                <AnimatePresence>
                  {showCompanyInfo && (
                    <motion.div
                      ref={companyInfoRef}
                      className="absolute left-0 top-full z-50 mt-2 w-72 rounded-lg border border-secondary-200 bg-white shadow-xl dark:border-secondary-700 dark:bg-secondary-800 md:w-80"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      onClick={e => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-between border-b border-secondary-200 p-4 dark:border-secondary-700">
                        <h4 className="flex items-center font-semibold">
                          <Building size={16} className="mr-2 text-primary-500 dark:text-primary-400" />
                          About {experience.company}
                        </h4>
                        <button
                          onClick={onCompanyInfoToggle}
                          className="text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-200"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-secondary-600 dark:text-secondary-300">
                          {experience.companyDescription}
                        </p>
                        <a
                          href="#"
                          className="mt-3 inline-flex items-center text-sm font-medium text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
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
            {experience.logo && (
              <div className="ml-4 h-20 w-20 flex-shrink-0 rounded-lg bg-white p-2 shadow-md dark:bg-secondary-700/30 md:h-24 md:w-24">
                <img
                  src={experience.logo}
                  alt={`${experience.company} logo`}
                  className="h-full w-full object-contain"
                />
              </div>
            )}
          </div>

          <p className="mt-4 text-secondary-600 dark:text-secondary-300">{experience.description}</p>
        </div>

        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="border-t border-secondary-200 px-6 pb-6 pt-4 dark:border-secondary-700">
                <div className="mb-4">
                  <h4 className="mb-2 flex items-center font-semibold">
                    <Briefcase size={16} className="mr-2 text-primary-500 dark:text-primary-400" />
                    Key Achievements
                  </h4>
                  <ul className="space-y-2 pl-6">
                    {experience.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="list-disc text-secondary-700 dark:text-secondary-300"
                      >
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Related Projects */}
                {relatedProjects.length > 0 && (
                  <div className="mt-6">
                    <h4 className="mb-3 flex items-center font-semibold">
                      <Link size={16} className="mr-2 text-primary-500 dark:text-primary-400" />
                      Related Projects
                    </h4>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {relatedProjects.map((project, i) => (
                        <a
                          key={i}
                          href={`#projects-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                          className="flex items-center rounded-lg bg-secondary-50 p-3 transition-colors hover:bg-secondary-100 dark:bg-secondary-800/50 dark:hover:bg-secondary-700/50"
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
                            <h5 className="font-medium text-secondary-800 dark:text-secondary-200">
                              {project.title}
                            </h5>
                            <p className="text-xs text-secondary-500 dark:text-secondary-400">
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

      {/* Timeline connector with enhanced visibility */}
      {index < totalCards - 1 && (
        <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-full transform flex-col items-center">
          <div className="h-2 w-2 rounded-full bg-aurora-purple"></div>
          <div className="h-6 w-1 bg-gradient-to-b from-aurora-purple to-frost-darker dark:to-frost-medium"></div>
        </div>
      )}
    </motion.div>
  );
};

export default ExperienceCard;
