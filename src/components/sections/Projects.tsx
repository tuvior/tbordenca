import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import SectionTitle from '../ui/SectionTitle';
import ProjectCard from '../ui/ProjectCard';
import { projectsData } from '../../data/projectsData';

type Project = (typeof projectsData)[number];

type ProjectsProps = {
  title?: string;
  subtitle?: string;
  projects?: Project[];
  showFilters?: boolean;
};

const Projects: React.FC<ProjectsProps> = ({
  title = 'Project Portfolio',
  subtitle = "A showcase of products and initiatives I've led or contributed to significantly.",
  projects = projectsData,
  showFilters = true,
}) => {
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    setActiveFilter('All');
  }, [projects, showFilters]);

  const allCategories = useMemo(() => {
    if (!showFilters) {
      return ['All'];
    }
    return ['All', ...new Set(projects.flatMap(project => project.tags))];
  }, [projects, showFilters]);

  const filteredProjects =
    !showFilters || activeFilter === 'All'
      ? projects
      : projects.filter(project => project.tags.includes(activeFilter));

  return (
    <div className="mx-auto w-full max-w-6xl px-4">
      <SectionTitle title={title} subtitle={subtitle} />

      {showFilters && (
        <motion.div
          className="mb-8 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          {allCategories.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-nord-10 text-white'
                  : 'bg-nord-6 text-nord-3 hover:bg-nord-5 dark:bg-nord-2 dark:text-nord-4 dark:hover:bg-nord-3'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>
      )}

      {/* Projects grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map(project => (
          <div
            id={`projects-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
            key={project.title}
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.tags}
              link={project.link}
              details={project.details}
              type={project.type}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
