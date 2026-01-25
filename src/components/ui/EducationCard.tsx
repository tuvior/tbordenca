"use client";

import type React from "react";

import Image from "next/image";
import { motion } from "motion/react";
import { Calendar } from "lucide-react";
import { withBasePath } from "@/lib/basePath";

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
      className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-lg dark:bg-nord-2 md:flex-row"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
    >
      {logo && (
        <div className="relative mx-auto h-16 w-16 flex-shrink-0 md:mx-0 md:h-20 md:w-20">
          <Image
            src={withBasePath(logo)}
            alt={`${institution} logo`}
            fill
            sizes="80px"
            className="object-contain"
          />
        </div>
      )}

      <div className="flex-1">
        <h3 className="text-xl font-bold">{institution}</h3>
        <h4 className="mt-1 text-lg font-medium text-nord-3 dark:text-nord-9">
          {degree} in {field}
        </h4>

        <div className="mt-2 flex items-center text-nord-9 dark:text-secondary-400">
          <Calendar size={16} className="mr-2" />
          <span>{period}</span>
        </div>

        {description && <p className="mt-3 text-nord-10 dark:text-nord-4">{description}</p>}
      </div>
    </motion.div>
  );
};

export default EducationCard;
