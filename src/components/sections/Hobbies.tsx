import React, { useState, useEffect, useRef } from 'react';
import SectionTitle from '../ui/SectionTitle';
import HobbyCard from '../ui/HobbyCard';
import { hobbiesData } from '../../data/hobbiesData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hobbies: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex(prevIndex => (prevIndex + 1) % hobbiesData.length);
      }, 5000);
    };

    startAutoPlay();

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, []);

  // Reset auto-play when active index changes
  useEffect(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    autoPlayRef.current = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % hobbiesData.length);
    }, 5000);

    // Scroll to active card
    if (carouselRef.current) {
      const scrollAmount = isMobile
        ? activeIndex * carouselRef.current.offsetWidth
        : activeIndex * (carouselRef.current.offsetWidth / 3);

      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [activeIndex, isMobile]);

  const handlePrev = () => {
    setActiveIndex(prevIndex => (prevIndex - 1 + hobbiesData.length) % hobbiesData.length);
  };

  const handleNext = () => {
    setActiveIndex(prevIndex => (prevIndex + 1) % hobbiesData.length);
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  // Mouse drag handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (carouselRef.current) {
      const cardWidth = isMobile
        ? carouselRef.current.offsetWidth
        : carouselRef.current.offsetWidth / 3;
      const scrollPosition = carouselRef.current.scrollLeft;
      const newIndex = Math.round(scrollPosition / cardWidth);
      setActiveIndex(Math.max(0, Math.min(newIndex, hobbiesData.length - 1)));
    }
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (carouselRef.current) {
      const cardWidth = isMobile
        ? carouselRef.current.offsetWidth
        : carouselRef.current.offsetWidth / 3;
      const scrollPosition = carouselRef.current.scrollLeft;
      const newIndex = Math.round(scrollPosition / cardWidth);
      setActiveIndex(Math.max(0, Math.min(newIndex, hobbiesData.length - 1)));
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4">
      <SectionTitle
        title="Hobbies & Interests"
        subtitle="Beyond work, these are the activities that keep me inspired and balanced."
      />

      <div className="relative">
        {/* Carousel Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 z-10 -ml-4 -translate-y-1/2 transform rounded-full bg-white/80 p-2 text-nord-3 shadow-lg transition-all duration-300 hover:bg-white dark:bg-nord-2/80 dark:text-nord-9 dark:hover:bg-nord-3 md:ml-0"
          aria-label="Previous hobby"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 z-10 -mr-4 -translate-y-1/2 transform rounded-full bg-white/80 p-2 text-nord-3 shadow-lg transition-all duration-300 hover:bg-white dark:bg-nord-2/80 dark:text-nord-9 dark:hover:bg-nord-3 md:mr-0"
          aria-label="Next hobby"
        >
          <ChevronRight size={24} />
        </button>

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="overflow-hidden"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <div className="flex snap-x snap-mandatory transition-transform duration-500">
            {hobbiesData.map((hobby, index) => (
              <HobbyCard
                key={index}
                hobby={hobby}
                handleClick={() => handleDotClick(index)}
                isSelected={activeIndex === index}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="mt-6 flex justify-center space-x-2">
          {hobbiesData.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? 'w-6 bg-nord-10'
                  : 'bg-nord-4 hover:bg-secondary-400 dark:bg-nord-10 dark:hover:bg-nord-9'
              }`}
              aria-label={`Go to hobby ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hobbies;
