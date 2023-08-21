/*==============================*
          DATA MODELS
    ==============================*/
type AuthFormData = Pick<
  Misc.DeepRequired<IUser>,
  'name' | 'email' | 'password'
>;

interface Term {
  id: string;
  value: number;
}

interface InvoiceFilter {
  id: string;
  value: string;
}

interface AuthUser extends TUser {
  createdAt: string;
  updatedAt: string;
}

/**
 * @deprecated since version 2.0
 */
interface IUser extends TUser {
  createdAt: string;
  updatedAt: string;
}
interface TUser {
  id: string;
  kindeId: string;
  createdAt: Date;
  updatedAt: Date;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  image: string | null;
}

type Invoices = Array<Invoice>;

type IStatus = ['PAID', 'PENDING', 'DRAFT'];

type Invoice = DraftInvoice | PendingInvoice | PaidInvoice;

type InvoiceStatus = IStatus[number];

interface DraftInvoice extends InvoiceFormType {
  status: 'DRAFT';
}
interface PendingInvoice extends InvoiceFormType {
  status: 'PENDING';
}
interface PaidInvoice extends InvoiceFormType {
  status: 'PAID';
}

interface InvoiceTypeSafe extends InvoiceType {
  createdAt?: string;
  updatedAt?: string;
}

interface InvoiceType {
  id?: string;
  tag: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  issued: string;
  paymentDue: string;
  paymentTerms: number;
  description: string;
  status?: string | null;
  senderAddress: IAddress;
  clientName: string;
  clientEmail: string;
  clientAddress: IAddress;
  items?: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    total: number;
  }[];
  total: number;
  userId?: string | null;
}

interface InvoiceFormType {
  clientAddress: IAddress;
  clientEmail: string;
  clientName: string;
  description: string;
  items: [ILineItem, ...ILineItem[]];
  senderAddress: IAddress;
  issued?: string;
  paymentDue?: string;
  paymentTerms?: number;
  status?: InvoiceStatus;
  tag?: string;
  total?: number;
  userId?: string;
}

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
  id?: string;
  total?: number;
}
