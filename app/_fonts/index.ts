import { cn } from '@/helpers';
import { League_Spartan } from 'next/font/google';
import localFont from 'next/font/local';

const isProduction = process.env.NODE_ENV === 'production';

const FontSans = localFont({
  display: 'swap',
  variable: '--font-sans',
  src: [
    {
      path: './spartan-medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './spartan-bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
});

const FontAccent_Dev = localFont({
  src: './rubik.ttf',
  variable: '--font-accent',
  display: 'swap',
});

const FontAccent_Prod = League_Spartan({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const fonts = cn(
  isProduction
    ? [FontSans.variable, FontAccent_Prod.variable]
    : [FontSans.variable, FontAccent_Dev.variable]
);
