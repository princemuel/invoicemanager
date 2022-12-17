import { HomeTemplate } from 'components';
import Head from 'next/head';
import { NextPageWithLayout } from 'types';

// import { InferNextPropsType } from 'types';
// type Props = InferNextPropsType<typeof getStaticProps>;
type Props = {};

const Home: NextPageWithLayout<Props> = () => {
  return (
    <>
      <Head>
        <title>Invoice Mailer</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <HomeTemplate />
    </>
  );
};

export default Home;
