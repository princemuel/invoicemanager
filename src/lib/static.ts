import { Invoice } from '@src/@types';
import { hasValues, pluck } from '@src/helpers';

export async function fetchInvoices() {
  const response = await fetch('/assets/data.json');
  console.log(response);

  const data = (await response.json()) as Invoice[];

  return hasValues(data)
    ? data.sort(
        (a, b) =>
          Number(new Date(b.paymentDue!)) - Number(new Date(a.paymentDue!))
      )
    : [];
}

export async function getCategories() {
  const invoices = await fetchInvoices();
  const categories = pluck(invoices, 'status');
  return Array.from(new Set(categories));
}

export async function getIds() {
  const invoices = await fetchInvoices();
  return invoices?.map((invoice) => invoice?.id?.toString());
}

export async function getInvoicePaths() {
  const invoices = await fetchInvoices();
  return invoices?.map((invoice) => ({
    id: invoice.id,
    status: invoice.status,
  }));
}

export async function getById(id: string) {
  const invoices = await fetchInvoices();
  return invoices?.find((invoice) => invoice.id === id);
}
