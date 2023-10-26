'use client';

import { checkEnv, cn } from '@/helpers';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

type ButtonVariants = Omit<
  RequiredVariantProps<typeof buttonVariants>,
  '_content'
>;
type ButtonProps = Partial<ButtonVariants> &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> & {
    asChild?: boolean;
    disabled?: boolean;
  };

/**
 * This component will render either a button or the child,
 * depending on the props that are passed to it. This make it ideal for
 * use as link as the button props are passed to the nested link.
 */

export const Button = forwardRef(
  (
    {
      variant,
      modifier,
      size,
      fullWidth,
      disabled,
      rounded,
      status,
      asChild,
      className,
      ...restProps
    },
    forwardedRef
  ) => {
    const As = asChild ? Slot : 'button';

    return (
      <As
        {...restProps}
        ref={forwardedRef}
        className={cn(
          buttonVariants({
            variant,
            modifier,
            size,
            fullWidth,
            status,
            disabled,
            rounded,
            className,
            _content: 'text',
          })
        )}
        disabled={disabled}
      />
    );
  }
) as ForwardRefComponent<'button', ButtonProps>;
Button.displayName = 'Button';

type IconButtonProps = Omit<ButtonProps, 'children' | 'asChild'> &
  (
    | {
        icon?: SVGComponent;
        hiddenLabel?: string;
        leadingIcon?: never;
        trailingIcon?: never;
      }
    | {
        icon?: never;
        hiddenLabel?: never;
        leadingIcon?: SVGComponent;
        trailingIcon?: never;
      }
    | {
        icon?: never;
        hiddenLabel?: never;
        leadingIcon?: never;
        trailingIcon?: SVGComponent;
      }
  ) & { iconClassname?: string };

export const IconButton = forwardRef(
  (
    {
      as,
      icon: Icon,
      variant,
      modifier,
      size,
      fullWidth,
      disabled,
      rounded,
      hiddenLabel,
      children,
      iconClassname,
      leadingIcon: LeadingIcon,
      trailingIcon: TrailingIcon,
      className,
      ...restProps
    },
    forwardedRef
  ) => {
    checkEnv('development', () => {
      if (
        (LeadingIcon && TrailingIcon) ||
        (LeadingIcon && Icon) ||
        (TrailingIcon && Icon)
      ) {
        throw new Error(
          'You should only have a single icon in your IconButton component'
        );
      }
    });

    const As = as || 'button';

    return (
      <As
        {...restProps}
        className={cn(
          buttonVariants({
            variant,
            modifier,
            size,
            fullWidth,
            disabled,
            rounded,
            className,
            _content: LeadingIcon || TrailingIcon ? 'textAndIcon' : 'icon',
          })
        )}
        ref={forwardedRef}
        disabled={disabled}
      >
        {Icon ? (
          <>
            <p className='sr-only'>{hiddenLabel}</p>
            <Icon className={cn('h-5 w-5', iconClassname)} aria-hidden='true' />
          </>
        ) : null}

        {LeadingIcon ? (
          <LeadingIcon
            className={cn('-ml-0.5 h-5 w-5', iconClassname)}
            aria-hidden='true'
          />
        ) : null}

        {Icon ? null : children}

        {TrailingIcon ? (
          <TrailingIcon
            className={cn('-mr-0.5 h-5 w-5', iconClassname)}
            aria-hidden='true'
          />
        ) : null}
      </As>
    );
  }
) as ForwardRefComponent<'button', IconButtonProps>;
IconButton.displayName = 'Button';

export const buttonVariants = cva(
  [
    'relative group inline-flex items-center',
    'transition-colors duration-300 ease-in',
    'focus-visible:outline-none focus-visible:ring-1',
  ],
  {
    variants: {
      variant: {
        default: '',
        primary:
          'bg-brand-500 text-white hover:bg-brand-200 focus:bg-brand-200',
        secondary:
          'text-brand-300 dark:text-brand-100 bg-accent-300 dark:bg-accent-300 hover:bg-brand-900 dark:hover:bg-brand-700 focus:bg-brand-900 dark:focus:bg-brand-700',
        soft: 'text-brand-400 dark:text-brand-100 bg-neutral-200 dark:bg-brand-600 hover:bg-brand-100 dark:hover:bg-white focus:bg-brand-100 dark:focus:bg-white',
        destructive: 'bg-accent-200 text-white hover:bg-accent-100',
      },
      modifier: {
        plain: 'border-none bg-transparent',
        outline: 'border border-current bg-transparent',
      },
      status: {
        // Invoice States
        draft:
          'bg-accent-300/[0.06] text-accent-300 dark:bg-brand-100/[0.06] dark:text-brand-100',
        pending: 'bg-accent-400/[0.06] text-accent-400',
        paid: 'bg-accent-500/[0.06] text-accent-500',
      },
      size: {
        xs: 'text-400 leading-200 -tracking-200',
        sm: 'text-400 leading-200 -tracking-200',
      },
      rounded: {
        normal: '',
        full: 'rounded-full',
      },
      _content: {
        text: '',
        textAndIcon: '',
        icon: '',
      },
      fullWidth: {
        true: 'w-full',
      },
      disabled: {
        true: 'pointer-events-none cursor-not-allowed opacity-50',
      },
    },
    compoundVariants: [
      //TODO: refactor this
      {
        variant: ['primary', 'secondary', 'soft', 'destructive'],
        rounded: 'normal',
        className: 'rounded-pill justify-center',
      },
      { variant: ['default'], rounded: 'normal', className: 'rounded-md' },
      {
        size: ['sm'],
        _content: ['text', 'textAndIcon'],
        className: 'font-bold h-12 gap-x-2',
      },
      {
        variant: ['soft', 'destructive', 'secondary'],
        size: ['sm'],
        _content: 'text',
        className: 'px-4',
      },
      {
        variant: ['primary'],
        size: ['sm'],
        // gap-x-1 w-20 h-11 px-2 sm:w-36 sm:gap-x-2 sm:h-12
        className: 'px-2 sm:px-4',
      },
      {
        status: ['draft', 'pending', 'paid'],
        className: 'capitalize !w-[6.5rem] !h-10 !py-3 !px-4 justify-around',
      },
      {
        fullWidth: true,
        className: 'justify-center text-center',
      },
      { disabled: true, variant: 'default', className: 'border-gray-200' },
    ],

    defaultVariants: {
      variant: 'default',
      size: 'sm',
      rounded: 'normal',
      _content: 'text',
    },
  }
);

type RequiredVariantProps<
  T extends (...args: any) => any,
  // By default, all variants will be required
  Keys extends keyof VariantProps<T> = keyof VariantProps<T>,
> = Simplify<
  // Create an intersection of all variants with those being marked as required
  VariantProps<T> & {
    // For each variant being marked as required, remove null and undefined
    [Variant in Keys]: Exclude<VariantProps<T>[Variant], null | undefined>;
  }
>;

type Simplify<ObjectType> = {
  [KeyType in keyof ObjectType]: ObjectType[KeyType];
} & {};
