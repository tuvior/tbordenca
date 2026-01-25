'use client';

import Image from 'next/image';
import React from 'react';
import { motion } from 'motion/react';
import type { Hobby } from '../../data/hobbiesData';
import { withBasePath } from '@/lib/basePath';

type HobbyCardProps = {
  hobby: Hobby;
  handleClick: () => void;
  isSelected: boolean;
  index: number;
};

const HobbyCard: React.FC<HobbyCardProps> = ({ hobby, handleClick, isSelected, index }) => {
  return (
    <div key={hobby.title} className={`w-full shrink-0 snap-center p-3 md:w-1/3`}>
      <motion.div
        className={`group relative h-80 overflow-hidden rounded-xl shadow-lg ${
          isSelected ? 'ring-nord-10 dark:ring-nord-9 ring-2' : ''
        }`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        whileHover={{ y: -5 }}
        onClick={handleClick}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={withBasePath(hobby.background)}
            alt={hobby.title}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/80 via-black/40 to-transparent p-6">
          <div className="bg-nord-10/80 absolute top-6 left-6 flex h-14 w-14 items-center justify-center rounded-full backdrop-blur-sm">
            {React.createElement(hobby.icon, { size: 32 })}
          </div>
          <h3 className="text-nord-4 mb-2 text-xl font-bold drop-shadow-lg">{hobby.title}</h3>
          <p className="text-nord-6/85 text-base drop-shadow-lg">{hobby.description}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default HobbyCard;
