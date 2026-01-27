import fs from 'node:fs';
import path from 'node:path';

import type { ReactElement } from 'react';

import type { CompileOptions } from '@mdx-js/mdx';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import type { ThemeRegistrationRaw } from 'shiki';
import type { Node } from 'unist';
import { SKIP, visit } from 'unist-util-visit';

import { mdxComponents } from '@/components/mdx/mdxComponents';

const THEME_DIR = path.join(process.cwd(), 'src', 'lib', 'themes');
const NORD_DARK_THEME_PATH = path.join(THEME_DIR, 'nord-dark.json');
const NORD_LIGHT_THEME_PATH = path.join(THEME_DIR, 'nord-light.json');

type MdxDirectiveNode = {
  type: string;
  name?: string;
  attributes?: Array<{ type: string; name: string; value: unknown }>;
  children?: unknown[];
};

const parseJsonc = (value: string): ThemeRegistrationRaw => {
  const withoutBlockComments = value.replace(/\/\*[\s\S]*?\*\//g, '');
  const withoutLineComments = withoutBlockComments.replace(/\/\/.*$/gm, '');
  const withoutTrailingCommas = withoutLineComments.replace(/,\s*([}\]])/g, '$1');

  return JSON.parse(withoutTrailingCommas) as ThemeRegistrationRaw;
};

const loadTheme = (
  filePath: string,
  name: string,
  type: 'light' | 'dark'
): ThemeRegistrationRaw => {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const parsed = parseJsonc(raw);

  return {
    ...parsed,
    name,
    type,
  };
};

const nordDarkTheme = loadTheme(NORD_DARK_THEME_PATH, 'nord-custom-dark', 'dark');
const nordLightTheme = loadTheme(NORD_LIGHT_THEME_PATH, 'nord-custom-light', 'light');

const remarkCallouts = () => {
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
};

const remarkInlineFootnotes = () => {
  return (tree: { children?: unknown[] }) => {
    let counter = 0;
    const definitions: unknown[] = [];

    visit(
      tree as Node,
      'text',
      (node: { value?: string }, index, parent: { children?: unknown[] }) => {
        if (
          !parent ||
          typeof index !== 'number' ||
          !parent.children ||
          typeof node.value !== 'string'
        ) {
          return;
        }

        if (!node.value.includes('^[')) {
          return;
        }

        const parts: unknown[] = [];
        const regex = /\^\[([\s\S]+?)\]/g;
        let lastIndex = 0;
        let match = regex.exec(node.value);

        while (match) {
          if (match.index > lastIndex) {
            parts.push({ type: 'text', value: node.value.slice(lastIndex, match.index) });
          }

          const id = `inline-${++counter}`;
          parts.push({ type: 'footnoteReference', identifier: id, label: id });
          definitions.push({
            type: 'footnoteDefinition',
            identifier: id,
            label: id,
            children: [
              {
                type: 'paragraph',
                children: [{ type: 'text', value: match[1].trim() }],
              },
            ],
          });

          lastIndex = match.index + match[0].length;
          match = regex.exec(node.value);
        }

        if (parts.length === 0) {
          return;
        }

        if (lastIndex < node.value.length) {
          parts.push({ type: 'text', value: node.value.slice(lastIndex) });
        }

        parent.children.splice(index, 1, ...parts);
        return [SKIP, index + parts.length];
      }
    );

    if (definitions.length > 0) {
      tree.children?.push(...definitions);
    }
  };
};

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
  remarkPlugins: [remarkInlineFootnotes, remarkGfm, remarkDirective, remarkCallouts],
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
