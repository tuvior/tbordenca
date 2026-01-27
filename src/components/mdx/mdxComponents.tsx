import type { MDXComponents } from 'mdx/types';

import Aside from './Aside';
import CodeBlock from './CodeBlock';
import MdxImage from './MdxImage';
import MdxLink from './MdxLink';
import Spoiler from './Spoiler';
import Caption from './Caption';

export const mdxComponents: MDXComponents = {
  a: MdxLink,
  img: MdxImage,
  pre: CodeBlock,
  Aside,
  Spoiler,
  Caption,
};
