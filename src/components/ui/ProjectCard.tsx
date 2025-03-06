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
        className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-lg dark:bg-secondary-800"
        whileHover={{ y: -5 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.4 }}
        onClick={handleCardClick}
      >
        {image && (
          <div className={`h-48 overflow-hidden ${isMobile ? 'cursor-pointer' : ''}`}>
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        )}

        <div className={`flex-grow p-6 ${isMobile ? 'cursor-pointer' : ''}`}>
          <h3 className="mb-2 text-xl font-bold">{title}</h3>
          <p className="mb-4 text-secondary-600 dark:text-secondary-400">{description}</p>

          <div className="mb-4 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-primary-100 px-2 py-1 text-xs text-primary-800 dark:bg-primary-900/30 dark:text-primary-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto flex gap-3 px-6 pb-6">
          {details && (
            <button onClick={handleDetailsClick} className="btn btn-secondary flex-1">
              View Details
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
        >
          <motion.div
            className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl dark:bg-secondary-800"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-secondary-200 p-6 dark:border-secondary-700">
              <h3 className="text-2xl font-bold">{title}</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-2 text-secondary-500 hover:bg-secondary-100 hover:text-secondary-700 dark:text-secondary-400 dark:hover:bg-secondary-700 dark:hover:text-secondary-200"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              {image && (
                <img src={image} alt={title} className="mb-6 h-64 w-full rounded-lg object-cover" />
              )}

              <div className="prose dark:prose-invert max-w-none">
                <p>{details}</p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-primary-100 px-3 py-1 text-sm text-primary-800 dark:bg-primary-900/30 dark:text-primary-300"
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
