const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    borderRadius: {
      ...defaultTheme.borderRadius,
      brand: '0.8rem',
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
      brand: {
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
      md: '50em', // => @media (min-width: 800px) { ... }
      lg: '64em', // => @media (min-width: 1024px) { ... }
      xl: '80em', // => @media (min-width: 1280px) { ... }
      xxl: '96em', // => @media (min-width: 1280px) { ... }
      xxxl: '112.5em', // => @media (min-width: 1800px) { ... }
    },

    extend: {
      cursor: {
        pointer:
          'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAUCAYAAABvVQZ0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAI6SURBVHgBnZRBaxNBGIYnu9uNSW1NlkgMVAl4Cyg5CAUPJlYFTyaX3CohePKUn5BcBA9CfkAvAf+B4sVLBC8eChv05ClKVaQIiUKjabOO77s7E8bUBpsXnrwzu9lvvvm+2bXFccWADRw1XlpWJpNZg+8ACV4kEomNVqtliSW0Am2mUik5HA5luVxmwEe5XC4pltBZ27a38/m8pHq9HoP54KI47ZbT6fQ52H1mRjE7jnFtK5vNrjJzhSuiui5cYA2Z3YN/HwwGYcBischgH8En8BLsKZ5w8VqtdiwoJ5bneeuO49zGeBdFD4OVSqVwu77vh1nS9VgF3SoUCq4ZiJObzAgcgK8sPtVsNqWWvka1221d011wgckI9cPJ5263K7k9NkDXbZH4Xzz3DRRVLcPDycmYBTe6KPV8kUR0Hm+AM0JFvA4+6DpRnU5nNq5UKn85A5jBUOdb8ITO7CrY4dZ0F+dX/5cbmd0Fq6zXb7CPI/F6NBq9bTQa4n/V7/dpI2QmZxfZWugKhm3eNLdI6S5q1/VkozB+BjZB3Dwe6+COZVlP4Ufs7CLV63UGeg8egksieiNmspPJZA6+DZ6DX/MZVqvVMDt1JA6w8GP4NV38ebnxePwy/IEK+FMVWHMIhmr8BnWuwj2hDqwzF+xwMpnsIeCr6XQ6DoJgIKIvhhuLxaZIjm/IEZgAH/ffwX+IqIknvvU8e+fBBlb38JALDxBwrLKTWGwf/gWMzcKfJP3pXjGuBcqlyjAwH/gDZjDKatJ5fJYAAAAASUVORK5CYII="), pointer;',
      },

      gridTemplateColumns: {
        // arbitrary values
        'fill-16': 'repeat(auto-fill, minmax(4rem, 1fr))',
        'fill-20': 'repeat(auto-fill, minmax(5rem, 1fr))',
        'fit-big': 'repeat(auto-fit, minmax(25rem, 1fr))',
        'fit-row': 'repeat(auto-fit, minmax(8rem, 1fr))',
        // etc.
      },
      boxShadow: {
        100: '0px 10px 10px -10px rgba(72, 84, 159, 0.1);',
        200: '0px 10px 20px rgba(72, 84, 159, 0.25);',
        300: '0px 10px 20px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [
    // ...
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
