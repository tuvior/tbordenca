import { profileData } from '@/data/profileData';
import { siteData } from '@/data/siteData';
import { getAllPosts } from '@/lib/blog';

export const dynamic = 'force-static';

const toAbsoluteUrl = (path: string) => `${siteData.url}${path === '/' ? '' : path}`;

export async function GET() {
  const posts = await getAllPosts();
  // TODO: expose articles as .mdx files.
  const blogArticlesSection =
    posts.length > 0
      ? posts.flatMap(post => [
          `### ${post.title}`,
          '',
          `${post.description}`,
          '',
          `Post date: ${post.date}`,
          toAbsoluteUrl(`/blog/${post.slug}`),
          '',
        ])
      : ['No published blog articles yet.', ''];

  const lines = [
    `# ${siteData.name}`,
    '',
    `> Personal portfolio and blog of ${profileData.name}, Product Manager.`,
    '',
    '## Site',
    '',
    `- [Home](${toAbsoluteUrl('/')})`,
    `- [Blog](${toAbsoluteUrl('/blog')})`,
    `- [Projects](${toAbsoluteUrl('/projects')})`,
    `- [Resume](${toAbsoluteUrl('/resume')})`,
    '',
    '## Blog Articles',
    '',
    ...blogArticlesSection,
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
