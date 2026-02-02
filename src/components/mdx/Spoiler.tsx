import type { ReactNode } from 'react';

import styles from './Spoiler.module.css';

const DEFAULT_TITLE = 'Spoiler';

type SpoilerProps = {
  title?: string;
  children: ReactNode;
};

export default function Spoiler({ title = DEFAULT_TITLE, children }: SpoilerProps) {
  return (
    <details className={['not-prose my-6 py-4', styles.details].filter(Boolean).join(' ')}>
      <summary
        className={[
          "text-nord-10 dark:text-nord-8 before:text-nord-9 dark:before:text-nord-8 flex cursor-pointer list-none items-center gap-2 font-medium before:transition-transform before:duration-200 before:ease-in-out before:content-[\'\\2799\']",
          styles.summary,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {title}
      </summary>
      <div className="text-nord-3 dark:text-nord-4 mt-3">{children}</div>
    </details>
  );
}
