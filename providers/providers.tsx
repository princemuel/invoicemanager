'use client';

import NiceModal from '@ebay/nice-modal-react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <ThemeProvider
      storageKey='THEME_MODE'
      defaultTheme='system'
      enableSystem={true}
      attribute='data-mode'
    >
      <NiceModal.Provider>
        <Toaster />
        {children}
      </NiceModal.Provider>
    </ThemeProvider>
  );
}
