import { icons } from 'common';
import { StatusButton, Text } from 'components/atoms';
import { InvoiceTable } from 'components/molecules';
import { useInvoices } from 'context';
import { formatDate } from 'helpers';
import Link from 'next/link';
import { Invoice } from 'types';

type Props = {};

const InvoiceTemplate = (props: Props) => {
  const data = useInvoices() as Invoice;

  return (
    <section aria-labelledby='invoice-heading' className='h-container'>
      <Link href='/'>
        <a className='body-100 mt-20 flex items-center gap-8 font-bold'>
          <span>
            <icons.arrow.left />
          </span>
          <span>Go back</span>
        </a>
      </Link>

      <div className='mt-10 grid gap-12'>
        <header className='rounded-default bg-neutral-100 py-12 px-10 shadow-default dark:bg-primary-700'>
          <div className='flex items-center justify-between gap-8'>
            <Text className='body-100 text-[#858BB2] dark:text-primary-100'>
              Status
            </Text>
            <StatusButton status={data?.status} className='px-14 py-6' />
          </div>
        </header>

        <div className='rounded-default bg-neutral-100 p-16 shadow-default dark:bg-primary-700'>
          <Text className='body-100 font-bold'>
            <span className='text-primary-400'>#</span>
            <span className='text-primary-900 dark:text-neutral-100'>
              {data?.id}
            </span>
          </Text>
          <Text className='body-100 text-primary-400 dark:text-primary-100 '>
            {data?.description}
          </Text>

          <Text className='body-200 mt-10 text-primary-400 dark:text-primary-100 '>
            {data?.senderAddress?.street}
          </Text>
          <Text className='body-200 text-primary-400 dark:text-primary-100 '>
            {data?.senderAddress?.city}
          </Text>
          <Text className='body-200 text-primary-400 dark:text-primary-100 '>
            {data?.senderAddress?.postCode}
          </Text>
          <Text className='body-200 text-primary-400 dark:text-primary-100'>
            {data?.senderAddress?.country}
          </Text>

          <Text className='body-100 mt-10 text-primary-400 dark:text-primary-100'>
            Invoice Date
          </Text>
          <Text className='body-300'>{formatDate(data?.createdAt)}</Text>

          <Text className='body-100 mt-10 text-primary-400 dark:text-primary-100'>
            Payment Due
          </Text>
          <Text className='body-300'>{formatDate(data?.paymentDue)}</Text>

          <Text className='body-100 mt-10 text-primary-400 dark:text-primary-100'>
            Bill To
          </Text>
          <Text className='body-300'>{data?.clientName}</Text>
          <Text className='body-100 text-primary-400 dark:text-primary-100'>
            {data?.clientAddress?.street}
          </Text>
          <Text className='body-100 text-primary-400 dark:text-primary-100'>
            {data?.clientAddress?.city}
          </Text>
          <Text className='body-100 text-primary-400 dark:text-primary-100'>
            {data?.clientAddress?.postCode}
          </Text>
          <Text className='body-100 text-primary-400 dark:text-primary-100'>
            {data?.clientAddress?.country}
          </Text>

          <Text className='body-100 mt-10 text-primary-400 dark:text-primary-100 '>
            Sent To
          </Text>
          <Text className='body-300'>{data?.clientEmail}</Text>

          <InvoiceTable data={data} />
        </div>
      </div>
    </section>
  );
};

export { InvoiceTemplate };
