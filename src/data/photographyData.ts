export type Photo = {
  url: string;
  title: string;
  category: string;
  description: string;
  location: string;
  date: Date;
  camera: string;
};

export const photos: Photo[] = [
  {
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    title: 'Yosemite Valley',
    category: 'Landscape',
    description: 'Stunning view of Yosemite Valley during sunset',
    location: 'Yosemite National Park, California, USA',
    date: new Date('2023-06-15'),
    camera: 'Sony A7III',
  },
  {
    url: 'https://images.unsplash.com/photo-1551009175-8a68da93d5f9',
    title: 'City Lights',
    category: 'Urban',
    description: 'Night cityscape with illuminated buildings',
    location: 'Tokyo, Japan',
    date: new Date('2023-07-20'),
    camera: 'Canon EOS R5',
  },
  {
    url: 'https://images.unsplash.com/photo-1549558549-415fe4c37b60',
    title: 'Arctic Fox',
    category: 'Wildlife',
    description: 'White arctic fox in its natural habitat',
    location: 'Iceland',
    date: new Date('2023-02-10'),
    camera: 'Nikon Z6',
  },
  {
    url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e',
    title: 'Northern Lights',
    category: 'Night Sky',
    description: 'Aurora borealis dancing in the night sky',
    location: 'Tromsø, Norway',
    date: new Date('2023-03-15'),
    camera: 'Sony A7III',
  },
  {
    url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
    title: 'Desert Sunset',
    category: 'Landscape',
    description: 'Dramatic sunset over sand dunes',
    location: 'Sahara Desert, Morocco',
    date: new Date('2023-04-22'),
    camera: 'Canon EOS R5',
  },
  {
    url: 'https://images.unsplash.com/photo-1557800636-894a64c1696f',
    title: 'Spring Blooms',
    category: 'Nature',
    description: 'Cherry blossoms in full bloom',
    location: 'Kyoto, Japan',
    date: new Date('2023-04-05'),
    camera: 'Fujifilm X-T4',
  },
  {
    url: 'https://images.unsplash.com/photo-1536697246787-1f7ae568d89a',
    title: 'Mountain Peak',
    category: 'Landscape',
    description: 'Snow-capped mountain peak at sunrise',
    location: 'Swiss Alps, Switzerland',
    date: new Date('2023-01-30'),
    camera: 'Nikon Z7',
  },
  {
    url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9',
    title: 'Ocean Wave',
    category: 'Seascape',
    description: 'Powerful wave breaking at sunset',
    location: 'Hawaiian Islands, USA',
    date: new Date('2023-08-05'),
    camera: 'Canon EOS R6',
  },
  {
    url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5',
    title: 'Street Life',
    category: 'Urban',
    description: 'Busy street scene in downtown',
    location: 'New York City, USA',
    date: new Date('2023-09-12'),
    camera: 'Leica Q2',
  },
  {
    url: 'https://images.unsplash.com/photo-1547234935-80c7145ec969',
    title: 'Polar Bear',
    category: 'Wildlife',
    description: 'Polar bear walking on arctic ice',
    location: 'Svalbard, Norway',
    date: new Date('2023-05-18'),
    camera: 'Sony A1',
  },
  {
    url: 'https://images.unsplash.com/photo-1505051508008-923feaf90180',
    title: 'Milky Way',
    category: 'Night Sky',
    description: 'Milky Way over mountain landscape',
    location: 'Death Valley, California, USA',
    date: new Date('2023-07-01'),
    camera: 'Sony A7SIII',
  }
];
