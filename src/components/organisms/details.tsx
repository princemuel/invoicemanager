import { datetime } from '@src/helpers';
import { InvoiceType, useMedia } from '@src/hooks';
import * as React from 'react';
import { BackLink, StatusButton, Text } from '../atoms';
import { InvoiceActions, InvoiceItemDetails } from '../molecules';

interface Props {
  invoice?: InvoiceType;
  updateStatus: (data?: InvoiceType) => void;
  openDeleteModal: () => void;
}

const Details = ({ invoice, updateStatus, openDeleteModal }: Props) => {
  const isMobile = useMedia(`(max-width: 50em)`);
  return (
    <React.Fragment>
      <section aria-label=''>
        <div className='h-container'>
          <BackLink url='/invoices' className='mt-20' />
        </div>

        <div className='h-container'>
          <article className='mb-20 mt-10 grid gap-12'>
            <header className='flex items-center justify-between rounded-brand bg-neutral-100 px-10 py-8 shadow-100 dark:bg-brand-700'>
              <div className='flex w-full items-center gap-8'>
                <Text className='body-100 text-[#858BB2] dark:text-brand-100'>
                  Status
                </Text>
                <StatusButton
                  // @ts-expect-error
                  status={invoice?.status}
                  className='ml-auto px-14 py-6 md:ml-0 md:mr-auto'
                />

                {!isMobile ? (
                  <React.Fragment>
                    <InvoiceActions
                      updateStatus={updateStatus}
                      openDeleteModal={openDeleteModal}
                    />
                  </React.Fragment>
                ) : (
                  <React.Fragment />
                )}
              </div>
            </header>

            <div className='flex flex-col gap-12 rounded-brand bg-neutral-100 px-10 py-12 shadow-100 dark:bg-brand-700 md:px-20'>
              <div className='flex justify-between gap-12'>
                <div className='> * + * space-y-4'>
                  <Text className='text-600 font-bold leading-500 tracking-400'>
                    <span className='text-brand-400'>#</span>
                    <span className='uppercase text-brand-900 dark:text-neutral-100'>
                      {invoice?.tag}
                    </span>
                  </Text>

                  <Text className='body-100 text-brand-400 dark:text-brand-100'>
                    {invoice?.description}
                  </Text>
                </div>

                <address>
                  <Text className='body-200 text-brand-400 dark:text-brand-100'>
                    {invoice?.senderAddress?.street}
                  </Text>
                  <Text className='body-200 text-brand-400 dark:text-brand-100'>
                    {invoice?.senderAddress?.city}
                  </Text>
                  <Text className='body-200 text-brand-400 dark:text-brand-100'>
                    {invoice?.senderAddress?.postCode}
                  </Text>
                  <Text className='body-200 text-brand-400 dark:text-brand-100'>
                    {invoice?.senderAddress?.country}
                  </Text>
                </address>
              </div>

              <div className='flex gap-12 max-md:flex-wrap'>
                <div className='flex flex-1 flex-col gap-12'>
                  <div className='> * + * space-y-4'>
                    <Text className='body-100 text-brand-400 dark:text-brand-100'>
                      Invoice Date
                    </Text>
                    <Text className='body-300'>
                      {datetime.toDateString(invoice?.updatedAt)}
                    </Text>
                  </div>

                  <div className='> * + * space-y-4'>
                    <Text className='body-100 text-brand-400 dark:text-brand-100'>
                      Payment Due
                    </Text>
                    <Text className='body-300'>
                      {datetime.toDateString(invoice?.paymentDue)}
                    </Text>
                  </div>
                </div>

                <div className='flex flex-1 flex-col gap-5'>
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

                <div className='> * + * flex-[2] space-y-4'>
                  <Text className='body-100 text-brand-400 dark:text-brand-100'>
                    Sent to
                  </Text>
                  <Text className='body-300'>{invoice?.clientEmail}</Text>
                </div>
              </div>
            </div>

            <InvoiceItemDetails items={invoice?.items} isMobile={isMobile} />
          </article>
        </div>

        {isMobile ? (
          <div className='px-[2.4rem] py-9 dark:bg-brand-700'>
            <InvoiceActions
              updateStatus={updateStatus}
              openDeleteModal={openDeleteModal}
            />
          </div>
        ) : (
          <React.Fragment />
        )}
      </section>
    </React.Fragment>
  );
};

export { Details };
