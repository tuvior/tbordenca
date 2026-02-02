import type { ReactNode } from 'react';

type CaptionProps = {
  children: ReactNode;
};

export default function Caption({ children }: CaptionProps) {
  return <span className="-mt-2 mb-5 block text-center text-base">{children}</span>;
}
