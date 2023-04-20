import { icons } from '@src/common';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

interface Props {
  url: string;
  className?: string;
}

const BackLink = ({ className, url }: Props) => {
  return (
    <Link
      to={url}
      className={clsx('body-100 flex items-start gap-8 font-bold', className)}
    >
      <img src={icons.arrow.left} alt={'Go Back'} />
      <span>Go back</span>
    </Link>
  );
};

export { BackLink };
