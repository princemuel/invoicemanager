'use client';

import { Dialog, Transition } from '@headlessui/react';
import { cx } from 'cva';
import React, { Fragment } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';

interface Props<T extends FieldValues> {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  onSubmit: any;
  methods: UseFormReturn<T, any, undefined>;
}

export const BaseModal = <T extends FieldValues>({
  show,
  onClose,
  className,
  children,
  onSubmit,
  methods,
}: Props<T>) => {
  return (
    <Transition show={show} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-50 font-accent'
        onClose={() => onClose()}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div
            className='fixed inset-0 bg-neutral-900 bg-opacity-25 '
            aria-hidden='true'
          />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-8'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel
                as='div'
                className={cx(
                  'relative w-full transform rounded-brand bg-neutral-100 shadow-xl transition-all dark:bg-brand-600',
                  'max-w-2xl',
                  className
                )}
              >
                <FormProvider {...methods}>
                  <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className='flex w-full flex-col gap-10 p-[3.2rem]'
                  >
                    {children}
                  </form>
                </FormProvider>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
