import { EmptyState } from '@/components';

export default async function InvoicesPage() {
  const invoices = null;

  if (!invoices) return <EmptyState />;

  return (
    <div>
      <h1>Invoices Page</h1>
    </div>
  );
}
