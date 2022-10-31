/*===============================*
          DATA MODELS
 *===============================*
*/
export type Invoices = Array<Invoice>;

export type Invoice = DraftInvoice | PendingInvoice | PaidInvoice;

export const isDraftInvoice = (invoice: Invoice): invoice is DraftInvoice => {
  return invoice.status === 'draft';
};

export const isPendingInvoice = (
  invoice: Invoice
): invoice is PendingInvoice => {
  return invoice.status === 'pending';
};

export const isPaidInvoice = (invoice: Invoice): invoice is PaidInvoice => {
  return invoice.status === 'paid';
};

const invoice: Invoice = {
  id: 'FV2353',
  createdAt: '2021-11-05',
  paymentDue: '2021-11-12',
  description: 'Logo Re-design',
  paymentTerms: 7,
  clientName: 'Anita Wainwright',
  clientEmail: '',
  status: 'draft',
  senderAddress: {
    street: '19 Union Terrace',
    city: 'London',
    postCode: 'E1 3EZ',
    country: 'United Kingdom',
  },
  clientAddress: {
    street: '',
    city: '',
    postCode: '',
    country: '',
  },
  items: [
    {
      name: 'Logo Re-design',
      quantity: 1,
      price: 3102.04,
      total: 3102.04,
    },
  ],
  total: 3102.04,
};

isPaidInvoice(invoice);
type InvoiceStatus = 'draft' | 'pending' | 'paid';

export type PaidInvoice = {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: 1 | 7 | 14 | 30;
  clientName: string;
  clientEmail: string;
  status: Extract<InvoiceStatus, 'paid'>;
  senderAddress: IAddress;
  clientAddress: IAddress;
  items: LineItem[];
  total: number;
};
type PendingInvoice = {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: 1 | 7 | 14 | 30;
  clientName: string;
  clientEmail: string;
  status: Extract<InvoiceStatus, 'pending'>;
  senderAddress: IAddress;
  clientAddress: IAddress;
  items: LineItem[];
  total: number;
};
type DraftInvoice = {
  id: string;
  createdAt?: string;
  paymentDue?: string;
  description?: string;
  paymentTerms?: 1 | 7 | 14 | 30;
  clientName?: string;
  clientEmail?: string;
  status: Extract<InvoiceStatus, 'draft'>;
  senderAddress?: IAddress;
  clientAddress?: Partial<IAddress>;
  items?: LineItem[];
  total?: number;
};

interface IAddress {
  street: string;
  city: string;
  postCode: string;
  country: string;
}
interface LineItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}
