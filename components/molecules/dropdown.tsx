'use client';

import { icons } from '@/common';
import { pluralize } from '@/lib';
import { Listbox, Transition } from '@headlessui/react';
import { Dispatch, Fragment, SetStateAction } from 'react';

interface Props {
  terms: Term[];
  selected: number;
  setSelected: Dispatch<SetStateAction<number>>;
}

interface Term {
  id: string;
  value: number;
}

const Dropdown = ({ terms, selected, setSelected }: Props) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className='relative mt-1'>
        <Listbox.Button
          className={`body-100 peer relative mt-4 flex w-full cursor-pointer items-center justify-between rounded-lg border border-brand-100 bg-neutral-100 px-8 py-6 text-left font-bold text-brand-900 outline-none hover:border-brand-500 focus:border-brand-500 dark:border-brand-600 dark:bg-brand-700 dark:text-neutral-100 dark:hover:border-brand-500 dark:focus:border-brand-500`}
          type='button'
          id='paymentTerms'
        >
          <span className='block truncate'>
            Net {selected} {pluralize('Day', selected)}
          </span>

          <span className='pointer-events-none'>
            <icons.arrow.down className='transform-gpu ui-open:-rotate-180' />
          </span>
        </Listbox.Button>

        <Transition
          as={Fragment}
          enter='transition-opacity ease-in duration-75'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-opacity ease-in duration-150'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Listbox.Options
            className={`absolute z-20 mt-8 w-full rounded-brand bg-neutral-100 shadow-200 transition-all duration-500 dark:bg-brand-700 dark:shadow-300`}
          >
            {terms?.map((term) => {
              return (
                <Listbox.Option
                  key={term.id}
                  className='body-100 divide-y divide-brand-100 p-8 font-bold text-brand-900 hover:text-brand-500 focus:text-brand-500 dark:divide-brand-600 dark:text-brand-100'
                  value={term.value}
                >
                  <span className='block truncate'>
                    Net {term.value} {pluralize('Day', term.value)}
                  </span>
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export { Dropdown };
