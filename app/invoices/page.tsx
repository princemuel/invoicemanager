import { InvoicesProvider } from '@/context';
import { cn } from '@/helpers';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { InvoicesTemplateMobile } from './invoices.mobile';

export default async function PageRoute() {
  const { getUser } = getKindeServerSession();

  const client = getUser();

  const invoices = Promise.resolve([] as InvoiceTypeSafe[]);

  return (
    <main aria-labelledby='heading' className='w-full'>
      <pre>{JSON.stringify(client)}</pre>
      <InvoicesProvider promise={invoices}>
        <div className={cn('mt-12 flex flex-col gap-12')}>
          <InvoicesTemplateMobile />
          {/* <InvoicesTemplateDesktop /> */}
        </div>
      </InvoicesProvider>
    </main>
  );
}
