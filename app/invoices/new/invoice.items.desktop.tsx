import { calculateTotal, endsWith } from '@/helpers';
import { useEffect } from 'react';
import {
  get,
  useFieldArray,
  useFormContext,
  type FieldPathValue,
  type UseFormReturn,
} from 'react-hook-form';
import { schema } from './common';

type NewInvoiceFormType = UseFormReturn<typeof schema>;

type Props = { className?: string };

export default function InvoiceItemsDesktop({ className }: Props) {
  const { getValues, watch, setValue, control } =
    useFormContext<NewInvoiceFormType>();

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
                calculateTotal(fieldValue, items[index].price)
              );
            else if (fieldName === 'price')
              setValue(
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
  }, [getValues, setValue, watch]);
  return (
    <div className={className}>
      <ul></ul>
    </div>
  );
}
