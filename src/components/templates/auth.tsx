import * as React from 'react';

type Props = {
  children: React.ReactNode;
};

const AuthTemplate = ({ children }: Props) => {
  return <section className=''>{children}</section>;
};

export { AuthTemplate };
