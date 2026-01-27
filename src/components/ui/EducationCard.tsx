'use client';

import { Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import Image, { StaticImageData } from 'next/image';

type EducationCardProps = {
  institution: string;
  degree: string;
  field: string;
  period: string;
  description?: string;
  logo?: StaticImageData;
  delay?: number;
};

export default function EducationCard({
  institution,
  degree,
  field,
  period,
  description,
  logo,
  delay = 0,
}: EducationCardProps) {
  return (
    <motion.div
      className="dark:bg-nord-2 flex flex-col gap-4 rounded-xl bg-white p-6 shadow-lg md:flex-row"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
    >
      {logo && (
        <div className="dark:bg-nord-3/30 relative ml-4 flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-white p-2 shadow-md md:h-20 md:w-20">
          <Image
            src={logo}
            alt={`${institution} logo`}
            style={{ objectFit: 'contain' }}
            sizes="80px"
          />
        </div>
      )}

      <div className="flex-1">
        <h3 className="text-xl font-bold">{institution}</h3>
        <h4 className="text-nord-3 dark:text-nord-9 mt-1 text-lg font-medium">
          {degree} in {field}
        </h4>

        <div className="text-nord-9 dark:text-secondary-400 mt-2 flex items-center">
          <Calendar size={16} className="mr-2" />
          <span>{period}</span>
        </div>

        {description && <p className="text-nord-10 dark:text-nord-4 mt-3">{description}</p>}
      </div>
    </motion.div>
  );
}
