import type { LucideIcon } from 'lucide-react';
import {
  AppWindow,
  BarChart,
  BrainCircuit,
  Briefcase,
  Building2,
  ChartCandlestick,
  ChartNoAxesGantt,
  CloudLightning,
  Code,
  Database,
  EthernetPort,
  GitCompareArrows,
  Landmark,
  Lightbulb,
  Presentation,
  Users,
} from 'lucide-react';

export type Skill = {
  name: string;
  icon: SkillIcon;
};

export type SkillIcon = {
  type: 'lucide' | 'image';
  value: LucideIcon | string;
};

// set correct type as objects with category and list of skills
export const skillsData: { category: string; skills: Skill[] }[] = [
  {
    category: 'Product',
    skills: [
      { name: 'B2B', icon: { type: 'lucide', value: Building2 } },
      { name: 'Product Strategy', icon: { type: 'lucide', value: Briefcase } },
      { name: 'Market Research', icon: { type: 'lucide', value: BarChart } },
      { name: 'User Research', icon: { type: 'lucide', value: Users } },
      { name: 'Roadmap Planning', icon: { type: 'lucide', value: ChartNoAxesGantt } },
      { name: 'Competitive Analysis', icon: { type: 'lucide', value: GitCompareArrows } },
      { name: 'UX Design', icon: { type: 'lucide', value: AppWindow } },
      { name: 'Problem Solving', icon: { type: 'lucide', value: Lightbulb } },
      { name: 'Innovation', icon: { type: 'lucide', value: Lightbulb } },
      {
        name: 'Agile Methodologies',
        icon: { type: 'image', value: 'https://cdn.worldvectorlogo.com/logos/scrum-1.svg' },
      },
    ],
  },
  {
    category: 'Fields',
    skills: [
      { name: 'Wealth Management', icon: { type: 'lucide', value: Landmark } },
      { name: 'Risk Management', icon: { type: 'lucide', value: CloudLightning } },
      { name: 'Financial Products', icon: { type: 'lucide', value: ChartCandlestick } },
      { name: 'Artificial Intelligence', icon: { type: 'lucide', value: BrainCircuit } },
    ],
  },
  {
    category: 'Miscellaneous',
    skills: [
      { name: 'Team Leadership', icon: { type: 'lucide', value: Users } },
      { name: 'Stakeholder Management', icon: { type: 'lucide', value: Users } },
      { name: 'Technical Writing', icon: { type: 'lucide', value: Code } },
      { name: 'Public Speaking', icon: { type: 'lucide', value: Presentation } },
      { name: 'Client Management', icon: { type: 'lucide', value: Users } },
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
        name: 'Terraform',
        icon: {
          type: 'image',
          value: 'https://cdn.worldvectorlogo.com/logos/terraform-enterprise.svg',
        },
      },
      {
        name: 'Nomad',
        icon: { type: 'image', value: 'https://cdn.worldvectorlogo.com/logos/nomad-2.svg' },
      },
      {
        name: 'Git',
        icon: { type: 'image', value: 'https://cdn.worldvectorlogo.com/logos/git-icon.svg' },
      },
      {
        name: 'SQL',
        icon: { type: 'lucide', value: Database },
      },
      {
        name: 'API Design',
        icon: { type: 'lucide', value: EthernetPort },
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
