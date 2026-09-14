export const color = {
  transparent: 'transparent',
  current: 'currentColor',
  white: '#ffffff',
  black: '#000000',
  primary: {
    '50': '#f5f4ff',
    '100': '#e7e5fe',
    '200': '#d2cefd',
    '300': '#b5abfc',
    '400': '#968ae0',
    '500': '#9184d9',
    '600': '#796cbf',
    '700': '#5d5294',
    '800': '#423a6a',
    '900': '#2b2741',
  },
  neutral: {
    '50': '#f3f5fe',
    '100': '#e4e7f5',
    '200': '#cfd3e5',
    '300': '#b2b6ca',
    '400': '#9397ab',
    '500': '#75798c',
    '600': '#595d6c',
    '700': '#3f424d',
    '800': '#292b31',
    '900': '#161826',
  },
  danger: {
    '100': '#fee2e2',
    '500': '#dc2626',
    '700': '#b91c1c',
  },
  success: {
    '100': '#dcfce7',
    '500': '#16a34a',
    '700': '#15803d',
  },
  surface: '#f3f5fe',
  'surface-raised': '#ffffff',
  foreground: '#292b31',
  muted: '#75798c',
  border: '#cfd3e5',
} as const;

export const radius = {
  none: '0rem',
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  full: '9999px',
} as const;

export const spacing = {
  '0': '0rem',
  '1': '0.25rem',
  '2': '0.5rem',
  '3': '0.75rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '8': '2rem',
  '9': '2.25rem',
  '10': '2.5rem',
  '12': '3rem',
  '16': '4rem',
} as const;

export const font = {
  family: {
    sans: 'Inter, ui-sans-serif, system-ui, sans-serif',
    mono: 'IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, monospace',
  },
  size: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.5rem',
    '2xl': '2rem',
  },
  weight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  leading: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
} as const;
