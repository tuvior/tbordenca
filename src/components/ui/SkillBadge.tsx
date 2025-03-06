import React from 'react';
import { motion } from 'framer-motion';

type SkillBadgeProps = {
  name: string;
  icon?: React.ReactNode;
  delay?: number;
};

const SkillBadge: React.FC<SkillBadgeProps> = ({ 
  name, 
  icon, 
  delay = 0 
}) => {
  return (
    <motion.div
      className="flex items-center bg-white dark:bg-secondary-800 rounded-lg shadow-md p-3 gap-3"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.3, delay: delay }}
      whileHover={{ scale: 1.05 }}
    >
      {icon && (
        <div className="text-primary-500 dark:text-primary-400">
          {icon}
        </div>
      )}
      
      <div className="flex flex-col">
        <span className="font-medium">{name}</span>
      </div>
    </motion.div>
  );
};

export default SkillBadge;