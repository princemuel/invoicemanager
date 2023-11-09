import { getAuthSession } from '@/app/database/lib';
import { getProfileDTO } from '@/app/database/user.dto';
import db from '@/app/db.server';
import { icons } from '@/common';
import { Button, Container } from '@/components';
import NextLink from 'next/link';
import { notFound } from 'next/navigation';
import NextScript from 'next/script';
import { InvoiceTemplateDesktop } from './invoice.desktop';
import { InvoiceTemplateMobile } from './invoice.mobile';

interface Props {
  params: IParams;
}

const PageRoute = async ({ params: { slug } }: Props) => {
  if (!slug) notFound();

  const { user } = getAuthSession();
  const profile = await getProfileDTO(user);

  const invoice = await db.invoice.findUnique({
    where: { slug: slug, userId: profile.id },
    select: {
      slug: true,
      paymentDue: true,
      paymentTerms: true,
      issued: true,
      clientName: true,
      clientAddress: true,
      clientEmail: true,
      description: true,
      items: true,
      senderAddress: true,
      total: true,
      status: true,
    },
  });

  if (!invoice) notFound();

  return (
    <main
      aria-labelledby='heading-desktop heading-mobile'
      className='relative w-full'
    >
      <div className='mt-16 flex flex-col gap-8'>
        <Container>
          {/* TODO: refactor this later */}
          <Button className='h-auto w-auto gap-x-3' asChild>
            <NextLink href={'/invoices'}>
              <span>
                <icons.chevron.left />
              </span>
              <span>Go Back</span>
            </NextLink>
          </Button>
        </Container>

        <InvoiceTemplateMobile
          invoice={invoice}
          className='flex flex-col gap-4 sm:hidden'
        />
        <InvoiceTemplateDesktop
          invoice={invoice}
          className='hidden flex-col gap-4 sm:flex'
        />
      </div>

      <NextScript src='/table-aria.js' strategy='lazyOnload' />
    </main>
  );
};

export default PageRoute;

// export async function generateStaticParams() {
//   const { user } = getAuthSession();
//   const profile = await getProfileDTO(user);
//   const invoices = await db.invoice.findMany({
//     where: { userId: profile.id },
//     select: { slug: true },
//   });

//   return (invoices || []).map((invoice) => invoice?.slug);
// }
