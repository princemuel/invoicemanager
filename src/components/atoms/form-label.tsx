import type { Props } from '@src/@types';
import clsx from 'clsx';
import * as React from 'react';

const FormLabel = <E extends React.ElementType = 'label'>({
  children,
  as,
  className,
  ...rest
}: Props<E>) => {
  const RenderedElement = as || 'label';
  return (
    <RenderedElement className={clsx('block', '', className)} {...rest}>
      {children}
    </RenderedElement>
  );
};

export { FormLabel };
