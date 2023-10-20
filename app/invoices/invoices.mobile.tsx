import { icons } from '@/common';
import { Button, Container, NextImage, StatusButton, Text } from '@/components';
import {
  buildInvoiceMsg,
  cn,
  datetime,
  formatAmount,
  hasValues,
} from '@/helpers';
import invoices from '@/public/data.local.json';
import NextLink from 'next/link';

interface Props {
  className?: string;
}

const generateMessage = buildInvoiceMsg('{{ count }} invoice(s)');

export function InvoicesTemplateMobile({ className }: Props) {
  return (
    <>
      <div className={cn('', className)}>
        <header>
          <Container.Outer>
            <Container.Inner className='flex items-center'>
              <div className='flex-1'>
                <Text as='h1' id='heading' size='xl'>
                  Invoices
                </Text>

                {/* <Text as='p' aria-live='polite' variant='secondary'>
                  {generateMessage([])}
                </Text> */}
                <Text as='p' aria-live='polite' variant='secondary'>
                  {generateMessage(invoices)}
                </Text>
              </div>

              <div className='flex items-center gap-6'>
                <Text>HI</Text>

                <Button variant='primary' className='px-2 ' asChild>
                  <NextLink href='/invoices/new'>
                    <span className='grid aspect-square place-content-center rounded-full bg-white p-2'>
                      <icons.actions.add />
                    </span>
                    <span>New</span>
                  </NextLink>
                </Button>
              </div>
            </Container.Inner>
          </Container.Outer>
        </header>

        <section aria-label='Invoice List' className=''>
          <Container>
            <ul className='flex flex-col gap-6'>
              {hasValues([1]) ? (
                invoices.map((invoice) => (
                  <li
                    key={invoice.id}
                    className='rounded-lg bg-white px-6 py-8 shadow-100 transition-colors duration-300 ease-in hover:border hover:border-brand-500 focus:border focus:border-brand-500 dark:bg-brand-700'
                  >
                    <NextLink
                      href={`/invoices/${invoice?.id}`}
                      className='grid grid-cols-2 grid-rows-3'
                    >
                      <Text as='p' weight='bold' className='uppercase'>
                        <span className='text-brand-400'>#</span>
                        <span>{invoice?.id}</span>
                      </Text>

                      <Text
                        as='p'
                        variant='primary'
                        aria-live='polite'
                        className='self-center'
                      >
                        <span>Due</span>{' '}
                        <time
                          dateTime={new Date(invoice?.paymentDue).toISOString()}
                        >
                          {datetime.toDateString(invoice?.paymentDue)}
                        </time>
                      </Text>

                      <Text
                        as='p'
                        variant='accent'
                        className='col-start-2 col-end-3 row-start-1 justify-self-end'
                      >
                        {invoice?.clientName}
                      </Text>

                      <Text
                        as='p'
                        size='md'
                        weight='bold'
                        className='row-start-3 row-end-4 self-end'
                      >
                        {formatAmount(invoice?.total)}
                      </Text>

                      <StatusButton
                        // @ts-expect-error
                        status={invoice.status}
                        className='col-start-2 col-end-3 row-start-3 row-end-4 justify-self-end '
                      />
                    </NextLink>
                  </li>
                ))
              ) : (
                <li className='flex min-h-full items-center justify-center'>
                  <article className='flex flex-col items-center gap-20 text-center'>
                    <NextImage
                      src={'/illustration-empty.svg'}
                      width='242'
                      height='200'
                      className='w-full'
                      alt={'Invoices List Empty'}
                      placeholder='empty'
                    />

                    <div className='flex flex-col items-center gap-5 px-10'>
                      <Text as='h2' size='lg'>
                        There is nothing here
                      </Text>

                      <Text
                        as='p'
                        variant='secondary'
                        className='max-w-[22rem]'
                      >
                        Create an invoice by clicking the{' '}
                        <em className='font-bold'>New Invoice</em> button and
                        get started
                      </Text>
                    </div>
                  </article>
                </li>
              )}
            </ul>
          </Container>
        </section>
      </div>
    </>
  );
}
