import { Avatar, Logo, ThemeToggle } from '../atoms';

export function Sidebar() {
  return (
    <aside className='sticky top-0 z-50 flex h-20 flex-row items-center justify-between bg-brand-600 max-sx:max-w-full md:min-h-screen md:w-24 md:flex-col md:rounded-tr-[1.25rem]'>
      <Logo />

      <div className='flex flex-1 items-center justify-end pr-7 md:flex-col md:p-0 md:pb-7'>
        <ThemeToggle />
      </div>

      <div className='grid h-full w-20 place-content-center border-l border-[#494E6E] md:h-20 md:w-full md:border-0 md:border-t'>
        <Avatar />
      </div>
    </aside>
  );
}
