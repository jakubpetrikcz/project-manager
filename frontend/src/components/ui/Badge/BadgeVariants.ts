export const BADGE_VARIANT = {
  'dark-pink': 'dark-pink',
  'dark-green': 'dark-green',
  'dark-blue': 'dark-blue',
  'dark-red': 'dark-red',
  'dark-teal': 'dark-teal',
  'dark-brown': 'dark-brown',
  'dark-orange': 'dark-orange',
  'dark-purple': 'dark-purple',
  'dark-warm-gray': 'dark-warm-gray',

  'light-pink': 'light-pink',
  'light-green': 'light-green',
  'light-blue': 'light-blue',
  'light-red': 'light-red',
  'light-teal': 'light-teal',
  'light-orange': 'light-orange',
  'light-purple': 'light-purple',
  'light-warm-gray': 'light-warm-gray',
  'light-yellow': 'light-yellow',

  none: 'none',
} as const;

export type BadgeVariant = keyof typeof BADGE_VARIANT;
