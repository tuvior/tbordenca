import evooqLogo from '/img/evooq-black.svg?url';

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
  name: 'Evooq',
  description:
    'Evooq is a Swiss fintech company that provides a white-label wealth management platform for banks and asset managers.',
  logo: evooqLogo,
  website: 'https://www.evooq.ch',
};

export const experienceData = [
  {
    company: evooq,
    role: 'Product Manager',
    period: 'Jul 2023 - Jul 2025',
    description:
      'Led in-depth discovery and research of how to expand the scope of Evooq’s Wealth Management application to cover discretionary use cases at scale, opening up a new market segment.',
    achievements: [
      'Led multiple teams in the design and implementation of a major feature, allowing the management of life insurance portfolios in Evooq’s Wealth Management platform, and unlocking the whole French market as a result.',
      'Maintained multiple product roadmaps, balancing big client requirements with the company’s vision and business goals, ensuring the victory of several RFPs against major competitors.',
      'Managed the relationship with some key clients, improving communication and ensuring a better product/market fit by having a deeper understanding of their needs.',
    ],
    relatedProjects: ['Wealth Management Application', 'Life Insurance Portfolio Management'],
  },
  {
    company: evooq,
    role: 'Product Owner',
    period: 'Oct 2022 - Jan 2025',
    description:
      'Led the research, design, and implementation of an application allowing CIOs and portfolio managers to follow heavily customizable market and macro signals, and implement them in model portfolios.',
    achievements: [
      'Increased the delivery of features and quality by restructuring the team processes and providing business guidance to developers, nearly doubling the velocities of the development teams.',
      'Overhauled the portfolio simulation capabilities of Evooq’s Wealth Management platform, improving product coverage, and flexibility of use, thus boosting user adoption by 40%.',
    ],
    relatedProjects: ['Market Signal Application', 'Model Portfolio Management'],
  },
  {
    company: evooq,
    role: 'Software Engineer',
    period: 'Aug 2019 - Oct 2022',
    description:
      "Finalized the design of a recommender system for financial products for wealth management clients and deployed it to production, improving the company's USP and consequently winning many RFPs.",
    achievements: [
      'Implemented a portfolio optimizer in our portfolio management view, going from a technical, mathematical API to a user-friendly interface.',
    ],
    relatedProjects: ['Financial Product Recommender', 'Portfolio Optimizer'],
  },
  {
    company: evooq,
    role: 'Machine Learning Intern',
    period: 'Feb 2019 - Aug 2019',
    description:
      'Researched and built a proof of concept for a recommender system recommending financial products, trained on a dataset of 11k clients.',
    achievements: [],
    relatedProjects: ['Financial Product Recommender'],
  },
  {
    company: {
      name: 'Credit Suisse',
      description:
        'Credit Suisse is a Swiss multinational investment bank and financial services company.',
      logo: 'https://cdn.brandfetch.io/id5R0NevJp/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B',
      website: 'https://www.credit-suisse.com',
    },
    role: 'Data Science Intern',
    period: 'Feb 2018 - Aug 2018',
    description: '',
    achievements: [],
    relatedProjects: [],
  },
];
