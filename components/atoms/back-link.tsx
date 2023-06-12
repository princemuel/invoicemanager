import { icons } from '@/common';
import { cx } from 'cva';
import Image from 'next/image';
import Link from 'next/link';
import { UrlObject } from 'url';

interface Props {
  href: UrlObject | __next_route_internal_types__.RouteImpl<string>;
  className?: string;
}

const BackLink = ({ className, href }: Props) => {
  return (
    <Link
      href={href}
      className={cx('body-100 flex items-baseline gap-8 font-bold', className)}
    >
      <Image src={icons.arrow.left} alt={'Go Back'} />
      <span>Go back</span>
    </Link>
  );
};

export { BackLink };
