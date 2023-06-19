import { capitalize } from '@/lib';
import { cx } from 'cva';

interface Props {
  status?: string | null;
  className?: string;
}

const StatusButton = ({ status = 'PENDING', className }: Props) => {
  let classes: string;

  switch (status) {
    case 'DRAFT':
      classes =
        'text-[#373B53] bg-[#373B53]/[0.06] dark:text-brand-100 dark:bg-brand-100/[0.06]';
      break;
    case 'PENDING':
      classes = 'text-[#FF8F00] bg-[#FF8F00]/[0.06]';
      break;
    case 'PAID':
      classes = 'text-[#33D69F] bg-[#33D69F]/[0.06]';
      break;
    default:
      throw new Error(
        `This invoice's status is ${typeof status}. It must be one of 'DRAFT', 'PENDING' or 'PAID'`
      );
  }

  return (
    <button
      type='button'
      className={cx(
        `body-100 flex items-center justify-center gap-3 rounded-brand font-bold`,
        classes,
        className
      )}
    >
      <span className={`inline-block h-3 w-3 rounded-full bg-current`}></span>
      <span>{capitalize(status)}</span>
    </button>
  );
};

export { StatusButton };
