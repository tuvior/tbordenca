'use client';

import type React from 'react';

import { motion } from 'motion/react';
import { Mail } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import { contactData } from '../../data/contactData';

const Contact: React.FC = () => {
  return (
    <div className="mx-auto w-full max-w-6xl px-4">
      <SectionTitle title={contactData.title} subtitle={contactData.subtitle} />

      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="border-nord-5 bg-nord-6 dark:border-nord-3 dark:bg-nord-1 rounded-xl border p-8 text-center shadow-lg">
            <div className="from-nord-10 to-nord-14 text-nord-6 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br">
              <Mail size={32} />
            </div>

            <p className="text-nord-3 dark:text-nord-4 mb-6">{contactData.message}</p>

            <a
              href={`mailto:${contactData.email}`}
              className="text-nord-10 dark:text-nord-8 text-xl font-medium hover:underline"
            >
              {contactData.email}
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
