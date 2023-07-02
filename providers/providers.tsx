'use client';

import { ThemeProvider } from 'next-themes';
import * as React from 'react';
import { Toaster } from 'react-hot-toast';
import { ModalProvider } from './modals';
interface Props {
  children: React.ReactNode;
  userId: string;
}

const Providers = ({ children, userId }: Props) => {
  return (
    <ThemeProvider
      storageKey='int-theme'
      defaultTheme='system'
      enableSystem={true}
      attribute='data-mode'
    >
      <Toaster />
      <ModalProvider userId={userId}>{children}</ModalProvider>
    </ThemeProvider>
  );
};

export { Providers };
