/**
 * Design System Foundation
 * 
 * This file contains the core design tokens and guidelines for the portfolio.
 * Based on modern UI/UX trends 2024 with focus on readability and accessibility.
 */

// Typography Scale
export const typography = {
  // Font sizes following a modular scale
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem',  // 72px
  },
  
  // Font weights
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  
  // Line heights for optimal readability
  lineHeight: {
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  
  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

// Spacing System (8px base unit)
export const spacing = {
  0: '0px',
  1: '0.25rem',  // 4px
  2: '0.5rem',   // 8px
  3: '0.75rem',  // 12px
  4: '1rem',     // 16px
  5: '1.25rem',  // 20px
  6: '1.5rem',   // 24px
  8: '2rem',     // 32px
  10: '2.5rem',  // 40px
  12: '3rem',    // 48px
  16: '4rem',    // 64px
  20: '5rem',    // 80px
  24: '6rem',    // 96px
  32: '8rem',    // 128px
  40: '10rem',   // 160px
  48: '12rem',   // 192px
  56: '14rem',   // 224px
  64: '16rem',   // 256px
};

// Muted Color Palette Guidelines
export const colorGuidelines = {
  // Primary colors - Teal for modern, professional appeal
  primary: {
    50: 'hsl(184, 50%, 95%)',  // Very light teal
    100: 'hsl(184, 60%, 90%)', // Light teal
    200: 'hsl(184, 70%, 80%)', // Soft teal
    300: 'hsl(184, 80%, 70%)', // Medium-light teal
    400: 'hsl(184, 90%, 60%)', // Medium teal
    500: 'hsl(184, 100%, 27%)', // Main teal #00818A
    600: 'hsl(184, 100%, 22%)', // Darker teal
    700: 'hsl(184, 100%, 18%)', // Deep teal
    800: 'hsl(184, 100%, 15%)', // Very deep teal
    900: 'hsl(184, 100%, 12%)', // Darkest teal
  },
  
  // Neutral colors - Blue-gray tones
  neutral: {
    50: 'hsl(210, 25%, 98%)',  // Very light blue-gray
    100: 'hsl(210, 25%, 95%)', // Light blue-gray #DBEDF3
    200: 'hsl(210, 20%, 90%)', // Soft blue-gray
    300: 'hsl(210, 15%, 80%)', // Medium-light blue-gray
    400: 'hsl(215, 15%, 60%)', // Medium blue-gray
    500: 'hsl(215, 20%, 35%)', // Medium blue-gray #404B69
    600: 'hsl(215, 25%, 25%)', // Dark blue-gray
    700: 'hsl(215, 25%, 20%)', // Darker blue-gray
    800: 'hsl(215, 25%, 15%)', // Very dark blue-gray
    900: 'hsl(215, 25%, 8%)',  // Deep blue-gray #283149
  },
  
  // Accent colors - Teal variations for consistency
  accent: {
    50: 'hsl(184, 40%, 95%)',  // Very light teal
    100: 'hsl(184, 50%, 90%)', // Light teal
    200: 'hsl(184, 60%, 85%)', // Soft teal
    300: 'hsl(184, 70%, 75%)', // Medium-light teal
    400: 'hsl(184, 80%, 65%)', // Medium teal
    500: 'hsl(184, 90%, 55%)', // Bright teal accent
    600: 'hsl(184, 100%, 45%)', // Darker teal
    700: 'hsl(184, 100%, 35%)', // Deep teal
    800: 'hsl(184, 100%, 25%)', // Very deep teal
    900: 'hsl(184, 100%, 15%)', // Darkest teal
  },
  
  // Status colors - Muted versions for subtle feedback
  status: {
    success: 'hsl(95, 25%, 45%)',  // Muted sage green
    warning: 'hsl(35, 60%, 65%)',  // Muted amber
    error: 'hsl(0, 50%, 65%)',     // Muted red
    info: 'hsl(95, 16%, 65%)',     // Sage green
  },
};

// Animation Guidelines
export const animations = {
  // Duration scale
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms',
  },
  
  // Easing functions
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    bounceIn: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Common animation patterns
  patterns: {
    fadeIn: 'opacity transition with translateY',
    slideIn: 'transform translateX with opacity',
    scale: 'transform scale with opacity',
    float: 'continuous translateY animation',
    glow: 'box-shadow pulse effect',
    gradient: 'background-position shift',
  },
};

// Component Guidelines
export const components = {
  // Button variants
  button: {
    sizes: {
      sm: { padding: '0.5rem 1rem', fontSize: '0.875rem' },
      md: { padding: '0.75rem 1.5rem', fontSize: '1rem' },
      lg: { padding: '1rem 2rem', fontSize: '1.125rem' },
    },
    variants: {
      primary: 'bg-primary text-primary-foreground hover:bg-primary-hover',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary-hover',
      outline: 'border border-border bg-transparent hover:bg-accent',
      ghost: 'bg-transparent hover:bg-accent',
    },
  },
  
  // Card components
  card: {
    base: 'bg-card text-card-foreground rounded-lg border border-border',
    shadow: {
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
    },
    hover: 'hover:shadow-lg transition-shadow duration-200',
  },
  
  // Input components
  input: {
    base: 'bg-input border border-border rounded-md px-3 py-2 text-foreground',
    focus: 'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
    disabled: 'disabled:opacity-50 disabled:cursor-not-allowed',
  },
};

// Responsive Breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Accessibility Guidelines
export const accessibility = {
  // Minimum contrast ratios (WCAG 2.1)
  contrast: {
    normal: '4.5:1', // For normal text
    large: '3:1',    // For large text (18px+ or 14px+ bold)
    ui: '3:1',       // For UI components
  },
  
  // Focus indicators
  focus: {
    ring: '2px solid hsl(var(--ring))',
    offset: '2px',
    style: 'outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  },
  
  // Motion preferences
  motion: {
    reduce: '@media (prefers-reduced-motion: reduce)',
    noPreference: '@media (prefers-reduced-motion: no-preference)',
  },
};

// Usage Examples and Best Practices
export const bestPractices = {
  typography: [
    'Use font-medium (500) for headings and font-normal (400) for body text',
    'Maintain line-height of 1.5-1.6 for optimal readability',
    'Use letter-spacing sparingly, mainly for uppercase text',
    'Ensure sufficient contrast between text and background',
  ],
  
  colors: [
    'Use teal primary colors for main actions and professional brand elements',
    'Use blue-gray neutral colors for text and backgrounds',
    'Apply bright teal accent colors sparingly for highlights',
    'Ensure status colors complement the blue-gray palette while remaining distinguishable',
    'Maintain cool, professional blue-gray tones throughout for cohesive palette',
    'Test color combinations in both light and dark modes for accessibility',
  ],
  
  animations: [
    'Keep animations subtle and purposeful',
    'Use consistent easing functions throughout the site',
    'Respect prefers-reduced-motion settings',
    'Avoid animations longer than 500ms for UI interactions',
  ],
  
  spacing: [
    'Use consistent spacing scale based on 8px grid',
    'Maintain visual hierarchy with appropriate spacing',
    'Ensure touch targets are at least 44px for mobile',
    'Use whitespace effectively to improve readability',
  ],
};

export default {
  typography,
  spacing,
  colorGuidelines,
  animations,
  components,
  breakpoints,
  accessibility,
  bestPractices,
};