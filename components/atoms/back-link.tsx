import { icons } from '@/common';
import { cx } from 'cva';
import Link from 'next/link';

interface Props {
  href: __next_route_internal_types__.RouteImpl<string>;
  className?: string;
}

const BackLink = ({ className, href }: Props) => {
  return (
    <Link
      href={href}
      className={cx('body-100 flex items-baseline gap-8 font-bold', className)}
    >
      <icons.arrow.left />
      <span>Go back</span>
    </Link>
  );
};

export { BackLink };
