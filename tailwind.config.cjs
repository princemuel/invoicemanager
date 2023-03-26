const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Nunito Sans', ...defaultTheme.fontFamily.sans],
    },
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.w-full-shadow': {
          boxShadow: '0 0 0 100vmax currentColor, 0 0 2rem currentColor',
          clipPath: 'inset(0 -100vmax)',
        },
        '.h-container': {
          '--max-width': '111rem',
          '--container-padding': '1.6rem',

          width: 'min(var(--max-width), 100% - (var(--container-padding) * 2))',
          marginInline: 'auto',
        },
      });
    }),
  ],
};
