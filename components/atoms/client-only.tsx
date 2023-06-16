'use client';

import * as React from 'react';

interface Props {
  children: React.ReactNode;
}

export const ClientOnly = ({ children }: Props) => {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
    return () => {
      setHasMounted(false);
    };
  }, []);

  if (!hasMounted) return null;

  return <React.Fragment>{children}</React.Fragment>;
};
