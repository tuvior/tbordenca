import React from 'react';
import { motion } from 'framer-motion';
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
          isSelected ? 'ring-2 ring-primary-500 dark:ring-primary-400' : ''
        }`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        whileHover={{ y: -5 }}
        onClick={handleClick}
      >
        {/* Background Image */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70">
          <img
            src={hobby.background}
            alt={hobby.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-500/80 backdrop-blur-sm">
            {React.createElement(hobby.icon, {
              size: 32,
            })}
          </div>
          <h3 className="mb-2 text-2xl font-bold drop-shadow-lg">{hobby.title}</h3>
          <p className="text-white/90  drop-shadow-lg">{hobby.description}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default HobbyCard;
