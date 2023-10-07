import { BaseLayout } from '@/components/templates';
import { defineMeta } from '@/config';
import { Providers } from '@/providers';
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
        <Providers>
          <BaseLayout>{children}</BaseLayout>
        </Providers>

        <Analytics />
      </body>
    </html>
  );
}
