import {
  InvoiceType,
  useDeleteInvoiceMutation,
  useGetInvoiceQuery,
  useGetInvoicesQuery,
  useUpdateInvoiceMutation,
} from '@src/hooks';
import { client } from '@src/lib';
import { useQueryClient } from '@tanstack/react-query';
import { Fragment, useCallback } from 'react';
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { InvoiceDetails, InvoiceDetailsMobile } from '../organisms';

type Props = {};

const InvoiceTemplate = (props: Props) => {
  const { invoiceId } = useParams();
  const location = useLocation();

  if (!invoiceId) {
    return <Navigate to='/' state={{ from: location }} replace />;
  }

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data } = useGetInvoiceQuery(client, {
    where: { id: invoiceId },
  });
  const invoice = data?.invoice;

  const { mutate: updateInvoice } = useUpdateInvoiceMutation(client, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: useGetInvoicesQuery.getKey(),
      });
      queryClient.invalidateQueries({
        queryKey: useGetInvoiceQuery.getKey({
          where: { id: invoiceId },
        }),
      });
      navigate(-1);
    },
  });

  const { mutate: removeInvoice } = useDeleteInvoiceMutation(client, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: useGetInvoicesQuery.getKey(),
      });
      navigate('/invoices');
    },
  });

  const updateStatus = useCallback((data?: InvoiceType) => {
    if (!data) throw new Error('Invalid data');

    const draft = {
      clientAddress: invoice?.clientAddress,
      clientEmail: invoice?.clientEmail,
      clientName: invoice?.clientName,
      description: invoice?.description,
      items: invoice?.items,
      paymentDue: invoice?.paymentDue,
      paymentTerms: invoice?.paymentTerms,
      senderAddress: invoice?.senderAddress,
      status: 'PAID',
      total: invoice?.total,
    };

    //@ts-expect-error
    updateInvoice({ input: draft, where: { id: invoiceId } });
  }, []);

  const deleteInvoice = useCallback((data?: InvoiceType) => {
    if (!data) throw new Error('Invalid data');
    removeInvoice({ where: { id: invoiceId } });
  }, []);

  return (
    <Fragment>
      <InvoiceDetailsMobile
        invoice={invoice}
        updateStatus={updateStatus}
        deleteInvoice={deleteInvoice}
      />
      <InvoiceDetails
        invoice={invoice}
        updateStatus={updateStatus}
        deleteInvoice={deleteInvoice}
      />
    </Fragment>
  );
};

export { InvoiceTemplate };
