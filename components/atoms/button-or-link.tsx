import Link from "next/link";
import { ComponentProps } from "react";

type ButtonOrLinkProps = ComponentProps<"button"> & ComponentProps<"a">;

export interface Props extends ButtonOrLinkProps {
  children: React.ReactNode;
}

/**
 * This is a base component that will render either a button or a link,
 * depending on the props that are passed to it. The link rendered will
 * also correctly get wrapped in a next/link component to ensure ideal
 * page-to-page transitions.
 */

export function ButtonOrLink({ href, ...props }: Props) {
  const isAnchor = typeof href !== "undefined";
  const RenderedElement = isAnchor ? "a" : "button";

  const element = <RenderedElement {...props} />;

  if (isAnchor) {
    return (
      <Link href={href} passHref>
        {element}
      </Link>
    );
  }

  return element;
}
