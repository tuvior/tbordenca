import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import withBasePath from '@/lib/basePath';
import { formatBlogDate, getAllPosts, getPostBySlug, getPostMeta } from '@/lib/blog';

export const dynamic = 'force-static';
export const dynamicParams = false;

const EMPTY_SLUG = '__empty__';

type BlogPostPageProps = {
  params: { slug: string } | Promise<{ slug: string }>;
};

const resolveParams = async (params: BlogPostPageProps['params']) => {
  return Promise.resolve(params);
};

export const generateStaticParams = async () => {
  const posts = getAllPosts();

  if (posts.length === 0) {
    return [{ slug: EMPTY_SLUG }];
  }

  return posts.map(post => ({ slug: post.slug }));
};

export const generateMetadata = async ({ params }: BlogPostPageProps) => {
  try {
    const { slug } = await resolveParams(params);
    const meta = getPostMeta(slug);

    return {
      title: meta.title,
      description: meta.description,
      openGraph: {
        title: meta.title,
        description: meta.description,
        type: 'article',
        publishedTime: meta.date,
      },
    };
  } catch {
    return {};
  }
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const { slug } = await resolveParams(params);
    const allPosts = getAllPosts();

    if (allPosts.length === 0 && slug === EMPTY_SLUG) {
      notFound();
    }

    const { meta, content } = await getPostBySlug(slug);
    const relatedPosts = meta.related
      ?.map(slug => allPosts.find(post => post.slug === slug))
      .filter((post): post is NonNullable<typeof post> => Boolean(post));

    return (
      <article className="blog-article bg-transparent py-16">
        <div className="mx-auto w-full max-w-3xl px-4">
          <header className="mt-6">
            <h1 className="font-display mt-4 text-4xl md:text-5xl">{meta.title}</h1>
            <p className="text-nord-3 dark:text-nord-4 mt-4 text-lg">{meta.description}</p>
            <div className="text-nord-3 dark:text-nord-4 mt-4 flex flex-wrap items-center gap-3 text-sm">
              <span>{formatBlogDate(meta.date)}</span>
              {meta.tags?.map(tag => (
                <span key={tag} className="skill-badge">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {meta.cover && (
            <div className="mt-10">
              <Image
                src={withBasePath(meta.cover)}
                alt=""
                className="max-h-105 w-full rounded-2xl object-cover"
                loading="lazy"
              />
            </div>
          )}

          <div className="mdx mt-10">{content}</div>

          {relatedPosts && relatedPosts.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-semibold">Related posts</h2>
              <div className="mt-6 grid gap-6">
                {relatedPosts.map(post => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="card block hover:-translate-y-0.5"
                  >
                    <p className="text-nord-3 dark:text-nord-4 text-sm">
                      {formatBlogDate(post.date)}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold">{post.title}</h3>
                    <p className="text-nord-3 dark:text-nord-4 mt-2">{post.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    );
  } catch {
    notFound();
  }
}
