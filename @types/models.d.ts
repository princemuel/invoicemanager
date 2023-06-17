/*==============================*
          DATA MODELS
    ==============================*/
type AuthFormData = Pick<
  Misc.DeepRequired<IUser>,
  'name' | 'email' | 'password'
>;

interface IUser extends TUser {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
}
interface TUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
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

interface InvoiceType {
  id?: string;
  tag: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  issued?: Date | string;
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
  issueDate?: string;
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
