import Link from 'next/link';

interface Props {}

const Logo = (props: Props) => {
  return (
    <Link
      href={'/'}
      className='relative block h-full w-20 rounded-br-[1.25rem] rounded-tr-[1.25rem] bg-brand-500 before:absolute before:z-[2] before:h-full before:w-full before:bg-[url(/assets/logo.svg)] before:bg-center before:bg-no-repeat after:absolute after:bottom-0 after:h-1/2 after:w-full after:rounded-br-[1.25rem] after:rounded-tl-[1.25rem] after:bg-brand-200 md:h-24 md:w-full'
    >
      <span className='sr-only'>Return To The Home Page</span>
    </Link>
  );
};

export { Logo };
