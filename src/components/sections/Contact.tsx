import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import { Mail } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <SectionTitle 
        title="Contact" 
        subtitle="Feel free to reach out if you'd like to connect."
      />
      
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          <div className="bg-nord-6 dark:bg-nord-1 rounded-xl shadow-lg p-8 text-center border border-nord-5 dark:border-nord-3">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-frost-darker to-aurora-green flex items-center justify-center text-nord-6">
              <Mail size={32} />
            </div>
            
            <p className="text-nord-3 dark:text-nord-4 mb-6">
              The best way to reach me is through email:
            </p>
            
            <a 
              href="mailto:alex.morgan@example.com" 
              className="text-xl font-medium text-frost-darker dark:text-frost-medium hover:underline"
            >
              alex.morgan@example.com
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;