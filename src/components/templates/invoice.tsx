import { Dialog, Transition } from '@headlessui/react';
import {
  InvoiceType,
  useDeleteInvoiceMutation,
  useGetInvoiceQuery,
  useGetInvoicesQuery,
  useUpdateInvoiceMutation,
} from '@src/hooks';
import { client } from '@src/lib';
import { useQueryClient } from '@tanstack/react-query';
import { Fragment, useCallback, useRef, useState } from 'react';
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { InvoiceDetails } from '../organisms';

interface Props {}

const InvoiceTemplate = (props: Props) => {
  const { invoiceId } = useParams();
  const location = useLocation();

  if (!invoiceId) {
    return <Navigate to='/invoices' state={{ from: location }} replace />;
  }

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  let deleteButtonRef = useRef<HTMLButtonElement>(null);

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

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <Fragment>
      <InvoiceDetails
        invoice={invoice}
        updateStatus={updateStatus}
        openDeleteModal={openModal}
      />

      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-50'
          initialFocus={deleteButtonRef}
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-brand-900/25' aria-hidden='true' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-[2.4rem]'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel
                  as='form'
                  className='mx-auto w-full max-w-3xl rounded-brand bg-neutral-100 shadow-100 dark:bg-brand-700'
                  onSubmit={() => {
                    deleteInvoice(invoice);
                  }}
                >
                  <section className='flex w-full flex-col gap-8 p-16'>
                    <Dialog.Title
                      as='h2'
                      className='text-700 font-bold leading-[3.2rem] tracking-[-0.42px]'
                    >
                      Confirm Deletion
                    </Dialog.Title>

                    <Dialog.Description className='body-100 text-brand-300 dark:text-brand-100'>
                      <span>Are you sure you want to delete invoice</span>{' '}
                      <span className='uppercase'>#{invoice?.tag}?</span>{' '}
                      <span> This action cannot be undone.</span>
                    </Dialog.Description>

                    <div className='flex items-center gap-8'>
                      <button
                        type='button'
                        onClick={closeModal}
                        className='btn btn-edit ml-auto font-bold'
                      >
                        Cancel
                      </button>
                      <button
                        type='submit'
                        ref={deleteButtonRef}
                        className='btn btn-delete font-bold'
                      >
                        Delete
                      </button>
                    </div>
                  </section>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  );
};

export { InvoiceTemplate };
