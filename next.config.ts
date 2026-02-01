import path from 'node:path';

import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

import { nordDarkTheme } from './src/lib/themes/nordDark';
import { nordLightTheme } from './src/lib/themes/nordLight';

const rehypePrettyCodeOptions = {
  theme: { light: nordLightTheme, dark: nordDarkTheme },
  keepBackground: false,
};

const remarkCalloutsPath = path.join(process.cwd(), 'utils', 'remarkCallouts.mjs');

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [
      'remark-frontmatter',
      ['remark-mdx-frontmatter', { name: 'metadata' }],
      'remark-gfm',
      'remark-directive',
      remarkCalloutsPath,
      'remark-smartypants',
    ],
    rehypePlugins: [['rehype-pretty-code', rehypePrettyCodeOptions]],
  },
});

const basePath = '/tbordenca';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  trailingSlash: true,
  images: {
    unoptimized: true,
    qualities: [75, 85],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default withMDX(nextConfig);
