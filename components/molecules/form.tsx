import { cn } from '@/helpers';
import {
  FormProvider,
  type FieldValues,
  type UseFormReturn,
} from 'react-hook-form';

interface Props<T extends FieldValues> {
  onSubmit: any;
  methods: UseFormReturn<T, any, undefined>;
  children: React.ReactNode;
  className?: string;
}

const Form = <T extends FieldValues>({
  children,
  onSubmit,
  className,
  methods,
}: Props<T>) => {
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={cn('flex w-full flex-col gap-6 p-8', className)}
      >
        {children}
      </form>
    </FormProvider>
  );
};
export { Form };
