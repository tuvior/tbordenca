import {
  Briefcase,
  BarChart,
  Users,
  Workflow,
  LineChart,
  Layers,
  Code,
  Presentation,
  Lightbulb,
  DatabaseIcon,
} from 'lucide-react';

export type Skill = {
  name: string;
  icon: SkillIcon;
};

export type SkillIcon = {
  type: 'lucide' | 'image';
  value: typeof Briefcase | string;
};

// set correct type as objects with category and list of skills
export const skillsData: { category: string; skills: Skill[] }[] = [
  {
    category: 'Product',
    skills: [
      { name: 'Product Strategy', icon: { type: 'lucide', value: Briefcase } },
      { name: 'Market Research', icon: { type: 'lucide', value: BarChart } },
      { name: 'User Research', icon: { type: 'lucide', value: Users } },
      { name: 'Product Roadmapping', icon: { type: 'lucide', value: Workflow } },
      { name: 'A/B Testing', icon: { type: 'lucide', value: LineChart } },
      { name: 'Data Analysis', icon: { type: 'lucide', value: LineChart } },
      { name: 'UX/UI Design', icon: { type: 'lucide', value: Layers } },
      { name: 'Wireframing', icon: { type: 'lucide', value: Layers } },
      { name: 'Prototyping', icon: { type: 'lucide', value: Layers } },
      { name: 'Problem Solving', icon: { type: 'lucide', value: Lightbulb } },
      { name: 'Innovation', icon: { type: 'lucide', value: Lightbulb } },
    ],
  },
  {
    category: 'Management',
    skills: [
      {
        name: 'Agile/Scrum',
        icon: { type: 'image', value: 'https://cdn.worldvectorlogo.com/logos/scrum-1.svg' },
      },
      { name: 'Team Leadership', icon: { type: 'lucide', value: Users } },
      { name: 'Stakeholder Management', icon: { type: 'lucide', value: Users } },
      { name: 'Technical Writing', icon: { type: 'lucide', value: Code } },
      { name: 'Public Speaking', icon: { type: 'lucide', value: Presentation } },
    ],
  },
  {
    category: 'Technical',
    skills: [
      {
        name: 'Python',
        icon: { type: 'image', value: 'https://cdn.worldvectorlogo.com/logos/python-5.svg' },
      },
      {
        name: 'Java',
        icon: { type: 'image', value: 'https://cdn.worldvectorlogo.com/logos/java-14.svg' },
      },
      {
        name: 'Kotlin',
        icon: { type: 'image', value: 'https://cdn.worldvectorlogo.com/logos/kotlin-1.svg' },
      },
      {
        name: 'Scala',
        icon: { type: 'image', value: 'https://cdn.worldvectorlogo.com/logos/scala-4.svg' },
      },
      {
        name: 'Spring Boot',
        icon: { type: 'image', value: 'https://cdn.worldvectorlogo.com/logos/spring-boot-1.svg' },
      },
      {
        name: 'HTML/CSS',
        icon: { type: 'image', value: 'https://cdn.worldvectorlogo.com/logos/css-3.svg' },
      },
      {
        name: 'JavaScript',
        icon: { type: 'image', value: 'https://cdn.worldvectorlogo.com/logos/logo-javascript.svg' },
      },
      {
        name: 'TypeScript',
        icon: { type: 'image', value: 'https://cdn.worldvectorlogo.com/logos/typescript.svg' },
      },
      {
        name: 'React',
        icon: { type: 'image', value: 'https://cdn.worldvectorlogo.com/logos/react-2.svg' },
      },
      {
        name: 'Vue.js',
        icon: { type: 'image', value: 'https://cdn.worldvectorlogo.com/logos/vue-9.svg' },
      },
      {
        name: 'Node.js',
        icon: { type: 'image', value: 'https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg' },
      },
      {
        name: 'Docker',
        icon: { type: 'image', value: 'https://cdn.worldvectorlogo.com/logos/docker.svg' },
      },
      {
        name: 'Kubernetes',
        icon: { type: 'image', value: 'https://cdn.worldvectorlogo.com/logos/kubernets.svg' },
      },
      {
        name: 'Git',
        icon: { type: 'image', value: 'https://cdn.worldvectorlogo.com/logos/git-icon.svg' },
      },
      {
        name: 'SQL',
        icon: { type: 'lucide', value: DatabaseIcon },
      },
    ],
  },
  {
    category: 'Tools',
    skills: [
      {
        name: 'Excel',
        icon: { type: 'image', value: 'https://cdn.worldvectorlogo.com/logos/excel-4.svg' },
      },
      {
        name: 'Jira',
        icon: { type: 'image', value: 'https://cdn.worldvectorlogo.com/logos/jira-1.svg' },
      },
      {
        name: 'Confluence',
        icon: { type: 'image', value: 'https://cdn.worldvectorlogo.com/logos/confluence-1.svg' },
      },
      {
        name: 'Figma',
        icon: { type: 'image', value: 'https://cdn.worldvectorlogo.com/logos/figma-icon.svg' },
      },
      {
        name: 'Miro',
        icon: {
          type: 'image',
          value:
            'https://cdn.brandfetch.io/idAnDTFapY/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B',
        },
      },
      {
        name: 'Google Analytics',
        icon: {
          type: 'image',
          value: 'https://cdn.worldvectorlogo.com/logos/google-analytics-4.svg',
        },
      },
      {
        name: 'Adobe Analytics',
        icon: {
          type: 'image',
          value:
            'https://cdn.brandfetch.io/id_KsyK7J9/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B',
        },
      },
    ],
  },
];
