import { data, icons, Link } from 'common';
import { StatusButton, Text } from 'components/atoms';
import { formatPrice } from 'helpers';

type Props = {};

const HomeTemplate = (props: Props) => {
  // console.log(data);
  return (
    <section aria-labelledby='invoices-heading' className='h-container'>
      <header className='mt-20 flex items-center '>
        <div className='flex-1'>
          <h1 id='invoices-heading'>Invoices</h1>

          {(data || []).length > 0 ? (
            <Text>
              <span className='hidden md:inline'>
                There are <output name='invoices'>{data?.length}</output> total
                invoices
              </span>

              <span className='md:hidden'>
                <output name='invoices'>{data?.length}</output>
                &nbsp;Invoices
              </span>
            </Text>
          ) : (
            <p>No Invoices</p>
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
            <icons.actions.add />
          </span>
          <span className='hidden md:inline'>New Invoice</span>
          <span className='md:hidden'>New</span>
        </button>
      </header>

      <ul aria-label='List of Invoices' className='mt-20 flex flex-col gap-6'>
        {(data || []).length > 0 ? (
          data?.map((invoice) => (
            <li
              key={invoice?.id}
              className='rounded-lg bg-neutral-100 p-7 shadow-md dark:bg-primary-700'
            >
              <Link href='/' passHref>
                <a className='flex items-center gap-6 '>
                  <Text className='body-100 flex-1 font-bold'>
                    <span className='text-primary-400'>#</span>
                    <span className='text-primary-900 dark:text-neutral-100'>
                      {invoice?.id}
                    </span>
                  </Text>

                  <Text className='body-100 flex-1 font-medium  text-primary-400'>
                    <span>Due </span>
                    <time>{invoice?.paymentDue}</time>
                  </Text>

                  <Text className='body-100 flex-1 font-medium text-[#858BB2] dark:text-neutral-100'>
                    {invoice?.clientName}
                  </Text>

                  <Text className='flex-1 text-600 font-bold leading-500 tracking-400 text-primary-900 dark:text-neutral-100'>
                    <output>{formatPrice(invoice?.total)}</output>
                  </Text>

                  <StatusButton status={invoice?.status} className='flex-1' />

                  <Text>
                    <icons.arrow.right />
                  </Text>
                </a>
              </Link>
            </li>
          ))
        ) : (
          <Text>No Invoices to show</Text>
        )}
      </ul>
    </section>
  );
};

export { HomeTemplate };
