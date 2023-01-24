import * as React from "react";
import type { Invoice } from "types";

const InvoicesContext = React.createContext<Invoice[] | null>(null);
const InvoiceContext = React.createContext<Invoice | null>(null);

type InvoicesProps = {
  children: React.ReactNode;
  value: Invoice[];
};
type InvoiceProps = {
  children: React.ReactNode;
  value: Invoice;
};

export const InvoicesProvider = ({ children, value }: InvoicesProps) => {
  const data = React.useMemo(() => value, [value]);
  return (
    <InvoicesContext.Provider value={data}>{children}</InvoicesContext.Provider>
  );
};
export const InvoiceProvider = ({ children, value }: InvoiceProps) => {
  const data = React.useMemo(() => value, [value]);

  return (
    <InvoiceContext.Provider value={data}>{children}</InvoiceContext.Provider>
  );
};

export const useInvoices = () => {
  const context = React.useContext(InvoicesContext);
  if (context == undefined) {
    throw new Error("useInvoices must be used in a InvoiceProvider");
  }
  return context;
};
export const useInvoice = () => {
  const context = React.useContext(InvoiceContext);
  if (context == undefined) {
    throw new Error("useInvoice must be used in a InvoiceProvider");
  }
  return context;
};
