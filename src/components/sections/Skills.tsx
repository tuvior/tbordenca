"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import SkillBadge from "../ui/SkillBadge";
import { skillsData } from "../../data/skillsData";
import { useInView } from "@/hooks/useInView";

const categoryColors = {
  All: {
    selected: 'bg-nord-10 text-white hover:bg-nord-9',
    unselected:
      'bg-nord-6 text-nord-3 hover:bg-nord-5 dark:bg-nord-2 dark:text-nord-4 dark:hover:bg-nord-3',
  },
  Product: {
    selected:
      'bg-nord-15/10 text-nord-15 dark:bg-nord-15/20 hover:bg-nord-15/20 dark:hover:bg-nord-15/30',
    unselected:
      'bg-nord-6 text-nord-3 hover:bg-nord-15/20 dark:bg-nord-2 dark:text-nord-4 dark:hover:bg-nord-15/30',
  },
  Fields: {
    selected:
      'bg-nord-7/10 text-nord-7 dark:bg-nord-7/20 hover:bg-nord-7/20 dark:hover:bg-nord-7/30',
    unselected:
      'bg-nord-6 text-nord-3 hover:bg-nord-7/20 dark:bg-nord-2 dark:text-nord-4 dark:hover:bg-nord-7/30',
  },
  Technical: {
    selected:
      'bg-nord-9/10 text-nord-9 dark:bg-nord-9/20 hover:bg-nord-9/20 dark:hover:bg-nord-9/30',
    unselected:
      'bg-nord-6 text-nord-3 hover:bg-nord-9/20 dark:bg-nord-2 dark:text-nord-4 dark:hover:bg-nord-9/30',
  },
  Miscellaneous: {
    selected:
      'bg-nord-8/10 text-nord-8 dark:bg-nord-8/20 hover:bg-nord-8/20 dark:hover:bg-nord-8/30',
    unselected:
      'bg-nord-6 text-nord-3 hover:bg-nord-8/20 dark:bg-nord-2 dark:text-nord-4 dark:hover:bg-nord-8/30',
  },
  Tools: {
    selected:
      'bg-nord-10/10 text-nord-10 dark:bg-nord-10/20 hover:bg-nord-10/20 dark:hover:bg-nord-10/30',
    unselected:
      'bg-nord-6 text-nord-3 hover:bg-nord-10/20 dark:bg-nord-2 dark:text-nord-4 dark:hover:bg-nord-10/30',
  },
};

const allCategories = Object.keys(categoryColors);
const gridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.02 },
  },
};

const Skills: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isMobile, setIsMobile] = useState(false);
  const [gridRef, gridInView] = useInView<HTMLDivElement>({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredSkills = skillsData
    .flatMap(category =>
      category.skills.map(skill => ({
        ...skill,
        category: category.category,
      }))
    )
    .filter(skill => {
      const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || skill.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
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
        viewport={{ once: true, amount: 0.3 }}
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
              className="w-full rounded-lg border border-nord-4 bg-white py-2 pl-10 pr-10 text-nord-2 focus:outline-none focus:ring-2 focus:ring-nord-10 dark:border-nord-3 dark:bg-nord-2 dark:text-nord-5 dark:focus:ring-nord-9"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <X
                  size={18}
                  className="text-secondary-400 hover:text-nord-10 dark:hover:text-nord-5"
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
                    ? categoryColors[category as keyof typeof categoryColors].selected
                    : categoryColors[category as keyof typeof categoryColors].unselected
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
            <p className="text-lg text-nord-9 dark:text-secondary-400">
              No skills found matching your search.
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
            key={`${selectedCategory}-${searchQuery}`}
            variants={gridVariants}
            initial="hidden"
            animate={gridInView ? 'show' : 'hidden'}
            ref={gridRef}
          >
            {filteredSkills
              // .sort((a, b) => a.name.localeCompare(b.name))
              .map(skill => (
                <SkillBadge
                  key={skill.name}
                  skill={skill}
                  isMobile={isMobile}
                  categoryColor={
                    categoryColors[skill.category as keyof typeof categoryColors].selected
                  }
                />
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Skills;
