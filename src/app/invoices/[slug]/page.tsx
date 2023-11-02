import { icons } from '@/common';
import { Button, Container } from '@/components';
import { InvoiceProvider } from '@/context';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import NextLink from 'next/link';
import NextScript from 'next/script';
import { InvoiceTemplateDesktop } from './invoice.desktop';
import { InvoiceTemplateMobile } from './invoice.mobile';

export default async function PageRoute({ params }: { params: IParams }) {
  const { getUser } = getKindeServerSession();

  const client = getUser();

  console.log(JSON.stringify(params));

  const invoice = Promise.resolve({} as InvoiceTypeSafe);

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

        <InvoiceProvider promise={invoice}>
          <InvoiceTemplateMobile className='flex flex-col gap-4 sm:hidden' />
          <InvoiceTemplateDesktop className='hidden flex-col gap-4 sm:flex' />
        </InvoiceProvider>
      </div>

      <NextScript src='/table-aria.js' strategy='lazyOnload' />
    </main>
  );
}

// Return a list of `params` to populate the [id] dynamic segment
export async function generateStaticParams() {
  const invoices = await import('../../../public/data.local.json').then(
    (res) => res.default
  );

  return invoices.map(({ id }) => ({ slug: id }));
}
