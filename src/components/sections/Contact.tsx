import React from 'react';
import { motion } from 'motion/react';
import SectionTitle from '../ui/SectionTitle';
import { Mail } from 'lucide-react';
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
          <div className="rounded-xl border border-nord-5 bg-nord-6 p-8 text-center shadow-lg dark:border-nord-3 dark:bg-nord-1">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-nord-10 to-nord-14 text-nord-6">
              <Mail size={32} />
            </div>

            <p className="mb-6 text-nord-3 dark:text-nord-4">{contactData.message}</p>

            <a
              href={`mailto:${contactData.email}`}
              className="text-xl font-medium text-nord-10 hover:underline dark:text-nord-8"
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
