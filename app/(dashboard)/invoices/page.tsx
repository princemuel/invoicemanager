import { fetchAllInvoices } from '@/app/lib/get-invoices';
import { fetchAuthUser } from '@/app/lib/get-user';
import { ClientOnly, EmptyState, InvoicesPageTemplate } from '@/components';

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
