import clsx from 'clsx';
import * as React from 'react';

type FormInputProps<E extends React.ElementType<any>> = {
  className?: string;
  variant?: E;
};

type Props<E extends React.ElementType<any>> = FormInputProps<E> &
  Omit<React.ComponentPropsWithRef<E>, keyof FormInputProps<E>>;

const FormInputInner = <E extends React.ElementType = 'input'>(
  { variant, className, ...rest }: Props<E>,
  ref: React.ForwardedRef<HTMLInputElement>
) => {
  const RenderedElement = variant || 'input';
  return (
    <RenderedElement
      className={clsx('w-full focus:outline-none', className)}
      {...rest}
      ref={ref}
    />
  );
};

export const FormInput = React.forwardRef(FormInputInner);
