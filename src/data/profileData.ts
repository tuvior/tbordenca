import imageUrl from '/img/profile-c.jpg?url';

export type Language = {
  name: string;
  level: string;
  proficiency: number;
};

export type ProfileData = {
  name: string;
  title: string;
  roles: string[];
  description: string;
  profileImage: string;
  languages: Language[];
};

export const profileData: ProfileData = {
  name: 'Tobias Bordenca',
  title: 'Product Manager',
  roles: ['Product Manager', 'UX Enthusiast', 'Leader', 'Architect'],
  description:
    'Passionate product manager with 6+ years of experience driving innovation and delivering user-centric solutions that solve real problems and create business value.',
  profileImage: imageUrl,
  languages: [
    {
      name: 'Italian',
      level: 'Native',
      proficiency: 100,
    },
    {
      name: 'English',
      level: 'Fluent',
      proficiency: 100,
    },
    {
      name: 'French',
      level: 'Fluent',
      proficiency: 95,
    },
    {
      name: 'German',
      level: 'Lower Intermediate',
      proficiency: 40,
    },
  ],
};
