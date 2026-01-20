import React from 'react';
import Hero from '../components/sections/Hero';
import Hobbies from '../components/sections/Hobbies';
import HomeHighlights from '../components/sections/HomeHighlights';
import PhotographyHighlights from '../components/sections/PhotographyHighlights';

const gradientBg = 'bg-gradient-to-br from-nord-6 to-nord-8/15 dark:from-nord-0 dark:to-nord-3';

const HomePage: React.FC = () => {
  return (
    <>
      <section className={`${gradientBg} py-16`}>
        <Hero />
      </section>

      <section className="bg-nord-5 py-16 dark:bg-nord-1">
        <HomeHighlights />
      </section>

      <section className="bg-nord-6 py-16 dark:bg-nord-0">
        <Hobbies />
      </section>

      <section className="bg-nord-5 py-16 dark:bg-nord-1">
        <PhotographyHighlights />
      </section>

    </>
  );
};

export default HomePage;
