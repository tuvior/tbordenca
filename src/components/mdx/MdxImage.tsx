import type { CSSProperties, ComponentPropsWithoutRef } from 'react';
import Image from 'next/image';

type MdxImageProps = ComponentPropsWithoutRef<'img'> & {
  src?: string;
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

const splitImageStyles = (style?: CSSProperties) => {
  if (!style) {
    return { wrapperStyle: undefined, imageStyle: undefined };
  }

  const { aspectRatio, ...imageStyle } = style;
  const wrapperStyle = aspectRatio ? ({ aspectRatio } as CSSProperties) : undefined;

  return { wrapperStyle, imageStyle };
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

  const numericWidth = parseDimension(width);
  const numericHeight = parseDimension(height);
  const resolvedSizes = typeof sizes === 'string' ? sizes : '100vw';
  const styleObject = typeof style === 'object' && style ? (style as CSSProperties) : undefined;
  const { wrapperStyle, imageStyle } = splitImageStyles(styleObject);
  const imageClassName = ['mdx-image__img', className].filter(Boolean).join(' ');

  if (numericWidth && numericHeight) {
    return (
      <Image
        src={src}
        alt={alt}
        width={numericWidth}
        height={numericHeight}
        sizes={resolvedSizes}
        className={imageClassName}
        style={imageStyle}
        {...rest}
      />
    );
  }

  return (
    <span
      className="mdx-image"
      style={{
        ...(wrapperStyle ?? {}),
        aspectRatio: wrapperStyle?.aspectRatio ?? '16 / 9',
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={resolvedSizes}
        className={[imageClassName, 'object-contain'].filter(Boolean).join(' ')}
        style={imageStyle}
        {...rest}
      />
    </span>
  );
}
