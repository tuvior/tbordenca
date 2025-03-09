import React from 'react';
import { motion } from 'framer-motion';
import type { Skill } from '../../data/skillsData';
import { Briefcase } from 'lucide-react';

type SkillBadgeProps = {
  skill: Skill;
  isMobile: boolean;
  categoryColor: string;
  delay: number;
};

const buildSkillIcon = (skill: Skill, isMobile: boolean) => {
  const { icon } = skill;
  const size = isMobile ? 20 : 24;
  const sizeClass = isMobile ? 'h-5 w-5' : 'h-6 w-6';

  if (!icon) return <Briefcase size={size} />;

  if (icon.type === 'image') {
    return (
      <div className={`flex ${sizeClass} items-center justify-center`}>
        <img
          src={typeof icon.value === 'string' ? icon.value : ''}
          alt={`${skill.name} logo`}
          className="max-h-full max-w-full object-contain"
        />
      </div>
    );
  }

  const IconComponent = icon.value;
  return <IconComponent size={size} />;
};

const SkillBadge: React.FC<SkillBadgeProps> = ({ skill, isMobile, categoryColor, delay }) => {
  return (
    <motion.div
      key={skill.name}
      className={`flex items-center gap-3 rounded-lg p-3 shadow-md transition-colors duration-300 ${categoryColor}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.3, delay: delay }}
      whileHover={{ scale: 1.05, transition: { delay: 0.1 } }}
      layout
    >
      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center text-sm md:text-base">
        {buildSkillIcon(skill, isMobile)}
      </div>

      <div className="flex flex-col">
        <span className="text-sm font-medium md:text-base">{skill.name}</span>
      </div>
    </motion.div>
  );
};

export default SkillBadge;
