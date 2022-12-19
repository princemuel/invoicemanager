import { promises as fs } from 'fs';
import { isNotEmptyArray, pluck } from 'helpers';
import path from 'path';
import { Invoice } from 'types';

const common = path.join(process.cwd(), 'common');
const filePath = path.join(common, 'data.json');

export async function fetchInvoices() {
  const fileContents = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(fileContents) as Invoice[];

  return isNotEmptyArray(data)
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
