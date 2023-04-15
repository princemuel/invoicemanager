import { EditInvoiceForm, InvoiceFormTemplate } from '@src/components';
import { useParams } from 'react-router-dom';

type Props = {};

const EditInvoiceRoute = (props: Props) => {
  const { invoiceId } = useParams();
  return (
    <InvoiceFormTemplate id='edit-invoice' title={`Edit ${invoiceId}`}>
      <EditInvoiceForm />
    </InvoiceFormTemplate>
  );
};

export { EditInvoiceRoute };
