import type { MDXComponents } from 'mdx/types';

import { mdxComponents } from '@/components/mdx/mdxComponents';

export function useMDXComponents(): MDXComponents {
  return mdxComponents;
}
