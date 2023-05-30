/*==============================*
          DATA MODELS
    ==============================*/
interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
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
