'use client';

import { cx } from 'cva';
import Link from 'next/link';

interface Props {
  invoice?: InvoiceType;
  updateStatus: (data?: InvoiceType) => void;
  openDeleteModal: () => void;
  className?: string;
}

const InvoiceActions = ({
  className = '',
  invoice,
  updateStatus,
  openDeleteModal,
}: Props) => {
  return (
    <div className={cx('flex items-center justify-between gap-4', className)}>
      <Link className='btn btn-edit font-bold' href={`/`}>
        Edit
      </Link>

      <button
        type='button'
        className='btn btn-delete font-bold'
        onClick={openDeleteModal}
      >
        Delete
      </button>
      <button
        type='button'
        className='btn btn-invoice font-bold'
        onClick={() => {
          // @ts-expect-error disable typecheck error
          if (!isPaidInvoice(invoice)) updateStatus(invoice);
        }}
      >
        Mark as Paid
      </button>
    </div>
  );
};

export { InvoiceActions };
