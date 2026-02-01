import fs from 'node:fs';
import path from 'node:path';

import { createElement, type ReactElement } from 'react';

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content', 'blog');
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  cover?: string;
  related?: string[];
  draft?: boolean;
};

export type BlogPostMeta = BlogFrontmatter & {
  slug: string;
};

export type BlogPost = {
  meta: BlogPostMeta;
  content: ReactElement;
};

type BlogMdxModule = {
  default: (props: Record<string, unknown>) => ReactElement;
  metadata?: Record<string, unknown>;
};

const parseBlogDate = (value: string): Date | null => {
  if (!DATE_REGEX.test(value)) {
    return null;
  }

  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return date;
};

export const formatBlogDate = (value: string, locale = 'en-US') => {
  const parsed = parseBlogDate(value);

  if (!parsed) {
    return value;
  }

  return new Intl.DateTimeFormat(locale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(parsed);
};

const parseStringArray = (value: unknown, field: string, slug: string): string[] | undefined => {
  if (value === undefined) {
    return undefined;
  }

  if (!Array.isArray(value) || value.some(item => typeof item !== 'string')) {
    throw new Error(`Invalid frontmatter for ${slug}.mdx: ${field} must be an array of strings.`);
  }

  return value as string[];
};

const parseOptionalString = (value: unknown, field: string, slug: string): string | undefined => {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value !== 'string') {
    throw new Error(`Invalid frontmatter for ${slug}.mdx: ${field} must be a string.`);
  }

  return value;
};

const parseOptionalBoolean = (value: unknown, field: string, slug: string): boolean | undefined => {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value !== 'boolean') {
    throw new Error(`Invalid frontmatter for ${slug}.mdx: ${field} must be a boolean.`);
  }

  return value;
};

const parseFrontmatter = (data: Record<string, unknown>, slug: string): BlogPostMeta => {
  const title = data.title;
  const description = data.description;
  const date = data.date;

  if (typeof title !== 'string' || typeof description !== 'string' || typeof date !== 'string') {
    throw new Error(
      `Invalid frontmatter for ${slug}.mdx: title, description, and date are required.`
    );
  }

  if (!parseBlogDate(date)) {
    throw new Error(`Invalid frontmatter for ${slug}.mdx: date must be YYYY-MM-DD.`);
  }

  return {
    slug,
    title,
    description,
    date,
    tags: parseStringArray(data.tags, 'tags', slug),
    cover: parseOptionalString(data.cover, 'cover', slug),
    related: parseStringArray(data.related, 'related', slug),
    draft: parseOptionalBoolean(data.draft, 'draft', slug),
  };
};

const getDateTimestamp = (value: string) => {
  const parsed = parseBlogDate(value);
  return parsed ? parsed.getTime() : 0;
};

const importPostModule = async (slug: string): Promise<BlogMdxModule> => {
  return import(`@/content/blog/${slug}.mdx`);
};

export const getPostSlugs = () => {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [] as string[];
  }

  return fs
    .readdirSync(CONTENT_DIR)
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace(/\.mdx$/, ''));
};

export const getPostMeta = async (slug: string): Promise<BlogPostMeta> => {
  const { metadata } = await importPostModule(slug);

  return parseFrontmatter((metadata ?? {}) as Record<string, unknown>, slug);
};

export const getAllPosts = async (): Promise<BlogPostMeta[]> => {
  const posts = await Promise.all(getPostSlugs().map(slug => getPostMeta(slug)));

  return posts
    .filter(post => !post.draft)
    .sort((a, b) => getDateTimestamp(b.date) - getDateTimestamp(a.date));
};

export const getPostBySlug = async (slug: string): Promise<BlogPost> => {
  const { default: Post, metadata } = await importPostModule(slug);
  const meta = parseFrontmatter((metadata ?? {}) as Record<string, unknown>, slug);

  return {
    meta,
    content: createElement(Post),
  };
};
