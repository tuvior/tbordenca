import React, { useMemo } from 'react';
import SectionTitle from '../ui/SectionTitle';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { photos } from '../../data/photographyData';
import PhotoEntry from '../ui/PhotoEntry';

const PhotographyHighlights: React.FC = () => {
  const highlightedPhotos = useMemo(() => {
    return [...photos]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 6);
  }, []);

  return (
    <div className="mx-auto w-full max-w-6xl px-4">
      <SectionTitle
        title="Photography Highlights"
        subtitle="A small, recent selection from my travel and street photography."
      />
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 900: 2, 1100: 3 }}>
        <Masonry gutter="12px">
          {highlightedPhotos.map((photo, index) => (
            <PhotoEntry key={photo.title} photo={photo} index={index} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default PhotographyHighlights;
