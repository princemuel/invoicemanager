import { InvoiceFormTemplate, NewInvoiceForm } from '@src/components';

type Props = {};

const NewInvoiceRoute = (props: Props) => {
  return (
    <InvoiceFormTemplate id='create-invoice' title='New Invoice'>
      <NewInvoiceForm />
    </InvoiceFormTemplate>
  );
};

export { NewInvoiceRoute };
