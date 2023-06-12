'use client';

import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <ThemeProvider
      storageKey='int-theme'
      defaultTheme='system'
      enableSystem={true}
      attribute='data-mode'
    >
      <Toaster />
      {children}
    </ThemeProvider>
  );
};

export { Providers };
