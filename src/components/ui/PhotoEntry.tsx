import React, { useState, useEffect } from 'react';
import type { Photo } from '../../data/photographyData';
import { AnimatePresence, motion } from 'framer-motion';

type ProjectCardProps = {
  photo: Photo;
  index: number;
};

const PhotoEntry: React.FC<ProjectCardProps> = ({ photo, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePhotoClick = (e: React.MouseEvent) => {
    if (isMobile) return;

    e.stopPropagation();
    setIsModalOpen(true);
  };

  return (
    <>
      <motion.div
        key={photo.title}
        className="relative cursor-pointer overflow-hidden rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        whileHover={{ y: -2, transition: { delay: 0.1 } }}
        onClick={handlePhotoClick}
      >
        <img src={photo.url} alt={photo.title} className="w-full object-cover" />
        {isMobile ? (
          <AnimatePresence>
            <motion.div
              className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-4 text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div id={`info-${index}`} className="opacity-0 transition-opacity duration-300">
                <h3 className="text-lg font-bold">{photo.title}</h3>
                <p className="text-sm">{photo.description}</p>
                <span className="mt-2 text-xs opacity-75">{photo.category}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-4 text-white opacity-0 transition-all duration-300 ease-in-out hover:opacity-100">
            <h3 className="text-lg font-bold">{photo.title}</h3>
            <p className="text-sm">{photo.description}</p>
            <span className="mt-2 text-xs opacity-75">{photo.category}</span>
          </div>
        )}
      </motion.div>
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <img
              src={photo.url}
              alt={photo.title}
              className="max-h-[85vh] max-w-[90vw] object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-black/40 to-black/60 p-4 text-white">
              <h3 className="text-lg font-bold">{photo.title}</h3>
              <p className="text-sm">{photo.description}</p>
              <span className="mt-2 text-xs opacity-75">{photo.category}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoEntry;
