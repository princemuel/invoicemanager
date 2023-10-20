'use client';

import * as React from 'react';

const InvoiceContext = React.createContext<Promise<InvoiceTypeSafe> | null>(
  null
);

interface Props {
  children: React.ReactNode;
  promise: Promise<InvoiceTypeSafe>;
}

export const InvoiceProvider = ({ children, promise }: Props) => {
  return (
    <InvoiceContext.Provider value={promise}>
      {children}
    </InvoiceContext.Provider>
  );
};

export function useInvoice() {
  const context = React.useContext(InvoiceContext);
  if (context == null)
    throw new Error(
      'The `useInvoice` hook must be used in a `InvoiceProvider`'
    );

  return context;
}
