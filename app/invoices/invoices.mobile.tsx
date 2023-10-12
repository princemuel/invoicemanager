import { icons } from '@/common';
import { Button, Container, NextImage, Text } from '@/components';
import { cn, hasValues } from '@/helpers';
import NextLink from 'next/link';

interface Props {
  className?: string;
}

export function InvoicesTemplateMobile({ className }: Props) {
  return (
    <>
      <div className={cn('', className)}>
        <header>
          <Container.Outer>
            <Container.Inner className='flex items-center'>
              <div className='flex-1'>
                <Text as='h1' id='heading' size='xl'>
                  Invoices
                </Text>

                <Text as='p' aria-live='polite' variant='secondary'>
                  No Invoices
                </Text>
                {/* <Text as='p' aria-live='polite' variant='secondary'>
                  3 Invoices
                </Text> */}
              </div>

              <div className='flex items-center gap-6'>
                <Text>HI</Text>

                <Button variant='primary' asChild>
                  <NextLink href='/invoices/new'>
                    <span className='grid aspect-square place-content-center rounded-full bg-white p-2'>
                      <icons.actions.add />
                    </span>
                    <span>New</span>
                  </NextLink>
                </Button>
              </div>
            </Container.Inner>
          </Container.Outer>
        </header>

        <section aria-label='Invoice List' className=''>
          <Container>
            <ul className='my-12 flex flex-col gap-6'>
              {hasValues([]) ? (
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => <li key={el}></li>)
              ) : (
                <li className='flex min-h-full items-center justify-center'>
                  <article className='flex flex-col items-center gap-20 text-center'>
                    <NextImage
                      src={'/assets/illustration-empty.svg'}
                      width='242'
                      height='200'
                      className='w-full'
                      alt={'Invoices List Empty'}
                      placeholder='empty'
                    />

                    <div className='flex flex-col items-center gap-5 px-10'>
                      <Text as='h2' size='lg'>
                        There is nothing here
                      </Text>

                      <Text
                        as='p'
                        variant='secondary'
                        size='sm'
                        className='max-w-[22rem]'
                      >
                        Create an invoice by clicking the{' '}
                        <em className='font-bold'>New Invoice</em> button and
                        get started
                      </Text>
                    </div>
                  </article>
                </li>
              )}
            </ul>
          </Container>
        </section>
      </div>
    </>
  );
}
