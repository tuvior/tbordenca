import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="bg-nord-6 py-16 dark:bg-nord-0">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="card flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-nord-9 dark:text-nord-8">
              404
            </p>
            <h1 className="text-3xl font-semibold md:text-4xl">
              This page went off the map.
            </h1>
            <p className="max-w-xl text-base text-nord-3 dark:text-nord-4">
              The page you were looking for does not exist or has moved. Head back to
              the portfolio highlights and projects.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="btn btn-primary inline-flex items-center gap-2">
              Back home
              <ArrowRight size={16} />
            </Link>
            <Link href="/projects" className="btn btn-secondary">
              View projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
