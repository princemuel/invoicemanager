'use client';

import { cn } from '@/helpers';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { DayPicker } from 'react-day-picker';
import { buttonVariants } from './button';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...restProps
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({}),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'text-neutral-500 rounded-md w-8 font-normal text-[0.8rem] dark:text-neutral-400',
        row: 'flex w-full mt-2',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-neutral-100 dark:[&:has([aria-selected])]:bg-neutral-800',
          restProps.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md'
        ),
        day: cn(
          buttonVariants({}),
          'h-8 w-8 p-0 font-normal aria-selected:opacity-100'
        ),
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-neutral-900 text-neutral-50 hover:bg-neutral-900 hover:text-neutral-50 focus:bg-neutral-900 focus:text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50 dark:hover:text-neutral-900 dark:focus:bg-neutral-50 dark:focus:text-neutral-900',
        day_today:
          'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50',
        day_outside: 'text-neutral-500 opacity-50 dark:text-neutral-400',
        day_disabled: 'text-neutral-500 opacity-50 dark:text-neutral-400',
        day_range_middle:
          'aria-selected:bg-neutral-100 aria-selected:text-neutral-900 dark:aria-selected:bg-neutral-800 dark:aria-selected:text-neutral-50',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeftIcon className='h-4 w-4' />,
        IconRight: ({ ...props }) => <ChevronRightIcon className='h-4 w-4' />,
      }}
      {...restProps}
    />
  );
}
Calendar.displayName = 'Calendar';
