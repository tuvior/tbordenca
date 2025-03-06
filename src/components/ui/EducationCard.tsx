import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

type EducationCardProps = {
  institution: string;
  degree: string;
  field: string;
  period: string;
  description?: string;
  logo?: string;
  delay?: number;
};

const EducationCard: React.FC<EducationCardProps> = ({
  institution,
  degree,
  field,
  period,
  description,
  logo,
  delay = 0,
}) => {
  return (
    <motion.div
      className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.4, delay }}
    >
      {logo && (
        <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 mx-auto md:mx-0">
          <img src={logo} alt={`${institution} logo`} className="w-full h-full object-contain" />
        </div>
      )}
      
      <div className="flex-1">
        <h3 className="text-xl font-bold">{institution}</h3>
        <h4 className="text-lg font-medium text-primary-600 dark:text-primary-400 mt-1">
          {degree} in {field}
        </h4>
        
        <div className="flex items-center text-secondary-500 dark:text-secondary-400 mt-2">
          <Calendar size={16} className="mr-2" />
          <span>{period}</span>
        </div>
        
        {description && (
          <p className="mt-3 text-secondary-600 dark:text-secondary-300">{description}</p>
        )}
      </div>
    </motion.div>
  );
};

export default EducationCard;