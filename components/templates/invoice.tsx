'use client';

import { getErrorMessage, useApiState } from '@/lib';
import { Fragment, useCallback } from 'react';
import toast from 'react-hot-toast';
import { ClientOnly } from '../atoms';
import {
  DeleteInvoiceForm,
  InvoiceDetails,
  UpdateInvoiceForm,
} from '../organisms';

interface Props {
  invoice: InvoiceTypeSafe;
}

const InvoiceTemplate = ({ invoice }: Props) => {
  const { router, isMutating, setIsFetching, startTransition } = useApiState();

  const updateStatus = useCallback(
    async (data?: InvoiceTypeSafe) => {
      if (!data) throw new Error('Invalid data');

      try {
        setIsFetching(true);

        const response = await fetch(`/api/invoices/${data?.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: 'PAID',
          }),
        });

        if (!response.ok) throw new TypeError('Invalid Response');

        await response.json();

        setIsFetching(false);

        startTransition(() => {
          router.refresh();
        });
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setIsFetching(false);
      }
    },
    [router, setIsFetching, startTransition]
  );

  return (
    <Fragment>
      <InvoiceDetails invoice={invoice} updateStatus={updateStatus} />

      <ClientOnly>
        <UpdateInvoiceForm invoice={invoice} />
        <DeleteInvoiceForm invoice={invoice} />
      </ClientOnly>
    </Fragment>
  );
};

export { InvoiceTemplate };
