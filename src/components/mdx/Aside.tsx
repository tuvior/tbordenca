import type { ReactNode } from 'react';

import styles from './Aside.module.css';

type AsideProps = {
  type?: 'info' | 'warning' | 'error';
  title?: string;
  children: ReactNode;
};

export default function Aside({ type = 'info', title, children }: AsideProps) {
  return (
    <aside
      className={[
        styles.root,
        'not-prose border-nord-4/50 dark:border-nord-3/60 relative -mx-4 my-6 rounded-2xl border border-l-4 px-3 py-6 shadow-lg md:-mx-8 md:px-7',
      ]
        .filter(Boolean)
        .join(' ')}
      data-callout={type}
    >
      {title ? <span className="mb-3 block font-semibold">{title}</span> : null}
      {children}
    </aside>
  );
}
