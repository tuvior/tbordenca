import resumeUrl from '/doc/Tobias Bordenca Resume.pdf?url';

export type FooterData = {
  resume: {
    fileName: string;
    url: string;
  };
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    email?: string;
  };
};

export const footerData: FooterData = {
  resume: {
    fileName: 'Tobias_Bordenca_Resume.pdf',
    url: resumeUrl,
  },
  socialLinks: {
    linkedin: 'https://linkedin.com/in/tbordenca',
    github: 'https://github.com/tuvior',
    email: 'mailto:bordenca.tobias@gmail.com',
  },
};
