'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import ToastManager from './toast-manager';
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
        {children}
        <ToastManager />
      </ModalManager.Provider>
    </NextThemesProvider>
  );
};

export { GlobalProviders };

// ModalManager.register('my-modal-id', MyModal);
