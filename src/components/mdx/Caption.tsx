import type { ReactNode } from 'react';

type CaptionProps = {
  children: ReactNode;
};

export default function Caption({ children }: CaptionProps) {
  return <span className="mdx-caption">{children}</span>;
}
