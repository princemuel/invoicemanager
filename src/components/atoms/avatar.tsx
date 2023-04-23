import { trim } from '@src/helpers';

type Props = {
  src: string;
  name?: string;
};

const Avatar = ({ src, name }: Props) => {
  return (
    <figure className='w-12 cursor-pointer overflow-hidden rounded-full'>
      <img
        src={src}
        alt={'Your Profile Picture'}
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
