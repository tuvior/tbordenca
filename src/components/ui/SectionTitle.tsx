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
        <h2 className="gradient-text relative z-10 text-3xl font-bold md:text-4xl">{title}</h2>

        {/* Decorative underline */}
        <div className="absolute -bottom-2 left-1/2 h-1 w-24 -translate-x-1/2 transform rounded-full bg-gradient-to-r from-frost-darker via-aurora-green to-aurora-purple"></div>
      </motion.div>

      {subtitle && (
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-nord-3 dark:text-nord-4"
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
