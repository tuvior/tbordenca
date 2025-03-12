import photo1Url from '/img/photos/20210722_104720.jpg?url';
import photo3Url from '/img/photos/20220309_110403.jpg?url';
import photo4Url from '/img/photos/20220517_133251.jpg?url';
import photo5Url from '/img/photos/20230419_190124.jpg?url';
import photo6Url from '/img/photos/20230503_204233.jpg?url';
import photo7Url from '/img/photos/20230506_164530.jpg?url';
import photo10Url from '/img/photos/20230805_140212.jpg?url';
import photo12Url from '/img/photos/20240915_132542.jpg?url';
import photo13Url from '/img/photos/20241013_112203.jpg?url';
import photo14Url from '/img/photos/20241013_121452.jpg?url';
import photo15Url from '/img/photos/20241014_140053.jpg?url';
import photo16Url from '/img/photos/20241016_122102.jpg?url';
import photo17Url from '/img/photos/20241018_103321.jpg?url';
import photo18Url from '/img/photos/20241019_105749.jpg?url';
import photo19Url from '/img/photos/20241019_121625.jpg?url';
import photo20Url from '/img/photos/20241019_124802.jpg?url';
import photo21Url from '/img/photos/20241021_215132~2.jpg?url';
import photo22Url from '/img/photos/20241023_131316 (2).jpg?url';
import photo23Url from '/img/photos/20241024_163948.jpg?url';

export type Photo = {
  url: string;
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
    url: photo1Url,
    title: 'Horses',
    category: categories.landscape,
    description: 'Horses spotted in the sea off a mountain on a Greek island.',
    location: 'Zakynthos',
    date: new Date('2021-07-22'),
    camera: cameras.s20,
  },
  {
    url: photo3Url,
    title: 'Half and half',
    category: categories.landscape,
    description: 'The line between sunny and stormy immortalized in Mauritius.',
    location: 'Flic en Flac, Mauritius',
    date: new Date('2022-03-09'),
    camera: cameras.s20,
  },
  {
    url: photo4Url,
    title: 'Skyline',
    category: categories.architecture,
    description: 'Towering skyline in the business district of Singapore.',
    location: 'Singapore',
    date: new Date('2022-05-17'),
    camera: cameras.s22,
  },
  {
    url: photo5Url,
    title: 'Regatta',
    category: categories.landscape,
    description: 'Sailboats racing the sun rays.',
    location: 'Lausanne, Switzerland',
    date: new Date('2023-04-19'),
    camera: cameras.s22,
  },
  {
    url: photo6Url,
    title: 'Nesting',
    category: categories.landscape,
    description: 'A crow enjoying the golden hour.',
    location: 'Lausanne, Switzerland',
    date: new Date('2023-05-03'),
    camera: cameras.s22,
  },
  {
    url: photo7Url,
    title: 'Sit down',
    category: categories.landscape,
    description: "Somebody's fishing spot.",
    location: 'Préverenges, Switzerland',
    date: new Date('2023-05-06'),
    camera: cameras.s22,
  },
  {
    url: photo10Url,
    title: 'Partenza',
    category: categories.landscape,
    description: 'Dock in Locarno',
    location: 'Locarno, Switzerland',
    date: new Date('2023-08-05'),
    camera: cameras.s22,
  },
  {
    url: photo12Url,
    title: 'Red and blue',
    category: categories.landscape,
    description: 'Sister boats floating with the Vesuvio in the background.',
    location: 'Napoli, Italy',
    date: new Date('2024-09-15'),
    camera: cameras.s22,
  },
  {
    url: photo13Url,
    title: 'Untitled 13',
    category: 'Nature',
    description: 'Description pending',
    location: 'Location unknown',
    date: new Date('2024-10-13'),
    camera: cameras.s22,
  },
  {
    url: photo14Url,
    title: 'Untitled 14',
    category: 'Nature',
    description: 'Description pending',
    location: 'Location unknown',
    date: new Date('2024-10-13'),
    camera: cameras.s22,
  },
  {
    url: photo15Url,
    title: 'Untitled 15',
    category: 'Nature',
    description: 'Description pending',
    location: 'Location unknown',
    date: new Date('2024-10-14'),
    camera: cameras.s22,
  },
  {
    url: photo16Url,
    title: 'Untitled 16',
    category: 'Nature',
    description: 'Description pending',
    location: 'Location unknown',
    date: new Date('2024-10-16'),
    camera: cameras.s22,
  },
  {
    url: photo17Url,
    title: 'Untitled 17',
    category: 'Nature',
    description: 'Description pending',
    location: 'Location unknown',
    date: new Date('2024-10-18'),
    camera: cameras.s22,
  },
  {
    url: photo18Url,
    title: 'Untitled 18',
    category: 'Nature',
    description: 'Description pending',
    location: 'Location unknown',
    date: new Date('2024-10-19'),
    camera: cameras.s22,
  },
  {
    url: photo19Url,
    title: 'Untitled 19',
    category: 'Nature',
    description: 'Description pending',
    location: 'Location unknown',
    date: new Date('2024-10-19'),
    camera: cameras.s22,
  },
  {
    url: photo20Url,
    title: 'Untitled 20',
    category: 'Nature',
    description: 'Description pending',
    location: 'Location unknown',
    date: new Date('2024-10-19'),
    camera: cameras.s22,
  },
  {
    url: photo21Url,
    title: 'Untitled 21',
    category: 'Nature',
    description: 'Description pending',
    location: 'Location unknown',
    date: new Date('2024-10-21'),
    camera: cameras.s22,
  },
  {
    url: photo22Url,
    title: 'Untitled 22',
    category: 'Nature',
    description: 'Description pending',
    location: 'Location unknown',
    date: new Date('2024-10-23'),
    camera: cameras.s22,
  },
  {
    url: photo23Url,
    title: 'Untitled 23',
    category: 'Nature',
    description: 'Description pending',
    location: 'Location unknown',
    date: new Date('2024-10-24'),
    camera: cameras.s22,
  },
];
