'use client';

import { cx } from 'cva';
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  useFormContext,
} from 'react-hook-form';

interface Props {
  index: number;
  errors:
    | Merge<
        FieldError,
        FieldErrorsImpl<{
          name: string;
          quantity: number;
          price: number;
          id: string;
          total: number;
        }>
      >
    | undefined;
}

const PriceOutput = ({ index, errors }: Props) => {
  const { register } = useFormContext();

  return (
    <input
      type='number'
      {...register(`items.${index}.total`, {
        valueAsNumber: true,
      })}
      id={`items.${index}.total`}
      className={cx(
        'body-100 w-full appearance-none bg-inherit font-bold text-[#888EB0] outline-none',
        errors ? 'mt-10 sx:mt-[2.3rem]' : 'mt-9 sx:mt-3'
      )}
      step={0.01}
      readOnly
    />
  );
};

export { PriceOutput };
