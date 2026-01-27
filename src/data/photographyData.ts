import { StaticImageData } from 'next/image';

import horses from '@/assets/img/photos/20210722_104720.jpg';
import halfAndHalf from '@/assets/img/photos/20220309_110403.jpg';
import skyline from '@/assets/img/photos/20220517_133251.jpg';
import regatta from '@/assets/img/photos/20230419_190124.jpg';
import nesting from '@/assets/img/photos/20230503_204233.jpg';
import sitDown from '@/assets/img/photos/20230506_164530.jpg';
import partenza from '@/assets/img/photos/20230805_140212.jpg';
import redAndBlue from '@/assets/img/photos/20240915_132542.jpg';
import shanghaiArchitecture from '@/assets/img/photos/20241013_112203.jpg';
import cyberpunk from '@/assets/img/photos/20241013_121452.jpg';
import oldArchitecture from '@/assets/img/photos/20241014_140053.jpg';
import untitled16 from '@/assets/img/photos/20241016_122102.jpg';
import untitled17 from '@/assets/img/photos/20241018_103321.jpg';
import untitled18 from '@/assets/img/photos/20241019_105749.jpg';
import untitled19 from '@/assets/img/photos/20241019_121625.jpg';
import untitled20 from '@/assets/img/photos/20241019_124802.jpg';
import untitled21 from '@/assets/img/photos/20241021_215132.jpg';
import untitled22 from '@/assets/img/photos/20241023_131316.jpg';
import untitled23 from '@/assets/img/photos/20241024_163948.jpg';

export type Photo = {
  url: string | StaticImageData;
  title: string;
  category: string;
  description: string;
  location: string;
  date: Date;
  camera: string;
};

const cameras = {
  s20: 'Samsung Galaxy S20+',
  s22: 'Samsung Galaxy S22+',
  reflex: 'Canon EOS 60D',
  ricoh: 'Ricoh GR III',
};
const categories = {
  landscape: 'Landscape',
  architecture: 'Architecture',
  nature: 'Nature',
  portrait: 'Portrait',
  street: 'Street',
  travel: 'Travel',
};

export const photos: Photo[] = [
  {
    url: horses,
    title: 'Horses',
    category: categories.landscape,
    description: 'Horses spotted in the sea off a mountain on a Greek island.',
    location: 'Zakynthos',
    date: new Date('2021-07-22'),
    camera: cameras.s20,
  },
  {
    url: halfAndHalf,
    title: 'Half and half',
    category: categories.landscape,
    description: 'The line between sunny and stormy immortalized in Mauritius.',
    location: 'Flic en Flac, Mauritius',
    date: new Date('2022-03-09'),
    camera: cameras.s20,
  },
  {
    url: skyline,
    title: 'Skyline',
    category: categories.architecture,
    description: 'Towering skyline in the business district of Singapore.',
    location: 'Singapore',
    date: new Date('2022-05-17'),
    camera: cameras.s22,
  },
  {
    url: regatta,
    title: 'Regatta',
    category: categories.landscape,
    description: 'Sailboats racing the sun rays.',
    location: 'Lausanne, Switzerland',
    date: new Date('2023-04-19'),
    camera: cameras.s22,
  },
  {
    url: nesting,
    title: 'Nesting',
    category: categories.landscape,
    description: 'A crow enjoying the golden hour.',
    location: 'Lausanne, Switzerland',
    date: new Date('2023-05-03'),
    camera: cameras.s22,
  },
  {
    url: sitDown,
    title: 'Sit down',
    category: categories.landscape,
    description: "Somebody's fishing spot.",
    location: 'Préverenges, Switzerland',
    date: new Date('2023-05-06'),
    camera: cameras.s22,
  },
  {
    url: partenza,
    title: 'Partenza',
    category: categories.landscape,
    description: 'Dock in Locarno',
    location: 'Locarno, Switzerland',
    date: new Date('2023-08-05'),
    camera: cameras.s22,
  },
  {
    url: redAndBlue,
    title: 'Red and blue',
    category: categories.landscape,
    description: 'Sister boats floating with the Vesuvio in the background.',
    location: 'Napoli, Italy',
    date: new Date('2024-09-15'),
    camera: cameras.s22,
  },
  {
    url: shanghaiArchitecture,
    title: 'Shanghai architecture',
    category: 'Architecture',
    description: 'A modern building in Shanghai.',
    location: 'Shanghai, China',
    date: new Date('2024-10-13'),
    camera: cameras.s22,
  },
  {
    url: cyberpunk,
    title: 'Cyperpunk',
    category: 'Travel',
    description: 'Busy streets of Shanghai.',
    location: 'Shanghai, China',
    date: new Date('2024-10-13'),
    camera: cameras.s22,
  },
  {
    url: oldArchitecture,
    title: 'Old architecture',
    category: 'Travel',
    description: 'European architecture in Shanghai.',
    location: 'Shanghai, China',
    date: new Date('2024-10-14'),
    camera: cameras.s22,
  },
  {
    url: untitled16,
    title: 'Untitled 16',
    category: 'Nature',
    description: 'Description pending',
    location: 'Location unknown',
    date: new Date('2024-10-16'),
    camera: cameras.s22,
  },
  {
    url: untitled17,
    title: 'Untitled 17',
    category: 'Nature',
    description: 'Description pending',
    location: 'Location unknown',
    date: new Date('2024-10-18'),
    camera: cameras.s22,
  },
  {
    url: untitled18,
    title: 'Untitled 18',
    category: 'Nature',
    description: 'Description pending',
    location: 'Location unknown',
    date: new Date('2024-10-19'),
    camera: cameras.s22,
  },
  {
    url: untitled19,
    title: 'Untitled 19',
    category: 'Nature',
    description: 'Description pending',
    location: 'Location unknown',
    date: new Date('2024-10-19'),
    camera: cameras.s22,
  },
  {
    url: untitled20,
    title: 'Untitled 20',
    category: 'Nature',
    description: 'Description pending',
    location: 'Location unknown',
    date: new Date('2024-10-19'),
    camera: cameras.s22,
  },
  {
    url: untitled21,
    title: 'Untitled 21',
    category: 'Nature',
    description: 'Description pending',
    location: 'Location unknown',
    date: new Date('2024-10-21'),
    camera: cameras.s22,
  },
  {
    url: untitled22,
    title: 'Untitled 22',
    category: 'Nature',
    description: 'Description pending',
    location: 'Location unknown',
    date: new Date('2024-10-23'),
    camera: cameras.s22,
  },
  {
    url: untitled23,
    title: 'Untitled 23',
    category: 'Nature',
    description: 'Description pending',
    location: 'Location unknown',
    date: new Date('2024-10-24'),
    camera: cameras.s22,
  },
];
