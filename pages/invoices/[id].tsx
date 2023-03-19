import { QueryClient } from "@tanstack/react-query";
import { createDehydratedState } from "helpers";
import { useGetInvoiceQuery } from "hooks";
import { client, queryOptions } from "lib";
import Head from "next/head";
import type { GetServerSideProps, Invoice } from "types";
import { NextPageWithLayout } from "types";

// import type { InferNextPropsType } from "types";
// type Props = InferNextPropsType<typeof getStaticProps>;
type Props = {};

const Invoice: NextPageWithLayout<Props> = () => {
  return (
    <>
      <Head>
        <title>Single Invoice</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div></div>

      {/* <InvoiceProvider value={invoice}>
        <InvoiceTemplate />
      </InvoiceProvider> */}
    </>
  );
};

export default Invoice;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const queryClient = new QueryClient(queryOptions);

  try {
    await queryClient.prefetchQuery(
      useGetInvoiceQuery.getKey({
        where: {
          id: params?.id! as string,
        },
      }),
      useGetInvoiceQuery.fetcher(client, {
        where: {
          id: params?.id! as string,
        },
      })
    );
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      dehydratedState: createDehydratedState(queryClient),
    },
  };
};
