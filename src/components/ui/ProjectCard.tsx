import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';

type ProjectCardProps = {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  link?: string;
  details?: string;
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  tags,
  link,
  details,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  
  const handleCardClick = () => {
    if (details && isMobile) {
      setIsModalOpen(true);
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
        className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg overflow-hidden h-full flex flex-col"
        whileHover={{ y: -5 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.4 }}
        onClick={handleCardClick}
      >
        {image && (
          <div 
            className={`h-48 overflow-hidden ${isMobile ? 'cursor-pointer' : ''}`}
          >
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
            />
          </div>
        )}
        
        <div 
          className={`p-6 flex-grow ${isMobile ? 'cursor-pointer' : ''}`}
        >
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-secondary-600 dark:text-secondary-400 mb-4">{description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <div className="px-6 pb-6 mt-auto flex gap-3">
          {details && (
            <button
              onClick={handleDetailsClick}
              className="btn btn-secondary flex-1"
            >
              View Details
            </button>
          )}
          
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary flex items-center justify-center gap-2 flex-1"
              onClick={(e) => e.stopPropagation()}
            >
              Visit <ExternalLink size={16} />
            </a>
          )}
        </div>
      </motion.div>
      
      {/* Project Details Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div 
            className="bg-white dark:bg-secondary-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-secondary-200 dark:border-secondary-700">
              <h3 className="text-2xl font-bold">{title}</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-200 p-2 rounded-full hover:bg-secondary-100 dark:hover:bg-secondary-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              {image && (
                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-64 object-cover rounded-lg mb-6" 
                />
              )}
              
              <div className="prose dark:prose-invert max-w-none">
                <p>{details}</p>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="text-sm px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-full"
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
};

export default ProjectCard;