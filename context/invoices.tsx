'use client';

import * as React from 'react';

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
      {children}
    </InvoicesContext.Provider>
  );
};

export function useInvoices() {
  const context = React.useContext(InvoicesContext);
  if (context == null)
    throw new Error(
      'The `useInvoices` hook must be used in a `InvoicesProvider`'
    );

  return context;
}
