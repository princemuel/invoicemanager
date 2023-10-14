import { InvoicesProvider } from '@/context';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { InvoicesTemplateDesktop } from './invoices.desktop';
import { InvoicesTemplateMobile } from './invoices.mobile';

export default async function PageRoute() {
  const { getUser } = getKindeServerSession();

  const client = getUser();

  const invoices = Promise.resolve([] as InvoiceTypeSafe[]);

  return (
    <main aria-labelledby='heading' className='w-full'>
      <div className='mt-12' />
      <InvoicesProvider promise={invoices}>
        <InvoicesTemplateMobile className='flex flex-col gap-12 sm:hidden' />
        <InvoicesTemplateDesktop className='hidden flex-col gap-12 sm:flex' />
      </InvoicesProvider>
    </main>
  );
}
