import { Bike, Camera, BookOpen, Dumbbell, ChefHat, CakeSlice, Mountain } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Hobby = {
  title: string;
  icon: LucideIcon;
  description: string;
  background: string;
};

export const hobbiesData = [
  {
    title: 'Weightlifting',
    icon: Dumbbell,
    description:
      'Strength training and powerlifting, especially focusing on the main compound lifts.',
    background:
      'https://images.unsplash.com/photo-1521804906057-1df8fdb718b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Cycling',
    icon: Bike,
    description:
      'Zwifting in the winter and outdoor road cycling in the summer, exploring the idea of getting back into mountain biking.',
    background:
      'https://images.unsplash.com/photo-1541625602330-2277a4c46182?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
  {
    title: 'Rock Climbing',
    icon: Mountain,
    description: 'Indoor rock climbing and bouldering, with plans to try outdoor climbing.',
    background:
      'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?q=80&w=2144&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Cooking',
    icon: ChefHat,
    description:
      'Experimenting with new recipes and cooking techniques and exploring ethnic cuisines.',
    background:
      'https://images.unsplash.com/reserve/EnF7DhHROS8OMEp2pCkx_Dufer%20food%20overhead%20hig%20res.jpg?q=80&w=2078&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Baking',
    icon: CakeSlice,
    description: 'Baking cakes, cookies, and pastries, with a focus on techniques.',
    background:
      'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Reading',
    icon: BookOpen,
    description:
      'A good balance between non-fiction to stimulate the mind, and non-fiction to feed creativity.',
    background:
      'https://images.unsplash.com/photo-1513001900722-370f803f498d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
  {
    title: 'Photography',
    icon: Camera,
    description: 'Capturing urban landscapes and street photography during travels.',
    background:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1164&q=80',
  },
];
