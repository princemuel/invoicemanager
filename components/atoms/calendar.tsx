'use client';

import { cn } from '@/helpers';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { DayPicker } from 'react-day-picker';
import { buttonVariants } from './button';
import { icons } from '@/common';

type CalendarProps = React.ComponentProps<typeof DayPicker>;

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...restProps
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('px-5 py-4', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4 w-full',

        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',

        nav: 'space-x-1 flex items-center',
        nav_button: cn(buttonVariants()),
        nav_button_previous: '!absolute left-1',
        nav_button_next: '!absolute right-1',

        table: 'w-full border-collapse space-y-1',
        head_row: 'flex items-center justify-between',
        head_cell: cn(['text-400 leading-200 -tracking-200 font-medium']),

        tbody: 'flex flex-col gap-1',
        row: 'flex items-center justify-between',
        cell: cn(
          'relative',
          'text-400 leading-200 -tracking-200 font-medium  text-center',
          'focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-neutral-100 dark:[&:has([aria-selected])]:bg-neutral-800',
          restProps.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md'
        ),

        day: cn(
          'inline-grid place-content-center h-8 w-8 p-0',
          'text-400 leading-200 -tracking-200 font-medium ',
          'aria-selected:!text-brand-500 aria-selected:font-bold'
        ),
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected: 'text-brand-500',
        day_today: 'rounded-full bg-accent-200 !text-white',
        day_outside: 'text-brand-900/30 dark:text-brand-100/30',
        day_disabled: 'text-neutral-500 dark:text-neutral-400',
        day_range_middle:
          'aria-selected:bg-neutral-100 aria-selected:text-neutral-900 dark:aria-selected:bg-neutral-800 dark:aria-selected:text-neutral-50',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <icons.chevron.left />,
        IconRight: ({ ...props }) => <icons.chevron.right />,
      }}
      {...restProps}
    />
  );
}
Calendar.displayName = 'Calendar';
