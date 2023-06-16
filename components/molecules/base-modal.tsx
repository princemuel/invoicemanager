'use client';

import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { FormProvider } from 'react-hook-form';

interface Props {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  onSubmit: any;
  methods: any;
}

export const BaseModal = ({
  show,
  onClose,
  children,
  onSubmit,
  methods,
}: Props) => {
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
                className='w-full max-w-2xl transform rounded-brand bg-neutral-100 align-middle shadow-xl transition-all dark:bg-brand-600'
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
