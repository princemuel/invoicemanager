import * as React from 'react';

type TextProps<E extends React.ElementType<any>> = {
  children: React.ReactNode;
  as?: E;
};

type Props<E extends React.ElementType<any>> = TextProps<E> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof TextProps<E>>;

const Text = <E extends React.ElementType = 'p'>({
  children,
  as,
  ...rest
}: Props<E>) => {
  const RenderedElement = as || 'p';
  return <RenderedElement {...rest}>{children}</RenderedElement>;
};

export { Text };
