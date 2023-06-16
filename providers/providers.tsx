'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'next-themes';
import * as React from 'react';
import { Toaster } from 'react-hot-toast';
import { ModalProvider } from './modals';
interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        storageKey='int-theme'
        defaultTheme='system'
        enableSystem={true}
        attribute='data-mode'
      >
        <Toaster />
        <ModalProvider>{children}</ModalProvider>
        <ReactQueryDevtools
          toggleButtonProps={{
            style: { width: '1rem', aspectRatio: 1, borderRadius: '50%' },
          }}
          position='bottom-right'
          initialIsOpen={false}
        />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export { Providers };
