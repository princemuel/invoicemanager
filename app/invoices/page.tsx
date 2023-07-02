import { ClientOnly, EmptyState, InvoicesPageTemplate } from '@/components';
import { fetchAllInvoices } from '../lib/get-invoices';
import { fetchAuthUser } from '../lib/get-user';

export default async function PageRoute() {
  const user = await fetchAuthUser();

  if (!user)
    return (
      <ClientOnly>
        <EmptyState user={user} />
      </ClientOnly>
    );

  const invoices = await fetchAllInvoices();

  return (
    <main className='w-full'>
      <InvoicesPageTemplate invoices={invoices} />
    </main>
  );
}
