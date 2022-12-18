import { trim } from 'helpers';

type IStatus = ['pending', 'draft', 'paid'];

type Props = {
  status: IStatus[number] | string;
  className?: string;
};

const StatusButton = ({ status, className }: Props) => {
  let btnColors: string;
  let btnText: Capitalize<Props['status']>;

  switch (status) {
    case 'pending':
      btnColors = 'text-[#FF8F00] bg-[#FF8F00]/[0.06]';
      btnText = 'Pending';
      break;
    case 'draft':
      btnColors =
        'text-[#373B53] bg-[#373B53]/[0.06] dark:text-primary-100 dark:bg-primary-100/[0.06]';
      btnText = 'Draft';
      break;
    case 'paid':
      btnColors = 'text-[#33D69F] bg-[#33D69F]/[0.06]';
      btnText = 'Paid';
      break;
    default:
      throw new Error("Invoice status must be 'draft', 'pending' or 'paid'");
  }

  return (
    <button
      type='button'
      className={trim(
        `body-100 flex items-center justify-center gap-3 rounded-lg py-5 font-bold ${btnColors} ${
          className || ''
        }`
      )}
    >
      <span className={`inline-block  h-3 w-3 rounded-full bg-current`}></span>
      <span>{btnText}</span>
    </button>
  );
};

export { StatusButton };
