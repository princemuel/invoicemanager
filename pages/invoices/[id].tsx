import { InvoiceTemplate } from 'components';
import Head from 'next/head';
import { NextPageWithLayout } from 'types';

// import { InferNextPropsType } from 'types';
// type Props = InferNextPropsType<typeof getStaticProps>;
type Props = {};

const Invoice: NextPageWithLayout<Props> = () => {
  return (
    <>
      <Head>
        <title>Single Invoice</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <InvoiceTemplate />
    </>
  );
};

export default Invoice;
