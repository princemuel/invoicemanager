import { PLACEHOLDER_IMAGE } from 'helpers';
import Image from 'next/future/image';

type Props = {
  imgSrc: string;
};

const ProfilePicture = ({ imgSrc }: Props) => {
  return (
    <figure className='w-12 overflow-hidden rounded-full'>
      <Image
        src={imgSrc}
        alt={'Your Profile Picture'}
        width={80}
        height={80}
        placeholder='blur'
        blurDataURL={PLACEHOLDER_IMAGE}
        className=''
      />
    </figure>
  );
};

export { ProfilePicture };
