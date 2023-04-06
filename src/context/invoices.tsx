import type { Invoice } from '@src/@types';
import { createContext, ReactNode, useContext, useMemo } from 'react';

const InvoicesContext = createContext<Partial<Invoice>[] | null>(null);
const InvoiceContext = createContext<Invoice | null>(null);

type InvoicesProps = {
  children: ReactNode;
  value: Partial<Invoice>[];
};
type InvoiceProps = {
  children: ReactNode;
  value: Invoice;
};

export const InvoicesProvider = ({ children, value }: InvoicesProps) => {
  const data = useMemo(() => value, [value]);
  return (
    <InvoicesContext.Provider value={data}>{children}</InvoicesContext.Provider>
  );
};
export const InvoiceProvider = ({ children, value }: InvoiceProps) => {
  const data = useMemo(() => value, [value]);

  return (
    <InvoiceContext.Provider value={data}>{children}</InvoiceContext.Provider>
  );
};

export const useInvoices = () => {
  const context = useContext(InvoicesContext);
  if (!context) {
    throw new Error('useInvoices must be used in a InvoiceProvider');
  }
  return context;
};
export const useInvoice = () => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error('useInvoice must be used in a InvoiceProvider');
  }
  return context;
};
