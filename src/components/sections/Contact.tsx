import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import { Mail } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="mx-auto w-full max-w-6xl px-4">
      <SectionTitle title="Contact" subtitle="Feel free to reach out if you'd like to connect." />

      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="rounded-xl border border-nord-5 bg-nord-6 p-8 text-center shadow-lg dark:border-nord-3 dark:bg-nord-1">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-frost-darker to-aurora-green text-nord-6">
              <Mail size={32} />
            </div>

            <p className="mb-6 text-nord-3 dark:text-nord-4">
              The best way to reach me is through email:
            </p>

            <a
              href="mailto:bordenca.tobias@gmail.com"
              className="text-xl font-medium text-frost-darker hover:underline dark:text-frost-medium"
            >
              bordenca.tobias@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
