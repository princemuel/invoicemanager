type Props = {
  src: string;
};

const ProfilePicture = ({ src }: Props) => {
  return (
    <figure className='w-12 overflow-hidden rounded-full'>
      <img
        src={src}
        alt={'Your Profile Picture'}
        width={80}
        height={80}
        placeholder='blur'
        className=''
      />
    </figure>
  );
};

export { ProfilePicture };
