import Link from 'next/link';
import type { AnchorHTMLAttributes } from 'react';

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
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}
