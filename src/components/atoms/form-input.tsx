import type { Props } from '@src/@types';
import clsx from 'clsx';
import * as React from 'react';

const FormInputInner = <E extends React.ElementType = 'input'>(
  { variant, className, ...rest }: Props<E>,
  ref: React.ForwardedRef<HTMLInputElement>
) => {
  const RenderedElement = variant || 'input';
  return (
    <RenderedElement
      className={clsx('w-full focus:outline-none', '', className)}
      {...rest}
      ref={ref}
    />
  );
};

export const FormInput = React.forwardRef(FormInputInner);
