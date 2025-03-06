import React from 'react';
import { motion } from 'framer-motion';

type HobbyCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
};

const HobbyCard: React.FC<HobbyCardProps> = ({
  title,
  description,
  icon,
  delay = 0,
}) => {
  return (
    <motion.div
      className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg p-6 flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -5 }}
    >
      <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
        {icon}
      </div>
      
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-secondary-600 dark:text-secondary-300">{description}</p>
    </motion.div>
  );
};

export default HobbyCard;