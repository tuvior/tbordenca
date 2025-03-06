import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Info, ChevronLeft, ChevronRight } from 'lucide-react';

type TimelineCardProps = {
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  companyDescription: string;
  logo?: string;
  index: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
};

const TimelineCard: React.FC<TimelineCardProps> = ({
  company,
  role,
  period,
  description,
  achievements,
  companyDescription,
  logo,
  index,
  total,
  onNext,
  onPrev,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };
  
  return (
    <motion.div
      className={`timeline-card w-full max-w-2xl mx-auto ${isFlipped ? 'flipped' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="timeline-card-inner">
        {/* Front of card */}
        <div className="timeline-card-front bg-white dark:bg-secondary-800">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold">{role}</h3>
              <div className="flex items-center mt-1">
                <p className="text-primary-600 dark:text-primary-400 font-medium">{company}</p>
                <button
                  onClick={handleFlip}
                  className="ml-2 text-secondary-500 hover:text-primary-500 dark:text-secondary-400 dark:hover:text-primary-400"
                  aria-label="Company info"
                >
                  <Info size={16} />
                </button>
              </div>
              <p className="text-secondary-500 dark:text-secondary-400 text-sm mt-1">{period}</p>
            </div>
            
            {logo && (
              <div className="w-16 h-16 flex-shrink-0">
                <img src={logo} alt={`${company} logo`} className="w-full h-full object-contain" />
              </div>
            )}
          </div>
          
          <p className="text-secondary-600 dark:text-secondary-300 mb-4">{description}</p>
          
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Key Achievements:</h4>
            <ul className="space-y-2">
              {achievements.map((achievement, i) => (
                <li key={i} className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-500 dark:bg-primary-400 mt-2 mr-2"></span>
                  <span className="text-secondary-700 dark:text-secondary-300">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-secondary-200 dark:border-secondary-700">
            <button
              onClick={onPrev}
              className="p-2 rounded-full bg-secondary-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-600 disabled:opacity-50"
              disabled={index === 0}
              aria-label="Previous experience"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="text-secondary-500 dark:text-secondary-400 text-sm">
              {index + 1} of {total}
            </div>
            
            <button
              onClick={onNext}
              className="p-2 rounded-full bg-secondary-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-600 disabled:opacity-50"
              disabled={index === total - 1}
              aria-label="Next experience"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        {/* Back of card (Company Info) */}
        <div className="timeline-card-back bg-white dark:bg-secondary-800">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold">About {company}</h3>
            {logo && (
              <div className="w-16 h-16 flex-shrink-0">
                <img src={logo} alt={`${company} logo`} className="w-full h-full object-contain" />
              </div>
            )}
          </div>
          
          <p className="text-secondary-600 dark:text-secondary-300">{companyDescription}</p>
          
          <button
            onClick={handleFlip}
            className="mt-6 btn btn-secondary w-full"
          >
            Back to Role Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineCard;