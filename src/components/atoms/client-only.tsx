'use client';

import { useEffect, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

export const ClientOnly = ({ children }: Props) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true), []);

  return !hasMounted ? null : children;
};
