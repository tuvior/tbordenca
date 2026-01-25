import type { Metadata } from 'next';
import Projects from '@/components/sections/Projects';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Selected product and engineering projects by Tobias Bordenca.',
};

export default function ProjectsPage() {
  return (
    <section className="bg-nord-6 dark:bg-nord-0 py-16">
      <Projects />
    </section>
  );
}
