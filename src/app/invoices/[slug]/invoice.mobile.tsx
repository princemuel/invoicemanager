import { Button, Container, StatusButton, Text } from '@/components';
import { calculateTotal, cn, formatAmount, hasValues } from '@/helpers';
import invoices from '../../../public/data.local.json';
import { randomUUID } from 'crypto';

interface Props {
  className?: string;
}
const invoice = invoices[1];

export function InvoiceTemplateMobile({ className }: Props) {
  return (
    <>
      <section className={cn('', className)}>
        <header>
          <Container>
            <div className='flex items-center justify-between rounded-lg bg-white px-6 py-5 shadow-100 dark:bg-brand-700'>
              <Text as='p' variant='accent'>
                Status
              </Text>

              {/* @ts-expect-error */}
              <StatusButton status={invoice?.status} />
            </div>
          </Container>
        </header>

        <article className='pb-14'>
          <Container>
            <div className='flex flex-col gap-12 rounded-lg bg-white px-6 py-8 shadow-100 dark:bg-brand-700'>
              <div className='flex flex-col justify-between gap-7 xs:flex-row'>
                <div className='> * + * space-y-3'>
                  <Text as='p' weight='bold' className='uppercase'>
                    <span className='text-brand-400'>#</span>
                    <span>{invoice.id}</span>
                  </Text>

                  <Text as='h1' id='heading-mobile' variant='primary'>
                    {invoice.description}
                  </Text>
                </div>

                <address>
                  <Text as='p' variant='primary' size='xs'>
                    {invoice?.senderAddress?.street}
                  </Text>
                  <Text as='p' variant='primary' size='xs'>
                    {invoice?.senderAddress?.city}
                  </Text>
                  <Text as='p' variant='primary' size='xs'>
                    {invoice?.senderAddress?.postCode}
                  </Text>
                  <Text as='p' variant='primary' size='xs'>
                    {invoice?.senderAddress?.country}
                  </Text>
                </address>
              </div>

              <div className='flex justify-between gap-x-14 gap-y-10 max-md:flex-wrap'>
                <div className='flex flex-initial flex-col gap-7'>
                  <div className='> * + * space-y-3'>
                    <Text as='p' variant='primary'>
                      Invoice Date
                    </Text>

                    <Text
                      as='time'
                      dateTime={new Date(invoice?.createdAt).toISOString()}
                      size='sm'
                      className='inline-block'
                    >
                      {/* {DateTime.toDateString(invoice?.createdAt)} */}
                    </Text>
                  </div>

                  <div className='> * + * space-y-3'>
                    <Text as='p' variant='primary'>
                      Payment Due
                    </Text>

                    <Text
                      as='time'
                      dateTime={new Date(invoice?.paymentDue).toISOString()}
                      size='sm'
                      className='inline-block'
                    >
                      {/* {DateTime.toDateString(invoice?.paymentDue)} */}
                    </Text>
                  </div>
                </div>

                <div className='mr-auto flex flex-initial flex-col gap-5'>
                  <div className='> * + * space-y-3'>
                    <Text as='p' variant='primary'>
                      Bill To
                    </Text>
                    <Text size='sm' className='truncate'>
                      {invoice?.clientName}
                    </Text>
                  </div>

                  <address>
                    <Text as='p' variant='primary' size='xs'>
                      {invoice?.clientAddress?.street}
                    </Text>
                    <Text as='p' variant='primary' size='xs'>
                      {invoice?.clientAddress?.city}
                    </Text>
                    <Text as='p' variant='primary' size='xs'>
                      {invoice?.clientAddress?.postCode}
                    </Text>
                    <Text as='p' variant='primary' size='xs'>
                      {invoice?.clientAddress?.country}
                    </Text>
                  </address>
                </div>

                <div className='> * + * flex-1 space-y-3'>
                  <Text as='p' variant='primary'>
                    Sent to
                  </Text>
                  <Text size='sm' className='truncate'>
                    {invoice?.clientEmail}
                  </Text>
                </div>
              </div>

              <section className='overflow-clip rounded-lg bg-neutral-200 dark:bg-brand-600'>
                <ul className='flex flex-col gap-6 p-6 '>
                  {/* {hasValues([]) ? ( */}
                  {hasValues(invoice?.items || []) ? (
                    invoice.items.map((item) => (
                      <li key={item?.name + randomUUID()}>
                        <article className='flex flex-col gap-2'>
                          <header className='flex items-center justify-between'>
                            <Text as='h4' weight='bold'>
                              {item?.name}
                            </Text>

                            <Text as='output' weight='bold'>
                              {formatAmount(item?.total)}
                            </Text>
                          </header>

                          <div className=''>
                            <Text as='p' variant='secondary' weight='bold'>
                              {item?.quantity} x {formatAmount(item?.price)}
                            </Text>
                          </div>
                        </article>
                      </li>
                    ))
                  ) : (
                    <li></li>
                  )}
                </ul>

                <footer className='flex items-center justify-between bg-accent-300 p-6 dark:bg-brand-900'>
                  <Text as='h4'>Grand Total</Text>

                  <Text
                    as='output'
                    modifier='inverted'
                    weight='bold'
                    className='text-xl leading-8 -tracking-[0.42px]'
                  >
                    {formatAmount(calculateTotal(invoice.items, 'total'))}
                  </Text>
                </footer>
              </section>
            </div>
          </Container>
        </article>

        <div className='sticky bottom-0 w-full bg-white p-6 shadow-100 dark:bg-brand-700'>
          <div className='flex items-center justify-between gap-2'>
            <Button variant='soft'>Edit</Button>
            <Button variant='destructive'>Delete</Button>
            <Button variant='primary'>Mark as Paid</Button>
          </div>
        </div>
      </section>
    </>
  );
}
