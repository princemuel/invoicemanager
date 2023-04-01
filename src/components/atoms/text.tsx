import type { Props } from '@src/@types';

const Text = <E extends React.ElementType = 'p'>({
  children,
  variant,
  ...rest
}: Props<E>) => {
  const RenderedElement = variant || 'p';
  return <RenderedElement {...rest}>{children}</RenderedElement>;
};

export { Text };
