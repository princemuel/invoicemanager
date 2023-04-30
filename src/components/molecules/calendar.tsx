import { Transition } from '@headlessui/react';
import { icons } from '@src/common';
import { DateTime, datetime } from '@src/helpers';
import clsx from 'clsx';
import { Dayjs } from 'dayjs';
import * as React from 'react';

interface Props {
  title: string;
  disabled?: boolean;
  selectedDate: Dayjs;
  setSelectedDate: React.Dispatch<React.SetStateAction<Dayjs>>;
  shouldOpen: boolean;
  setShouldOpen: React.DispatchWithoutAction;
}

const Calendar = ({
  title,
  disabled,
  shouldOpen,
  setShouldOpen,
  selectedDate,
  setSelectedDate,
}: Props) => {
  return (
    <React.Fragment>
      <label
        htmlFor='updatedAt'
        className={clsx(
          'body-100 block',
          disabled
            ? 'text-brand-400/50 dark:text-brand-100/50'
            : 'text-brand-400 dark:text-brand-300'
        )}
      >
        {title}
      </label>

      <div className='relative mt-1'>
        <button
          className={clsx(
            `body-100 peer relative mt-4 flex w-full cursor-pointer items-center justify-between rounded-lg border bg-neutral-100 px-8 py-6 text-left font-bold outline-none focus:border-brand-500 hover:border-brand-500 dark:border-brand-600 dark:bg-brand-700 dark:focus:border-brand-500 dark:hover:border-brand-500`,
            disabled
              ? 'border-brand-100/50 text-brand-900/50 dark:text-brand-100/50'
              : 'border-brand-100 text-brand-900 dark:text-neutral-100'
          )}
          type='button'
          id='updatedAt'
          aria-controls='datetime'
          onClick={() => void (!disabled && setShouldOpen())}
        >
          <span className='block truncate'>
            {datetime.toDateString(selectedDate)}
          </span>

          <span className='pointer-events-none'>
            <img
              src={icons.calendar}
              alt='select an invoice issue date'
              className=''
            />
          </span>
        </button>

        {!disabled && (
          <Transition
            as={React.Fragment}
            show={shouldOpen}
            enter='transition-opacity duration-75'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity duration-150'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div
              id='datetime'
              className='absolute z-[5] mt-8 flex w-full flex-col gap-8 rounded-brand bg-neutral-100 p-8 shadow-200 transition-all duration-500 dark:bg-brand-700 dark:shadow-300'
            >
              <div className='flex items-center justify-around'>
                <button
                  type='button'
                  onClick={() => {
                    setSelectedDate(datetime.prevMonth(selectedDate));
                  }}
                  className='grid place-content-center'
                >
                  <img src={icons.arrow.left} alt={''} />
                  <span className='sr-only'>Previous Month</span>
                </button>

                <time
                  dateTime={selectedDate.toISOString()}
                  className='body-100 flex items-center gap-2 font-bold text-brand-900 dark:text-neutral-100'
                >
                  <span className=''>
                    {DateTime.MONTHS[selectedDate.month()]}
                  </span>
                  <span className=''>{selectedDate.year()}</span>
                </time>

                <button
                  type='button'
                  onClick={() => {
                    setSelectedDate(datetime.nextMonth(selectedDate));
                  }}
                  className='grid place-content-center'
                >
                  <img src={icons.arrow.right} alt={''} />
                  <span className='sr-only'>Next Month</span>
                </button>
              </div>

              <ul className='grid grid-cols-7'>
                {DateTime.DAYS.map((day) => {
                  return (
                    <li
                      key={day}
                      className='body-100 grid place-content-center p-2 font-bold'
                    >
                      <span className='text-brand-900 dark:text-neutral-100'>
                        {day}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <ul className={'grid grid-cols-7 gap-2'} role='listbox'>
                {datetime
                  .generate(selectedDate.month(), selectedDate.year())
                  .map(({ id, date, isCurrentMonth, isToday }) => {
                    return (
                      <li
                        key={id}
                        className={clsx(
                          'body-100 grid place-content-center p-2',
                          isToday &&
                            'rounded-full bg-accent-200 !text-neutral-100',
                          !isCurrentMonth &&
                            'text-brand-900/30 dark:text-brand-100/30',

                          DateTime.isEqual(selectedDate, date) &&
                            'text-brand-500'
                        )}
                        role='option'
                        onClick={() => {
                          setSelectedDate(date);
                        }}
                        aria-current={
                          isToday
                            ? 'date'
                            : DateTime.isEqual(selectedDate, date)
                            ? 'true'
                            : 'false'
                        }
                      >
                        <span className={clsx()}>{date.date()}</span>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </Transition>
        )}
      </div>
    </React.Fragment>
  );
};

export { Calendar };
