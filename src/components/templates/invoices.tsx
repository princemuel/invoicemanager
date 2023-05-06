import { Listbox, Transition } from '@headlessui/react';
import type { IStatus } from '@src/@types';
import { icons } from '@src/common';
import {
  capitalize,
  datetime,
  formatPrice,
  hasValues,
  reverse,
  statuses,
  trim,
} from '@src/helpers';
import { useGetInvoicesQuery, useMedia } from '@src/hooks';
import { client } from '@src/lib';
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { StatusButton, Text } from '../atoms';
import { PageSEO } from './seo';

const status: IStatus = ['PAID', 'PENDING', 'DRAFT'];

interface Props {}

const InvoicesTemplate = (props: Props) => {
  const { data } = useGetInvoicesQuery(client, {});
  const [selectedStatus, setSelectedStatus] = useState([
    statuses[0],
    statuses[1],
    statuses[2],
  ]);
  const isWide = useMedia('(min-width: 50em)');

  const invoices = data?.invoices || [];

  const filtered = hasValues(selectedStatus)
    ? invoices.filter((invoice) => {
        return selectedStatus.some(
          (status) => invoice?.status === status.value
        );
      })
    : invoices.sort((a, b) => {
        return (
          status.indexOf(a.status as IStatus[number]) -
          status.indexOf(b.status as IStatus[number])
        );
      });

  return (
    <section aria-label='Invoices Page' className='h-container'>
      <PageSEO
        title={`Invoices`}
        description={`The list of all the current user's invoices`}
        isArticle={false}
      />
      <header className='mt-20 flex items-center'>
        <div className='flex-1'>
          <Text as='h1'>Invoices</Text>

          {hasValues(filtered) ? (
            <Text
              aria-live='polite'
              className='text-brand-300 dark:text-brand-100'
            >
              <output name='invoices'>
                {isWide
                  ? `There are ${filtered?.length} total invoices`
                  : `${filtered?.length} Invoices`}
              </output>
            </Text>
          ) : (
            <Text className='text-brand-300 dark:text-brand-100'>
              No Invoices
            </Text>
          )}
        </div>

        <div className='flex items-center gap-6'>
          <Listbox
            value={selectedStatus}
            by='id'
            onChange={setSelectedStatus}
            multiple
          >
            <div className='relative mt-1 flex w-64 max-w-xs flex-col'>
              <Listbox.Button className='body-100 flex items-center gap-6 self-center font-bold'>
                <p className='block truncate'>
                  {isWide ? `Filter by status` : `Filter`}
                </p>

                <span className='pointer-events-none'>
                  <img
                    src={icons.arrow.down}
                    alt='filter invoices by status'
                    className='transform-gpu ui-open:-rotate-180'
                  />
                </span>
              </Listbox.Button>

              <Transition
                as={Fragment}
                enter='transition duration-100 ease-out'
                enterFrom='transform scale-95 opacity-0'
                enterTo='transform scale-100 opacity-100'
                leave='transition duration-75 ease-out'
                leaveFrom='transform scale-100 opacity-100'
                leaveTo='transform scale-95 opacity-0'
              >
                <div className='absolute z-10 mt-16 w-full rounded-brand bg-neutral-100 p-[2.4rem] pr-12 shadow-200 dark:bg-brand-600 dark:shadow-300'>
                  <Listbox.Options className={'flex flex-col gap-8'}>
                    {[...reverse(statuses)].map((stat) => {
                      return (
                        <Listbox.Option
                          key={stat.id}
                          value={stat}
                          className={'group flex flex-row items-center gap-5'}
                        >
                          <button
                            type='button'
                            className='inline-grid aspect-square w-[1.6rem] place-items-center rounded-[0.2rem] border  border-brand-400/25 bg-brand-100 group-hover:border-brand-500 group-aria-selected:bg-brand-500 dark:bg-brand-700 dark:group-aria-selected:bg-brand-500'
                          >
                            <img
                              src={icons.actions.check}
                              className='hidden group-aria-selected:block'
                              alt=''
                            />
                          </button>

                          <span className='body-100 col-span-2 font-bold'>
                            {capitalize(stat.value)}
                          </span>
                        </Listbox.Option>
                      );
                    })}
                  </Listbox.Options>
                </div>
              </Transition>
            </div>
          </Listbox>

          <Link
            className='body-100 flex items-center gap-2 rounded-pill bg-brand-500 p-2 pr-4 font-bold text-neutral-100'
            to={'new'}
          >
            <span className='grid aspect-square place-content-center rounded-full bg-neutral-100 p-4'>
              <img src={icons.actions.add} alt={''} />
            </span>

            <span>{trim(`New ${isWide ? 'Invoice' : ''}`)}</span>
          </Link>
        </div>
      </header>

      <ul aria-label='Invoices List' className='mt-20 flex flex-col gap-6'>
        {hasValues(filtered) ? (
          filtered?.map((invoice) => (
            <li
              key={invoice?.id}
              className='rounded-brand bg-neutral-100 p-[1.6rem] shadow-100 transition-[background,border] delay-0 duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:border hover:border-brand-500 active:border active:border-brand-500 dark:bg-brand-700 max-sx:pt-4'
            >
              <Link
                to={`/invoices/${invoice.id}`}
                className='grid grid-cols-2 grid-rows-3 items-end sx:flex sx:items-center sx:gap-8'
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
                  className='body-100 col-start-2 col-end-3 row-start-1 flex-1 justify-self-end font-medium text-[#858BB2] dark:text-neutral-100 sx:justify-self-auto'
                >
                  {invoice?.clientName}
                </Text>

                <Text
                  as='p'
                  className='row-start-3 row-end-4 flex-1 text-600 font-bold leading-500 tracking-400 text-brand-900 dark:text-neutral-100 sx:text-right'
                >
                  <output>{formatPrice(invoice?.total)}</output>
                </Text>

                <StatusButton
                  status={invoice?.status}
                  className='col-start-2 col-end-3 row-start-3 row-end-4 h-16 w-[11rem] flex-1 justify-self-end sx:justify-self-auto'
                />

                <Text
                  as='p'
                  className='hidden sx:col-start-6 sx:col-end-7 sx:block'
                >
                  <img src={icons.arrow.right} alt={''} />
                </Text>
              </Link>
            </li>
          ))
        ) : (
          <li className='flex min-h-full items-center justify-center'>
            <article className='flex flex-col items-center gap-20 text-center'>
              <img
                src={'/assets/svgs/illustration-empty.svg'}
                width='242'
                height='200'
                className='w-full'
                alt={'Invoices List Empty'}
              />

              <div className='flex flex-col items-center gap-8 px-16'>
                <Text as='h2'>There is nothing here</Text>

                <Text as='p' className='max-w-[22rem]'>
                  Create an invoice by clicking the{' '}
                  <em className='font-bold'>New Invoice</em> button and get
                  started
                </Text>
              </div>
            </article>
          </li>
        )}
      </ul>
    </section>
  );
};

export { InvoicesTemplate };
