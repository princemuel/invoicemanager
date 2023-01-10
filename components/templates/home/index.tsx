import { icons, Link } from "common";
import { StatusButton, Text } from "components/atoms";
import { useInvoices } from "context";
import { formatDate, formatPrice, isNotEmptyArray } from "helpers";
import { Invoice } from "types";

type Props = {};

const HomeTemplate = (props: Props) => {
  const data = useInvoices() as Invoice[];

  return (
    <section aria-labelledby='invoices-heading' className='h-container'>
      <header className='mt-20 flex items-center '>
        <div className='flex-1'>
          <h1 id='invoices-heading'>Invoices</h1>

          {isNotEmptyArray(data) ? (
            <Text>
              <span className='hidden md:inline'>
                There are <output name='invoices'>{data.length}</output> total
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
        {isNotEmptyArray(data) ? (
          data.map((invoice) => (
            <li
              key={invoice?.id}
              className='rounded-default bg-neutral-100 py-7 px-8 shadow-default dark:bg-brand-700'
            >
              <Link href={`/invoices/${invoice.id}`} passHref>
                <a className='grid grid-cols-2 grid-rows-4 sm:flex sm:items-center sm:gap-8'>
                  <Text className='body-100 col-start-1 col-end-2 row-start-1 row-end-1 font-bold'>
                    <span className='text-brand-400'>#</span>
                    <span className='text-brand-900 dark:text-neutral-100'>
                      {invoice?.id}
                    </span>
                  </Text>

                  <Text className='body-100 self-end font-medium text-brand-400 sm:flex-1 sm:self-center'>
                    <span>Due </span>
                    <time>{formatDate(invoice?.paymentDue!)}</time>
                  </Text>

                  <Text className='body-100 col-start-2 col-end-3 row-start-1 row-end-1 justify-self-end font-medium text-[#858BB2] dark:text-neutral-100 sm:flex-1'>
                    {invoice?.clientName}
                  </Text>

                  <Text className='col-start-1 col-end-2 row-start-4 row-end-4 text-600 font-bold leading-500 tracking-400 text-brand-900 dark:text-neutral-100 sm:flex-1 sm:text-right'>
                    <output>{formatPrice(invoice?.total!)}</output>
                  </Text>

                  <StatusButton
                    status={invoice?.status}
                    className='col-start-2 col-end-3  row-start-3 row-end-5 px-4 py-6 sm:flex-1'
                  />
                  <Text className='hidden sx:block'>
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
