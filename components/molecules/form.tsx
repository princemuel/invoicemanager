'use client';

import { cn } from '@/helpers';
import {
  FormProvider,
  type FieldValues,
  type UseFormReturn,
} from 'react-hook-form';

interface Props<T extends FieldValues>
  extends React.HTMLAttributes<HTMLFormElement> {
  methods: UseFormReturn<T, any, undefined>;
}

const Form = <T extends FieldValues>({
  children,
  className,
  methods,
  ...restProps
}: Props<T>) => {
  return (
    <FormProvider {...methods}>
      <form {...restProps} className={cn('w-full', className)}>
        {children}
      </form>
    </FormProvider>
  );
};
export { Form };
