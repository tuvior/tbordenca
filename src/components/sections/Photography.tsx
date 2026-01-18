import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import SectionTitle from '../ui/SectionTitle';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { photos } from '../../data/photographyData';
import PhotoEntry from '../ui/PhotoEntry';

const Photography: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [allPhotos, setAllPhotos] = useState(photos);

  const allCategories = ['All', ...new Set(photos.map(photo => photo.category))];

  useEffect(() => {
    const filteredPhotos =
      selectedCategory === 'All'
        ? photos
        : photos.filter(photo => photo.category === selectedCategory);

    setAllPhotos(filteredPhotos);
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
                    ? 'bg-nord-10 text-white hover:bg-nord-9'
                    : 'bg-nord-6 text-nord-3 hover:bg-nord-5 dark:bg-nord-2 dark:text-nord-4 dark:hover:bg-nord-3'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="relative h-[calc(100vh-23rem)]">
        <div className="absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-nord-6 to-transparent dark:from-nord-0" />
        <div className="h-full overflow-y-auto">
          <div className="py-8">
            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 900: 2, 1000: 3 }}>
              <Masonry gutter="1.5px">
                {allPhotos.map((photo, index) => (
                  <PhotoEntry key={photo.title} photo={photo} index={index} />
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 z-10 h-8 bg-gradient-to-t from-nord-6 to-transparent dark:from-nord-0" />
      </div>
    </div>
  );
};

export default Photography;
