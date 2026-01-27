import fs from 'node:fs';
import path from 'node:path';

type ImageSize = {
  width: number;
  height: number;
};

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const sizeCache = new Map<string, ImageSize | null>();

export default function getLocalImageSize(src: string): ImageSize | null {
  if (!src.startsWith('/') || src.startsWith('//')) {
    return null;
  }

  const publicPath = path.resolve(PUBLIC_DIR, src.replace(/^\//, ''));

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
}

function getImageSizeFromBuffer(buffer: Buffer): ImageSize | null {
  return getPngSize(buffer) ?? getJpegSize(buffer);
}

function getPngSize(buffer: Buffer): ImageSize | null {
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
}

function isJpegStart(buffer: Buffer) {
  return buffer.length > 2 && buffer[0] === 0xff && buffer[1] === 0xd8;
}

function isSofMarker(marker: number) {
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
}

function getJpegSize(buffer: Buffer): ImageSize | null {
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
}
