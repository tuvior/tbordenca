import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import { experienceData } from '../../data/experienceData';
import { projectsData } from '../../data/projectsData';
import { Calendar, Briefcase, Building, ExternalLink, Info, X, Link } from 'lucide-react';

const Experience: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [showCompanyInfo, setShowCompanyInfo] = useState<number | null>(null);
  const companyInfoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const infoButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const experienceSectionRef = useRef<HTMLDivElement>(null);

  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle click outside of company info popover
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showCompanyInfo !== null) {
        const infoRef = companyInfoRefs.current[showCompanyInfo];
        const buttonRef = infoButtonRefs.current[showCompanyInfo];

        if (
          infoRef &&
          !infoRef.contains(event.target as Node) &&
          buttonRef &&
          !buttonRef.contains(event.target as Node)
        ) {
          setShowCompanyInfo(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCompanyInfo]);

  // Toggle company info popover
  const toggleCompanyInfo = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setShowCompanyInfo(showCompanyInfo === index ? null : index);
  };

  // Find related projects for a company
  const getRelatedProjects = (company: string) => {
    // For TechVision Inc., always show the AI Analytics Dashboard project
    if (company === 'TechVision Inc.') {
      return projectsData.filter(
        project =>
          project.title === 'AI Analytics Dashboard' ||
          project.title === 'E-commerce Personalization Engine'
      );
    }

    // For InnovateSoft, always show the Marketing Automation Platform
    if (company === 'InnovateSoft') {
      return projectsData.filter(project => project.title === 'Marketing Automation Platform');
    }

    // For GlobalTech Solutions, always show the Mobile Payment Solution
    if (company === 'GlobalTech Solutions') {
      return projectsData.filter(project => project.title === 'Mobile Payment Solution');
    }

    // For StartupLaunch, always show the Health Monitoring App
    if (company === 'StartupLaunch') {
      return projectsData.filter(project => project.title === 'Health Monitoring App');
    }

    // Fallback to searching in details
    return projectsData.filter(
      project => project.details && project.details.toLowerCase().includes(company.toLowerCase())
    );
  };

  // Handle card click for touch interfaces
  const handleCardClick = (index: number) => {
    if (isMobile) {
      setExpandedIndex(expandedIndex === index ? null : index);
    }
  };

  // Handle mouse enter for desktop
  const handleMouseEnter = (index: number) => {
    if (!isMobile) {
      setExpandedIndex(index);
    }
  };

  // Handle mouse leave for desktop
  const handleMouseLeave = () => {
    if (!isMobile) {
      // Optional: uncomment the line below if you want cards to collapse on mouse leave
      // setExpandedIndex(null);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4" ref={experienceSectionRef}>
      <SectionTitle
        title="Professional Experience"
        subtitle="My journey through product management roles and the impact I've made along the way."
      />

      <div className="space-y-6">
        {experienceData.map((experience, index) => {
          const relatedProjects = getRelatedProjects(experience.company);

          return (
            <motion.div
              key={index}
              className="experience-card relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleCardClick(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={`overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 dark:bg-secondary-800 ${isMobile ? 'cursor-pointer' : ''} ${
                  expandedIndex === index
                    ? 'ring-2 ring-primary-400 dark:ring-primary-600'
                    : 'hover:shadow-xl'
                }`}
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

                      {/* Enhanced Role Display */}
                      <h3 className="mb-2 text-2xl font-bold md:text-3xl">{experience.role}</h3>

                      <div className="relative mt-1 flex items-center">
                        <Building
                          size={16}
                          className="mr-1.5 text-primary-500 dark:text-primary-400"
                        />
                        <p className="text-lg font-medium text-primary-600 dark:text-primary-400">
                          {experience.company}
                        </p>
                        <button
                          ref={el => (infoButtonRefs.current[index] = el)}
                          onClick={e => toggleCompanyInfo(e, index)}
                          className="ml-2 rounded-full p-1 text-secondary-500 transition-colors hover:bg-secondary-100 hover:text-primary-500 dark:text-secondary-400 dark:hover:bg-secondary-700 dark:hover:text-primary-400"
                          aria-label="Company info"
                        >
                          <Info size={14} />
                        </button>

                        {/* Company Info Popover */}
                        <AnimatePresence>
                          {showCompanyInfo === index && (
                            <motion.div
                              ref={el => (companyInfoRefs.current[index] = el)}
                              className="absolute left-0 top-full z-50 mt-2 w-72 rounded-lg border border-secondary-200 bg-white shadow-xl dark:border-secondary-700 dark:bg-secondary-800 md:w-80"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                              onClick={e => e.stopPropagation()}
                            >
                              <div className="flex items-center justify-between border-b border-secondary-200 p-4 dark:border-secondary-700">
                                <h4 className="flex items-center font-semibold">
                                  <Building
                                    size={16}
                                    className="mr-2 text-primary-500 dark:text-primary-400"
                                  />
                                  About {experience.company}
                                </h4>
                                <button
                                  onClick={e => toggleCompanyInfo(e, index)}
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

                    {/* Enhanced Company Logo */}
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

                  <p className="mt-4 text-secondary-600 dark:text-secondary-300">
                    {experience.description}
                  </p>
                </div>

                {/* Expandable Content */}
                <AnimatePresence>
                  {expandedIndex === index && (
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
                            <Briefcase
                              size={16}
                              className="mr-2 text-primary-500 dark:text-primary-400"
                            />
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
                              <Link
                                size={16}
                                className="mr-2 text-primary-500 dark:text-primary-400"
                              />
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

              {/* Timeline connector (only if not the last item) */}
              {index < experienceData.length - 1 && (
                <div className="absolute bottom-0 left-1/2 h-6 w-px -translate-x-1/2 translate-y-full transform bg-primary-300 dark:bg-primary-700"></div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Experience;
