import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider, ModalProvider, ThemeProvider } from './context';
import './index.css';
// import { queryOptions } from './lib/client';
import { router } from './routes';

if (process.env.NODE_ENV === 'production') disableReactDevTools();

// const client = new QueryClient(queryOptions);
const client = new QueryClient();
const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <HelmetProvider>
        <ThemeProvider>
          <AuthProvider>
            <ModalProvider>
              <ReactQueryDevtools
                position='bottom-right'
                initialIsOpen={false}
              />
              <RouterProvider router={router} />
            </ModalProvider>
          </AuthProvider>
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
