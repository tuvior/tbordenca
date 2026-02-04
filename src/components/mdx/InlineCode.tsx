/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CSSProperties, HTMLAttributes } from 'react';

function isBlockCode(style?: CSSProperties) {
  return style?.display === 'grid';
}

type CodeProps = HTMLAttributes<HTMLElement> & {
  'data-language'?: string;
  'data-theme'?: string;
};

type CSSVars = Record<`--${string}`, string | number>;
type StyleWithVars = React.CSSProperties & CSSVars;

export default function InlineCode({
  style,
  className,
  'data-language': dataLanguage,
  'data-theme': dataTheme,
  children,
}: CodeProps) {
  const blockCode = isBlockCode(style);

  // eslint-disable-next-block @typescript-eslint/no-unused-vars
  const {
    ['--shiki-light-bg']: _unused1,
    ['--shiki-dark-bg']: _unused2,
    ...cleanedStyle
  } = (style ?? {}) as StyleWithVars;

  return (
    <code
      className={
        blockCode
          ? className
          : 'not-prose bg-nord-3/10 dark:bg-nord-3/40 rounded-[3px] px-1.5 py-0.5'
      }
      data-language={dataLanguage}
      data-theme={dataTheme}
      style={cleanedStyle}
    >
      {children}
    </code>
  );
}
