import type { AnchorHTMLAttributes } from 'react';

import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

const isInternalLink = (href: string) => href.startsWith('/');

type MdxLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href?: string;
};

export default function MdxLink({ href = '', children, ...rest }: MdxLinkProps) {
  if (!href) {
    return <a {...rest}>{children}</a>;
  }

  if (href.startsWith('#')) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }

  if (isInternalLink(href)) {
    return (
      <Link href={href} {...rest}>
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
      className="group inline-flex items-center gap-1"
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
