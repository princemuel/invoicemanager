import type {
  DraftInvoice,
  Invoice,
  PaidInvoice,
  PendingInvoice,
} from '@src/@types';

export const isDraftInvoice = (invoice: Invoice): invoice is DraftInvoice => {
  return invoice.status === 'DRAFT';
};

export const isPendingInvoice = (
  invoice: Invoice
): invoice is PendingInvoice => {
  return invoice.status === 'PENDING';
};

export const isPaidInvoice = (invoice: Invoice): invoice is PaidInvoice => {
  return invoice.status === 'PAID';
};
