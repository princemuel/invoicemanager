import clsx from 'clsx';
import * as React from 'react';
import { Text } from '../atoms';

interface Props {
  id: string;
  className?: string;
  children: React.ReactNode;
  title: string;
}

const InvoiceFormTemplate = ({ id, children, className, title }: Props) => {
  return (
    <section
      aria-labelledby={id}
      className={clsx('relative min-h-screen', className)}
    >
      <div className='h-container'>
        <header className='mt-10'>
          <Text
            as='h1'
            id={id}
            className='text-brand-900 dark:text-neutral-100'
          >
            {title}
          </Text>
        </header>
      </div>

      <React.Fragment>{children}</React.Fragment>
    </section>
  );
};

export { InvoiceFormTemplate };
