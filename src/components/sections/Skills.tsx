import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import { skillsData } from '../../data/skillsData';
import { 
  LineChart, 
  Lightbulb, 
  Users, 
  Briefcase, 
  Code, 
  BarChart, 
  Presentation, 
  Layers,
  Workflow,
  GitBranch,
  Database,
  Search,
  X
} from 'lucide-react';

// Get all unique categories
const allCategories = ['All', ...skillsData.map(category => category.category)];

const Skills: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredSkills, setFilteredSkills] = useState<{category: string, skills: {name: string, logo?: string}[]}[]>(skillsData);
  
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
  
  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
  };
  
  // Function to get the appropriate icon or logo for a skill
  const getSkillIcon = (skill: {name: string, logo?: string}) => {
    // If the skill has a logo URL, use it
    if (skill.logo) {
      return (
        <div className="w-6 h-6 flex items-center justify-center">
          <img 
            src={skill.logo} 
            alt={`${skill.name} logo`} 
            className="max-w-full max-h-full object-contain" 
          />
        </div>
      );
    }
    
    // Otherwise use the icon mapping
    switch (skill.name) {
      case 'Product Strategy':
        return <Briefcase size={24} />;
      case 'Market Research':
        return <BarChart size={24} />;
      case 'User Research':
        return <Users size={24} />;
      case 'Product Roadmapping':
        return <Workflow size={24} />;
      case 'A/B Testing':
        return <LineChart size={24} />;
      case 'Data Analysis':
        return <LineChart size={24} />;
      case 'UX/UI Design':
        return <Layers size={24} />;
      case 'Wireframing':
        return <Layers size={24} />;
      case 'Prototyping':
        return <Layers size={24} />;
      case 'Agile/Scrum':
        return <Workflow size={24} />;
      case 'Team Leadership':
        return <Users size={24} />;
      case 'Stakeholder Management':
        return <Users size={24} />;
      case 'Technical Writing':
        return <Code size={24} />;
      case 'Public Speaking':
        return <Presentation size={24} />;
      case 'SQL':
        return <Database size={24} />;
      case 'HTML/CSS':
        return <Code size={24} />;
      case 'JavaScript':
        return <Code size={24} />;
      case 'Python':
        return <Code size={24} />;
      case 'Git':
        return <GitBranch size={24} />;
      case 'Innovation':
        return <Lightbulb size={24} />;
      case 'Problem Solving':
        return <Lightbulb size={24} />;
      default:
        return <Briefcase size={24} />;
    }
  };
  
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
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
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search input */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-secondary-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills..."
              className="w-full pl-10 pr-10 py-2 border border-secondary-300 dark:border-secondary-700 rounded-lg bg-white dark:bg-secondary-800 text-secondary-800 dark:text-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X size={18} className="text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-200" />
              </button>
            )}
          </div>
          
          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary-500 text-white'
                    : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700'
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
            className="text-center py-12"
          >
            <p className="text-secondary-500 dark:text-secondary-400 text-lg">
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
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  {category.category === 'Product' && <Briefcase className="mr-2" size={20} />}
                  {category.category === 'Technical' && <Code className="mr-2" size={20} />}
                  {category.category === 'Management' && <Users className="mr-2" size={20} />}
                  {category.category === 'Tools' && <Workflow className="mr-2" size={20} />}
                  {category.category}
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      className="flex items-center bg-white dark:bg-secondary-800 rounded-lg shadow-md p-3 gap-3"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.3, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      layout
                    >
                      <div className="text-primary-500 dark:text-primary-400 flex-shrink-0 w-6 h-6 flex items-center justify-center">
                        {getSkillIcon(skill)}
                      </div>
                      
                      <div className="flex flex-col">
                        <span className="font-medium">{skill.name}</span>
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