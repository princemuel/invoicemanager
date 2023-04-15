/*===============================*
          DATA MODELS
 *===============================*
*/

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
}

export type Invoices = Array<Invoice>;

export type Invoice = DraftInvoice | PendingInvoice | PaidInvoice;

export type InvoiceStatus = 'DRAFT' | 'PENDING' | 'PAID';

export type PaidInvoice = {
  id: string;
  createdAt: string;
  updatedAt?: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: Extract<InvoiceStatus, 'PAID'>;
  senderAddress: IAddress;
  clientAddress: IAddress;
  items: ILineItem[];
  total: number;
};
export type PendingInvoice = {
  id: string;
  createdAt: string;
  updatedAt?: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: Extract<InvoiceStatus, 'PENDING'>;
  senderAddress: IAddress;
  clientAddress: IAddress;
  items: ILineItem[];
  total: number;
};
export type DraftInvoice = {
  id: string;
  createdAt: string;
  updatedAt?: string;
  paymentDue?: string;
  description?: string;
  paymentTerms: number;
  clientName?: string;
  clientEmail?: string;
  status: Extract<InvoiceStatus, 'DRAFT'>;
  senderAddress?: IAddress;
  clientAddress?: Partial<IAddress>;
  items?: ILineItem[];
  total?: number;
};

interface IAddress {
  street: string;
  city: string;
  postCode: string;
  country: string;
}
interface ILineItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}
