import {
  EnvelopeIcon,
  EnvelopeOpenIcon,
  InboxArrowDownIcon,
} from '@heroicons/react/24/solid';
import type { Project } from '@src/@types';
import {
  client,
  datetime,
  formatPrice,
  hasValues,
  pluralize,
  useGetInvoicesQuery,
  useMedia,
} from '@src/lib';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { StatusButton, Text } from '../atoms';
import { PageSEO } from './seo';
import styles from './templates.module.css';

const status: Project.IStatus = ['PAID', 'PENDING', 'DRAFT'];
const HeaderCells = ['S/N', 'Due Date', 'Amount', 'Customer', 'Status'];

interface Props {}

const HomeTemplate = (props: Props) => {
  const isMobile = useMedia('(max-width: 40em)');

  const { data } = useGetInvoicesQuery(client, {});

  const invoices = React.useMemo(() => {
    return (data?.invoices || []).sort((a, b) => {
      return (
        status.indexOf(a.status as Project.IStatus[number]) -
        status.indexOf(b.status as Project.IStatus[number])
      );
    });
  }, [data?.invoices]);

  const draftInvoices = React.useMemo(() => {
    return invoices.filter((invoice) => invoice.status === 'DRAFT');
  }, [invoices]);

  const pendingInvoices = React.useMemo(() => {
    return invoices.filter((invoice) => invoice.status === 'PENDING');
  }, [invoices]);

  const paidInvoices = React.useMemo(() => {
    return invoices.filter((invoice) => invoice.status === 'PAID');
  }, [invoices]);

  return (
    <React.Fragment>
      <PageSEO title='Home' isArticle={false} />

      <section className='mb-20 flex flex-col gap-12'>
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

        <section className='h-container rounded-brand bg-neutral-300 px-10 py-12  dark:bg-brand-700'>
          <div className={styles['invoice__cards']}>
            <div className='flex flex-col gap-4 rounded-lg bg-neutral-100 p-4 dark:bg-brand-600'>
              <div className='flex items-center justify-between gap-4'>
                <Text
                  as='h4'
                  className='font-bold text-blue-950 dark:text-neutral-100'
                >
                  Total Invoices
                </Text>
                <div className='rounded-brand bg-green-100 p-4'>
                  <InboxArrowDownIcon className='aspect-square w-4 text-green-500' />
                </div>
              </div>

              <Text className='heading-3 font-bold text-brand-800 dark:text-neutral-100'>
                {invoices.length}
              </Text>
            </div>

            <div className='flex flex-col gap-4 rounded-lg bg-neutral-100 p-4 dark:bg-brand-600'>
              <div className='flex items-center justify-between gap-4'>
                <Text
                  as='h4'
                  className='font-bold text-blue-950 dark:text-neutral-100'
                >
                  Pending Invoices
                </Text>
                <div className='rounded-brand bg-violet-100 p-4'>
                  <EnvelopeOpenIcon className='aspect-square w-4 text-violet-500' />
                </div>
              </div>

              <Text className='heading-3 font-bold text-brand-800  dark:text-neutral-100'>
                {pendingInvoices.length}
              </Text>
            </div>

            <div className='flex flex-col gap-4 rounded-lg bg-neutral-100 p-4 dark:bg-brand-600'>
              <div className='flex items-center justify-between gap-4'>
                <Text
                  as='h4'
                  className='font-bold text-blue-950 dark:text-neutral-100'
                >
                  Draft Invoices
                </Text>
                <div className='rounded-brand bg-blue-100 p-4'>
                  <InboxArrowDownIcon className='aspect-square w-4 text-blue-500' />
                </div>
              </div>

              <Text className='heading-3 font-bold text-brand-800  dark:text-neutral-100'>
                {draftInvoices.length}
              </Text>
            </div>

            <div className='flex flex-col gap-4 rounded-lg bg-neutral-100 p-4 dark:bg-brand-600'>
              <div className='flex items-center justify-between gap-4'>
                <Text
                  as='h4'
                  className='font-bold text-blue-950 dark:text-neutral-100'
                >
                  Paid {pluralize('Invoice', paidInvoices.length)}
                </Text>
                <div className='rounded-brand bg-amber-100 p-4'>
                  <EnvelopeIcon className='aspect-square w-4 text-amber-500' />
                </div>
              </div>

              <Text className='heading-3 font-bold text-brand-800  dark:text-neutral-100'>
                {paidInvoices.length}
              </Text>
            </div>
          </div>
        </section>

        <section className='h-container flex flex-col gap-12 rounded-brand bg-neutral-300 px-10 py-12 shadow-100 dark:bg-brand-700'>
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

          {isMobile ? (
            <ul
              aria-label='Invoices List'
              className='flex w-full flex-col gap-6'
            >
              {hasValues(invoices) ? (
                invoices.map((invoice) => (
                  <li
                    key={invoice?.id}
                    className='rounded-brand bg-neutral-100 p-[1.6rem] shadow-100 transition-[background,border] delay-0 duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:border hover:border-brand-500 active:border active:border-brand-500 dark:bg-brand-600 max-sx:pt-4'
                  >
                    <Link
                      to={`invoices/${String(invoice?.id)}`}
                      className='grid grid-cols-2 grid-rows-3 items-end'
                    >
                      <Text as='p' className='body-100 font-bold'>
                        <span className='text-brand-400'>#</span>
                        <span className='uppercase text-brand-900 dark:text-neutral-100'>
                          {invoice?.tag}
                        </span>
                      </Text>

                      <Text
                        as='p'
                        className='body-100 flex-1 font-medium text-brand-400 dark:text-brand-100'
                        aria-live='polite'
                      >
                        <span>Due </span>
                        <time dateTime={invoice?.paymentDue}>
                          {datetime.toDateString(invoice?.paymentDue)}
                        </time>
                      </Text>

                      <Text
                        as='p'
                        className='body-100 col-start-2 col-end-3 row-start-1 flex-1 justify-self-end font-medium text-[#858BB2] dark:text-neutral-100'
                      >
                        {invoice?.clientName}
                      </Text>

                      <Text
                        as='p'
                        className='row-start-3 row-end-4 flex-1 text-600 font-bold leading-500 tracking-400 text-brand-900 dark:text-neutral-100'
                      >
                        <output>{formatPrice(invoice?.total)}</output>
                      </Text>

                      <StatusButton
                        status={invoice?.status}
                        className='col-start-2 col-end-3 row-start-3 row-end-4 h-16 w-[11rem] flex-1 justify-self-end'
                      />
                    </Link>
                  </li>
                ))
              ) : (
                <li className='body-100 grid place-content-center p-8'>
                  <p className='text-brand-900/90 dark:text-neutral-100'>
                    You have no invoices at this moment
                  </p>
                </li>
              )}
            </ul>
          ) : (
            <table className='w-full'>
              <thead className='bg-brand-500 p-4'>
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
                      <td className='justify-self-stretch'>
                        <StatusButton
                          status={invoice?.status}
                          className='w-full px-6 py-4'
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className='body-100 grid place-content-center p-8'>
                    <td className='text-brand-900/90 dark:text-neutral-100'>
                      You have no invoices at this moment
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </section>
      </section>
    </React.Fragment>
  );
};

export { HomeTemplate };
