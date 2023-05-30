import { Popover, Transition } from '@headlessui/react';
import { useSession } from '@src/lib';
import clsx from 'clsx';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { LogoutButton } from './logout-button';

interface Props {
  src?: string;
  name?: string;
}

const Avatar = ({ src, name }: Props) => {
  const session = useSession();

  return (
    <Popover className='relative'>
      {({ open }) => (
        <>
          <Popover.Button
            className={clsx(
              'w-12 cursor-pointer overflow-hidden rounded-full',
              open && 'rotate-[270deg]'
            )}
          >
            <img
              src={src || session?.photo || '/assets/images/image-avatar.jpg'}
              alt={'User'}
              // alt={user?.firstName || 'User'}
              width={80}
              height={80}
              placeholder='blur'
              className=''
            />
          </Popover.Button>

          <Transition
            as={React.Fragment}
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 translate-y-1'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in duration-150'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-1'
          >
            <Popover.Panel
              className={`absolute mt-8 w-full transform rounded-brand bg-neutral-100 shadow-200 transition-all duration-500 dark:bg-brand-700 dark:shadow-300`}
            >
              <div className='body-100 flex flex-col gap-6'>
                <Link to='/settings'>Settings</Link>
                <LogoutButton />
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export { Avatar };
