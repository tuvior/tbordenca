import React, { useState, useEffect } from 'react';

type LazyImageProps = {
  src: string;
  alt: string;
  className?: string;
  placeholderColor?: string;
};

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  placeholderColor = '#f3f4f6',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
  }, [src]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: placeholderColor }}
    >
      {isLoaded ? (
        <img
          src={imageSrc}
          alt={alt}
          className={`h-full w-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : (
        <div className="absolute inset-0 flex animate-pulse items-center justify-center bg-secondary-200 dark:bg-secondary-700">
          <span className="sr-only">Loading image: {alt}</span>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
