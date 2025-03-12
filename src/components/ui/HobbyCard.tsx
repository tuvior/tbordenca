import React from 'react';
import { motion } from 'motion/react';
import type { Hobby } from '../../data/hobbiesData';

type HobbyCardProps = {
  hobby: Hobby;
  handleClick: () => void;
  isSelected: boolean;
  index: number;
};

const HobbyCard: React.FC<HobbyCardProps> = ({ hobby, handleClick, isSelected, index }) => {
  return (
    <div key={hobby.title} className={`w-full flex-shrink-0 snap-center p-3 md:w-1/3`}>
      <motion.div
        className={`group relative h-80 overflow-hidden rounded-xl shadow-lg ${
          isSelected ? 'ring-2 ring-nord-10 dark:ring-nord-9' : ''
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
          <img
            src={hobby.background}
            alt={hobby.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <div className="absolute left-6 top-6 flex h-14 w-14 items-center justify-center rounded-full bg-nord-10/80 backdrop-blur-sm">
            {React.createElement(hobby.icon, { size: 32 })}
          </div>
          <h3 className="mb-2 text-xl font-bold text-nord-4 drop-shadow-lg">{hobby.title}</h3>
          <p className="text-base text-nord-6/85 drop-shadow-lg">{hobby.description}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default HobbyCard;
