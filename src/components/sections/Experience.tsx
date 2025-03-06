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
      return projectsData.filter(project => 
        project.title === 'AI Analytics Dashboard' || 
        project.title === 'E-commerce Personalization Engine'
      );
    }
    
    // For InnovateSoft, always show the Marketing Automation Platform
    if (company === 'InnovateSoft') {
      return projectsData.filter(project => 
        project.title === 'Marketing Automation Platform'
      );
    }
    
    // For GlobalTech Solutions, always show the Mobile Payment Solution
    if (company === 'GlobalTech Solutions') {
      return projectsData.filter(project => 
        project.title === 'Mobile Payment Solution'
      );
    }
    
    // For StartupLaunch, always show the Health Monitoring App
    if (company === 'StartupLaunch') {
      return projectsData.filter(project => 
        project.title === 'Health Monitoring App'
      );
    }
    
    // Fallback to searching in details
    return projectsData.filter(project => 
      project.details && project.details.toLowerCase().includes(company.toLowerCase())
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
    <div className="w-full max-w-6xl mx-auto px-4">
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
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleCardClick(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div 
                className={`bg-white dark:bg-secondary-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${isMobile ? 'cursor-pointer' : ''} ${
                  expandedIndex === index ? 'ring-2 ring-primary-400 dark:ring-primary-600' : 'hover:shadow-xl'
                }`}
              >
                {/* Card Header */}
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 text-sm font-medium">
                          <Calendar size={14} className="mr-1.5" />
                          {experience.period}
                        </span>
                      </div>
                      
                      {/* Enhanced Role Display */}
                      <h3 className="text-2xl md:text-3xl font-bold mb-2">
                        {experience.role}
                      </h3>
                      
                      <div className="flex items-center mt-1 relative">
                        <Building size={16} className="text-primary-500 dark:text-primary-400 mr-1.5" />
                        <p className="text-primary-600 dark:text-primary-400 font-medium text-lg">
                          {experience.company}
                        </p>
                        <button
                          ref={el => infoButtonRefs.current[index] = el}
                          onClick={(e) => toggleCompanyInfo(e, index)}
                          className="ml-2 text-secondary-500 hover:text-primary-500 dark:text-secondary-400 dark:hover:text-primary-400 p-1 rounded-full hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors"
                          aria-label="Company info"
                        >
                          <Info size={14} />
                        </button>
                        
                        {/* Company Info Popover */}
                        <AnimatePresence>
                          {showCompanyInfo === index && (
                            <motion.div
                              ref={el => companyInfoRefs.current[index] = el}
                              className="absolute z-50 top-full left-0 mt-2 w-72 md:w-80 bg-white dark:bg-secondary-800 rounded-lg shadow-xl border border-secondary-200 dark:border-secondary-700"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="flex justify-between items-center p-4 border-b border-secondary-200 dark:border-secondary-700">
                                <h4 className="font-semibold flex items-center">
                                  <Building size={16} className="mr-2 text-primary-500 dark:text-primary-400" />
                                  About {experience.company}
                                </h4>
                                <button
                                  onClick={(e) => toggleCompanyInfo(e, index)}
                                  className="text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-200"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                              <div className="p-4">
                                <p className="text-secondary-600 dark:text-secondary-300 text-sm">
                                  {experience.companyDescription}
                                </p>
                                <a 
                                  href="#" 
                                  className="inline-flex items-center mt-3 text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-medium text-sm"
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
                      <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 ml-4 p-2 bg-white dark:bg-secondary-700/30 rounded-lg shadow-md">
                        <img 
                          src={experience.logo} 
                          alt={`${experience.company} logo`} 
                          className="w-full h-full object-contain" 
                        />
                      </div>
                    )}
                  </div>
                  
                  <p className="text-secondary-600 dark:text-secondary-300 mt-4">
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
                      <div className="px-6 pb-6 border-t border-secondary-200 dark:border-secondary-700 pt-4">
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2 flex items-center">
                            <Briefcase size={16} className="mr-2 text-primary-500 dark:text-primary-400" />
                            Key Achievements
                          </h4>
                          <ul className="space-y-2 pl-6">
                            {experience.achievements.map((achievement, i) => (
                              <li key={i} className="list-disc text-secondary-700 dark:text-secondary-300">
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Related Projects */}
                        {relatedProjects.length > 0 && (
                          <div className="mt-6">
                            <h4 className="font-semibold mb-3 flex items-center">
                              <Link size={16} className="mr-2 text-primary-500 dark:text-primary-400" />
                              Related Projects
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {relatedProjects.map((project, i) => (
                                <a 
                                  key={i}
                                  href={`#projects-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                                  className="flex items-center p-3 bg-secondary-50 dark:bg-secondary-800/50 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700/50 transition-colors"
                                >
                                  <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 mr-3">
                                    {project.image && (
                                      <img 
                                        src={project.image} 
                                        alt={project.title} 
                                        className="w-full h-full object-cover" 
                                      />
                                    )}
                                  </div>
                                  <div>
                                    <h5 className="font-medium text-secondary-800 dark:text-secondary-200">{project.title}</h5>
                                    <p className="text-xs text-secondary-500 dark:text-secondary-400">{project.tags.join(', ')}</p>
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
                <div className="absolute left-1/2 transform -translate-x-1/2 h-6 w-px bg-primary-300 dark:bg-primary-700 bottom-0 translate-y-full"></div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Experience;