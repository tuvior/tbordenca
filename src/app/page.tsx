import Hero from '@/components/sections/Hero';
import Hobbies from '@/components/sections/Hobbies';
import HomeHighlights from '@/components/sections/HomeHighlights';
import PhotographyHighlights from '@/components/sections/PhotographyHighlights';

export default function HomePage() {
  return (
    <>
      <section className="bg-nord-6 dark:bg-nord-0 py-16">
        <Hero />
      </section>

      <section className="bg-nord-5 dark:bg-nord-1 py-16">
        <HomeHighlights />
      </section>

      <section className="bg-nord-6 dark:bg-nord-0 py-16">
        <Hobbies />
      </section>

      <section className="bg-nord-5 dark:bg-nord-1 py-16">
        <PhotographyHighlights />
      </section>
    </>
  );
}
