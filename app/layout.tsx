import { Sidebar } from '@/components';
import { Providers } from '@/providers';
import { Analytics } from '@vercel/analytics/react';
import { cx } from 'cva';
import { Metadata } from 'next';
import { league_spartan, nunito_sans } from './fonts';
import './globals.css';
import { fetchAuthUser } from './lib/get-user';

export const metadata: Metadata = {
  // metadataBase: new URL(process.env.VERCEL_URL || ''),
  title: {
    template: 'Invoice Tacker | %s',
    default: 'Invoice Tracker',
  },
  description: '',
  generator: 'Next.js',
  applicationName: 'Invoice Tracker',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'next.js',
    'react',
    'javascript',
    'invoice',
    'invoice manager',
    'e-commerce',
  ],
  colorScheme: 'dark light',
  creator: 'Prince Muel',
  publisher: 'Prince Muel',
  authors: { name: 'Prince Muel', url: 'https://github.com/princemuel' },
  openGraph: {
    type: 'website',
    title: `Invoice Tracker`,
    description: '.',
    url: 'https://invoicetracker.vercel.app',
    siteName: 'Princemuel',
    // images: [
    //   {
    //     url: 'https://nextjs.org/og.png',
    //     width: 800,
    //     height: 600,
    //   },
    //   {
    //     url: 'https://nextjs.org/og-alt.png',
    //     width: 1800,
    //     height: 1600,
    //     alt: 'My custom alt',
    //   },
    // ],
    locale: 'en-US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@iamprincemuel',
    creator: '@iamprincemuel',
    // add image
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'standard',
      'max-snippet': -1,
    },
  },
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#000112' },
    { media: '(prefers-color-scheme: light)', color: '#635fc7' },
  ],
};

export default async function RootLayout({ children }: LayoutRouteProps) {
  const user = await fetchAuthUser();
  // const user = {};

  return (
    <html
      lang='en'
      className={cx('', nunito_sans.className, league_spartan.className)}
      suppressHydrationWarning
    >
      <body className='relative flex min-h-screen flex-col md:flex-row'>
        <Providers userId={user?.id || ''}>
          <Sidebar userImage={user?.image} />
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
