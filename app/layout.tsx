import { BaseLayout } from '@/components';
import { defineMeta } from '@/config';
import { GlobalProviders } from '@/providers';
import { Analytics } from '@vercel/analytics/react';
import type { Viewport } from 'next';
import { fontVars } from './_fonts';
import './globals.css';

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#000112' },
    { media: '(prefers-color-scheme: light)', color: '#635fc7' },
  ],
};

export const metadata = defineMeta();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' dir='ltr' className={fontVars} suppressHydrationWarning>
      <body className='relative flex min-h-screen flex-col text-brand-900 antialiased dark:bg-brand-800 dark:text-white md:flex-row'>
        <GlobalProviders>
          <Analytics />
          <BaseLayout>{children}</BaseLayout>
        </GlobalProviders>
      </body>
    </html>
  );
}
