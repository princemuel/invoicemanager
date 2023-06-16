'use client';

import { useLoginModal } from '@/lib';

export const HomeTemplate = () => {
  const login = useLoginModal();

  return (
    <div className='fixed inset-0 flex items-center justify-center'>
      <button
        type='button'
        onClick={login.open}
        className='rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
      >
        Open dialog
      </button>
    </div>
  );
};
