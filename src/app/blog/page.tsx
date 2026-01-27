import ArticleCard from '@/components/ui/ArticleCard';
import SectionTitle from '@/components/ui/SectionTitle';
import { getAllPosts } from '@/lib/blog';

export const dynamic = 'force-static';

export default function BlogIndexPage() {
  const articles = getAllPosts();

  return (
    <section className="bg-nord-6 dark:bg-nord-0 py-16">
      <div className="mx-auto w-full max-w-4xl px-4">
        <SectionTitle
          title="Blog"
          subtitle="Notes from experiments in tech, sport, cooking, photography, and other domains that reward curiosity."
        />

        <div className="space-y-8">
          {articles.length === 0 && (
            <div className="card text-nord-3 dark:text-nord-4">
              No articles yet. Check back soon.
            </div>
          )}

          {articles.map(post => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
