import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthProvider, ModalProvider, ThemeProvider } from '../context';
import { router } from '../routes';
import { ToastProvider } from './toast';

const persister = createSyncStoragePersister({
  storage: window?.localStorage || null,
});

interface Props {}

const Providers = (props: Props) => {
  const client = React.useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          cacheTime: 1000 * 60 * 60 * 24, // 24 hours
          staleTime: 1000 * 60 * 1, // 1 min
          retry: 1,
          refetchOnMount: true,
          refetchOnReconnect: true,
          refetchOnWindowFocus: false,
        },
      },

      // configure global cache callbacks to show toast notifications
      mutationCache: new MutationCache({
        onSuccess: (data) => {
          //@ts-expect-error
          toast.success(data.message);
        },
        onError: (error) => {
          console.error('GLOBAL_ERROR', error);

          //  for (const err of error.response.errors) {
          //    toast.error(getErrorMessage(err));

          //  }
        },
      }),
    })
  );

  return (
    <QueryClientProvider client={client.current}>
      <HelmetProvider>
        <ThemeProvider>
          <AuthProvider>
            <ModalProvider>
              <ReactQueryDevtools
                position='bottom-right'
                initialIsOpen={false}
              />
              <ToastProvider />
              <RouterProvider router={router} />
            </ModalProvider>
          </AuthProvider>
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export { Providers };
