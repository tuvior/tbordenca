import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import { hobbiesData } from '../../data/hobbiesData';
import { 
  Bike, 
  BookOpen, 
  Camera, 
  Utensils, 
  Plane, 
  Music, 
  Gamepad2, 
  Palette,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Map of hobby icons
const hobbyIcons: Record<string, React.ReactNode> = {
  'Cycling': <Bike size={32} />,
  'Reading': <BookOpen size={32} />,
  'Photography': <Camera size={32} />,
  'Cooking': <Utensils size={32} />,
  'Traveling': <Plane size={32} />,
  'Music': <Music size={32} />,
  'Gaming': <Gamepad2 size={32} />,
  'Painting': <Palette size={32} />,
};

// Background images for hobbies
const hobbyBackgrounds: Record<string, string> = {
  'Cycling': 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  'Reading': 'https://images.unsplash.com/photo-1513001900722-370f803f498d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  'Photography': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1164&q=80',
  'Cooking': 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1168&q=80',
  'Traveling': 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  'Music': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  'Gaming': 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  'Painting': 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80',
};

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
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
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
        behavior: 'smooth'
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
    const walk = (x - startX) * 2; // Scroll speed multiplier
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
    
    // Determine which card is most visible and set it as active
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
    
    // Determine which card is most visible and set it as active
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
    <div className="w-full max-w-6xl mx-auto px-4">
      <SectionTitle 
        title="Hobbies & Interests" 
        subtitle="Beyond work, these are the activities that keep me inspired and balanced."
      />
      
      <div className="relative">
        {/* Carousel Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 dark:bg-secondary-800/80 p-2 rounded-full shadow-lg text-primary-600 dark:text-primary-400 hover:bg-white dark:hover:bg-secondary-700 transition-all duration-300 -ml-4 md:ml-0"
          aria-label="Previous hobby"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 dark:bg-secondary-800/80 p-2 rounded-full shadow-lg text-primary-600 dark:text-primary-400 hover:bg-white dark:hover:bg-secondary-700 transition-all duration-300 -mr-4 md:mr-0"
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
          <div className="flex transition-transform duration-500 snap-x snap-mandatory">
            {hobbiesData.map((hobby, index) => (
              <div 
                key={hobby.title}
                className={`w-full md:w-1/3 flex-shrink-0 p-3 snap-center`}
              >
                <motion.div
                  className={`relative h-80 rounded-xl shadow-lg overflow-hidden group ${
                    activeIndex === index ? 'ring-2 ring-primary-500 dark:ring-primary-400' : ''
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  onClick={() => handleDotClick(index)}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70">
                    <img 
                      src={hobbyBackgrounds[hobby.title]} 
                      alt={hobby.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <div className="mb-4 w-16 h-16 rounded-full bg-primary-500/80 backdrop-blur-sm flex items-center justify-center">
                      {hobbyIcons[hobby.title]}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{hobby.title}</h3>
                    <p className="text-white/90">{hobby.description}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Dots Navigation */}
        <div className="flex justify-center mt-6 space-x-2">
          {hobbiesData.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeIndex === index 
                  ? 'bg-primary-500 w-6' 
                  : 'bg-secondary-300 dark:bg-secondary-600 hover:bg-secondary-400 dark:hover:bg-secondary-500'
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