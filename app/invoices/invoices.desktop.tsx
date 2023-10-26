import { icons } from '@/common';
import { Button, Container, NextImage, StatusButton, Text } from '@/components';
import { buildInvoiceMsg, cn, formatAmount, hasValues } from '@/helpers';
import invoices from '@/public/data.local.json';
import NextLink from 'next/link';

interface Props {
  className?: string;
}
const generateMessage = buildInvoiceMsg(
  'There {{ verb }} {{ count }} total invoice(s)'
);

export function InvoicesTemplateDesktop({ className }: Props) {
  return (
    <>
      <div className={cn('', className)}>
        <header className=''>
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
                  {generateMessage([1])}
                </Text>
              </div>

              <div className='flex items-center gap-6'>
                <Text>HI</Text>

                <Button variant='primary' asChild>
                  <NextLink href='/invoices/new'>
                    <span className='grid aspect-square place-content-center rounded-full bg-white p-2'>
                      <icons.actions.add />
                    </span>
                    <span>New Invoice</span>
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
                    //ease-&lsqb;cubic-bezier(0.25,0.1,0.25,1.0)&rsqb
                    className='rounded-lg bg-white p-4 shadow-100 transition-colors duration-300 ease-in hover:border hover:border-brand-500 focus:border focus:border-brand-500 dark:bg-brand-700'
                  >
                    <NextLink
                      href={`/invoices/${invoice?.id}`}
                      className='grid grid-flow-col-dense items-center justify-items-end gap-1'
                    >
                      <Text
                        as='p'
                        weight='bold'
                        className='justify-self-start uppercase'
                      >
                        <span className='text-brand-400'>#</span>
                        <span>{invoice?.id}</span>
                      </Text>

                      <Text
                        as='p'
                        variant='primary'
                        aria-live='polite'
                        className='justify-self-start'
                      >
                        <span>Due</span>{' '}
                        <time
                          dateTime={new Date(invoice?.paymentDue).toISOString()}
                        >
                          {/* {DateTime.toDateString(invoice?.paymentDue)} */}
                        </time>
                      </Text>

                      <Text as='p' variant='accent' className=''>
                        {invoice?.clientName}
                      </Text>

                      <Text as='p' size='md' weight='bold' className=''>
                        {formatAmount(invoice?.total)}
                      </Text>

                      <StatusButton
                        // @ts-expect-error
                        status={invoice.status}
                        // className='w-full justify-self-start'
                      />

                      <div className=''>
                        <icons.chevron.right />
                      </div>
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
                    />

                    <div className='flex flex-col items-center gap-5 px-10'>
                      <h2>There is nothing here</h2>

                      <p className='max-w-[22rem]'>
                        Create an invoice by clicking the{' '}
                        <em className='font-bold'>New Invoice</em> button and
                        get started
                      </p>
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
