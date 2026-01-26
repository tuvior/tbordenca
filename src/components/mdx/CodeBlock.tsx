'use client';

import type { CSSProperties, HTMLAttributes, ReactElement, ReactNode } from 'react';
import { useMemo, useRef, useState } from 'react';

const getTextContent = (node: ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getTextContent).join('');
  }

  if (node && typeof node === 'object' && 'props' in node) {
    const element = node as ReactElement<{ children?: ReactNode }>;
    return getTextContent(element.props.children);
  }

  return '';
};

type CodeBlockProps = HTMLAttributes<HTMLPreElement> & {
  'data-language'?: string;
  'data-theme'?: string;
};

const parseStyleString = (value: string): CSSProperties => {
  const style: Record<string, string> = {};

  value.split(';').forEach(part => {
    const [rawKey, rawValue] = part.split(':');
    if (!rawKey || !rawValue) {
      return;
    }

    const key = rawKey.trim();
    const val = rawValue.trim();

    if (!key || !val) {
      return;
    }

    if (key.startsWith('--')) {
      style[key] = val;
      return;
    }

    const camelKey = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    style[camelKey] = val;
  });

  return style as CSSProperties;
};

const normalizeStyle = (style?: CSSProperties | string) => {
  if (!style) {
    return undefined;
  }

  if (typeof style === 'string') {
    return parseStyleString(style);
  }

  return style;
};

export default function CodeBlock({
  children,
  className,
  'data-language': dataLanguage,
  'data-theme': dataTheme,
  style,
  ...rest
}: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const codeText = useMemo(() => getTextContent(children), [children]);
  const language = typeof dataLanguage === 'string' ? dataLanguage : undefined;
  const hasTheme = typeof dataTheme === 'string' && dataTheme.length > 0;
  const normalizedStyle = useMemo(() => normalizeStyle(style), [style]);

  const { preStyle, wrapperStyle } = useMemo(() => {
    if (!normalizedStyle) {
      return { preStyle: undefined, wrapperStyle: undefined };
    }

    const nextPreStyle: CSSProperties = { ...normalizedStyle };
    const styleVars = normalizedStyle as Record<string, string | number>;
    const lightBg = styleVars.backgroundColor ?? styleVars['background-color'];
    const lightBgVar = styleVars['--shiki-light-bg'];
    const darkBgVar = styleVars['--shiki-dark-bg'];
    const lightBgValue =
      typeof lightBgVar === 'string' && lightBgVar.length > 0
        ? lightBgVar
        : typeof lightBg === 'string'
          ? lightBg
          : undefined;
    const darkBgValue =
      typeof darkBgVar === 'string' && darkBgVar.length > 0 ? darkBgVar : undefined;

    delete (nextPreStyle as Record<string, string>).backgroundColor;
    delete (nextPreStyle as Record<string, string>)['background-color'];

    const wrapperStyleValue =
      lightBgValue || darkBgValue
        ? ({
            '--code-bg-light': lightBgValue ?? '',
            '--code-bg-dark': darkBgValue ?? '',
          } as CSSProperties)
        : undefined;

    return { preStyle: nextPreStyle, wrapperStyle: wrapperStyleValue };
  }, [normalizedStyle]);
  const useShikiTheme = hasTheme && Boolean(wrapperStyle);

  const normalizeCodeText = (value: string) => {
    const lines = value.replace(/\r\n/g, '\n').split('\n');

    while (lines.length > 0 && lines[0].trim() === '') {
      lines.shift();
    }

    while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
      lines.pop();
    }

    return lines.join('\n');
  };

  const getCodeText = () => {
    const pre = preRef.current;
    const code = pre?.querySelector('code');

    if (!code) {
      return normalizeCodeText(codeText);
    }

    const lineElements = code.querySelectorAll('[data-line]');
    if (lineElements.length > 0) {
      const lines = Array.from(lineElements).map(line => line.textContent ?? '');
      return normalizeCodeText(lines.join('\n'));
    }

    return normalizeCodeText(code.textContent ?? '');
  };

  const handleCopy = async () => {
    const text = getCodeText();
    if (!text) {
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className={['code-block group', useShikiTheme ? 'code-block--shiki' : '']
        .filter(Boolean)
        .join(' ')}
      style={wrapperStyle}
    >
      {language && <span className="code-block__language">{language}</span>}
      <button
        type="button"
        className="code-block__button"
        onClick={handleCopy}
        aria-label="Copy code to clipboard"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
      <pre
        ref={preRef}
        className={['code-block__pre', className].filter(Boolean).join(' ')}
        data-language={language}
        style={preStyle}
        {...rest}
      >
        {children}
      </pre>
    </div>
  );
}
