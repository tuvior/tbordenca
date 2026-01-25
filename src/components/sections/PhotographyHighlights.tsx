'use client';

import type React from 'react';

import { useMemo } from 'react';
import SectionTitle from '../ui/SectionTitle';
import PhotoEntry from '../ui/PhotoEntry';
import { photos } from '../../data/photographyData';

const PhotographyHighlights: React.FC = () => {
  const highlightedPhotos = useMemo(() => {
    return [...photos].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 6);
  }, []);

  return (
    <div className="mx-auto w-full max-w-6xl px-4">
      <SectionTitle
        title="Photography Highlights"
        subtitle="A small, recent selection from my travel and street photography."
      />
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {highlightedPhotos.map((photo, index) => (
          <PhotoEntry key={photo.title} photo={photo} index={index} />
        ))}
      </div>
    </div>
  );
};

export default PhotographyHighlights;
