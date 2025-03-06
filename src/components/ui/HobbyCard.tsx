import React from 'react';
import { motion } from 'framer-motion';

type HobbyCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
};

const HobbyCard: React.FC<HobbyCardProps> = ({ title, description, icon, delay = 0 }) => {
  return (
    <motion.div
      className="flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-lg dark:bg-secondary-800"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -5 }}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
        {icon}
      </div>

      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-secondary-600 dark:text-secondary-300">{description}</p>
    </motion.div>
  );
};

export default HobbyCard;
