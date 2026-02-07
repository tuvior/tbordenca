import type { MDXComponents } from 'mdx/types';

import Aside from '@/components/mdx/Aside';
import Caption from '@/components/mdx/Caption';
import CodeBlock from '@/components/mdx/CodeBlock';
import InlineCode from '@/components/mdx/InlineCode';
import MdxImage from '@/components/mdx/MdxImage';
import MdxLink from '@/components/mdx/MdxLink';
import Spoiler from '@/components/mdx/Spoiler';
import TextWithNote from '@/components/mdx/TextWithNote';

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
