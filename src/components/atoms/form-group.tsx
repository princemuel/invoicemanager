import type { Props } from '@src/@types';
import clsx from 'clsx';
import * as React from 'react';

const FormGroup = <E extends React.ElementType = 'div'>({
  children,
  variant,
  className,
  ...rest
}: Props<E>) => {
  const RenderedElement = variant || 'div';
  return (
    <RenderedElement className={clsx('', className)} {...rest}>
      {children}
    </RenderedElement>
  );
};

export { FormGroup };
