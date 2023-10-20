'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';

export const useApiState = () => {
  const router = useRouter();

  const [isPending, startTransition] = React.useTransition();
  const [isFetching, setIsFetching] = React.useState(false);

  const isMutating = isFetching || isPending;

  return React.useMemo(
    () => ({ router, isMutating, setIsFetching, startTransition }) as const,
    [isMutating, router]
  );
};
