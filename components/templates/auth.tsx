interface Props {
  className?: string;
  children: React.ReactNode;
}

const AuthTemplate = ({ children, className }: Props) => {
  return (
    <section className={cx('', className)}>
      <div className='flex h-full items-center justify-center px-8'>
        {children}
      </div>
    </section>
  );
};

export { AuthTemplate };
