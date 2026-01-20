import React from 'react';
import { motion } from 'motion/react';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';
import { profileData } from '../../data/profileData';

const Hero: React.FC = () => {
  // Create the sequence for TypeAnimation
  const typeSequence = profileData.roles.reduce<(string | number)[]>((acc, role) => {
    return [...acc, role, 2000];
  }, []);

  return (
    <div className="relative mx-auto flex w-full max-w-6xl flex-col-reverse items-center justify-between gap-8 px-4 md:flex-row md:gap-12">
      <div className="mt-6 flex-1 text-center md:mt-0 md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            <span className="text-nord-10 dark:text-nord-8">{profileData.name}</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mb-6 h-12 text-2xl font-medium md:text-3xl">
            <TypeAnimation
              sequence={typeSequence}
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
          {profileData.description}
        </motion.p>

        <motion.div
          className="mb-8 flex flex-wrap justify-center gap-4 md:justify-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link to="/resume" className="btn btn-primary">
            View Resume
          </Link>
          <Link to="/projects" className="btn btn-secondary">
            See Projects
          </Link>
        </motion.div>

      </div>

      <motion.div
        className="relative mx-auto h-56 w-56 md:mx-0 md:h-96 md:w-96"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="animate-float-enhanced h-full w-full overflow-hidden rounded-full border-4 border-nord-6 shadow-xl dark:border-nord-10">
          <img
            src={profileData.profileImage}
            alt={`${profileData.name} - ${profileData.title}`}
            className="h-full w-full object-cover"
          />
        </div>
      </motion.div>

    </div>
  );
};

export default Hero;
