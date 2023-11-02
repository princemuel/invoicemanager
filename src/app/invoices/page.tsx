import { InvoicesProvider } from '@/context';
import { InvoicesTemplateDesktop } from './invoices.desktop';
import { InvoicesTemplateMobile } from './invoices.mobile';
import { getAuthSession } from '../_data/lib';

export default async function PageRoute() {
  const { authenticated, user } = getAuthSession();

  const invoices = Promise.resolve([] as InvoiceTypeSafe[]);

  return (
    <main aria-labelledby='heading-desktop heading-mobile' className='w-full'>
      <div className='mt-12' />

      <InvoicesProvider promise={invoices}>
        <InvoicesTemplateMobile className='flex flex-col gap-12 sm:hidden' />
        <InvoicesTemplateDesktop className='hidden flex-col gap-12 sm:flex' />
      </InvoicesProvider>
    </main>
  );
}
