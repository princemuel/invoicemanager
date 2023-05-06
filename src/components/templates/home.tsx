import {
  EnvelopeIcon,
  EnvelopeOpenIcon,
  InboxArrowDownIcon,
} from '@heroicons/react/24/solid';
import { IStatus } from '@src/@types';
import { datetime, formatPrice, hasValues } from '@src/helpers';
import { useGetInvoicesQuery } from '@src/hooks';
import { client } from '@src/lib';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { StatusButton, Text } from '../atoms';

const status: IStatus = ['PAID', 'PENDING', 'DRAFT'];

const HeaderCells = ['S/N', 'Due Date', 'Amount', 'Customer', 'Status'];

interface Props {}

const HomeTemplate = (props: Props) => {
  const { data, isLoading, error } = useGetInvoicesQuery(client, {});

  const invoices = (data?.invoices || []).sort((a, b) => {
    return (
      status.indexOf(a.status as IStatus[number]) -
      status.indexOf(b.status as IStatus[number])
    );
  });

  return (
    <React.Fragment>
      <section className='flex flex-col gap-12'>
        <section className='h-container'>
          <header className='mt-12'>
            <Text
              as='h1'
              className='text-700 text-brand-900/75 dark:text-neutral-100'
            >
              Dashboard
            </Text>
          </header>
        </section>

        <section className='h-container rounded-brand bg-neutral-100 px-10 py-12 shadow-100 dark:bg-brand-700'>
          <div className='flex flex-col gap-4'>
            <Text as='h2'>Hi there! (Username)</Text>
            <Text className='body-100 text-brand-900/70 dark:text-neutral-100'>
              Here is the latest report on your invoices
            </Text>
          </div>
        </section>

        <section className='h-container rounded-brand bg-brand-100 px-10 py-12 shadow-100 dark:bg-neutral-100'>
          <div className='flex items-center justify-between gap-6'>
            <div className='flex flex-col gap-4 rounded-lg bg-neutral-100 p-4 dark:bg-brand-100'>
              <div className='flex items-center justify-between gap-4'>
                <Text as='h3' className='text-blue-950'>
                  Total Invoices
                </Text>
                <div className='rounded-brand bg-green-100 p-4'>
                  <InboxArrowDownIcon className='aspect-square w-4 text-green-500' />
                </div>
              </div>

              <Text className='heading-3 font-bold text-brand-800'>
                {invoices.length}
              </Text>
            </div>

            <div className='flex flex-col gap-4 rounded-lg bg-neutral-100 p-4 dark:bg-brand-100'>
              <div className='flex items-center justify-between gap-4'>
                <Text as='h3' className='text-blue-950'>
                  Pending Invoices
                </Text>
                <div className='rounded-brand bg-violet-100 p-4'>
                  <EnvelopeOpenIcon className='aspect-square w-4 text-violet-500' />
                </div>
              </div>

              <Text className='heading-3 font-bold text-brand-800'>
                {
                  invoices.filter((invoice) => invoice.status === 'PENDING')
                    .length
                }
              </Text>
            </div>

            <div className='flex flex-col gap-4 rounded-lg bg-neutral-100 p-4 dark:bg-brand-100'>
              <div className='flex items-center justify-between gap-4'>
                <Text as='h3' className='text-blue-950'>
                  Draft Invoices
                </Text>
                <div className='rounded-brand bg-green-100 p-4'>
                  <InboxArrowDownIcon className='aspect-square w-4 text-green-500' />
                </div>
              </div>

              <Text className='heading-3 font-bold text-brand-800'>
                {
                  invoices.filter((invoice) => invoice.status === 'DRAFT')
                    .length
                }
              </Text>
            </div>

            <div className='flex flex-col gap-4 rounded-lg bg-neutral-100 p-4 dark:bg-brand-100'>
              <div className='flex items-center justify-between gap-4'>
                <Text as='h3' className='text-blue-950'>
                  Paid Invoices
                </Text>
                <div className='rounded-brand bg-green-100 p-4'>
                  <EnvelopeIcon className='aspect-square w-4 text-green-500' />
                </div>
              </div>

              <Text className='heading-3 font-bold text-brand-800'>
                {invoices.filter((invoice) => invoice.status === 'PAID').length}
              </Text>
            </div>
          </div>
        </section>

        <section className='h-container flex flex-col gap-12 rounded-brand bg-neutral-100 px-10 py-12 shadow-100 dark:bg-brand-700'>
          <div className='flex items-center justify-between'>
            <Text as='h2' className='text-brand-900 dark:text-neutral-100'>
              Invoices
            </Text>

            <Link
              to='/invoices'
              className='body-100 rounded-lg bg-brand-500 px-6 py-4 font-bold !text-neutral-100'
            >
              View All
            </Link>
          </div>

          <table className='w-full'>
            <thead className='bg-brand-200/50 p-4'>
              <tr className='grid grid-cols-5 items-center justify-items-start p-4'>
                {HeaderCells.map((cell) => (
                  <th
                    key={cell}
                    className='body-100 p-2 font-bold !text-neutral-100 last:justify-self-center'
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className='p-4'>
              {hasValues(invoices) ? (
                invoices.slice(0, 7).map((invoice) => (
                  <tr
                    key={invoice.id}
                    className='body-100 grid grid-cols-5 items-center justify-items-start p-4 text-brand-900/90 dark:text-neutral-100'
                  >
                    <td className=''>
                      <span className='font-bold text-brand-400'>#</span>
                      <span className='uppercase'>{invoice?.tag}</span>
                    </td>
                    <td className=''>
                      <time dateTime={invoice?.paymentDue}>
                        {datetime.toDateString(invoice?.paymentDue)}
                      </time>
                    </td>
                    <td className=''>{formatPrice(invoice?.total)}</td>
                    <td className=''>{invoice?.clientName}</td>
                    <td className='justify-self-center'>
                      <StatusButton
                        status={invoice?.status}
                        className='px-6 py-4'
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr className='body-100 grid place-content-center p-8 text-brand-900/90 dark:text-neutral-100'>
                  You have no invoices at this moment
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </section>
    </React.Fragment>
  );
};

export { HomeTemplate };
