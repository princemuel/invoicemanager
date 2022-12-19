import * as React from 'react';
import type { Invoice } from 'types';

const InvoiceContext = React.createContext<Invoice[] | Invoice | null>(null);

type InvoiceProps = {
  children: React.ReactNode;
  value: Invoice[] | Invoice;
};

export const InvoiceProvider = ({ children, value }: InvoiceProps) => {
  const data = React.useMemo(() => value, [value]);

  return (
    <InvoiceContext.Provider value={data}>{children}</InvoiceContext.Provider>
  );
};

export const useInvoices = () => {
  const context = React.useContext(InvoiceContext);
  if (context == undefined) {
    throw new Error('useInvoices must be used in a InvoiceProvider');
  }
  return context;
};
