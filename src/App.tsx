import { useEffect, useState, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { useTheme } from './context/ThemeContext';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import Experience from './components/sections/Experience';
import Skills from './components/sections/Skills';
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
  { id: 'skills', label: 'Skills', component: Skills },
  { id: 'education', label: 'Education', component: Education },
  { id: 'contact', label: 'Contact', component: Contact, bgColor: gradientBg },
];

function App() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState('hero');

  const hero = useInView({ threshold: 0.2, triggerOnce: false });
  const experience = useInView({ threshold: 0.2, triggerOnce: false });
  const skills = useInView({ threshold: 0.2, triggerOnce: false });
  const projects = useInView({ threshold: 0.2, triggerOnce: false });
  const education = useInView({ threshold: 0.2, triggerOnce: false });
  const hobbies = useInView({ threshold: 0.2, triggerOnce: false });
  const contact = useInView({ threshold: 0.2, triggerOnce: false });

  const sectionRefs = useMemo(
    () => ({
      hero,
      experience,
      skills,
      projects,
      education,
      hobbies,
      contact,
    }),
    [hero, experience, skills, projects, education, hobbies, contact]
  );
  const sectionInViews = useMemo(
    () =>
      sections.map(section => ({
        id: section.id,
        inView: sectionRefs[section.id as keyof typeof sectionRefs][1],
      })),
    [sectionRefs]
  );

  useEffect(() => {
    const visibleSection = sectionInViews.find(section => section.inView);
    if (visibleSection) {
      setActiveSection(visibleSection.id);
    }
  }, [sectionInViews]);

  useEffect(() => {
    const currentSectionIndex = sections.findIndex(section => section.id === activeSection);

    sections.forEach((section, index) => {
      const element = document.getElementById(section.id);
      if (element) {
        element.style.scrollSnapAlign =
          index === currentSectionIndex && index > 0 ? 'none' : 'start';
      }
    });
  }, [activeSection]);

  return (
    <div className={`${theme} flex h-screen flex-col overflow-hidden`}>
      <Header sections={sections} activeSection={activeSection} />
      <main className="snap-container flex-grow overflow-y-auto">
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
