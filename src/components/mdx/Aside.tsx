import type { ReactNode } from 'react';

import styles from './Aside.module.css';

type AsideProps = {
  type?: 'info' | 'warning' | 'error';
  children: ReactNode;
};

export default function Aside({ type = 'info', children }: AsideProps) {
  return (
    <aside
      className={[
        styles.root,
        'mdx-callout text-nord-0 dark:text-nord-6 border-nord-4/50 dark:border-nord-3/60 relative my-6 -mx-4 rounded-2xl border border-l-4 px-3 py-4 shadow-lg md:-mx-8 md:px-6.5',
      ]
        .filter(Boolean)
        .join(' ')}
      data-callout={type}
    >
      <div className="text-nord-2 dark:text-nord-5">{children}</div>
    </aside>
  );
}
