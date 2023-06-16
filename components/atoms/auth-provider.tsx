'use client';

import { cx } from 'cva';
import { signIn } from 'next-auth/react';
import type { IconType } from 'react-icons';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon?: IconType;
  provider: IProvider;
}

const Provider = ({ provider, icon: Icon }: Props) => {
  return (
    <button
      className={cx('flex items-center justify-center gap-4 text-500')}
      onClick={() => signIn(provider.id)}
    >
      {Icon && <Icon size={16} className='' />}
      <span>Continue with {provider.name}</span>
    </button>
  );
};

export { Provider };
