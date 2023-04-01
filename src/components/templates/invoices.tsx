import { icons } from '@src/common';
import { Calendar, formatPrice, hasValues } from '@src/helpers';
import { useInvoiceList } from '@src/hooks';
import { Link } from 'react-router-dom';
import { StatusButton, Text } from '../atoms';

type Props = {};

const InvoicesTemplate = (props: Props) => {
  const { data } = useInvoiceList();

  return (
    <section aria-labelledby='invoices-heading' className='h-container'>
      <header className='mt-20 flex items-center'>
        <div className='flex-1'>
          <h1 id='invoices-heading'>Invoices</h1>

          {hasValues(data) ? (
            <Text variant='p'>
              <span className='hidden text-brand-300 dark:text-brand-100 md:inline'>
                There are <output name='invoices'>{data.length}</output> total
                invoices
              </span>

              <span className='text-brand-300 dark:text-brand-100 md:hidden'>
                <output name='invoices'>{data?.length}</output>
                &nbsp;Invoices
              </span>
            </Text>
          ) : (
            <Text variant='p' className='text-brand-300 dark:text-brand-100'>
              No Invoices
            </Text>
          )}
        </div>

        <div>
          <div>
            <button type='button' className=''>
              <span className='hidden md:inline'>Filter all Invoices</span>
              <span className='md:hidden'>Filter</span>
            </button>

            <div></div>
          </div>
        </div>

        <button type='button' className='btn-invoice btn'>
          <span className='grid place-content-center rounded-full bg-neutral-200 p-3'>
            <img src={icons.actions.add} alt={''} />
          </span>
          <span className='hidden md:inline'>New Invoice</span>
          <span className='md:hidden'>New</span>
        </button>
      </header>

      <ul aria-label='List of Invoices' className='mt-20 flex flex-col gap-6'>
        {hasValues(data) ? (
          data.map((invoice) => (
            <li
              key={invoice?.id}
              className='rounded-brand bg-neutral-100 p-10 shadow-100 dark:bg-brand-700 max-sx:pt-4'
            >
              <Link
                to={`/invoices/${invoice.id}`}
                className='grid grid-cols-2 grid-rows-3 items-end sx:flex sx:items-center sx:gap-8'
              >
                <Text variant='p' className='body-100 font-bold'>
                  <span className='text-brand-400'>#</span>
                  <span className='uppercase text-brand-900 dark:text-neutral-100'>
                    {invoice?.id}
                    {/* {invoice?.tag} */}
                  </span>
                </Text>

                <Text
                  variant='p'
                  className='body-100 flex-1 font-medium text-brand-400 dark:text-brand-100'
                >
                  <span>Due&nbsp;</span>
                  <time>{Calendar.formatDate(invoice?.paymentDue)}</time>
                </Text>

                <Text
                  variant='p'
                  className='body-100 col-start-2 col-end-3 row-start-1 flex-1 justify-self-end font-medium text-[#858BB2] dark:text-neutral-100 sx:justify-self-auto'
                >
                  {invoice?.clientName}
                </Text>

                <Text
                  variant='p'
                  className='row-start-3 row-end-4 flex-1 text-600 font-bold leading-500 tracking-400 text-brand-900 dark:text-neutral-100 sx:text-right'
                >
                  <output>{formatPrice(invoice?.total)}</output>
                </Text>

                <StatusButton
                  status={invoice?.status}
                  className='col-start-2 col-end-3 row-start-3 row-end-4 h-16 w-[11rem] flex-1 justify-self-end sx:justify-self-auto'
                />

                <Text
                  variant='p'
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
                <Text variant='h2'>There is nothing here</Text>

                <Text variant='p' className='max-w-[22rem]'>
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
