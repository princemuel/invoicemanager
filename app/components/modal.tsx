import { tw } from "@/helpers/utils";
import { Dialog as HeadlessDialog } from "@headlessui/react";
import type { VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { text } from "./text";

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

type TextProps = {
  children: React.ReactNode;
  className?: string;
} & VariantProps<typeof text>;

const ModalTitle = ({ className, children, ...props }: TextProps) => {
  return (
    <HeadlessDialog.Title as="h2" className={tw(text({ ...props }), className)}>
      {children}
    </HeadlessDialog.Title>
  );
};

const ModalDescription = ({ className, children, ...props }: TextProps) => {
  return (
    <HeadlessDialog.Description className={tw(text({ ...props }), className)}>
      {children}
    </HeadlessDialog.Description>
  );
};

ModalFooter.displayName = "ModalFooter";

export { ModalDescription, ModalFooter, ModalHeader, ModalTitle };
