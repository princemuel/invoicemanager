import { Invoice } from '@src/@types';
import { icons } from '@src/common';
import { formatDate, formatPrice, grandTotal } from '@src/helpers';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { StatusButton, Text } from '../atoms';

type Props = {
  invoice: Invoice;
};

const InvoiceDetails = ({ invoice }: Props) => {
  return (
    <React.Fragment>
      <section className='h-container max-md:hidden'>
        <Link
          to='/invoices'
          className='body-100 mt-20 flex items-center gap-8 font-bold'
        >
          <span>
            <icons.arrow.left />
          </span>
          <span>Go back</span>
        </Link>

        <article className='mt-10 grid gap-12'>
          <header className='flex items-center justify-between rounded-brand bg-neutral-100 py-8 px-10 shadow-100 dark:bg-brand-700'>
            <div className='flex items-center justify-between gap-8'>
              <Text className='body-100 text-[#858BB2] dark:text-brand-100'>
                Status
              </Text>
              <StatusButton status={invoice?.status} className='px-14 py-6' />
            </div>

            <div className='flex items-center justify-between gap-4'>
              <button type='button' className='btn btn-edit font-bold'>
                Edit
              </button>
              <button type='button' className='btn btn-delete font-bold'>
                Delete
              </button>
              <button type='button' className='btn btn-invoice font-bold'>
                Mark as Paid
              </button>
            </div>
          </header>

          <div className='flex flex-col gap-12 rounded-brand bg-neutral-100 py-12 px-20 shadow-100 dark:bg-brand-700'>
            <div className='flex justify-between'>
              <div className='> * + * space-y-4'>
                <Text className='text-600 font-bold leading-500 tracking-400'>
                  <span className='text-brand-400'>#</span>
                  <span className='text-brand-900 dark:text-neutral-100'>
                    {invoice?.id}
                  </span>
                </Text>

                <Text className='body-100 text-brand-400 dark:text-brand-100'>
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
            </div>

            <div className='flex justify-between'>
              <div className='flex flex-1 flex-col gap-12'>
                <div className='> * + * space-y-4'>
                  <Text className='body-100 text-brand-400 dark:text-brand-100'>
                    Invoice Date
                  </Text>
                  <Text className='body-300'>
                    {/* @ts-expect-error */}
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

              <div className='> * + * flex-[2] space-y-4'>
                <Text className='body-100 text-brand-400 dark:text-brand-100 '>
                  Sent to
                </Text>
                <Text className='body-300'>{invoice?.clientEmail}</Text>
              </div>
            </div>

            <table className='grid auto-cols-min grid-cols-1 gap-8 overflow-clip rounded-brand px-12 pt-10 shadow-100 dark:bg-brand-600'>
              <thead>
                <tr className='grid grid-cols-4 justify-items-end'>
                  <th className='body-200 justify-self-start'>Item Name</th>
                  <th className='body-200 '>QTY.</th>
                  <th className='body-200 '>Price</th>
                  <th className='body-200 '>Total</th>
                </tr>
              </thead>

              <tbody className='flex flex-col gap-10 py-4'>
                {invoice?.items?.map((item) => {
                  return (
                    <tr
                      key={item.name}
                      className='grid grid-cols-4 justify-items-end gap-4'
                    >
                      <td className='body-100 justify-self-start font-bold text-brand-400 dark:text-neutral-100'>
                        {item?.name}
                      </td>
                      <td className='body-100 font-bold text-brand-400 dark:text-neutral-100'>
                        {item?.quantity}
                      </td>
                      <td className='body-100 font-bold text-brand-400 dark:text-neutral-100'>
                        {formatPrice(item?.price)}
                      </td>
                      <td className='body-100 font-bold text-brand-400 dark:text-neutral-100'>
                        {formatPrice(item?.total)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>

              <tfoot className='w-full-shadow bg-[#373B53] py-10 text-brand-900 dark:bg-brand-900'>
                <tr className='flex items-center justify-between '>
                  <th className='body-200 text-neutral-100'>Amount Due</th>
                  <td className='text-700 font-bold leading-[3.2rem] tracking-[-0.63px] text-neutral-100 '>
                    {formatPrice(grandTotal(invoice?.items))}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </article>
      </section>
    </React.Fragment>
  );
};

export { InvoiceDetails };
