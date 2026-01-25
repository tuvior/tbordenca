'use client';

import type React from 'react';

import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import SectionTitle from '../ui/SectionTitle';
import PhotoEntry from '../ui/PhotoEntry';
import { photos } from '../../data/photographyData';

const Photography: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const allCategories = ['All', ...new Set(photos.map(photo => photo.category))];

  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'All') {
      return photos;
    }
    return photos.filter(photo => photo.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4">
      <SectionTitle
        title="Photography"
        subtitle="A collection of my favorite photos taken over the years."
      />

      <motion.div
        className="mb-1"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center">
          <div className="flex flex-wrap justify-center gap-2">
            {allCategories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-nord-10 hover:bg-nord-9 text-white'
                    : 'text-nord-3 hover:bg-nord-5 dark:bg-nord-1 dark:text-nord-4 dark:hover:bg-nord-2 bg-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="relative h-[calc(100vh-23rem)]">
        <div className="from-nord-6 dark:from-nord-0 absolute inset-x-0 top-0 z-10 h-8 bg-linear-to-b to-transparent" />
        <div className="h-full overflow-y-auto">
          <div className="py-8">
            <div className="grid gap-[1.5px] sm:grid-cols-2 lg:grid-cols-3">
              {filteredPhotos.map((photo, index) => (
                <PhotoEntry key={photo.title} photo={photo} index={index} />
              ))}
            </div>
          </div>
        </div>
        <div className="from-nord-6 dark:from-nord-0 absolute inset-x-0 bottom-0 z-10 h-8 bg-linear-to-t to-transparent" />
      </div>
    </div>
  );
};

export default Photography;
