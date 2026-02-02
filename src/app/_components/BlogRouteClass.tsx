'use client';

import { useEffect } from 'react';

import { usePathname } from 'next/navigation';

const BLOG_POST_CLASS = 'blog-post';

const normalizePath = (value: string) => {
  const trimmed = value.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
};

const isBlogPostPath = (pathname: string | null) => {
  if (!pathname) {
    return false;
  }

  const normalized = normalizePath(pathname);
  return normalized.startsWith('/blog/');
};

export default function BlogRouteClass() {
  const pathname = usePathname();

  useEffect(() => {
    const body = typeof document !== 'undefined' ? document.body : null;
    if (!body) {
      return;
    }

    const shouldApply = isBlogPostPath(pathname);
    body.classList.toggle(BLOG_POST_CLASS, shouldApply);

    return () => {
      body.classList.remove(BLOG_POST_CLASS);
    };
  }, [pathname]);

  return null;
}
