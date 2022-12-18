import Link from 'next/link';

type Props = {};

const Logo = (props: Props) => {
  return (
    <Link href={'/'} passHref>
      <a className='relative block h-full w-32 rounded-tr-[2rem] rounded-br-[2rem] bg-primary-500 before:absolute before:z-[2] before:h-full before:w-full before:bg-[url(/assets/svgs/logo.svg)] before:bg-center before:bg-no-repeat after:absolute after:bottom-0 after:h-1/2 after:w-full after:rounded-br-[2rem] after:rounded-tl-[2rem] after:bg-primary-200 md:h-40 md:w-full'>
        <span className='sr-only'>Return To The Home Page</span>
      </a>
    </Link>
  );
};

export { Logo };
