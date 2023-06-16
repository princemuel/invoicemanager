import { cx } from 'cva';
import type { ClientSafeProvider } from 'next-auth/react';
import { getProviders } from 'next-auth/react';

interface Props {
  className?: string;
  children: (filtered: ClientSafeProvider[]) => React.ReactNode;
}

export async function ProviderButtons({ className, children }: Props) {
  const providers = await getProviders();

  const filtered = Object.values(providers || {}).filter((provider) => {
    // hack!! just to get github, google and omit credentials
    return provider?.name?.toLowerCase().includes('g');
  });

  console.log('FILTERED', filtered);
  console.log('FILTERED', providers);
  return (
    <section className={cx('flex w-full flex-col gap-6', className)}>
      {children?.(filtered)}
    </section>
  );
}
