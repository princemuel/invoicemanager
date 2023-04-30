import { calculateTotal, formatPrice } from '@src/helpers';
import { useMedia } from '@src/hooks';
import clsx from 'clsx';
import * as React from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import { FormErrorText, FormLabel } from '../atoms';

interface Props {
  methods: UseFormReturn<InvoiceFormType, any>;
}

const NewItemList = ({ methods }: Props) => {
  const { fields, append, remove } = useFieldArray({
    name: 'items',
    control: methods.control,
    rules: {
      required: 'Please add at least one item',
    },
  });

  const dime = useFieldArray({
    name: 'items',
    control: methods.control,
    rules: {
      required: 'Please add at least one item',
    },
  });

  const isMobile = useMedia(`(max-width: 40em)`);

  React.useEffect(() => {}, []);

  return (
    <React.Fragment>
      {!isMobile ? (
        <ul className='mt-6 grid grid-cols-8 gap-x-6 gap-y-10 sx:grid-cols-12'>
          <li className='body-100 col-span-8 text-brand-400 dark:text-brand-100 sx:col-span-5'>
            Item Name
          </li>
          <li className='body-100 col-span-2 text-brand-400 dark:text-brand-100'>
            Qty.
          </li>
          <li className='body-100 col-span-3 text-brand-400 dark:text-brand-100 sx:col-span-2'>
            Price
          </li>
          <li className='body-100 col-span-2 text-brand-400 dark:text-brand-100'>
            Total
          </li>
        </ul>
      ) : (
        <React.Fragment />
      )}

      <ul className='mt-6 flex flex-col gap-8'>
        {fields.map((field, index) => {
          const errors = methods?.formState?.errors?.items?.[index];
          return (
            <li
              key={field.id}
              className='grid grid-cols-8 items-end gap-x-6 gap-y-10 sx:grid-cols-12'
            >
              {isMobile ? (
                <div className='col-span-8 flex flex-col-reverse gap-2'>
                  <input
                    type='text'
                    {...methods.register(`items.${index}.name`)}
                    id={`items.${index}.name`}
                    className='body-100 peer mt-4 w-full rounded-lg border border-brand-100 bg-neutral-100 px-8 py-6 font-bold text-brand-900 caret-brand-500 outline-none autofill:bg-neutral-100 focus:border-brand-500 aria-[invalid="true"]:!border-accent-200 aria-[invalid="true"]:!text-accent-200 focus:aria-[invalid="true"]:!border-accent-200 focus:aria-[invalid="true"]:!ring-accent-200 hover:border-brand-500 dark:border-brand-600 dark:bg-brand-700 dark:text-neutral-100 dark:autofill:bg-brand-700 dark:focus:border-brand-500 dark:hover:border-brand-500'
                    aria-invalid={errors?.name ? 'true' : 'false'}
                    aria-errormessage={`errors-items.${index}.name`}
                  />

                  <div className='flex items-center justify-between text-brand-400 peer-aria-[invalid="true"]:!text-accent-200 dark:text-brand-300'>
                    <FormLabel
                      htmlFor={`items.${index}.name`}
                      className={'block text-brand-400 dark:text-brand-300'}
                    >
                      Item Label
                    </FormLabel>
                    <FormErrorText
                      id={`items.${index}.name`}
                      className='text-right peer-aria-[invalid="true"]:!text-accent-200'
                    >
                      {`${errors?.name?.message || ''}`}
                    </FormErrorText>
                  </div>
                </div>
              ) : (
                <label className='col-span-8 flex flex-col-reverse gap-2 sx:col-span-5'>
                  <input
                    type='text'
                    {...methods.register(`items.${index}.name`)}
                    id={`items.${index}.name`}
                    className='body-100 peer w-full rounded-lg border border-brand-100 bg-neutral-100 px-8 py-6 font-bold text-brand-900 caret-brand-500 outline-none autofill:bg-neutral-100 focus:border-brand-500 aria-[invalid="true"]:!border-accent-200 aria-[invalid="true"]:!text-accent-200 focus:aria-[invalid="true"]:!border-accent-200 focus:aria-[invalid="true"]:!ring-accent-200 hover:border-brand-500 dark:border-brand-600 dark:bg-brand-700 dark:text-neutral-100 dark:autofill:bg-brand-700 dark:focus:border-brand-500 dark:hover:border-brand-500'
                    aria-invalid={errors?.name ? 'true' : 'false'}
                    aria-errormessage={`errors-items.${index}.name`}
                    placeholder='Banner Design'
                  />
                  <FormErrorText
                    id={`items.${index}.name`}
                    className='text-right peer-aria-[invalid="true"]:!text-accent-200'
                  >
                    {`${errors?.name?.message || ''}`}
                  </FormErrorText>
                </label>
              )}

              {isMobile ? (
                <div className='col-span-2'>
                  <FormLabel
                    htmlFor={`items.${index}.quantity`}
                    className={'block text-brand-400 dark:text-brand-300'}
                  >
                    Qty.
                  </FormLabel>

                  <input
                    type='number'
                    {...methods.register(`items.${index}.quantity`, {
                      valueAsNumber: true,
                    })}
                    id={`items.${index}.quantity`}
                    className={clsx(
                      'body-100 peer mt-4 w-full rounded-lg border border-brand-100 bg-neutral-100 px-8 py-6 font-bold text-brand-900 caret-brand-500 outline-none autofill:bg-neutral-100 focus:border-brand-500 aria-[invalid="true"]:!border-accent-200 aria-[invalid="true"]:!text-accent-200 focus:aria-[invalid="true"]:!border-accent-200 focus:aria-[invalid="true"]:!ring-accent-200 hover:border-brand-500 dark:border-brand-600 dark:bg-brand-700 dark:text-neutral-100 dark:autofill:bg-brand-700 dark:focus:border-brand-500 dark:hover:border-brand-500'
                    )}
                    aria-invalid={errors?.quantity ? 'true' : 'false'}
                    step={1}
                    placeholder='1'
                  />
                </div>
              ) : (
                <label className='col-span-2'>
                  <input
                    type='number'
                    {...methods.register(`items.${index}.quantity`, {
                      valueAsNumber: true,
                    })}
                    id={`items.${index}.quantity`}
                    className={clsx(
                      'body-100 peer w-full rounded-lg border border-brand-100 bg-neutral-100 px-8 py-6 font-bold text-brand-900 caret-brand-500 outline-none autofill:bg-neutral-100 focus:border-brand-500 aria-[invalid="true"]:!border-accent-200 aria-[invalid="true"]:!text-accent-200 focus:aria-[invalid="true"]:!border-accent-200 focus:aria-[invalid="true"]:!ring-accent-200 hover:border-brand-500 dark:border-brand-600 dark:bg-brand-700 dark:text-neutral-100 dark:autofill:bg-brand-700 dark:focus:border-brand-500 dark:hover:border-brand-500'
                    )}
                    aria-invalid={errors?.quantity ? 'true' : 'false'}
                    step={1}
                    placeholder='1'
                  />
                </label>
              )}
              {isMobile ? (
                <div className='col-span-3 sx:col-span-2'>
                  <FormLabel
                    htmlFor={`items.${index}.price`}
                    className={'block text-brand-400 dark:text-brand-300'}
                  >
                    Price
                  </FormLabel>
                  <input
                    type='number'
                    {...methods.register(`items.${index}.price`, {
                      valueAsNumber: true,
                    })}
                    id={`items.${index}.price`}
                    className='body-100 peer mt-4 w-full rounded-lg border border-brand-100 bg-neutral-100 px-8 py-6 font-bold text-brand-900 caret-brand-500 outline-none autofill:bg-neutral-100 focus:border-brand-500 aria-[invalid="true"]:!border-accent-200 aria-[invalid="true"]:!text-accent-200 focus:aria-[invalid="true"]:!border-accent-200 focus:aria-[invalid="true"]:!ring-accent-200 hover:border-brand-500 dark:border-brand-600 dark:bg-brand-700 dark:text-neutral-100 dark:autofill:bg-brand-700 dark:focus:border-brand-500 dark:hover:border-brand-500'
                    aria-invalid={errors?.price ? 'true' : 'false'}
                    placeholder='200.00'
                    step={0.01}
                  />
                </div>
              ) : (
                <label className='col-span-3 sx:col-span-2'>
                  <input
                    type='number'
                    {...methods.register(`items.${index}.price`, {
                      valueAsNumber: true,
                    })}
                    id={`items.${index}.price`}
                    className='body-100 peer w-full rounded-lg border border-brand-100 bg-neutral-100 px-8 py-6 font-bold text-brand-900 caret-brand-500 outline-none autofill:bg-neutral-100 focus:border-brand-500 aria-[invalid="true"]:!border-accent-200 aria-[invalid="true"]:!text-accent-200 focus:aria-[invalid="true"]:!border-accent-200 focus:aria-[invalid="true"]:!ring-accent-200 hover:border-brand-500 dark:border-brand-600 dark:bg-brand-700 dark:text-neutral-100 dark:autofill:bg-brand-700 dark:focus:border-brand-500 dark:hover:border-brand-500'
                    aria-invalid={errors?.price ? 'true' : 'false'}
                    placeholder='200.00'
                    step={0.01}
                  />
                </label>
              )}

              <div className='col-span-2 self-start sx:self-center'>
                {isMobile ? (
                  <FormLabel
                    htmlFor={`items.${index}.total`}
                    className={'block text-brand-400 dark:text-brand-300'}
                  >
                    Price
                  </FormLabel>
                ) : (
                  <React.Fragment />
                )}

                <output
                  htmlFor={`items.${index}.price items.${index}.quantity`}
                  id={`items.${index}.total`}
                  className={clsx(
                    'body-100 block font-bold text-[#888EB0]',
                    errors ? 'mt-10 sx:mt-[2.3rem]' : 'mt-9 sx:mt-3'
                  )}
                >
                  {formatPrice(
                    calculateTotal(field?.quantity || 0, field?.price || 0)
                  )}
                </output>
              </div>

              <div
                className={clsx(
                  'col-span-1 self-center justify-self-center',
                  errors ? 'mt-8' : 'mt-8 sx:mt-0'
                )}
              >
                <button
                  type='button'
                  className='inline-block h-[1.6rem] w-[1.3rem] bg-[url(/assets/svgs/icon-delete.svg)] bg-cover bg-no-repeat focus:bg-[url(/assets/svgs/icon-delete-red.svg)] hover:bg-[url(/assets/svgs/icon-delete-red.svg)]'
                  onClick={() => void remove(index)}
                >
                  <span className='sr-only'>Delete Item</span>
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <div className='mt-16'>
        <button
          type='button'
          className='btn btn-add'
          onClick={() =>
            void append({
              id: uuid(),
              name: '',
              quantity: 0,
              price: 0,
              total: 0,
            })
          }
        >
          &#43; Add New Item
        </button>
      </div>
    </React.Fragment>
  );
};

export { NewItemList };

interface InvoiceFormType {
  clientAddress: {
    street: string;
    city: string;
    country: string;
    postCode: string;
  };
  clientEmail: string;
  clientName: string;
  description: string;
  items: [
    {
      name: string;
      quantity: number;
      price: number;
      id?: string | undefined;
      total?: number | undefined;
    },
    ...{
      name: string;
      quantity: number;
      price: number;
      id?: string | undefined;
      total?: number | undefined;
    }[]
  ];
  senderAddress: {
    street: string;
    city: string;
    country: string;
    postCode: string;
  };
  issueDate?: string | undefined;
  paymentDue?: string | undefined;
  paymentTerms?: number | undefined;
  status?: 'PAID' | 'PENDING' | 'DRAFT' | undefined;
  tag?: string | undefined;
  total?: number | undefined;
  userId?: string | undefined;
}