import fs from 'node:fs';
import path from 'node:path';
import type { CSSProperties, ComponentPropsWithoutRef } from 'react';
import Image from 'next/image';

import { withBasePath } from '@/lib/basePath';

type MdxImageProps = ComponentPropsWithoutRef<'img'> & {
  src?: string;
};

type ImageSize = {
  width: number;
  height: number;
};

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const sizeCache = new Map<string, ImageSize | null>();

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

const stripBasePath = (src: string) => {
  if (!BASE_PATH) {
    return src;
  }

  if (src === BASE_PATH) {
    return '/';
  }

  if (src.startsWith(`${BASE_PATH}/`)) {
    return src.slice(BASE_PATH.length);
  }

  return src;
};

const getPngSize = (buffer: Buffer): ImageSize | null => {
  if (buffer.length < 24) {
    return null;
  }

  if (buffer.readUInt32BE(0) !== 0x89504e47 || buffer.readUInt32BE(4) !== 0x0d0a1a0a) {
    return null;
  }

  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);

  if (!width || !height) {
    return null;
  }

  return { width, height };
};

const isJpegStart = (buffer: Buffer) =>
  buffer.length > 2 && buffer[0] === 0xff && buffer[1] === 0xd8;

const isSofMarker = (marker: number) => {
  return (
    marker === 0xc0 ||
    marker === 0xc1 ||
    marker === 0xc2 ||
    marker === 0xc3 ||
    marker === 0xc5 ||
    marker === 0xc6 ||
    marker === 0xc7 ||
    marker === 0xc9 ||
    marker === 0xca ||
    marker === 0xcb ||
    marker === 0xcd ||
    marker === 0xce ||
    marker === 0xcf
  );
};

const getJpegSize = (buffer: Buffer): ImageSize | null => {
  if (!isJpegStart(buffer)) {
    return null;
  }

  let offset = 2;

  while (offset + 1 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = buffer[offset + 1];

    if (marker === 0xd9 || marker === 0xda) {
      break;
    }

    if (offset + 3 >= buffer.length) {
      break;
    }

    const length = buffer.readUInt16BE(offset + 2);

    if (isSofMarker(marker)) {
      if (offset + 7 >= buffer.length) {
        break;
      }

      const height = buffer.readUInt16BE(offset + 5);
      const width = buffer.readUInt16BE(offset + 7);

      if (!width || !height) {
        return null;
      }

      return { width, height };
    }

    if (!length) {
      break;
    }

    offset += 2 + length;
  }

  return null;
};

const getImageSizeFromBuffer = (buffer: Buffer): ImageSize | null => {
  return getPngSize(buffer) ?? getJpegSize(buffer);
};

const getLocalImageSize = (src: string): ImageSize | null => {
  const normalizedSrc = stripBasePath(src);

  if (!normalizedSrc.startsWith('/') || normalizedSrc.startsWith('//')) {
    return null;
  }

  const publicPath = path.resolve(PUBLIC_DIR, normalizedSrc.replace(/^\//, ''));

  if (!publicPath.startsWith(PUBLIC_DIR + path.sep)) {
    return null;
  }

  if (sizeCache.has(publicPath)) {
    return sizeCache.get(publicPath) ?? null;
  }

  if (!fs.existsSync(publicPath)) {
    sizeCache.set(publicPath, null);
    return null;
  }

  try {
    const buffer = fs.readFileSync(publicPath);
    const size = getImageSizeFromBuffer(buffer);
    sizeCache.set(publicPath, size);
    return size;
  } catch {
    sizeCache.set(publicPath, null);
    return null;
  }
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
  const imageClassName = ['mdx-image__img', className].filter(Boolean).join(' ');
  const intrinsicSize = numericWidth && numericHeight ? null : getLocalImageSize(src);
  let resolvedWidth = numericWidth ?? intrinsicSize?.width;
  let resolvedHeight = numericHeight ?? intrinsicSize?.height;

  if (numericWidth && !numericHeight && intrinsicSize) {
    resolvedHeight = Math.round(numericWidth * (intrinsicSize.height / intrinsicSize.width));
  }

  if (numericHeight && !numericWidth && intrinsicSize) {
    resolvedWidth = Math.round(numericHeight * (intrinsicSize.width / intrinsicSize.height));
  }

  const resolvedSrc = withBasePath(src);

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
