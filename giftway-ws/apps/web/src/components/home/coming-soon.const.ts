import type { ComponentType } from 'react';
import {
  CalendarIcon,
  CardIcon,
  CorporateIcon,
  GroupIcon,
  PriceDropIcon,
} from './coming-soon.icons';

export type Feature = {
  title: string;
  body: string;
  Icon: ComponentType;
};

export const features: Feature[] = [
  {
    title: 'Smart event calendar',
    body: 'Saved recipients with reminders, so the panic starts a week early.',
    Icon: CalendarIcon,
  },
  {
    title: 'Group gifting',
    body: 'Split one good gift instead of four mediocre ones.',
    Icon: GroupIcon,
  },
  {
    title: 'AI greeting cards',
    body: 'A card message written from the same answers as the gift.',
    Icon: CardIcon,
  },
  {
    title: 'Price drop alerts',
    body: 'If something on an old shortlist gets cheaper, you hear about it.',
    Icon: PriceDropIcon,
  },
  {
    title: 'Corporate gifting',
    body: 'One brief for a whole team, instead of forty separate wizards.',
    Icon: CorporateIcon,
  },
];
