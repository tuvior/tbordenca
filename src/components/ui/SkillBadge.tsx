'use client';

import { Briefcase, LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import Image, { StaticImageData } from 'next/image';

import type { Skill } from '@/data/skillsData';

type SkillBadgeProps = {
  skill: Skill;
  isMobile: boolean;
  categoryColor: string;
};

const badgeVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

const buildSkillIcon = (skill: Skill, isMobile: boolean) => {
  const { icon } = skill;
  const size = isMobile ? 20 : 24;
  const sizeClass = isMobile ? 'h-5 w-5' : 'h-6 w-6';

  if (!icon) return <Briefcase size={size} />;

  if (icon.type === 'image') {
    return (
      <div className={`flex ${sizeClass} items-center justify-center`}>
        <Image
          src={icon.value as StaticImageData}
          alt={`${skill.name} logo`}
          className="max-h-full max-w-full object-contain"
        />
      </div>
    );
  }

  const IconComponent = icon.value as LucideIcon;
  return <IconComponent size={size} />;
};

export default function SkillBadge({ skill, isMobile, categoryColor }: SkillBadgeProps) {
  return (
    <motion.div
      key={skill.name}
      className={`flex items-center gap-3 rounded-lg p-3 shadow-md transition-colors duration-300 ${categoryColor}`}
      variants={badgeVariants}
      whileHover={{ scale: 1.05, transition: { delay: 0.1 } }}
    >
      <div className="flex h-6 w-6 shrink-0 items-center justify-center text-sm md:text-base">
        {buildSkillIcon(skill, isMobile)}
      </div>

      <div className="flex flex-col">
        <span className="text-sm font-medium md:text-base">{skill.name}</span>
      </div>
    </motion.div>
  );
}
