import type { AnchorHTMLAttributes } from 'react';

import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

const isInternalLink = (href: string) => href.startsWith('/');

type MdxLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href?: string;
  'data-footnote-ref'?: string;
  'data-footnote-backref'?: string;
};

export default function MdxLink({ href = '', children, className, ...rest }: MdxLinkProps) {
  const isFootnoteRef = rest['data-footnote-ref'] != null;
  const isFootnoteBackref = rest['data-footnote-backref'] != null;
  const baseClassName = isFootnoteRef
    ? 'text-nord-10 dark:text-nord-8 no-underline font-semibold'
    : isFootnoteBackref
      ? 'text-nord-10 dark:text-nord-8 no-underline'
      : 'text-nord-0 dark:text-nord-6 decoration-nord-10 dark:decoration-nord-8 font-bold underline decoration-2 underline-offset-5 hover:no-underline';
  const combinedClassName = [baseClassName, className].filter(Boolean).join(' ');

  if (!href) {
    return (
      <a className={combinedClassName} {...rest}>
        {children}
      </a>
    );
  }

  if (href.startsWith('#')) {
    return (
      <a href={href} className={combinedClassName} {...rest}>
        {children}
      </a>
    );
  }

  if (isInternalLink(href)) {
    return (
      <Link href={href} className={combinedClassName} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
      className={[combinedClassName, 'group inline-flex items-center gap-1']
        .filter(Boolean)
        .join(' ')}
    >
      {children}
      <ExternalLink
        size={14}
        strokeWidth={3}
        aria-hidden="true"
        className="group-hover:text-nord-10 group-hover:dark:text-nord-8 inline-block"
      />
    </a>
  );
}
