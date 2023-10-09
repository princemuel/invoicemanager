'use client';

import * as React from 'react';
import { FilterProvider } from './filters';

const InvoicesContext = React.createContext<Promise<InvoiceTypeSafe[]> | null>(
  null
);

interface Props {
  children: React.ReactNode;
  promise: Promise<InvoiceTypeSafe[]>;
}

export const InvoicesProvider = ({ children, promise }: Props) => {
  return (
    <InvoicesContext.Provider value={promise}>
      <FilterProvider defaultValue={React.use(promise)}>
        {children}
      </FilterProvider>
    </InvoicesContext.Provider>
  );
};

export function useInvoicesPromise() {
  const context = React.useContext(InvoicesContext);
  if (context == null)
    throw new Error(
      'The `useInvoices` hook must be used in a `InvoicesProvider`'
    );

  return context;
}
