import { icons } from 'common';
import { StatusButton, Text } from 'components/atoms';
import { formatDate, formatPrice, isNotEmptyArray } from 'helpers';
import Link from 'next/link';
import { Invoice } from 'types';

type Props = { data: Invoice };

const InvoiceTemplate = ({ data }: Props) => {
  const items = data?.items;

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
            <Text className='body-100'>Status</Text>
            <StatusButton status={data?.status} className='px-14 py-6' />
          </div>
        </header>

        <div className='rounded-default bg-neutral-100 py-12 px-10 shadow-default dark:bg-primary-700'>
          <Text className='body-100 font-bold'>
            <span className='text-primary-400'>#</span>
            <span className='text-primary-900 dark:text-neutral-100'>
              {data?.id}
            </span>
          </Text>
          <Text className='body-100 text-primary-100 '>
            {data?.description}
          </Text>

          <Text className='body-200 mt-10 text-primary-100 '>
            {data?.senderAddress?.street}
          </Text>
          <Text className='body-200 text-primary-100 '>
            {data?.senderAddress?.city}
          </Text>
          <Text className='body-200 text-primary-100 '>
            {data?.senderAddress?.postCode}
          </Text>
          <Text className='body-200 text-primary-100 '>
            {data?.senderAddress?.country}
          </Text>

          <Text className='body-100 mt-10 text-primary-100'>Invoice Date</Text>
          <Text className='body-300'>{formatDate(data?.createdAt)}</Text>

          <Text className='body-100 mt-10 text-primary-100'>Payment Due</Text>
          <Text className='body-300'>{formatDate(data?.paymentDue)}</Text>

          <Text className='body-100 text-primary-100 '>
            {data?.paymentTerms}
          </Text>

          <Text className='body-100 mt-10 text-primary-100'>Bill To</Text>
          <Text className='body-300'>{data?.clientName}</Text>
          <Text className='body-100 text-primary-100 '>
            {data?.clientAddress?.street}
          </Text>
          <Text className='body-100 text-primary-100 '>
            {data?.clientAddress?.city}
          </Text>
          <Text className='body-100 text-primary-100 '>
            {data?.clientAddress?.postCode}
          </Text>
          <Text className='body-100 text-primary-100 '>
            {data?.clientAddress?.country}
          </Text>

          <Text className='body-100 mt-10 text-primary-100 '>Sent To</Text>
          <Text className='body-300'>{data?.clientEmail}</Text>

          {isNotEmptyArray(items) ? (
            items.map((item) => (
              <div key={item?.name}>
                <Text className='body-100 font-bold'>{item?.name}</Text>

                <Text className='body-100 font-bold text-primary-300'>
                  <span>{item?.quantity}</span>
                  <span>&nbsp;x&nbsp;</span>
                  <span>{formatPrice(item?.price)}</span>
                </Text>
                <Text className='body-100 font-bold'>
                  {formatPrice(item?.total)}
                </Text>
              </div>
            ))
          ) : (
            <Text className='body-100 text-primary-100 '>No items</Text>
          )}

          <Text className='body-200'>Amount Due</Text>
          <Text className='text-700 font-bold leading-[3.2rem] tracking-[-0.63px]'>
            {formatPrice(data?.total)}
          </Text>
        </div>
      </div>
    </section>
  );
};

export { InvoiceTemplate };
