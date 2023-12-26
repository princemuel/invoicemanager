import { tw } from "@/helpers/utils";
import GlobalModal, { useModal } from "@ebay/nice-modal-react";
import { Dialog as HeadlessDialog, Transition } from "@headlessui/react";
import type { VariantProps } from "class-variance-authority";
import { Fragment, forwardRef } from "react";
import { text } from "./text";

type Props = {
  children: React.ReactNode;
  focusRef?: React.RefObject<HTMLElement>;
};

const BaseModal = GlobalModal.create<Props>(({ children, focusRef }) => {
  const modal = useModal();

  return (
    <Transition show={modal.visible} as={Fragment}>
      <HeadlessDialog
        as="div"
        initialFocus={focusRef}
        className="relative z-50"
        onClose={modal.hide}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {/* The backdrop, rendered as a fixed sibling to the panel container */}
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
          <div className="fixed inset-0 flex items-center justify-center p-4 md:p-8">
            <HeadlessDialog.Panel className="mx-auto max-h-[stretch] w-full max-w-md overflow-y-auto rounded-md bg-white dark:bg-brand-700">
              <section className="w-full p-6 md:p-8">{children}</section>
            </HeadlessDialog.Panel>
          </div>
        </Transition.Child>
      </HeadlessDialog>
    </Transition>
  );
});

const ModalHeader = forwardRef(({ className, ...rest }, forwardedRef) => {
  return (
    <header
      className={tw("flex w-full items-start gap-5", className)}
      {...rest}
      ref={forwardedRef}
    />
  );
}) as ForwardRefComponent<"header", {}>;
ModalHeader.displayName = "ModalHeader";

const ModalFooter = forwardRef(({ className, ...rest }, forwardedRef) => {
  return (
    <footer
      className={tw(
        "flex w-full flex-col items-center gap-4 md:flex-row",
        className,
      )}
      {...rest}
      ref={forwardedRef}
    />
  );
}) as ForwardRefComponent<"footer", {}>;
ModalFooter.displayName = "ModalFooter";

const ModalTitle = ({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant?: VariantProps<typeof text>["variant"];
}) => {
  return (
    <HeadlessDialog.Title as="h2" className={text({ size: "md", variant })}>
      {children}
    </HeadlessDialog.Title>
  );
};

const ModalDescription = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeadlessDialog.Description
      className={text({ variant: "primary", size: "base" })}
    >
      {children}
    </HeadlessDialog.Description>
  );
};

ModalFooter.displayName = "ModalFooter";

export { BaseModal, ModalDescription, ModalFooter, ModalHeader, ModalTitle };
