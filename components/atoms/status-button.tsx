import { capitalize, trim } from "helpers";

type IStatus = ["PENDING", "DRAFT", "PAID"];

type Props = {
  status: IStatus[number];
  className?: string;
};

const StatusButton = ({ status, className }: Props) => {
  let btnColors: string;
  let btnText: Props["status"];

  switch (status) {
    case "PENDING":
      btnColors = "text-[#FF8F00] bg-[#FF8F00]/[0.06]";
      btnText = "PENDING";
      break;
    case "DRAFT":
      btnColors =
        "text-[#373B53] bg-[#373B53]/[0.06] dark:text-brand-100 dark:bg-brand-100/[0.06]";
      btnText = "DRAFT";
      break;
    case "PAID":
      btnColors = "text-[#33D69F] bg-[#33D69F]/[0.06]";
      btnText = "PAID";
      break;
    default:
      throw new Error("Invoice status must be 'DRAFT', 'PENDING' or 'PAID'");
  }

  return (
    <button
      type='button'
      className={trim(
        `body-100 flex items-center justify-center gap-3 rounded-default font-bold ${btnColors} ${
          className || ""
        }`
      )}
    >
      <span className={`inline-block h-3 w-3 rounded-full bg-current`}></span>
      <span>{capitalize(btnText)}</span>
    </button>
  );
};

export { StatusButton };
