type Props = {
  imgSrc: string;
};

const ProfilePicture = ({ imgSrc }: Props) => {
  return (
    <figure className='w-12 overflow-hidden rounded-full'>
      <img
        src={imgSrc}
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
