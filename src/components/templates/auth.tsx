import clsx from 'clsx';

interface Props {
  className?: string;
  children: React.ReactNode;
}

const AuthTemplate = ({ children, className }: Props) => {
  return (
    <section
      className={clsx(
        'flex h-full items-center justify-center px-8',
        className
      )}
    >
      {children}
    </section>
  );
};

export { AuthTemplate };
