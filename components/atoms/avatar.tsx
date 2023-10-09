import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextImage } from './next-image';

export async function Avatar() {
  const { getUser } = getKindeServerSession();
  const user = getUser();
  return (
    <NextImage
      src={user?.picture || '/assets/placeholder.jpg'}
      alt={'User'}
      className='rounded-full'
      // alt={user?.firstName || 'User'}
      width={30}
      height={30}
      placeholder='empty'
    />
  );
}
