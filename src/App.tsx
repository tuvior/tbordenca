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

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'hobbies', label: 'Hobbies' },
  { id: 'contact', label: 'Contact' },
];

function App() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState('hero');

  // Create individual refs for each section
  const [heroRef, heroInView] = useInView({ threshold: 0.2, triggerOnce: false });
  const [experienceRef, experienceInView] = useInView({ threshold: 0.2, triggerOnce: false });
  const [skillsRef, skillsInView] = useInView({ threshold: 0.2, triggerOnce: false });
  const [projectsRef, projectsInView] = useInView({ threshold: 0.2, triggerOnce: false });
  const [educationRef, educationInView] = useInView({ threshold: 0.2, triggerOnce: false });
  const [hobbiesRef, hobbiesInView] = useInView({ threshold: 0.2, triggerOnce: false });
  const [contactRef, contactInView] = useInView({ threshold: 0.2, triggerOnce: false });

  // Use useMemo to prevent the array from being recreated on every render
  const sectionInViews = useMemo(
    () => [
      { id: 'hero', inView: heroInView },
      { id: 'experience', inView: experienceInView },
      { id: 'skills', inView: skillsInView },
      { id: 'projects', inView: projectsInView },
      { id: 'education', inView: educationInView },
      { id: 'hobbies', inView: hobbiesInView },
      { id: 'contact', inView: contactInView },
    ],
    [
      heroInView,
      experienceInView,
      skillsInView,
      projectsInView,
      educationInView,
      hobbiesInView,
      contactInView,
    ]
  );

  // Update active section based on which section is in view
  useEffect(() => {
    const visibleSection = sectionInViews.find(section => section.inView);
    if (visibleSection) {
      setActiveSection(visibleSection.id);
    }
  }, [sectionInViews]);

  // Handle scroll behavior
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
        <section
          id="hero"
          ref={heroRef}
          className="section-snap bg-gradient-to-br from-nord-6 to-nord-7/10 dark:from-nord-0 dark:to-nord-1"
        >
          <div className="section-content">
            <Hero />
          </div>
        </section>

        <section
          id="experience"
          ref={experienceRef}
          className="section-snap bg-nord-5 dark:bg-nord-1"
        >
          <div className="section-content">
            <Experience />
          </div>
        </section>

        <section id="skills" ref={skillsRef} className="section-snap bg-nord-6 dark:bg-nord-0">
          <div className="section-content">
            <Skills />
          </div>
        </section>

        <section id="projects" ref={projectsRef} className="section-snap bg-nord-5 dark:bg-nord-1">
          <div className="section-content">
            <Projects />
          </div>
        </section>

        <section
          id="education"
          ref={educationRef}
          className="section-snap bg-nord-6 dark:bg-nord-0"
        >
          <div className="section-content">
            <Education />
          </div>
        </section>

        <section id="hobbies" ref={hobbiesRef} className="section-snap bg-nord-5 dark:bg-nord-1">
          <div className="section-content">
            <Hobbies />
          </div>
        </section>

        <section
          id="contact"
          ref={contactRef}
          className="section-snap bg-gradient-to-br from-nord-6 to-nord-7/10 dark:from-nord-0 dark:to-nord-1"
        >
          <div className="section-content">
            <Contact />
          </div>
          <div className="py-16">
            {/* Extra padding at the bottom of the last section to ensure footer visibility */}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
