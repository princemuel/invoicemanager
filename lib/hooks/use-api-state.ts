'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

export const useApiState = () => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  const isMutating = isFetching || isPending;

  return { router, isMutating, setIsFetching, startTransition };
};
