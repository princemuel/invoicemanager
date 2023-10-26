'use client';

import { cn } from '@/helpers';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form';
import { Label } from './label';

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};
type FormItemContextValue = {
  id: string;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

const Form = FormProvider;

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const FormItem = React.forwardRef(
  ({ as, className, ...restProps }, forwardedRef) => {
    const id = React.useId();
    const As = as || 'div';

    return (
      <FormItemContext.Provider value={{ id }}>
        <As
          ref={forwardedRef}
          className={cn('group flex flex-col gap-3', className)}
          {...restProps}
        />
      </FormItemContext.Provider>
    );
  }
) as ForwardRefComponent<'div', {}>;
FormItem.displayName = 'FormItem';

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...restProps }, forwardedRef) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={forwardedRef}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-errormessage={formMessageId}
      aria-invalid={Boolean(error)}
      {...restProps}
    />
  );
});
FormControl.displayName = 'FormControl';

export const TextField = React.forwardRef(
  ({ className, ...restProps }, forwardedRef) => (
    <input
      ref={forwardedRef}
      className={cn(
        'peer w-full rounded border border-brand-100 bg-transparent px-5 py-4 text-400 font-bold leading-200 -tracking-200 text-brand-900 caret-brand-500 outline-none transition-colors autofill:bg-white aria-[invalid="true"]:!border-accent-200 aria-[invalid="true"]:!text-accent-200 hover:border-brand-500 focus:border-brand-500 focus:aria-[invalid="true"]:!border-accent-200 focus:aria-[invalid="true"]:!ring-accent-200 dark:border-brand-600 dark:bg-brand-700 dark:text-white dark:autofill:bg-brand-700 dark:hover:border-brand-500 dark:focus:border-brand-500',
        className
      )}
      {...restProps}
    />
  )
) as ForwardRefComponent<'input', {}>;
TextField.displayName = 'TextField';

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...restProps }, forwardedRef) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={forwardedRef}
      className={cn(error && 'text-accent-200 dark:text-accent-200', className)}
      htmlFor={formItemId}
      {...restProps}
    />
  );
});
FormLabel.displayName = 'FormLabel';

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...restProps }, forwardedRef) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) return null;

  return (
    <p
      role='alert'
      ref={forwardedRef}
      id={formMessageId}
      className={cn(
        'text-400 font-medium leading-200 -tracking-200 text-accent-200',
        className
      )}
      {...restProps}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = 'FormMessage';

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...restProps }, forwardedRef) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={forwardedRef}
      id={formDescriptionId}
      className={cn('text-xs', className)}
      {...restProps}
    />
  );
});
FormDescription.displayName = 'FormDescription';

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
};
