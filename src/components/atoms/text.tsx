import * as React from 'react';

type TextProps<E extends React.ElementType<any>> = {
  children: React.ReactNode;
  variant?: E;
};

type Props<E extends React.ElementType<any>> = TextProps<E> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof TextProps<E>>;

const Text = <E extends React.ElementType = 'p'>({
  children,
  variant,
  ...rest
}: Props<E>) => {
  const RenderedElement = variant || 'p';
  return <RenderedElement {...rest}>{children}</RenderedElement>;
};

export { Text };
