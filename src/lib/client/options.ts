import { QueryClientConfig } from '@tanstack/react-query';

export const queryOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      refetchOnReconnect: true,
      // refetchOnReconnect: false,
      // refetchOnWindowFocus: false,
    },
  },
};
