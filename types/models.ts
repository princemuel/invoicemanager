/*===============================*
          DATA MODELS
 *===============================*
*/
export type IInvoices = Array<IInvoice>;

export interface IInvoice {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: string;
  senderAddress: IAddress;
  clientAddress: IAddress;
  items: IProduct[];
  total: number;
}

interface IAddress {
  street: string;
  city: string;
  postCode: string;
  country: string;
}
interface IProduct {
  name: string;
  quantity: number;
  price: number;
  total: number;
}
