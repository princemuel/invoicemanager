import { EditInvoiceForm, InvoiceFormTemplate } from '@src/components';

type Props = {};

const EditInvoiceRoute = (props: Props) => {
  return (
    <InvoiceFormTemplate id='edit-invoice' title='Edit Invoice'>
      <EditInvoiceForm />
    </InvoiceFormTemplate>
  );
};

export { EditInvoiceRoute };
