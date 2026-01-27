import { Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import ArticleTag from '@/components/ui/ArticleTag';
import withBasePath from '@/lib/basePath';
import { BlogPostMeta, formatBlogDate } from '@/lib/blog';

type ArticleCardProps = {
  post: BlogPostMeta;
};

export default function ArticleCard({ post }: ArticleCardProps) {
  return (
    <article className="card">
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
            {' '}
            <span className="flex items-center">
              <Calendar size={18} className="mr-1 inline" />
              {formatBlogDate(post.date)}
            </span>
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
                <ArticleTag key={tag} tag={tag} />
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
