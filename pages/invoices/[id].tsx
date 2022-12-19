import { InvoiceTemplate } from 'components';
import { getById, getInvoicePaths } from 'lib';
import Head from 'next/head';
import type { Invoice, Params } from 'types';
import { GetStaticPaths, GetStaticProps, NextPageWithLayout } from 'types';

import { InvoiceProvider } from 'context';
import type { InferNextPropsType } from 'types';
type Props = InferNextPropsType<typeof getStaticProps>;
// type Props = {};

const Invoice: NextPageWithLayout<Props> = ({ invoice }) => {
  return (
    <>
      <Head>
        <title>Single Invoice</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <InvoiceProvider value={invoice}>
        <InvoiceTemplate />
      </InvoiceProvider>
    </>
  );
};

export default Invoice;

export const getStaticProps: GetStaticProps<{
  invoice: Invoice;
}> = async (context) => {
  try {
    const { params } = context as { params: Params };
    const invoice = (await getById(params?.id)) as Invoice;

    return {
      props: {
        invoice,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getInvoicePaths();
  const paths = categories.map(({ id }) => ({ params: { id } }));

  return {
    paths,
    fallback: false,
  };
};
