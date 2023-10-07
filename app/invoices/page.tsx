import { InvoicesProvider } from '@/context';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { InvoicesTemplate } from './invoices';

export default async function PageRoute() {
  const { getUser } = getKindeServerSession();

  const client = getUser();

  const invoices = Promise.resolve([] as InvoiceTypeSafe[]);

  return (
    <main aria-labelledby='heading' className='w-full'>
      <pre>{JSON.stringify(client)}</pre>
      <InvoicesProvider promise={invoices}>
        <InvoicesTemplate />
      </InvoicesProvider>
    </main>
  );
}
