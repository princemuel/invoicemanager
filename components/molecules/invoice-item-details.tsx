import { calculateTotal, formatPrice } from '@/lib';
import { cx } from 'cva';
import * as React from 'react';
import { Text } from '../atoms';

interface Props {
  items?: InvoiceItemType[];
  className?: string;
}

const InvoiceItemDetails = ({ items = [], className = '' }: Props) => {
  return (
    <React.Fragment>
      <section
        className={cx(
          'flex flex-col gap-10 overflow-clip rounded-brand bg-neutral-300 dark:bg-brand-600 md:hidden',
          className
        )}
      >
        {items?.map((item) => {
          return (
            <article key={item?.id} className='px-10 first:pt-10'>
              <header className='flex items-center justify-between'>
                <Text as='h4' className='font-bold'>
                  {item?.name}
                </Text>

                <Text as='output' className='body-100 font-bold '>
                  {formatPrice(item?.total)}
                </Text>
              </header>

              <Text
                as='p'
                className='body-100 mt-3 font-bold text-brand-400 dark:text-brand-300'
              >
                {item?.quantity} x {formatPrice(item?.price)}
              </Text>
            </article>
          );
        })}

        <footer className='flex items-center justify-between bg-[#373B53] p-10 dark:bg-brand-900'>
          <Text as='h4' className='text-neutral-100'>
            Grand Total
          </Text>

          <Text
            as='output'
            className='text-700 font-bold leading-600 tracking-[-0.42px] text-neutral-100'
          >
            {formatPrice(calculateTotal(items, 'total'))}
          </Text>
        </footer>
      </section>

      <table
        className={cx(
          'hidden overflow-clip rounded-brand dark:bg-brand-600 md:grid md:auto-cols-min md:grid-cols-1 md:gap-8 md:pt-10 md:shadow-100',
          className
        )}
      >
        <thead className='px-14'>
          <tr className='grid grid-cols-4 justify-items-end text-brand-400 dark:text-brand-100'>
            <th className='body-200 justify-self-start'>Item Name</th>
            <th className='body-200 '>QTY.</th>
            <th className='body-200 '>Price</th>
            <th className='body-200 '>Total</th>
          </tr>
        </thead>

        <tbody className='flex flex-col gap-10 px-14 py-4'>
          {items?.map((item) => {
            return (
              <tr
                key={item.id}
                className='grid grid-cols-4 justify-items-end gap-4'
              >
                <td className='body-100 justify-self-start font-bold text-brand-900 dark:text-neutral-100'>
                  {item?.name}
                </td>
                <td className='body-100 font-bold text-brand-400 dark:text-neutral-100'>
                  {item?.quantity}
                </td>
                <td className='body-100 font-bold text-brand-400 dark:text-neutral-100'>
                  {formatPrice(item?.price)}
                </td>
                <td className='body-100 font-bold text-brand-900 dark:text-neutral-100'>
                  {formatPrice(item?.total)}
                </td>
              </tr>
            );
          })}
        </tbody>

        <tfoot className='w-full-shadow bg-[#373B53] px-14 py-10 text-brand-900 dark:bg-brand-900'>
          <tr className='flex items-center justify-between '>
            <th className='body-200 text-neutral-100'>Amount Due</th>
            <td className='text-700 font-bold leading-[3.2rem] tracking-[-0.63px] text-neutral-100 '>
              {formatPrice(calculateTotal(items, 'total'))}
            </td>
          </tr>
        </tfoot>
      </table>
    </React.Fragment>
  );
};

export { InvoiceItemDetails };
