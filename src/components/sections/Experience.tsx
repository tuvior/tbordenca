'use client';

import type React from 'react';
import { useEffect, useRef, useState } from 'react';

import ExperienceCard from '@/components/ui/ExperienceCard';
import SectionTitle from '@/components/ui/SectionTitle';
import { experienceData } from '@/data/experienceData';

export default function Experience() {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const [showCompanyInfo, setShowCompanyInfo] = useState<number | null>(null);
  const companyInfoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const infoButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const experienceSectionRef = useRef<HTMLDivElement>(null);

  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle click outside of company info popover
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showCompanyInfo !== null) {
        const infoRef = companyInfoRefs.current[showCompanyInfo];
        const buttonRef = infoButtonRefs.current[showCompanyInfo];

        if (
          infoRef &&
          !infoRef.contains(event.target as Node) &&
          buttonRef &&
          !buttonRef.contains(event.target as Node)
        ) {
          setShowCompanyInfo(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCompanyInfo]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4" ref={experienceSectionRef}>
      <SectionTitle
        title="Professional Experience"
        subtitle="My journey through tech and into product management."
      />

      <div className="relative">
        <div
          aria-hidden="true"
          className="from-nord-10 via-nord-14 to-nord-15 dark:from-nord-7 dark:via-nord-9 dark:to-nord-10 pointer-events-none absolute top-6 left-5 h-[calc(100%-3rem)] w-px bg-linear-to-b md:left-1/2 md:-translate-x-1/2"
        />
        <div className="space-y-12 md:space-y-0">
          {experienceData.map((experience, index) => (
            <ExperienceCard
              key={index}
              experience={experience}
              index={index}
              isExpanded={expandedCards.has(index)}
              isMobile={isMobile}
              showCompanyInfo={showCompanyInfo === index}
              onCardClick={() => {
                if (isMobile) {
                  setExpandedCards(prev => {
                    const newExpandedCards = new Set(prev);
                    if (newExpandedCards.has(index)) {
                      newExpandedCards.delete(index);
                    } else {
                      newExpandedCards.add(index);
                    }
                    return newExpandedCards;
                  });
                }
              }}
              onMouseEnter={() => {
                if (!isMobile) {
                  setExpandedCards(new Set([index]));
                }
              }}
              onMouseLeave={() => {
                if (!isMobile) {
                  setExpandedCards(new Set());
                }
              }}
              onCompanyInfoToggle={(e: React.MouseEvent) => {
                e.stopPropagation();
                setShowCompanyInfo(showCompanyInfo === index ? null : index);
              }}
              companyInfoRef={el => {
                companyInfoRefs.current[index] = el;
              }}
              infoButtonRef={el => {
                infoButtonRefs.current[index] = el;
              }}
              cardRef={el => {
                cardRefs.current[index] = el;
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
