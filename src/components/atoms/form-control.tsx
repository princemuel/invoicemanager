import clsx from 'clsx';

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

const FormControl = ({ className, children, ...rest }: Props) => {
  return (
    <div className={clsx('flex flex-col-reverse gap-4', className)} {...rest}>
      {children}
    </div>
  );
};

export { FormControl };
