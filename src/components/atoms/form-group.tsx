import type { Props } from '@src/@types';
import clsx from 'clsx';
import * as React from 'react';

const FormGroup = <E extends React.ElementType = 'div'>({
  children,
  as,
  className,
  ...rest
}: Props<E>) => {
  const RenderedElement = as || 'div';
  return (
    <RenderedElement className={clsx('', className)} {...rest}>
      {children}
    </RenderedElement>
  );
};

export { FormGroup };
