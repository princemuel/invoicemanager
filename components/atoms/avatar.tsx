import Image from 'next/image';

interface Props {
  src?: string;
}

const Avatar = ({ src }: Props) => {
  return (
    <Image
      src={src || '/assets/images/image-avatar.jpg'}
      alt={'User'}
      // alt={user?.firstName || 'User'}
      width={80}
      height={80}
      placeholder='blur'
      className=''
    />
  );
};

export { Avatar };
