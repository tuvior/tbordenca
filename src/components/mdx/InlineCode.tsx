import type { CSSProperties, HTMLAttributes } from 'react';

function isBlockCode(style?: CSSProperties) {
  return style?.display === 'grid';
}

export default function InlineCode({ style, children }: HTMLAttributes<HTMLElement>) {
  const blockCode = isBlockCode(style);

  return (
    <code
      className={
        blockCode
          ? undefined
          : 'not-prose bg-nord-3/10 dark:bg-nord-3/40 rounded-[3px] px-1.5 py-0.5'
      }
    >
      {children}
    </code>
  );
}
