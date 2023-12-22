import tvHeadlessUI from "@headlessui/tailwindcss";
import twScrollbar from "tailwind-scrollbar";
import { Config } from "tailwindcss";
import twAnimate from "tailwindcss-animate";
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

export default {
  darkMode: ["class", '[data-darkreader-theme="dark"]'],
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  corePlugins: {
    float: false,
    container: false,
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    screens: {
      "3xs": "24em", // @media (min-width: 384px) { ... }
      "2xs": "30em", // @media (min-width: 480px) { ... }
      ...defaultTheme.screens,
    },
    extend: {
      borderRadius: {
        pill: "100vmax",
      },
      colors: {
        neutral: {
          100: "#F8F8FB",
          200: "#F9FAFE",
          300: "#F2F2F2",
        },
        brand: {
          100: "#DFE3FA",
          200: "#9277FF",
          300: "#888EB0",
          400: "#7E88C3",
          500: "#7C5DFA",
          600: "#252945",
          700: "#1E2139",
          800: "#141625",
          900: "#0C0E16",
        },
        accent: {
          100: "#FF9797",
          200: "#EC5757",
          300: "#373B53",
          400: "#FF8F00",
          500: "#33D69F",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        accent: ["var(--font-accent)", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        100: "0.5rem",
        200: "0.625rem",
        300: "0.6875rem", //
        400: "0.75rem", //
        500: "0.9375rem",
        600: "1rem",
        700: "1.25rem", //
        800: "1.5rem",
        900: "2rem", //
      },
      lineHeight: {
        100: "0.5rem",
        200: "0.9375rem",
        300: "1.125rem",
        400: "1.375rem",
        500: "1.5rem",
        600: "1.875rem",
        700: "2.25rem",
      },
      letterSpacing: {
        100: "0.23px",
        200: "0.25px",
        300: "0.63px",
        400: "0.8px",
        500: "1px",
      },

      screens: {
        xs: "36em", // @media (min-width: 576px) { ... },
        sm: "40em", // @media (min-width: 640px) { ... }
        md: "48em", // @media (min-width: 768px) { ... }
        lg: "64em", // @media (min-width: 1024px) { ... }
        xl: "80em", // @media (min-width: 1280px) { ... }
        "2xl": "96em", // @media (min-width: 1536px) { ... }
        "3xl": "112.5em", // @media (min-width: 1800px) { ... }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0px, -8px, 0)" },
          "50%": { transform: "translate3d(0px, 8px, 0)" },
        },
      },

      cursor: {
        pointer:
          'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAUCAYAAABvVQZ0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAI6SURBVHgBnZRBaxNBGIYnu9uNSW1NlkgMVAl4Cyg5CAUPJlYFTyaX3CohePKUn5BcBA9CfkAvAf+B4sVLBC8eChv05ClKVaQIiUKjabOO77s7E8bUBpsXnrwzu9lvvvm+2bXFccWADRw1XlpWJpNZg+8ACV4kEomNVqtliSW0Am2mUik5HA5luVxmwEe5XC4pltBZ27a38/m8pHq9HoP54KI47ZbT6fQ52H1mRjE7jnFtK5vNrjJzhSuiui5cYA2Z3YN/HwwGYcBischgH8En8BLsKZ5w8VqtdiwoJ5bneeuO49zGeBdFD4OVSqVwu77vh1nS9VgF3SoUCq4ZiJObzAgcgK8sPtVsNqWWvka1221d011wgckI9cPJ5263K7k9NkDXbZH4Xzz3DRRVLcPDycmYBTe6KPV8kUR0Hm+AM0JFvA4+6DpRnU5nNq5UKn85A5jBUOdb8ITO7CrY4dZ0F+dX/5cbmd0Fq6zXb7CPI/F6NBq9bTQa4n/V7/dpI2QmZxfZWugKhm3eNLdI6S5q1/VkozB+BjZB3Dwe6+COZVlP4Ufs7CLV63UGeg8egksieiNmspPJZA6+DZ6DX/MZVqvVMDt1JA6w8GP4NV38ebnxePwy/IEK+FMVWHMIhmr8BnWuwj2hDqwzF+xwMpnsIeCr6XQ6DoJgIKIvhhuLxaZIjm/IEZgAH/ffwX+IqIknvvU8e+fBBlb38JALDxBwrLKTWGwf/gWMzcKfJP3pXjGuBcqlyjAwH/gDZjDKatJ5fJYAAAAASUVORK5CYII="), pointer;',
      },
      boxShadow: {
        100: "0px 10px 10px -10px rgba(72, 84, 159, 0.1);",
        200: "0px 10px 20px rgba(72, 84, 159, 0.25);",
        300: "0px 10px 20px rgba(0, 0, 0, 0.25)",
      },
      backgroundImage: {
        100: "linear-gradient(180deg, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.1) 100%);",
      },
    },
  },

  plugins: [
    twAnimate,
    twScrollbar({ nocompatible: true }),
    tvHeadlessUI({ prefix: "hui" }),
    plugin(function ({ theme, addUtilities, addVariant }) {
      addVariant("optional", "&:optional");
      addVariant("hocus", ["&:hover", "&:focus"]);
      addVariant("inverted-colors", "@media (inverted-colors: inverted)");
      addUtilities({
        ".full-w-bg": {
          boxShadow: "0 0 0 100vmax currentColor, 0 0 2rem currentColor",
          clipPath: "inset(0 -100vmax)",
        },
        ".grid-cols-auto": {
          "--min": "15rem",
          gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, var(--min)), 1fr))`,
        },

        ".container": {
          "--padding-inline": theme("spacing.6"),

          "--content-maxW": "64rem",
          "--content-size":
            "min(100% - (var(--padding-inline) * 2), var(--content-maxW))",

          "--breakout-maxW": "70rem",
          "--breakout-size": `calc((var(--breakout-maxW) - var(--content-maxW)) / 2)`,

          "--fullWPadding": "minmax(var(--padding-inline), 1fr)",
          "--breakoutPadding": "minmax(0, var(--breakout-size))",

          display: "grid",
          gridTemplateColumns: `[full-width-start] var(--fullWPadding) [breakout-start]
        var(--breakoutPadding) [content-start] var(--content-size) [content-end]
        var(--breakoutPadding) [breakout-end] var(--fullWPadding) [full-width-end]`,
        },
        ".container > :not(.breakout, .full-width)": {
          gridColumn: "content",
        },
        ".breakout": {
          gridColumn: "breakout",
        },
        ".full-width": {
          gridColumn: "full-width",
        },
      });
    }),
  ],
} satisfies Config;
