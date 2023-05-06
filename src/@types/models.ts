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

export type IStatus = ['PAID', 'PENDING', 'DRAFT'];

export type InvoiceStatus = IStatus[number];
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

export interface IErrorResponse {
  response: { errors: IError[]; data: IErrorData };
}

interface IError {
  message: string;
  locations: IErrorLocation[];
  path: string[];
  extensions: IErrorExtensions;
}
interface IErrorLocation {
  line: number;
  column: number;
}
interface IErrorExtensions {
  code: string;
  http: { status: number };
  stacktrace: string[];
}
interface IErrorData {
  [x: string]: any;
}
