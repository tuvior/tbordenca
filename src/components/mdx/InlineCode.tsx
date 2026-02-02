import type { HTMLAttributes } from 'react';

const isBlockCode = (className?: string, dataLanguage?: string, dataTheme?: string) => {
  if (dataLanguage || dataTheme) {
    return true;
  }

  if (!className) {
    return false;
  }

  return className.includes('language-') || className.includes('lang-');
};

type InlineCodeProps = HTMLAttributes<HTMLElement> & {
  'data-language'?: string;
  'data-theme'?: string;
};

export default function InlineCode({
  className,
  style,
  children,
  'data-language': dataLanguage,
  'data-theme': dataTheme,
  ...rest
}: InlineCodeProps) {
  const blockCode = isBlockCode(className, dataLanguage, dataTheme);
  const combinedClassName = blockCode
    ? className
    : ['not-prose bg-nord-3/10 dark:bg-nord-3/40 rounded-[3px] px-1.5 py-0.5', className]
        .filter(Boolean)
        .join(' ');
  const combinedStyle = blockCode
    ? style
    : {
        fontFamily: 'var(--font-jetbrains-mono), monospace',
        ...style,
      };

  return (
    <code
      className={combinedClassName}
      style={combinedStyle}
      data-language={dataLanguage}
      data-theme={dataTheme}
      {...rest}
    >
      {children}
    </code>
  );
}
