import Image from 'next/image';
import { Text } from './text';

const EmptyState = () => {
  return (
    <article className='flex flex-col items-center gap-20 text-center'>
      <Image
        src={'/assets/illustration-empty.svg'}
        width='242'
        height='200'
        className='w-full'
        alt={'Invoices List Empty'}
      />

      <div className='flex flex-col items-center gap-8 px-16'>
        <Text as='h2' className=''>
          There is nothing here
        </Text>
        <Text as='p' className='max-w-[22rem]'>
          <span>Create an invoice by clicking the</span>{' '}
          <em className='font-bold'>New Invoice</em> button and get started
        </Text>
      </div>
    </article>
  );
};

export { EmptyState };
