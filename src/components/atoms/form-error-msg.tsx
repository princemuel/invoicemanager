import clsx from 'clsx';

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  > {}

const FormErrorText = ({ className, children, id, ...rest }: Props) => {
  return (
    <span
      role='alert'
      className={clsx(
        'text-200 font-semibold leading-200 tracking-[-0.21px]',
        className
      )}
      id={`errors-${id}`}
      aria-live='assertive'
      {...rest}
    >
      {children}
    </span>
  );
};

export { FormErrorText };
