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
    <aside className="mdx-callout" data-callout={type}>
      <div className="mdx-callout__header">
        <span className="mdx-callout__icon" aria-hidden="true">
          <Icon size={16} />
        </span>
        <span className="mdx-callout__title">{typeLabels[type]}</span>
      </div>
      <div className="mdx-callout__content">{children}</div>
    </aside>
  );
}
