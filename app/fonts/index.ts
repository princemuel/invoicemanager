import { cn } from '@/lib';
import localFont from 'next/font/local';

const FontSans = localFont({
  src: './league-spartan.ttf',
  variable: '--font-sans',
  display: 'swap',
});

const FontAccent = localFont({
  src: './rubik.ttf',
  variable: '--font-accent',
  display: 'swap',
});

export const fonts = cn(FontAccent.variable, FontSans.variable);
