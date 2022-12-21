const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    borderRadius: {
      ...defaultTheme.borderRadius,
      default: '0.8rem',
      pill: '100vmax',
    },

    colors: {
      current: 'currentColor',
      transparent: 'transparent',
      inherit: 'inherit',
      neutral: {
        100: '#FFFFFF',
        200: '#F8F8FB',
        300: '#F9FAFE',
        400: '#F2F2F2',
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
        100: '#ff9797',
        200: '#EC5757',
      },
    },

    fontFamily: {
      sans: ['Spartan', ...defaultTheme.fontFamily.sans],
    },

    fontSize: {
      ...defaultTheme.fontSize,
      100: '0.8rem',
      200: '1rem',
      300: '1.1rem',
      400: '1.2rem',
      500: '1.5rem',
      600: '1.6rem',
      700: '2rem', //
      800: '2.4rem',
      900: '3.2rem',
    },

    lineHeight: {
      100: '0.8rem',
      200: '1.5rem',
      300: '1.8rem',
      400: '2.2rem',
      500: '2.4rem',
      600: '3rem',
      700: '3.6rem',
    },

    letterSpacing: {
      100: '-0.23px',
      200: '-0.25px',
      300: '-0.63px',
      400: '-0.8px',
      500: '-1px',
    },

    screens: {
      s: '20em', // => @media (min-width: 320px) { ... }
      xs: '30em', // => @media (min-width: 480px) { ... }
      sm: '36em', // => @media (min-width: 576px) { ... }
      sx: '40em', // => @media (min-width: 640px) { ... }
      md: '45em', // => @media (min-width: 720px) { ... }
      lg: '64em', // => @media (min-width: 1024px) { ... }
      xl: '80em', // => @media (min-width: 1280px) { ... }
      xxl: '96em', // => @media (min-width: 1280px) { ... }
      xxxl: '112.5em', // => @media (min-width: 1800px) { ... }
    },

    extend: {
      gridTemplateColumns: {
        // arbitrary values
        'fill-16': 'repeat(auto-fill, minmax(4rem, 1fr))',
        'fill-20': 'repeat(auto-fill, minmax(5rem, 1fr))',
        'fit-big': 'repeat(auto-fit, minmax(25rem, 1fr))',
        'fit-row': 'repeat(auto-fit, minmax(8rem, 1fr))',
        // etc.
      },
      boxShadow: {
        default: '0px 10px 10px -10px rgba(72, 84, 159, 0.100397);',
        input: '0px 10px 20px rgba(72, 84, 159, 0.25);',
      },
    },
  },
  plugins: [],
};
