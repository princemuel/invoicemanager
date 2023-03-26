import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import { ModalProvider, ThemeProvider } from './context';
import './index.css';
import { queryOptions } from './lib/client';
import { router } from './routes';

const queryClient = new QueryClient(queryOptions);
const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <ModalProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </ModalProvider>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);
