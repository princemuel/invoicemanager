import { InvoicesTemplate } from "components";
import { InvoicesProvider } from "context";
import { fetchInvoices } from "lib";
import Head from "next/head";
import * as React from "react";
import type { InferNextPropsType } from "types";
import { GetStaticProps, Invoice, NextPageWithLayout } from "types";
type Props = InferNextPropsType<typeof getStaticProps>;
// type Props = {};

const Page: NextPageWithLayout<Props> = ({ invoices }) => {
  console.log(invoices);

  return (
    <React.Fragment>
      <Head>
        <title>Invoice Mailer</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <React.Fragment>
        {/* <InvoicesProvider value={invoices}> */}
        {/* @ts-expect-error */}
        <InvoicesProvider value={invoices}>
          <InvoicesTemplate />
        </InvoicesProvider>

        {/* <CreateInvoice /> */}
      </React.Fragment>
    </React.Fragment>
  );
};

export default Page;

export const getStaticProps: GetStaticProps<{
  invoices: Invoice[];
}> = async () => {
  try {
    const invoices = await fetchInvoices();

    return {
      props: {
        invoices,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

// export const getStaticProps: GetStaticProps = async () => {
//   try {
//     const queryClient = new QueryClient(queryOptions);

//     await queryClient.prefetchQuery(
//       useGetInvoicesQuery.getKey(),
//       useGetInvoicesQuery.fetcher()
//     );

//     return {
//       props: {
//         dehydratedState: createDehydratedState(queryClient),
//       },
//     };
//   } catch (error) {
//     return {
//       notFound: true,
//     };
//   }
// };

// export async function getServerSideProps() {
//   const queryClient = new QueryClient(queryOptions);

//   try {
//     await queryClient.prefetchQuery(
//       useGetInvoicesQuery.getKey(),
//       useGetInvoicesQuery.fetcher(client)
//     );
//   } catch (error) {
//     console.log(error);
//   }

//   return {
//     props: {
//       dehydratedState: createDehydratedState(queryClient),
//       // dehydratedState: dehydrate(queryClient),
//     },
//   };
// }
