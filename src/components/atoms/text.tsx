import type { Project } from '@src/@types';

const Text = <E extends React.ElementType = 'p'>({
  children,
  as,
  ...rest
}: Project.ElementProps<E>) => {
  const RenderedElement = as || 'p';
  return <RenderedElement {...rest}>{children}</RenderedElement>;
};

export { Text };
