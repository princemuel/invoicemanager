import clsx from "clsx";
import { capitalize } from "helpers";

type IStatus = ["PENDING", "DRAFT", "PAID"];

type Props = {
  status?: IStatus[number];
  className?: string;
};

const StatusButton = ({ status, className }: Props) => {
  let colors: string;

  switch (status) {
    case "DRAFT":
      colors =
        "text-[#373B53] bg-[#373B53]/[0.06] dark:text-brand-100 dark:bg-brand-100/[0.06]";
      break;
    case "PENDING":
      colors = "text-[#FF8F00] bg-[#FF8F00]/[0.06]";
      break;
    case "PAID":
      colors = "text-[#33D69F] bg-[#33D69F]/[0.06]";
      break;
    default:
      throw new Error(
        "Invoice status must be one of 'DRAFT', 'PENDING' or 'PAID'"
      );
  }

  return (
    <button
      type='button'
      className={clsx(
        `body-100 flex items-center justify-center gap-3 rounded-brand font-bold`,
        colors,
        className
      )}
    >
      <span className={`inline-block h-3 w-3 rounded-full bg-current`}></span>
      <span>{capitalize(status)}</span>
    </button>
  );
};

export { StatusButton };
