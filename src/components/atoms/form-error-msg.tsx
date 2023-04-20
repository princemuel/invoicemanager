import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  > {
  message?: string;
}

const FormErrorText = ({
  id = '',
  message,
  className,
  children,
  ...rest
}: Props) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <span
      role='alert'
      id={`errors-${id}`}
      aria-live='assertive'
      className={clsx(
        'text-200 font-semibold leading-200 tracking-[-0.21px]',
        className
      )}
      {...rest}
    >
      {children || message || `${errors?.[id]?.message || ''}`}
    </span>
  );
};

export { FormErrorText };
