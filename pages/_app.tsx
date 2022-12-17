import 'assets/styles/main.css';
import { Layout } from 'components';
import { ThemeProvider } from 'next-themes';
import Head from 'next/head';
import type { AppPropsWithLayout } from 'types';

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>

      <ThemeProvider enableSystem={true} attribute='class'>
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </>
  );
}

export default App;
