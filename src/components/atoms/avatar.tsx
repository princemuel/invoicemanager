import { trim, useAuthState } from '@src/lib';

interface Props {
  src?: string;
  name?: string;
}

const Avatar = ({ src, name }: Props) => {
  const session = useAuthState();

  return (
    <figure className='w-12 cursor-pointer overflow-hidden rounded-full'>
      <img
        src={src || session?.user?.photo || '/assets/images/image-avatar.jpg'}
        alt={'User'}
        // alt={user?.firstName || 'User'}
        width={80}
        height={80}
        placeholder='blur'
        className=''
      />
      <figcaption className='sr-only'>
        {trim(`${name || ' '}Profile Picture`)}
      </figcaption>
    </figure>
  );
};

export { Avatar };
