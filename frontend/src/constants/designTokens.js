/**
 * Design Tokens - Central source of truth for consistent UI
 * All colors, spacing, typography, and component styles defined here
 */

// Primary Colors
export const COLORS = {
  primary: {
    50: 'bg-teal-50',
    100: 'bg-teal-100',
    500: 'bg-teal-500',
    600: 'bg-teal-600',
    700: 'bg-teal-700',
    800: 'bg-teal-800',
  },
  secondary: {
    50: 'bg-gray-50',
    100: 'bg-gray-100',
    700: 'bg-gray-700',
    800: 'bg-gray-800',
  },
  status: {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  },
  text: {
    white: 'text-white',
    dark: 'text-gray-900',
    medium: 'text-gray-700',
    light: 'text-gray-500',
  },
};

// Spacing System (multiples of 4px)
export const SPACING = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

export const PADDING = {
  xs: 'p-1',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
};

export const MARGIN = {
  xs: 'm-1',
  sm: 'm-2',
  md: 'm-4',
  lg: 'm-6',
  xl: 'm-8',
};

// Typography
export const TYPOGRAPHY = {
  heading: {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-bold',
    h3: 'text-2xl font-bold',
    h4: 'text-xl font-semibold',
    h5: 'text-lg font-semibold',
  },
  body: {
    large: 'text-base font-normal',
    normal: 'text-sm font-normal',
    small: 'text-xs font-normal',
  },
  label: 'text-sm font-medium',
};

// Border Radius
export const BORDER_RADIUS = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

// Shadows
export const SHADOWS = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
};

// Component Styles
export const COMPONENTS = {
  button: {
    primary: 'bg-teal-600 text-white px-4 py-2 rounded-md font-medium hover:bg-teal-700 active:bg-teal-800 transition-all duration-200',
    secondary: 'bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-gray-300 transition-all duration-200',
    danger: 'bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 active:bg-red-800 transition-all duration-200',
    small: 'px-3 py-1 text-sm rounded-md font-medium transition-all duration-200',
    disabled: 'opacity-50 cursor-not-allowed',
  },
  input: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200',
  label: 'block text-sm font-medium text-gray-700 mb-2',
  card: 'bg-white rounded-lg shadow-md p-6 border border-gray-100',
  section: 'p-6 bg-white rounded-lg shadow-sm border border-gray-100',
  container: 'max-w-7xl mx-auto px-4',
};

// Layout
export const LAYOUT = {
  sidebar: {
    width: 'w-64',
    color: 'bg-gray-800 text-white',
  },
  navbar: {
    height: 'h-12',
    color: 'bg-teal-600 text-white',
  },
  content: {
    padding: 'p-6',
    background: 'bg-gray-100',
    minHeight: 'min-h-screen',
  },
};

// Transitions
export const TRANSITIONS = {
  fast: 'transition-all duration-200',
  normal: 'transition-all duration-300',
  slow: 'transition-all duration-500',
};

// Responsive
export const RESPONSIVE = {
  container: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  twoColumn: 'grid grid-cols-1 md:grid-cols-2 gap-4',
  fullWidth: 'w-full',
};
