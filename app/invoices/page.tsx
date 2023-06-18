import { InvoicesPageTemplate } from '@/components';
import { fetchAllInvoices } from '../lib/get-invoices';

export default async function PageRoute() {
  const invoices = await fetchAllInvoices();

  return (
    <main className='w-full'>
      <InvoicesPageTemplate invoices={invoices || []} />
    </main>
  );
}
