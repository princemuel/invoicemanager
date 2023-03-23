import { StatusButton, Text } from "components/atoms";
import { formatDate } from "helpers";
import { Invoice } from "hooks";
import * as React from "react";

type Props = {
  invoice: Invoice;
};

const InvoiceDetailsMobile = ({ invoice }: Props) => {
  return (
    <React.Fragment>
      <article className='mt-10 grid gap-12 md:hidden'>
        <header className='flex items-center justify-between rounded-brand bg-neutral-100 py-12 px-10 shadow-100 dark:bg-brand-700'>
          <Text className='body-100 text-[#858BB2] dark:text-brand-100'>
            Status
          </Text>
          <StatusButton status={invoice?.status} className='px-14 py-6' />
        </header>

        <div className='flex flex-col gap-8 rounded-brand bg-neutral-100 py-12 px-10 shadow-100 dark:bg-brand-700'>
          <div className='i'>
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

          <div>
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

          <div className='flex gap-8'>
            <div className='flex flex-1 flex-col gap-12'>
              <div className='> * + * space-y-4'>
                <Text className='body-100 text-brand-400 dark:text-brand-100'>
                  Invoice Date
                </Text>
                <Text className='body-300'>
                  {formatDate(invoice?.updatedAt)}
                </Text>
              </div>

              <div className='> * + * space-y-4'>
                <Text className='body-100 text-brand-400 dark:text-brand-100'>
                  Payment Due
                </Text>
                <Text className='body-300'>
                  {formatDate(invoice?.paymentDue)}
                </Text>
              </div>
            </div>

            <div className='> * + * flex-1 space-y-5'>
              <div className='> * + * space-y-4'>
                <Text className='body-100 text-brand-400 dark:text-brand-100'>
                  Bill To
                </Text>
                <Text className='body-300'>{invoice?.clientName}</Text>
              </div>

              <address>
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
              </address>
            </div>
          </div>
        </div>
      </article>
    </React.Fragment>
  );
};

export { InvoiceDetailsMobile };
