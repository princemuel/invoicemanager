import { icons } from '@src/common';
import { datetime, formatPrice, hasValues } from '@src/helpers';
import { useGetInvoicesQuery } from '@src/hooks';
import { client } from '@src/lib';
import { Link } from 'react-router-dom';
import { StatusButton, Text } from '../atoms';

type Props = {};

const InvoicesTemplate = (props: Props) => {
  const { data } = useGetInvoicesQuery(client, {});

  const invoices = data?.invoices;

  return (
    <section aria-labelledby='invoices-heading' className='h-container'>
      <header className='mt-20 flex items-center'>
        <div className='flex-1'>
          <h1 id='invoices-heading'>Invoices</h1>

          {hasValues(invoices) ? (
            <Text as='p'>
              <span className='hidden text-brand-300 dark:text-brand-100 md:inline'>
                There are <output name='invoices'>{invoices.length}</output>{' '}
                total invoices
              </span>

              <span className='text-brand-300 dark:text-brand-100 md:hidden'>
                <output name='invoices'>{invoices.length}</output>
                &nbsp;Invoices
              </span>
            </Text>
          ) : (
            <Text as='p' className='text-brand-300 dark:text-brand-100'>
              No Invoices
            </Text>
          )}
        </div>
        <div className='flex items-center gap-6'>
          {/* <Listbox value={status} by='id' onChange={setStatus} multiple>
            <div className='relative mt-1 flex w-64 max-w-xs flex-col'>
              <Listbox.Button className='body-100 flex items-center gap-6 self-center font-bold'>
                <p className='block truncate'>
                  <span className='hidden md:inline'>Filter by status</span>
                  <span className='md:hidden'>Filter</span>
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
                    {statuses.map((stat) => {
                      return (
                        <Listbox.Option
                          key={stat.id}
                          value={stat.value}
                          className={
                            'grid grid-flow-row-dense grid-cols-3 gap-4'
                          }
                        >
                          <input
                            type='checkbox'
                            name={stat.value}
                            id={stat.value}
                            value={stat.value}
                            className='accent-brand-500'
                          />
                          <label
                            htmlFor={stat.value}
                            className='body-100 col-span-2 font-bold'
                          >
                            {capitalize(stat.value)}
                          </label>
                        </Listbox.Option>
                      );
                    })}
                  </Listbox.Options>
                </div>
              </Transition>
            </div>
          </Listbox> */}

          <Link
            className='body-100 flex items-center gap-2 rounded-pill bg-brand-500 p-2 pr-4 font-bold'
            to={'new'}
          >
            <span className='grid aspect-square place-content-center rounded-full bg-neutral-100 p-4'>
              <img src={icons.actions.add} alt={''} />
            </span>

            <span className='hidden md:inline'>New Invoice</span>
            <span className='md:hidden'>New</span>
          </Link>
        </div>
      </header>

      <ul aria-label='List of Invoices' className='mt-20 flex flex-col gap-6'>
        {hasValues(invoices) ? (
          invoices.map((invoice) => (
            <li
              key={invoice?.id}
              className='rounded-brand bg-neutral-100 p-10 shadow-100 dark:bg-brand-700 max-sx:pt-4'
            >
              <Link
                to={`/invoices/${invoice.id}`}
                className='grid grid-cols-2 grid-rows-3 items-end sx:flex sx:items-center sx:gap-8'
              >
                <Text as='p' className='body-100 font-bold'>
                  <span className='text-brand-400'>#</span>
                  <span className='uppercase text-brand-900 dark:text-neutral-100'>
                    {/* {invoice?.id} */}
                    {invoice?.tag}
                  </span>
                </Text>

                <Text
                  as='p'
                  className='body-100 flex-1 font-medium text-brand-400 dark:text-brand-100'
                >
                  <span>Due&nbsp;</span>
                  <time>{datetime.toDateString(invoice?.paymentDue)}</time>
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
                  //@ts-expect-error
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
