import { useEffect, useState, useMemo, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useTheme } from './context/ThemeContextBase';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import Experience from './components/sections/Experience';
import Skills from './components/sections/Skills';
import Photography from './components/sections/Photography';
import Projects from './components/sections/Projects';
import Education from './components/sections/Education';
import Hobbies from './components/sections/Hobbies';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';

const gradientBg = 'bg-gradient-to-br from-nord-6 to-nord-8/15 dark:from-nord-0 dark:to-nord-3';

const sections = [
  { id: 'hero', label: 'Home', component: Hero, bgColor: gradientBg },
  { id: 'experience', label: 'Experience', component: Experience },
  { id: 'projects', label: 'Projects', component: Projects },
  { id: 'hobbies', label: 'Hobbies', component: Hobbies },
  { id: 'photography', label: 'Photography', component: Photography },
  { id: 'skills', label: 'Skills', component: Skills },
  { id: 'education', label: 'Education', component: Education },
  { id: 'contact', label: 'Contact', component: Contact, bgColor: gradientBg },
];

function App() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState('hero');
  const mainRef = useRef<HTMLElement | null>(null);

  const observerOptions = useMemo(
    () => ({
      threshold: [0, 0.25, 0.5, 0.75, 1],
      triggerOnce: false,
    }),
    []
  );

  const hero = useInView(observerOptions);
  const experience = useInView(observerOptions);
  const skills = useInView(observerOptions);
  const projects = useInView(observerOptions);
  const education = useInView(observerOptions);
  const hobbies = useInView(observerOptions);
  const photography = useInView(observerOptions);
  const contact = useInView(observerOptions);

  const sectionRefs = useMemo(
    () => ({
      hero,
      experience,
      skills,
      projects,
      education,
      hobbies,
      photography,
      contact,
    }),
    [hero, experience, skills, projects, education, hobbies, photography, contact]
  );
  const sectionVisibility = useMemo(
    () =>
      sections.map(section => ({
        id: section.id,
        ratio: sectionRefs[section.id as keyof typeof sectionRefs][2]?.intersectionRatio ?? 0,
      })),
    [sectionRefs]
  );

  useEffect(() => {
    if (sectionVisibility.length === 0) {
      return;
    }
    const mostVisible = sectionVisibility.reduce(
      (best, current) => (current.ratio > best.ratio ? current : best),
      sectionVisibility[0]
    );
    if (mostVisible && mostVisible.id !== activeSection) {
      setActiveSection(mostVisible.id);
    }
  }, [sectionVisibility, activeSection]);

  return (
    <div className={`${theme} flex h-screen flex-col overflow-hidden`}>
      <Header sections={sections} activeSection={activeSection} scrollContainerRef={mainRef} />
      <main ref={mainRef} className="snap-container flex-grow overflow-y-auto">
        {sections.map((section, index) => {
          const SectionComponent = section.component;
          const [ref] = sectionRefs[section.id as keyof typeof sectionRefs];
          const bgColor =
            section.bgColor ||
            (index % 2 === 0 ? 'bg-nord-6 dark:bg-nord-0' : 'bg-nord-5 dark:bg-nord-1');
          return (
            <section
              key={section.id}
              id={section.id}
              ref={ref}
              className={`section-snap ${bgColor}`}
            >
              <div className="section-content">
                <SectionComponent />
              </div>
              {section.id === 'contact' && <div className="py-16"></div>}
            </section>
          );
        })}
      </main>
      <Footer />
    </div>
  );
}

export default App;
