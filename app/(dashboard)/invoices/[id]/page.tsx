import { getInvoiceById } from '@/app/lib/get-invoice-by-id';
import { fetchAuthUser } from '@/app/lib/get-user';
import { ClientOnly, EmptyState, InvoiceTemplate } from '@/components';

async function PageRoute({ params }: { params: IParams }) {
  const user = await fetchAuthUser();

  if (!user)
    return (
      <ClientOnly>
        <EmptyState user={user} />
      </ClientOnly>
    );

  const invoice = await getInvoiceById(params);
  if (!invoice) return <EmptyState user={user?.email} />;

  return (
    <main className='w-full'>
      <InvoiceTemplate invoice={invoice} />;
    </main>
  );
}

export default PageRoute;
