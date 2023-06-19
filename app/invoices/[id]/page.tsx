import { getInvoiceById } from '@/app/lib/get-invoice-by-id';
import { EmptyState, InvoiceTemplate } from '@/components';

async function PageRoute({ params }: { params: IParams }) {
  const invoice = await getInvoiceById(params);

  if (!invoice) return <EmptyState />;

  return (
    <main className='w-full'>
      <InvoiceTemplate invoice={invoice} />;
    </main>
  );
}

export default PageRoute;
