import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { client } from '../client';
import { useAuthDispatch } from '../context';
import { useGetInvoicesQuery, useGetUserQuery } from '../hooks';

const Prefetch = () => {
  const queryClient = useQueryClient();

  const dispatch = useAuthDispatch();

  const prefetchUser = useCallback(async () => {
    await queryClient.prefetchQuery({
      queryKey: useGetUserQuery.getKey(),
      queryFn: useGetUserQuery.fetcher(client),
    });
  }, [queryClient]);
  const prefetchInvoices = useCallback(async () => {
    await queryClient.prefetchQuery({
      queryKey: useGetInvoicesQuery.getKey(),
      queryFn: useGetInvoicesQuery.fetcher(client),
    });
  }, [queryClient]);

  useEffect(() => {
    async function init() {
      await prefetchUser();

      await prefetchInvoices();

      dispatch('auth/addToken');
      dispatch('auth/addUser');
    }

    init();
  }, [prefetchInvoices, prefetchUser, dispatch]);

  return <Outlet />;
};
export { Prefetch };
