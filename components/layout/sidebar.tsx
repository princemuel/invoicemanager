import { ThemeButton } from 'components/atoms';
import { PLACEHOLDER_IMAGE } from 'helpers';
import Image from 'next/future/image';
import Link from 'next/link';

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <aside className='flex h-32 flex-row items-center justify-between bg-primary-600 max-sm:max-w-full md:min-h-screen md:w-40 md:flex-col md:rounded-tr-[2rem] '>
      <Link href={'/'} passHref>
        <a className='relative block h-full w-32 rounded-tr-[2rem] rounded-br-[2rem] bg-primary-500 before:absolute before:z-[2] before:h-full before:w-full before:bg-[url(/assets/svgs/logo.svg)] before:bg-center before:bg-no-repeat after:absolute after:bottom-0 after:h-1/2 after:w-full after:rounded-br-[2rem] after:rounded-tl-[2rem] after:bg-primary-200 md:h-40 md:w-full'>
          <span className='sr-only'>Return To The Home Page</span>
        </a>
      </Link>

      <div className='flex flex-1 items-center justify-end pr-12 md:flex-col md:p-0 md:pb-12'>
        <ThemeButton />
      </div>

      <div className='grid h-full w-40 place-content-center border-l border-[#494E6E] md:h-32 md:w-full md:border-0 md:border-t'>
        <figure className='w-12 overflow-hidden rounded-full'>
          <Image
            src={'/assets/images/image-avatar.jpg'}
            alt={'Your Profile Picture'}
            width={80}
            height={80}
            placeholder='blur'
            blurDataURL={PLACEHOLDER_IMAGE}
            className=''
          />
        </figure>
      </div>
    </aside>
  );
};

export { Sidebar };
