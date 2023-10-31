import {
  Button,
  DatePicker,
  Container,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  TextField,
} from '@/components';
import { approximate, calculateTotal, cn, endsWith } from '@/helpers';
import { useCallback, useEffect } from 'react';
import {
  get,
  useFieldArray,
  useFormContext,
  type FieldPathValue,
  type UseFormReturn,
} from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import { schema } from './common';

type NewInvoiceFormType = UseFormReturn<typeof schema>;

type Props = { className?: string };

export default function InvoiceItemsMobile({ className }: Props) {
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
      <ul className='flex flex-col gap-8'>
        {fields.map((field, index) => {
          register(`items.${index}.total`);
          const fieldErrors = errors?.items?.[index];

          return (
            <li key={field.id} className='grid grid-cols-8 gap-x-4 gap-y-6'>
              <FormField
                name={`items.${index}.name`}
                render={({ field }) => (
                  <FormItem className='col-span-8'>
                    <div className='flex items-center justify-between'>
                      <FormLabel>Item Name</FormLabel>
                      <FormMessage />
                    </div>

                    <FormControl>
                      <TextField
                        type='text'
                        placeholder='Email Design'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name={`items.${index}.quantity`}
                render={({ field }) => (
                  <FormItem className='col-span-2'>
                    <FormLabel>Qty.</FormLabel>

                    <FormControl>
                      <TextField
                        type='number'
                        placeholder='1'
                        step={1}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name={`items.${index}.price`}
                render={({ field }) => (
                  <FormItem className='col-span-3'>
                    <FormLabel>Price</FormLabel>

                    <FormControl>
                      <TextField
                        type='number'
                        placeholder='200.00'
                        step={0.01}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormItem className='col-span-2 self-start'>
                <FormLabel htmlFor={`items.${index}.total`}>Total</FormLabel>
                <Text
                  as='output'
                  htmlFor={`items.${index}.price items.${index}.quantity`}
                  id={`items.${index}.total`}
                  name={`items.${index}.total`}
                  weight='bold'
                  className='mt-[1.1rem] text-[#888EB0] dark:text-[#888EB0]'
                >
                  {watch(`items.${index}.total`)}
                </Text>
              </FormItem>

              <FormItem className='col-span-1 mt-7 self-center justify-self-center'>
                <button
                  type='button'
                  className='inline-block h-5 w-4 bg-[url(/icon-delete.svg)] bg-cover bg-no-repeat hover:bg-[url(/icon-delete-red.svg)] focus:bg-[url(/icon-delete-red.svg)]'
                  onClick={() => void remove(index)}
                >
                  <span className='sr-only'>Delete Item</span>
                </button>
              </FormItem>
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
