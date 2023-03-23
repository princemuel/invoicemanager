import { HomeTemplate } from "components";
import { InvoicesProvider } from "context";
import Head from "next/head";
import { GetStaticProps, Invoice, NextPageWithLayout } from "types";

import { fetchInvoices } from "lib";
import Link from "next/link";
import type { InferNextPropsType } from "types";
type Props = InferNextPropsType<typeof getStaticProps>;
// type Props = {};

const Page: NextPageWithLayout<Props> = ({ invoices }) => {
  console.log(invoices);

  return (
    <>
      <Head>
        <title>Invoice Mailer</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Link href='/invoices'>
        <a className='text-500 font-bold text-brand-900 underline dark:text-neutral-100'>
          Click this link to view the Invoices Page
        </a>
      </Link>
      {/* @ts-expect-error */}
      <InvoicesProvider value={invoices}>
        <HomeTemplate />
      </InvoicesProvider>

      {/* <CreateInvoice /> */}
    </>
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
