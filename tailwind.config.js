const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    borderRadius: {
      ...defaultTheme.borderRadius,
      pill: '100vmax',
    },

    colors: {
      current: 'currentColor',
      transparent: 'transparent',
      neutral: {
        100: '#ffffff',
        200: '#F8F8FB',
      },
      primary: {
        100: '#DFE3FA',
        200: '#9277FF',
        300: '#888EB0',
        400: '#7E88C3',
        500: '#7C5DFA',
        600: '#252945',
        700: '#1E2139',
        800: '#141625',
        900: '#0C0E16',
      },
      accent: {
        100: '#9277FF',
        200: '#EC5757',
      },
    },

    fontFamily: {
      sans: ['League Spartan', ...defaultTheme.fontFamily.sans],
    },

    fontSize: {
      100: '0.8rem',
      200: '1rem',
      300: '1.2rem',
      400: '1.3rem',
      500: '1.5rem',
      600: '1.8rem',
      700: '2.4rem', //
      800: '1.875rem',
      900: '2.25rem',
    },

    lineHeight: {
      100: '0.8rem',
      200: '1.5rem',
      300: '1.9rem',
      400: '2.3rem',
      500: '3rem',
    },

    screens: {
      xs: '30em', // => @media (min-width: 480px) { ... }
      ...defaultTheme.screens,
    },

    extend: {
      screens: {
        sm: '40em', // => @media (min-width: 640px) { ... }
        md: '48em', // => @media (min-width: 768px) { ... }
        lg: '64em', // => @media (min-width: 1024px) { ... }
        xl: '80em', // => @media (min-width: 1280px) { ... }
        '2xl': '96em', // => @media (min-width: 1536px) { ... }
      },

      gridTemplateColumns: {
        // arbitrary values
        'fill-16': 'repeat(auto-fill, minmax(4rem, 1fr))',
        'fill-20': 'repeat(auto-fill, minmax(5rem, 1fr))',
        'fit-big': 'repeat(auto-fit, minmax(25rem, 1fr))',
        // etc.
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.btn': {
          '--flow-space': '<value>',
        },
      });
    }),
  ],
};
