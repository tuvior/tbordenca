import type { ReactElement } from 'react';

import type { CompileOptions } from '@mdx-js/mdx';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import remarkSmartypants from 'remark-smartypants';
import type { Node } from 'unist';
import { visit } from 'unist-util-visit';

import { mdxComponents } from '@/components/mdx/mdxComponents';
import { nordDarkTheme } from '@/lib/themes/nordDark';
import { nordLightTheme } from '@/lib/themes/nordLight';

type MdxDirectiveNode = {
  type: string;
  name?: string;
  attributes?: Array<{ type: string; name: string; value: unknown }>;
  children?: unknown[];
};

function remarkCallouts() {
  return (tree: unknown) => {
    visit(tree as Node, (node: MdxDirectiveNode) => {
      if (node.type !== 'containerDirective') {
        return;
      }

      switch (node.name) {
        case 'spoiler': {
          node.type = 'mdxJsxFlowElement';
          node.name = 'Spoiler';
          node.attributes = Array.isArray(node.attributes) ? node.attributes : [];
          break;
        }
        case 'caption': {
          node.type = 'mdxJsxFlowElement';
          node.name = 'Caption';
          node.attributes = Array.isArray(node.attributes) ? node.attributes : [];
          break;
        }
        case 'info':
        case 'warning':
        case 'error': {
          const calloutType = node.name;
          const attributes = Array.isArray(node.attributes) ? [...node.attributes] : [];

          node.type = 'mdxJsxFlowElement';
          node.name = 'Aside';
          attributes.push({
            type: 'mdxJsxAttribute',
            name: 'type',
            value: calloutType,
          });
          node.attributes = attributes;
          break;
        }
      }
    });
  };
}

const rehypePrettyCodeOptions = {
  theme: { light: nordLightTheme, dark: nordDarkTheme },
  keepBackground: true,
  onVisitLine(node: { children: unknown[] }) {
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }];
    }
  },
  onVisitHighlightedLine(node: { properties?: { className?: string[] } }) {
    const className = node.properties?.className ?? [];
    node.properties = {
      ...node.properties,
      className: [...className, 'line-highlighted'],
    };
  },
};

const mdxCompilerOptions: CompileOptions = {
  remarkPlugins: [remarkGfm, remarkDirective, remarkCallouts, remarkSmartypants],
  rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]] as CompileOptions['rehypePlugins'],
};

export const compileBlogMdx = async (source: string): Promise<ReactElement> => {
  const { content } = await compileMDX({
    source,
    options: {
      mdxOptions: mdxCompilerOptions,
    },
    components: mdxComponents,
  });

  return content;
};
