import { icons } from "common";
import { StatusButton, Text } from "components/atoms";
import { InvoiceTable } from "components/molecules";
import { useInvoice } from "context";
import { formatDate } from "helpers";
import Link from "next/link";

type Props = {};

const InvoiceTemplate = (props: Props) => {
  const invoice = useInvoice();

  return (
    <section aria-labelledby='invoice-heading' className='h-container'>
      <Link href='/'>
        <a className='body-100 mt-20 flex items-center gap-8 font-bold'>
          <span>
            <icons.arrow.left />
          </span>
          <span>Go back</span>
        </a>
      </Link>

      <div className='mt-10 grid gap-12'>
        <header className='shadow-100 rounded-brand bg-neutral-100 py-12 px-10 dark:bg-brand-700'>
          <div className='flex items-center justify-between gap-8'>
            <Text className='body-100 text-[#858BB2] dark:text-brand-100'>
              Status
            </Text>
            <StatusButton status={invoice?.status} className='px-14 py-6' />
          </div>
        </header>

        <div className='shadow-100 rounded-brand bg-neutral-100 p-16 dark:bg-brand-700'>
          <div className='flex justify-between'>
            <div className='> * + * items-start space-y-2'>
              <Text className='body-100 font-bold'>
                <span className='text-brand-400'>#</span>
                <span className='text-brand-900 dark:text-neutral-100'>
                  {invoice?.id}
                </span>
              </Text>
              <Text className='body-100 text-brand-400 dark:text-brand-100 '>
                {invoice?.description}
              </Text>
            </div>

            <div className='> * + * items-start space-y-2'>
              <Text className='body-200 text-brand-400 dark:text-brand-100 '>
                {invoice?.senderAddress?.street}
              </Text>
              <Text className='body-200 text-brand-400 dark:text-brand-100 '>
                {invoice?.senderAddress?.city}
              </Text>
              <Text className='body-200 text-brand-400 dark:text-brand-100 '>
                {invoice?.senderAddress?.postCode}
              </Text>
              <Text className='body-200 text-brand-400 dark:text-brand-100'>
                {invoice?.senderAddress?.country}
              </Text>
            </div>
          </div>

          <div className='flex flex-wrap items-start'>
            <div className='> * + * flex-[2] space-y-10'>
              <div className='> * + * space-y-2'>
                <Text className='body-100 text-brand-400 dark:text-brand-100'>
                  Invoice Date
                </Text>
                <Text className='body-300'>
                  {formatDate(invoice?.updatedAt)}
                </Text>
              </div>

              <div className='> * + * space-y-2'>
                <Text className='body-100 mt-[2.5rem] text-brand-400 dark:text-brand-100'>
                  Payment Due
                </Text>
                <Text className='body-300'>
                  {formatDate(invoice?.paymentDue)}
                </Text>
              </div>
            </div>

            <div className='> * + * flex-1 space-y-2'>
              <Text className='body-100 text-brand-400 dark:text-brand-100'>
                Bill To
              </Text>

              <Text className='body-300'>{invoice?.clientName}</Text>
              <Text className='body-100 text-brand-400 dark:text-brand-100'>
                {invoice?.clientAddress?.street}
              </Text>
              <Text className='body-100 text-brand-400 dark:text-brand-100'>
                {invoice?.clientAddress?.city}
              </Text>
              <Text className='body-100 text-brand-400 dark:text-brand-100'>
                {invoice?.clientAddress?.postCode}
              </Text>
              <Text className='body-100 text-brand-400 dark:text-brand-100'>
                {invoice?.clientAddress?.country}
              </Text>
            </div>

            <div className='> * + * flex-1 space-y-2'>
              <Text className='body-100 text-brand-400 dark:text-brand-100 '>
                Sent To
              </Text>
              <Text className='body-300'>{invoice?.clientEmail}</Text>
            </div>
          </div>

          {/* @ts-expect-error */}
          <InvoiceTable data={invoice} />
        </div>
      </div>
    </section>
  );
};

export { InvoiceTemplate };
