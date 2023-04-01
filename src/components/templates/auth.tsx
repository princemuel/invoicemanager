import * as React from 'react';

type Props = {
  children: React.ReactNode;
};

const AuthTemplate = ({ children }: Props) => {
  return (
    <section className='flex h-full items-center justify-center px-8'>
      {children}
    </section>
  );
};

export { AuthTemplate };
