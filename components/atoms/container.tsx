import { cn } from '@/helpers';
import * as React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Outer = React.forwardRef<HTMLDivElement, Props>(
  ({ className, children, ...props }, forwardedRef) => {
    return (
      <div ref={forwardedRef} className='sm:px-8' {...props}>
        <div
          className={cn('mx-auto w-full max-w-screen-2xl lg:px-8', className)}
        >
          {children}
        </div>
      </div>
    );
  }
);
Outer.displayName = 'OuterContainer';

const Inner = React.forwardRef<HTMLDivElement, Props>(
  ({ className, children, ...props }, forwardedRef) => {
    return (
      <div
        ref={forwardedRef}
        className='relative px-4 md:px-8 lg:px-12'
        {...props}
      >
        <div
          className={cn(
            'mx-auto max-w-screen-md 3xl:max-w-screen-lg',
            className
          )}
        >
          {children}
        </div>
      </div>
    );
  }
);
Inner.displayName = 'InnerContainer';

const Wrapper = React.forwardRef<HTMLDivElement, Props>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <Outer ref={forwardedRef} {...props}>
        <Inner>{children}</Inner>
      </Outer>
    );
  }
);
Wrapper.displayName = 'Container';

export const Container = Object.assign({}, Wrapper, {
  Inner: Inner,
  Outer: Outer,
});
