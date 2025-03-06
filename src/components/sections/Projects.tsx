import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import ProjectCard from '../ui/ProjectCard';
import { projectsData } from '../../data/projectsData';

// Get unique project categories
const allCategories = ['All', ...new Set(projectsData.flatMap(project => project.tags))];

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects =
    activeFilter === 'All'
      ? projectsData
      : projectsData.filter(project => project.tags.includes(activeFilter));

  return (
    <div className="mx-auto w-full max-w-6xl px-4">
      <SectionTitle
        title="Project Portfolio"
        subtitle="A showcase of products and initiatives I've led or contributed to significantly."
      />

      {/* Filter buttons */}
      <motion.div
        className="mb-8 flex flex-wrap justify-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5 }}
      >
        {allCategories.map(category => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
              activeFilter === category
                ? 'bg-primary-500 text-white'
                : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200 dark:bg-secondary-800 dark:text-secondary-300 dark:hover:bg-secondary-700'
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>

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
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
