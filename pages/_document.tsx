import { Head, Html, Main, NextScript } from 'next/document';

export default function MyDocument() {
  return (
    <Html lang='en'>
      <Head>
        {/* <meta name='color-scheme' content='dark light' /> */}
        <meta
          name='theme-color'
          media='(prefers-color-scheme: light)'
          content='white'
        />
        <meta
          name='theme-color'
          media='(prefers-color-scheme: dark)'
          content='black'
        />
        <meta name='msapplication-TileColor' content='#ffffff' />
        <meta name='msapplication-TileImage' content='/ms-icon-144x144.png' />
        <meta name='author' content='Prince Muel' />
        <link rel='manifest' href='/manifest.webmanifest' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin={'true'}
        />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Spartan:wght@300;400;500;600;700&display=swap'
        />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
