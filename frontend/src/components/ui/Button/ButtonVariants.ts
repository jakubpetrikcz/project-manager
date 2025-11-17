const BUTTON_VARIANT = {
  primary: 'primary',
  secondary: 'secondary',
  transparent: 'transparent',
} as const;

export type ButtonVariant = keyof typeof BUTTON_VARIANT;
