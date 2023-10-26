import { Button, Container, StatusButton, Text } from '@/components';
import { calculateTotal, cn, formatAmount, hasValues } from '@/helpers';
import invoices from '@/public/data.local.json';
import { randomUUID } from 'crypto';

interface Props {
  className?: string;
}
const invoice = invoices[1];

export function InvoiceTemplateDesktop({ className }: Props) {
  return (
    <>
      <section className={cn('', className)}>
        <header>
          <Container>
            <div className='flex items-center gap-5 rounded-lg bg-white px-8 py-5 shadow-100 dark:bg-brand-700'>
              <Text as='p' variant='accent'>
                Status
              </Text>
              {/* @ts-expect-error */}
              <StatusButton status={invoice?.status} />

              <div className='ml-auto flex items-center justify-between gap-2'>
                <Button variant='soft'>Edit</Button>
                <Button variant='destructive'>Delete</Button>
                <Button variant='primary'>Mark as Paid</Button>
              </div>
            </div>
          </Container>
        </header>

        <article className='pb-20'>
          <Container>
            <div className='flex flex-col gap-12 rounded-lg bg-white px-8 py-8 shadow-100 dark:bg-brand-700'>
              <div className='flex justify-between gap-7'>
                <div className='> * + * space-y-3'>
                  <Text as='p' weight='bold' className='text-base uppercase'>
                    <span className='text-brand-400'>#</span>
                    <span>{invoice.id}</span>
                  </Text>

                  <Text as='h1' id='heading-desktop' variant='primary'>
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

              {/* gap-x-14 */}
              <div className='flex justify-between gap-x-[clamp(3rem,10vw,5rem)] gap-y-10 max-md:flex-wrap'>
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
              <table className='grid grid-cols-1 overflow-clip rounded-lg bg-neutral-200 dark:bg-brand-600'>
                <caption className='sr-only'>
                  Items and Services Purchased
                </caption>

                <thead className='px-8 py-5'>
                  <tr className='grid grid-cols-4 justify-items-end'>
                    <Text
                      as='th'
                      variant='primary'
                      size='xs'
                      className='justify-self-start'
                    >
                      Item Name
                    </Text>
                    <Text as='th' variant='primary' size='xs' className=''>
                      QTY.
                    </Text>
                    <Text as='th' variant='primary' size='xs' className=''>
                      Price
                    </Text>
                    <Text as='th' variant='primary' size='xs' className=''>
                      Total
                    </Text>
                  </tr>
                </thead>

                <tbody className='flex flex-col gap-8 px-8 py-5'>
                  {/* {hasValues([]) ? ( */}
                  {hasValues(invoice?.items || []) ? (
                    invoice.items.map((item) => (
                      <tr
                        key={item?.name + randomUUID()}
                        className='grid grid-cols-4 justify-items-end gap-2'
                      >
                        <Text
                          as='td'
                          weight='bold'
                          className='justify-self-start'
                        >
                          {item?.name}
                        </Text>

                        <Text as='td' weight='bold'>
                          {item?.quantity}
                        </Text>

                        <Text as='td' variant='secondary' weight='bold'>
                          {formatAmount(item?.price)}
                        </Text>
                        <Text as='td' variant='secondary' weight='bold'>
                          {formatAmount(item?.total)}
                        </Text>
                      </tr>
                    ))
                  ) : (
                    <tr className='grid grid-cols-4 justify-items-end gap-2'>
                      <Text as='td' weight='bold'>
                        No items to show
                      </Text>
                    </tr>
                  )}
                </tbody>

                <tfoot className='bg-accent-300 px-8 py-5 dark:bg-brand-900'>
                  <tr className='flex items-center justify-between'>
                    <Text as='th'>Amount Due</Text>
                    <Text
                      as='td'
                      modifier='inverted'
                      weight='bold'
                      className='text-2xl leading-8 -tracking-[0.5px]'
                    >
                      {formatAmount(calculateTotal(invoice.items, 'total'))}
                    </Text>
                  </tr>
                </tfoot>
              </table>
            </div>
          </Container>
        </article>
      </section>
    </>
  );
}
