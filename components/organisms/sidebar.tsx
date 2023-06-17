import Link from 'next/link';
import { Avatar, NavLink, Text, ThemeButton } from '../atoms';

interface Props {
  userImage?: string | null;
}

const Sidebar = ({ userImage }: Props) => {
  return (
    <aside className='sticky top-0 z-50 md:p-4'>
      <div className='flex h-32 flex-row items-center justify-between overflow-hidden dark:bg-brand-600 max-sx:max-w-full md:min-h-[98vh] md:w-96 md:flex-col md:rounded-brand md:bg-brand-100'>
        <Link
          href={'/'}
          className='relative block h-full w-32 rounded-br-[2rem] rounded-tr-[2rem] bg-brand-500 before:absolute before:z-[2] before:h-full before:w-full before:bg-[url(/assets/logo.svg)] before:bg-center before:bg-no-repeat after:absolute after:bottom-0 after:h-1/2 after:w-full after:rounded-br-[2rem] after:rounded-tl-[2rem] after:bg-brand-200 md:hidden'
        >
          <span className='sr-only'>Return To The Home Page</span>
        </Link>

        <figure className='hidden items-center gap-4 border-[#494E6E] md:flex md:w-full md:border-b md:p-4'>
          <Link
            href={'/'}
            className='relative block h-full w-32 rounded-br-[2rem] rounded-tr-[2rem] bg-brand-500 before:absolute before:z-[2] before:h-full before:w-full before:bg-[url(/assets/logo.svg)] before:bg-center before:bg-no-repeat after:absolute after:bottom-0 after:h-1/2 after:w-full after:rounded-br-[2rem] after:rounded-tl-[2rem] after:bg-brand-200 md:h-32'
          >
            <span className='sr-only'>Return To The Home Page</span>
          </Link>

          <Text
            as='figcaption'
            className='text-[1.8rem] font-bold text-brand-900 dark:text-white'
          >
            Invoice Tracker
          </Text>
        </figure>

        <nav
          aria-label='Primary Navigation'
          className='hidden rounded-r-pill bg-brand-500 md:ml-2 md:mt-10 md:w-[95%]'
        >
          <NavLink
            href={'/invoices'}
            className="group flex items-center gap-6 px-2 py-4 text-500 font-bold leading-300 text-brand-400 transition-all ease-in-out aria-[current='page']:rounded-r-pill aria-[current='page']:bg-neutral-50 aria-[current='page']:!text-brand-500 hover:rounded-r-pill hover:bg-brand-500/10 active:rounded-r-pill active:bg-brand-500/10 dark:text-white dark:hover:bg-white dark:active:bg-white"
          >
            <span className='group-hover:text-brand-500 group-active:text-brand-500'>
              Invoices
            </span>
          </NavLink>
        </nav>

        <div className='flex flex-1 items-center justify-end pr-12 md:flex-col md:p-0 md:pb-12'>
          <ThemeButton />
        </div>

        <div className='grid h-full w-32 place-content-center border-l border-[#494E6E] md:h-32 md:w-full md:border-0 md:border-t'>
          <Avatar src={userImage} />
        </div>
      </div>
    </aside>
  );
};

export { Sidebar };
