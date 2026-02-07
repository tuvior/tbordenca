'use client';

import type React from 'react';
import { useEffect, useRef, useState } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import HobbyCard from '@/components/ui/HobbyCard';
import SectionTitle from '@/components/ui/SectionTitle';
import { hobbiesData } from '@/data/hobbiesData';

export default function Hobbies() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const dragDistanceRef = useRef(0);
  const suppressClickRef = useRef(false);
  const dragThreshold = 8;
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
    if (isDragging) {
      return;
    }
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
  }, [activeIndex, isMobile, isDragging]);

  const handlePrev = () => {
    setActiveIndex(prevIndex => (prevIndex - 1 + hobbiesData.length) % hobbiesData.length);
  };

  const handleNext = () => {
    setActiveIndex(prevIndex => (prevIndex + 1) % hobbiesData.length);
  };

  const handleDotClick = (index: number) => {
    if (suppressClickRef.current || isDragging) {
      return;
    }
    setActiveIndex(index);
  };

  // Mouse drag handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragDistanceRef.current = 0;
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    dragDistanceRef.current = Math.max(dragDistanceRef.current, Math.abs(walk));
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (dragDistanceRef.current > dragThreshold) {
      suppressClickRef.current = true;
      setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
    }
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
    dragDistanceRef.current = 0;
    setStartX(e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    dragDistanceRef.current = Math.max(dragDistanceRef.current, Math.abs(walk));
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (dragDistanceRef.current > dragThreshold) {
      suppressClickRef.current = true;
      setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
    }
    if (carouselRef.current) {
      const cardWidth = isMobile
        ? carouselRef.current.offsetWidth
        : carouselRef.current.offsetWidth / 3;
      const scrollPosition = carouselRef.current.scrollLeft;
      const newIndex = Math.round(scrollPosition / cardWidth);
      setActiveIndex(Math.max(0, Math.min(newIndex, hobbiesData.length - 1)));
    }
  };

  const handleCarouselKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      handlePrev();
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      handleNext();
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
          className="text-nord-3 dark:bg-nord-2/80 dark:text-nord-9 dark:hover:bg-nord-3 absolute top-1/2 left-0 z-10 -ml-4 -translate-y-1/2 transform rounded-full bg-white/80 p-2 shadow-lg transition-all duration-300 hover:bg-white md:ml-0"
          aria-label="Previous hobby"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={handleNext}
          className="text-nord-3 dark:bg-nord-2/80 dark:text-nord-9 dark:hover:bg-nord-3 absolute top-1/2 right-0 z-10 -mr-4 -translate-y-1/2 transform rounded-full bg-white/80 p-2 shadow-lg transition-all duration-300 hover:bg-white md:mr-0"
          aria-label="Next hobby"
        >
          <ChevronRight size={24} />
        </button>

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className={`overflow-x-auto overflow-y-hidden ${isDragging ? 'snap-none' : 'snap-x snap-mandatory'}`}
          role="listbox"
          aria-label="Hobbies carousel"
          tabIndex={0}
          onKeyDown={handleCarouselKeyDown}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <div className="flex">
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
                  ? 'bg-nord-10 dark:bg-nord-8 w-6'
                  : 'bg-nord-4 hover:bg-secondary-400 dark:bg-nord-3 dark:hover:bg-nord-9'
              }`}
              aria-label={`Go to hobby ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
