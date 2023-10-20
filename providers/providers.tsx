'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Toaster as ToastProvider } from 'react-hot-toast';
import ModalManager from './modal-manager';

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
