import { Text } from '@/components';

export const HomeTemplate = () => {
  return (
    <>
      <section>
        <div className='h-container'>
          <Text as='h2'>Features</Text>

          <Text as='p' className='text-brand-900/50'>
            Our aim is to make it quick and easy for you to access your
            favourite websites. Your bookmarks sync between your devices so you
            can access them on the go.
          </Text>
        </div>
      </section>
    </>
  );
};
