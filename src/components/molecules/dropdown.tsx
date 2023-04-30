import { Listbox, Transition } from '@headlessui/react';
import { icons } from '@src/common';
import { pluralize } from '@src/helpers';
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
          className={`body-100 peer relative mt-4 flex w-full cursor-pointer items-center justify-between rounded-lg border border-brand-100 bg-neutral-100 px-8 py-6 text-left font-bold text-brand-900 outline-none focus:border-brand-500 hover:border-brand-500 dark:border-brand-600 dark:bg-brand-700 dark:text-neutral-100 dark:focus:border-brand-500 dark:hover:border-brand-500`}
          type='button'
          id='paymentTerms'
        >
          <span className='block truncate'>
            Net {selected} {pluralize('Day', selected)}
          </span>

          <span className='pointer-events-none'>
            <img
              src={icons.arrow.down}
              alt='select a payment term'
              className='transform-gpu ui-open:-rotate-180'
            />
          </span>
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Listbox.Options
            className={`absolute z-10 mt-8 w-full rounded-brand bg-neutral-100 shadow-200 transition-all duration-500 dark:bg-brand-700 dark:shadow-300`}
          >
            {terms?.map((term) => {
              return (
                <Listbox.Option
                  key={term.id}
                  className='body-100 border-t border-brand-100 p-8 font-bold text-brand-900 first:border-none focus:text-brand-500 hover:text-brand-500 dark:border-brand-600 dark:text-brand-100'
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
