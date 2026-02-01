import { Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next/types';

import ArticleTag from '@/components/ui/ArticleTag';
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
  const posts = await getAllPosts();

  if (posts.length === 0) {
    return [{ slug: EMPTY_SLUG }];
  }

  return posts.map(post => ({ slug: post.slug }));
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const { slug } = await resolveParams(params);
    const meta = await getPostMeta(slug);

    return {
      title: meta.title,
      alternates: {
        canonical: `/blog/${slug}`,
      },
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
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const { slug } = await resolveParams(params);
    const allPosts = await getAllPosts();

    if (allPosts.length === 0 && slug === EMPTY_SLUG) {
      notFound();
    }

    const { meta, content } = await getPostBySlug(slug);
    const relatedPosts = meta.related
      ?.map(slug => allPosts.find(post => post.slug === slug))
      .filter((post): post is NonNullable<typeof post> => Boolean(post));

    return (
      <article className="blog-article bg-transparent py-16 pt-2">
        <div className="mx-auto w-full max-w-3xl px-4">
          <header className="mt-6">
            <h1 className="mb-4 text-4xl font-bold md:text-4xl lg:text-5xl">
              <span className="text-nord-10 dark:text-nord-8">{meta.title}</span>
            </h1>
            <p className="text-nord-2 dark:text-nord-4 mb-6 text-xl font-medium md:text-2xl">
              {meta.description}
            </p>
            <div className="text-nord-3 dark:text-nord-4 mt-4 flex flex-wrap items-center gap-3 text-sm">
              <span className="flex items-center">
                <Calendar size={18} className="mr-1 inline" />
                {formatBlogDate(meta.date)}
              </span>
              {meta.tags?.map(tag => (
                <ArticleTag key={tag} tag={tag} />
              ))}
            </div>
          </header>

          {meta.cover && (
            <div className="mt-10">
              <Image
                src={withBasePath(meta.cover)}
                alt="Article cover"
                className="max-h-105 w-full rounded-2xl object-cover"
                loading="lazy"
              />
            </div>
          )}

          <div className="mdx mt-30">{content}</div>

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
