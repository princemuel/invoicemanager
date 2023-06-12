'use client';

import { cx } from 'cva';
import type { ClientSafeProvider } from 'next-auth/react';
import { signIn } from 'next-auth/react';

interface Props {
  provider: ClientSafeProvider;
}

const Provider = ({ provider }: Props) => {
  return (
    <div className={cx('')}>
      <button onClick={() => signIn(provider.id)}>
        <span>Sign in with {provider.name}</span>
      </button>
    </div>
  );
};

export { Provider };
