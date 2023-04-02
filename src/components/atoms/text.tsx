import type { Props } from '@src/@types';

const Text = <E extends React.ElementType = 'p'>({
  children,
  as,
  ...rest
}: Props<E>) => {
  const RenderedElement = as || 'p';
  return <RenderedElement {...rest}>{children}</RenderedElement>;
};

export { Text };
