import Image from 'next/image';
import Link from 'next/link';

import withBasePath from '@/lib/basePath';
import { formatBlogDate, getAllPosts } from '@/lib/blog';

export const dynamic = 'force-static';

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <section className="bg-nord-6 dark:bg-nord-0 py-16">
      <div className="mx-auto w-full max-w-4xl px-4">
        <header className="mb-12">
          <p className="text-nord-9 dark:text-nord-8 text-xs font-semibold tracking-[0.3em] uppercase">
            Blog
          </p>
          <h1 className="font-display mt-4 text-4xl md:text-5xl">Writing & product notes</h1>
          <p className="text-nord-3 dark:text-nord-4 mt-4 max-w-2xl text-lg">
            Short essays on product, design, and engineering craft.
          </p>
        </header>

        <div className="space-y-8">
          {posts.length === 0 && (
            <div className="card text-nord-3 dark:text-nord-4">No posts yet. Check back soon.</div>
          )}

          {posts.map(post => (
            <article key={post.slug} className="card">
              <div className="flex flex-col gap-6 md:flex-row">
                {post.cover && (
                  <div className="md:w-48">
                    <Image
                      src={withBasePath(post.cover)}
                      alt=""
                      className="h-40 w-full rounded-xl object-cover"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="flex-1">
                  <p className="text-nord-3 dark:text-nord-4 text-sm">
                    {formatBlogDate(post.date)}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">
                    <Link
                      className="text-nord-0 dark:text-nord-6 hover:text-nord-9 dark:hover:text-nord-7"
                      href={`/blog/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-nord-3 dark:text-nord-4 mt-3 text-base md:text-lg">
                    {post.description}
                  </p>

                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <span key={tag} className="skill-badge">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
