import { getAuthSession } from '@/app/lib';
import { icons } from '@/common';
import { Button, Container } from '@/components';
import NextLink from 'next/link';
import InvoiceForm from './invoice-form';

type Props = {};

export default function PageRoute() {
  const formAction = '';

  const [_, user] = getAuthSession();

  return (
    <main aria-labelledby='heading' className='relative w-full'>
      <div className='mt-12 lg:mt-16' />

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

      <InvoiceForm className='mt-6 lg:mt-8' />
    </main>
  );
}
