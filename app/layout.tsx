import { BaseLayout } from '@/components';
import { defineMeta } from '@/config';
import { GlobalProviders } from '@/providers';
import { Analytics } from '@vercel/analytics/react';
import { fonts } from './fonts';
import './globals.css';

export const metadata = defineMeta();

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={fonts} suppressHydrationWarning>
      <body className='relative flex min-h-screen flex-col text-brand-900 dark:bg-brand-800 dark:text-white md:flex-row'>
        <GlobalProviders>
          <BaseLayout>{children}</BaseLayout>
        </GlobalProviders>
        <Analytics />
      </body>
    </html>
  );
}
