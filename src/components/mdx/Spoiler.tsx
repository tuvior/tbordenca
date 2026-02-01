import type { ReactNode } from 'react';

import styles from './Spoiler.module.css';

const DEFAULT_TITLE = 'Spoiler';

type SpoilerProps = {
  title?: string;
  children: ReactNode;
};

export default function Spoiler({ title = DEFAULT_TITLE, children }: SpoilerProps) {
  return (
    <details className={['mdx-spoiler my-6 py-4', styles.details].filter(Boolean).join(' ')}>
      <summary
        className={[
          'mdx-spoiler__summary text-nord-10 dark:text-nord-8 before:text-nord-9 dark:before:text-nord-8 flex cursor-pointer items-center gap-2 font-medium before:transition-transform before:duration-200 before:ease-in-out before:content-[\'\\2799\'] list-none',
          styles.summary,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {title}
      </summary>
      <div className="mdx-spoiler__content text-nord-3 dark:text-nord-4 mt-3">{children}</div>
    </details>
  );
}
