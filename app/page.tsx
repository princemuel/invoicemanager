import { ClientOnly, EmptyState, HomeTemplate } from '@/components';
import { fetchAuthUser } from './lib/get-user';

export default async function Home() {
  const user = await fetchAuthUser();

  if (!user)
    return (
      <ClientOnly>
        <EmptyState user={user} />
      </ClientOnly>
    );

  return (
    <main className='relative min-h-screen flex-1'>
      <HomeTemplate />
    </main>
  );
}
