'use client';

import { Github, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';

import { footerData } from '@/data/footerData';
import { profileData } from '@/data/profileData';

export default function Hero() {
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
          className="text-nord-3 dark:text-nord-4 mx-auto mb-8 max-w-2xl text-lg md:mx-0 md:text-xl"
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
          <Link href="/resume" className="btn btn-primary">
            View Resume
          </Link>
          {footerData.socialLinks.github ? (
            <Link href={footerData.socialLinks.github} className="btn btn-secondary">
              <Github />
            </Link>
          ) : undefined}
          {footerData.socialLinks.linkedin ? (
            <Link href={footerData.socialLinks.linkedin} className="btn btn-secondary">
              <Linkedin />
            </Link>
          ) : undefined}
          {footerData.socialLinks.twitter ? (
            <Link href={footerData.socialLinks.twitter} className="btn btn-secondary">
              <Twitter />
            </Link>
          ) : undefined}
        </motion.div>
      </div>

      <motion.div
        className="relative mx-auto h-56 w-56 md:mx-0 md:h-96 md:w-96"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="animate-float-enhanced border-nord-10 dark:border-nord-8 relative h-full w-full overflow-hidden rounded-full border-4 shadow-xl">
          <Image
            src={profileData.profileImage}
            alt={`${profileData.name} - ${profileData.title}`}
            fill
            sizes="(min-width: 768px) 384px, 224px"
            className="object-cover"
            priority
          />
        </div>
      </motion.div>
    </div>
  );
}
