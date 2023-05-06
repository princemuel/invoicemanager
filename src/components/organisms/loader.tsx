import { Text } from '../atoms';
import { AuthTemplate } from '../templates';

interface Props {}

const Loader = (props: Props) => {
  return (
    <AuthTemplate className=''>
      <div className='w-full max-w-[40rem] rounded-brand bg-neutral-100 p-16 shadow-100 dark:bg-brand-600 max-md:mt-24'>
        <div className='flex flex-col gap-12'>
          <header className='flex items-center justify-between gap-12'>
            <div className='relative block aspect-square w-32 rounded-br-[2rem] rounded-tr-[2rem] bg-brand-500 before:absolute before:z-[2] before:h-full before:w-full before:bg-[url(/assets/svgs/logo.svg)] before:bg-center before:bg-no-repeat after:absolute after:bottom-0 after:h-1/2 after:w-full after:rounded-br-[2rem] after:rounded-tl-[2rem] after:bg-brand-200'>
              <p className='sr-only'>Invoice mailer logo</p>
            </div>
            <Text as='h2' className='flex-1'>
              Invoice Mailer
            </Text>
          </header>

          <div className='aspect-square w-24 animate-spin self-center rounded-full border-8 border-t-brand-500' />
          <Text as='p' className='self-center text-700'>
            Loading...
          </Text>
        </div>
      </div>
    </AuthTemplate>
  );
};

export { Loader };
