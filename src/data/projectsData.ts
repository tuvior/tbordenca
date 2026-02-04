export type Project = {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  link?: string;
  details?: string;
};

export const projectsData: Project[] = [
  {
    title: 'Product Work in Progress',
    description: 'Product work is being curated. Please check back soon.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    tags: ['Product Strategy', 'Discovery', 'Fintech'],
    details:
      'This space will highlight product initiatives, market research, and launches that I owned end-to-end.',
  },
  {
    title: 'Engineering Work in Progress',
    description: 'Engineering work is being curated. Please check back soon.',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80',
    tags: ['Engineering', 'Data', 'Platform'],
    details:
      'This space will spotlight technical contributions, prototypes, and systems I built or shipped.',
  },
];
