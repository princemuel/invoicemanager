'use client';

import { useCreateInvoiceModal, useLoginModal } from '@/lib';
import Image from 'next/image';
import { Text } from './text';

interface Props {
  user?: string | null;
}

const EmptyState = ({ user }: Props) => {
  const login = useLoginModal();
  const invoiceModal = useCreateInvoiceModal();

  return (
    <section className='flex w-full items-center justify-center'>
      <article className='flex flex-col items-center gap-20 text-center'>
        <Image
          src={'/assets/illustration-empty.svg'}
          width='242'
          height='200'
          className='w-full'
          alt={'Invoices List Empty'}
        />
        <div className='flex flex-col items-center gap-8 px-16'>
          <Text as='h2' className=''>
            {user ? 'There is nothing here' : 'You are not logged in'}
          </Text>
          <Text as='p' className='max-w-[22rem]'>
            {user ? (
              <button type='button' onClick={invoiceModal.open}>
                Please
                <em className='font-bold underline underline-offset-2'>
                  create a new Invoice
                </em>
                to get started
              </button>
            ) : (
              <button className='underline' onClick={login.open}>
                Please login to view your invoices
              </button>
            )}
          </Text>
        </div>
      </article>
    </section>
  );
};

export { EmptyState };
