'use client';

import { icons } from '@/common';
import { Listbox } from '@headlessui/react';

interface Props {}

export function FilterForm(props: Props) {
  return (
    <Listbox by={'id'} multiple>
      <div className='relative mt-0.5 flex w-40 max-w-[12.5rem] flex-col'>
        <Listbox.Button className=''>
          <p className='block truncate'>
            {/* {isWide ? `Filter by status` : `Filter`} */}
            Filter by status
          </p>

          <span className='pointer-events-none'>
            <icons.chevron.down className='transform-gpu ui-open:-rotate-180' />
          </span>
        </Listbox.Button>
      </div>
    </Listbox>
  );
}
