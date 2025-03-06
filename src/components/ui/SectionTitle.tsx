import React from 'react';
import { motion } from 'framer-motion';

type SectionTitleProps = {
  title: string;
  subtitle?: string;
};

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-12 text-center">
      <motion.div
        className="relative inline-block"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold relative z-10 gradient-text">
          {title}
        </h2>
        
        {/* Decorative underline */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-frost-darker via-aurora-green to-aurora-purple rounded-full"></div>
      </motion.div>
      
      {subtitle && (
        <motion.p
          className="text-nord-3 dark:text-nord-4 mt-6 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionTitle;