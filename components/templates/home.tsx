'use client';

import { useLoginModal } from '@/lib';
import Link from 'next/link';

export const HomeTemplate = () => {
  const login = useLoginModal();

  return (
    <div className=''>
      <button
        type='button'
        onClick={login.open}
        className='rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
      >
        Open dialog
      </button>

      <Link href={'/invoices'}>Invoices</Link>
    </div>
  );
};
