import type { MDXComponents } from 'mdx/types';

import Aside from './Aside';
import Caption from './Caption';
import CodeBlock from './CodeBlock';
import MdxImage from './MdxImage';
import MdxLink from './MdxLink';
import Spoiler from './Spoiler';

export const mdxComponents: MDXComponents = {
  a: MdxLink,
  img: MdxImage,
  pre: CodeBlock,
  Aside,
  Spoiler,
  Caption,
};
