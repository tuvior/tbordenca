'use client';

import { motion } from 'motion/react';

type SectionTitleProps = {
  title: string;
  subtitle?: string;
};

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-12 text-center">
      <motion.div
        className="relative inline-block"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="gradient-text relative z-10 text-3xl font-bold md:text-4xl">{title}</h2>

        {/* Decorative underline */}
        <div className="from-nord-10 via-nord-14 to-nord-15 absolute -bottom-2 left-1/2 h-1 w-36 -translate-x-1/2 transform rounded-full bg-linear-to-r"></div>
      </motion.div>

      {subtitle && (
        <motion.p
          className="text-nord-3 dark:text-nord-4 mx-auto mt-6 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
