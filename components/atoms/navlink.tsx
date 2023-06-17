'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props extends PropsFrom<typeof Link> {}

/**
 * This component adds route-aware properties to the Next.js'
 * default Link component similar to the NavLink component in
 * React-Router
 * @returns JSX.Element
 */
const NavLink = ({ href, children, className, ...props }: Props) => {
  const pathname = usePathname();

  href =
    href &&
    href !== '/' &&
    (href as __next_route_internal_types__.RouteImpl<unknown>).endsWith('/')
      ? ((href as __next_route_internal_types__.RouteImpl<unknown>).slice(
          0,
          -1
        ) as __next_route_internal_types__.RouteImpl<unknown>)
      : (href as __next_route_internal_types__.RouteImpl<unknown>);

  const isCurrentPath = href === pathname || pathname?.startsWith(href + '/');

  return (
    <Link
      href={href}
      aria-current={isCurrentPath ? 'page' : 'false'}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
};

export { NavLink };
