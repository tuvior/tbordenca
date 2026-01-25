"use client";

import type React from "react";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Calendar, Camera, MapPin } from "lucide-react";
import type { Photo } from "../../data/photographyData";
import { withBasePath } from "@/lib/basePath";

type ProjectCardProps = {
  photo: Photo;
  index: number;
};

const PhotoEntry: React.FC<ProjectCardProps> = ({ photo, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInfoShown, setIsInfoShown] = useState(false);
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
    e.stopPropagation();
    if (isMobile) {
      setIsInfoShown(!isInfoShown);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <motion.div
        key={photo.title}
        className="relative cursor-pointer overflow-hidden rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.05 + index * 0.05 }}
        whileHover={{ y: -2, transition: { delay: 0.1 } }}
        onClick={handlePhotoClick}
      >
        <Image
          src={withBasePath(photo.url)}
          alt={photo.title}
          width={photo.width}
          height={photo.height}
          sizes="(max-width: 900px) 100vw, (max-width: 1000px) 50vw, 33vw"
          className="h-auto w-full object-cover"
        />

        <div
          className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-4 text-nord-6 ${
            isMobile && isInfoShown
              ? 'opacity-100'
              : 'opacity-0 transition-all duration-300 ease-in-out hover:opacity-100'
          } `}
        >
          <h3 className="text-lg font-bold text-nord-8">{photo.title}</h3>
          <p className="text-sm">{photo.description}</p>
        </div>
      </motion.div>
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-nord-0/95"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <Image
              src={withBasePath(photo.url)}
              alt={photo.title}
              width={photo.width}
              height={photo.height}
              sizes="90vw"
              className="max-h-[85vh] max-w-[90vw] object-contain"
            />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-black/70 p-4 pt-16 text-nord-6">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-nord-8">{photo.title}</h3>
                    <p className="text-sm">{photo.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 text-nord-5">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-nord-8 opacity-75" />
                      <span className="text-xs opacity-75">{photo.date.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-nord-8 opacity-75" />
                      <span className="text-xs opacity-75">{photo.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Camera className="h-3 w-3 text-nord-8 opacity-75" />
                      <span className="text-xs opacity-75">{photo.camera}</span>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoEntry;
