import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Dialog as HeadlessDialog, Transition } from "@headlessui/react";
import { Form, useNavigation } from "@remix-run/react";
import { Fragment, useEffect } from "react";
import { Button } from "./button";
import {
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "./modal";

type Props = {
  invoiceId: string;
};

const DeleteInvoiceModal = NiceModal.create<Props>(({ invoiceId }) => {
  const modal = useModal();
  const { state } = useNavigation();

  useEffect(() => {
    if (state === "loading") modal.hide();
  }, [modal, state]);

  return (
    <Transition show={modal.visible} as={Fragment}>
      <HeadlessDialog as="div" className="relative z-50" onClose={modal.remove}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
          />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Form
            method="POST"
            action={`invoices/${invoiceId}/delete`}
            className="fixed inset-0 flex items-center justify-center p-4 md:p-8"
          >
            <HeadlessDialog.Panel className="mx-auto max-h-[stretch] w-full max-w-md overflow-y-auto rounded-md bg-white dark:bg-brand-700">
              <section className="w-full p-6 md:p-8">
                <div className="flex flex-col gap-6">
                  <ModalHeader>
                    <ModalTitle size="xl" weight="bold">
                      Confirm Deletion
                    </ModalTitle>
                  </ModalHeader>

                  <ModalDescription className="text-brand-400 dark:text-white">
                    Are you sure you want to delete invoice{" "}
                    <span className="uppercase">#{invoiceId}</span>? This action
                    cannot be undone.
                  </ModalDescription>

                  <ModalFooter className="flex-row-reverse md:flex-row-reverse">
                    <Button type="submit" variant="destructive">
                      Delete
                    </Button>

                    <Button variant="soft" onClick={modal.hide}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </div>
              </section>
            </HeadlessDialog.Panel>
          </Form>
        </Transition.Child>
      </HeadlessDialog>
    </Transition>
  );
});

export default DeleteInvoiceModal;
