import { formatPrice, hasValues } from "helpers";
import { Fragment } from "react";
import type { Invoice } from "types";

type Props = {
  data: Invoice;
};

const InvoiceTable = ({ data }: Props) => {
  const items = data?.items;

  return (
    <Fragment>
      <table className='grid auto-cols-min grid-cols-1 gap-8 overflow-hidden rounded-default px-10 pt-10 shadow-default dark:bg-brand-600'>
        <thead className='text-brand-400 dark:text-brand-100'>
          <tr className='grid grid-cols-4 justify-items-end'>
            <th className='justify-self-start'>Item Name</th>
            <th className=''>QTY.</th>
            <th className=''>Price</th>
            <th className=''>Total</th>
          </tr>
        </thead>

        <tbody className='flex flex-col gap-12 py-4'>
          {hasValues(items) ? (
            items.map((item) => {
              return (
                <tr
                  key={item?.name}
                  className='body-100 grid grid-cols-4 justify-items-end gap-4 font-bold'
                >
                  <td className='justify-self-start text-brand-900 dark:text-neutral-100'>
                    {item?.name}
                  </td>
                  <td className='text-brand-400 dark:text-neutral-100'>
                    {item?.quantity}
                  </td>
                  <td className='text-brand-400 dark:text-neutral-100'>
                    {formatPrice(item?.price)}
                  </td>
                  <td className='text-brand-900 dark:text-neutral-100'>
                    {formatPrice(item?.total)}
                  </td>
                </tr>
              );
            })
          ) : (
            <td>Hello</td>
          )}
        </tbody>

        <tfoot className='w-full-shadow bg-[#373B53] py-10 text-brand-900 dark:bg-brand-900'>
          <tr className='flex items-center justify-between text-neutral-100'>
            <th className='body-200 font-bold'>Amount Due</th>
            <td className='text-700 font-bold leading-[3.2rem] tracking-[-0.63px] '>
              {formatPrice(data?.total)}
            </td>
          </tr>
        </tfoot>
      </table>
    </Fragment>
  );
};

export { InvoiceTable };

// {hasValues(items) ? (
//           items.map((item) => (
//

//               <Text className='body-100 font-bold text-brand-400  dark:text-brand-300'>
//                 <span>{item?.quantity}</span>
//                 <span>&nbsp;x&nbsp;</span>
//                 <span>{formatPrice(item?.price)}</span>
//               </Text>
//               <Text className='body-100 font-bold'>
//                 {formatPrice(item?.total)}
//               </Text>
//             </div>
//           ))
//         ) : (
//           <Text className='body-100 text-brand-100 '>No items</Text>
//         )}

//         <Text className='body-200 bg-[#373B53]  text-neutral-100 dark:bg-brand-900'>
//           Amount Due
//         </Text>
//         <Text className='bg-[#373B53]  text-700 font-bold leading-[3.2rem] tracking-[-0.63px] text-neutral-100  dark:bg-brand-900'>
//           {formatPrice(data?.total)}
//         </Text>
