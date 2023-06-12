import { Popover } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import * as React from 'react';
import { LogoutButton } from '../atoms';

interface Props {}

const UserMenu = (props: Props) => {
  return (
    <Popover className='relative'>
      {({ open }) => (
        /* Use the `open` state to conditionally change the direction of the chevron icon. */
        <React.Fragment>
          <Popover.Button>
            Solutions
            <ChevronDownIcon className={open ? 'rotate-180 transform' : ''} />
          </Popover.Button>

          <Popover.Panel className='absolute z-10'>
            <a href='/insights'>Insights</a>
            <a href='/automations'>Automations</a>
            <a href='/reports'>Reports</a>
            <LogoutButton />
          </Popover.Panel>
        </React.Fragment>
      )}
    </Popover>
  );
};
export { UserMenu };
