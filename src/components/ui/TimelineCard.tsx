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
      className={`timeline-card mx-auto w-full max-w-2xl ${isFlipped ? 'flipped' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="timeline-card-inner">
        {/* Front of card */}
        <div className="timeline-card-front bg-white dark:bg-secondary-800">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-bold">{role}</h3>
              <div className="mt-1 flex items-center">
                <p className="font-medium text-primary-600 dark:text-primary-400">{company}</p>
                <button
                  onClick={handleFlip}
                  className="ml-2 text-secondary-500 hover:text-primary-500 dark:text-secondary-400 dark:hover:text-primary-400"
                  aria-label="Company info"
                >
                  <Info size={16} />
                </button>
              </div>
              <p className="mt-1 text-sm text-secondary-500 dark:text-secondary-400">{period}</p>
            </div>

            {logo && (
              <div className="h-16 w-16 flex-shrink-0">
                <img src={logo} alt={`${company} logo`} className="h-full w-full object-contain" />
              </div>
            )}
          </div>

          <p className="mb-4 text-secondary-600 dark:text-secondary-300">{description}</p>

          <div className="mt-4">
            <h4 className="mb-2 font-semibold">Key Achievements:</h4>
            <ul className="space-y-2">
              {achievements.map((achievement, i) => (
                <li key={i} className="flex items-start">
                  <span className="mr-2 mt-2 inline-block h-1.5 w-1.5 rounded-full bg-primary-500 dark:bg-primary-400"></span>
                  <span className="text-secondary-700 dark:text-secondary-300">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-secondary-200 pt-4 dark:border-secondary-700">
            <button
              onClick={onPrev}
              className="rounded-full bg-secondary-100 p-2 text-secondary-700 hover:bg-secondary-200 disabled:opacity-50 dark:bg-secondary-700 dark:text-secondary-300 dark:hover:bg-secondary-600"
              disabled={index === 0}
              aria-label="Previous experience"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="text-sm text-secondary-500 dark:text-secondary-400">
              {index + 1} of {total}
            </div>

            <button
              onClick={onNext}
              className="rounded-full bg-secondary-100 p-2 text-secondary-700 hover:bg-secondary-200 disabled:opacity-50 dark:bg-secondary-700 dark:text-secondary-300 dark:hover:bg-secondary-600"
              disabled={index === total - 1}
              aria-label="Next experience"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Back of card (Company Info) */}
        <div className="timeline-card-back bg-white dark:bg-secondary-800">
          <div className="mb-4 flex items-start justify-between">
            <h3 className="text-xl font-bold">About {company}</h3>
            {logo && (
              <div className="h-16 w-16 flex-shrink-0">
                <img src={logo} alt={`${company} logo`} className="h-full w-full object-contain" />
              </div>
            )}
          </div>

          <p className="text-secondary-600 dark:text-secondary-300">{companyDescription}</p>

          <button onClick={handleFlip} className="btn btn-secondary mt-6 w-full">
            Back to Role Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineCard;
