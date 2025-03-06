import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ChevronDown, Globe } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-frost-medium/20 dark:bg-frost-medium/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-aurora-green/10 dark:bg-aurora-green/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="flex-1 text-center md:text-left mt-6 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-frost-darker dark:text-frost-medium">Tobias Bordenca</span>
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-2xl md:text-3xl font-medium mb-6 h-12">
            <TypeAnimation
              sequence={[
                'Product Manager',
                2000,
                'UX Enthusiast',
                2000,
                'Tech Strategist',
                2000,
                'Team Leader',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-nord-2 dark:text-nord-4"
            />
          </div>
        </motion.div>
        
        <motion.p
          className="text-lg md:text-xl text-nord-3 dark:text-nord-4 mb-8 max-w-2xl mx-auto md:mx-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Passionate product manager with 8+ years of experience driving innovation and delivering user-centric solutions that solve real problems and create business value.
        </motion.p>
        
        <motion.div
          className="flex flex-wrap gap-4 justify-center md:justify-start mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <a
            href="#experience"
            className="btn btn-primary"
          >
            View Experience
          </a>
          <a
            href="#projects"
            className="btn btn-secondary"
          >
            See Projects
          </a>
        </motion.div>
        
        {/* Languages */}
        <motion.div
          className="mb-4 md:mb-8 max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="bg-nord-6 dark:bg-nord-1 rounded-xl shadow-md p-4 border border-nord-4 dark:border-nord-3">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-frost-light/20 dark:bg-frost-light/10 flex items-center justify-center text-frost-darker dark:text-frost-medium">
                <Globe size={18} />
              </div>
              <h3 className="text-lg font-medium">Languages</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">English</span>
                  <span className="text-xs text-nord-3 dark:text-nord-4">Native</span>
                </div>
                <div className="w-full bg-nord-4 dark:bg-nord-3 h-2 rounded-full overflow-hidden">
                  <div className="bg-frost-darker dark:bg-frost-medium h-full rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Spanish</span>
                  <span className="text-xs text-nord-3 dark:text-nord-4">Advanced</span>
                </div>
                <div className="w-full bg-nord-4 dark:bg-nord-3 h-2 rounded-full overflow-hidden">
                  <div className="bg-frost-darker dark:bg-frost-medium h-full rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">French</span>
                  <span className="text-xs text-nord-3 dark:text-nord-4">Intermediate</span>
                </div>
                <div className="w-full bg-nord-4 dark:bg-nord-3 h-2 rounded-full overflow-hidden">
                  <div className="bg-frost-darker dark:bg-frost-medium h-full rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">German</span>
                  <span className="text-xs text-nord-3 dark:text-nord-4">Basic</span>
                </div>
                <div className="w-full bg-nord-4 dark:bg-nord-3 h-2 rounded-full overflow-hidden">
                  <div className="bg-frost-darker dark:bg-frost-medium h-full rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Profile Image */}
      <motion.div
        className="w-56 h-56 md:w-72 md:h-72 relative mx-auto md:mx-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="w-full h-full rounded-full overflow-hidden border-6 border-nord-6 dark:border-frost-darker shadow-xl animate-float-enhanced">
          <img
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
            alt="Tobias Bordenca - Product Manager"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
      
      {/* Scroll indicator - only visible on desktop */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1, 
          delay: 1, 
          repeat: Infinity, 
          repeatType: 'reverse' 
        }}
      >
        <a 
          href="#experience" 
          className="flex flex-col items-center"
        >
          {/* <span className="text-sm font-medium text-frost-darker dark:text-frost-medium mb-2">Scroll Down</span> */}
          <div className="p-2 rounded-full bg-frost-darker dark:bg-frost-dark text-nord-6 shadow-lg hover:bg-frost-dark dark:hover:bg-frost-medium transition-all duration-300 pulse-animation">
            <ChevronDown size={24} />
          </div>
        </a>
      </motion.div>
    </div>
  );
};

export default Hero;
