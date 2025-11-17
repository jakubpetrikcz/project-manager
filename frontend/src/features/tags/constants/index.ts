import { BadgeVariant } from '../../../components/ui/Badge/BadgeVariants';

export const TAG_MODAL = 'tagModal';

export const tagNameMap: { [key in BadgeVariant]: string } = {
  'dark-pink': 'Dark Pink',
  'dark-green': 'Dark Green',
  'dark-blue': 'Dark Blue',
  'dark-red': 'Dark Red',
  'dark-teal': 'Dark Teal',
  'dark-brown': 'Dark Brown',
  'dark-orange': 'Dark Orange',
  'dark-purple': 'Dark Purple',
  'dark-warm-gray': 'Dark Warm Gray',

  'light-pink': 'Light Pink',
  'light-green': 'Light Green',
  'light-blue': 'Light Blue',
  'light-red': 'Light Red',
  'light-teal': 'Light Teal',
  'light-orange': 'Light Orange',
  'light-purple': 'Light Purple',
  'light-warm-gray': 'Light Warm Gray',
  'light-yellow': 'Light Yellow',

  none: 'None',
};
