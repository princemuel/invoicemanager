import 'assets/styles/main.css';
import { Layout } from 'components';
import Head from 'next/head';
import type { AppPropsWithLayout } from 'types';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>

      {getLayout(<Component {...pageProps} />)}
    </>
  );
}

export default MyApp;
