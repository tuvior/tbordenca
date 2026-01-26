import type { ReactNode } from 'react';

const DEFAULT_TITLE = 'Spoiler';

type SpoilerProps = {
  title?: string;
  children: ReactNode;
};

export default function Spoiler({ title = DEFAULT_TITLE, children }: SpoilerProps) {
  return (
    <details className="mdx-spoiler">
      <summary className="mdx-spoiler__summary">{title}</summary>
      <div className="mdx-spoiler__content">{children}</div>
    </details>
  );
}
