'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useFetchStatus } from './use-fetch-status';

export const useApiState = () => {
  const router = useRouter();

  const [isPending, startTransition] = React.useTransition();
  const [fetchStatus, setFetchStatus] = useFetchStatus('idle');
  const controllerRef = React.useRef<AbortController>();

  return React.useMemo(() => {
    const isMutating = fetchStatus === 'pending' || isPending;
    return {
      router,
      isMutating,
      fetchStatus,
      controllerRef,
      setFetchStatus,
      startTransition,
    } as const;
  }, [fetchStatus, isPending, router, setFetchStatus]);
};
