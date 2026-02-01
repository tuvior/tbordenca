import type { MDXComponents } from 'mdx/types';

import Aside from './Aside';
import Caption from './Caption';
import CodeBlock from './CodeBlock';
import InlineCode from './InlineCode';
import MdxImage from './MdxImage';
import MdxLink from './MdxLink';
import Spoiler from './Spoiler';

export const mdxComponents: MDXComponents = {
  a: MdxLink,
  code: InlineCode,
  img: MdxImage,
  pre: CodeBlock,
  Aside,
  Spoiler,
  Caption,
};
