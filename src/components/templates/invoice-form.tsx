import clsx from 'clsx';
import * as React from 'react';
import { Text } from '../atoms';

type Props = {
  id: string;
  className?: string;
  children: React.ReactNode;
  title: string;
};

const InvoiceFormTemplate = ({ id, children, className, title }: Props) => {
  return (
    <section aria-labelledby={id} className={clsx('h-container', className)}>
      <header className='mt-10'>
        <Text as='h1' id={id} className='text-brand-900 dark:text-neutral-100'>
          {title}
        </Text>
      </header>

      <React.Fragment>{children}</React.Fragment>
    </section>
  );
};

export { InvoiceFormTemplate };
