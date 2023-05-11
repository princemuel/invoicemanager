import { EditInvoiceForm, InvoiceFormTemplate } from '@src/components';
import { client, useGetInvoiceQuery } from '@src/lib';
import { useParams } from 'react-router-dom';

interface Props {}

const EditInvoiceRoute = (props: Props) => {
  const { invoiceId } = useParams();

  const { data } = useGetInvoiceQuery(client, {
    where: { id: invoiceId! },
  });
  return (
    <InvoiceFormTemplate
      id='edit-invoice'
      title={`Edit #${data?.invoice?.tag?.toUpperCase()}`}
    >
      <EditInvoiceForm />
    </InvoiceFormTemplate>
  );
};

export { EditInvoiceRoute };
