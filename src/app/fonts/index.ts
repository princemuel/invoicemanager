import { cn } from '@/helpers';
import { Rubik } from 'next/font/google';
import localFont from 'next/font/local';

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

const FontAccent = Rubik({
  weight: 'variable',
  subsets: ['latin'],
  variable: '--font-accent',
  display: 'swap',
});

export const fontVars = cn(FontSans.variable, FontAccent.variable);
