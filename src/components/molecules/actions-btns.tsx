import { InvoiceType } from '@src/hooks';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

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
    <div className={clsx('flex items-center justify-between gap-4', className)}>
      <Link className='btn btn-edit font-bold' to={`edit`}>
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
          if (invoice?.status !== 'PAID') updateStatus(invoice);
        }}
      >
        Mark as Paid
      </button>
    </div>
  );
};

export { InvoiceActions };
