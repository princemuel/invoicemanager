import { useRouter } from "next/router";
import { Portal } from "./portal";

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  ariaLabel?: string;
  className?: string;
}

export const Popup = ({ children, isOpen, ariaLabel, className }: Props) => {
  const router = useRouter();
  if (!isOpen) return null;

  return (
    <Portal wrapperId='modal'>
      <div
        className='bg-gray-600 fixed inset-0 overflow-y-auto bg-opacity-80'
        aria-labelledby={ariaLabel ?? "modal-title"}
        role='dialog'
        aria-modal='true'
        onClick={() => router.push("/")}
      ></div>
      <div className='pointer-events-none fixed inset-0 flex max-h-screen items-center justify-center overflow-auto'>
        <div
          className={`${className} bg-gray-200 pointer-events-auto max-h-screen p-4 md:rounded-xl`}
        >
          {/* This is where the modal content is rendered  */}
          {children}
        </div>
      </div>
    </Portal>
  );
};
