import { calculateTotal, endsWith } from '@src/helpers';
import { useMedia } from '@src/hooks';
import clsx from 'clsx';
import * as React from 'react';
import {
  FieldPathValue,
  UseFormReturn,
  get,
  useFieldArray,
} from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import { FormErrorText, FormLabel } from '../atoms';
import { InvoiceFormType } from './@types';
import { PriceOutput } from './price-output';

interface Props {
  methods: UseFormReturn<InvoiceFormType, any>;
  invoice: InvoiceFormType;
}

const EditItemList = ({ methods, invoice }: Props) => {
  const { fields, append, remove, update } = useFieldArray({
    name: 'items',
    control: methods.control,
    rules: {
      required: 'Please add at least one item',
    },
  });

  const isMobile = useMedia(`(max-width: 40em)`);

  React.useEffect(() => {
    methods.setValue('items', invoice?.items);
  }, [invoice?.items]);

  React.useEffect(() => {
    const subscription = methods.watch((_, { name, type }) => {
      // first get all values
      const value = methods.getValues();
      // check if the update was a change not a delete
      if (type === 'change' && name) {
        // check if a subproperty has changed and not the array or some of its elements themself
        if (
          endsWith(name, 'quantity') ||
          // endsWith(name, 'total') ||
          endsWith(name, 'price')
        ) {
          const { items } = value;
          // get the index and the name of field that has been changed
          const [, indexString, fieldName] = name.split('.');

          // Get the new value from the field
          const fieldValue = get(value, name) as FieldPathValue<
            typeof value,
            typeof name
          >;

          const index = parseInt(indexString);

          if (fieldValue) {
            if (fieldName === 'quantity')
              methods.setValue(
                `items.${index}.total`,
                calculateTotal(fieldValue, items[index].price)
              );
            else if (fieldName === 'price')
              methods.setValue(
                `items.${index}.total`,

                calculateTotal(items[index].quantity, fieldValue)
              );
          }
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [methods.watch]);

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
                    defaultValue={invoice?.items?.[index]?.name || ''}
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
                      {errors?.name?.message || ''}
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
                    defaultValue={invoice?.items?.[index]?.name || ''}
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
                    step={1}
                    aria-invalid={errors?.quantity ? 'true' : 'false'}
                    defaultValue={invoice?.items?.[index]?.quantity || 0}
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
                    step={1}
                    aria-invalid={errors?.quantity ? 'true' : 'false'}
                    defaultValue={invoice?.items?.[index]?.quantity || 0}
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
                    defaultValue={invoice?.items?.[index]?.price || 0}
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
                    defaultValue={invoice?.items?.[index]?.price || 0}
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

                <PriceOutput index={index} errors={errors} />
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
          onClick={() => {
            append({
              id: uuid(),
              name: '',
              quantity: 0,
              price: 0,
              total: 0,
            });
          }}
        >
          &#43; Add New Item
        </button>
      </div>
    </React.Fragment>
  );
};

export { EditItemList };
