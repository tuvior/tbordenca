import React from 'react';
import { motion } from 'framer-motion';
import type { Skill, SkillIcon } from '../../data/skillsData';
import { Briefcase } from 'lucide-react';

type SkillBadgeProps = {
  skill: Skill;
  delay: number;
};

// Function to get the appropriate icon or logo for a skill
const buildSkillIcon = (skill: { name: string; icon: SkillIcon }) => {
  const icon = skill.icon;
  if (!icon) return <Briefcase size={24} />;

  if (icon.type === 'image') {
    return (
      <div className="flex h-6 w-6 items-center justify-center">
        <img
          src={typeof icon.value === 'string' ? icon.value : ''}
          alt={`${skill.name} logo`}
          className="max-h-full max-w-full object-contain"
        />
      </div>
    );
  } else {
    const IconComponent = icon.value;
    return <IconComponent size={24} />;
  }
};

const SkillBadge: React.FC<SkillBadgeProps> = ({ skill, delay }) => {
  return (
    <motion.div
      key={skill.name}
      className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-md dark:bg-secondary-800"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.3, delay: delay }}
      whileHover={{ scale: 1.05 }}
      layout
    >
      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center text-primary-500 dark:text-primary-400">
        {buildSkillIcon(skill)}
      </div>

      <div className="flex flex-col">
        <span className="text-sm font-medium md:text-base">{skill.name}</span>
      </div>
    </motion.div>
  );
};

export default SkillBadge;
