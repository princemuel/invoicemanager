'use client';

import ModalManager from '@/common/exported';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Toaster as ToastProvider } from 'react-hot-toast';

const GlobalProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextThemesProvider
      storageKey='THEME_MODE'
      defaultTheme='system'
      enableSystem={true}
      attribute='data-mode'
    >
      <ModalManager.Provider>
        <ToastProvider />
        {children}
      </ModalManager.Provider>
    </NextThemesProvider>
  );
};

export { GlobalProviders };

// ModalManager.register('my-modal-id', MyModal);
