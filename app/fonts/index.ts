import { cn } from '@/helpers';
import { League_Spartan } from 'next/font/google';
import localFont from 'next/font/local';

const isProduction = process.env.NODE_ENV === 'production';

const FontSans_Dev = localFont({
  src: './league-spartan.ttf',
  variable: '--font-sans',
  display: 'swap',
});
const FontSans_Prod = League_Spartan({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
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
    ? [FontSans_Prod.variable, FontAccent_Prod]
    : [FontSans_Dev.variable, FontAccent_Dev]
);
