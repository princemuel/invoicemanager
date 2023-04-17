import type { Props } from '@src/@types';
import clsx from 'clsx';

const FormControl = <E extends React.ElementType = 'div'>({
  as,
  className,
  children,
  ...rest
}: Props<E>) => {
  const RenderedElement = as || 'div';

  return (
    <RenderedElement
      className={clsx('flex flex-col-reverse gap-4', className)}
      {...rest}
    >
      {children}
    </RenderedElement>
  );
};

export { FormControl };
