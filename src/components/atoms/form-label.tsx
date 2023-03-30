import clsx from 'clsx';
import * as React from 'react';

type FormLabelProps<E extends React.ElementType<any>> = {
  children: React.ReactNode;
  className?: string;
  variant?: E;
};

type Props<E extends React.ElementType<any>> = FormLabelProps<E> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof FormLabelProps<E>>;

const FormLabel = <E extends React.ElementType = 'label'>({
  children,
  variant,
  className,
  ...rest
}: Props<E>) => {
  const RenderedElement = variant || 'label';
  return (
    <RenderedElement
      className={clsx(
        'block text-300 font-bold leading-200 dark:text-neutral-100',
        className || null
      )}
      {...rest}
    >
      {children}
    </RenderedElement>
  );
};

export { FormLabel };
