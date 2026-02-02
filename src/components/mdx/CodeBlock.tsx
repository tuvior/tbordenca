'use client';

import React, { ReactElement, ReactNode, useMemo, useRef, useState } from 'react';

interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

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

export default function CodeBlock({ className, children, ...props }: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const codeText = useMemo(() => getTextContent(children), [children]);

  function normalizeCodeText(value: string) {
    const lines = value.replace(/\r\n/g, '\n').split('\n');

    while (lines.length > 0 && lines[0].trim() === '') {
      lines.shift();
    }

    while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
      lines.pop();
    }

    return lines.join('\n');
  }

  function getCodeText() {
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
  }

  return (
    <div className="group not-prose border-nord-4/50 bg-nord-6/80 dark:border-nord-3/60 dark:bg-nord-1/70 borderl-1 relative -mx-4 overflow-hidden rounded-2xl border shadow-xl md:-mx-8">
      <pre
        ref={preRef}
        data-line-numbers
        className={['overflow-x-auto py-6 pl-8 leading-6', className].filter(Boolean).join(' ')}
        {...props}
      >
        {children}
      </pre>
      <div className="transition-opacity duration-200 group-hover:opacity-100 md:opacity-0">
        <CopyButton getCodeText={getCodeText} />
      </div>
    </div>
  );
}

interface CopyButtonProps {
  getCodeText: () => string;
  className?: string;
}

export function CopyButton({ getCodeText, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
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
  }

  const buttonClassName = [
    'border-nord-4/60 bg-nord-6/90 text-nord-0 dark:border-nord-3/60 dark:bg-nord-0/80 dark:text-nord-6 absolute top-3 right-3 rounded-full border px-3 py-1 text-[0.65rem] font-semibold tracking-[0.25em] uppercase opacity-70 transition-opacity duration-300 hover:opacity-100 focus-visible:opacity-1000',
    copied ? 'bg-nord-14 hover:bg-nord-14 dark:bg-nord-14 dark:hover:bg-nord-14' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button onClick={handleCopy} className={buttonClassName} aria-label="Copy code to clipboard">
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}
