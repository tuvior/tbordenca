import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import { skillsData } from '../../data/skillsData';
import type { SkillIcon } from '../../data/skillsData';
import { Briefcase, Code, Users, Workflow, Search, X } from 'lucide-react';

const Skills: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredSkills, setFilteredSkills] =
    useState<{ category: string; skills: { name: string }[] }[]>(skillsData);

  // Filter skills based on search query and selected category
  useEffect(() => {
    if (searchQuery === '' && selectedCategory === 'All') {
      setFilteredSkills(skillsData);
      return;
    }

    const filtered = skillsData
      .map(category => {
        // Filter by category if needed
        if (selectedCategory !== 'All' && category.category !== selectedCategory) {
          return { ...category, skills: [] };
        }

        // Filter by search query
        const filteredSkills = category.skills.filter(skill =>
          skill.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return { ...category, skills: filteredSkills };
      })
      .filter(category => category.skills.length > 0);

    setFilteredSkills(filtered);
  }, [searchQuery, selectedCategory]);

  // Get all unique categories
  const allCategories = ['All', ...skillsData.map(category => category.category)];

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
  };

  // Function to get the appropriate icon or logo for a skill
  const getSkillIcon = (skill: { name: string; icon: SkillIcon }) => {
    const icon = skill.icon;
    if (!icon) return <Briefcase size={24} />;

    if (icon.type === 'image') {
      return (
        <div className="flex h-6 w-6 items-center justify-center">
          <img
            src={icon.value}
            alt={`${skill.name} logo`}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      );
    } else {
      const IconComponent = icon.value;
      return <IconComponent size={24} />;
    }
  };

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Product':
        return <Briefcase className="mr-2" size={20} />;
      case 'Technical':
        return <Code className="mr-2" size={20} />;
      case 'Management':
        return <Users className="mr-2" size={20} />;
      case 'Tools':
        return <Workflow className="mr-2" size={20} />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4">
      <SectionTitle
        title="Skills & Expertise"
        subtitle="A comprehensive overview of my product management toolkit and technical capabilities."
      />

      {/* Search and filter */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col gap-4 md:flex-row">
          {/* Search input */}
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search size={18} className="text-secondary-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search skills..."
              className="w-full rounded-lg border border-secondary-300 bg-white py-2 pl-10 pr-10 text-secondary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-secondary-700 dark:bg-secondary-800 dark:text-secondary-200 dark:focus:ring-primary-400"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <X
                  size={18}
                  className="text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-200"
                />
              </button>
            )}
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {allCategories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary-500 text-white'
                    : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200 dark:bg-secondary-800 dark:text-secondary-300 dark:hover:bg-secondary-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Skills grid */}
      <AnimatePresence>
        {filteredSkills.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-12 text-center"
          >
            <p className="text-lg text-secondary-500 dark:text-secondary-400">
              No skills found matching your search.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {filteredSkills.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                exit={{ opacity: 0, y: -20 }}
                layout
              >
                <h3 className="mb-4 flex items-center text-xl font-bold">
                  {getCategoryIcon(category.category)}
                  {category.category}
                </h3>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-md dark:bg-secondary-800"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.3, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      layout
                    >
                      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center text-primary-500 dark:text-primary-400">
                        {getSkillIcon(skill)}
                      </div>

                      <div className="flex flex-col">
                        <span className="font-medium text-sm md:text-base">{skill.name}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Skills;
