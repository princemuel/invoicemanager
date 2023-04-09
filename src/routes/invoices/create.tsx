import { CreateInvoiceForm, InvoiceFormTemplate } from '@src/components';

type Props = {};

const CreateInvoiceRoute = (props: Props) => {
  return (
    <InvoiceFormTemplate id='create-invoice' title='New Invoice'>
      <CreateInvoiceForm />
    </InvoiceFormTemplate>
  );
};

export { CreateInvoiceRoute };
