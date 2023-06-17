import Image from 'next/image';

interface Props {
  src?: string | null;
}

const Avatar = ({ src }: Props) => {
  return (
    <Image
      src={src || '/assets/placeholder.jpg'}
      alt={'User'}
      className='rounded-full'
      // alt={user?.firstName || 'User'}
      width={30}
      height={30}
    />
  );
};

export { Avatar };
