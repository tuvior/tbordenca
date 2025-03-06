import {
  Briefcase,
  BarChart,
  Users,
  Workflow,
  LineChart,
  Layers,
  Code,
  Presentation,
  GitBranch,
  Database,
  Lightbulb,
} from 'lucide-react';

export type SkillIcon = {
  type: 'lucide' | 'image';
  value: typeof Briefcase | string;
};

export const skillIcons: Record<string, SkillIcon> = {
  'Product Strategy': { type: 'lucide', value: Briefcase },
  'Market Research': { type: 'lucide', value: BarChart },
  'User Research': { type: 'lucide', value: Users },
  'Product Roadmapping': { type: 'lucide', value: Workflow },
  'A/B Testing': { type: 'lucide', value: LineChart },
  'Data Analysis': { type: 'lucide', value: LineChart },
  'UX/UI Design': { type: 'lucide', value: Layers },
  Wireframing: { type: 'lucide', value: Layers },
  Prototyping: { type: 'lucide', value: Layers },
  'Team Leadership': { type: 'lucide', value: Users },
  'Stakeholder Management': { type: 'lucide', value: Users },
  'Technical Writing': { type: 'lucide', value: Code },
  'Public Speaking': { type: 'lucide', value: Presentation },
  SQL: { type: 'image', value: 'https://cdn.worldvectorlogo.com/logos/postgresql.svg' },
  'HTML/CSS': { type: 'image', value: 'https://cdn.worldvectorlogo.com/logos/css-3.svg' },
  JavaScript: { type: 'image', value: 'https://cdn.worldvectorlogo.com/logos/logo-javascript.svg' },
  Python: { type: 'image', value: 'https://cdn.worldvectorlogo.com/logos/python-5.svg' },
  Git: { type: 'image', value: 'https://cdn.worldvectorlogo.com/logos/git-icon.svg' },
  'Agile/Scrum': { type: 'image', value: 'https://cdn.worldvectorlogo.com/logos/scrum-1.svg' },
  Jira: { type: 'image', value: 'https://cdn.worldvectorlogo.com/logos/jira-1.svg' },
  Figma: { type: 'image', value: 'https://cdn.worldvectorlogo.com/logos/figma-1.svg' },
  'Google Analytics': {
    type: 'image',
    value: 'https://cdn.worldvectorlogo.com/logos/google-analytics-4.svg',
  },
  Tableau: { type: 'image', value: 'https://cdn.worldvectorlogo.com/logos/tableau-software.svg' },
  Mixpanel: { type: 'image', value: 'https://cdn.worldvectorlogo.com/logos/mixpanel.svg' },
  'Problem Solving': { type: 'lucide', value: Lightbulb },
  Innovation: { type: 'lucide', value: Lightbulb },
} as const;

export const skillsData = [
  {
    category: 'Product',
    skills: [
      { name: 'Product Strategy' },
      { name: 'Market Research' },
      { name: 'User Research' },
      { name: 'Product Roadmapping' },
      { name: 'A/B Testing' },
      { name: 'Data Analysis' },
      { name: 'UX/UI Design' },
      { name: 'Wireframing' },
      { name: 'Prototyping' },
    ],
  },
  {
    category: 'Management',
    skills: [
      { name: 'Agile/Scrum' },
      { name: 'Team Leadership' },
      { name: 'Stakeholder Management' },
      { name: 'Technical Writing' },
      { name: 'Public Speaking' },
    ],
  },
  {
    category: 'Technical',
    skills: [
      { name: 'SQL' },
      { name: 'HTML/CSS' },
      { name: 'JavaScript' },
      { name: 'Python' },
      { name: 'Git' },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Jira' },
      { name: 'Figma' },
      { name: 'Google Analytics' },
      { name: 'Tableau' },
      { name: 'Mixpanel' },
    ],
  },
];
