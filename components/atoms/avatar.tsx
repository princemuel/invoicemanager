import { getAuthSession } from '@/app/_data/lib';
import { NextImage } from './next-image';

export async function Avatar() {
  const [_, user] = getAuthSession();

  return (
    <NextImage
      src={user?.picture || '/placeholder.jpg'}
      alt={'User'}
      className='rounded-full'
      // alt={user?.firstName || 'User'}
      width={30}
      height={30}
      placeholder='empty'
    />
  );
}
