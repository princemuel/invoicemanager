import { InvoiceTemplate } from "components";
import { InvoiceProvider } from "context";
import { getById, getInvoicePaths } from "lib";
import Head from "next/head";
import * as React from "react";
import type { GetStaticPaths, GetStaticProps, Invoice, Params } from "types";
import { NextPageWithLayout } from "types";

import type { InferNextPropsType } from "types";
type Props = InferNextPropsType<typeof getStaticProps>;
// type Props = {};

const Page: NextPageWithLayout<Props> = ({ invoice }) => {
  console.log(invoice);
  return (
    <React.Fragment>
      <Head>
        <title>Single Invoice</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <React.Fragment>
        {/* @ts-expect-error */}
        <InvoiceProvider value={invoice}>
          <InvoiceTemplate />
        </InvoiceProvider>
      </React.Fragment>
    </React.Fragment>
  );
};

export default Page;

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

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { params } = context;
//   const queryClient = new QueryClient(queryOptions);

//   try {
//     await queryClient.prefetchQuery(
//       useGetInvoiceQuery.getKey({
//         where: {
//           id: params?.id! as string,
//         },
//       }),
//       useGetInvoiceQuery.fetcher(client, {
//         where: {
//           id: params?.id! as string,
//         },
//       })
//     );
//   } catch (error) {
//     console.log(error);
//   }

//   return {
//     props: {
//       dehydratedState: createDehydratedState(queryClient),
//     },
//   };
// };
