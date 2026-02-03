import type { MDXComponents } from 'mdx/types';

import Aside from './Aside';
import Caption from './Caption';
import CodeBlock from './CodeBlock';
import InlineCode from './InlineCode';
import MdxImage from './MdxImage';
import MdxLink from './MdxLink';
import Spoiler from './Spoiler';
import TextWithNote from './TextWithNote';

export const mdxComponents: MDXComponents = {
  a: MdxLink,
  img: MdxImage,
  pre: CodeBlock,
  code: InlineCode,
  Aside,
  Spoiler,
  Caption,
  TextWithNote,
};
