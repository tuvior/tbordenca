import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ChevronDown, Globe } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative mx-auto flex w-full max-w-6xl flex-col-reverse items-center justify-between gap-8 px-4 md:flex-row md:gap-12">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-frost-medium/20 blur-3xl dark:bg-frost-medium/10"></div>
        <div className="absolute bottom-1/3 right-1/4 h-96 w-96 rounded-full bg-aurora-green/10 blur-3xl dark:bg-aurora-green/5"></div>
      </div>

      {/* Content */}
      <div className="mt-6 flex-1 text-center md:mt-0 md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            <span className="text-frost-darker dark:text-frost-medium">Tobias Bordenca</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mb-6 h-12 text-2xl font-medium md:text-3xl">
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
          className="mx-auto mb-8 max-w-2xl text-lg text-nord-3 dark:text-nord-4 md:mx-0 md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Passionate product manager with 8+ years of experience driving innovation and delivering
          user-centric solutions that solve real problems and create business value.
        </motion.p>

        <motion.div
          className="mb-8 flex flex-wrap justify-center gap-4 md:justify-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <a href="#experience" className="btn btn-primary">
            View Experience
          </a>
          <a href="#projects" className="btn btn-secondary">
            See Projects
          </a>
        </motion.div>

        {/* Languages */}
        <motion.div
          className="mb-4 max-w-md md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="rounded-xl border border-nord-4 bg-nord-6 p-4 shadow-md dark:border-nord-3 dark:bg-nord-1">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-frost-light/20 text-frost-darker dark:bg-frost-light/10 dark:text-frost-medium">
                <Globe size={18} />
              </div>
              <h3 className="text-lg font-medium">Languages</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex justify-between">
                  <span className="text-sm font-medium">English</span>
                  <span className="text-xs text-nord-3 dark:text-nord-4">Native</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-nord-4 dark:bg-nord-3">
                  <div
                    className="h-full rounded-full bg-frost-darker dark:bg-frost-medium"
                    style={{ width: '100%' }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="mb-1 flex justify-between">
                  <span className="text-sm font-medium">Spanish</span>
                  <span className="text-xs text-nord-3 dark:text-nord-4">Advanced</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-nord-4 dark:bg-nord-3">
                  <div
                    className="h-full rounded-full bg-frost-darker dark:bg-frost-medium"
                    style={{ width: '85%' }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="mb-1 flex justify-between">
                  <span className="text-sm font-medium">French</span>
                  <span className="text-xs text-nord-3 dark:text-nord-4">Intermediate</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-nord-4 dark:bg-nord-3">
                  <div
                    className="h-full rounded-full bg-frost-darker dark:bg-frost-medium"
                    style={{ width: '60%' }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="mb-1 flex justify-between">
                  <span className="text-sm font-medium">German</span>
                  <span className="text-xs text-nord-3 dark:text-nord-4">Basic</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-nord-4 dark:bg-nord-3">
                  <div
                    className="h-full rounded-full bg-frost-darker dark:bg-frost-medium"
                    style={{ width: '30%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Profile Image */}
      <motion.div
        className="relative mx-auto h-56 w-56 md:mx-0 md:h-72 md:w-72"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="border-6 animate-float-enhanced h-full w-full overflow-hidden rounded-full border-nord-6 shadow-xl dark:border-frost-darker">
          <img
            src="/img/profile-c.jpg"
            alt="Tobias Bordenca - Product Manager"
            className="h-full w-full object-cover"
          />
        </div>
      </motion.div>

      {/* Scroll indicator - only visible on desktop */}
      <motion.div
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 transform md:block"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 1,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        <a href="#experience" className="flex flex-col items-center">
          {/* <span className="text-sm font-medium text-frost-darker dark:text-frost-medium mb-2">Scroll Down</span> */}
          <div className="pulse-animation rounded-full bg-frost-darker p-2 text-nord-6 shadow-lg transition-all duration-300 hover:bg-frost-dark dark:bg-frost-dark dark:hover:bg-frost-medium">
            <ChevronDown size={24} />
          </div>
        </a>
      </motion.div>
    </div>
  );
};

export default Hero;
