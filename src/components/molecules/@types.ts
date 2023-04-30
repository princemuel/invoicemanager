export interface InvoiceFormType {
  clientAddress: {
    street: string;
    city: string;
    country: string;
    postCode: string;
  };
  clientEmail: string;
  clientName: string;
  description: string;
  items: [
    {
      name: string;
      quantity: number;
      price: number;
      id?: string | undefined;
      total?: number | undefined;
    },
    ...{
      name: string;
      quantity: number;
      price: number;
      id?: string | undefined;
      total?: number | undefined;
    }[]
  ];
  senderAddress: {
    street: string;
    city: string;
    country: string;
    postCode: string;
  };
  issueDate?: string | undefined;
  paymentDue?: string | undefined;
  paymentTerms?: number | undefined;
  status?: 'PAID' | 'PENDING' | 'DRAFT' | undefined;
  tag?: string | undefined;
  total?: number | undefined;
  userId?: string | undefined;
}
