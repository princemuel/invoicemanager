'use client';

import {
  isPaidInvoice,
  useDeleteInvoiceModal,
  useEditInvoiceModal,
} from '@/lib';
import { cx } from 'cva';

interface Props {
  invoice?: InvoiceTypeSafe;
  updateStatus: (data?: InvoiceTypeSafe) => void;
  className?: string;
}

const InvoiceActions = ({ className = '', invoice, updateStatus }: Props) => {
  const modalA = useEditInvoiceModal();
  const modalB = useDeleteInvoiceModal();

  return (
    <div className={cx('flex items-center justify-between gap-4', className)}>
      <button
        type='button'
        className='btn btn-edit font-bold'
        onClick={modalA.open}
      >
        Edit
      </button>

      <button
        type='button'
        className='btn btn-delete font-bold'
        onClick={modalB.open}
      >
        Delete
      </button>
      <button
        type='button'
        className='btn btn-invoice font-bold'
        onClick={() => {
          if (!isPaidInvoice(invoice)) updateStatus(invoice);
        }}
      >
        Mark as Paid
      </button>
    </div>
  );
};

export { InvoiceActions };
