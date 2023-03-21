import { icons, Image, Link } from "common";
import { StatusButton, Text } from "components/atoms";
import { useInvoices } from "context";
import { formatDate, formatPrice, hasValues } from "helpers";

type Props = {};

const HomeTemplate = (props: Props) => {
  const data = useInvoices();

  return (
    <section aria-labelledby='invoices-heading' className='h-container'>
      <header className='mt-20 flex items-center'>
        <div className='flex-1'>
          <h1 id='invoices-heading'>Invoices</h1>

          {hasValues(data) ? (
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
        {hasValues(data) ? (
          data.map((invoice) => (
            <li
              key={invoice?.id}
              className='rounded-brand bg-neutral-100 py-7 px-8 shadow-100 dark:bg-brand-700'
            >
              <Link href={`/invoices/${invoice.id}`} passHref>
                <a className='flex items-center justify-between '>
                  <Text className='body-100 font-bold'>
                    <span className='text-brand-400'>#</span>
                    <span className='uppercase text-brand-900 dark:text-neutral-100'>
                      {invoice?.id}
                      {/* {invoice?.tag} */}
                    </span>
                  </Text>

                  <Text className='body-100 font-medium text-brand-400'>
                    <span>Due&nbsp;</span>
                    <time>{formatDate(invoice?.paymentDue)}</time>
                  </Text>

                  <Text className='body-100 font-medium text-[#858BB2] dark:text-neutral-100'>
                    {invoice?.clientName}
                  </Text>

                  <Text className='text-600 font-bold leading-500 tracking-400 text-brand-900 dark:text-neutral-100'>
                    <output>{formatPrice(invoice?.total)}</output>
                  </Text>

                  <StatusButton
                    status={invoice?.status}
                    className='h-16 w-[11rem]'
                  />

                  <Text className='hidden sx:block'>
                    <icons.arrow.right />
                  </Text>
                </a>
              </Link>
            </li>
          ))
        ) : (
          <div className='flex min-h-full items-center justify-center'>
            <article className='flex flex-col items-center gap-20 text-center'>
              <Image
                src={"/assets/svgs/illustration-empty.svg"}
                width='242'
                height='200'
                className='w-full'
                alt={"Invoices List Empty"}
                priority={true}
              />

              <div className='flex  flex-col items-center gap-8 px-16'>
                <h2>There is nothing here</h2>

                <Text as='p' className='max-w-[22rem]'>
                  Create an invoice by clicking the{" "}
                  <Text as='em' className='font-bold'>
                    New Invoice
                  </Text>{" "}
                  button and get started
                </Text>
              </div>
            </article>
          </div>
        )}
      </ul>
    </section>
  );
};

export { HomeTemplate };
