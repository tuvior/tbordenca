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
import { StaticImageData } from 'next/image';

import adobeAnalyticsLogo from '@/assets/img/skills/adobe-analytics.svg';
import confluenceLogo from '@/assets/img/skills/confluence.svg';
import cssLogo from '@/assets/img/skills/css.svg';
import dockerLogo from '@/assets/img/skills/docker.svg';
import excelLogo from '@/assets/img/skills/excel.svg';
import figmaLogo from '@/assets/img/skills/figma.svg';
import gitLogo from '@/assets/img/skills/git.svg';
import googleAnalyticsLogo from '@/assets/img/skills/google-analytics.svg';
import javaLogo from '@/assets/img/skills/java.svg';
import javascriptLogo from '@/assets/img/skills/javascript.svg';
import jiraLogo from '@/assets/img/skills/jira.svg';
import kotlinLogo from '@/assets/img/skills/kotlin.svg';
import kubernetesLogo from '@/assets/img/skills/kubernetes.svg';
import miroLogo from '@/assets/img/skills/miro.svg';
import nextjsLogo from '@/assets/img/skills/next-js.svg';
import nodejsLogo from '@/assets/img/skills/nodejs.svg';
import nomadLogo from '@/assets/img/skills/nomad.svg';
import postHogLogo from '@/assets/img/skills/posthog.svg';
import pythonLogo from '@/assets/img/skills/python.svg';
import reactLogo from '@/assets/img/skills/react.svg';
import rustLogo from '@/assets/img/skills/rust.svg';
import scalaLogo from '@/assets/img/skills/scala.svg';
import scrumLogo from '@/assets/img/skills/scrum.svg';
import springBootLogo from '@/assets/img/skills/spring-boot.svg';
import terraformLogo from '@/assets/img/skills/terraform.svg';
import typescriptLogo from '@/assets/img/skills/typescript.svg';
import vueLogo from '@/assets/img/skills/vue.svg';

export type Skill = {
  name: string;
  icon: SkillIcon;
};

export type SkillIcon = {
  type: 'lucide' | 'image';
  value: LucideIcon | StaticImageData;
};

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
      { name: 'Agile Methodologies', icon: { type: 'image', value: scrumLogo } },
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
      { name: 'Python', icon: { type: 'image', value: pythonLogo } },
      { name: 'Java', icon: { type: 'image', value: javaLogo } },
      { name: 'Kotlin', icon: { type: 'image', value: kotlinLogo } },
      { name: 'Rust', icon: { type: 'image', value: rustLogo } },
      { name: 'Scala', icon: { type: 'image', value: scalaLogo } },
      { name: 'Spring Boot', icon: { type: 'image', value: springBootLogo } },
      { name: 'HTML/CSS', icon: { type: 'image', value: cssLogo } },
      { name: 'JavaScript', icon: { type: 'image', value: javascriptLogo } },
      { name: 'TypeScript', icon: { type: 'image', value: typescriptLogo } },
      { name: 'React', icon: { type: 'image', value: reactLogo } },
      { name: 'Next.js', icon: { type: 'image', value: nextjsLogo } },
      { name: 'Vue.js', icon: { type: 'image', value: vueLogo } },
      { name: 'Node.js', icon: { type: 'image', value: nodejsLogo } },
      { name: 'Docker', icon: { type: 'image', value: dockerLogo } },
      { name: 'Kubernetes', icon: { type: 'image', value: kubernetesLogo } },
      { name: 'Terraform', icon: { type: 'image', value: terraformLogo } },
      { name: 'Nomad', icon: { type: 'image', value: nomadLogo } },
      { name: 'Git', icon: { type: 'image', value: gitLogo } },
      { name: 'SQL', icon: { type: 'lucide', value: Database } },
      { name: 'API Design', icon: { type: 'lucide', value: EthernetPort } },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Excel', icon: { type: 'image', value: excelLogo } },
      { name: 'Jira', icon: { type: 'image', value: jiraLogo } },
      { name: 'Confluence', icon: { type: 'image', value: confluenceLogo } },
      { name: 'Figma', icon: { type: 'image', value: figmaLogo } },
      { name: 'Miro', icon: { type: 'image', value: miroLogo } },
      { name: 'PostHog', icon: { type: 'image', value: postHogLogo } },
      { name: 'Google Analytics', icon: { type: 'image', value: googleAnalyticsLogo } },
      { name: 'Adobe Analytics', icon: { type: 'image', value: adobeAnalyticsLogo } },
    ],
  },
];
