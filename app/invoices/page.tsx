import { fetchAllInvoices } from '@/app/actions/get-invoices';
import { InvoicesPageTemplate } from '@/components';
import { redirect } from 'next/navigation';

export default async function PageRoute() {
  const session = await getAuthSession();
  if (!session) redirect('/api/auth/signin?callbackUrl=/invoices');

  const invoices = await fetchAllInvoices(session?.user?.id);

  return (
    <main className='w-full'>
      <InvoicesPageTemplate invoices={invoices} />
    </main>
  );
}
