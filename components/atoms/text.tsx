const Text = <E extends React.ElementType = 'p'>({
  children,
  as,
  ...rest
}: ElementProps<E>) => {
  const RenderedElement = as || 'p';
  return <RenderedElement {...rest}>{children}</RenderedElement>;
};

export { Text };
