const evooqLogo = "/img/evooq-black.svg";

export type Experience = {
  company: {
    name: string;
    description: string;
    logo: string;
    website: string;
  };
  role: string;
  period: string;
  description: string;
  achievements: string[];
  relatedProjects: string[];
};

const evooq = {
  name: "Evooq",
  description:
    "Evooq is a Swiss fintech company providing a white-label wealth management platform used by private banks and asset managers across Europe and Asia.",
  logo: evooqLogo,
  website: "https://www.evooq.ch",
};

export const experienceData: Experience[] = [
  {
    company: evooq,
    role: 'Product Manager',
    period: 'Jul 2023 – Jul 2025',
    description:
      'Owned and shaped multiple core modules of Evooq\'s Wealth Management platform, from strategy and discovery to delivery and large-scale adoption by tier-1 banks. Acted as product lead across regulatory, business, and technical dimensions.',
    achievements: [
      'Led end-to-end delivery of several platform modules, accompanying products from early conception to large-scale adoption by banks worldwide.',
      'Overhauled the portfolio optimizer from methodology to UX, simplifying core workflows and driving a significant increase in adoption, contributing ~2M ARR.',
      'Enabled LLM-supported investment proposal summaries for end clients, reducing proposal finalization time from hours/days to near-instant.',
      'Unlocked the French market by leading the design and rollout of life insurance portfolio management within the platform.',
      'Owned the regulatory watch (e.g. LSFin, MiFID II), translating new requirements into concrete platform changes and coordinating execution across product teams.',
      'Ran a multi-module, multi-team roadmap balancing client demands, technical evolution, and long-term platform quality.',
      'Supported enterprise sales and RFPs as product and subject-matter expert, contributing to multiple competitive wins.',
    ],
    relatedProjects: [
      'Wealth Management Platform',
      'Portfolio Optimizer',
      'Life Insurance Portfolio Management',
      'LLM Investment Proposals',
      'Regulatory Compliance',
    ],
  },
  {
    company: evooq,
    role: 'Product Owner',
    period: 'Nov 2022 – Jan 2025',
    description:
      'Owned day-to-day product execution for the portfolio simulation page of the Wealth Platform and the Investment Workbench, acting as the bridge between business, clients, and delivery teams.',
    achievements: [
      'Designed and delivered a market and macro-signal application allowing CIOs and portfolio managers to monitor, customize, and operationalize investment signals.',
      'Built a data pipeline ingesting technical and macro-economic data, transforming manual, day-long processes into real-time dashboards.',
      'Managed and prioritized the product backlog, wrote detailed user stories, and validated delivered features to ensure high functional and technical quality.',
      'Improved delivery efficiency and predictability by refining team processes and clarifying product intent, nearly doubling team velocity.',
      'Acted as primary product contact for internal stakeholders, sales, and clients, ensuring alignment between delivery and business priorities.',
    ],
    relatedProjects: [
      'Investment Workbench',
      'Market & Macro Signal Application',
      'Model Portfolio Management',
    ],
  },
  {
    company: evooq,
    role: 'Software Engineer',
    period: 'Jun 2019 – Oct 2022',
    description:
      'Worked as a backend-oriented software engineer on core wealth management products, contributing from architecture and prototyping to production support.',
    achievements: [
      'Designed and implemented a financial product recommender system trained on ~11k client profiles, which evolved from proof of concept into a long-term product differentiator.',
      'Delivered a user-facing portfolio optimizer by translating complex quantitative and mathematical APIs into intuitive product workflows.',
      'Owned several services end-to-end, from design and development to deployment, monitoring, and production support.',
      'Regularly reviewed pull requests, improved code quality and tooling, and contributed to technical documentation.',
      'Actively supported production operations through troubleshooting, root-cause analysis, and cross-team collaboration.',
    ],
    relatedProjects: [
      'Financial Product Recommender',
      'Portfolio Optimizer',
      'Wealth Management Backend Services',
    ],
  },
  {
    company: evooq,
    role: 'Machine Learning Intern',
    period: 'Feb 2019 – Jun 2019',
    description:
      'Conducted applied machine learning research focused on recommender systems for wealth management use cases.',
    achievements: [
      'Researched, trained, and evaluated a recommendation engine for financial products using real client data.',
      'Delivered a production-ready proof of concept that later became the foundation for a core platform feature.',
    ],
    relatedProjects: ['Financial Product Recommender'],
  },
  {
    company: {
      name: 'Credit Suisse',
      description:
        'Swiss multinational investment bank and financial services company.',
      logo: 'https://cdn.brandfetch.io/id5R0NevJp/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B',
      website: 'https://www.credit-suisse.com',
    },
    role: 'Data Science Intern',
    period: 'Feb 2018 – Aug 2018',
    description:
      'Worked on applied data science initiatives within a large banking environment.',
    achievements: [
      'Supported data analysis and modeling tasks in a regulated financial context.',
      'Gained hands-on exposure to large-scale data, enterprise constraints, and banking workflows.',
    ],
    relatedProjects: [],
  },
];
