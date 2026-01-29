import type { ReactNode } from 'react';

import { BadgeInfo, OctagonAlert, TriangleAlert } from 'lucide-react';

const typeLabels: Record<'info' | 'warning' | 'error', string> = {
  info: 'Info',
  warning: 'Warning',
  error: 'Error',
};

const typeIcons: Record<'info' | 'warning' | 'error', typeof BadgeInfo> = {
  info: BadgeInfo,
  warning: TriangleAlert,
  error: OctagonAlert,
};

type AsideProps = {
  type?: 'info' | 'warning' | 'error';
  children: ReactNode;
};

export default function Aside({ type = 'info', children }: AsideProps) {
  const Icon = typeIcons[type] ?? BadgeInfo;

  return (
    <aside
      className="mdx-callout text-nord-0 dark:text-nord-6 border-nord-4/50 dark:border-nord-3/60 relative my-6 rounded-2xl border border-l-4 px-3 py-4 shadow-lg md:px-6"
      data-callout={type}
    >
      <div className="mdx-callout__header hidden items-center gap-2 md:flex">
        <span className="mdx-callout__icon" aria-hidden="true">
          <Icon size={16} />
        </span>
        <span className="mdx-callout__title text-[0.75rem] font-semibold tracking-[0.3em] uppercase">
          {typeLabels[type]}
        </span>
      </div>
      <div className="text-nord-2 dark:text-nord-5 md:mt-3">{children}</div>
    </aside>
  );
}
