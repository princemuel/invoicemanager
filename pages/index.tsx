import { HomeTemplate } from "components";
import { InvoicesProvider } from "context";
import Head from "next/head";
import { GetStaticProps, Invoice, NextPageWithLayout } from "types";

import { fetchInvoices } from "lib";
import type { InferNextPropsType } from "types";
type Props = InferNextPropsType<typeof getStaticProps>;
// type Props = {};

const Home: NextPageWithLayout<Props> = ({ invoices }) => {
  console.log(invoices);

  return (
    <>
      <Head>
        <title>Invoice Mailer</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {/* @ts-expect-error */}
      <InvoicesProvider value={invoices}>
        <HomeTemplate />
      </InvoicesProvider>

      {/* <CreateInvoice /> */}
    </>
  );
};

export default Home;

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
