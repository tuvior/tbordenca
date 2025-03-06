import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import EducationCard from '../ui/EducationCard';
import { educationData } from '../../data/educationData';

const Education: React.FC = () => {
  return (
    <div className="mx-auto w-full max-w-6xl px-4">
      <SectionTitle
        title="Education & Certifications"
        subtitle="My academic background and professional certifications that have shaped my expertise."
      />

      <div className="space-y-6">
        {educationData.map((item, index) => (
          <EducationCard
            key={index}
            institution={item.institution}
            degree={item.degree}
            field={item.field}
            period={item.period}
            description={item.description}
            logo={item.logo}
            delay={index * 0.2}
          />
        ))}
      </div>
    </div>
  );
};

export default Education;
