import type { CSSProperties, ComponentPropsWithoutRef } from 'react';

import Image from 'next/image';

import withBasePath from '@/lib/basePath';
import getLocalImageSize from '@/lib/imageSize';

type MdxImageProps = ComponentPropsWithoutRef<'img'> & {
  src?: string;
  alt?: string;
};

const parseDimension = (value: unknown): number | undefined => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return undefined;
};

export default function MdxImage({
  src,
  alt = '',
  width,
  height,
  sizes,
  className,
  style,
  ...rest
}: MdxImageProps) {
  if (!src) {
    return null;
  }

  const resolvedSrc = withBasePath(src);

  const numericWidth = parseDimension(width);
  const numericHeight = parseDimension(height);
  const resolvedSizes = typeof sizes === 'string' ? sizes : '100vw';
  const styleObject = typeof style === 'object' && style ? (style as CSSProperties) : undefined;
  const imageClassName = ['mdx-image__img', className].filter(Boolean).join(' ');
  const intrinsicSize = numericWidth && numericHeight ? null : getLocalImageSize(resolvedSrc);
  let resolvedWidth = numericWidth ?? intrinsicSize?.width;
  let resolvedHeight = numericHeight ?? intrinsicSize?.height;

  if (numericWidth && !numericHeight && intrinsicSize) {
    resolvedHeight = Math.round(numericWidth * (intrinsicSize.height / intrinsicSize.width));
  }

  if (numericHeight && !numericWidth && intrinsicSize) {
    resolvedWidth = Math.round(numericHeight * (intrinsicSize.width / intrinsicSize.height));
  }

  if (resolvedWidth && resolvedHeight) {
    return (
      <span className="mdx-image">
        <Image
          src={resolvedSrc}
          alt={alt}
          width={resolvedWidth}
          height={resolvedHeight}
          sizes={resolvedSizes}
          className={imageClassName}
          style={styleObject}
          {...rest}
        />
      </span>
    );
  }

  return (
    <span className="mdx-image">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={resolvedSrc} alt={alt} className={imageClassName} style={styleObject} {...rest} />
    </span>
  );
}
