import { client, queryOptions } from "lib";
import Head from "next/head";
import { NextPageWithLayout } from "types";

import { QueryClient } from "@tanstack/react-query";
import { HomeTemplate } from "components";
import { InvoicesProvider } from "context";
import { createDehydratedState, getErrorMessage, hasValues } from "helpers";
import { useGetInvoicesQuery } from "hooks";
import type { InferNextPropsType } from "types";
type Props = InferNextPropsType<typeof getServerSideProps>;
// type Props = {};

const Home: NextPageWithLayout<Props> = () => {
  const { data, error } = useGetInvoicesQuery(client);
  let invoices = data?.invoices;
  invoices = hasValues(invoices)
    ? invoices.sort(
        (a, b) =>
          Number(new Date(b.paymentDue!)) - Number(new Date(a.paymentDue!))
      )
    : [];

  let ex = getErrorMessage(error);

  console.log(data);

  return (
    <>
      <Head>
        <title>Invoice Mailer</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <InvoicesProvider value={invoices}>
        <HomeTemplate />
      </InvoicesProvider>

      {/* <CreateInvoice /> */}
    </>
  );
};

export default Home;

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

export async function getServerSideProps() {
  const queryClient = new QueryClient(queryOptions);

  try {
    await queryClient.prefetchQuery(
      useGetInvoicesQuery.getKey(),
      useGetInvoicesQuery.fetcher(client)
    );
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      dehydratedState: createDehydratedState(queryClient),
      // dehydratedState: dehydrate(queryClient),
    },
  };
}
