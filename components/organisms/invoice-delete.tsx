'use client';

import { getErrorMessage, useApiState, useDeleteInvoiceModal } from '@/lib';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useCallback, useRef } from 'react';
import toast from 'react-hot-toast';

interface Props {
  invoice: InvoiceTypeSafe;
}

const DeleteInvoiceForm = ({ invoice }: Props) => {
  const invoiceModal = useDeleteInvoiceModal();
  const deleteButtonRef = useRef<HTMLButtonElement>(null);
  const { router, isMutating, setIsFetching, startTransition } = useApiState();

  const deleteInvoice = useCallback(
    async ({ id }: InvoiceTypeSafe) => {
      try {
        setIsFetching(true);

        const response = await fetch(`/api/invoices/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log(response);

        if (!response.ok) throw new TypeError('Invalid Response');

        const json = await response.json();

        setIsFetching(false);

        startTransition(() => {
          invoiceModal.close();
          toast.success(json.message);
          router.push('/invoices');
          router.refresh();
        });
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setIsFetching(false);
      }
    },
    [invoiceModal, router, setIsFetching, startTransition]
  );

  return (
    <Transition show={invoiceModal.show} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-50'
        initialFocus={deleteButtonRef}
        onClose={invoiceModal.close}
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
          <div className='flex min-h-full items-center justify-center p-[2.4rem] backdrop-blur-sm'>
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
                as='div'
                className='mx-auto w-full max-w-3xl rounded-brand bg-neutral-100 shadow-100 dark:bg-brand-700'
              >
                <form
                  className='flex w-full flex-col gap-8 p-16'
                  onSubmit={(e) => {
                    e.preventDefault();
                    deleteInvoice(invoice);
                  }}
                >
                  <Dialog.Title
                    as='h2'
                    className='text-700 font-bold leading-[3.2rem] tracking-[-0.42px]'
                  >
                    Confirm Deletion
                  </Dialog.Title>

                  <Dialog.Description className='body-100 text-brand-300 dark:text-brand-100'>
                    <span>Are you sure you want to delete invoice</span>{' '}
                    <span className='font-bold uppercase'>
                      #{invoice?.tag}?
                    </span>{' '}
                    <span> This action cannot be undone.</span>
                  </Dialog.Description>

                  <div className='flex items-center gap-8'>
                    <button
                      type='button'
                      onClick={invoiceModal.close}
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
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export { DeleteInvoiceForm };
