import { calculateTotal, endsWith, cn, approximate } from '@/helpers';
import { useEffect, useCallback } from 'react';
import {
  get,
  useFieldArray,
  useFormContext,
  type FieldPathValue,
  type UseFormReturn,
} from 'react-hook-form';
import { schema } from './common';
import { icons } from '@/common';
import {
  Button,
  Text,
  FormHelperText,
  FormLabel,
  FormControl,
  TextField,
  IconButton,
} from '@/components';
import { v4 as uuid } from 'uuid';

type NewInvoiceFormType = UseFormReturn<typeof schema>;

type Props = { className?: string };

export default function InvoiceItemsDesktop({ className }: Props) {
  const {
    getValues,
    watch,
    setValue,
    control,
    register,
    formState: { errors },
  } = useFormContext<NewInvoiceFormType>();

  const { fields, append, remove } = useFieldArray<NewInvoiceFormType>({
    name: 'items',
    control: control,
    rules: {
      required: 'Please add at least one item',
    },
  });

  useEffect(() => {
    const subscription = watch((_, { name, type }) => {
      const value = getValues();

      if (type === 'change' && name) {
        if (endsWith(name, 'quantity') || endsWith(name, 'price')) {
          type FieldValueType = FieldPathValue<typeof value, typeof name>;

          const { items } = value;
          const [, indexString, fieldName] = name.split('.');
          const index = parseInt(indexString);

          const fieldValue: FieldValueType = get(value, name);

          if (fieldValue) {
            if (fieldName === 'quantity')
              setValue(
                `items.${index}.total`,
                approximate(calculateTotal(fieldValue, items[index].price))
              );
            else if (fieldName === 'price')
              setValue(
                `items.${index}.total`,
                approximate(calculateTotal(items[index].quantity, fieldValue))
              );
          }
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [getValues, setValue, watch]);

  const addItem = useCallback(() => {
    append({
      id: uuid(),
      name: '',
      quantity: 0,
      price: 0,
      total: 0,
    });
  }, [append]);

  return (
    <div className={cn('flex-col gap-6', className)}>
      <ul className='grid grid-cols-12 items-center gap-x-4'>
        <li className='col-span-5'>
          <Text variant='primary'>Item Name</Text>
        </li>
        <li className='col-span-2'>
          <Text variant='primary'>Qty.</Text>
        </li>
        <li className='col-span-2'>
          <Text variant='primary'>Price</Text>
        </li>
        <li className='col-span-2'>
          <Text variant='primary'>Total</Text>
        </li>
      </ul>

      <ul className='flex flex-col gap-5'>
        {fields.map((field, index) => {
          register(`items.${index}.total`);
          const fieldErrors = errors?.items?.[index];

          return (
            // items-end
            <li
              key={field.id}
              className='grid grid-cols-12 items-center gap-x-4'
            >
              <FormControl
                as='label'
                className='col-span-5 data-[invalid="true"]:!text-accent-200 dark:data-[invalid="true"]:!text-accent-200'
                data-invalid={Boolean(fieldErrors?.name)}
              >
                <TextField
                  type='text'
                  id={`items.${index}.name`}
                  placeholder='Banner Design'
                  {...register(`items.${index}.name`)}
                  aria-invalid={Boolean(fieldErrors?.name)}
                />
              </FormControl>

              <FormControl
                as='label'
                className='col-span-2 data-[invalid="true"]:!text-accent-200 dark:data-[invalid="true"]:!text-accent-200'
                data-invalid={Boolean(fieldErrors?.quantity)}
              >
                <TextField
                  type='number'
                  id={`items.${index}.quantity`}
                  placeholder='1'
                  {...register(`items.${index}.quantity`, {
                    valueAsNumber: true,
                  })}
                  aria-invalid={Boolean(fieldErrors?.quantity)}
                  step={1}
                />
              </FormControl>

              <FormControl
                as='label'
                className='col-span-2 data-[invalid="true"]:!text-accent-200 dark:data-[invalid="true"]:!text-accent-200'
                data-invalid={Boolean(fieldErrors?.price)}
              >
                <TextField
                  type='number'
                  id={`items.${index}.price`}
                  placeholder='200.00'
                  {...register(`items.${index}.price`, {
                    valueAsNumber: true,
                  })}
                  aria-invalid={Boolean(fieldErrors?.price)}
                  step={0.01}
                />
              </FormControl>

              <FormControl className='col-span-2 '>
                <Text
                  as='output'
                  htmlFor={`items.${index}.price items.${index}.quantity`}
                  id={`items.${index}.total`}
                  name={`items.${index}.total`}
                  weight='bold'
                  className='text-[#888EB0] dark:text-[#888EB0]'
                >
                  {watch(`items.${index}.total`)}
                </Text>
              </FormControl>

              <FormControl className='col-span-1 justify-self-center'>
                <button
                  type='button'
                  className='inline-block h-5 w-4 bg-[url(/icon-delete.svg)] bg-cover bg-no-repeat hover:bg-[url(/icon-delete-red.svg)] focus:bg-[url(/icon-delete-red.svg)]'
                  onClick={() => void remove(index)}
                >
                  <span className='sr-only'>Delete Item</span>
                </button>
              </FormControl>
            </li>
          );
        })}
      </ul>

      <div>
        <Button
          type='button'
          variant='soft'
          className=''
          onClick={addItem}
          fullWidth
        >
          &#43; Add New Item
        </Button>
      </div>
    </div>
  );
}
