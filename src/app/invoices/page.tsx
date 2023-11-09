import db from '@/app/db.server';
import { defineMeta } from '@/config';
import { InvoicesProvider } from '@/context';
import { getAuthSession } from '../database/lib';
import { getProfileDTO } from '../database/user.dto';
import { InvoicesTemplateDesktop } from './invoices.desktop';
import { InvoicesTemplateMobile } from './invoices.mobile';

export const metadata = defineMeta({
  title: 'Invoices',
  description: 'A list of all my past and current invoices',
});

async function PageRoute() {
  const { user } = getAuthSession();
  const profile = await getProfileDTO(user);

  const invoices = db.invoice.findMany({
    where: { userId: profile.id },
    select: {
      slug: true,
      paymentDue: true,
      clientName: true,
      total: true,
      status: true,
    },
  });

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
export default PageRoute;
