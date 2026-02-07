import type { MetadataRoute } from 'next';

import { siteData } from '@/data/siteData';
import { getAllPosts } from '@/lib/blog';

export const dynamic = 'force-static';
const toUtcMidnight = (date: string) => new Date(`${date}T00:00:00.000Z`);
const toAbsoluteUrl = (path: string) => `${siteData.url}${path === '/' ? '' : path}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const latestPostDate = posts[0] ? toUtcMidnight(posts[0].date) : undefined;

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: toAbsoluteUrl('/'),
      lastModified: latestPostDate,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: toAbsoluteUrl('/projects'),
      lastModified: latestPostDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: toAbsoluteUrl('/resume'),
      lastModified: latestPostDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: toAbsoluteUrl('/blog'),
      lastModified: latestPostDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  const articlePages: MetadataRoute.Sitemap = posts.map(post => ({
    url: toAbsoluteUrl(`/blog/${post.slug}`),
    lastModified: toUtcMidnight(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...articlePages];
}
