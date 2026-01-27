import { StaticImageData } from 'next/image';

import epflLogo from '@/assets/img/companies/epfl.svg';

export type Education = {
  institution: string;
  degree: string;
  field: string;
  period: string;
  description: string;
  logo: StaticImageData;
};

export const educationData: Education[] = [
  {
    institution: 'EPFL (Swiss Federal Institute of Technology in Lausanne)',
    degree: 'MSc',
    field: 'Computer Science',
    period: '2017 - 2019',
    description:
      'Focused on machine learning, artificial intelligence and programming language design. Thesis on building a recommendation system for private banking client using collaborative filtering techniques.',
    logo: epflLogo,
  },
  {
    institution: 'EPFL (Swiss Federal Institute of Technology in Lausanne)',
    degree: 'BSc',
    field: 'Computer Science',
    period: '2013 - 2016',
    description:
      'Coursework included software engineering, human-computer interaction, and artificial intelligence. ',
    logo: epflLogo,
  },
];
