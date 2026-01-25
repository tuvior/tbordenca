"use client";

import type React from "react";

import { Globe } from "lucide-react";
import { motion } from "motion/react";
import type { Language } from "../../data/profileData";

type LanguagesCardProps = {
  languages: Language[];
};

const getProficiencyColor = (proficiency: number): string => {
    switch (true) {
        case proficiency >= 80:
            return 'bg-nord-14';
        case proficiency >= 60:
            return 'bg-nord-14/70';
        case proficiency >= 40:
            return 'bg-nord-14/40';
        default:
            return 'bg-nord-14';
    }
};

const LanguagesCard: React.FC<LanguagesCardProps> = ({ languages }) => {
  return (
    <motion.div
      className="mb-0 max-w-md md:mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <div className="rounded-xl border border-nord-4 bg-nord-6 p-4 shadow-md dark:border-nord-3 dark:bg-nord-1">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-nord-7/20 text-nord-10 dark:bg-nord-7/10 dark:text-nord-8">
            <Globe size={18} />
          </div>
          <h3 className="text-lg font-medium">Languages</h3>
        </div>
        <div className="space-y-4">
          {languages.map((language, index) => (
            <div key={index}>
              <div className="mb-1 flex justify-between">
                <span className="text-sm font-medium">{language.name}</span>
                <span className="text-xs text-nord-3 dark:text-nord-4">{language.level}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-nord-4 dark:bg-nord-3">
                <div
                  className={`h-full rounded-full ${getProficiencyColor(language.proficiency)}`}
                  style={{ width: `${language.proficiency}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LanguagesCard;
